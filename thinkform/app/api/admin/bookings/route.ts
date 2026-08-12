import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { verifyAuthToken } from '@/lib/auth';

function normalizePgRow(row: any) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    workingOn: row.workingOn ?? row.workingon,
    challenge: row.challenge,
    figureOut: row.figureOut ?? row.figureout,
    website: row.website,
    sessionType: row.sessionType ?? row.sessiontype,
    preferredDate: row.preferredDate ?? row.preferreddate,
    preferredTime: row.preferredTime ?? row.preferredtime,
    status: row.status,
    adminNotes: row.adminNotes ?? row.adminnotes,
    scheduledDate: row.scheduledDate ?? row.scheduleddate,
    scheduledTime: row.scheduledTime ?? row.scheduledtime,
    meetingType: row.meetingType ?? row.meetingtype,
    meetingLink: row.meetingLink ?? row.meetinglink,
    paymentStatus: row.paymentStatus ?? row.paymentstatus ?? 'PENDING',
    paymentProofUrl: row.paymentProofUrl ?? row.paymentproofurl ?? null,
    paymentAmount: row.paymentAmount ?? row.paymentamount ?? null,
    createdAt: row.createdAt ?? row.createdat,
    updatedAt: row.updatedAt ?? row.updatedat,
  };
}

/**
 * GET /api/admin/bookings
 * Get all booking requests with filtering and pagination
 */
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const cookieStore = await cookies();
    const authToken = cookieStore.get('tf_auth_token');

    if (!authToken?.value || !verifyAuthToken(authToken.value)) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Build where clause
    let whereClause = 'WHERE 1=1';
    const params: any[] = [];

    if (status) {
      params.push(status);
      whereClause += ` AND "status" = $${params.length}`;
    }

    if (search) {
      params.push(`%${search}%`);
      const idx = params.length;
      whereClause += ` AND ("name" ILIKE $${idx} OR "email" ILIKE $${idx} OR "phone" ILIKE $${idx} OR "sessionType" ILIKE $${idx})`;
    }

    // Get total count
    const totalCountResult: any[] = await prisma.$queryRawUnsafe(`SELECT COUNT(*) FROM "BookingRequest" ${whereClause}`, ...params);
    const total = Number(totalCountResult[0].count);

    // Get bookings with pagination
    const offset = (page - 1) * limit;
    const orderDirection = sortOrder === 'asc' ? 'ASC' : 'DESC';
    const rawBookings: any[] = await prisma.$queryRawUnsafe(
      `SELECT * FROM "BookingRequest" ${whereClause} ORDER BY "${sortBy}" ${orderDirection} LIMIT ${limit} OFFSET ${offset}`,
      ...params
    );
    const bookings = rawBookings.map(normalizePgRow);

    return NextResponse.json({
      success: true,
      data: bookings,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}
