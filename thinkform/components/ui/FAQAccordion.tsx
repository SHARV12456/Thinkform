'use client';
import { useState } from 'react';

interface FAQItem {
  q: string;
  a: string;
}

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="divide-y divide-[#e8e8e5]">
      {items.map((item, i) => (
        <div key={i} className="py-6">
          <button
            className="w-full flex items-start justify-between gap-6 text-left"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="text-lg font-semibold text-[#111] leading-snug">{item.q}</span>
            <span className={`shrink-0 text-2xl text-[#888] transition-transform duration-300 ${open === i ? 'rotate-45' : ''}`}>+</span>
          </button>
          <div className={`grid transition-all duration-500 ${open === i ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
            <div className="overflow-hidden">
              <p className="text-[#555] leading-relaxed font-medium pr-8">{item.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
