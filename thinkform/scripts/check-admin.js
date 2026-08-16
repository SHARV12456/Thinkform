// Script to diagnose admin login issues
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const path = require('path');
const fs = require('fs');

// Load .env.local manually
function loadEnv(file) {
  try {
    const content = fs.readFileSync(file, 'utf8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx === -1) continue;
      const key = trimmed.slice(0, idx).trim();
      let val = trimmed.slice(idx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = val;
    }
  } catch (e) {
    console.error('Could not load env file:', e.message);
  }
}

loadEnv(path.join(__dirname, '../.env.local'));

const DATABASE_URL = process.env.DATABASE_URL;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@thinkform.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'thinkform2024';

console.log('DATABASE_URL:', DATABASE_URL ? DATABASE_URL.replace(/:\/\/[^@]+@/, '://***@') : 'NOT SET');
console.log('ADMIN_EMAIL:', ADMIN_EMAIL);
console.log('ADMIN_PASSWORD length:', ADMIN_PASSWORD.length);

if (!DATABASE_URL) {
  console.error('ERROR: DATABASE_URL is not set!');
  process.exit(1);
}

const adapter = new PrismaPg({ connectionString: DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  try {
    const users = await prisma.adminUser.findMany();
    console.log('\nAdmin users in DB:', users.length);
    users.forEach(u => {
      console.log(' -', u.email, '| active:', u.active, '| passLen:', u.password.length, '| passPrefix:', u.password.substring(0, 25));
    });

    if (users.length === 0) {
      console.log('\nNo admin user found. One will be created on first login attempt.');
    }
  } catch (e) {
    console.error('DB query error:', e.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
