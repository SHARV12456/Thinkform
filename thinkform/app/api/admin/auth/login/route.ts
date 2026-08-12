import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminPassword, generateAuthToken } from '@/lib/auth';

/**
 * POST /api/admin/auth/login
 * Authenticate admin with password
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { success: false, message: 'Password is required' },
        { status: 400 }
      );
    }

    const verified = await verifyAdminPassword(password);
    if (!verified) {
      return NextResponse.json(
        { success: false, message: 'Invalid password' },
        { status: 401 }
      );
    }

    const token = generateAuthToken();
    const response = NextResponse.json({
      success: true,
      message: 'Authentication successful',
    });

    response.cookies.set('tf_auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60,
      path: '/',
    });
    response.cookies.set('tf_admin_session', 'authorized', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json(
      { success: false, message: 'Authentication failed' },
      { status: 500 }
    );
  }
}
