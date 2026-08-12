import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAuthToken } from '@/lib/auth';
import { QRCodeService } from '@/lib/qrService';

/**
 * POST /api/admin/upload-qr
 * Upload QR code for payment
 */
export async function POST(request: NextRequest) {
  try {
    // Auth check
    const cookieStore = await cookies();
    const authToken = cookieStore.get('tf_auth_token');
    
    if (!authToken?.value) {
      return NextResponse.json(
        { success: false, error: 'No auth token' },
        { status: 401 }
      );
    }

    if (!verifyAuthToken(authToken.value)) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Parse form data
    const formData = await request.formData();
    const file = formData.get('qr') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { success: false, error: 'File must be an image (PNG, JPG, etc.)' },
        { status: 400 }
      );
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: `File too large. Max size: ${maxSize / 1024 / 1024}MB` },
        { status: 400 }
      );
    }

    // Read file and convert to base64
    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');

    // Upload using service
    const result = await QRCodeService.uploadQR(base64, file.type);

    return NextResponse.json({
      success: true,
      message: 'QR code uploaded successfully',
      url: result.url,
      exists: true,
    });
  } catch (error: any) {
    console.error('Upload QR error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Failed to upload QR code',
      },
      { status: 500 }
    );
  }
}
