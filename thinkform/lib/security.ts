import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export type AdminSecurityEventType =
  | 'login_success'
  | 'login_failed'
  | 'forgot_password_requested'
  | 'password_reset_completed'
  | 'logout'
  | 'rate_limit'
  | 'token_validation_failed';

export function getRequestIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }

  return 'unknown';
}

export async function logAdminSecurityEvent(
  type: AdminSecurityEventType,
  ip?: string,
  userAgent?: string,
  details?: string,
) {
  try {
    await prisma.adminSecurityEvent.create({
      data: {
        type,
        ip,
        userAgent,
        details,
      },
    });
  } catch (error) {
    console.error('Failed to log admin security event:', error);
  }
}

export async function isRateLimited(
  type: AdminSecurityEventType,
  ip: string,
  limit: number,
  windowMinutes: number,
) {
  const since = new Date(Date.now() - windowMinutes * 60 * 1000);
  const count = await prisma.adminSecurityEvent.count({
    where: {
      type,
      ip,
      createdAt: {
        gte: since,
      },
    },
  });
  return count >= limit;
}
