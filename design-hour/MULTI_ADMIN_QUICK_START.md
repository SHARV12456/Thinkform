# 🎉 Multi-Admin System - READY TO USE

**Status**: ✅ Database configured | ✅ Roles initialized | ✅ Dev server running

---

## 📚 QUICK START

### 1. **Test Login**

Visit: **http://localhost:3000/admin/login**

**Default Credentials:**
- Email: `admin@designhour.in`
- Password: `ServerAdmin!2026`

⚠️ **Change this password immediately after first login!**

---

### 2. **Create Additional Admins**

**Option A: Using Admin Dashboard** (Easiest)

Navigate to: **http://localhost:3000/admin/manage**

Fill in the form:
- Email: new admin email
- Password: Must be 12+ chars with uppercase, lowercase, number, symbol
- First Name: Admin's first name  
- Last Name: Admin's last name
- Role: Choose Admin, Manager, or Viewer

Click "Create"

**Option B: Using cURL**

```bash
curl -X POST http://localhost:3000/api/admin \
  -H "Content-Type: application/json" \
  -b "admin_session=YOUR_COOKIE" \
  -d '{
    "email": "newadmin@designhour.in",
    "password": "SecurePass!2026",
    "firstName": "John",
    "lastName": "Doe",
    "role": "Manager"
  }'
```

---

## 🔑 ADMIN ROLES & PERMISSIONS

| Role | Can Manage | View Only | Usage |
|------|-----------|-----------|-------|
| **Admin** | Everything (Admins, Bookings, Services, Pricing) | Admins, Bookings, Reports | Super user - full control |
| **Manager** | Bookings, Customers, Services | Bookings, Analytics | Day-to-day operations |
| **Viewer** | Nothing | Dashboard, Analytics | Read-only access |

---

## 📝 PASSWORD REQUIREMENTS

**All passwords must:**
- ✅ Be at least 12 characters
- ✅ Have uppercase letter (A-Z)
- ✅ Have lowercase letter (a-z)
- ✅ Have a number (0-9)
- ✅ Have a special character (!@#$%^&*)

**Example**: `DesignHour!2026`

---

## 🔐 SECURITY FEATURES

✅ **BCrypt Hashing** - Passwords are hashed with 10-round salt

✅ **Session Tokens** - Secure 64-character random tokens stored in database

✅ **HttpOnly Cookies** - Cannot be accessed by JavaScript

✅ **Rate Limiting** - 5 failed attempts → 15-minute lockout

✅ **Account Lockout** - Automatic temporary suspension after failed attempts

✅ **Generic Error Messages** - Don't reveal if email exists (prevents account enumeration)

✅ **Single-Use Reset Tokens** - Expire after 1 hour

✅ **Session Invalidation** - All sessions cleared on password change/reset

✅ **IP Tracking** - Logs IP address for security audit trail

---

## 🔄 CHANGING YOUR PASSWORD

**As an Admin:**
1. Go to Profile Settings
2. Click "Change Password"
3. Enter current password
4. Enter new password (must meet requirements)
5. Confirm new password
6. All sessions will be invalidated (must login again)

**Via API:**
```bash
POST /api/auth/change-password
Content-Type: application/json
Cookie: admin_session=token

{
  "currentPassword": "OldPass!2026",
  "newPassword": "NewPass!2026"
}
```

---

## 🆘 FORGOT PASSWORD

**If you forget your password:**

1. Go to: **http://localhost:3000/admin/forgot-password**
2. Enter your email
3. Check console logs for reset link (currently logged to server)
4. Copy the link and visit it
5. Enter new password
6. Login with new password

**Note**: Email sending is currently logged to console. To enable real emails:
- Install SendGrid: `npm install @sendgrid/mail`
- Update `src/app/api/auth/forgot-password/route.ts`
- Add `SENDGRID_API_KEY` to `.env.local`

---

## 🗄️ DATABASE

**Current Setup**: SQLite (local file: `prisma/dev.db`)

**Database Tables**:
- `Admin` - Admin accounts with hashed passwords
- `Role` - Role definitions (Admin, Manager, Viewer)
- `Permission` - Granular permissions (view_dashboard, manage_admins, etc.)
- `AdminSession` - Active sessions with expiry times
- `PasswordResetToken` - One-time password reset tokens

**View Data**:
```bash
npx prisma studio  # Opens web UI to explore database
```

---

## 🚀 DEPLOYMENT TO VERCEL

### 1. **Update Environment Variables**

In Vercel Dashboard → Project → Settings → Environment Variables:

```env
DATABASE_URL=postgresql://...  # (Optional: Use Postgres on Vercel)
ADMIN_SESSION_SECRET=your-32-char-random-hex
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### 2. **Switch to PostgreSQL** (Recommended for Production)

1. Create Vercel Postgres database
2. Copy connection string
3. Add to `DATABASE_URL` in Vercel
4. Redeploy

### 3. **Deploy**

```bash
git add .
git commit -m "Add multi-admin system with database"
git push origin main

# Vercel auto-deploys
```

### 4. **Initialize Database on Vercel**

```bash
npx vercel env pull .env.local
npm run db:push        # Create tables
npm run db:seed        # Initialize roles and admin
```

---

## 📋 API ENDPOINTS

All API calls require `admin_session` cookie (set automatically on login)

### Authentication

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| `/api/auth/login` | POST | ❌ | Login with email/password |
| `/api/auth/logout` | POST | ✅ | Logout & invalidate session |
| `/api/auth/forgot-password` | POST | ❌ | Request password reset |
| `/api/auth/reset-password` | POST | ❌ | Complete password reset |
| `/api/auth/change-password` | POST | ✅ | Change current password |

### Admin Management

| Endpoint | Method | Auth | Permission | Purpose |
|----------|--------|------|-----------|---------|
| `/api/admin` | GET | ✅ | manage_admins | List all admins |
| `/api/admin` | POST | ✅ | manage_admins | Create new admin |
| `/api/admin` | PUT | ✅ | manage_admins | Update admin |
| `/api/admin?id=X` | DELETE | ✅ | manage_admins | Delete admin |

---

## 🛠️ USEFUL COMMANDS

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# View database UI
npx prisma studio

# Seed database (reinitialize)
npm run db:seed

# Create database migration
npm run prisma:migrate

# View lint errors
npm run lint
```

---

## 🐛 TROUBLESHOOTING

### "Admin session cookie not set"
→ Check browser cookies enabled (F12 → Application → Cookies)

### "Could not connect to database"
→ Ensure `.env.local` has valid `DATABASE_URL`
→ For SQLite: `file:./prisma/dev.db`

### "Password requirements not met"
→ Ensure password has: uppercase, lowercase, number, special char, 12+ length

### "Account locked - too many attempts"
→ Wait 15 minutes for automatic unlock
→ Or admin can reset password via `/api/auth/forgot-password`

### "Reset token expired"
→ Tokens expire after 1 hour
→ Request new password reset link

---

## 📞 NEXT STEPS

- ✅ Test login at http://localhost:3000/admin/login
- ✅ Create test admin accounts via http://localhost:3000/admin/manage
- ✅ Test role-based access (try Viewer role - limited access)
- ☐ Deploy to Vercel with PostgreSQL
- ☐ Configure email for password resets (SendGrid)
- ☐ Build admin dashboard pages for your business logic

---

## 📖 DOCUMENTATION

Full setup guide: See `MULTI_ADMIN_SETUP.md`

Questions? Check logs:
- Dev server: `http://localhost:3000` terminal output
- API errors: Browser console (F12)
- Database errors: Check `.env.local` configuration

