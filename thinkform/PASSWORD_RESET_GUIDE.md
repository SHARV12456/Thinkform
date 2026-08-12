# Admin Password Reset Flow - Setup Guide

## Features
- **Forgot Password Page** - Admin enters their email to request a password reset (public, no login required)
- **Reset Token** - Secure token-based reset links (expires in 1 hour)
- **Email Notifications** - Reset link sent via email (configurable SMTP)
- **Show/Hide Toggle** - Password visibility toggle for better UX
- **Development Mode** - Shows reset token in UI for testing without email
- **Database-backed passwords** - New password is hashed (SHA-256) and stored in the `AdminUser` table
- **Env fallback** - If no `AdminUser` record exists yet, login falls back to `ADMIN_PASSWORD` env var

---

## Flow Overview

1. Admin clicks **"Forgot password?"** on login page
2. Admin enters their email address (must match `ADMIN_EMAIL` or an existing `AdminUser` record)
3. System saves a reset token (1-hour expiry) and sends a reset link to their email
4. Admin clicks link and sets a new password (min 8 characters)
5. Password is hashed and saved in the `AdminUser` table (or the record is created)
6. Token is deleted and admin logs in with the new password
7. Login verifies against the DB password first, falling back to `ADMIN_PASSWORD` env var only if no DB record exists

---

## Setup Steps

### 1. **Environment Variables** (for Email)

Add these to your `.env.local` (development) or Vercel (production):

```env
# Admin email that can request password resets
ADMIN_EMAIL=hello@thinkform.studio

# SMTP Configuration (Gmail example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@thinkform.com

# App URL (for reset links in emails)
NEXT_PUBLIC_APP_URL=https://thinkform.vercel.app
```

### 2. **Gmail Setup** (if using Gmail)

1. Enable 2-Factor Authentication on Gmail
2. Generate an **App Password** at https://myaccount.google.com/apppasswords
3. Use the 16-character password in `SMTP_PASSWORD`

### 3. **Database Migration**

Run locally:
```bash
npx prisma migrate dev
```

This creates the `PasswordReset` table for storing reset tokens.

---

## Pages & Routes

| Route | Purpose |
|-------|---------|
| `/admin` | Login page (with "Forgot password?" link) |
| `/admin/forgot-password` | Request password reset |
| `/admin/reset-password/[token]` | Set new password via token |
| `/api/admin/auth/forgot-password` | POST - Request reset token |
| `/api/admin/auth/reset-password` | POST - Validate token & reset (updates DB) |

---

## Testing Without Email

In **development mode**, when you request a password reset:

1. You'll see the reset token displayed in the UI
2. Copy the token
3. Navigate to `/admin/reset-password/[token]` manually
4. Set your new password
5. **Login with the new password** — it is stored (hashed) in the `AdminUser` table
6. If no `AdminUser` record exists, the old `ADMIN_PASSWORD` env var still works

### Example (Dev):
```
Reset token: a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
Click here: http://localhost:3000/admin/reset-password/a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

---

## Password Security

- Tokens expire after **1 hour**
- Old tokens are deleted automatically when new request is made
- Passwords are trimmed to prevent whitespace issues
- Show/Hide toggle helps verify password entry
- New passwords are hashed with SHA-256 before storage in `AdminUser`
- The `passwordReset` token is single-use (deleted after successful reset)
- The forgot-password and reset-password pages are **public** (no login required)

---

## Troubleshooting

**"Email not authorized"**
- Make sure `ADMIN_EMAIL` env var matches the email you're using, or the email exists in the `AdminUser` table
- Update Vercel environment variables if changed

**"Reset link sending failed"**
- Check SMTP credentials are correct
- Verify firewall/network allows SMTP port 587
- In dev mode, token still saved - use manual link

**"Token is invalid or expired"**
- Token expires after 1 hour
- Request a new password reset link

**"Login still uses old password after reset"**
- If no `AdminUser` record existed before, the first password reset creates one
- After that, login uses the DB password (fallback to env var only if DB lookup fails)
- Make sure the DB is reachable and the `AdminUser` table exists (`npx prisma db push`)

---

## Next Deploy

After setting environment variables in Vercel:

1. Go to **Deployments** → Latest Deployment
2. Click **Redeploy** 
3. Wait for deployment to complete
4. Test at https://thinkform.vercel.app/admin

Your admin can now reset their password anytime! 🎉
