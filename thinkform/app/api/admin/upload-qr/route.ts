import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

/**
 * POST /api/admin/upload-qr
 * Admin uploads their UPI / bank QR code image.
 * Returns base64 data URL — Vercel filesystem is read-only.
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

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ success: false, message: 'File must be an image' }, { status: 400 });
    }

    // Max 2MB for QR codes
    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json({ success: false, message: 'File size must be under 2MB' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString('base64');
    const dataUrl = `data:${file.type};base64,${base64}`;

    return NextResponse.json({
      success: true,
      message: 'QR code uploaded successfully',
      url: dataUrl,
    });
  } catch (error) {
    console.error('QR upload error:', error);
    return NextResponse.json({ success: false, message: 'Upload failed' }, { status: 500 });
  }
}
