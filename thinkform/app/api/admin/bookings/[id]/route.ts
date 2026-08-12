import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { verifyAuthToken } from '@/lib/auth';

// PostgreSQL raw queries return lowercase keys; normalize to camelCase
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
 * GET /api/admin/bookings/[id]
 * Get a specific booking request
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;

    // Use raw SQL to bypass Next.js Prisma cache and fetch all fields including the new payment ones
    const bookings: any[] = await prisma.$queryRawUnsafe(`SELECT * FROM "BookingRequest" WHERE "id" = $1 LIMIT 1`, id);
    const booking = normalizePgRow(bookings[0]);

    if (!booking) {
      return NextResponse.json(
        { success: false, message: 'Booking not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error('Error fetching booking:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch booking' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/bookings/[id]
 * Update a booking request
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;
    const body = await request.json();

    // Verify booking exists
    const existing = await prisma.bookingRequest.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, message: 'Booking not found' },
        { status: 404 }
      );
    }

    // Allowed fields to update
    const allowedFields = [
      'status',
      'adminNotes',
      'scheduledDate',
      'scheduledTime',
      'meetingType',
      'meetingLink',
      'paymentStatus',
    ];

    // Filter body to only allowed fields
    const updateData: any = {};
    for (const field of allowedFields) {
      if (field in body) {
        updateData[field] = body[field];
      }
    }

    // Update the booking using raw SQL to bypass the cache limitation
    let setClauses = [];
    let values = [];
    let idx = 1;

    for (const [key, value] of Object.entries(updateData)) {
      setClauses.push(`"${key}" = $${idx}`);
      values.push(value);
      idx++;
    }

    setClauses.push(`"updatedAt" = NOW()`);

    if (setClauses.length > 1) { // >1 because updatedAt is always added
      values.push(id);
      await prisma.$executeRawUnsafe(
        `UPDATE "BookingRequest" SET ${setClauses.join(', ')} WHERE "id" = $${idx}`,
        ...values
      );
    }

    // Fetch the updated booking to return
    const updatedBookings: any[] = await prisma.$queryRawUnsafe(`SELECT * FROM "BookingRequest" WHERE "id" = $1 LIMIT 1`, id);
    const updated = normalizePgRow(updatedBookings[0]);

    return NextResponse.json({
      success: true,
      message: 'Booking updated successfully',
      data: updated,
    });
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update booking' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/bookings/[id]
 * Delete a booking request (soft delete by marking as CANCELLED)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;

    // Verify booking exists
    const existing = await prisma.bookingRequest.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, message: 'Booking not found' },
        { status: 404 }
      );
    }

    // Soft delete by marking as CANCELLED
    const updated = await prisma.bookingRequest.update({
      where: { id },
      data: { status: 'CANCELLED' },
    });

    return NextResponse.json({
      success: true,
      message: 'Booking cancelled successfully',
      data: updated,
    });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to cancel booking' },
      { status: 500 }
    );
  }
}
