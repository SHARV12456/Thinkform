import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/auth';
import prisma from '@/lib/prisma';

// GET all settings
export async function GET() {
  try {
    const ok = await isAdminAuthenticated();
    if (!ok) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    const rows = await prisma.adminSettings.findMany();
    const settings: Record<string, string> = {};
    rows.forEach(r => { settings[r.key] = r.value; });
    return NextResponse.json({ success: true, settings });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

// POST – upsert one or many settings
export async function POST(request: NextRequest) {
  try {
    const ok = await isAdminAuthenticated();
    if (!ok) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const entries: Record<string, string> = body.settings ?? {};

    for (const [key, value] of Object.entries(entries)) {
      await prisma.adminSettings.upsert({
        where:  { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
