import type { Metadata } from 'next';

import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Analytics } from '@/components/Analytics';
import CookieConsent from '@/components/CookieConsent';

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-C6JZHPLB0C';
// Prefer an explicit public URL, but only fall back to Vercel URL for production builds.
const baseUrl =
  process.env.NEXT_PUBLIC_APP_URL ||
  (process.env.VERCEL_ENV === 'production' && process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'https://thinkform.vercel.app');

export const metadata: Metadata = {
  title: 'THINKFORM — Business Strategy & Startup Consultancy in Mumbai',
  description: 'A 1:1 creative business consultation in Mumbai (and online) for people who have an idea — but don\'t know what to do with it. Strategic problem solving for Indian startups.',
  keywords: ['business strategy mumbai', 'startup consulting india', 'creative strategy', 'startup advice', 'business brainstorm'],
  openGraph: {
    title: 'THINKFORM — Business Strategy Consultancy Mumbai',
    description: 'Book a 1:1 creative business consultation in Mumbai or online. We help you explore ideas, identify opportunities, and build sustainable business models.',
    url: baseUrl,
    siteName: 'THINKFORM',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'THINKFORM Strategy Consultancy',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: baseUrl,
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className="bg-[#F5F3EE] text-[#111111]">
        <CookieConsent />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
