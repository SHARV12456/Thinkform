import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { ensureAdminSettings } from '@/lib/ensureDatabase';

export async function GET() {
  try {
    // Ensure database is ready
    const dbReady = await ensureAdminSettings();
    if (!dbReady) {
      console.warn('Database not ready, returning empty QR');
      return NextResponse.json({ exists: false, url: null });
    }

    const setting = await prisma.adminSettings.findUnique({
      where: { key: 'payment_qr_code' },
    });

    const result = {
      exists: !!setting?.value,
      url: setting?.value || null,
    };

    console.log('Check QR response:', {
      exists: result.exists,
      hasUrl: !!result.url,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Check QR error details:', {
      message: error?.message,
      code: error?.code,
      meta: error?.meta,
    });
    return NextResponse.json({ exists: false, url: null });
  }
}
