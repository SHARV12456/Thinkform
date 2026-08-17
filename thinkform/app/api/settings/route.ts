export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const rows = await prisma.adminSettings.findMany();
    const settings: Record<string, string> = {};
    rows.forEach(r => { settings[r.key] = r.value; });

    return NextResponse.json({
      success: true,
      settings: {
        whatsappNumber: settings.whatsappNumber || '+919999999999',
        contactEmail: settings.contactEmail || 'hello@thinkform.studio',
        siteTagline: settings.siteTagline || 'Creative strategy for founders who are serious about building.',
        bookingOpen: settings.bookingOpen !== 'false',
        sessionPrice: settings.sessionPrice || '4999',
        sessionDuration: settings.sessionDuration || '60',
        adminBio: settings.adminBio || 'Founder & creative strategist at Thinkform.',
        adminName: settings.adminName || 'Manaant Sawant',
      }
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
