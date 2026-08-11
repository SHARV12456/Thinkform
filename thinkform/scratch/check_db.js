const { Pool } = require('pg');
const pool = new Pool({ connectionString: 'postgres://postgres:postgres@localhost:51214/template1?sslmode=disable' });

async function main() {
  const res = await pool.query('SELECT * FROM "BookingRequest" ORDER BY "createdAt" DESC LIMIT 1');
  console.log(JSON.stringify(res.rows[0], null, 2));
}

main().catch(console.error).finally(() => pool.end());
