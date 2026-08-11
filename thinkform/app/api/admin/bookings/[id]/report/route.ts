import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

// PATCH /api/admin/bookings/[id]/report — save session report
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    if (!cookieStore.get('tf_auth_token')?.value) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const reportJson = JSON.stringify(body);

    await prisma.$executeRawUnsafe(
      `UPDATE "BookingRequest" SET "sessionReport" = $1, "updatedAt" = NOW() WHERE "id" = $2`,
      reportJson,
      id
    );

    return NextResponse.json({ success: true, message: 'Report saved' });
  } catch (error) {
    console.error('Error saving report:', error);
    return NextResponse.json({ success: false, message: 'Failed to save report' }, { status: 500 });
  }
}

// GET /api/admin/bookings/[id]/report — fetch session report
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    if (!cookieStore.get('tf_auth_token')?.value) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const rows: any[] = await prisma.$queryRawUnsafe(
      `SELECT "sessionReport" FROM "BookingRequest" WHERE "id" = $1 LIMIT 1`,
      id
    );

    if (!rows[0]) return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 });

    const raw = rows[0].sessionReport ?? rows[0].sessionreport;
    const report = raw ? JSON.parse(raw) : null;

    return NextResponse.json({ success: true, data: report });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to fetch report' }, { status: 500 });
  }
}
