"use client";

import Link from 'next/link';

export default function WhatsAppButton() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+919999999999';
  const text = encodeURIComponent('Hi — I have a quick question about ThinkForm.');
  const href = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${text}`;

  return (
    <div className="fixed right-4 bottom-20 z-50">
      <Link href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-lg hover:scale-105 transition-transform">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="mr-1">
          <path d="M21.7 2.3A11.9 11.9 0 0012 0C5.4 0 .1 5.4.1 12.1c0 2 0.5 4 1.5 5.8L0 24l6.4-1.6c1.7.9 3.6 1.4 5.6 1.4 6.6 0 12-5.4 12-12 0-3.2-1.3-6.2-3.7-8.2z" fill="#fff"/>
        </svg>
        <span className="text-sm font-medium">WhatsApp</span>
      </Link>
    </div>
  );
}
