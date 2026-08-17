/**
 * migrate-wrapper.mjs
 *
 * Neon's connection pooler (-pooler) does not support Postgres advisory locks,
 * which Prisma requires for `migrate deploy`. This wrapper intercepts the Vercel
 * build, extracts the direct connection string, and forces Prisma to use it just
 * for migrations.
 */
import { execSync } from 'child_process';

const connectionString =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_PRISMA_URL ||
  process.env.POSTGRES_URL;

if (!connectionString) {
  console.log('[migrate-wrapper] No DATABASE_URL found. Skipping migration.');
  process.exit(0);
}

// Convert pooled URL to direct URL by stripping '-pooler'
// e.g. ep-bold-field-az9vvfne-pooler.c-3... -> ep-bold-field-az9vvfne.c-3...
let directUrl = connectionString.replace('-pooler', '');

// Run pre-migrate script (with pooler is fine, or direct is fine)
console.log('[migrate-wrapper] Running pre-migrate checks...');
try {
  execSync('node scripts/pre-migrate.mjs', { stdio: 'inherit', env: { ...process.env, DATABASE_URL: directUrl } });
} catch (e) {
  console.error('[migrate-wrapper] Pre-migrate hook failed.');
}

// Run migrate deploy strictly with the direct URL
console.log('[migrate-wrapper] Running prisma migrate deploy using direct DB connection...');
try {
  execSync('npx prisma migrate deploy', {
    stdio: 'inherit',
    env: { ...process.env, DATABASE_URL: directUrl }
  });
} catch (e) {
  console.error('[migrate-wrapper] Migration failed.');
  process.exit(1);
}
