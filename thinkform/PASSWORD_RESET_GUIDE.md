# Admin Password Reset Flow - Setup Guide

## Features
- **Forgot Password Page** - Admin enters their email to request a password reset
- **Reset Token** - Secure token-based reset links (expires in 1 hour)
- **Email Notifications** - Reset link sent via email (configurable SMTP)
- **Show/Hide Toggle** - Password visibility toggle for better UX
- **Development Mode** - Shows reset token in UI for testing without email

---

## Flow Overview

1. Admin clicks **"Forgot password?"** on login page
2. Admin enters their email address
3. System sends reset link to their email
4. Admin clicks link and sets new password
5. Password is updated in the system

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
| `/api/admin/auth/reset-password` | POST - Validate token & reset |

---

## Testing Without Email

In **development mode**, when you request a password reset:

1. You'll see the reset token displayed in the UI
2. Copy the token
3. Navigate to `/admin/reset-password/[token]` manually
4. Set your new password

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

---

## Troubleshooting

**"Email not authorized"**
- Make sure `ADMIN_EMAIL` env var matches the email you're using
- Update Vercel environment variables if changed

**"Reset link sending failed"**
- Check SMTP credentials are correct
- Verify firewall/network allows SMTP port 587
- In dev mode, token still saved - use manual link

**"Token is invalid or expired"**
- Token expires after 1 hour
- Request a new password reset link

---

## Next Deploy

After setting environment variables in Vercel:

1. Go to **Deployments** → Latest Deployment
2. Click **Redeploy** 
3. Wait for deployment to complete
4. Test at https://thinkform.vercel.app/admin

Your admin can now reset their password anytime! 🎉
