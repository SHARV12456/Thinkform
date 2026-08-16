import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool as PgPool } from 'pg';
import { PrismaNeon } from '@prisma/adapter-neon';
import { Pool as NeonPool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

// Set up WebSocket polyfill for Neon in Node.js environments
neonConfig.webSocketConstructor = ws;

const prismaClientSingleton = () => {
  const connectionString = 
    process.env.DATABASE_URL || 
    process.env.POSTGRES_PRISMA_URL || 
    process.env.POSTGRES_URL;

  if (!connectionString) {
    console.error('CRITICAL WARNING: No DATABASE_URL or POSTGRES_URL found in environment variables. Database queries will fail.');
    // Provide a dummy client if env is missing during build time
    return new PrismaClient();
  }

  // Use Neon Serverless driver if connecting to Neon or Vercel Postgres
  if (connectionString.includes('neon.tech') || connectionString.includes('vercel-storage.com')) {
    const pool = new NeonPool({ connectionString });
    const adapter = new PrismaNeon(pool as any) as any;
    return new PrismaClient({ adapter });
  }

  // Use standard Postgres driver for local development
  const pool = new PgPool({ connectionString });
  const adapter = new PrismaPg(pool as any) as any;
  return new PrismaClient({ adapter });
};

declare global {
  // eslint-disable-next-line no-var
  var prisma_v5: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = global.prisma_v5 ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') global.prisma_v5 = prisma;