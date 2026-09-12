import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import crypto from "crypto";

// Create Prisma client - handles connection based on DATABASE_URL
const prisma = new PrismaClient();

// ===== TYPES =====
export interface AuthSession {
  adminId: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: string;
  permissions: string[];
  token: string;
  expiresAt: number;
}

export interface AdminWithRole {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: {
    id: string;
    name: string;
    permissions: Array<{ name: string }>;
  };
}

// ===== CONFIGURATION =====
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes
const PASSWORD_RESET_DURATION = 1 * 60 * 60 * 1000; // 1 hour

// ===== SESSION MANAGEMENT =====
export async function createSession(
  adminId: string,
  ipAddress?: string,
  userAgent?: string
): Promise<AuthSession> {
  const admin = await prisma.admin.findUnique({
    where: { id: adminId },
    include: {
      role: {
        include: {
          permissions: {
            select: { name: true },
          },
        },
      },
    },
  });

  if (!admin) {
    throw new Error("Admin not found");
  }

  const token = generateSecureToken();
  const expiresAt = new Date(Date.now() + SESSION_DURATION);

  await prisma.adminSession.create({
    data: {
      adminId,
      token,
      ipAddress,
      userAgent,
      expiresAt,
    },
  });

  // Update last login
  await prisma.admin.update({
    where: { id: adminId },
    data: {
      lastLogin: new Date(),
      failedAttempts: 0,
      lockedUntil: null,
    },
  });

  return {
    adminId: admin.id,
    email: admin.email,
    firstName: admin.firstName,
    lastName: admin.lastName,
    role: admin.role.name,
    permissions: admin.role.permissions.map((p) => p.name),
    token,
    expiresAt: expiresAt.getTime(),
  };
}

export async function validateSession(
  token: string
): Promise<AuthSession | null> {
  const session = await prisma.adminSession.findUnique({
    where: { token },
    include: {
      admin: {
        include: {
          role: {
            include: {
              permissions: {
                select: { name: true },
              },
            },
          },
        },
      },
    },
  });

  if (
    !session ||
    !session.isValid ||
    new Date() > session.expiresAt ||
    !session.admin.isActive
  ) {
    return null;
  }

  return {
    adminId: session.admin.id,
    email: session.admin.email,
    firstName: session.admin.firstName,
    lastName: session.admin.lastName,
    role: session.admin.role.name,
    permissions: session.admin.role.permissions.map((p) => p.name),
    token,
    expiresAt: session.expiresAt.getTime(),
  };
}

export async function invalidateSession(token: string): Promise<void> {
  await prisma.adminSession.update({
    where: { token },
    data: { isValid: false },
  });
}

// ===== AUTHENTICATION =====
export async function authenticateAdmin(
  email: string,
  password: string,
  ipAddress?: string
): Promise<AuthSession> {
  const normalizedEmail = email.toLowerCase().trim();

  const admin = await prisma.admin.findUnique({
    where: { email: normalizedEmail },
    include: {
      role: {
        include: {
          permissions: {
            select: { name: true },
          },
        },
      },
    },
  });

  if (!admin || !admin.isActive) {
    // Log failed attempt for non-existent/inactive accounts
    await recordFailedAttempt(normalizedEmail, ipAddress);
    throw new Error("Invalid email or password");
  }

  // Check if account is locked
  if (admin.lockedUntil && new Date() < admin.lockedUntil) {
    throw new Error("Account is temporarily locked. Try again later.");
  }

  // Verify password
  const isValidPassword = await bcrypt.compare(password, admin.password);

  if (!isValidPassword) {
    // Record failed attempt
    const newFailedAttempts = admin.failedAttempts + 1;
    const lockoutData =
      newFailedAttempts >= MAX_FAILED_ATTEMPTS
        ? { lockedUntil: new Date(Date.now() + LOCKOUT_DURATION) }
        : {};

    await prisma.admin.update({
      where: { id: admin.id },
      data: {
        failedAttempts: newFailedAttempts,
        ...lockoutData,
      },
    });

    throw new Error("Invalid email or password");
  }

  // Create session
  return createSession(admin.id, ipAddress);
}

// ===== ADMIN MANAGEMENT =====
export async function createAdmin(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  roleName: string
): Promise<AdminWithRole> {
  const normalizedEmail = email.toLowerCase().trim();

  // Validate password strength
  validatePassword(password);

  // Check if email already exists
  const existing = await prisma.admin.findUnique({
    where: { email: normalizedEmail },
  });

  if (existing) {
    throw new Error("Email already in use");
  }

  // Get role
  const role = await prisma.role.findUnique({
    where: { name: roleName },
    include: {
      permissions: {
        select: { name: true },
      },
    },
  });

  if (!role) {
    throw new Error(`Role "${roleName}" not found`);
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create admin
  const admin = await prisma.admin.create({
    data: {
      email: normalizedEmail,
      password: hashedPassword,
      firstName,
      lastName,
      roleId: role.id,
    },
    include: {
      role: {
        include: {
          permissions: {
            select: { name: true },
          },
        },
      },
    },
  });

  return formatAdminResponse(admin);
}

export async function updateAdmin(
  adminId: string,
  updates: {
    firstName?: string;
    lastName?: string;
    roleName?: string;
    isActive?: boolean;
  }
): Promise<AdminWithRole> {
  const data: any = {};

  if (updates.firstName !== undefined) data.firstName = updates.firstName;
  if (updates.lastName !== undefined) data.lastName = updates.lastName;
  if (updates.isActive !== undefined) data.isActive = updates.isActive;

  if (updates.roleName) {
    const role = await prisma.role.findUnique({
      where: { name: updates.roleName },
    });
    if (!role) throw new Error(`Role "${updates.roleName}" not found`);
    data.roleId = role.id;
  }

  const admin = await prisma.admin.update({
    where: { id: adminId },
    data,
    include: {
      role: {
        include: {
          permissions: {
            select: { name: true },
          },
        },
      },
    },
  });

  return formatAdminResponse(admin);
}

export async function listAdmins(): Promise<AdminWithRole[]> {
  const admins = await prisma.admin.findMany({
    include: {
      role: {
        include: {
          permissions: {
            select: { name: true },
          },
        },
      },
    },
  });

  return admins.map(formatAdminResponse);
}

export async function deleteAdmin(adminId: string): Promise<void> {
  await prisma.admin.delete({
    where: { id: adminId },
  });
}

// ===== PASSWORD MANAGEMENT =====
export async function initiatePasswordReset(email: string): Promise<string> {
  const normalizedEmail = email.toLowerCase().trim();

  const admin = await prisma.admin.findUnique({
    where: { email: normalizedEmail },
  });

  if (!admin) {
    // Don't reveal whether email exists
    return generateSecureToken();
  }

  const token = generateSecureToken();
  const expiresAt = new Date(Date.now() + PASSWORD_RESET_DURATION);

  await prisma.passwordResetToken.create({
    data: {
      adminId: admin.id,
      token,
      expiresAt,
    },
  });

  return token;
}

export async function resetPassword(
  token: string,
  newPassword: string
): Promise<void> {
  validatePassword(newPassword);

  const resetToken = await prisma.passwordResetToken.findUnique({
    where: { token },
  });

  if (!resetToken || resetToken.usedAt || new Date() > resetToken.expiresAt) {
    throw new Error("Invalid or expired reset token");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update password
  await prisma.admin.update({
    where: { id: resetToken.adminId },
    data: {
      password: hashedPassword,
      failedAttempts: 0,
      lockedUntil: null,
    },
  });

  // Mark token as used
  await prisma.passwordResetToken.update({
    where: { token },
    data: { usedAt: new Date() },
  });

  // Invalidate all sessions
  await prisma.adminSession.updateMany({
    where: { adminId: resetToken.adminId },
    data: { isValid: false },
  });
}

export async function changePassword(
  adminId: string,
  currentPassword: string,
  newPassword: string
): Promise<void> {
  validatePassword(newPassword);

  const admin = await prisma.admin.findUnique({
    where: { id: adminId },
  });

  if (!admin) throw new Error("Admin not found");

  const isValid = await bcrypt.compare(currentPassword, admin.password);
  if (!isValid) throw new Error("Current password is incorrect");

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.admin.update({
    where: { id: adminId },
    data: { password: hashedPassword },
  });

  // Invalidate all sessions
  await prisma.adminSession.updateMany({
    where: { adminId },
    data: { isValid: false },
  });
}

// ===== HELPERS =====
function generateSecureToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

function validatePassword(password: string): void {
  if (password.length < 12) {
    throw new Error("Password must be at least 12 characters long");
  }
  if (!/[A-Z]/.test(password)) {
    throw new Error("Password must contain uppercase letters");
  }
  if (!/[a-z]/.test(password)) {
    throw new Error("Password must contain lowercase letters");
  }
  if (!/[0-9]/.test(password)) {
    throw new Error("Password must contain numbers");
  }
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    throw new Error("Password must contain special characters");
  }
}

async function recordFailedAttempt(
  email: string,
  _ipAddress?: string
): Promise<void> {
  const admin = await prisma.admin.findUnique({
    where: { email },
  });

  if (!admin) return;

  const newFailedAttempts = admin.failedAttempts + 1;
  const lockoutData =
    newFailedAttempts >= MAX_FAILED_ATTEMPTS
      ? { lockedUntil: new Date(Date.now() + LOCKOUT_DURATION) }
      : {};

  await prisma.admin.update({
    where: { id: admin.id },
    data: {
      failedAttempts: newFailedAttempts,
      ...lockoutData,
    },
  });
}

function formatAdminResponse(admin: any): AdminWithRole {
  return {
    id: admin.id,
    email: admin.email,
    firstName: admin.firstName,
    lastName: admin.lastName,
    role: {
      id: admin.role.id,
      name: admin.role.name,
      permissions: admin.role.permissions,
    },
  };
}
