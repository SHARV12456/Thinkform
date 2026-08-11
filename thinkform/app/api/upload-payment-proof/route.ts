import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

/**
 * POST /api/upload-payment-proof
 * Client uploads screenshot of their UPI payment as proof
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('proof') as File | null;

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file provided' }, { status: 400 });
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ success: false, message: 'File must be an image (screenshot)' }, { status: 400 });
    }

    // Max 5MB
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ success: false, message: 'File size must be under 5MB' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure directory exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'payment-proofs');
    await mkdir(uploadDir, { recursive: true });

    // Unique filename
    const ext = file.name.split('.').pop() || 'png';
    const filename = `proof-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const savePath = path.join(uploadDir, filename);
    await writeFile(savePath, buffer);

    const url = `/uploads/payment-proofs/${filename}`;

    return NextResponse.json({ success: true, url });
  } catch (error) {
    console.error('Payment proof upload error:', error);
    return NextResponse.json({ success: false, message: 'Upload failed. Please try again.' }, { status: 500 });
  }
}
