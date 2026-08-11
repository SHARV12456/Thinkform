# Booking System Quick Setup Guide

## TLDR

1. **Get a PostgreSQL database** (Neon recommended for Vercel)
2. **Set `DATABASE_URL` in `.env.local`**
3. **Run**: `npx prisma migrate deploy`
4. **Done!** ✅

## Steps in Detail

### Step 1: Create PostgreSQL Database

**Option A - Neon (Free, Recommended)**
- Go to https://neon.tech
- Sign up and create project
- Copy connection string
- Add to `.env.local`:
  ```
  DATABASE_URL="postgresql://user:password@host.neon.tech/database?schema=public"
  ```

**Option B - Vercel Postgres**
- In Vercel dashboard → Storage → Postgres
- Click "Create" 
- `.env.local` updates automatically (if using Vercel's local development)

**Option C - Local PostgreSQL**
```bash
# Windows (with PostgreSQL installed)
createdb thinkform_db

# Update .env.local:
DATABASE_URL="postgresql://postgres:password@localhost:5432/thinkform_db"
```

### Step 2: Configure Environment

Edit `.env.local`:
```env
DATABASE_URL="your-connection-string-here"
ADMIN_PASSWORD="thinkform2024"
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

### Step 3: Initialize Database

```bash
npx prisma migrate deploy
```

This creates all tables. If it's your first time, you may need:
```bash
npx prisma migrate dev --name init
```

### Step 4: Start Development Server

```bash
npm run dev
```

### Step 5: Test

**Booking Form**: http://localhost:3000/book
- Fill and submit a test booking
- You should see success message and the booking appears in admin dashboard

**Admin Dashboard**: http://localhost:3000/admin
- Password: `thinkform2024`
- You should see your test booking in the list
- Click it to view/edit details

## For Vercel Deployment

1. Push code to GitHub
2. Connect to Vercel
3. Add secrets in Vercel dashboard:
   - `DATABASE_URL` = your production database connection string
   - `ADMIN_PASSWORD` = a strong secure password
4. Deploy! Vercel auto-detects Next.js and builds

That's it! 🚀

## Verify Everything Works

- [ ] Form submits without errors
- [ ] Admin login works
- [ ] Booking appears in dashboard
- [ ] Can view booking details
- [ ] Can edit status and notes
- [ ] Changes persist after refresh
- [ ] Validation works (try invalid email)
- [ ] Can't access admin API without login

## Common Issues

| Issue | Solution |
|-------|----------|
| DATABASE_URL not found | Add to `.env.local` and restart server |
| Connection refused | Check database is running and URL is correct |
| Admin login fails | Check `ADMIN_PASSWORD` in `.env.local` |
| Bookings don't save | Run `npx prisma migrate deploy` |
| Build fails | Run `npm install` and `npx prisma generate` |

## Reset Database (Development Only!)

⚠️ **WARNING**: This deletes all data!

```bash
npx prisma migrate reset
```

Then reinitialize:
```bash
npx prisma migrate deploy
```

## Questions?

See `BOOKING_SYSTEM.md` for comprehensive documentation.
