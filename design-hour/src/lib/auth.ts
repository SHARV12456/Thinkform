import { createHash, createHmac, randomBytes, timingSafeEqual } from 'crypto';

export const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7;
export const RESET_TOKEN_TTL_MS = 1000 * 60 * 15;

const globalState = globalThis as typeof globalThis & {
  __dhSessions?: Map<string, { email: string; expiresAt: number }>;
  __dhResetTokens?: Map<string, { email: string; expiresAt: number; used: boolean }>;
  __dhLoginAttempts?: Map<string, { count: number; resetAt: number }>;
};

globalState.__dhSessions ??= new Map<string, { email: string; expiresAt: number }>();
globalState.__dhResetTokens ??= new Map<string, { email: string; expiresAt: number; used: boolean }>();
globalState.__dhLoginAttempts ??= new Map<string, { count: number; resetAt: number }>();

export const authSessions = globalState.__dhSessions;
export const resetTokens = globalState.__dhResetTokens;
export const loginAttempts = globalState.__dhLoginAttempts;

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || 'dev-only-change-this-secret';
}

function encodePayload(value: Record<string, string | number>) {
  return Buffer.from(JSON.stringify(value)).toString('base64url');
}

function decodePayload(value: string) {
  return JSON.parse(Buffer.from(value, 'base64url').toString('utf8')) as Record<string, string | number>;
}

function signSessionPayload(payload: Record<string, string | number>) {
  const encodedPayload = encodePayload(payload);
  const signature = createHmac('sha256', getSessionSecret())
    .update(encodedPayload)
    .digest('base64url');

  return `${encodedPayload}.${signature}`;
}

function verifySessionPayload(token: string) {
  const [encodedPayload, signature] = token.split('.');
  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = createHmac('sha256', getSessionSecret())
    .update(encodedPayload)
    .digest('base64url');

  if (!secureCompare(signature, expectedSignature)) {
    return null;
  }

  try {
    return decodePayload(encodedPayload);
  } catch {
    return null;
  }
}

export function sanitizeInput(value: string | null | undefined) {
  return typeof value === 'string' ? value.trim().replace(/\s+/g, ' ') : '';
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function passwordMeetsRequirements(password: string) {
  if (password.length < 12) return false;
  if (!/[a-z]/.test(password)) return false;
  if (!/[A-Z]/.test(password)) return false;
  if (!/\d/.test(password)) return false;
  if (!/[^A-Za-z0-9]/.test(password)) return false;
  return true;
}

export function getPasswordError(password: string) {
  if (!password) return 'Password is required.';
  if (password.length < 12) return 'Password must be at least 12 characters long.';
  if (!/[a-z]/.test(password)) return 'Password must include at least one lowercase letter.';
  if (!/[A-Z]/.test(password)) return 'Password must include at least one uppercase letter.';
  if (!/\d/.test(password)) return 'Password must include at least one number.';
  if (!/[^A-Za-z0-9]/.test(password)) return 'Password must include at least one symbol.';
  return null;
}

export function hashValue(value: string) {
  return createHash('sha256').update(value).digest('hex');
}

export function generateSecureToken(bytes = 32) {
  return randomBytes(bytes).toString('hex');
}

export function getClientIp(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = forwarded?.split(',')[0]?.trim() ?? realIp ?? 'unknown-ip';
  return ip;
}

export function isRateLimited(key: string, maxAttempts = 5, windowMs = 15 * 60 * 1000) {
  const now = Date.now();
  const existing = loginAttempts.get(key);

  if (!existing || now - existing.resetAt > windowMs) {
    loginAttempts.set(key, { count: 1, resetAt: now });
    return false;
  }

  if (existing.count >= maxAttempts) {
    return true;
  }

  existing.count += 1;
  loginAttempts.set(key, existing);
  return false;
}

export function secureCompare(a: string, b: string) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);
  if (aBuffer.length !== bBuffer.length) {
    return false;
  }
  return timingSafeEqual(aBuffer, bBuffer);
}

export function getConfiguredAdminCredentials() {
  const email = sanitizeInput(process.env.ADMIN_EMAIL).toLowerCase();
  const password = process.env.ADMIN_PASSWORD ?? '';

  if (!email || !password) {
    return null;
  }

  return { email, password };
}

export function createSession(email: string) {
  const sessionId = generateSecureToken();
  const expiresAt = Date.now() + SESSION_TTL_MS;
  authSessions.set(sessionId, { email, expiresAt });

  return {
    sessionId,
    token: signSessionPayload({ sessionId, email, expiresAt }),
    expiresAt,
  };
}

export function getSessionByToken(token: string) {
  const payload = verifySessionPayload(token);
  if (!payload || !payload.sessionId || !payload.email || !payload.expiresAt) {
    return null;
  }

  const sessionId = String(payload.sessionId);
  const expiresAt = Number(payload.expiresAt);
  const session = authSessions.get(sessionId);

  if (!session) {
    return null;
  }

  if (session.email !== payload.email || session.expiresAt !== expiresAt) {
    authSessions.delete(sessionId);
    return null;
  }

  if (session.expiresAt <= Date.now()) {
    authSessions.delete(sessionId);
    return null;
  }

  return session;
}

export function deleteSession(token: string) {
  const payload = verifySessionPayload(token);
  if (!payload || !payload.sessionId) {
    return;
  }

  authSessions.delete(String(payload.sessionId));
}

export function createResetToken(email: string) {
  const rawToken = generateSecureToken();
  const hashedToken = hashValue(rawToken);
  resetTokens.set(hashedToken, {
    email,
    expiresAt: Date.now() + RESET_TOKEN_TTL_MS,
    used: false,
  });
  return rawToken;
}

export function verifyResetToken(rawToken: string) {
  const hashedToken = hashValue(rawToken);
  const resetToken = resetTokens.get(hashedToken);

  if (!resetToken) return null;
  if (resetToken.used) return null;
  if (resetToken.expiresAt <= Date.now()) {
    resetTokens.delete(hashedToken);
    return null;
  }

  return resetToken;
}

export function consumeResetToken(rawToken: string) {
  const hashedToken = hashValue(rawToken);
  const resetToken = resetTokens.get(hashedToken);
  if (!resetToken) return false;
  resetToken.used = true;
  resetTokens.set(hashedToken, resetToken);
  return true;
}

export function invalidateAllSessionsForEmail(email: string) {
  for (const [token, session] of authSessions.entries()) {
    if (session.email === email) {
      authSessions.delete(token);
    }
  }
}
