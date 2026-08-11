import { BookingForm } from '@/components/ui/BookingForm';
import { Suspense } from 'react';

export default function Book() {
  return (
    <div className="pt-32 pb-24 px-6 bg-[#F5F5F3] min-h-screen">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-16">
        
        {/* Left Side: Context */}
        <div className="flex-1 md:sticky top-32 self-start">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[1.1]">
            Let&apos;s talk about the idea.
          </h1>
          <p className="text-lg text-[#555] font-medium leading-relaxed mb-10 max-w-sm">
            Fill out the request below. Don't worry about making it sound perfectly polished. Messy is good. It gives us a place to start.
          </p>
          
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-[#111] text-white flex items-center justify-center font-bold text-sm shrink-0">1</div>
              <div>
                <h4 className="font-bold text-[#111] mb-1">Fill Your Request</h4>
                <p className="text-sm text-[#555] font-medium leading-relaxed">Tell me what you're working on and what you need help figuring out.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-[#111] text-white flex items-center justify-center font-bold text-sm shrink-0">2</div>
              <div>
                <h4 className="font-bold text-[#111] mb-1">Pay via UPI QR</h4>
                <p className="text-sm text-[#555] font-medium leading-relaxed">Scan the QR code, pay the session fee, and upload your payment screenshot to confirm.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-[#111] text-white flex items-center justify-center font-bold text-sm shrink-0">3</div>
              <div>
                <h4 className="font-bold text-[#111] mb-1">The Session</h4>
                <p className="text-sm text-[#555] font-medium leading-relaxed">Once payment is verified, we schedule and get on the call to break down your idea.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex-[1.2] bg-white p-8 md:p-12 rounded-[2rem] border border-[#e8e8e5] shadow-sm">
          <Suspense fallback={<div className="h-96 flex items-center justify-center text-[#888]">Loading...</div>}>
            <BookingForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
