import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminCredentials, createAdminSession } from '@/lib/auth';
import { logAdminSecurityEvent, getRequestIp, isRateLimited } from '@/lib/security';

const MAX_LOGIN_ATTEMPTS = 5;
const LOGIN_WINDOW_MINUTES = 15;

export async function POST(request: NextRequest) {
  const ip = getRequestIp(request);
  const userAgent = request.headers.get('user-agent') ?? undefined;

  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      await logAdminSecurityEvent('login_failed', ip, userAgent, 'missing credentials');
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    if (await isRateLimited('login_failed', ip, MAX_LOGIN_ATTEMPTS, LOGIN_WINDOW_MINUTES)) {
      await logAdminSecurityEvent('rate_limit', ip, userAgent, 'login rate limit triggered');
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 429 }
      );
    }

    const { verified, user } = await verifyAdminCredentials(email, password);
    if (!verified || !user) {
      await logAdminSecurityEvent('login_failed', ip, userAgent, `email=${email}`);
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const sessionToken = await createAdminSession(user.id);
    const response = NextResponse.json({ success: true, message: 'Authentication successful' });

    response.cookies.set('tf_admin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60,
      path: '/',
    });

    await logAdminSecurityEvent('login_success', ip, userAgent, `adminId=${user.id}`);

    return response;
  } catch (error: any) {
    console.error('Error during login:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Authentication failed', 
        error: error?.message || String(error),
        stack: process.env.NODE_ENV !== 'production' ? error?.stack : undefined
      },
      { status: 500 }
    );
  }
}
