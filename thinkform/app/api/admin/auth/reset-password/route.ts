import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { updateAdminPassword } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { token, newPassword } = await request.json();

    if (!token || !newPassword) {
      return NextResponse.json(
        { error: 'Token and new password are required' },
        { status: 400 }
      );
    }

    if (typeof newPassword !== 'string' || newPassword.trim().length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    // Verify token exists and hasn't expired
    const resetRecord = await prisma.passwordReset.findUnique({
      where: { token },
    });

    if (!resetRecord || resetRecord.expiresAt < new Date()) {
      return NextResponse.json(
        { error: 'Reset token is invalid or expired' },
        { status: 401 }
      );
    }

    // Get the admin email being reset
    const adminEmail = resetRecord.email;

    // Actually update the password in the database
    const passwordUpdated = await updateAdminPassword(adminEmail, newPassword);

    if (!passwordUpdated) {
      return NextResponse.json(
        { error: 'Failed to update password. Please try again.' },
        { status: 500 }
      );
    }

    // Delete the used token
    await prisma.passwordReset.delete({
      where: { token },
    });

    // Return success
    return NextResponse.json({
      success: true,
      message: 'Password reset successful',
    });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: 'Failed to reset password' },
      { status: 500 }
    );
  }
}
