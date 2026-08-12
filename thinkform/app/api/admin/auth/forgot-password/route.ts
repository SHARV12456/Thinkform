import { NextRequest, NextResponse } from 'next/server';
import { createPasswordResetToken, ensureAdminUser, validateEmail } from '@/lib/auth';
import { sendResetPasswordEmail } from '@/lib/email';
import { logAdminSecurityEvent, getRequestIp, isRateLimited } from '@/lib/security';

const FORGOT_PASSWORD_WINDOW_MINUTES = 15;
const FORGOT_PASSWORD_LIMIT = 5;

export async function POST(request: NextRequest) {
  const ip = getRequestIp(request);
  const userAgent = request.headers.get('user-agent') ?? undefined;

  try {
    const body = await request.json();
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';

    if (!validateEmail(email)) {
      await logAdminSecurityEvent('forgot_password_requested', ip, userAgent, 'invalid email');
      return NextResponse.json({
        success: true,
        message: 'If an account exists for this email, you will receive password reset instructions shortly.',
      });
    }

    if (await isRateLimited('forgot_password_requested', ip, FORGOT_PASSWORD_LIMIT, FORGOT_PASSWORD_WINDOW_MINUTES)) {
      await logAdminSecurityEvent('rate_limit', ip, userAgent, 'forgot-password rate limit');
      return NextResponse.json({
        success: true,
        message: 'If an account exists for this email, you will receive password reset instructions shortly.',
      });
    }

    let adminUser = await ensureAdminUser(email);
    if (!adminUser) {
      await logAdminSecurityEvent('forgot_password_requested', ip, userAgent, `email=${email}`);
      return NextResponse.json({
        success: true,
        message: 'If an account exists for this email, you will receive password reset instructions shortly.',
      });
    }

    const rawToken = await createPasswordResetToken(adminUser.id, email);
    const appUrl = process.env.APP_URL?.trim() || 'http://localhost:3000';
    const resetUrl = `${appUrl}/admin/reset-password/${rawToken}`;
    let emailSent = true;
    let emailErrorMessage: string | null = null;

    try {
      await sendResetPasswordEmail({ to: email, resetUrl });
      await logAdminSecurityEvent('forgot_password_requested', ip, userAgent, `adminId=${adminUser.id}`);
    } catch (emailError) {
      emailSent = false;
      emailErrorMessage = emailError instanceof Error ? emailError.message : String(emailError);
      console.error('Failed to send reset email:', emailError);
      await logAdminSecurityEvent('forgot_password_requested', ip, userAgent, `email-send-failed adminId=${adminUser.id}`);
    }

    return NextResponse.json({
      success: true,
      message: 'If an account exists for this email, you will receive password reset instructions shortly.',
      ...(process.env.NODE_ENV !== 'production' ? { resetUrl, emailSent, emailErrorMessage } : {}),
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { success: true, message: 'If an account exists for this email, you will receive password reset instructions shortly.' },
      { status: 200 }
    );
  }
}
