import prisma from '@/lib/prisma';

export class QRCodeService {
  /**
   * Initialize AdminSettings table if it doesn't exist
   */
  static async initializeTable() {
    try {
      // Try a simple query to check if table exists
      await prisma.adminSettings.findFirst();
      return { success: true };
    } catch (error: any) {
      // Table doesn't exist, try to create it
      try {
        await prisma.$executeRawUnsafe(`
          CREATE TABLE IF NOT EXISTS "AdminSettings" (
            "id" TEXT NOT NULL PRIMARY KEY,
            "key" TEXT NOT NULL UNIQUE,
            "value" TEXT NOT NULL,
            "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "updatedAt" TIMESTAMP(3) NOT NULL
          )
        `);
        
        await prisma.$executeRawUnsafe(`
          CREATE INDEX IF NOT EXISTS "AdminSettings_key_idx" ON "AdminSettings"("key")
        `);
        
        console.log('✓ AdminSettings table initialized');
        return { success: true };
      } catch (createError: any) {
        console.error('✗ Failed to initialize AdminSettings table:', createError.message);
        return { success: false, error: createError.message };
      }
    }
  }

  /**
   * Upload and store QR code
   */
  static async uploadQR(fileData: string, mimeType: string) {
    try {
      // Initialize table first
      const init = await this.initializeTable();
      if (!init.success) {
        throw new Error('Failed to initialize database');
      }

      const dataUrl = `data:${mimeType};base64,${fileData}`;

      // Store in database
      const result = await prisma.adminSettings.upsert({
        where: { key: 'payment_qr_code' },
        update: { value: dataUrl },
        create: { key: 'payment_qr_code', value: dataUrl },
      });

      console.log('✓ QR code stored successfully');
      return {
        success: true,
        url: dataUrl,
        id: result.id,
      };
    } catch (error: any) {
      console.error('✗ QR upload failed:', error.message);
      throw error;
    }
  }

  /**
   * Retrieve QR code
   */
  static async getQR() {
    try {
      // Initialize table first
      const init = await this.initializeTable();
      if (!init.success) {
        return { exists: false, url: null };
      }

      const setting = await prisma.adminSettings.findUnique({
        where: { key: 'payment_qr_code' },
      });

      if (setting?.value) {
        console.log('✓ QR code found');
        return { exists: true, url: setting.value };
      }

      console.log('→ No QR code stored yet');
      return { exists: false, url: null };
    } catch (error: any) {
      console.error('✗ QR retrieval failed:', error.message);
      return { exists: false, url: null };
    }
  }

  /**
   * Delete QR code
   */
  static async deleteQR() {
    try {
      const init = await this.initializeTable();
      if (!init.success) {
        throw new Error('Failed to initialize database');
      }

      await prisma.adminSettings.delete({
        where: { key: 'payment_qr_code' },
      });

      console.log('✓ QR code deleted');
      return { success: true };
    } catch (error: any) {
      // It's okay if it doesn't exist
      if (error.code === 'P2025') {
        return { success: true };
      }
      console.error('✗ QR deletion failed:', error.message);
      throw error;
    }
  }
}
