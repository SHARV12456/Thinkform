import { NextRequest, NextResponse } from 'next/server';
import { consumePasswordResetToken } from '@/lib/auth';
import { logAdminSecurityEvent, getRequestIp } from '@/lib/security';

export async function POST(request: NextRequest) {
  const ip = getRequestIp(request);
  const userAgent = request.headers.get('user-agent') ?? undefined;

  try {
    const body = await request.json();
    const { token, newPassword } = body;

    if (!token || !newPassword || typeof token !== 'string' || typeof newPassword !== 'string') {
      await logAdminSecurityEvent('token_validation_failed', ip, userAgent, 'missing fields');
      return NextResponse.json(
        { success: false, message: 'The password reset link is invalid or expired.' },
        { status: 400 }
      );
    }

    if (newPassword.trim().length < 12) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 12 characters.' },
        { status: 400 }
      );
    }

    const result = await consumePasswordResetToken(token, newPassword);
    if (!result.success) {
      await logAdminSecurityEvent('token_validation_failed', ip, userAgent, 'invalid or expired reset token');
      return NextResponse.json(
        { success: false, message: 'The password reset link is invalid or expired.' },
        { status: 401 }
      );
    }

    await logAdminSecurityEvent('password_reset_completed', ip, userAgent, 'reset successful');

    return NextResponse.json({
      success: true,
      message: 'Your password has been reset. Please sign in with your new password.',
    });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { success: false, message: 'The password reset link is invalid or expired.' },
      { status: 500 }
    );
  }
}
