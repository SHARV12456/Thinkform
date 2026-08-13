'use client';

import { Button } from '@/components/ui/Button';

export default function About() {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">      <div className="max-w-3xl mx-auto">
        <div className="mb-16">
          <a href="/" className="text-sm font-bold text-[#666] hover:text-[#111] transition-premium">
            ← Back
          </a>
        </div>

        <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-tight mb-12">
          About ThinkForm
        </h1>
        
        <div className="space-y-8 text-lg text-[#666] font-medium leading-relaxed mb-16">
          <p>
            ThinkForm was created by someone obsessed with how people think through problems. Not the corporate consulting approach. Not generic frameworks. Just real thinking.
          </p>
          <p>
            Most people have good ideas. But they get stuck deciding whether to pursue them, how to position them, or which direction to take. They need someone to sit with them and think through it clearly.
          </p>
          <p className="text-xl text-[#111] font-bold leading-relaxed">
            Your thinking is worth something.
            <br />
            Sometimes you just need a good thinking partner.
          </p>
          <p>
            That's what ThinkForm is. Not a platform. Not a software. Not a subscription. Just a focused 1:1 session designed to help you see your situation more clearly and decide what comes next.
          </p>
        </div>

        {/* Core Values */}
        <div className="bg-[#f9f9f7] border border-[#e8e8e5] rounded-lg p-10 mb-16">
          <h2 className="text-sm font-bold text-[#999] uppercase tracking-widest mb-8">How ThinkForm Works</h2>
          <div className="space-y-6">
            {[
              {
                title: 'You bring the messy version',
                desc: 'No need to have it figured out. Bring the idea, problem or decision as it actually is.'
              },
              {
                title: 'We think through it together',
                desc: 'Challenge assumptions. Explore new angles. Test against reality. Find clarity.'
              },
              {
                title: 'You leave with direction',
                desc: 'Clear on what to do next. What actually matters. What you should stop worrying about.'
              }
            ].map((item, i) => (
              <div key={i}>
                <p className="font-bold text-[#111] mb-2">{item.title}</p>
                <p className="text-[#666]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why ThinkForm */}
        <div className="mb-16">
          <h2 className="text-2xl font-black mb-8 text-[#111]">Why ThinkForm exists</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#999] mb-3">NOT</p>
              <ul className="space-y-2">
                {[
                  'Generic consulting templates',
                  'One-size-fits-all advice',
                  'Unnecessary complexity',
                  'A new app or platform'
                ].map((item, i) => (
                  <li key={i} className="text-[#666] font-medium flex items-start gap-2">
                    <span className="shrink-0 text-[#ccc]">×</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#111] mb-3">THIS</p>
              <ul className="space-y-2">
                {[
                  'Real thinking',
                  'Your specific situation',
                  'Simplicity that works',
                  'Just a good session'
                ].map((item, i) => (
                  <li key={i} className="text-[#111] font-medium flex items-start gap-2">
                    <span className="shrink-0">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-12 border-t border-[#e8e8e5]">
          <Button href="/book" variant="primary" className="inline-flex">Book a Session</Button>
        </div>
        
        {/* Who you'll meet */}
        <div className="mt-12 bg-white border border-[#e8e8e5] rounded-xl p-8 max-w-2xl mx-auto">
          <h3 className="text-xl font-black mb-4">Who you'll meet</h3>
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-[#f3f3f3] flex items-center justify-center overflow-hidden">
              {/* Placeholder avatar */}
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 12a3 3 0 100-6 3 3 0 000 6z" fill="#e6e6e6" />
                <path d="M4 20a8 8 0 0116 0" fill="#e6e6e6" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-lg">Sharv — Founder & Thinking Partner</p>
              <p className="text-sm text-[#666] mt-1">10+ years advising startups and creative businesses in Mumbai. Background in product, strategy, and brand — focused on practical outcomes.</p>
              <p className="text-xs text-[#999] mt-2">Sessions are confidential. Book a quick intro to see the approach.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
