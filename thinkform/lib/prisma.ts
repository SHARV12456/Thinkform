import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const prismaClientSingleton = () => {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    // If no DATABASE_URL, return a client that will error when used
    // This allows the app to build but will error at runtime when trying to access the DB
    console.warn('DATABASE_URL not set - database operations will fail');
    return new PrismaClient();
  }

  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = global.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
