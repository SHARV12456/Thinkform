'use client';

import { Button } from '@/components/ui/Button';

export default function SocialProof() {
  return (
    <>
      {/* ============ HEADER ============ */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm font-bold uppercase tracking-widest text-[#999] mb-8">Social Proof</p>
          <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-tight mb-8 text-balance">
            Good thinking should leave evidence.
          </h1>
          <p className="text-lg md:text-2xl text-[#666] font-medium max-w-3xl">
            ThinkForm has helped people make clearer decisions, build with more confidence, and move their businesses forward.
          </p>
        </div>
      </section>

      {/* ============ OUTCOMES ============ */}
      <section className="py-20 md:py-32 px-6 md:px-8 bg-[#f9f9f7]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-20 text-balance">
            What clarity looks like
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Clarity on direction',
                desc: 'Moved from indecision to a specific next step. Started testing an idea or made a decision with confidence.'
              },
              {
                title: 'Business confidence',
                desc: 'Gained perspective on a business problem. Understood what was working and what needed to change.'
              },
              {
                title: 'Decision clarity',
                desc: 'Moved past overthinking. Made an important choice with clear reasoning and reduced doubt.'
              },
              {
                title: 'Strategic clarity',
                desc: 'Explored a complex situation from multiple angles. Identified what matters most for next steps.'
              },
              {
                title: 'Prioritization',
                desc: 'Too many possibilities became clear priorities. Focused on what to pursue first.'
              },
              {
                title: 'Next-step definition',
                desc: 'Went from scattered thinking to a specific, testable next move.'
              }
            ].map((outcome, i) => (
              <div key={i} className="p-8 md:p-10 bg-white border border-[#e8e8e5] rounded-lg">
                <h3 className="text-2xl font-bold text-[#111] mb-4">{outcome.title}</h3>
                <p className="text-base text-[#666] font-medium leading-relaxed">{outcome.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CLIENT SITUATIONS ============ */}
      <section className="py-20 md:py-32 px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-20 text-balance">
            Illustrative situations
          </h2>

          <div className="space-y-12 md:space-y-16">
            {[
              {
                num: '01',
                situation: 'Three business ideas. One direction.',
                problem: 'A founder had multiple promising ideas but couldn\'t decide which to pursue first.',
                thinking: 'Explored demand, differentiation, feasibility, and personal fit for each idea.',
                outcome: 'Clear prioritization. Started testing the highest-potential idea.'
              },
              {
                num: '02',
                situation: 'Scaling dilemma: When do you hire?',
                problem: 'A growing business was at capacity but uncertain about hiring costs and timing.',
                thinking: 'Examined current bottlenecks, financial impact, and market opportunity.',
                outcome: 'Decided on hiring strategy with specific roles and timeline.'
              },
              {
                num: '03',
                situation: 'Pivot or persist?',
                problem: 'A struggling business needed to decide whether to pivot or push harder.',
                thinking: 'Analyzed what was working, what wasn\'t, and what was actually controllable.',
                outcome: 'Chose a specific pivot with tests to validate before full shift.'
              },
              {
                num: '04',
                situation: 'Opportunity with uncertainty.',
                problem: 'A major business opportunity appeared but the decision felt risky.',
                thinking: 'Separated real risk from fear, identified knowable vs. unknown factors.',
                outcome: 'Moved forward with the opportunity and a risk-mitigation plan.'
              }
            ].map((item, i) => (
              <div key={i} className="border-l-4 border-[#111] pl-8 md:pl-12 py-8">
                <p className="text-xs font-bold uppercase tracking-widest text-[#999] mb-3">Example {item.num}</p>
                <h3 className="text-3xl md:text-4xl font-bold text-[#111] mb-6">{item.situation}</h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#999] mb-2">The Situation</p>
                    <p className="text-base md:text-lg text-[#666] font-medium">{item.problem}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#999] mb-2">The Thinking</p>
                    <p className="text-base md:text-lg text-[#666] font-medium">{item.thinking}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#999] mb-2">The Outcome</p>
                    <p className="text-base md:text-lg font-semibold text-[#111]">{item.outcome}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 pt-12 border-t border-[#e8e8e5]">
            <p className="text-base text-[#666] font-medium italic">
              These are illustrative examples based on common business situations. Real outcomes vary based on specific circumstances.
            </p>
          </div>
        </div>
      </section>

      {/* ============ TRUST INDICATORS ============ */}
      <section className="py-20 md:py-32 px-6 md:px-8 bg-[#f9f9f7]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-16 text-balance">
            Why trust ThinkForm
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-[#111] mb-6">1:1 thinking</h3>
              <p className="text-base text-[#666] font-medium leading-relaxed">
                Every session is private and focused entirely on your situation. No templates. No generic frameworks. Real thinking tailored to you.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#111] mb-6">Structured approach</h3>
              <p className="text-base text-[#666] font-medium leading-relaxed">
                Sessions use proven thinking frameworks to explore problems from multiple angles and reach real clarity.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#111] mb-6">Action-oriented</h3>
              <p className="text-base text-[#666] font-medium leading-relaxed">
                Sessions end with clarity on what to do next. Not more information. Specific, testable next steps.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#111] mb-6">Repeat-friendly</h3>
              <p className="text-base text-[#666] font-medium leading-relaxed">
                Many people book multiple sessions as situations evolve. ThinkForm works as an ongoing thinking partnership.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-24 md:py-40 px-6 md:px-8 bg-[#111]">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-tight mb-8 text-balance">
            Ready for clearer thinking?
          </h2>
          <p className="text-xl md:text-2xl text-[#ccc] font-medium mb-12 leading-relaxed max-w-3xl mx-auto text-balance">
            Book a session and explore your situation with structured thinking.
          </p>
          <Button href="/book" variant="primary" className="inline-flex text-lg md:text-xl">Book a Session</Button>

          <div className="mt-16 pt-12 border-t border-white/10">
            <p className="text-base text-[#999] font-medium">
              Quick Think: <span className="text-[#C8FF3D]">₹3,999</span> • Deep Dive: <span className="text-[#C8FF3D]">₹7,999</span> • Strategy Sprint: <span className="text-[#C8FF3D]">₹12,999</span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
