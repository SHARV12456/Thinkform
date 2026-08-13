import { BookingForm } from '@/components/ui/BookingForm';
import { Suspense } from 'react';
import Link from 'next/link';

export default function Book({ searchParams }: { searchParams?: { session?: string } }) {
  const sessions = [
    { id: 'quick-think', title: 'Quick Think', price: '₹3,999', duration: '60 min' },
    { id: 'deep-dive', title: 'Deep Dive', price: '₹7,999', duration: '90 min' },
    { id: 'strategy-sprint', title: 'Strategy Sprint', price: '₹12,999', duration: 'Assessment + session' }
  ];

  const sessionParam = (searchParams && searchParams.session) || '';

  return (
    <div className="pt-24 pb-24 px-6 bg-[#F5F3EE] min-h-screen">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <Link href="/" className="text-sm font-bold text-[#666] hover:text-[#111] transition-premium mb-8 inline-block">
            ← Back
          </Link>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
            Let's think through it.
          </h1>
          <p className="text-lg md:text-xl text-[#666] font-medium leading-relaxed max-w-2xl">
            Choose your session, tell us what you're working on, and let's get you booked.
          </p>
        </div>

        {/* Session Selection */}
        <div className="mb-16">
          <h2 className="text-xl font-bold mb-6 text-[#111]">Step 1: Choose your session</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sessions.map(session => (
              <Link key={session.id} href={`/book?session=${session.id}`} className={`block p-8 border rounded-lg bg-white hover:border-[var(--accent)] transition-premium ${sessionParam === session.id ? 'border-[var(--accent)] scale-[1.02]' : 'border-[#e8e3da]'}`}>
                <p className="text-xs font-bold uppercase tracking-widest text-[#9a9186] mb-4">{session.duration}</p>
                <h3 className="text-lg font-black mb-2">{session.title}</h3>
                <p className="text-3xl font-black text-[#171717] mb-4">{session.price}</p>
                <ul className="text-sm text-[#756f68] space-y-1">
                  {session.id === 'quick-think' && (<><li>• One focused issue</li><li>• Actionable next step</li></>) }
                  {session.id === 'deep-dive' && (<><li>• Deep diagnostic conversation</li><li>• Prioritised next steps</li><li>• Follow-up notes</li></>) }
                  {session.id === 'strategy-sprint' && (<><li>• Roadmap & priorities</li><li>• Templates & frameworks</li></>) }
                </ul>
              </Link>
            ))}
          </div>
        </div>

        {/* Booking Form */}
        <div className="mb-16">
          <h2 className="text-xl font-bold mb-6 text-[#111]">Step 2: Tell us what you're thinking about</h2>
          <div className="bg-white border border-[#e8e8e5] rounded-lg p-6 md:p-8">
            <Suspense fallback={
              <div className="space-y-4">
                <div className="h-6 bg-[#e8e8e5] rounded-md animate-pulse w-3/5" />
                <div className="h-44 bg-[#e8e8e5] rounded-md animate-pulse" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="h-12 bg-[#e8e8e5] rounded-md animate-pulse" />
                  <div className="h-12 bg-[#e8e8e5] rounded-md animate-pulse" />
                </div>
                <div className="h-12 bg-[#e8e8e5] rounded-md animate-pulse w-full" />
              </div>
            }>
              <BookingForm />
            </Suspense>
          </div>
        </div>

        {/* Process Info */}
        <div className="p-8 bg-white border border-[#e8e8e5] rounded-lg">
          <h3 className="text-lg font-bold mb-6 text-[#111]">What happens next</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="font-bold text-[#999] shrink-0">03</div>
              <div>
                <p className="font-bold text-[#111] mb-1">Choose your time</p>
                <p className="text-sm text-[#666]">Pick an available slot</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="font-bold text-[#999] shrink-0">04</div>
              <div>
                <p className="font-bold text-[#111] mb-1">Complete payment</p>
                <p className="text-sm text-[#666]">Secure payment via UPI or card</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="font-bold text-[#999] shrink-0">05</div>
              <div>
                <p className="font-bold text-[#111] mb-1">Join the session</p>
                <p className="text-sm text-[#666]">Private 1:1 call at scheduled time</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
