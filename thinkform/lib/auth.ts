import { cookies } from 'next/headers';
import crypto from 'crypto';
import prisma from '@/lib/prisma';

const AUTH_TOKEN_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours
const ADMIN_SESSION_COOKIE = 'tf_auth_token';
const LEGACY_ADMIN_SESSION_COOKIE = 'tf_admin_session';

/**
 * Get the admin password from environment variable or use default
 */
export function getAdminPassword(): string {
  return (process.env.ADMIN_PASSWORD || 'thinkform2024').trim();
}

/**
 * Hash a password using SHA256 for storage
 */
export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

/**
 * Get the admin email from environment variable or use default
 */
export function getAdminEmail(): string {
  return (process.env.ADMIN_EMAIL || 'admin@thinkform.com').trim();
}

/**
 * Verify admin password
 * Checks the AdminUser table in the database first (hashed password),
 * then falls back to the ADMIN_PASSWORD environment variable.
 */
export async function verifyAdminPassword(password: string): Promise<boolean> {
  if (typeof password !== 'string' || !password.trim()) {
    return false;
  }

  const trimmedPassword = password.trim();

  // 1. Check database AdminUser table first
  try {
    const adminEmail = getAdminEmail();
    const adminUser = await prisma.adminUser.findUnique({
      where: { email: adminEmail },
    });

    if (adminUser) {
      // Compare hashed password
      const hashedInput = hashPassword(trimmedPassword);
      return hashedInput === adminUser.password;
    }
  } catch (dbErr) {
    console.error('AdminUser DB lookup failed, falling back to env var:', dbErr);
  }

  // 2. Fall back to environment variable
  return trimmedPassword === getAdminPassword();
}

/**
 * Update the admin password in the database.
 * Creates the AdminUser record if it doesn't exist yet.
 * Returns true on success, false on DB failure.
 */
export async function updateAdminPassword(email: string, newPassword: string): Promise<boolean> {
  try {
    const hashed = hashPassword(newPassword.trim());

    const existing = await prisma.adminUser.findUnique({
      where: { email },
    });

    if (existing) {
      await prisma.adminUser.update({
        where: { email },
        data: { password: hashed },
      });
    } else {
      await prisma.adminUser.create({
        data: {
          email,
          password: hashed,
          name: 'Admin',
          role: 'admin',
          active: true,
        },
      });
    }

    return true;
  } catch (dbErr) {
    console.error('Failed to update admin password in DB:', dbErr);
    return false;
  }
}

/**
 * Generate an auth token for the admin
 */
export function getAdminSessionSecret(): string {
  return (process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || 'thinkform2024').trim();
}

export function generateAuthToken(): string {
  const nonce = crypto.randomBytes(32).toString('hex');
  const expiresAt = String(Date.now() + AUTH_TOKEN_EXPIRY);
  const payload = `${nonce}:${expiresAt}`;
  const signature = crypto
    .createHmac('sha256', getAdminSessionSecret())
    .update(payload)
    .digest('hex');
  return `${payload}.${signature}`;
}

export function verifyAuthToken(token: string): boolean {
  if (typeof token !== 'string' || !token.trim()) {
    return false;
  }

  const [payload, signature] = token.split('.');
  if (!payload || !signature) {
    return false;
  }

  const expectedSignature = crypto
    .createHmac('sha256', getAdminSessionSecret())
    .update(payload)
    .digest('hex');

  const signatureBuffer = Buffer.from(signature, 'hex');
  const expectedBuffer = Buffer.from(expectedSignature, 'hex');

  if (
    signatureBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)
  ) {
    return false;
  }

  const [nonce, expiresAt] = payload.split(':');
  if (!nonce || !expiresAt) {
    return false;
  }

  const expires = Number(expiresAt);
  if (Number.isNaN(expires)) {
    return false;
  }

  return Date.now() < expires;
}

/**
 * Check if the request is authenticated
 */
export async function isAdminAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const authToken =
      cookieStore.get(ADMIN_SESSION_COOKIE) ||
      cookieStore.get(LEGACY_ADMIN_SESSION_COOKIE);
    return !!authToken?.value && verifyAuthToken(authToken.value);
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
    cookieStore.set(ADMIN_SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: AUTH_TOKEN_EXPIRY,
      path: '/',
    });
    cookieStore.set(LEGACY_ADMIN_SESSION_COOKIE, 'authorized', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
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
    cookieStore.delete(ADMIN_SESSION_COOKIE);
    cookieStore.delete(LEGACY_ADMIN_SESSION_COOKIE);
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
    const authToken =
      cookieStore.get(ADMIN_SESSION_COOKIE) ||
      cookieStore.get(LEGACY_ADMIN_SESSION_COOKIE);
    return authToken?.value || null;
  } catch {
    return null;
  }
}