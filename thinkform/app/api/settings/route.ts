export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const rows = await prisma.adminSettings.findMany();
    const settings: Record<string, string> = {};
    rows.forEach(r => { settings[r.key] = r.value; });

    return NextResponse.json({
      success: true,
      settings: {
        whatsappNumber: settings.whatsappNumber || '+919999999999',
      }
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
