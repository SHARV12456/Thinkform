import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs';
import path from 'path';
import { verifyAuthToken } from '@/lib/auth';

/**
 * POST /api/admin/upload-qr
 * Admin uploads their UPI / bank QR code image.
 * Saves the QR image to public/payment-qr.png so clients can access it during booking.
 */
export async function POST(request: NextRequest) {
  try {
    // Auth check
    const cookieStore = await cookies();
    const authToken = cookieStore.get('tf_auth_token');
    if (!authToken?.value || !verifyAuthToken(authToken.value)) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('qr') as File | null;

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 });
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ success: false, message: 'File must be an image' }, { status: 400 });
    }

    // Max 5MB for QR code images
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ success: false, message: `File size must be under ${Math.round(maxSize / 1024 / 1024)}MB` }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const publicPath = path.join(process.cwd(), 'public');
    const qrPath = path.join(publicPath, 'payment-qr.png');

    await fs.promises.mkdir(publicPath, { recursive: true });
    await fs.promises.writeFile(qrPath, buffer);

    return NextResponse.json({
      success: true,
      message: 'QR code uploaded successfully',
      url: '/payment-qr.png',
      exists: true,
    });
  } catch (error) {
    console.error('QR upload error:', error);
    return NextResponse.json({ success: false, message: 'Upload failed' }, { status: 500 });
  }
}
