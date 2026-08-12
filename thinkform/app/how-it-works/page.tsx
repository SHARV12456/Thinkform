'use client';

import Link from 'next/link';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Bring the problem',
      desc: 'Come with the messy version. An idea, decision, problem or direction - it doesn\'t need to be polished.'
    },
    {
      num: '02',
      title: 'Think it through',
      desc: 'We challenge assumptions, explore possibilities, test against reality. This is real thinking, not generic advice.'
    },
    {
      num: '03',
      title: 'Find clarity',
      desc: 'Identify what actually matters. What to think about, what to stop, what to do next.'
    },
    {
      num: '04',
      title: 'Leave with direction',
      desc: 'You know exactly what your next move is. Clear strategy. Clear decision. Clear path forward.'
    }
  ];

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <Link href="/" className="text-sm font-bold text-[#666] hover:text-[#111] transition-premium mb-8 inline-block">
            ← Back
          </Link>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-tight mb-6">
            How ThinkForm works
          </h1>
          <p className="text-lg md:text-xl text-[#666] font-medium leading-relaxed max-w-2xl">
            Four simple steps from a messy thought to clear strategic direction.
          </p>
        </div>

        <div className="relative border-l-4 border-[#111] ml-4 md:ml-8 space-y-16 pb-16">
          {steps.map((step, i) => (
            <div key={i} className="relative pl-10 md:pl-16">
              <div className="absolute left-[-28px] top-0 w-12 h-12 bg-white border-4 border-[#111] rounded-full flex items-center justify-center font-black text-lg text-[#111]">
                {step.num}
              </div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-3">{step.title}</h2>
              <p className="text-lg text-[#666] font-medium leading-relaxed max-w-2xl">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-[#111] text-white p-12 md:p-16 rounded-lg text-center my-20">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-6 leading-tight">
            Ready to think differently?
          </h2>
          <p className="text-[#ccc] font-medium text-lg mb-10 max-w-lg mx-auto">
            Choose your session, tell us what you're working on, and let's get you clear.
          </p>
          <Link
            href="/book"
            className="inline-block px-8 py-4 bg-white text-[#111] font-bold rounded-lg hover:bg-[#f0f0f0] transition-premium text-lg"
          >
            Book a Session →
          </Link>
        </div>

        {/* Why This Works */}
        <div className="bg-[#f9f9f7] border border-[#e8e8e5] p-10 rounded-lg">
          <h2 className="text-2xl font-black mb-8 text-[#111]">Why this approach works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'No templates',
                desc: 'Every situation is unique. We discard the frameworks and work with your reality.'
              },
              {
                title: 'No complexity',
                desc: 'A focused 1:1 conversation. No platforms, no lengthy processes, no unnecessary steps.'
              },
              {
                title: 'Real strategic thinking',
                desc: 'We\'re not implementing 100 recommendations. We\'re getting you clear on what matters.'
              },
              {
                title: 'High-quality output',
                desc: 'You leave with decision clarity and a specific next move, not confused by too many options.'
              }
            ].map((item, i) => (
              <div key={i}>
                <h3 className="font-bold text-[#111] mb-2">{item.title}</h3>
                <p className="text-[#666] font-medium text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
