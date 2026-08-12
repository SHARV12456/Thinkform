import Link from 'next/link';

export default function Contact() {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <div className="mb-16">
          <Link href="/" className="text-sm font-bold text-[#666] hover:text-[#111] transition-premium mb-8 inline-block">
            ← Back
          </Link>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-tight mb-6">
            Get in touch.
          </h1>
          <p className="text-lg md:text-xl text-[#666] font-medium leading-relaxed">
            Have a question before booking? Want to discuss something custom or suggest an idea?
          </p>
        </div>

        <div className="bg-[#f9f9f7] p-10 border border-[#e8e8e5] rounded-lg mb-16">
          <div className="mb-10">
            <p className="text-xs font-bold text-[#999] uppercase tracking-widest mb-3">Email</p>
            <a 
              href="mailto:hello@thinkform.studio" 
              className="text-2xl font-black text-[#111] hover:text-[#666] transition-premium break-all"
            >
              hello@thinkform.studio
            </a>
          </div>

          <div className="pt-10 border-t border-[#e8e8e5]">
            <p className="text-sm text-[#666] font-medium mb-2">
              I personally read and reply to every message, usually within 24–48 hours.
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-[#666] font-medium mb-8">Ready to book directly instead?</p>
          <Link
            href="/book"
            className="inline-block px-8 py-4 bg-[#111] text-white font-bold rounded-lg hover:bg-[#333] transition-premium"
          >
            Book a Session →
          </Link>
        </div>
      </div>
    </div>
  );
}
