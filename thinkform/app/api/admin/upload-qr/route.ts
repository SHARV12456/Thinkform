import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { writeFile } from 'fs/promises';
import path from 'path';

/**
 * POST /api/admin/upload-qr
 * Admin uploads their UPI / bank QR code image
 */
export async function POST(request: NextRequest) {
  try {
    // Auth check
    const cookieStore = await cookies();
    const authToken = cookieStore.get('tf_auth_token');
    if (!authToken?.value) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('qr') as File | null;

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 });
    }

    // Validate image type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ success: false, message: 'File must be an image' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save as payment-qr.png in /public
    const savePath = path.join(process.cwd(), 'public', 'payment-qr.png');
    await writeFile(savePath, buffer);

    return NextResponse.json({
      success: true,
      message: 'QR code uploaded successfully',
      url: '/payment-qr.png',
    });
  } catch (error) {
    console.error('QR upload error:', error);
    return NextResponse.json({ success: false, message: 'Upload failed' }, { status: 500 });
  }
}
