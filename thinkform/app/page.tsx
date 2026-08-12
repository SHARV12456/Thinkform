import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-48 pb-24 md:pt-64 md:pb-40 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[1.1] mb-10 text-[#111]">
            You have an idea.<br />
            Let&apos;s see what it could become.
          </h1>
          <p className="text-2xl md:text-3xl text-[#555] font-medium leading-relaxed max-w-2xl mb-14">
            A 1:1 creative business consultation based in Mumbai (and worldwide online) for people who want a sharper idea, a better direction, or simply someone to challenge the way they&apos;re thinking.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-10">
            <Button href="/book" variant="primary" className="w-full sm:w-auto px-10 py-5 text-lg font-bold shadow-lg shadow-black/10 hover:shadow-black/20">Apply for a Session</Button>
            <Button href="/how-it-works" variant="ghost" className="w-full sm:w-auto px-10 py-5 text-lg border-none hover:bg-transparent hover:text-[#555] hover:underline">See How It Works</Button>
          </div>
          <p className="text-base font-bold text-red-600 tracking-wide uppercase mb-14 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span> Strictly limited to 4 new clients per month.
          </p>
          <div className="flex items-start gap-6 p-8 bg-[#fff] border border-[#e8e8e5] rounded-2xl max-w-md shadow-sm">
            <div className="text-3xl mt-1 text-[#888]">✍️</div>
            <p className="text-base font-medium text-[#555] leading-relaxed italic">
              No templates.<br />
              No generic advice.<br />
              Just your idea, and a fresh perspective.
            </p>
          </div>
        </div>
      </section>

      {/* What I Actually Help With */}
      <section className="py-32 px-6 bg-white border-y border-[#e8e8e5]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20 max-w-2xl">
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-8">Bring me the messy version.</h2>
            <p className="text-xl md:text-2xl text-[#555] font-medium leading-relaxed">
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
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-20 text-center max-w-3xl mx-auto">
            This isn&apos;t consulting by spreadsheet.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            <div className="bg-white p-12 md:p-20 rounded-[2rem] border border-[#e8e8e5]">
              <h3 className="text-sm font-bold text-[#888] uppercase tracking-widest mb-10">Most consulting</h3>
              <ul className="space-y-8">
                {['Frameworks', 'Generic recommendations', 'Reports', 'Meetings', 'Templates'].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-[#555] font-medium text-xl">
                    <span className="text-[#ccc]">×</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#111] p-12 md:p-20 rounded-[2rem] text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none" />
              <h3 className="text-sm font-bold text-[#888] uppercase tracking-widest mb-10">This</h3>
              <ul className="space-y-8">
                {['Think together', 'Challenge assumptions', 'Generate ideas', 'Explore possibilities', 'Find the angle nobody noticed', 'Leave with a clear next move'].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 font-semibold text-xl">
                    <span className="text-[#888] mt-1">→</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-20 text-center">
            <p className="text-2xl md:text-3xl font-black tracking-tight text-[#111]">
              You don&apos;t need another 40-page strategy document.<br />
              <span className="text-[#888] font-medium">You need clarity.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="py-32 px-6 bg-[#111] text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-20 text-center max-w-3xl mx-auto leading-[1.1]">
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
              <div key={i} className="p-10 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex gap-1 mb-8">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-yellow-500 text-xl">★</span>
                  ))}
                </div>
                <p className="text-[#ccc] font-medium leading-relaxed mb-10 italic text-lg">
                  \"{testimonial.quote}\"
                </p>
                <div>
                  <div className="font-bold text-white tracking-tight text-lg">{testimonial.name}</div>
                  <div className="text-base font-medium text-[#888] uppercase tracking-widest mt-2">{testimonial.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-32 px-6 bg-[#F5F5F3]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">Pricing.</h2>
            <p className="text-xl md:text-2xl text-[#555] font-medium max-w-2xl mx-auto mb-6">
              Transparent, flat-rate pricing in INR for startups and founders in Mumbai and across India.
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-100 text-yellow-800 rounded-full text-base font-bold">
              <span>⚠️</span> Currently reviewing applications for next month.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="bg-white border border-[#e8e8e5] p-12 rounded-[2rem] hover:shadow-lg transition-shadow duration-300 flex flex-col">
              <h3 className="text-2xl font-black tracking-tight mb-4">IDEA SESSION</h3>
              <p className="text-base font-bold text-[#888] uppercase tracking-widest mb-10">60-minute 1:1 session</p>
              <div className="text-5xl font-black tracking-tighter mb-10 flex-1">₹3,999</div>
              <Button href="/services/idea-session" variant="secondary" className="w-full px-6 py-4 text-lg font-bold">Apply for Idea Session</Button>
            </div>
            
            <div className="bg-[#111] text-white p-12 rounded-[2rem] shadow-xl flex flex-col transform md:-translate-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-[40px] -mr-16 -mt-16 pointer-events-none" />
              <div className="text-[11px] font-bold px-4 py-2 bg-white/20 text-white rounded-full uppercase tracking-widest w-fit mb-8 shadow-sm border border-white/10">Highest ROI</div>
              <h3 className="text-2xl font-black tracking-tight mb-4">DEEP DIVE</h3>
              <p className="text-base font-bold text-[#888] uppercase tracking-widest mb-10">90-minute strategy session</p>
              <div className="text-5xl font-black tracking-tighter mb-10 flex-1">₹7,999</div>
              <Button href="/services/strategy-session" variant="secondary" className="w-full px-6 py-4 text-lg font-bold border-none bg-white text-black hover:bg-[#e8e8e5]">Apply for Strategy Session</Button>
            </div>

            <div className="bg-white border border-[#e8e8e5] p-12 rounded-[2rem] hover:shadow-lg transition-shadow duration-300 flex flex-col">
              <h3 className="text-2xl font-black tracking-tight mb-4">BUSINESS RESET</h3>
              <p className="text-base font-bold text-[#888] uppercase tracking-widest mb-10">Deep review + 1:1 session</p>
              <div className="text-5xl font-black tracking-tighter mb-10 flex-1">₹12,999</div>
              <Button href="/services/business-reset" variant="secondary" className="w-full px-6 py-4 text-lg font-bold">Apply for Business Reset</Button>
            </div>
          </div>

          <div className="text-center">
            <p className="text-2xl font-black tracking-tight mb-6">Not sure which one you need?</p>
            <Link href="/book" className="text-[#111] font-bold underline-hover inline-flex items-center gap-2 text-lg">
              Tell me what you're working on <span className="text-2xl">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 px-6 bg-[#111] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-12 leading-[1.1]">
            Every month you wait is another month of <span className="text-red-500">lost opportunity.</span>
          </h2>
          <Button href="/book" variant="secondary" className="px-12 py-6 text-xl mb-10 font-black uppercase tracking-widest">
            Submit Application
          </Button>
          <p className="text-base font-medium text-[#888]">
            I only work with founders who are ready to make serious changes.
          </p>
        </div>
      </section>
    </>
  );
}
