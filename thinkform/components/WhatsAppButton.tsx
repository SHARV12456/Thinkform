"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function WhatsAppButton() {
  const [phone, setPhone] = useState(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+919999999999');

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(d => {
        if (d.success && d.settings?.whatsappNumber) {
          setPhone(d.settings.whatsappNumber);
        }
      })
      .catch(() => {});
  }, []);

  const text = encodeURIComponent('Hi — I have a quick question about ThinkForm.');
  
  // Clean the phone number to digits only
  let cleanPhone = phone.replace(/[^0-9]/g, '');
  // Automatically prepend +91 for standard 10-digit Indian numbers if the country code was forgotten
  if (cleanPhone.length === 10) {
    cleanPhone = '91' + cleanPhone;
  }

  const href = `https://wa.me/${cleanPhone}?text=${text}`;

  return (
    <div className="fixed right-4 bottom-20 z-50">
      <Link href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-[#25D366] text-white px-5 py-3 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:scale-105 hover:shadow-[0_8px_30px_rgb(37,211,102,0.3)] transition-all">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="mr-1">
          <path d="M21.7 2.3A11.9 11.9 0 0012 0C5.4 0 .1 5.4.1 12.1c0 2 0.5 4 1.5 5.8L0 24l6.4-1.6c1.7.9 3.6 1.4 5.6 1.4 6.6 0 12-5.4 12-12 0-3.2-1.3-6.2-3.7-8.2z" fill="#fff"/>
        </svg>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-widest leading-none mb-1 opacity-90">WhatsApp Us</span>
          <span className="text-sm font-black leading-none tracking-tight">{phone}</span>
        </div>
      </Link>
    </div>
  );
}
