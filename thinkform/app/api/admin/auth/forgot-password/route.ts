import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { getAdminEmail } from '@/lib/auth';

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

    // Verify email is the admin email (from env var or database)
    const adminEmail = getAdminEmail();

    // Check if the email matches the configured admin email, or exists in the AdminUser table
    let isAdmin = email === adminEmail;
    if (!isAdmin) {
      try {
        const dbUser = await prisma.adminUser.findUnique({
          where: { email },
        });
        isAdmin = !!dbUser;
      } catch (dbErr) {
        isAdmin = false;
      }
    }

    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Email not authorized for password reset' },
        { status: 401 }
      );
    }

    // Generate secure token
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour expiry

    // Save token to database (handle DB errors so endpoint won't 500)
    let dbSaved = true;
    try {
      await prisma.passwordReset.deleteMany({ where: { email } }); // Remove old tokens
      await prisma.passwordReset.create({
        data: {
          email,
          token,
          expiresAt,
        },
      });
    } catch (dbErr) {
      dbSaved = false;
      console.error('PasswordReset DB error:', dbErr);
    }

    // Send reset email
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin/reset-password/${token}`;

    let emailSent = true;
    let emailErrorMessage: string | undefined = undefined;
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
    } catch (emailError: any) {
      emailSent = false;
      emailErrorMessage = (emailError && emailError.message) ? String(emailError.message) : String(emailError);
      console.error('Email sending failed:', emailError);
    }

    return NextResponse.json({
      success: true,
      message: dbSaved
        ? emailSent
          ? 'Password reset link sent to your email'
          : 'Password reset token created, but sending email failed'
        : 'Password reset processed (database unavailable). Contact an admin to complete reset or run migrations.',
      // For development: return token & resetUrl to make testing easier
      ...(process.env.NODE_ENV === 'development' && { token, resetUrl }),
      dbSaved,
      emailSent,
      ...(process.env.NODE_ENV !== 'production' && emailErrorMessage ? { emailErrorMessage } : {}),
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Failed to process password reset request' },
      { status: 500 }
    );
  }
}
