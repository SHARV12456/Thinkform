'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function SocialProof() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-8 bg-[#f7f4ee] min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <Link href="/" className="inline-block text-sm font-bold text-[#b66a4a] hover:text-[#171717] transition-all mb-8">
            ← Back to ThinkForm
          </Link>
          <h1 className="text-6xl md:text-7xl font-black tracking-tight leading-tight mb-6">
            Social proof
          </h1>
          <p className="text-lg md:text-xl text-[#756f68] font-medium max-w-2xl">
            How ThinkForm helps people think more clearly and move forward faster.
          </p>
        </div>

        {/* Section 1: The Clarity Gap */}
        <section className="mb-20 pb-20 border-b border-[#e8e3da]">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-12">
            The clarity gap
          </h2>

          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-white border border-[#e8e3da] rounded-lg">
                <p className="text-sm font-bold text-[#b66a4a] tracking-widest uppercase mb-4">Before</p>
                <ul className="space-y-4">
                  {[
                    "Stuck between multiple directions",
                    "Can't see the full picture clearly",
                    "Overthinking everything",
                    "Don't know who to ask",
                    "Moving slowly or not at all"
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span className="text-[#b66a4a] font-bold shrink-0">×</span>
                      <span className="text-[#756f68]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 bg-white border border-[#e8e3da] rounded-lg">
                <p className="text-sm font-bold text-[#b66a4a] tracking-widest uppercase mb-4">After ThinkForm</p>
                <ul className="space-y-4">
                  {[
                    "Clear direction on what to do",
                    "See what actually matters",
                    "Confidence in the decision",
                    "Have a thinking partner",
                    "Moving forward with clarity"
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span className="text-[#b66a4a] font-bold shrink-0">✓</span>
                      <span className="text-[#171717] font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Illustrative Scenarios */}
        <section className="mb-20 pb-20 border-b border-[#e8e3da]">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-12">
            Illustrative scenarios
          </h2>

          <p className="text-sm text-[#9a9186] font-medium mb-12">
            These examples represent typical situations people bring to ThinkForm. Not specific client cases.
          </p>

          <div className="space-y-12">
            {[
              {
                title: "The Idea Validator",
                situation: "Three business ideas. No idea which to pursue.",
                thinkform: "Compare demand, feasibility, personal fit.",
                outcome: "Clear direction on which to test first."
              },
              {
                title: "The Stuck Founder",
                situation: "Business growing, then hit a wall. Pivot or push?",
                thinkform: "Analyze what's working, what's not, the real problem.",
                outcome: "Confidence in next move with specific experiments."
              },
              {
                title: "The Opportunity Overthink",
                situation: "Big opportunity. Good timing. Too much doubt.",
                thinkform: "Separate real risk from fear. Test assumptions.",
                outcome: "Confidence in the decision and next steps."
              },
              {
                title: "The Direction Shift",
                situation: "Considering a new direction, not sure if realistic.",
                thinkform: "Test against market, your strengths, feasibility.",
                outcome: "Clarity on whether to pursue or what must change."
              }
            ].map((scenario, i) => (
              <div key={i} className="p-8 md:p-10 bg-white border border-[#e8e3da] rounded-lg">
                <p className="text-sm font-bold text-[#b66a4a] tracking-widest uppercase mb-4">{scenario.title}</p>
                <h3 className="text-2xl font-black text-[#171717] mb-6">{scenario.situation}</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-bold text-[#9a9186] tracking-widest uppercase mb-2">ThinkForm focuses on</p>
                    <p className="text-[#756f68]">{scenario.thinkform}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#9a9186] tracking-widest uppercase mb-2">You leave with</p>
                    <p className="text-[#171717] font-medium">{scenario.outcome}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Why People Return */}
        <section className="mb-20">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-12">
            Why people return
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "One-off clarity",
                desc: "Some decisions need one focused conversation. Book Quick Think, get clarity, move forward."
              },
              {
                title: "Ongoing partnership",
                desc: "Others book multiple times. New quarter = new question. New opportunity = new uncertainty. Return as needed."
              },
              {
                title: "Faster decision loops",
                desc: "Instead of months stuck, weeks of overthinking, or years of uncertainty — get clear in hours and move."
              }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-white border border-[#e8e3da] rounded-lg">
                <h3 className="text-lg font-black text-[#171717] mb-4">{item.title}</h3>
                <p className="text-[#756f68]">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <div className="text-center py-16 border-t border-[#e8e3da]">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-8">
            Ready to think it through?
          </h2>
          <Button href="/book" variant="primary" className="text-lg">
            Book a session
          </Button>
        </div>
      </div>
    </div>
  );
}
