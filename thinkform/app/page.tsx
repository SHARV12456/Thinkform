'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if user has admin session cookie
  useEffect(() => {
    const checkAdminSession = () => {
      const cookies = document.cookie.split(';');
      const hasAdminSession = cookies.some(cookie => 
        cookie.trim().startsWith('tf_admin_session=')
      );
      setIsAdmin(hasAdminSession);
    };

    checkAdminSession();
    
    // Re-check when cookie changes
    const interval = setInterval(checkAdminSession, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="pt-24 pb-16 md:pt-40 md:pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-tight mb-8">
            Think better.
            <br />
            Move forward.
          </h1>
          
          <p className="text-lg md:text-xl text-[#666] font-medium leading-relaxed max-w-2xl mb-12">
            A private 1:1 session to challenge your thinking, explore possibilities, and get clear on what to do next.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-16">
            <Link
              href="/book"
              className="px-8 py-4 bg-[#111] text-white font-bold rounded-lg hover:bg-[#333] transition-premium text-base md:text-lg"
            >
              Book a Session →
            </Link>
            <Link
              href="#how-it-works"
              className="text-base md:text-lg font-medium text-[#666] hover:text-[#111] underline-hover transition-premium"
            >
              See how it works
            </Link>
          </div>

          <p className="text-sm md:text-base text-[#999] font-medium">
            Sessions from <span className="text-[#111] font-bold">₹3,999</span>
          </p>
        </div>
      </section>

      {/* ============ PROBLEM SECTION ============ */}
      <section className="py-16 md:py-24 px-6 border-t border-[#e8e8e5] bg-[#f9f9f7]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-16">
            Some problems don't need more information.
            <br />
            They need clearer thinking.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              "You have an idea but don't know what to do with it.",
              "You're stuck between multiple directions.",
              "Your business has a problem you can't see clearly.",
              "You need an outside perspective on a decision.",
              "You're overthinking something important.",
              "You need to turn scattered thoughts into a clear next move."
            ].map((situation, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="text-2xl font-light text-[#ddd] mt-1 shrink-0">→</div>
                <p className="text-lg md:text-xl text-[#333] font-medium leading-relaxed">
                  {situation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ VALUE PROPOSITION ============ */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-16">
            What ThinkForm does
          </h2>

          <div className="space-y-12">
            <div className="border-l-4 border-[#111] pl-8">
              <h3 className="text-2xl md:text-3xl font-black mb-3">01 — Bring the problem</h3>
              <p className="text-lg text-[#666] font-medium leading-relaxed">
                Come with the messy version. You don't need to have it perfectly figured out. The unclear thinking is exactly what we work with.
              </p>
            </div>

            <div className="border-l-4 border-[#111] pl-8">
              <h3 className="text-2xl md:text-3xl font-black mb-3">02 — Think it through</h3>
              <p className="text-lg text-[#666] font-medium leading-relaxed">
                We challenge assumptions, explore possibilities, test ideas against reality, and identify what actually matters. Not generic advice. Real thinking.
              </p>
            </div>

            <div className="border-l-4 border-[#111] pl-8">
              <h3 className="text-2xl md:text-3xl font-black mb-3">03 — Leave with clarity</h3>
              <p className="text-lg text-[#666] font-medium leading-relaxed">
                You leave knowing what to think about, what to stop, and what to do next. That's the whole point.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHO IT'S FOR ============ */}
      <section className="py-16 md:py-24 px-6 bg-[#f9f9f7]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-12">
            ThinkForm is for people building, deciding or figuring something out.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              'Founders with ideas',
              'Creators exploring direction',
              'Business owners facing decisions',
              'Professionals navigating change',
              'Teams evaluating strategy',
              'Anyone figuring out what comes next'
            ].map((audience, i) => (
              <div key={i} className="p-6 bg-white border border-[#e8e8e5] rounded-lg">
                <p className="text-lg font-medium text-[#111]">{audience}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SESSION OPTIONS ============ */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-16">
            Choose how deep you want to go.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Quick Think */}
            <div className="p-8 md:p-10 bg-white border border-[#e8e8e5] rounded-lg hover:border-[#111] transition-premium">
              <p className="text-xs font-bold uppercase tracking-widest text-[#999] mb-4">Quick Think</p>
              <h3 className="text-2xl font-black mb-2">₹3,999</h3>
              <p className="text-sm text-[#666] font-medium mb-8 leading-relaxed">
                For one focused problem that needs another perspective.
              </p>
              <ul className="space-y-2 mb-10 text-sm text-[#666]">
                <li>• 60 minute session</li>
                <li>• One main problem</li>
                <li>• Structured thinking</li>
                <li>• Clear next direction</li>
              </ul>
              <Link
                href="/book?session=quick-think"
                className="block text-center py-3 bg-[#111] text-white font-bold rounded-lg hover:bg-[#333] transition-premium"
              >
                Choose Quick Think →
              </Link>
            </div>

            {/* Deep Dive - Featured */}
            <div className="p-8 md:p-10 bg-[#111] text-white border border-[#111] rounded-lg ring-2 ring-[#111] md:scale-105 md:-my-6">
              <p className="text-xs font-bold uppercase tracking-widest text-[#999] mb-4">Most Chosen</p>
              <h3 className="text-2xl font-black mb-2">₹7,999</h3>
              <p className="text-sm text-[#ccc] font-medium mb-8 leading-relaxed">
                For problems that need time, exploration and structured strategic thinking.
              </p>
              <ul className="space-y-2 mb-10 text-sm text-[#ccc]">
                <li>• 90 minute session</li>
                <li>• Deep exploration</li>
                <li>• Multiple angles</li>
                <li>• Strategy focused</li>
              </ul>
              <Link
                href="/book?session=deep-dive"
                className="block text-center py-3 bg-white text-[#111] font-bold rounded-lg hover:bg-[#f0f0f0] transition-premium"
              >
                Choose Deep Dive →
              </Link>
            </div>

            {/* Strategy Sprint */}
            <div className="p-8 md:p-10 bg-white border border-[#e8e8e5] rounded-lg hover:border-[#111] transition-premium">
              <p className="text-xs font-bold uppercase tracking-widest text-[#999] mb-4">Strategy Sprint</p>
              <h3 className="text-2xl font-black mb-2">₹12,999</h3>
              <p className="text-sm text-[#666] font-medium mb-8 leading-relaxed">
                For complex situations requiring deep strategic direction and comprehensive thinking.
              </p>
              <ul className="space-y-2 mb-10 text-sm text-[#666]">
                <li>• Assessment + session</li>
                <li>• Complex problems</li>
                <li>• Deeper strategy</li>
                <li>• Comprehensive clarity</li>
              </ul>
              <Link
                href="/book?session=strategy-sprint"
                className="block text-center py-3 bg-[#111] text-white font-bold rounded-lg hover:bg-[#333] transition-premium"
              >
                Choose Strategy Sprint →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="py-16 md:py-24 px-6 bg-[#f9f9f7]" id="how-it-works">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-16">
            How it works
          </h2>

          <div className="space-y-8">
            {[
              { step: '01', title: 'Choose your session', desc: 'Select Quick Think, Deep Dive, or Strategy Sprint.' },
              { step: '02', title: 'Tell us what you\'re dealing with', desc: 'Fill out a short form about your situation, problem, or question.' },
              { step: '03', title: 'Choose your available time', desc: 'Pick a time slot that works for you.' },
              { step: '04', title: 'Complete payment', desc: 'Pay securely through UPI or your preferred method.' },
              { step: '05', title: 'Join the session', desc: 'Connect for your private 1:1 session at the scheduled time.' },
              { step: '06', title: 'Leave with clarity', desc: 'You know what to think about, what to stop, and what to do next.' }
            ].map((item, i) => (
              <div key={i} className="flex gap-6">
                <div className="font-black text-3xl text-[#ddd] shrink-0 w-12">{item.step}</div>
                <div>
                  <h3 className="text-lg md:text-xl font-black mb-2">{item.title}</h3>
                  <p className="text-[#666] font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-16 border-t border-[#e8e8e5]">
            <p className="text-lg text-[#666] font-medium mb-8">
              No complicated platform. No account needed. No unnecessary steps.
            </p>
            <Link
              href="/book"
              className="inline-block px-8 py-4 bg-[#111] text-white font-bold rounded-lg hover:bg-[#333] transition-premium"
            >
              Book a Session →
            </Link>
          </div>
        </div>
      </section>

      {/* ============ EXAMPLES ============ */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-16">
            Real examples of problems we work through
          </h2>

          <div className="space-y-12">
            {[
              {
                problem: "I have three business ideas and don't know which one to pursue.",
                thinking: "Compare demand, differentiation, feasibility and personal fit for each.",
                result: "Clear direction on which idea to test first and why."
              },
              {
                problem: "My business is stuck and I don't know if I should pivot or push harder.",
                thinking: "Analyze what's working, what's not, and what assumptions are wrong.",
                result: "Clear decision on next move with specific tests to run."
              },
              {
                problem: "I'm exploring a new direction but unsure if it's realistic.",
                thinking: "Test the idea against market reality, your strengths, and feasibility.",
                result: "Confidence in the direction or clarity on what needs to change."
              },
              {
                problem: "I have a business opportunity but I'm overthinking the decision.",
                thinking: "Identify what's real fear vs. what's actually risky vs. what's just unknown.",
                result: "Clear path forward with confidence in the decision."
              }
            ].map((example, i) => (
              <div key={i} className="p-8 md:p-10 bg-white border border-[#e8e8e5] rounded-lg">
                <div className="mb-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#999] mb-2">The Problem</p>
                  <p className="text-lg md:text-xl font-medium text-[#111]">{example.problem}</p>
                </div>
                <div className="mb-6 pl-6 border-l-2 border-[#e8e8e5]">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#999] mb-2">The Thinking</p>
                  <p className="text-base text-[#666] font-medium">{example.thinking}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#999] mb-2">The Result</p>
                  <p className="text-base font-medium text-[#111]">{example.result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHY THINKFORM ============ */}
      <section className="py-16 md:py-24 px-6 bg-[#f9f9f7]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-12">
            What makes ThinkForm different
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#999] mb-8">NOT</p>
              <ul className="space-y-4">
                {[
                  'Generic consulting frameworks',
                  'A 50-page strategy deck',
                  'Complicated platform or account',
                  'Months of deliverables',
                  'One-size-fits-all advice'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-lg font-medium text-[#666]">
                    <span className="text-[#ccc] mt-1">×</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#111] mb-8">THIS</p>
              <ul className="space-y-4">
                {[
                  'Real thinking together',
                  'Clear, actionable next steps',
                  'Simple booking and payment',
                  '1 focused session',
                  'Tailored to your situation'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-lg font-medium text-[#111]">
                    <span className="text-[#999] mt-1">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-16">
            Frequently asked questions
          </h2>

          <div className="space-y-4">
            {[
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
                a: "UPI, credit card, or other secure methods depending on your preference. Payment confirmation confirms your booking."
              },
              {
                q: "Can I book another session later?",
                a: "Absolutely. Many people book multiple sessions over time as situations evolve. You're welcome to come back."
              },
              {
                q: "What happens after I book?",
                a: "You'll receive confirmation with session details. A few days before, we'll send a reminder. At the scheduled time, join the private call."
              }
            ].map((faq, i) => (
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
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="py-20 md:py-32 px-6 bg-[#111]">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-8">
            You don't need to have it figured out before you start.
          </h2>
          <p className="text-lg md:text-xl text-[#ccc] font-medium mb-12 leading-relaxed max-w-2xl mx-auto">
            Bring the problem. We'll think through it together.
          </p>
          <Link
            href="/book"
            className="inline-block px-10 py-4 bg-white text-[#111] font-bold rounded-lg hover:bg-[#f0f0f0] transition-premium text-lg"
          >
            Book a ThinkForm Session →
          </Link>

          <div className="mt-16 pt-16 border-t border-white/20">
            <p className="text-sm text-[#999] font-medium">
              Sessions from <span className="text-white">₹3,999</span> to <span className="text-white">₹12,999</span>
            </p>
            {isAdmin && (
              <div className="mt-6">
                <Link
                  href="https://thinkform-fwtnhj0rn-sharv12456s-projects.vercel.app/admin"
                  className="inline-block text-xs font-semibold text-[#999] hover:text-[#C8FF3D] transition-premium px-3 py-1.5 border border-white/20 rounded hover:border-[#C8FF3D]"
                  title="Admin Dashboard"
                >
                  ⚙ Access Admin Panel
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
