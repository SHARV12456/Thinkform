import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

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

    if (!authToken?.value) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;

    const booking = await prisma.bookingRequest.findUnique({
      where: { id },
    });

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

    if (!authToken?.value) {
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
    ];

    // Filter body to only allowed fields
    const updateData: any = {};
    for (const field of allowedFields) {
      if (field in body) {
        updateData[field] = body[field];
      }
    }

    // Update the booking
    const updated = await prisma.bookingRequest.update({
      where: { id },
      data: updateData,
    });

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

    if (!authToken?.value) {
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
