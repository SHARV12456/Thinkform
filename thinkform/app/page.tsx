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
          
          <p className="text-lg md:text-xl text-[#756f68] font-medium leading-relaxed max-w-2xl mb-6">
            A private 1:1 session to work through the thing you're stuck on.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-6 mb-4">
            <Button href="/book" variant="primary">Book a Session</Button>
            <Button href="#identify" variant="secondary">See how it works</Button>
            <Link href="/book?quiz=1" className="text-sm font-medium text-[#B5502A] hover:underline mt-2 sm:mt-0">Not sure which session? →</Link>
          </div>

          <p className="text-sm md:text-base font-medium">
            Sessions from <span className="font-bold text-[#171717]">₹3,999</span>
          </p>

          <p className="text-xs md:text-sm text-[#9a9186] font-medium mt-6 tracking-widest uppercase">
            Business · Ideas · Decisions · Direction
          </p>

          <p className="text-sm text-[#756f68] mt-6">Led by Rhea Shah, former Head of Strategy at Sundar & Co — now helping founders think clearly.</p>
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
                className={`p-6 border rounded-lg transition-transform duration-150 ease-out text-left ${
                  selectedOption === i
                    ? 'border-[#B5502A] bg-white -translate-y-1'
                    : 'border-[#e8e3da] hover:border-[#9a9186] hover:-translate-y-1'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-md bg-white/30 border border-[#e8e3da]">
                    {i === 0 && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L12 12" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 9L12 16L19 9" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    )}
                    {i === 1 && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="8" r="3" stroke="#171717" strokeWidth="1.5"/><path d="M5 20c1-4 6-6 7-6s6 2 7 6" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    )}
                    {i === 2 && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="14" rx="2" stroke="#171717" strokeWidth="1.5"/><path d="M7 21h10" stroke="#171717" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    )}
                    {i === 3 && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3v18" stroke="#171717" strokeWidth="1.5" strokeLinecap="round"/><path d="M3 12h18" stroke="#171717" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    )}
                    {i === 4 && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a7 7 0 100 14 7 7 0 000-14z" stroke="#171717" strokeWidth="1.5"/><path d="M5 22c2-3 6-4 7-4s5 1 7 4" stroke="#171717" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    )}
                    {i === 5 && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 7h16M4 12h16M4 17h16" stroke="#171717" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    )}
                  </div>

                  <div className="flex-1">
                    <p className={`font-bold text-lg mb-2 ${selectedOption === i ? 'text-[#B5502A]' : 'text-[#171717]'}`}>
                      {option.label}
                    </p>
                    <p className="text-sm text-[#756f68]" style={{display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>{option.desc}</p>
                  </div>
                </div>
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
              <p className="text-sm text-[#756f68] mb-4">60 min · One problem</p>
              <ul className="text-sm text-[#756f68] mb-6 space-y-2">
                <li>• One focused issue</li>
                <li>• Actionable next step</li>
              </ul>
              <Button href="/book?session=quick-think" variant="primary" className="w-full text-sm">Book</Button>
            </div>

            <div className="relative p-8 bg-[#171717] text-white border border-[#171717] rounded-lg md:scale-[1.03] transition-all">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#B5502A] text-white text-xs font-bold uppercase px-3 py-1 rounded-md">Most chosen</div>
              <div className="mt-3">
                <p className="text-4xl font-black mb-2">₹7,999</p>
                <p className="text-sm text-white/80 mb-4">90 min · Complex problem</p>
                <ul className="text-sm text-white/80 mb-6 space-y-2">
                  <li>• Deep diagnostic conversation</li>
                  <li>• Prioritised next steps</li>
                  <li>• Follow-up notes</li>
                </ul>
                <Button href="/book?session=deep-dive" variant="primary" className="w-full text-sm">Book</Button>
              </div>
            </div>

            <div className="p-8 border border-[#e8e3da] rounded-lg hover:border-[#9a9186] transition-all">
              <p className="text-xs font-bold uppercase tracking-widest text-[#9a9186] mb-4">Strategy Sprint</p>
              <p className="text-4xl font-black text-[#171717] mb-2">₹12,999</p>
              <p className="text-sm text-[#756f68] mb-4">Deep strategic session</p>
              <ul className="text-sm text-[#756f68] mb-6 space-y-2">
                <li>• Roadmap & priorities</li>
                <li>• Templates & frameworks</li>
              </ul>
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

          <div className="mb-12">
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-4 w-full">
                {['Choose', 'Share', 'Think', 'Clarity'].map((step, i) => (
                  <div key={i} className="flex-1 flex items-center">
                    <div className="flex items-center gap-4 w-full">
                      <div className="w-10 h-10 rounded-full border border-[#e8e3da] flex items-center justify-center font-bold text-sm text-[#171717] bg-white">{i+1}</div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-[#171717]">{step}</p>
                      </div>
                    </div>
                    {i < 3 && <div className="h-px bg-[#e8e3da] flex-1 ml-4 mr-4" />}
                  </div>
                ))}
              </div>
            </div>

            <div className="md:hidden grid grid-cols-2 gap-6">
              {['Choose', 'Share', 'Think', 'Clarity'].map((step, i) => (
                <div key={i}>
                  <p className="text-3xl md:text-4xl font-black text-[#e8e3da] mb-3">{String(i + 1)}</p>
                  <p className="text-sm font-bold text-[#171717]">{step}</p>
                </div>
              ))}
            </div>
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
              { quote: "In 90 minutes we chose a clear direction and started executing.", author: "Rhea Shah — Founder, D2C brand, Mumbai" },
              { quote: "The session helped me prioritise and ship the right thing.", author: "Arjun Patel — Head of Product, Fintech" },
              { quote: "We avoided a costly strategic mistake; worth every rupee.", author: "Meera Kapoor — CEO, Services" }
            ].map((testimonial, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#e8e3da] flex items-center justify-center font-bold text-sm text-[#171717]">{testimonial.author.split(' ')[0].slice(0,1)}</div>
                <div>
                  <p className="text-lg md:text-xl font-bold text-[#171717] mb-2 italic">"{testimonial.quote}"</p>
                  <p className="text-sm font-bold text-[#171717]">{testimonial.author}</p>
                </div>
              </div>
            ))}
          </div>

          <Link href="/testimonials" className="text-sm font-bold text-[#B5502A] hover:text-[#171717] transition-all">
            See more experiences →
          </Link>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      {/* ============ FAQ ============ */}
      <section className="py-12 md:py-20 px-6 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-black mb-8 text-[#171717]">Frequently asked</h3>
          <div className="space-y-4">
            {[
              { q: 'What happens on the call?', a: 'We focus on one or two problems, discuss options and leave with clear next steps.' },
              { q: 'Can I reschedule or get a refund?', a: 'Reschedule up to 24 hours before. Refunds handled case-by-case; contact support.' },
              { q: 'Who will I speak with?', a: "You'll speak with the founder or a senior strategist — someone with hands-on experience." },
              { q: 'Is this a workshop or a call?', a: 'A focused 1:1 conversation — not a long workshop. We may share templates after.' },
              { q: 'Is what I say confidential?', a: 'Yes. Sessions are private; we do not publish client details without consent.' }
            ].map((item, i) => (
              <div key={i} className="border rounded-md">
                <button onClick={() => setExpandedFaq(expandedFaq === i ? null : i)} className="w-full text-left p-4 flex items-center justify-between">
                  <span className="font-medium text-[#171717]">{item.q}</span>
                  <span className="text-sm text-[#9a9186]">{expandedFaq === i ? '−' : '+'}</span>
                </button>
                {expandedFaq === i && (
                  <div className="p-4 pt-0 text-sm text-[#756f68]">{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24 md:py-40 px-6 md:px-8 bg-[#171717] text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-tight mb-8">
            What's on your mind?
          </h2>
          <p className="text-lg md:text-xl text-white/75 font-medium mb-12 leading-relaxed">
            Bring the problem. We'll think it through together.
          </p>
          <Button href="/book" variant="primary" className="inline-flex text-lg">Book a Session</Button>
          <p className="text-sm text-white/75 mt-4">Secure payment via UPI/card · Reschedule up to 24h before</p>
        </div>
      </section>
    </>
  );
}
