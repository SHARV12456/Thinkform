import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

// Configure your email service here
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Verify email is the admin email
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@thinkform.com';
    if (email !== adminEmail) {
      return NextResponse.json(
        { error: 'Email not authorized for password reset' },
        { status: 401 }
      );
    }

    // Generate secure token
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour expiry

    // Save token to database
    await prisma.passwordReset.deleteMany({ email }); // Remove old tokens
    await prisma.passwordReset.create({
      data: {
        email,
        token,
        expiresAt,
      },
    });

    // Send reset email
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin/reset-password/${token}`;

    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM || 'noreply@thinkform.com',
        to: email,
        subject: 'Reset Your ThinkForm Admin Password',
        html: `
          <h2>Password Reset Request</h2>
          <p>You requested a password reset for your ThinkForm admin account.</p>
          <p>Click the link below to reset your password (link expires in 1 hour):</p>
          <a href="${resetUrl}" style="display: inline-block; background-color: #000; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">
            Reset Password
          </a>
          <p>Or copy this link: <code>${resetUrl}</code></p>
          <p>If you didn't request this, ignore this email.</p>
        `,
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Still success - token is saved for manual use
    }

    return NextResponse.json({
      success: true,
      message: 'Password reset link sent to your email',
      // For development: return token if email fails (remove in production)
      ...(process.env.NODE_ENV === 'development' && { token, resetUrl }),
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Failed to process password reset request' },
      { status: 500 }
    );
  }
}
