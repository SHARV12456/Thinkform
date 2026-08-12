import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const setting = await prisma.adminSettings.findUnique({
      where: { key: 'payment_qr_code' },
    });

    return NextResponse.json({ 
      exists: !!setting?.value,
      url: setting?.value || null,
    });
  } catch (error) {
    console.error('Check QR error:', error);
    return NextResponse.json({ exists: false, url: null });
  }
}
