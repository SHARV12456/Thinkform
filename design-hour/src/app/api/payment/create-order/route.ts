import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, currency = 'INR', receipt = 'receipt_1' } = body;

    // We will use mock keys if real keys are not provided in env for now
    // In production, these must be in .env.local
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder_key',
      key_secret: process.env.RAZORPAY_KEY_SECRET || 'rzp_test_placeholder_secret',
    });

    const options = {
      amount: amount * 100, // Amount is in currency subunits (paise for INR)
      currency,
      receipt,
      payment_capture: 1, // Auto capture
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({ order }, { status: 200 });
  } catch (error) {
    console.error('Razorpay Error:', error);
    return NextResponse.json(
      { error: 'Failed to create order', details: error },
      { status: 500 }
    );
  }
}
