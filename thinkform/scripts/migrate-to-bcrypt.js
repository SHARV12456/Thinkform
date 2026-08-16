// Script to migrate admin password from argon2 to bcryptjs
// Run once: node scripts/migrate-to-bcrypt.js
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const bcrypt = require('bcryptjs');
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

console.log('Migrating admin password for:', ADMIN_EMAIL);

const adapter = new PrismaPg({ connectionString: DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  try {
    const user = await prisma.adminUser.findUnique({ where: { email: ADMIN_EMAIL } });
    
    if (!user) {
      console.log('No admin user found. Creating new user with bcrypt hash...');
      const hash = await bcrypt.hash(ADMIN_PASSWORD, 12);
      await prisma.adminUser.create({
        data: { email: ADMIN_EMAIL, password: hash, name: 'Admin', role: 'admin', active: true }
      });
      console.log('Admin user created with bcrypt hash.');
      return;
    }

    const isAlreadyBcrypt = user.password.startsWith('$2a$') || user.password.startsWith('$2b$');
    if (isAlreadyBcrypt) {
      console.log('Password is already bcrypt — no migration needed.');
      // Verify the existing bcrypt hash matches the current ADMIN_PASSWORD
      const ok = await bcrypt.compare(ADMIN_PASSWORD, user.password);
      console.log('Bcrypt verify with current ADMIN_PASSWORD:', ok);
      if (!ok) {
        console.log('Hash does not match current password. Re-hashing...');
        const hash = await bcrypt.hash(ADMIN_PASSWORD, 12);
        await prisma.adminUser.update({ where: { id: user.id }, data: { password: hash } });
        console.log('Password re-hashed with bcrypt.');
      }
      return;
    }

    // Hash is argon2 or legacy — replace with bcrypt
    console.log('Current hash type:', user.password.startsWith('$argon2') ? 'argon2' : 'legacy');
    console.log('Replacing with bcrypt hash...');
    const hash = await bcrypt.hash(ADMIN_PASSWORD, 12);
    await prisma.adminUser.update({ where: { id: user.id }, data: { password: hash } });
    console.log('Password migrated to bcrypt successfully!');
    
    // Verify
    const verify = await bcrypt.compare(ADMIN_PASSWORD, hash);
    console.log('Post-migration verify:', verify);

  } catch (e) {
    console.error('Error:', e.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
