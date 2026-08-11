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
            A 1:1 creative business consultation based in Mumbai (and worldwide online) for people who want a sharper idea, a better direction, or simply someone to challenge the way they&apos;re thinking.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
            <Button href="/book" variant="primary" className="w-full sm:w-auto px-8 py-4 text-base relative group overflow-hidden">
              <span className="relative z-10 font-bold">Book a 1:1 Session</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Button>
            <Button href="/how-it-works" variant="ghost" className="w-full sm:w-auto px-8 py-4 text-base border-none hover:bg-transparent hover:text-[#555] hover:underline">See How It Works</Button>
          </div>
          <div className="flex items-center gap-2 mb-12">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-bold text-[#555] uppercase tracking-widest">Only 4 Strategy Slots Left This Month</span>
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

      {/* Social Proof / Testimonials */}
      <section className="py-24 px-6 bg-[#111] text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-16 text-center max-w-3xl mx-auto leading-[1.1]">
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
              <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-yellow-500 text-lg">★</span>
                  ))}
                </div>
                <p className="text-[#ccc] font-medium leading-relaxed mb-8 italic">
                  "{testimonial.quote}"
                </p>
                <div>
                  <div className="font-bold text-white tracking-tight">{testimonial.name}</div>
                  <div className="text-sm font-medium text-[#888] uppercase tracking-widest mt-1">{testimonial.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-6 bg-[#F5F5F3]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 relative">
            <div className="inline-block px-4 py-1.5 bg-red-100 text-red-700 text-xs font-bold uppercase tracking-widest rounded-full mb-6">
              Pricing Increases Next Month
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">Pricing.</h2>
            <p className="text-lg text-[#555] font-medium max-w-2xl mx-auto">
              Transparent, flat-rate pricing in INR for startups and founders in Mumbai and across India.
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

          <div className="text-center mb-24">
            <p className="text-xl font-black tracking-tight mb-4">Not sure which one you need?</p>
            <Link href="/book" className="text-[#111] font-bold underline-hover inline-flex items-center gap-2">
              Tell me what you're working on <span className="text-xl">→</span>
            </Link>
          </div>

          {/* Guarantee / Risk Reversal */}
          <div className="bg-white border-2 border-[#111] rounded-[2rem] p-10 md:p-16 max-w-4xl mx-auto text-center relative shadow-[8px_8px_0px_0px_rgba(17,17,17,1)]">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#111] text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest">
              The 100% ROI Guarantee
            </div>
            <h3 className="text-3xl font-black tracking-tight mb-6 mt-4">Zero Risk. Absolute Clarity.</h3>
            <p className="text-lg text-[#555] font-medium leading-relaxed max-w-2xl mx-auto mb-8">
              I am not interested in taking your money if I cannot help you. If, at the end of our session, you feel you haven't received at least 10x the value in strategic clarity or actionable next steps, tell me on the call. <strong>I will refund your payment immediately, no questions asked.</strong>
            </p>
            <p className="text-sm font-bold text-[#111] uppercase tracking-widest">You have literally nothing to lose but a bad idea.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 bg-white border-b border-[#e8e8e5]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-16 text-center">Questions?</h2>
          <div className="space-y-8">
            {[
              { q: 'What if I don\'t have a business yet?', a: 'Perfect. That is the best time to book an Idea Session. We will validate your concept before you spend 6 months building the wrong thing.' },
              { q: 'Is this just another generic course or coaching program?', a: 'Absolutely not. There are no pre-recorded videos or templates. This is a highly aggressive, 1-on-1 strategic teardown of your specific business.' },
              { q: 'Do you work with non-tech businesses?', a: 'Yes. Some of our most successful turnarounds have been service agencies, D2C brands, and traditional B2B service providers.' },
              { q: 'How fast can I get a session?', a: 'Because of high demand in Mumbai, spots usually book out 2 weeks in advance. If you see a slot on the calendar, grab it immediately.' }
            ].map((faq, i) => (
              <div key={i} className="pb-8 border-b border-[#e8e8e5] last:border-0">
                <h3 className="text-xl font-bold tracking-tight mb-4 text-[#111]">{faq.q}</h3>
                <p className="text-[#555] font-medium leading-relaxed">{faq.a}</p>
              </div>
            ))}
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
