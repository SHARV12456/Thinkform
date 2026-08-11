import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { validateBookingForm, sanitizeBookingForm, type BookingFormData } from '@/lib/validation';

/**
 * POST /api/bookings
 * Submit a new booking request
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the form data
    const errors = validateBookingForm(body as BookingFormData);
    if (errors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors,
        },
        { status: 400 }
      );
    }

    // Sanitize the input
    const sanitized = sanitizeBookingForm(body as BookingFormData);


    // Create the booking request using the old schema fields that Next.js has cached
    const bookingRequest = await prisma.bookingRequest.create({
      data: {
        name: sanitized.name!,
        email: sanitized.email!,
        phone: sanitized.phone || null,
        workingOn: sanitized.working_on!,
        challenge: sanitized.challenge || null,
        figureOut: sanitized.figure_out || null,
        website: sanitized.website || null,
        sessionType: sanitized.session_type || null,
        preferredDate: sanitized.preferred_date ? new Date(sanitized.preferred_date) : null,
        preferredTime: sanitized.preferred_time || null,
        status: 'NEW',
      },
    });

    // Bypass Prisma Client validation cache by writing the new payment fields directly via SQL
    await prisma.$executeRawUnsafe(
      `UPDATE "BookingRequest" SET "paymentProofUrl" = $1, "paymentAmount" = $2, "paymentStatus" = 'PENDING' WHERE "id" = $3`,
      (body as any).paymentProofUrl || null,
      (body as any).paymentAmount || null,
      bookingRequest.id
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Booking request submitted successfully',
        data: bookingRequest,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting booking request:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Unable to submit your request. Please try again later.',
        error: error instanceof Error ? error.stack : String(error),
      },
      { status: 500 }
    );
  }
}
