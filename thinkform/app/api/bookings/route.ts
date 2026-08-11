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

    // Check for duplicate submissions from the same email within 1 hour
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const recentSubmission = await prisma.bookingRequest.findFirst({
      where: {
        email: sanitized.email,
        createdAt: {
          gte: oneHourAgo,
        },
      },
    });

    if (recentSubmission) {
      return NextResponse.json(
        {
          success: false,
          message: 'You have already submitted a request recently. Please wait before submitting again.',
        },
        { status: 429 }
      );
    }

    // Create the booking request
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

    return NextResponse.json(
      {
        success: true,
        message: 'Your request has been submitted successfully.',
        bookingId: bookingRequest.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting booking request:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Unable to submit your request. Please try again later.',
      },
      { status: 500 }
    );
  }
}
