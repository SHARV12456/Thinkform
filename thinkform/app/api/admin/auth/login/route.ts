import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminPassword, generateAuthToken, setAdminAuthCookie } from '@/lib/auth';

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

    if (!verifyAdminPassword(password)) {
      return NextResponse.json(
        { success: false, message: 'Invalid password' },
        { status: 401 }
      );
    }

    // Generate auth token
    const token = generateAuthToken();

    // Set the auth cookie
    const response = NextResponse.json({
      success: true,
      message: 'Authentication successful',
    });

    response.cookies.set('tf_auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24 hours
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
