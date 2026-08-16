// Script to test the full login flow as the server would run it
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const argon2 = require('argon2');
const path = require('path');
const fs = require('fs');

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

console.log('Testing login for:', ADMIN_EMAIL);

const adapter = new PrismaPg({ connectionString: DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  try {
    // Step 1: Find user
    const user = await prisma.adminUser.findUnique({ where: { email: ADMIN_EMAIL } });
    if (!user) {
      console.log('ERROR: No user found for', ADMIN_EMAIL);
      return;
    }
    console.log('User found:', user.email, '| active:', user.active);
    console.log('Stored hash prefix:', user.password.substring(0, 30));

    // Step 2: Try argon2 verify
    console.log('\nTesting argon2.verify with password:', ADMIN_PASSWORD);
    try {
      const result = await argon2.verify(user.password, ADMIN_PASSWORD);
      console.log('argon2.verify result:', result);
    } catch (e) {
      console.error('argon2.verify THREW ERROR:', e.message);
      console.error('Full error:', e);
    }

    // Step 3: Try hashing new password
    console.log('\nTesting argon2.hash...');
    try {
      const newHash = await argon2.hash(ADMIN_PASSWORD, { type: argon2.argon2id });
      console.log('argon2.hash OK, result prefix:', newHash.substring(0, 30));
      
      // Verify the freshly created hash
      const verifyFresh = await argon2.verify(newHash, ADMIN_PASSWORD);
      console.log('Verify fresh hash:', verifyFresh);
    } catch (e) {
      console.error('argon2.hash THREW ERROR:', e.message);
    }

  } catch (e) {
    console.error('Fatal error:', e.message, e.stack);
  } finally {
    await prisma.$disconnect();
  }
}

main();
