import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const qrPath = path.join(process.cwd(), 'public', 'payment-qr.png');
    const exists = fs.existsSync(qrPath);
    return NextResponse.json({ exists });
  } catch (error) {
    return NextResponse.json({ exists: false });
  }
}
