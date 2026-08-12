import prisma from '@/lib/prisma';

/**
 * Ensure AdminSettings table exists and is initialized
 * This helps handle cases where migrations haven't been applied yet
 */
export async function ensureAdminSettings() {
  try {
    // Try to query the table
    await prisma.adminSettings.findFirst();
    return true;
  } catch (error: any) {
    // Table likely doesn't exist, try to create it via raw SQL
    if (error?.code === 'P2021' || error?.message?.includes('does not exist')) {
      try {
        console.log('AdminSettings table missing, attempting to create...');
        await prisma.$executeRawUnsafe(`
          CREATE TABLE IF NOT EXISTS "AdminSettings" (
            "id" TEXT NOT NULL PRIMARY KEY,
            "key" TEXT NOT NULL UNIQUE,
            "value" TEXT NOT NULL,
            "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "updatedAt" TIMESTAMP(3) NOT NULL
          );
          CREATE INDEX IF NOT EXISTS "AdminSettings_key_idx" ON "AdminSettings"("key");
        `);
        console.log('AdminSettings table created successfully');
        return true;
      } catch (createError) {
        console.error('Failed to ensure AdminSettings table:', createError);
        return false;
      }
    }
    console.error('Error checking AdminSettings table:', error);
    return false;
  }
}
