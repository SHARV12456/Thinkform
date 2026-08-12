'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [hoveredProblem, setHoveredProblem] = useState<number | null>(null);

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="pt-24 pb-32 md:pt-40 md:pb-48 px-6 md:px-8 relative overflow-hidden">
        {/* Subtle background grid effect */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div className="w-full h-full" style={{backgroundImage: 'linear-gradient(rgba(17,17,17,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,17,.1) 1px, transparent 1px)', backgroundSize: '50px 50px'}}></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="mb-12">
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.95] mb-6 text-balance">
              Think
              <br />
              <span className="text-[#999]">better.</span>
            </h1>
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.95] text-balance">
              Move
              <br />
              <span className="text-[#999]">forward.</span>
            </h1>
          </div>
          
          <p className="text-lg md:text-2xl text-[#666] font-medium leading-relaxed max-w-3xl mb-10 text-balance">
            A private 1:1 session with an outside mind to challenge your thinking, explore possibilities, and get clear on what to do next.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-16">
            <Link
              href="/book"
              className="px-8 py-4 bg-[#111] text-white font-bold rounded-full hover:bg-[#333] shadow-subtle hover:shadow-card transition-premium text-base md:text-lg"
            >
              Book a Session →
            </Link>
            <Link
              href="#how-it-works"
              className="text-base md:text-lg font-semibold text-[#666] hover:text-[#111] underline-hover transition-premium"
            >
              See how it works
            </Link>
          </div>

          <p className="text-sm md:text-base text-[#999] font-medium">
            Sessions from <span className="text-[#111] font-bold">₹3,999</span> → <span className="text-[#111] font-bold">₹12,999</span>
          </p>
        </div>
      </section>
      {/* Hero divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#e8e8e5] to-transparent"></div>

      {/* ============ PROBLEM SECTION ============ */}
      <section className="py-20 md:py-32 px-6 md:px-8 bg-[#f9f9f7]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-20">
            <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-tight text-balance">
              Some problems don't need more information. 
              <br />
              <span className="text-[#999]">They need clearer thinking.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "You have an idea but don't know what to do with it.",
              "You're stuck between multiple directions.",
              "Your business has a problem you can't see clearly.",
              "You need an outside perspective on a decision.",
              "You're overthinking something important.",
              "You need to turn scattered thoughts into a clear next move."
            ].map((situation, i) => (
              <div 
                key={i} 
                className="p-6 md:p-8 bg-white border border-[#e8e8e5] rounded-lg hover-lift cursor-pointer group interactive-state"
                onMouseEnter={() => setHoveredProblem(i)}
                onMouseLeave={() => setHoveredProblem(null)}
              >
                <div className="flex items-start gap-4">
                  <div className={`text-2xl font-light shrink-0 transition-all ${hoveredProblem === i ? 'text-[#111]' : 'text-[#ddd]'}`}>→</div>
                  <p className="text-lg md:text-xl text-[#333] font-semibold leading-relaxed group-hover:text-[#111]">
                    {situation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ VALUE PROPOSITION ============ */}
      <section className="py-20 md:py-32 px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-20 text-balance">
            What ThinkForm does
          </h2>

          <div className="space-y-12 md:space-y-16">
            {[
              {
                num: '01',
                title: 'Bring the problem',
                desc: 'Come with the messy version. You don\'t need to have it perfectly figured out. The unclear thinking is exactly what we work with.',
                color: '#111'
              },
              {
                num: '02',
                title: 'Think it through',
                desc: 'We challenge assumptions, explore possibilities, test ideas against reality, and identify what actually matters. Not generic advice. Real thinking.',
                color: '#111'
              },
              {
                num: '03',
                title: 'Leave with clarity',
                desc: 'You leave knowing what to think about, what to stop, and what to do next. That\'s the whole point.',
                color: '#111'
              }
            ].map((step, i) => (
              <div key={i} className="flex gap-8 md:gap-12 items-start">
                <div className="text-6xl md:text-7xl font-black text-[#e8e8e5] shrink-0 leading-none">{step.num}</div>
                <div className="flex-1 pt-4">
                  <h3 className="text-2xl md:text-3xl font-black mb-4 text-[#111]">{step.title}</h3>
                  <p className="text-lg md:text-xl text-[#666] font-medium leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHO IT'S FOR ============ */}
      <section className="py-20 md:py-32 px-6 md:px-8 bg-[#f9f9f7]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-16 text-balance">
            ThinkForm is for people 
            <br />
            <span className="text-[#999]">building, deciding, or figuring something out.</span>
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
              <div key={i} className="p-6 md:p-8 bg-white border border-[#e8e8e5] rounded-lg hover-lift text-[#111]">
                <p className="text-lg md:text-xl font-semibold">{audience}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SESSION OPTIONS (PREMIUM PRICING) ============ */}
      <section className="py-20 md:py-32 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20">
            <h2 className="text-5xl md:text-7xl font-black tracking-tight text-balance">
              Choose your depth<span className="text-[#999]">.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {/* Quick Think */}
            <div className="flex flex-col p-8 md:p-10 bg-white border border-[#e8e8e5] rounded-lg hover-lift hover:shadow-card">
              <div className="mb-8">
                <p className="text-xs font-bold uppercase tracking-widest text-[#999] mb-4">Quick Think</p>
                <h3 className="text-5xl font-black text-[#111] mb-4">₹3,999</h3>
                <p className="text-base text-[#666] font-medium leading-relaxed">
                  For one focused problem that needs another perspective.
                </p>
              </div>
              <ul className="space-y-3 mb-auto text-base text-[#666] font-medium">
                <li className="flex items-start gap-3"><span className="text-[#ccc]">✓</span> <span>60 minute session</span></li>
                <li className="flex items-start gap-3"><span className="text-[#ccc]">✓</span> <span>One main problem</span></li>
                <li className="flex items-start gap-3"><span className="text-[#ccc]">✓</span> <span>Structured thinking</span></li>
                <li className="flex items-start gap-3"><span className="text-[#ccc]">✓</span> <span>Clear next direction</span></li>
              </ul>
              <Link
                href="/book?session=quick-think"
                className="mt-10 px-6 py-3 bg-[#111] text-white font-bold rounded-full hover:bg-[#333] transition-premium text-center text-sm"
              >
                Choose Quick Think →
              </Link>
            </div>

            {/* Deep Dive - Featured */}
            <div className="flex flex-col p-8 md:p-10 bg-[#111] text-white border border-[#111] rounded-lg md:scale-105 md:shadow-card hover:shadow-card-hover">
              <div className="mb-8">
                <div className="inline-block px-3 py-1 bg-white/10 rounded-full mb-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#C8FF3D]">Most Chosen</p>
                </div>
                <h3 className="text-5xl font-black text-white mb-4">₹7,999</h3>
                <p className="text-base text-[#ccc] font-medium leading-relaxed">
                  For problems that need time, exploration, and strategic thinking.
                </p>
              </div>
              <ul className="space-y-3 mb-auto text-base text-[#ccc] font-medium">
                <li className="flex items-start gap-3"><span className="text-[#C8FF3D]">✓</span> <span>90 minute session</span></li>
                <li className="flex items-start gap-3"><span className="text-[#C8FF3D]">✓</span> <span>Deep exploration</span></li>
                <li className="flex items-start gap-3"><span className="text-[#C8FF3D]">✓</span> <span>Multiple angles</span></li>
                <li className="flex items-start gap-3"><span className="text-[#C8FF3D]">✓</span> <span>Strategy focused</span></li>
              </ul>
              <Link
                href="/book?session=deep-dive"
                className="mt-10 px-6 py-3 bg-white text-[#111] font-bold rounded-full hover:bg-[#f0f0f0] transition-premium text-center text-sm"
              >
                Choose Deep Dive →
              </Link>
            </div>

            {/* Strategy Sprint */}
            <div className="flex flex-col p-8 md:p-10 bg-white border border-[#e8e8e5] rounded-lg hover-lift hover:shadow-card">
              <div className="mb-8">
                <p className="text-xs font-bold uppercase tracking-widest text-[#999] mb-4">Strategy Sprint</p>
                <h3 className="text-5xl font-black text-[#111] mb-4">₹12,999</h3>
                <p className="text-base text-[#666] font-medium leading-relaxed">
                  For complex situations requiring comprehensive strategic direction.
                </p>
              </div>
              <ul className="space-y-3 mb-auto text-base text-[#666] font-medium">
                <li className="flex items-start gap-3"><span className="text-[#ccc]">✓</span> <span>Assessment + session</span></li>
                <li className="flex items-start gap-3"><span className="text-[#ccc]">✓</span> <span>Complex problems</span></li>
                <li className="flex items-start gap-3"><span className="text-[#ccc]">✓</span> <span>Deeper strategy</span></li>
                <li className="flex items-start gap-3"><span className="text-[#ccc]">✓</span> <span>Comprehensive clarity</span></li>
              </ul>
              <Link
                href="/book?session=strategy-sprint"
                className="mt-10 px-6 py-3 bg-[#111] text-white font-bold rounded-full hover:bg-[#333] transition-premium text-center text-sm"
              >
                Choose Strategy Sprint →
              </Link>
            </div>
          </div>

          {/* Pricing note */}
          <div className="mt-20 pt-10 border-t border-[#e8e8e5]">
            <p className="text-base md:text-lg text-[#666] font-medium">
              Each session includes preparation guidance, a dedicated thinking partner, and clarity on your next move.
            </p>
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="py-20 md:py-32 px-6 md:px-8 bg-[#f9f9f7]" id="how-it-works">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-20 text-balance">
            How it works
          </h2>

          <div className="space-y-8 md:space-y-10 max-w-3xl">
            {[
              { step: '01', title: 'Choose your session', desc: 'Quick Think, Deep Dive, or Strategy Sprint — select what matches your need.' },
              { step: '02', title: 'Tell us what you\'re dealing with', desc: 'Fill a short form about your situation, problem, or question. Keep it real, not polished.' },
              { step: '03', title: 'Pick your time', desc: 'Choose an available slot that works for your schedule.' },
              { step: '04', title: 'Secure payment', desc: 'Simple UPI, card, or payment option. Instant confirmation.' },
              { step: '05', title: 'Join your session', desc: 'Connect for your private 1:1 session at the scheduled time.' },
              { step: '06', title: 'Leave with clarity', desc: 'Know what to think about, what to stop, and what to do next.' }
            ].map((item, i) => (
              <div key={i} className="flex gap-8 md:gap-12 items-start pb-8 md:pb-10 border-b border-[#e8e8e5] last:border-b-0">
                <div className="font-black text-4xl md:text-6xl text-[#e8e8e5] shrink-0 leading-none pt-2">{item.step}</div>
                <div className="flex-1 pt-1">
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-[#111]">{item.title}</h3>
                  <p className="text-base md:text-lg text-[#666] font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-12">
            <p className="text-lg text-[#666] font-medium mb-8">
              No complicated platform. No account bloat. No unnecessary friction.
            </p>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#111] text-white font-bold rounded-full hover:bg-[#333] shadow-subtle hover:shadow-card transition-premium"
            >
              Start booking a session →
            </Link>
          </div>
        </div>
      </section>

      {/* ============ EXAMPLES ============ */}
      <section className="py-20 md:py-32 px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-20">
            <h2 className="text-5xl md:text-7xl font-black tracking-tight text-balance">
              Illustrative examples
              <br />
              <span className="text-[#999]">of how this plays out</span>
            </h2>
          </div>

          <div className="space-y-10 md:space-y-12">
            {[
              {
                problem: "Three business ideas. Don't know which to pursue.",
                thinking: "Compare demand, differentiation, feasibility, personal fit.",
                result: "Clear direction on which to test first and why."
              },
              {
                problem: "Growing business started, now stuck. Pivot or push harder?",
                thinking: "Analyze what's working, what's not, assumptions that are wrong.",
                result: "Confidence in next move with specific things to test."
              },
              {
                problem: "New direction looks good. But is it realistic?",
                thinking: "Test against market reality, your strengths, what's feasible.",
                result: "Clarity whether to pursue or what needs to change first."
              },
              {
                problem: "Big opportunity. Good timing. But overthinking the decision.",
                thinking: "Separate real fear from actual risk from unknown unknowns.",
                result: "Confidence in the decision and specific next steps."
              }
            ].map((example, i) => (
              <div key={i} className="border-l-4 border-[#111] pl-8 md:pl-12">
                <p className="text-xs font-bold uppercase tracking-widest text-[#999] mb-3">Example {String(i + 1).padStart(2, '0')}</p>
                <p className="text-2xl md:text-3xl font-bold text-[#111] mb-6">{example.problem}</p>
                <p className="text-base md:text-lg text-[#666] font-medium mb-4">
                  <span className="font-bold text-[#999]">Thinking:</span> {example.thinking}
                </p>
                <p className="text-base md:text-lg font-medium text-[#111]">
                  <span className="font-bold text-[#999]">Outcome:</span> {example.result}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CONTINUOUS THINKING RELATIONSHIP ============ */}
      <section className="py-20 md:py-32 px-6 md:px-8 bg-[#f9f9f7]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <h2 className="text-5xl md:text-7xl font-black tracking-tight text-balance">
              Some decisions 
              <br />
              <span className="text-[#999]">need one conversation.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white p-10 md:p-12 rounded-lg border border-[#e8e8e5]">
              <p className="text-4xl font-bold text-[#111] mb-4">₹3,999</p>
              <h3 className="text-2xl font-bold mb-4 text-[#111]">Solve one problem</h3>
              <p className="text-base text-[#666] font-medium leading-relaxed">
                Quick Think is immediate clarity. Get direction on one specific thing now, then move forward.
              </p>
            </div>

            <div className="bg-white p-10 md:p-12 rounded-lg border border-[#e8e8e5]">
              <p className="text-4xl font-bold text-[#111] mb-4">↻</p>
              <h3 className="text-2xl font-bold mb-4 text-[#111]">Others need ongoing thinking</h3>
              <p className="text-base text-[#666] font-medium leading-relaxed">
                Return when the next decision arrives. When a new direction needs exploring. When strategic clarity is needed elsewhere.
              </p>
            </div>
          </div>

          <div className="mt-16 pt-16 border-t border-[#e8e8e5]">
            <p className="text-lg md:text-xl text-[#666] font-medium max-w-3xl">
              <span className="font-bold text-[#111]">This pattern repeats.</span> You book a Deep Dive. Explore something complex. Get clear. Then weeks or months later, another question emerges. You book again. This becomes how you think about your business — with a thinking partner who knows your context.
            </p>
          </div>
        </div>
      </section>

      {/* ============ DIFFERENTIATION ============ */}
      <section className="py-20 md:py-32 px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-20 text-balance">
            What makes ThinkForm different
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-[#999] mb-10 pb-10 border-b border-[#e8e8e5]">Not This</p>
              <ul className="space-y-6">
                {[
                  { icon: '×', text: 'Generic consulting frameworks' },
                  { icon: '×', text: '50-page strategy decks' },
                  { icon: '×', text: 'Complicated platforms or accounts' },
                  { icon: '×', text: 'Months of engagements' },
                  { icon: '×', text: 'One-size-fits-all advice' }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="text-xl text-[#ccc] shrink-0 font-light">{item.icon}</span>
                    <span className="text-lg font-medium text-[#666]">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-[#111] mb-10 pb-10 border-b border-[#e8e8e5]">This Instead</p>
              <ul className="space-y-6">
                {[
                  { icon: '✓', text: 'Real thinking together' },
                  { icon: '✓', text: 'Clear, actionable next steps' },
                  { icon: '✓', text: 'Simple booking and payment' },
                  { icon: '✓', text: 'One focused session' },
                  { icon: '✓', text: 'Tailored to your situation' }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="text-xl text-[#999] shrink-0">{item.icon}</span>
                    <span className="text-lg font-semibold text-[#111]">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="py-20 md:py-32 px-6 md:px-8 bg-[#f9f9f7]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-16 text-balance">
            Questions
          </h2>

          <div className="space-y-0 divide-y divide-[#e8e8e5]">
            {[
              {
                q: "What can I bring to a ThinkForm session?",
                a: "Anything on your mind. An idea, a decision, a problem you're stuck on, a direction you're considering. It doesn't need to be polished or well-defined. The unclear version is exactly what we work with."
              },
              {
                q: "Do I need to prepare?",
                a: "Not required. But helpful: collect your thoughts into a few key points. The messy first draft is fine. Some people write notes. Most just show up ready to talk."
              },
              {
                q: "Is this business consulting?",
                a: "No. This is thinking. Not about implementing a 100-point plan. About clarity on what actually matters and what to do next. It's collaborative, focused, and tailored to your situation."
              },
              {
                q: "Which session should I book?",
                a: "Quick Think (₹3,999) if one problem needs clarity. Deep Dive (₹7,999) for problems that need time and exploration. Strategy Sprint (₹12,999) for complex situations needing comprehensive thinking."
              },
              {
                q: "How simple is the booking?",
                a: "Very. Choose session → tell us your situation → pick your time → pay → you're booked. We send confirmation with all details. No complications."
              },
              {
                q: "What payment methods work?",
                a: "UPI, credit card, and other common payment methods depending on your preference. Payment is instant and secure."
              },
              {
                q: "Can I book another session later?",
                a: "Absolutely. Many people book multiple sessions over time as new questions and decisions emerge. You're welcome back anytime."
              },
              {
                q: "What happens after booking?",
                a: "You get confirmation with session details. A few days before, we send a reminder. At scheduled time, join for your private session."
              }
            ].map((faq, i) => (
              <div key={i}>
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full py-6 md:py-8 text-left font-bold text-lg md:text-xl text-[#111] hover:text-[#333] transition-premium flex items-start justify-between gap-4 focus-premium"
                >
                  <span className="text-balance">{faq.q}</span>
                  <span className="text-[#999] ml-4 shrink-0 text-base mt-1">{expandedFaq === i ? '−' : '+'}</span>
                </button>
                {expandedFaq === i && (
                  <div className="pb-6 md:pb-8 text-base md:text-lg text-[#666] font-medium leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="py-24 md:py-40 px-6 md:px-8 bg-[#111]">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-6xl md:text-8xl font-black tracking-tight leading-tight mb-8 text-balance">
            You don't need to have it all figured out.
          </h2>
          <p className="text-xl md:text-2xl text-[#ccc] font-medium mb-12 leading-relaxed max-w-3xl mx-auto text-balance">
            Bring the problem. We'll think through it together.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-[#111] font-bold rounded-full hover:bg-[#f0f0f0] shadow-subtle hover:shadow-card transition-premium text-lg md:text-xl"
          >
            Book a ThinkForm Session →
          </Link>

          <div className="mt-20 pt-12 border-t border-white/10">
            <p className="text-base text-[#999] font-medium">
              Sessions from <span className="text-[#C8FF3D]">₹3,999</span> to <span className="text-[#C8FF3D]">₹12,999</span>
            </p>
            <p className="text-sm text-[#666] font-medium mt-4">
              Simple. Focused. Real thinking.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
