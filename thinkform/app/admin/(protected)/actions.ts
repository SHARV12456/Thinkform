'use server';

import { cookies } from 'next/headers';
import { verifyAdminCredentials, createAdminSession } from '@/lib/auth';

export async function loginAction(email: string, password: string) {
  try {
    const { verified, user } = await verifyAdminCredentials(email, password);
    if (!verified || !user) {
      return { success: false, error: 'Invalid credentials.' };
    }

    const sessionToken = await createAdminSession(user.id);
    const cookieStore = await cookies();
    cookieStore.set('tf_admin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    return { success: true };
  } catch (err) {
    console.error('loginAction error:', err);
    return { success: false, error: 'Server error — check logs.' };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('tf_admin_session');
  return { success: true };
}
