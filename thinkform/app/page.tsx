import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-32 md:pt-48 md:pb-40 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] mb-8 md:mb-12 text-[#111]">
            You have an idea.<br />
            Let&apos;s see what it could become.
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-[#666] font-medium leading-relaxed max-w-3xl mb-10 md:mb-14">
            A 1:1 creative business consultation based in Mumbai (and worldwide online) for people who want a sharper idea, a better direction, or simply someone to challenge the way they&apos;re thinking.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12">
            <Button href="/book" variant="primary" className="px-8 md:px-10 py-3 md:py-4 text-base md:text-lg">
              Book a Session
            </Button>
            <Link href="/how-it-works" className="text-base md:text-lg font-medium text-[#666] hover:text-[#111] underline-hover transition-premium">
              See How It Works
            </Link>
          </div>
          <div className="flex items-center gap-3 text-sm md:text-base font-medium text-[#666]">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
            Strictly limited to 4 new clients per month
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-[#f0f0f0] mx-6"></div>

      {/* What I Actually Help With */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 md:mb-24 max-w-3xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6">Bring me the messy version.</h2>
            <p className="text-lg md:text-xl text-[#666] font-medium leading-relaxed">
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
              <div 
                key={i} 
                className="p-8 md:p-10 bg-[#fafafa] border border-[#f0f0f0] rounded-lg group hover:border-[#111] hover:bg-[#111] hover:text-white transition-premium duration-300"
              >
                <h3 className="text-lg md:text-xl font-semibold tracking-tight mb-4 group-hover:text-white transition-colors">
                  "{card.t}"
                </h3>
                <p className="text-[#666] group-hover:text-[#ccc] font-medium leading-relaxed text-sm md:text-base transition-colors">
                  {card.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-[#f0f0f0] mx-6"></div>

      {/* The Difference */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-16 md:mb-24 text-center max-w-4xl mx-auto leading-[1.2]">
            This isn&apos;t consulting by spreadsheet.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            <div className="p-10 md:p-14 bg-[#fafafa] border border-[#f0f0f0] rounded-lg">
              <h3 className="text-xs font-bold text-[#999] uppercase tracking-widest mb-10">Most consulting</h3>
              <ul className="space-y-6 md:space-y-8">
                {['Frameworks', 'Generic recommendations', 'Reports', 'Meetings', 'Templates'].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-[#666] font-medium text-base md:text-lg">
                    <span className="text-[#ddd] text-xl">×</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-10 md:p-14 bg-[#111] text-white rounded-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/8 rounded-full blur-[100px] -mr-40 -mt-40 pointer-events-none" />
              <h3 className="text-xs font-bold text-[#666] uppercase tracking-widest mb-10 relative z-10">This</h3>
              <ul className="space-y-6 md:space-y-8 relative z-10">
                {['Think together', 'Challenge assumptions', 'Generate ideas', 'Explore possibilities', 'Find the angle nobody noticed', 'Leave with a clear next move'].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 font-medium text-base md:text-lg">
                    <span className="text-[#666]">→</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-16 md:mt-24 text-center">
            <p className="text-xl md:text-2xl lg:text-3xl font-black tracking-tight text-[#111]">
              You don&apos;t need another 40-page strategy document.<br />
              <span className="text-[#999] font-medium">You need clarity.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-[#f0f0f0] mx-6"></div>

      {/* Social Proof / Testimonials */}
      <section className="py-24 md:py-32 px-6 bg-[#111] text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-16 md:mb-24 text-center max-w-4xl mx-auto leading-[1.2]">
            "One session completely changed how I was looking at my business."
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "I was stuck for months on how to position my tech product. In 60 minutes, we tore it down and found an angle I hadn't even considered. Absolutely worth the investment.",
                name: "Rahul M.",
                title: "SaaS Founder, Mumbai"
              },
              {
                quote: "No fluff, no generic frameworks. Just highly critical, sharp feedback that forced me to rethink my entire revenue model. Exactly what I needed.",
                name: "Sneha P.",
                title: "E-Commerce Entrepreneur"
              },
              {
                quote: "The Deep Dive session gave me more clarity than the 3-month consulting contract I previously paid for. The cinematic report was the cherry on top.",
                name: "Vikram S.",
                title: "Agency Owner"
              }
            ].map((testimonial, i) => (
              <div key={i} className="p-8 md:p-10 rounded-lg bg-white/5 border border-white/10 hover:bg-white/8 transition-premium">
                <p className="text-[#ddd] font-medium leading-relaxed mb-8 italic text-base md:text-lg">
                  "{testimonial.quote}"
                </p>
                <div className="pt-6 border-t border-white/10">
                  <div className="font-semibold text-white text-base">{testimonial.name}</div>
                  <div className="text-xs font-medium text-[#999] uppercase tracking-widest mt-2">{testimonial.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-[#f0f0f0] mx-6"></div>

      {/* Pricing */}
      <section className="py-24 md:py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6">Pricing.</h2>
            <p className="text-base md:text-lg text-[#666] font-medium max-w-2xl mx-auto mb-8">
              Transparent, flat-rate pricing in INR for startups and founders in Mumbai and across India.
            </p>
            <div className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-amber-50 text-amber-800 rounded-full text-sm md:text-base font-medium border border-amber-200">
              <span>⚠️</span> Currently reviewing applications for next month
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-24">
            <div className="bg-white border border-[#f0f0f0] p-10 md:p-12 rounded-lg hover:border-[#111] transition-premium flex flex-col">
              <h3 className="text-xl md:text-2xl font-black tracking-tight mb-3">IDEA SESSION</h3>
              <p className="text-xs font-bold text-[#999] uppercase tracking-widest mb-10">60-minute 1:1</p>
              <div className="text-4xl md:text-5xl font-black tracking-tighter text-[#111] mb-12 flex-1">₹3,999</div>
              <Button href="/services/idea-session" variant="primary" className="w-full px-6 py-3 text-base">
                Explore
              </Button>
            </div>
            
            <div className="bg-[#111] text-white p-10 md:p-12 rounded-lg flex flex-col transform md:-translate-y-6 relative overflow-hidden border border-white/10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none" />
              <div className="text-[10px] font-bold px-3 py-1.5 bg-white/15 text-white rounded-full uppercase tracking-widest w-fit mb-8 border border-white/20 relative z-10">
                Recommended
              </div>
              <h3 className="text-xl md:text-2xl font-black tracking-tight mb-3 relative z-10">DEEP DIVE</h3>
              <p className="text-xs font-bold text-[#999] uppercase tracking-widest mb-10 relative z-10">90-minute strategy</p>
              <div className="text-4xl md:text-5xl font-black tracking-tighter mb-12 flex-1 relative z-10">₹7,999</div>
              <Button href="/services/strategy-session" variant="secondary" className="w-full px-6 py-3 text-base text-black relative z-10">
                Explore
              </Button>
            </div>

            <div className="bg-white border border-[#f0f0f0] p-10 md:p-12 rounded-lg hover:border-[#111] transition-premium flex flex-col">
              <h3 className="text-xl md:text-2xl font-black tracking-tight mb-3">BUSINESS RESET</h3>
              <p className="text-xs font-bold text-[#999] uppercase tracking-widest mb-10">Full assessment + 1:1</p>
              <div className="text-4xl md:text-5xl font-black tracking-tighter text-[#111] mb-12 flex-1">₹12,999</div>
              <Button href="/services/business-reset" variant="primary" className="w-full px-6 py-3 text-base">
                Explore
              </Button>
            </div>
          </div>

          <div className="text-center">
            <p className="text-lg md:text-xl font-bold tracking-tight mb-6">Not sure which one you need?</p>
            <Link href="/book" className="inline-flex items-center gap-2 text-[#111] font-semibold underline-hover transition-premium text-base md:text-lg">
              Tell me what you&apos;re working on <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-[#f0f0f0] mx-6"></div>

      {/* Final CTA */}
      <section className="py-32 md:py-40 px-6 bg-[#111] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-10 md:mb-14 leading-[1.1]">
            Every month you wait is another month of <span className="text-red-500">lost opportunity.</span>
          </h2>
          <Button href="/book" variant="secondary" className="px-10 md:px-12 py-4 md:py-5 text-base md:text-lg font-bold mb-10 md:mb-12">
            Submit Application
          </Button>
          <p className="text-sm md:text-base font-medium text-[#999]">
            Only for founders ready to make serious changes.
          </p>
        </div>
      </section>
    </>
  );
}
