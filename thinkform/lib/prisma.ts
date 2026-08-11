import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  const connectionString = process.env.NODE_ENV === 'production' 
    ? process.env.DATABASE_URL 
    : "postgres://postgres:postgres@localhost:51214/template1?sslmode=disable&connection_limit=10&connect_timeout=0&max_idle_connection_lifetime=0&pool_timeout=0&socket_timeout=0";
  
  if (!connectionString) {
    console.warn('DATABASE_URL not set - database operations will fail');
    return new PrismaClient();
  }

  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
};

declare global {
  var prisma_v5: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = global.prisma_v5 ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') global.prisma_v5 = prisma;
