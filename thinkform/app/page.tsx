'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export default function Home() {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="pt-28 pb-20 md:pt-48 md:pb-32 px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] mb-8 text-balance">
            Think better.<br/>Move forward.
          </h1>
          
          <p className="text-lg md:text-xl text-[#756f68] font-medium leading-relaxed max-w-2xl mb-12">
            A private 1:1 session to work through the thing you're stuck on.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-6 mb-12">
            <Button href="/book" variant="primary">Book a Session</Button>
            <Button href="#identify" variant="secondary">See how it works</Button>
          </div>

          <p className="text-sm md:text-base font-medium">
            Sessions from <span className="font-bold text-[#171717]">₹3,999</span>
          </p>

          <p className="text-xs md:text-sm text-[#9a9186] font-medium mt-8 tracking-widest uppercase">
            Business · Ideas · Decisions · Direction
          </p>
        </div>
      </section>

      {/* ============ QUICK IDENTIFICATION ============ */}
      <section className="py-20 md:py-32 px-6 md:px-8 bg-[#faf8f5]" id="identify">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-16 text-[#171717]">
            What are you trying to figure out?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { label: 'A decision', desc: "You're stuck between two paths." },
              { label: 'An idea', desc: "You don't know if it's worth pursuing." },
              { label: 'My business', desc: "Something isn't working or growing." },
              { label: "What's next", desc: 'You know you need to move, but not where.' },
              { label: 'Your direction', desc: 'Figuring out the next chapter.' },
              { label: 'Something else', desc: 'You need thinking through on something.' }
            ].map((option, i) => (
              <button
                key={i}
                onClick={() => setSelectedOption(selectedOption === i ? null : i)}
                className={`p-6 border rounded-lg transition-all text-left ${
                  selectedOption === i
                    ? 'border-[#b66a4a] bg-white shadow-lg'
                    : 'border-[#e8e3da] hover:border-[#9a9186]'
                }`}
              >
                <p className={`font-bold text-lg mb-2 ${selectedOption === i ? 'text-[#b66a4a]' : 'text-[#171717]'}`}>
                  {option.label}
                </p>
                <p className="text-sm text-[#756f68]">{option.desc}</p>
              </button>
            ))}
          </div>

          {selectedOption !== null && (
            <div className="mt-12 pt-12 border-t border-[#e8e3da]">
              <Button href="/book" variant="primary" className="text-lg">
                Book your session
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* ============ PRICING (CONCISE) ============ */}
      <section className="py-20 md:py-32 px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-16 text-[#171717]">
            Choose your session
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 border border-[#e8e3da] rounded-lg hover:border-[#9a9186] transition-all">
              <p className="text-xs font-bold uppercase tracking-widest text-[#9a9186] mb-4">Quick Think</p>
              <p className="text-4xl font-black text-[#171717] mb-2">₹3,999</p>
              <p className="text-sm text-[#756f68] mb-6">60 min · One problem</p>
              <Button href="/book?session=quick-think" variant="primary" className="w-full text-sm">Book</Button>
            </div>

            <div className="p-8 bg-[#171717] text-white border border-[#171717] rounded-lg md:scale-105 shadow-lg hover:shadow-xl transition-all">
              <p className="text-xs font-bold uppercase tracking-widest text-[#b66a4a] mb-4">Most chosen</p>
              <p className="text-4xl font-black mb-2">₹7,999</p>
              <p className="text-sm text-white/80 mb-6">90 min · Complex problem</p>
              <Button href="/book?session=deep-dive" variant="primary" className="w-full text-sm">Book</Button>
            </div>

            <div className="p-8 border border-[#e8e3da] rounded-lg hover:border-[#9a9186] transition-all">
              <p className="text-xs font-bold uppercase tracking-widest text-[#9a9186] mb-4">Strategy Sprint</p>
              <p className="text-4xl font-black text-[#171717] mb-2">₹12,999</p>
              <p className="text-sm text-[#756f68] mb-6">Deep strategic session</p>
              <Button href="/book?session=strategy-sprint" variant="primary" className="w-full text-sm">Book</Button>
            </div>
          </div>
        </div>
      </section>

      {/* ============ MICRO HOW-IT-WORKS ============ */}
      <section className="py-20 md:py-32 px-6 md:px-8 bg-[#faf8f5]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-12 text-[#171717]">
            The flow
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12">
            {['Choose', 'Share', 'Think', 'Clarity'].map((step, i) => (
              <div key={i}>
                <p className="text-3xl md:text-4xl font-black text-[#e8e3da] mb-3">{String(i + 1)}</p>
                <p className="text-sm font-bold text-[#171717]">{step}</p>
              </div>
            ))}
          </div>

          <p className="text-base md:text-lg text-[#756f68] leading-relaxed max-w-2xl">
            Choose your session. Tell us what's on your mind. Think it through together. Leave with a clearer next step.
          </p>
        </div>
      </section>

      {/* ============ SOCIAL PROOF ============ */}
      <section className="py-20 md:py-32 px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-16 text-[#171717]">
            Real people. Real perspective.
          </h2>

          <div className="space-y-8 md:space-y-10 mb-12">
            {[
              { quote: "I had been thinking about this for months. In 90 minutes, we solved it.", author: "Founder", role: "Decided on business direction" },
              { quote: "The clarity I left with was worth ten times the price.", author: "Creator", role: "Found her next move" },
              { quote: "Someone who could challenge my thinking without a hidden agenda.", author: "CEO", role: "Navigated a critical decision" }
            ].map((testimonial, i) => (
              <div key={i} className="border-l-4 border-[#b66a4a] pl-8">
                <p className="text-lg md:text-xl font-bold text-[#171717] mb-4 italic">"{testimonial.quote}"</p>
                <p className="text-sm font-bold text-[#b66a4a]">{testimonial.author}</p>
                <p className="text-xs text-[#9a9186]">{testimonial.role}</p>
              </div>
            ))}
          </div>

          <Link href="/testimonials" className="text-sm font-bold text-[#b66a4a] hover:text-[#171717] transition-all">
            See more experiences →
          </Link>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="py-24 md:py-40 px-6 md:px-8 bg-[#171717] text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-tight mb-8">
            What's on your mind?
          </h2>
          <p className="text-lg md:text-xl text-white/75 font-medium mb-12 leading-relaxed">
            Bring the problem. We'll think it through together.
          </p>
          <Button href="/book" variant="primary" className="inline-flex text-lg">Book a Session</Button>
        </div>
      </section>
    </>
  );
}
