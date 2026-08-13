'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';

export default function FAQ() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What can I bring to a ThinkForm session?",
      a: "Anything. An idea, a decision, a problem you're stuck on, a direction you're considering, or just a feeling that something needs to change. It doesn't need to be polished."
    },
    {
      q: "Do I need to prepare anything?",
      a: "Not required, but helpful: have a sense of what you want to think through. The messy version is fine. Some people jot down key points. Most just show up and we start talking."
    },
    {
      q: "Is this business consulting?",
      a: "No. This is structured thinking. Not about implementing 100 recommendations. About getting clear on what matters and what to do next. It's collaborative and focused on your situation."
    },
    {
      q: "Which session should I choose?",
      a: "Quick Think (₹3,999) if you have one specific problem. Deep Dive (₹7,999) if you need more time and exploration. Strategy Sprint (₹12,999) if the situation is complex and needs comprehensive thinking."
    },
    {
      q: "How does booking work?",
      a: "Simple. Choose your session, fill out a short form about what you're thinking about, pick a time, pay, and you're booked. We'll send you the session details."
    },
    {
      q: "How does payment work?",
      a: "UPI (scan QR), or manual bank transfer. After payment, upload a screenshot to confirm booking. We are adding more online payment methods soon."
    },
    {
      q: "What is the refund policy?",
      a: "Refunds are handled case-by-case. If you cancel at least 24 hours before the session, you may request a refund. Contact support for details."
    },
    {
      q: "Is the session confidential?",
      a: "Yes — sessions are private and we do not share your information without permission. If you require an NDA, mention it when booking."
    },
    {
      q: "Can I reschedule?",
      a: "Yes — reschedule up to 24 hours before the session. If you need to change closer to the time, contact us and we'll try to accommodate."
    },
    {
      q: "Can I book another session later?",
      a: "Absolutely. Many people book multiple sessions over time as situations evolve. You're welcome to come back."
    },
    {
      q: "What happens after I book?",
      a: "You'll receive confirmation with session details. A few days before, we'll send a reminder. At the scheduled time, join the private call."
    }
  ];

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="mb-16">
          <Link href="/" className="text-sm font-bold text-[#666] hover:text-[#111] transition-premium mb-8 inline-block">
            ← Back
          </Link>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-tight mb-6">
            FAQ
          </h1>
          <p className="text-lg md:text-xl text-[#666] font-medium leading-relaxed">
            Questions about booking, sessions, and what to expect.
          </p>
        </div>

        <div className="space-y-4 mb-20">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-[#e8e8e5] rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                className="w-full px-6 md:px-8 py-4 md:py-6 text-left font-bold text-lg md:text-xl text-[#111] hover:bg-[#f9f9f7] transition-premium flex items-center justify-between"
              >
                {faq.q}
                <span className="text-[#999] ml-4 shrink-0">{expandedFaq === i ? '−' : '+'}</span>
              </button>
              {expandedFaq === i && (
                <div className="px-6 md:px-8 py-4 md:py-6 bg-[#f9f9f7] border-t border-[#e8e8e5]">
                  <p className="text-base text-[#666] font-medium leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="text-center pt-16 border-t border-[#e8e8e5]">
          <h2 className="text-2xl font-black mb-6 text-[#111]">Ready to book?</h2>
          <Button href="/book" variant="primary">Book a Session</Button>
        </div>
      </div>
    </div>
  );
}

// JSON-LD for FAQ
export function generateFAQJsonLd() {
  const faqs = [
    {
      q: "What can I bring to a ThinkForm session?",
      a: "Anything. An idea, a decision, a problem you're stuck on, a direction you're considering, or just a feeling that something needs to change. It doesn't need to be polished."
    },
    {
      q: "Do I need to prepare anything?",
      a: "Not required, but helpful: have a sense of what you want to think through. The messy version is fine. Some people jot down key points. Most just show up and we start talking."
    },
    {
      q: "Is this business consulting?",
      a: "No. This is structured thinking. Not about implementing 100 recommendations. About getting clear on what matters and what to do next. It's collaborative and focused on your situation."
    },
    {
      q: "Which session should I choose?",
      a: "Quick Think (₹3,999) if you have one specific problem. Deep Dive (₹7,999) if you need more time and exploration. Strategy Sprint (₹12,999) if the situation is complex and needs comprehensive thinking."
    },
    {
      q: "How does booking work?",
      a: "Simple. Choose your session, fill out a short form about what you're thinking about, pick a time, pay, and you're booked. We'll send you the session details."
    },
    {
      q: "How does payment work?",
      a: "UPI (scan QR), or manual bank transfer. After payment, upload a screenshot to confirm booking. We are adding more online payment methods soon."
    },
    {
      q: "What is the refund policy?",
      a: "Refunds are handled case-by-case. If you cancel at least 24 hours before the session, you may request a refund. Contact support for details."
    },
    {
      q: "Is the session confidential?",
      a: "Yes — sessions are private and we do not share your information without permission. If you require an NDA, mention it when booking."
    },
    {
      q: "Can I reschedule?",
      a: "Yes — reschedule up to 24 hours before the session. If you need to change closer to the time, contact us and we'll try to accommodate."
    }
  ];

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(f => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a }
    }))
  };
}
