/**
 * pre-migrate.mjs
 *
 * Runs before `prisma migrate deploy` during the Vercel build.
 * Finds any migrations stuck in a "started but not finished and not rolled back"
 * state (i.e. previously failed mid-apply) and marks them as rolled-back so
 * `prisma migrate deploy` can cleanly retry them.
 *
 * This is the programmatic equivalent of:
 *   prisma migrate resolve --rolled-back <migration_name>
 */

import pg from 'pg';

const connectionString =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_PRISMA_URL ||
  process.env.POSTGRES_URL;

if (!connectionString) {
  console.error('[pre-migrate] No DATABASE_URL found — skipping.');
  process.exit(0);
}

const pool = new pg.Pool({ connectionString });

try {
  // Check if the _prisma_migrations table exists yet (first-ever deploy won't have it)
  const tableCheck = await pool.query(`
    SELECT EXISTS (
      SELECT FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_name   = '_prisma_migrations'
    ) AS exists;
  `);

  if (!tableCheck.rows[0].exists) {
    console.log('[pre-migrate] _prisma_migrations table not found — nothing to resolve.');
    await pool.end();
    process.exit(0);
  }

  // Find all failed migrations: started_at set, finished_at NULL, rolled_back_at NULL
  const failed = await pool.query(`
    SELECT id, migration_name
    FROM "_prisma_migrations"
    WHERE started_at   IS NOT NULL
      AND finished_at  IS NULL
      AND rolled_back_at IS NULL;
  `);

  if (failed.rows.length === 0) {
    console.log('[pre-migrate] No failed migrations found — proceeding normally.');
    await pool.end();
    process.exit(0);
  }

  for (const row of failed.rows) {
    console.log(`[pre-migrate] Marking failed migration as rolled-back: ${row.migration_name}`);
    await pool.query(`
      UPDATE "_prisma_migrations"
      SET rolled_back_at = NOW(),
          logs           = 'Auto-resolved by pre-migrate.mjs before migrate deploy'
      WHERE id = $1;
    `, [row.id]);
  }

  console.log(`[pre-migrate] Resolved ${failed.rows.length} failed migration(s). Prisma migrate deploy can now proceed.`);
  await pool.end();
  process.exit(0);
} catch (err) {
  console.error('[pre-migrate] Error during pre-migration resolve:', err.message);
  await pool.end();
  // Don't block the build — let migrate deploy surface the real error
  process.exit(0);
}
