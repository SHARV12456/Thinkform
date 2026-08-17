import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

// Set up WebSocket polyfill for Neon in Node.js environments
neonConfig.webSocketConstructor = ws;

const prismaClientSingleton = () => {
  const connectionString =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL;

  if (!connectionString) {
    const msg =
      'No DATABASE_URL, POSTGRES_PRISMA_URL, or POSTGRES_URL environment variable found. ' +
      'Check your .env.local file or Vercel project settings.';
    console.error('CRITICAL:', msg);
    throw new Error(msg);
  }

  // Use Neon Serverless driver if connecting to Neon or Vercel Postgres
  if (
    connectionString.includes('neon.tech') ||
    connectionString.includes('vercel-storage.com') ||
    connectionString.includes('neon.database.azure.com')
  ) {
    // Prisma 7: PrismaNeon accepts a config object with connectionString
    const adapter = new PrismaNeon({ connectionString });
    return new PrismaClient({ adapter });
  }

  // Prisma 7: PrismaPg accepts a config object with connectionString directly.
  // Do NOT create a pg.Pool manually — passing it as `any` was the old v6 pattern
  // and breaks in v7, causing "no database host" errors.
  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
};

declare global {
  // eslint-disable-next-line no-var
  var prisma_v5: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = global.prisma_v5 ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') global.prisma_v5 = prisma;