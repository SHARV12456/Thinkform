import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Analytics } from '@/components/Analytics';

export const metadata: Metadata = {
  title: 'THINKFORM — Creative Business Strategy Consultancy',
  description: 'A 1:1 creative business consultation for people who have an idea — but don\'t know what to do with it. Strategic problem solving and business resets.',
  keywords: ['business strategy', 'consulting', 'creative strategy', 'startup advice', 'business brainstorm'],
  openGraph: {
    title: 'THINKFORM — Creative Business Strategy Consultancy',
    description: 'Book a 1:1 creative business consultation. We help you explore ideas, identify opportunities, and build sustainable business models.',
    url: 'https://thinkform.vercel.app',
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
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#F5F5F3] text-[#111]">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
