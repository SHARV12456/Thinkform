import type { Metadata } from 'next';

import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Analytics } from '@/components/Analytics';

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-C6JZHPLB0C';

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
      <head>
        {/* Google Tag Manager — must be as high in <head> as possible */}
        <script
          id="gtm-script"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-PFQHKCGX');`,
          }}
        />
        {/* Google Analytics 4 — inline so it is present in server-rendered HTML for crawler verification */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
        <script
          id="google-analytics"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { page_path: window.location.pathname });
            `,
          }}
        />
      </head>
      <body className="bg-[#F5F5F3] text-[#111]">
        {/* Google Tag Manager (noscript) — immediately after opening <body> tag */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PFQHKCGX"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
