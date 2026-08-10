'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';

export default function GuidePage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Simulate API call for email capture
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="pt-32 pb-24 px-6 bg-[#111] text-white min-h-screen flex items-center">
      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Copy */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-white rounded-full text-[10px] font-bold tracking-widest uppercase mb-8">
            <span className="text-[#888]">✦</span> Free Digital Resource
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] mb-6">
            Before You Build.
          </h1>
          <p className="text-lg md:text-xl text-[#ccc] font-medium leading-relaxed mb-8 max-w-md">
            A 20-page strategic framework on how to look at your messy business idea and figure out if it actually makes sense.
          </p>
          <ul className="space-y-4 mb-12">
            {[
              'How to find the angle nobody noticed',
              'Why you should charge more than you think',
              'Identifying your unfair advantages',
              'The difference between a product and a business'
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-[#aaa] font-medium text-sm">
                <span className="text-white mt-0.5">→</span> {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Form / Success */}
        <div className="bg-white text-[#111] p-10 md:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden">
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#F5F5F3] rounded-full blur-[60px] pointer-events-none" />
          
          {submitted ? (
            <div className="relative z-10 text-center py-10 animate-fadeInUp">
              <div className="text-5xl mb-6">🎉</div>
              <h3 className="text-3xl font-black tracking-tight mb-4">You're in.</h3>
              <p className="text-[#555] font-medium mb-8">
                Your email is confirmed. You can download the complete strategic framework right here.
              </p>
              <Button href="/thinkform-strategic-framework.pdf" variant="primary" className="w-full mb-4" target="_blank">
                Download the PDF Guide ↓
              </Button>
              <Button onClick={() => setSubmitted(false)} variant="ghost" className="w-full">
                Use a different email
              </Button>
            </div>
          ) : (
            <div className="relative z-10">
              <h3 className="text-2xl font-black tracking-tight mb-2">Get the framework.</h3>
              <p className="text-[#555] text-sm font-medium mb-8">
                Enter your email and I'll send you the PDF immediately. No spam, just strategic thinking.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-[#888] uppercase tracking-widest mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="hello@yourdomain.com"
                    className="w-full px-4 py-4 bg-[#F5F5F3] border border-[#e8e8e5] rounded-xl text-[#111] placeholder:text-[#aaa] text-sm font-medium focus:outline-none focus:border-[#111] transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[#111] text-white text-base font-bold rounded-xl hover:bg-[#333] transition-colors disabled:opacity-60 flex items-center justify-center gap-3 mt-2"
                >
                  {loading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Unlocking...
                    </>
                  ) : 'Unlock the guide →'}
                </button>
              </form>
              <p className="text-center text-[11px] text-[#888] mt-6 font-medium">
                100% free. By downloading, you join the weekly THINKFORM newsletter.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
