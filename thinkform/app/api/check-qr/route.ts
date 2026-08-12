import { NextResponse } from 'next/server';
import { QRCodeService } from '@/lib/qrService';

/**
 * GET /api/check-qr
 * Check if QR code exists and get its URL
 */
export async function GET() {
  try {
    const result = await QRCodeService.getQR();
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Check QR error:', error);
    return NextResponse.json({
      exists: false,
      url: null,
      error: error?.message,
    });
  }
}
