'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDepth, setSelectedDepth] = useState<string | null>(null);

  const getRecommendation = () => {
    if (!selectedCategory || !selectedDepth) return null;
    if (selectedDepth === 'quick') return { title: 'IDEA SESSION', price: '₹3,999', href: '/services/idea-session' };
    if (selectedDepth === 'deep') return { title: 'DEEP DIVE', price: '₹7,999', href: '/services/strategy-session' };
    if (selectedDepth === 'reset') return { title: 'BUSINESS RESET', price: '₹12,999', href: '/services/business-reset' };
  };

  const recommendation = getRecommendation();

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="pt-20 pb-12 md:pt-32 md:pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Eyebrow */}
          <div className="mb-6 md:mb-8">
            <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-[#6F6D67]">
              Thinking for people building something
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] mb-8 md:mb-10">
            You have<br />
            the idea.
            <br />
            <span className="text-lime">You don't have</span>
          </h1>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] mb-10 md:mb-14">
            the answer.
          </h1>

          {/* Supporting line */}
          <p className="text-lg md:text-xl text-[#6F6D67] font-medium leading-relaxed max-w-2xl mb-12 md:mb-16">
            A focused 1:1 session to challenge your thinking, sharpen the opportunity and decide what to do next.
          </p>

          {/* Primary CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12 md:mb-16">
            <Link
              href="/book"
              className="btn-primary px-8 md:px-10 py-3 md:py-4 rounded-full text-base md:text-lg font-bold inline-flex items-center gap-2"
            >
              Book a Session →
            </Link>
            <Link
              href="/how-it-works"
              className="text-base md:text-lg font-medium text-[#6F6D67] hover:text-[#111] underline-hover transition-premium"
            >
              See how it works ↓
            </Link>
          </div>

          {/* Trust signals */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-8 text-xs md:text-sm font-medium text-[#6F6D67]">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C8FF3D]"></span> 4 NEW CLIENTS / MONTH
            </span>
            <span>60 MINUTES • 1:1 • ₹3,999+</span>
            <span>REMOTE • MUMBAI</span>
          </div>
        </div>
      </section>

      {/* ============ "WHO IS THIS FOR?" ============ */}
      <section className="py-16 md:py-24 px-6 border-t border-[#E7E4DC]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-12 md:mb-16">
            You might need ThinkForm if
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "I have an idea but don't know if it's worth pursuing.",
              "I know what I want to build, but not how to position it.",
              "My business has stalled and I can't see why.",
              "I have too many directions and need to choose one.",
              "I want someone to challenge my thinking before I commit."
            ].map((statement, i) => (
              <div
                key={i}
                className="p-6 md:p-8 bg-white border border-[#E7E4DC] rounded-lg hover:border-[#111] hover:bg-[#F5F3EE] transition-premium cursor-pointer group"
              >
                <span className="text-sm md:text-base text-[#111] font-medium leading-relaxed group-hover:text-lime transition-premium">
                  ✓ {statement}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHAT HAPPENS IN 60 MINUTES ============ */}
      <section className="py-16 md:py-24 px-6 bg-[#111111] text-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-16 md:mb-20">
            What happens in 60 minutes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-16 md:mb-24">
            {[
              {
                step: '01',
                title: 'UNPACK',
                description: "What's actually happening?"
              },
              {
                step: '02',
                title: 'CHALLENGE',
                description: "What assumptions are wrong?"
              },
              {
                step: '03',
                title: 'DECIDE',
                description: "What should you do next?"
              }
            ].map((item, i) => (
              <div key={i}>
                <div className="text-5xl md:text-6xl font-black text-lime mb-4">{item.step}</div>
                <h3 className="text-2xl md:text-3xl font-black mb-3">{item.title}</h3>
                <p className="text-lg text-[#999]">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-12 md:pt-16">
            <p className="text-2xl md:text-3xl font-black text-center text-lime">
              YOU DON'T LEAVE WITH A REPORT.<br />
              YOU LEAVE WITH A DECISION.
            </p>
          </div>
        </div>
      </section>

      {/* ============ SERVICES / PRICING ============ */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-12 md:mb-16">
            What do you need right now?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                label: 'I NEED AN IDEA CHECK',
                title: 'IDEA SESSION',
                duration: '60 MIN',
                price: '₹3,999',
                description: 'A rough idea you want to test and sharpen.',
                href: '/services/idea-session',
                cta: 'This is me →',
                popular: false
              },
              {
                label: 'I NEED TO GO DEEPER',
                title: 'DEEP DIVE',
                duration: '90 MIN',
                price: '₹7,999',
                description: 'A complex business problem that needs deeper thinking.',
                href: '/services/strategy-session',
                cta: 'Go deeper →',
                popular: true
              },
              {
                label: 'I NEED A RESET',
                title: 'BUSINESS RESET',
                duration: 'ASSESSMENT + 1:1',
                price: '₹12,999',
                description: 'A business that needs a complete rethink.',
                href: '/services/business-reset',
                cta: 'Reset it →',
                popular: false
              }
            ].map((service, i) => (
              <div
                key={i}
                className={`p-8 md:p-10 rounded-lg border transition-premium ${
                  service.popular
                    ? 'bg-[#111111] text-white border-[#C8FF3D] ring-1 ring-[#C8FF3D]'
                    : 'bg-white border-[#E7E4DC] hover:border-[#111]'
                }`}
              >
                {service.popular && (
                  <div className="text-xs font-bold text-[#C8FF3D] uppercase tracking-widest mb-4">
                    ★ Most Popular
                  </div>
                )}

                <div className="text-xs font-bold uppercase tracking-widest mb-6 text-[#999]">
                  {service.label}
                </div>

                <h3 className="text-2xl font-black mb-2">{service.title}</h3>
                <p className={`text-sm font-medium mb-8 ${service.popular ? 'text-[#999]' : 'text-[#6F6D67]'}`}>
                  {service.duration}
                </p>

                <div className={`text-4xl font-black mb-8 ${service.popular ? 'text-lime' : ''}`}>
                  {service.price}
                </div>

                <p className={`text-base mb-8 leading-relaxed ${service.popular ? 'text-[#ccc]' : 'text-[#6F6D67]'}`}>
                  {service.description}
                </p>

                <Link
                  href={service.href}
                  className={`inline-flex items-center gap-2 font-bold transition-premium ${
                    service.popular
                      ? 'text-lime hover:text-white'
                      : 'text-[#111] hover:text-lime underline'
                  }`}
                >
                  {service.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ "NOT SURE?" DECISION SELECTOR ============ */}
      <section className="py-16 md:py-24 px-6 bg-[#111111] text-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
              Not sure which one you need?
            </h2>
            <p className="text-lg text-[#999]">
              Answer 2 quick questions. We'll recommend the right fit in 10 seconds.
            </p>
          </div>

          {/* Decision Flow */}
          {!selectedCategory && !selectedDepth && (
            <div className="space-y-12">
              {/* Question 1 */}
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-lime mb-6">
                  Question 1
                </p>
                <p className="text-2xl md:text-3xl font-black mb-8">
                  What are you dealing with?
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { value: 'ideating', label: 'I HAVE AN IDEA' },
                    { value: 'stuck', label: 'I\'M STUCK' },
                    { value: 'broken', label: 'MY BUSINESS ISN\'T WORKING' },
                    { value: 'reset', label: 'I WANT A NEW DIRECTION' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => setSelectedCategory(option.value)}
                      className="p-4 md:p-6 border border-white/20 rounded-lg hover:bg-white/5 hover:border-lime transition-premium text-left font-bold text-base md:text-lg"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedCategory && !selectedDepth && (
            <div>
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-sm text-[#999] hover:text-white mb-8 transition-premium"
              >
                ← Back
              </button>
              <p className="text-sm font-bold uppercase tracking-widest text-lime mb-6">
                Question 2
              </p>
              <p className="text-2xl md:text-3xl font-black mb-8">
                How deep do you want to go?
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { value: 'quick', label: 'QUICK CLARITY' },
                  { value: 'deep', label: 'DEEP THINKING' },
                  { value: 'reset', label: 'COMPLETE RESET' }
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedDepth(option.value)}
                    className="p-4 md:p-6 border border-white/20 rounded-lg hover:bg-white/5 hover:border-lime transition-premium text-center font-bold"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {recommendation && (
            <div className="text-center">
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedDepth(null);
                }}
                className="text-sm text-[#999] hover:text-white mb-8 transition-premium"
              >
                ← Start over
              </button>
              <p className="text-sm font-bold uppercase tracking-widest text-lime mb-8">
                Your Best Fit
              </p>
              <div className="bg-white/5 border border-white/20 rounded-lg p-8 md:p-12 mb-8">
                <p className="text-[#999] text-sm mb-2">Recommended for you</p>
                <h3 className="text-4xl md:text-5xl font-black mb-4">{recommendation.title}</h3>
                <p className="text-3xl font-bold text-lime">{recommendation.price}</p>
              </div>
              <Link
                href={recommendation.href}
                className="btn-primary px-8 md:px-10 py-3 md:py-4 rounded-full text-base md:text-lg font-bold inline-flex items-center gap-2"
              >
                Book This →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-12 md:mb-16">
            What founders say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote: "I was stuck for months on how to position my tech product. In 60 minutes, we tore it down and found an angle I hadn't even considered.",
                name: 'Rahul M.',
                title: 'SaaS Founder, Mumbai'
              },
              {
                quote: "No fluff, no generic frameworks. Just highly critical, sharp feedback that forced me to rethink my entire revenue model.",
                name: 'Sneha P.',
                title: 'E-Commerce Entrepreneur'
              }
            ].map((testimonial, i) => (
              <div key={i} className="p-8 md:p-10 bg-white border border-[#E7E4DC] rounded-lg">
                <p className="text-lg md:text-xl font-medium italic text-[#111] mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-[#6F6D67]">{testimonial.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ THIS IS NOT...THIS IS ============ */}
      <section className="py-16 md:py-24 px-6 bg-[#111111] text-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-12 md:mb-16">
            This is not consulting by spreadsheet
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#666] mb-8">
                NOT THIS
              </p>
              <ul className="space-y-4">
                {[
                  'A 40-page strategy deck',
                  'Generic frameworks',
                  'Corporate consulting',
                  'Months of meetings',
                  'Theoretical thinking'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-lg">
                    <span className="text-[#666] mt-1">×</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-lime mb-8">
                THIS
              </p>
              <ul className="space-y-4">
                {[
                  'Thinking together',
                  'Challenging assumptions',
                  'Finding the angle',
                  'Making the next move',
                  'Real clarity'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-lg">
                    <span className="text-lime">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-12 md:mb-16">
            How it works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'BOOK', description: 'Choose the session that fits your need.' },
              { step: '02', title: 'BRING THE MESS', description: 'Bring your idea, problem or question.' },
              { step: '03', title: 'THINK TOGETHER', description: 'We challenge it live in a 1:1 setting.' },
              { step: '04', title: 'LEAVE CLEAR', description: 'You know what to do next.' }
            ].map((item, i) => (
              <div key={i}>
                <div className="text-4xl md:text-5xl font-black text-lime mb-4">{item.step}</div>
                <h3 className="text-xl font-black mb-3">{item.title}</h3>
                <p className="text-sm md:text-base text-[#6F6D67]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ AVAILABILITY ============ */}
      <section className="py-12 md:py-16 px-6 border-t border-[#E7E4DC]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-[#999] mb-2">
              Availability
            </p>
            <p className="text-2xl md:text-3xl font-black">
              4 new clients per month
            </p>
          </div>
          <Link
            href="/book"
            className="btn-primary px-8 md:px-10 py-3 md:py-4 rounded-full text-base md:text-lg font-bold inline-flex items-center gap-2 whitespace-nowrap"
          >
            Book a Session →
          </Link>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="py-20 md:py-32 px-6 bg-[#111111] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-10 md:mb-14 leading-[1.1]">
            Ready to think<br />
            differently?
          </h2>
          <Link
            href="/book"
            className="btn-primary px-10 md:px-12 py-4 md:py-5 rounded-full text-lg md:text-xl font-bold inline-flex items-center gap-2"
          >
            Book a Session →
          </Link>
        </div>
      </section>
    </>
  );
}
