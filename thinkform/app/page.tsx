import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-40 pb-20 md:pt-52 md:pb-32 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] mb-8 text-[#111]">
            You have an idea.<br />
            Let&apos;s see what it could become.
          </h1>
          <p className="text-xl md:text-2xl text-[#555] font-medium leading-relaxed max-w-2xl mb-12">
            A 1:1 creative business consultation for people who want a sharper idea, a better direction, or simply someone to challenge the way they&apos;re thinking.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-12">
            <Button href="/book" variant="primary" className="w-full sm:w-auto px-8 py-4 text-base">Book a 1:1 Session</Button>
            <Button href="/how-it-works" variant="ghost" className="w-full sm:w-auto px-8 py-4 text-base border-none hover:bg-transparent hover:text-[#555] hover:underline">See How It Works</Button>
          </div>
          <div className="flex items-start gap-4 p-6 bg-[#fff] border border-[#e8e8e5] rounded-2xl max-w-md shadow-sm">
            <div className="text-2xl mt-1 text-[#888]">✍️</div>
            <p className="text-sm font-medium text-[#555] leading-relaxed italic">
              No templates.<br />
              No generic advice.<br />
              Just your idea, and a fresh perspective.
            </p>
          </div>
        </div>
      </section>

      {/* What I Actually Help With */}
      <section className="py-24 px-6 bg-white border-y border-[#e8e8e5]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6">Bring me the messy version.</h2>
            <p className="text-lg text-[#555] font-medium leading-relaxed">
              You don&apos;t need to arrive with a perfect business plan. You can arrive with a half-formed thought, a strange idea, a business you&apos;re stuck with, or simply a feeling that something could work.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { t: 'I have an idea.', d: 'Turn a rough thought into a clearer business opportunity.' },
              { t: 'I want to start something.', d: 'Explore business directions based on your strengths, interests and market opportunities.' },
              { t: 'Something isn\'t working.', d: 'Break down your existing business and identify what could change.' },
              { t: 'I want something different.', d: 'Find unconventional positioning, offers or business models.' },
              { t: 'I don\'t know what to build.', d: 'Explore possibilities from scratch.' }
            ].map((card, i) => (
              <div key={i} className="p-8 bg-[#F5F5F3] rounded-2xl group hover:bg-[#111] hover:text-white transition-colors duration-300">
                <h3 className="text-xl font-bold tracking-tight mb-3 group-hover:text-white transition-colors">"{card.t}"</h3>
                <p className="text-[#555] group-hover:text-[#aaa] font-medium leading-relaxed transition-colors">{card.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Difference */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-16 text-center max-w-3xl mx-auto">
            This isn&apos;t consulting by spreadsheet.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            <div className="bg-white p-10 md:p-16 rounded-[2rem] border border-[#e8e8e5]">
              <h3 className="text-sm font-bold text-[#888] uppercase tracking-widest mb-8">Most consulting</h3>
              <ul className="space-y-6">
                {['Frameworks', 'Generic recommendations', 'Reports', 'Meetings', 'Templates'].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-[#555] font-medium text-lg">
                    <span className="text-[#ccc]">×</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#111] p-10 md:p-16 rounded-[2rem] text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none" />
              <h3 className="text-sm font-bold text-[#888] uppercase tracking-widest mb-8">This</h3>
              <ul className="space-y-6">
                {['Think together', 'Challenge assumptions', 'Generate ideas', 'Explore possibilities', 'Find the angle nobody noticed', 'Leave with a clear next move'].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 font-semibold text-lg">
                    <span className="text-[#888] mt-1">→</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-16 text-center">
            <p className="text-xl md:text-2xl font-black tracking-tight text-[#111]">
              You don&apos;t need another 40-page strategy document.<br />
              <span className="text-[#888] font-medium">You need clarity.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-6 bg-[#F5F5F3]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">Pricing.</h2>
            <p className="text-lg text-[#555] font-medium max-w-2xl mx-auto">
              Transparent, flat-rate pricing for 1:1 strategic sessions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white border border-[#e8e8e5] p-10 rounded-[2rem] hover:shadow-lg transition-shadow duration-300 flex flex-col">
              <h3 className="text-xl font-black tracking-tight mb-2">IDEA SESSION</h3>
              <p className="text-sm font-bold text-[#888] uppercase tracking-widest mb-8">60-minute 1:1 session</p>
              <div className="text-4xl font-black tracking-tighter mb-8 flex-1">₹3,999</div>
              <Button href="/services/idea-session" variant="secondary" className="w-full">Explore Idea Session</Button>
            </div>
            
            <div className="bg-[#111] text-white p-10 rounded-[2rem] shadow-xl flex flex-col transform md:-translate-y-4">
              <div className="text-[10px] font-bold px-3 py-1 bg-white/10 text-white rounded-full uppercase tracking-widest w-fit mb-6">Most Popular</div>
              <h3 className="text-xl font-black tracking-tight mb-2">DEEP DIVE</h3>
              <p className="text-sm font-bold text-[#888] uppercase tracking-widest mb-8">90-minute strategy session</p>
              <div className="text-4xl font-black tracking-tighter mb-8 flex-1">₹7,999</div>
              <Button href="/services/strategy-session" variant="secondary" className="w-full border-none">Book Strategy Session</Button>
            </div>

            <div className="bg-white border border-[#e8e8e5] p-10 rounded-[2rem] hover:shadow-lg transition-shadow duration-300 flex flex-col">
              <h3 className="text-xl font-black tracking-tight mb-2">BUSINESS RESET</h3>
              <p className="text-sm font-bold text-[#888] uppercase tracking-widest mb-8">Deep review + 1:1 session</p>
              <div className="text-4xl font-black tracking-tighter mb-8 flex-1">₹12,999</div>
              <Button href="/services/business-reset" variant="secondary" className="w-full">Explore Business Reset</Button>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xl font-black tracking-tight mb-4">Not sure which one you need?</p>
            <Link href="/book" className="text-[#111] font-bold underline-hover inline-flex items-center gap-2">
              Tell me what you're working on <span className="text-xl">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 bg-[#111] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-10 leading-[1.1]">
            You could keep thinking about it.<br />
            <span className="text-[#888]">Or we could think about it together.</span>
          </h2>
          <Button href="/book" variant="secondary" className="px-10 py-5 text-lg mb-8">
            Book a 1:1 Session
          </Button>
          <p className="text-sm font-medium text-[#888]">
            One conversation can change the direction of an idea.
          </p>
        </div>
      </section>
    </>
  );
}
