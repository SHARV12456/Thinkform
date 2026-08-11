'use client';
import { useEffect } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';

export const trackEvent = (eventName: string, metadata: Record<string, any> = {}) => {
  // GA4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, metadata);
  }
  
  // Meta Pixel
  if (typeof window !== 'undefined' && (window as any).fbq) {
    // Map some generic events to standard FB events where appropriate
    if (eventName === 'booking_completed') {
      (window as any).fbq('track', 'Lead', metadata);
    } else if (eventName === 'payment_started') {
      (window as any).fbq('track', 'InitiateCheckout', metadata);
    } else if (eventName === 'primary_cta_click' || eventName === 'consultation_cta_click') {
      (window as any).fbq('track', 'Contact', metadata);
    } else {
      (window as any).fbq('trackCustom', eventName, metadata);
    }
  }
};

export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Track page views on route change
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
        page_path: pathname,
      });
    }
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'PageView');
    }
    
    trackEvent('page_view', { page_path: pathname });
    if (pathname === '/book' || pathname === '/') {
      trackEvent('landing_page_view', { page_path: pathname });
    }
  }, [pathname]);

  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const fbId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <>
      {gaId && (
        <>
          <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}

      {fbId && (
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${fbId}');
            `,
          }}
        />
      )}
    </>
  );
}
