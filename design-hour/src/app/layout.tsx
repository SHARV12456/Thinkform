import type { Metadata } from 'next';
import './globals.css';
import './taas3.css';
import '../styles/design-system.css';
import WhatsAppFAB from '@/components/WhatsAppFAB';
import CustomCursor from '@/components/CustomCursor';

export const metadata: Metadata = {
  title: 'Design Consultation in Mumbai | TAAS — Make the Right Decision',
  description: 'TAAS is for people standing at an important design decision in Mumbai — before they build, renovate, or spend on layouts, materials or interiors.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (() => {
                try {
                  const savedTheme = localStorage.getItem('taas-theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const nextTheme = savedTheme === 'dark' || savedTheme === 'light'
                    ? savedTheme
                    : prefersDark ? 'dark' : 'light';
                  document.documentElement.dataset.theme = nextTheme;
                } catch (error) {
                  document.documentElement.dataset.theme = 'light';
                }
              })();
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        
        {/* LocalBusiness + Service Schema for Local SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': ['LocalBusiness', 'ProfessionalService'],
              '@id': 'https://taas.design',
              name: 'TAAS',
              description: 'Design consultation platform for better decisions about layouts, materials, spaces and interiors',
              image: 'https://taas.design/logo.png',
              url: 'https://taas.design',
              slogan: 'Independent Design Direction for Mumbai',
              areaServed: [
                {
                  '@type': 'City',
                  name: 'Mumbai'
                },
                {
                  '@type': 'LocalArea',
                  name: 'Borivali'
                },
                {
                  '@type': 'LocalArea',
                  name: 'Kandivali'
                },
                {
                  '@type': 'LocalArea',
                  name: 'Malad'
                },
                {
                  '@type': 'LocalArea',
                  name: 'Goregaon'
                },
                {
                  '@type': 'LocalArea',
                  name: 'Andheri'
                },
                {
                  '@type': 'LocalArea',
                  name: 'Versova'
                },
                {
                  '@type': 'LocalArea',
                  name: 'Juhu'
                },
                {
                  '@type': 'LocalArea',
                  name: 'Vile Parle'
                },
                {
                  '@type': 'LocalArea',
                  name: 'Santacruz'
                },
                {
                  '@type': 'LocalArea',
                  name: 'Khar'
                },
                {
                  '@type': 'LocalArea',
                  name: 'Bandra'
                },
                {
                  '@type': 'LocalArea',
                  name: 'Dadar'
                },
                {
                  '@type': 'LocalArea',
                  name: 'Worli'
                },
                {
                  '@type': 'LocalArea',
                  name: 'Churchgate'
                }
              ],
              priceRange: '₹1,999-₹9,999',
              serviceType: ['Design Consultation', 'Interior Design Consultation', 'Space Planning', 'Layout Review', 'Material Guidance'],
              hasOfferingType: {
                '@type': 'Service',
                name: 'Design Consultation',
                description: 'Focused one-to-one design consultation for homes and commercial spaces'
              }
            })
          }}
        />
      </head>
      <body>
        <CustomCursor />
        {children}
        <WhatsAppFAB />
      </body>
    </html>
  );
}
