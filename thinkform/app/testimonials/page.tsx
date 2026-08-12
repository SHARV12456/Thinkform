'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function Testimonials() {
  const testimonials = [
    {
      quote: "I had been thinking about this for months. In 90 minutes, we solved it.",
      author: "Founder",
      role: "Decided on business direction",
      session: "Deep Dive"
    },
    {
      quote: "The clarity I left with was worth ten times the price.",
      author: "Creator",
      role: "Found her next move",
      session: "Strategy Sprint"
    },
    {
      quote: "Someone who could challenge my thinking without a hidden agenda.",
      author: "CEO",
      role: "Navigated a critical decision",
      session: "Deep Dive"
    },
    {
      quote: "I thought I knew what I wanted. Turns out, I was overthinking it. This made everything clear.",
      author: "Business Owner",
      role: "Simplified business model",
      session: "Quick Think"
    },
    {
      quote: "Real thinking. Not generic advice. This is exactly what I needed.",
      author: "Product Manager",
      role: "Charted new strategy",
      session: "Deep Dive"
    },
    {
      quote: "Walking in, I was confused. Walking out, I had a plan.",
      author: "Consultant",
      role: "Pivoted her offer",
      session: "Strategy Sprint"
    }
  ];

  return (
    <div className="pt-32 pb-24 px-6 md:px-8 bg-[#f7f4ee] min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <Link href="/" className="inline-block text-sm font-bold text-[#b66a4a] hover:text-[#171717] transition-all mb-8">
            ← Back to ThinkForm
          </Link>
          <h1 className="text-6xl md:text-7xl font-black tracking-tight leading-tight mb-6">
            What people say
          </h1>
          <p className="text-lg md:text-xl text-[#756f68] font-medium max-w-2xl">
            Real words from real people who've worked through important decisions with ThinkForm.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mb-20">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="p-8 md:p-10 bg-white border border-[#e8e3da] rounded-lg hover:border-[#9a9186] transition-all">
              <p className="text-lg md:text-xl font-bold text-[#171717] mb-6 italic leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="border-t border-[#e8e3da] pt-6">
                <p className="text-sm font-bold text-[#b66a4a] mb-1">{testimonial.author}</p>
                <p className="text-xs text-[#9a9186] font-medium">{testimonial.role}</p>
                <p className="text-xs text-[#9a9186] font-medium mt-2">{testimonial.session}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center py-16 border-t border-[#e8e3da]">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-8">
            Ready to add your story?
          </h2>
          <Button href="/book" variant="primary" className="text-lg">
            Book your session
          </Button>
        </div>
      </div>
    </div>
  );
}
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-16 text-balance">
            Why people book more than once
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Ongoing clarity',
                desc: 'New decisions emerge. Return when the next important question arrives.'
              },
              {
                title: 'Building momentum',
                desc: 'First session clarified one thing. Second session explores the next layer.'
              },
              {
                title: 'Trusted thinking partner',
                desc: 'Growing relationship. Faster clarity because context is already built.'
              }
            ].map((item, i) => (
              <div key={i} className="p-8 md:p-10 bg-[#f9f9f7] border border-[#e8e8e5] rounded-lg">
                <h3 className="text-2xl font-bold text-[#111] mb-4">{item.title}</h3>
                <p className="text-base text-[#666] font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-24 md:py-40 px-6 md:px-8 bg-[#111]">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-tight mb-8 text-balance">
            Experience it yourself.
          </h2>
          <p className="text-xl md:text-2xl text-[#ccc] font-medium mb-12 leading-relaxed max-w-3xl mx-auto text-balance">
            Book a session and see what clarity feels like.
          </p>
          <Button href="/book" variant="primary" className="inline-flex text-lg md:text-xl">Book a Session</Button>

          <div className="mt-16 pt-12 border-t border-white/10">
            <p className="text-base text-[#999] font-medium">
              First session starting at <span className="text-[#C8FF3D]">₹3,999</span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
