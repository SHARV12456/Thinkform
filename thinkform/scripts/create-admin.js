const { PrismaClient } = require('@prisma/client');
const argon2 = require('argon2');

async function main() {
  const email = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  const password = (process.env.ADMIN_PASSWORD || '').trim();

  if (!email || !password) {
    console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD environment variables before running');
    process.exit(1);
  }

  const { PrismaPg } = require('@prisma/adapter-pg');
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });
  try {
    const hashed = await argon2.hash(password, { type: argon2.argon2id });
    const existing = await prisma.adminUser.findUnique({ where: { email } });
    if (existing) {
      await prisma.adminUser.update({ where: { email }, data: { password: hashed, active: true } });
      console.log('Updated admin user:', email);
    } else {
      await prisma.adminUser.create({ data: { email, password: hashed, name: 'Admin', role: 'admin', active: true } });
      console.log('Created admin user:', email);
    }
  } catch (err) {
    console.error('Error:', err);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

main();
