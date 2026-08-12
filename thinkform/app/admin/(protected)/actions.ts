'use server';

import { cookies } from 'next/headers';
import { verifyAdminCredentials, createAdminSession } from '@/lib/auth';

export async function loginAction(email: string, password: string) {
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
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('tf_admin_session');
  return { success: true };
}
