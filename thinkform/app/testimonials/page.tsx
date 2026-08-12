'use client';

import { Button } from '@/components/ui/Button';

export default function Testimonials() {
  return (
    <>
      {/* ============ HEADER ============ */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm font-bold uppercase tracking-widest text-[#999] mb-8">Testimonials</p>
          <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-tight mb-8 text-balance">
            What people say about ThinkForm.
          </h1>
          <p className="text-lg md:text-2xl text-[#666] font-medium max-w-3xl">
            Real feedback from people who've used ThinkForm for clarity, direction, and confidence.
          </p>
        </div>
      </section>

      {/* ============ TESTIMONIAL GRID ============ */}
      <section className="py-20 md:py-32 px-6 md:px-8 bg-[#f9f9f7]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Testimonial 1 */}
            <div className="p-10 md:p-12 bg-white border border-[#e8e8e5] rounded-lg">
              <p className="text-base md:text-lg text-[#333] font-medium leading-relaxed mb-8 italic">
                "Placeholder — Replace with verified client feedback."
              </p>
              <div className="pt-8 border-t border-[#e8e8e5]">
                <p className="font-bold text-[#111]">Client Name</p>
                <p className="text-sm text-[#999] font-medium">Founder / Business Owner</p>
                <p className="text-xs text-[#999] font-semibold uppercase tracking-widest mt-3">Deep Dive Session</p>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="p-10 md:p-12 bg-white border border-[#e8e8e5] rounded-lg">
              <p className="text-base md:text-lg text-[#333] font-medium leading-relaxed mb-8 italic">
                "Placeholder — Replace with verified client feedback."
              </p>
              <div className="pt-8 border-t border-[#e8e8e5]">
                <p className="font-bold text-[#111]">Client Name</p>
                <p className="text-sm text-[#999] font-medium">Creator / Business Runner</p>
                <p className="text-xs text-[#999] font-semibold uppercase tracking-widest mt-3">Quick Think Session</p>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="p-10 md:p-12 bg-white border border-[#e8e8e5] rounded-lg">
              <p className="text-base md:text-lg text-[#333] font-medium leading-relaxed mb-8 italic">
                "Placeholder — Replace with verified client feedback."
              </p>
              <div className="pt-8 border-t border-[#e8e8e5]">
                <p className="font-bold text-[#111]">Client Name</p>
                <p className="text-sm text-[#999] font-medium">Professional / Team Lead</p>
                <p className="text-xs text-[#999] font-semibold uppercase tracking-widest mt-3">Strategy Sprint</p>
              </div>
            </div>

            {/* Testimonial 4 */}
            <div className="p-10 md:p-12 bg-white border border-[#e8e8e5] rounded-lg">
              <p className="text-base md:text-lg text-[#333] font-medium leading-relaxed mb-8 italic">
                "Placeholder — Replace with verified client feedback."
              </p>
              <div className="pt-8 border-t border-[#e8e8e5]">
                <p className="font-bold text-[#111]">Client Name</p>
                <p className="text-sm text-[#999] font-medium">Founder / Operator</p>
                <p className="text-xs text-[#999] font-semibold uppercase tracking-widest mt-3">Multiple Sessions</p>
              </div>
            </div>

            {/* Testimonial 5 */}
            <div className="p-10 md:p-12 bg-white border border-[#e8e8e5] rounded-lg">
              <p className="text-base md:text-lg text-[#333] font-medium leading-relaxed mb-8 italic">
                "Placeholder — Replace with verified client feedback."
              </p>
              <div className="pt-8 border-t border-[#e8e8e5]">
                <p className="font-bold text-[#111]">Client Name</p>
                <p className="text-sm text-[#999] font-medium">Business Owner / Strategist</p>
                <p className="text-xs text-[#999] font-semibold uppercase tracking-widest mt-3">Deep Dive Session</p>
              </div>
            </div>

            {/* Testimonial 6 */}
            <div className="p-10 md:p-12 bg-white border border-[#e8e8e5] rounded-lg">
              <p className="text-base md:text-lg text-[#333] font-medium leading-relaxed mb-8 italic">
                "Placeholder — Replace with verified client feedback."
              </p>
              <div className="pt-8 border-t border-[#e8e8e5]">
                <p className="font-bold text-[#111]">Client Name</p>
                <p className="text-sm text-[#999] font-medium">Creative Founder / Leader</p>
                <p className="text-xs text-[#999] font-semibold uppercase tracking-widest mt-3">Strategy Sprint</p>
              </div>
            </div>
          </div>

          <div className="mt-16 p-10 md:p-12 bg-[#fff9e6] border border-[#ffe8a8] rounded-lg">
            <p className="text-sm text-[#8b7600] font-semibold">
              ⚠️ Placeholder Content
            </p>
            <p className="text-base text-[#8b7600] font-medium mt-2">
              These testimonials are placeholders. They will be replaced with verified client feedback once real testimonials are collected and verified. Do not represent these as real client testimonials.
            </p>
          </div>
        </div>
      </section>

      {/* ============ WHY PEOPLE RETURN ============ */}
      <section className="py-20 md:py-32 px-6 md:px-8">
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
