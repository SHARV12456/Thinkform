'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  style?: React.CSSProperties;
}

export default function FAQAccordion({ items, style }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="taas-accordion" style={style}>
      {items.map((item, i) => (
        <div key={i} className="taas-accordion-item">
          <button
            className="taas-accordion-trigger"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
          >
            <span>{item.q}</span>
            <ChevronDown size={16} className={openIndex === i ? 'is-open' : ''} />
          </button>
          <div className={`taas-accordion-content ${openIndex === i ? 'open' : ''}`}>
            <p>{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
