import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import { verifyAuthToken } from '@/lib/auth';

/**
 * POST /api/admin/upload-qr
 * Admin uploads their UPI / bank QR code image.
 * Stores the QR image as base64 in the database.
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
    const base64 = Buffer.from(bytes).toString('base64');
    const dataUrl = `data:${file.type};base64,${base64}`;

    // Store in database
    await prisma.adminSettings.upsert({
      where: { key: 'payment_qr_code' },
      update: { value: dataUrl },
      create: { key: 'payment_qr_code', value: dataUrl },
    });

    return NextResponse.json({
      success: true,
      message: 'QR code uploaded successfully',
      url: dataUrl,
      exists: true,
    });
  } catch (error) {
    console.error('QR upload error:', error);
    return NextResponse.json({ success: false, message: 'Upload failed' }, { status: 500 });
  }
}
