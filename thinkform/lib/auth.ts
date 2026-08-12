import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import crypto from 'crypto';
import argon2 from 'argon2';
import prisma from '@/lib/prisma';

const ADMIN_SESSION_COOKIE = 'tf_admin_session';
const SESSION_DURATION_SECONDS = 24 * 60 * 60; // 24 hours
const RESET_TOKEN_EXPIRY_MINUTES = 15;
const DEFAULT_ADMIN_EMAIL = 'admin@thinkform.com';
const DEFAULT_ADMIN_PASSWORD = 'thinkform2024';

function normalizeEmail(input: string): string {
  return input.trim().toLowerCase();
}

export function getAdminEmail(): string {
  return normalizeEmail(process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL);
}

export function getAdminPassword(): string {
  return (process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD).trim();
}

export function validateEmail(email: string): boolean {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export async function hashPassword(password: string): Promise<string> {
  return argon2.hash(password, { type: argon2.argon2id });
}

export function isLegacyHash(storedPassword: string): boolean {
  return /^[0-9a-f]{64}$/.test(storedPassword);
}

export async function verifyPasswordHash(password: string, storedPassword: string): Promise<boolean> {
  if (storedPassword.startsWith('$argon2id$')) {
    return argon2.verify(storedPassword, password);
  }

  if (isLegacyHash(storedPassword)) {
    const candidate = crypto.createHash('sha256').update(password).digest('hex');
    return crypto.timingSafeEqual(Buffer.from(candidate, 'hex'), Buffer.from(storedPassword, 'hex'));
  }

  return false;
}

export async function findAdminUserByEmail(email: string) {
  return prisma.adminUser.findUnique({ where: { email: normalizeEmail(email) } });
}

export async function createAdminUserFromEnv() {
  const adminEmail = getAdminEmail();
  const adminPassword = getAdminPassword();
  const hashedPassword = await hashPassword(adminPassword);

  return prisma.adminUser.create({
    data: {
      email: adminEmail,
      password: hashedPassword,
      name: 'Admin',
      role: 'admin',
      active: true,
    },
  });
}

export async function ensureAdminUser(email: string) {
  const normalizedEmail = normalizeEmail(email);
  const existing = await prisma.adminUser.findUnique({ where: { email: normalizedEmail } });
  if (existing) return existing;

  if (normalizedEmail === getAdminEmail()) {
    const hashedPassword = await hashPassword(getAdminPassword());
    return prisma.adminUser.create({
      data: {
        email: normalizedEmail,
        password: hashedPassword,
        name: 'Admin',
        role: 'admin',
        active: true,
      },
    });
  }

  return null;
}

export async function verifyAdminCredentials(email: string, password: string) {
  const normalizedEmail = normalizeEmail(email);
  if (!validateEmail(normalizedEmail) || typeof password !== 'string' || !password.trim()) {
    return { verified: false, user: null as null };
  }

  let adminUser = await prisma.adminUser.findUnique({ where: { email: normalizedEmail } });
  if (!adminUser && normalizedEmail === getAdminEmail() && password === getAdminPassword()) {
    adminUser = await createAdminUserFromEnv();
  }

  if (!adminUser) {
    return { verified: false, user: null as null };
  }

  const valid = await verifyPasswordHash(password, adminUser.password);
  if (!valid) {
    return { verified: false, user: adminUser };
  }

  if (isLegacyHash(adminUser.password)) {
    const hashedPassword = await hashPassword(password);
    await prisma.adminUser.update({ where: { id: adminUser.id }, data: { password: hashedPassword } });
    adminUser.password = hashedPassword;
  }

  return { verified: true, user: adminUser };
}

export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export async function createAdminSession(adminUserId: string) {
  const rawToken = crypto.randomBytes(48).toString('hex');
  await prisma.adminSession.create({
    data: {
      adminUserId,
      tokenHash: hashToken(rawToken),
      expiresAt: new Date(Date.now() + SESSION_DURATION_SECONDS * 1000),
    },
  });
  return rawToken;
}

export async function getAdminUserFromSessionToken(rawToken: string) {
  const tokenHash = hashToken(rawToken);
  const session = await prisma.adminSession.findUnique({
    where: { tokenHash },
    include: { adminUser: true },
  });

  if (!session || session.revokedAt || session.expiresAt < new Date()) {
    return null;
  }

  if (!session.adminUser || !session.adminUser.active) {
    return null;
  }

  return session.adminUser;
}

export async function getAdminAuthenticatedUser() {
  try {
    const cookieStore = await cookies();
    const rawToken = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
    if (!rawToken) {
      return null;
    }

    return await getAdminUserFromSessionToken(rawToken);
  } catch (error) {
    console.error('Failed to get authenticated admin user:', error);
    return null;
  }
}

export async function isAdminAuthenticated(): Promise<boolean> {
  try {
    return !!(await getAdminAuthenticatedUser());
  } catch (error) {
    console.error('Admin authentication check failed:', error);
    return false;
  }
}

export async function getAdminUserFromRequest(request: NextRequest) {
  try {
    const rawToken = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
    if (!rawToken) {
      return null;
    }

    return await getAdminUserFromSessionToken(rawToken);
  } catch (error) {
    console.error('Failed to get admin user from request:', error);
    return null;
  }
}

export async function setAdminAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION_SECONDS,
    path: '/',
  });
}

export async function clearAdminAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });
}

export async function invalidateAdminSessions(adminUserId: string) {
  await prisma.adminSession.updateMany({
    where: { adminUserId, revokedAt: null },
    data: { revokedAt: new Date() },
  });
}

export async function createPasswordResetToken(adminUserId: string, email: string) {
  const rawToken = crypto.randomBytes(32).toString('hex');
  const tokenHash = hashToken(rawToken);
  const expiresAt = new Date(Date.now() + RESET_TOKEN_EXPIRY_MINUTES * 60 * 1000);

  await prisma.passwordReset.updateMany({
    where: { adminUserId, usedAt: null },
    data: { usedAt: new Date() },
  });

  await prisma.passwordReset.create({
    data: {
      adminUserId,
      email: normalizeEmail(email),
      tokenHash,
      expiresAt,
    },
  });

  return rawToken;
}

export async function validatePasswordResetToken(rawToken: string) {
  const tokenHash = hashToken(rawToken);
  const resetRecord = await prisma.passwordReset.findUnique({
    where: { tokenHash },
    include: { adminUser: true },
  });

  if (
    !resetRecord ||
    resetRecord.usedAt ||
    resetRecord.expiresAt < new Date() ||
    (!resetRecord.adminUser && !resetRecord.email)
  ) {
    return null;
  }

  if (!resetRecord.adminUser) {
    const adminUser = await ensureAdminUser(resetRecord.email);
    if (!adminUser) return null;
    return { resetRecord, adminUser };
  }

  if (!resetRecord.adminUser.active) {
    return null;
  }

  return { resetRecord, adminUser: resetRecord.adminUser };
}

export async function consumePasswordResetToken(rawToken: string, newPassword: string) {
  const validation = await validatePasswordResetToken(rawToken);
  if (!validation) {
    return { success: false, message: 'The password reset link is invalid or expired.' };
  }

  const { resetRecord, adminUser } = validation;
  const hashedPassword = await hashPassword(newPassword.trim());

  await prisma.$transaction([
    prisma.adminUser.update({
      where: { id: adminUser.id },
      data: { password: hashedPassword },
    }),
    prisma.passwordReset.updateMany({
      where: { adminUserId: adminUser.id, usedAt: null },
      data: { usedAt: new Date() },
    }),
    prisma.adminSession.updateMany({
      where: { adminUserId: adminUser.id, revokedAt: null },
      data: { revokedAt: new Date() },
    }),
  ]);

  return { success: true };
}
