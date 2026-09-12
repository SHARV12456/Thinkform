# Multi-Admin System Setup Guide

This guide explains how to set up and manage multiple admin accounts with role-based access control.

## System Architecture

**Database Schema:**
- `Admin` - Admin user accounts with encrypted passwords
- `Role` - Role definitions (Admin, Manager, Viewer)
- `Permission` - Granular permissions assigned to roles
- `AdminSession` - Secure session tracking
- `PasswordResetToken` - Time-limited password reset tokens

**Roles Available:**
- **Admin**: Full access to all features (manage admins, bookings, services, analytics)
- **Manager**: Manage bookings, customers, services; view analytics (cannot manage other admins)
- **Viewer**: Read-only access (dashboard & analytics only)

---

## Setup Instructions

### Step 1: Configure Database

#### For Local Development with PostgreSQL:

```bash
# Install PostgreSQL locally if not already installed
# Windows: Download from https://www.postgresql.org/download/windows/
# Mac: brew install postgresql
# Linux: sudo apt-get install postgresql

# Create database
createdb designhour_db

# Update .env.local with your connection string:
DATABASE_URL="postgresql://postgres:password@localhost:5432/designhour_db"
```

#### For Vercel (Production):

1. Go to [Vercel Dashboard](https://vercel.com)
2. Select your project → Storage → Create Database → Postgres
3. Copy the connection string
4. Add to environment variables:
   ```
   DATABASE_URL=your-connection-string-here
   ```

### Step 2: Initialize Database Schema

```bash
# Run migrations to create tables
npm run db:push

# Seed initial roles and admin account
npm run db:seed
```

**Default Initial Admin:**
- Email: `admin@designhour.in`
- Password: `ServerAdmin!2026`
- Role: **Admin** (full access)

⚠️ **IMPORTANT:** Change this password immediately after first login!

### Step 3: Create Additional Admins

#### Via API (Recommended):

```bash
# POST /api/admin
# Headers: Authorization with valid admin session cookie

curl -X POST http://localhost:3000/api/admin \
  -H "Content-Type: application/json" \
  -b "admin_session=YOUR_SESSION_TOKEN" \
  -d '{
    "email": "manager@designhour.in",
    "password": "SecurePassword!2026",
    "firstName": "John",
    "lastName": "Manager",
    "role": "Manager"
  }'
```

#### Via TypeScript Script:

```typescript
// scripts/create-admin.ts
import { createAdmin } from '@/lib/db-auth';

async function main() {
  const admin = await createAdmin(
    'consultant@designhour.in',
    'SecurePassword!2026',
    'Jane',
    'Consultant',
    'Manager'
  );
  console.log('Created:', admin);
}

main();
```

Run: `npx tsx scripts/create-admin.ts`

---

## Admin Management

### List All Admins

```bash
curl -X GET http://localhost:3000/api/admin \
  -b "admin_session=YOUR_SESSION_TOKEN"
```

### Update Admin

```bash
curl -X PUT http://localhost:3000/api/admin \
  -H "Content-Type: application/json" \
  -b "admin_session=YOUR_SESSION_TOKEN" \
  -d '{
    "adminId": "admin-id-here",
    "firstName": "Updated",
    "lastName": "Name",
    "role": "Viewer",
    "isActive": true
  }'
```

### Deactivate Admin

```bash
curl -X PUT http://localhost:3000/api/admin \
  -H "Content-Type: application/json" \
  -b "admin_session=YOUR_SESSION_TOKEN" \
  -d '{
    "adminId": "admin-id-here",
    "isActive": false
  }'
```

### Delete Admin

```bash
curl -X DELETE 'http://localhost:3000/api/admin?id=admin-id-here' \
  -b "admin_session=YOUR_SESSION_TOKEN"
```

---

## Login Endpoints

### Admin Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@designhour.in",
  "password": "ServerAdmin!2026"
}

# Response:
{
  "success": true,
  "message": "Login successful",
  "adminId": "uuid",
  "role": "Admin"
}

# Cookie: admin_session (HttpOnly, Secure)
```

### Logout

```bash
POST /api/auth/logout

# Response:
{
  "success": true
}

# Cookie: admin_session is deleted
```

### Forgot Password

```bash
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "admin@designhour.in"
}

# Response (always generic):
{
  "success": true,
  "message": "If that email is registered, a password reset link has been sent."
}

# Check console/logs for reset link (TODO: Send via email)
```

### Reset Password

```bash
POST /api/auth/reset-password
Content-Type: application/json

{
  "token": "reset-token-from-email",
  "password": "NewPassword!2026",
  "confirmPassword": "NewPassword!2026"
}

# Response:
{
  "success": true,
  "message": "Password reset successful"
}
```

### Change Password (Authenticated)

```bash
POST /api/auth/change-password
Content-Type: application/json
Cookie: admin_session=token

{
  "currentPassword": "OldPassword!2026",
  "newPassword": "NewPassword!2026"
}

# Response:
{
  "success": true,
  "message": "Password changed successfully"
}
```

---

## Password Requirements

All passwords must have:
- ✅ Minimum 12 characters
- ✅ At least one uppercase letter (A-Z)
- ✅ At least one lowercase letter (a-z)
- ✅ At least one number (0-9)
- ✅ At least one special character (!@#$%^&*()_+-=[]{}';:"\\|,.<>\/?)

**Example valid password:** `SecurePass!2026`

---

## Security Features

1. **Password Hashing**: BCrypt with 10-round salt
2. **Session Tokens**: 64-character hex (256 bits) random tokens
3. **HttpOnly Cookies**: Prevent JavaScript access
4. **Secure Sessions**: HTTPS only in production
5. **Rate Limiting**: 5 failed attempts → 15-minute lockout
6. **Account Lockout**: Temporary suspension after failed attempts
7. **Generic Error Messages**: Don't reveal if email exists (prevents enumeration)
8. **Single-Use Reset Tokens**: Expire after 1 hour
9. **Session Invalidation**: All sessions cleared on password change/reset
10. **IP Tracking**: Logs IP address for security audit trail

---

## Troubleshooting

### Database Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Solution**: Ensure PostgreSQL is running
```bash
# macOS
brew services start postgresql

# Windows
# Start PostgreSQL from Services or installation folder

# Linux
sudo systemctl start postgresql
```

### Migration Failed

```bash
# Reset database (CAUTION: Deletes all data)
npm run prisma:migrate -- --reset

# This will:
# 1. Drop all tables
# 2. Recreate schema from scratch
# 3. Run seed script
```

### Admin Session Cookie Not Set

Check:
1. Is cookie name correct? → `admin_session`
2. Is HTTPS enabled in production?
3. Is SameSite=Lax set correctly?
4. Are cookies enabled in browser?

Debug:
```bash
# Check cookies in browser DevTools
# F12 → Application → Cookies → Select site
```

### Email Reset Links Not Received

**Current Status**: Emails are logged to console only.

**To Enable Email:**
1. Install email service (e.g., SendGrid, AWS SES)
2. Update `src/app/api/auth/forgot-password/route.ts`
3. Replace logger with actual email sending

Example with SendGrid:
```typescript
// Install: npm install @sendgrid/mail

import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

await sgMail.send({
  to: email,
  from: process.env.EMAIL_FROM!,
  subject: "Password Reset - Design Hour",
  html: `<a href="${resetLink}">Reset Password</a>`,
});
```

---

## Environment Variables Reference

```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/designhour_db

# Sessions
ADMIN_SESSION_SECRET=32-character-random-hex-string

# URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000 (or production domain)

# Email (Optional)
SENDGRID_API_KEY=your-sendgrid-key
EMAIL_FROM=noreply@designhour.in
```

---

## Deployment to Vercel

### 1. Add Environment Variables

In Vercel Dashboard → Project → Settings → Environment Variables:

```env
DATABASE_URL=postgresql://...from-vercel-postgres-dashboard
ADMIN_SESSION_SECRET=generated-random-hex-32
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### 2. Deploy

```bash
git add .
git commit -m "Add multi-admin system with database"
git push origin main

# Vercel auto-deploys
# Check deployment at: https://your-domain.com
```

### 3. Initialize Database on Vercel

After deployment, run migrations via Vercel CLI:

```bash
npm install -g vercel

vercel env pull .env.local

npm run db:push

npm run db:seed
```

---

## Advanced: Custom Permissions

To add granular permissions:

1. Add to `prisma/schema.prisma`
2. Create migration: `npm run prisma:migrate -- --name add_permissions`
3. Link to roles in seed script
4. Check in API endpoints:

```typescript
if (!session.permissions.includes("custom_permission")) {
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}
```

---

## Support & Troubleshooting

- Database Issues → Check PostgreSQL logs
- Auth Issues → Check `/api/auth/` endpoint logs
- Deployment Issues → Check Vercel build logs

For questions, refer to:
- [Prisma Docs](https://www.prisma.io/docs/)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [BCrypt Hashing](https://www.npmjs.com/package/bcryptjs)
