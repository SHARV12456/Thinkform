'use server';

import { cookies } from 'next/headers';
import { verifyAdminPassword, generateAuthToken } from '@/lib/auth';

export async function loginAction(password: string) {
  const verified = await verifyAdminPassword(password);
  if (verified) {
    const token = generateAuthToken();
    const cookieStore = await cookies();
    cookieStore.set('tf_auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });
    cookieStore.set('tf_admin_session', 'authorized', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });
    return { success: true };
  }
  return { success: false, error: 'Incorrect password.' };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('tf_auth_token');
  cookieStore.delete('tf_admin_session');
  return { success: true };
}
