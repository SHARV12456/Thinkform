import { cookies } from 'next/headers';
import crypto from 'crypto';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'thinkform2024';
const AUTH_TOKEN_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Hash a password using SHA256 for storage
 */
export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

/**
 * Verify admin password
 */
export function verifyAdminPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

/**
 * Generate an auth token for the admin
 */
export function generateAuthToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Check if the request is authenticated
 */
export async function isAdminAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('tf_auth_token');
    return !!authToken?.value;
  } catch {
    return false;
  }
}

/**
 * Set admin authentication cookie
 */
export async function setAdminAuthCookie(token: string): Promise<void> {
  try {
    const cookieStore = await cookies();
    cookieStore.set('tf_auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: AUTH_TOKEN_EXPIRY,
      path: '/',
    });
  } catch {
    throw new Error('Failed to set authentication cookie');
  }
}

/**
 * Clear admin authentication cookie
 */
export async function clearAdminAuthCookie(): Promise<void> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('tf_auth_token');
  } catch {
    throw new Error('Failed to clear authentication cookie');
  }
}

/**
 * Get the auth token from cookies
 */
export async function getAuthToken(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('tf_auth_token');
    return authToken?.value || null;
  } catch {
    return null;
  }
}
