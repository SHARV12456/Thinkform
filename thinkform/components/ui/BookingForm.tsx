'use client';
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { trackEvent } from '@/components/Analytics';

// ─── Plan Data ───────────────────────────────────────────────────────────────
const PLANS: Record<string, {
  title: string;
  price: string;
  duration: string;
  forWho: string;
  includes: string[];
}> = {
  'Idea Session': {
    title: 'IDEA SESSION',
    price: '₹3,999',
    duration: '60-minute 1:1 session',
    forWho: 'For people who have an idea but don\'t know whether it is worth pursuing.',
    includes: [
      'Idea exploration',
      'Business model thinking',
      'Opportunity identification',
      'Target customer thinking',
      'Differentiation',
      'Monetization possibilities',
      'Next-step recommendation',
    ],
  },
  'Business Brainstorm': {
    title: 'BUSINESS BRAINSTORM',
    price: '₹5,999',
    duration: '60-minute 1:1 session',
    forWho: 'For people who want fresh business opportunities.',
    includes: [
      'Multiple business directions',
      'Creative concepts',
      'Market opportunities',
      'Revenue possibilities',
      'Strength-based ideas',
      'Concept comparison',
    ],
  },
  'Business Reset': {
    title: 'BUSINESS RESET',
    price: '₹12,999',
    duration: 'Deep business review + 1:1 session',
    forWho: 'For existing businesses that feel stuck.',
    includes: [
      'Current business analysis',
      'Offer evaluation',
      'Positioning',
      'Customer perspective',
      'New revenue opportunities',
      'Creative growth directions',
    ],
  },
  '1:1 Strategy Session': {
    title: '1:1 STRATEGY SESSION',
    price: '₹7,999',
    duration: '90-minute strategy session',
    forWho: 'A deeper private conversation around a specific business challenge.',
    includes: [
      'Deep dive into a specific problem',
      'Strategic problem solving',
      'Custom frameworks',
      'Direct feedback',
      'Action plan',
    ],
  },
};

const SESSION_TYPES = ['Idea Session', 'Business Brainstorm', 'Business Reset', '1:1 Strategy Session'];
const TIME_SLOTS = ['Morning (9am – 12pm)', 'Afternoon (1pm – 5pm)', 'Evening (6pm – 9pm)'];

interface ValidationError { field: string; message: string; }
type Step = 'form' | 'payment' | 'success';

// ─── Component ───────────────────────────────────────────────────────────────
export function BookingForm() {
  const searchParams = useSearchParams();
  const planQuery = searchParams.get('plan') || searchParams.get('session');

  const [step, setStep] = useState<Step>('form');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Payment proof
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [proofPreview, setProofPreview] = useState<string | null>(null);
  const [proofUrl, setProofUrl] = useState<string | null>(null);
  const [uploadingProof, setUploadingProof] = useState(false);
  const proofInputRef = useRef<HTMLInputElement>(null);
  const [qrExists, setQrExists] = useState(false);
  const [qrUrl, setQrUrl] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    working_on: '', challenge: '', figure_out: '',
    website: '', session_type: '', preferred_date: '', preferred_time: '',
  });

  // Derive plan info from selected session type
  const selectedPlan = PLANS[form.session_type] || null;
  const displayPrice = selectedPlan?.price || null;

  useEffect(() => {
    if (planQuery) {
      const matched = SESSION_TYPES.find(t => t.toLowerCase().replace(/\s+/g, '-').includes(planQuery.toLowerCase()) || t.toLowerCase().includes(planQuery.toLowerCase()));
      if (matched) setForm(p => ({ ...p, session_type: matched }));
    }
    fetch('/api/check-qr')
      .then(res => res.json())
      .then(data => {
        setQrExists(data.exists);
        if (data.url) {
          setQrUrl(data.url);
        }
      })
      .catch(() => setQrExists(false));
  }, [planQuery]);

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  // ─── Step 1 → 2 ───────────────────────────────────────────────────────────
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setValidationErrors({});
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    if (!form.working_on.trim() || form.working_on.trim().length < 10)
      errs.working_on = 'Please provide more details (at least 10 characters)';
    if (Object.keys(errs).length > 0) { setValidationErrors(errs); return; }
    
    trackEvent('booking_form_completed', { session_type: form.session_type });
    trackEvent('payment_started', { session_type: form.session_type, value: displayPrice });
    
    setStep('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ─── Proof upload ─────────────────────────────────────────────────────────
  const handleProofChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProofFile(file);
    setProofPreview(URL.createObjectURL(file));
    setUploadingProof(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append('proof', file);
      const res = await fetch('/api/upload-payment-proof', { method: 'POST', body: fd });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setProofUrl(data.url);
    } catch (err: any) {
      setError(err.message || 'Upload failed. Please try again.');
      setProofFile(null); setProofPreview(null);
    } finally {
      setUploadingProof(false);
    }
  };

  // ─── Step 2 → submit ──────────────────────────────────────────────────────
  const handlePaymentSubmit = async (payLater: boolean = false) => {
    if (!payLater && !proofUrl) { setError('Please upload your payment screenshot before confirming.'); return; }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          paymentProofUrl: payLater ? null : proofUrl,
          paymentAmount: displayPrice || 'Not specified',
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.errors) {
          const errors: Record<string, string> = {};
          data.errors.forEach((err: ValidationError) => { errors[err.field] = err.message; });
          setValidationErrors(errors);
          setStep('form');
        }
        setError(data.message || 'Failed to submit. Please try again.');
        return;
      }
      
      trackEvent('booking_completed', { session_type: form.session_type, value: displayPrice });
      setStep('success');
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // ─── Shared styles ────────────────────────────────────────────────────────
  const inputBase = 'w-full px-4 py-3.5 bg-white border border-[#e0e0dc] rounded-xl text-[#111] placeholder:text-[#aaa] text-sm font-medium focus:outline-none focus:border-[#111] transition-colors';
  const inputErr  = 'w-full px-4 py-3.5 bg-white border border-red-300 rounded-xl text-[#111] placeholder:text-[#aaa] text-sm font-medium focus:outline-none focus:border-red-500 transition-colors';
  const lbl       = 'block text-xs font-bold text-[#888] uppercase tracking-widest mb-2';

  // ═════════════════════════════════════════════════════════════════════════
  // SUCCESS
  // ═════════════════════════════════════════════════════════════════════════
  if (step === 'success') {
    return (
      <div className="text-center py-16 max-w-md mx-auto animate-fadeInUp">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-black tracking-tighter text-[#111] mb-3">Booking Confirmed!</h2>
        {selectedPlan && (
          <p className="text-xs font-bold text-[#888] uppercase tracking-widest mb-3">
            {selectedPlan.title} · {selectedPlan.price}
          </p>
        )}
        <p className="text-[#555] leading-relaxed text-base mb-2">
          {proofUrl 
            ? "Your payment screenshot has been received. I'll verify it and get back to you within 24 hours to schedule your session."
            : "Your request has been received. I'll review your details and send you an alternative payment link to confirm your session."}
        </p>
        <p className="text-[#888] text-sm mb-8">Check your inbox — a confirmation is on its way.</p>
        <Button href="/" variant="primary">Back to Home</Button>
      </div>
    );
  }

  // ═════════════════════════════════════════════════════════════════════════
  // PAYMENT STEP
  // ═════════════════════════════════════════════════════════════════════════
  if (step === 'payment') {
    return (
      <div className="animate-fadeInUp">
        {/* Back */}
        <button
          onClick={() => { setStep('form'); setError(null); }}
          className="text-xs font-bold text-[#888] hover:text-[#111] transition-colors mb-6 flex items-center gap-1"
        >
          ← Back to form
        </button>

        {/* Plan card */}
        {selectedPlan ? (
          <div className="bg-[#111] text-white rounded-2xl p-6 mb-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-1">{selectedPlan.duration}</p>
                <h2 className="text-xl font-black tracking-tight">{selectedPlan.title}</h2>
                <p className="text-sm text-white/70 mt-1 leading-relaxed">{selectedPlan.forWho}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-3xl font-black tracking-tighter">{selectedPlan.price}</p>
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1">Session Fee</p>
              </div>
            </div>
            <div className="border-t border-white/10 pt-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-3">What's included</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {selectedPlan.includes.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-white/40 mt-0.5">→</span> {inc}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-sm">
              <span className="text-white/60 font-medium">Booking for</span>
              <span className="font-bold">{form.name}</span>
            </div>
          </div>
        ) : (
          /* No session type selected — push back to form */
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6 flex items-start gap-4">
            <span className="text-2xl">⚠️</span>
            <div>
              <p className="font-bold text-amber-800 text-sm mb-1">No session selected</p>
              <p className="text-amber-700 text-sm leading-relaxed">Please go back and choose which session you'd like to book so we can show you the right payment amount.</p>
              <button
                onClick={() => setStep('form')}
                className="mt-3 text-xs font-bold text-amber-800 underline underline-offset-2 hover:text-amber-900 transition-colors"
              >
                ← Go back and select a session
              </button>
            </div>
          </div>
        )}

        {/* Trust strip */}
        <div className="mb-4 p-3 rounded-md bg-white border border-[#e8e3da] flex items-center justify-between text-xs text-[#666]">
          <div className="flex items-center gap-3">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-[#666]"><path d="M12 17a2 2 0 100-4 2 2 0 000 4z" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M17 11V9a5 5 0 00-10 0v2" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span>🔒 Secure payment · Reschedule up to 24h before</span>
          </div>
          <div className="font-medium">1,200+ sessions completed</div>
        </div>

        {/* QR Code */}
        <div className="border-2 border-dashed border-[#e0e0dc] rounded-2xl p-6 mb-6 text-center">
          {qrExists && qrUrl ? (
            <>
              <p className="text-xs font-bold text-[#888] uppercase tracking-widest mb-4">Scan to Pay via UPI</p>
              <img
                src={qrUrl}
                alt="Payment QR Code"
                className="w-52 h-52 object-contain mx-auto rounded-xl shadow-sm mb-3"
              />
              {displayPrice && (
                <p className="text-lg font-black text-[#111] mb-1">Pay {displayPrice}</p>
              )}
              <p className="text-xs text-[#888] font-medium">Use any UPI app — GPay, PhonePe, Paytm, etc.</p>
            </>
          ) : (
            <div className="py-8">
              <div className="w-16 h-16 bg-[#e8e8e5] rounded-2xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-[#aaa]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <p className="text-sm font-bold text-[#888]">QR code not uploaded yet</p>
              <p className="text-xs text-[#aaa] mt-1">Admin: upload your QR from the dashboard</p>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-6">
          <p className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-2">How to pay</p>
          <ol className="text-sm text-blue-800 font-medium space-y-1">
            <li>1. Open your UPI app (GPay, PhonePe, Paytm, etc.)</li>
            <li>2. Scan the QR code above</li>
            <li>3. Pay <strong>{displayPrice || 'the session fee'}</strong></li>
            <li>4. Take a screenshot of the success screen</li>
            <li>5. Upload it below to confirm your booking</li>
          </ol>
        </div>

        {/* Screenshot upload */}
        <div className="mb-6">
          <p className={lbl}>Upload Payment Screenshot *</p>
          <input type="file" ref={proofInputRef} accept="image/*" onChange={handleProofChange} className="hidden" />

          {proofPreview ? (
            <div>
              <img src={proofPreview} alt="Payment proof" className="w-full max-h-56 object-contain rounded-xl border border-[#e0e0dc] bg-[#f9f9f7]" />
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {uploadingProof ? (
                    <><span className="w-4 h-4 border-2 border-[#111]/20 border-t-[#111] rounded-full animate-spin inline-block" /><span className="text-xs text-[#888] font-medium">Uploading...</span></>
                  ) : proofUrl ? (
                    <><svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg><span className="text-xs text-green-700 font-bold">Screenshot uploaded ✓</span></>
                  ) : null}
                </div>
                <button onClick={() => { setProofFile(null); setProofPreview(null); setProofUrl(null); }} className="text-xs text-red-500 font-bold hover:text-red-700">Remove / Replace</button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => proofInputRef.current?.click()}
              className="w-full py-10 border-2 border-dashed border-[#e0e0dc] rounded-xl text-center hover:border-[#111] hover:bg-[#f9f9f7] transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#e8e8e5] group-hover:bg-[#111] flex items-center justify-center mx-auto mb-2 transition-colors">
                <svg className="w-5 h-5 text-[#888] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-sm font-bold text-[#555] group-hover:text-[#111]">Click to upload screenshot</p>
              <p className="text-xs text-[#aaa] mt-1">PNG, JPG up to 5MB</p>
            </button>
          )}
        </div>

        {error && <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium mb-4">{error}</div>}

        <button
          onClick={() => handlePaymentSubmit(false)}
          disabled={submitting || uploadingProof || !proofUrl}
          className="w-full py-4 bg-[#111] text-white text-base font-bold rounded-full hover:bg-[#333] transition-colors disabled:opacity-50 flex items-center justify-center gap-3"
        >
          {submitting ? (
            <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Confirming Booking...</>
          ) : !proofUrl ? 'Upload Screenshot to Confirm →' : `Confirm Booking${displayPrice ? ` · ${displayPrice}` : ''} →`}
        </button>
        
        <div className="mt-4 flex flex-col items-center gap-3">
          <p className="text-center text-xs text-[#aaa]">Your payment will be verified within 24 hours.</p>
          
          <button 
            type="button" 
            onClick={() => handlePaymentSubmit(true)}
            disabled={submitting || uploadingProof}
            className="text-xs font-bold text-[#888] hover:text-[#111] transition-colors underline underline-offset-2"
          >
            UPI failing? Submit without payment for now
          </button>
        </div>
      </div>
    );
  }

  // ═════════════════════════════════════════════════════════════════════════
  // FORM STEP
  // ═════════════════════════════════════════════════════════════════════════
  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      {error && <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium">{error}</div>}

      {/* Name + Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={lbl}>Name *</label>
          <input name="name" required value={form.name} onChange={handle} placeholder="Your full name" className={validationErrors.name ? inputErr : inputBase} />
          {validationErrors.name && <p className="text-red-500 text-xs mt-1 font-medium">{validationErrors.name}</p>}
        </div>
        <div>
          <label className={lbl}>Email *</label>
          <input name="email" type="email" required value={form.email} onChange={handle} placeholder="hello@yourname.com" className={validationErrors.email ? inputErr : inputBase} />
          {validationErrors.email && <p className="text-red-500 text-xs mt-1 font-medium">{validationErrors.email}</p>}
        </div>
      </div>

      {/* Phone */}
      <div>
        <label className={lbl}>Phone</label>
        <input name="phone" value={form.phone} onChange={handle} placeholder="+91 00000 00000" className={inputBase} />
      </div>

      {/* Session type — shown first so price populates early */}
      <div>
        <label className={lbl}>Session Type</label>
        <select name="session_type" value={form.session_type} onChange={handle} className={inputBase}>
          <option value="">Select a session</option>
          {SESSION_TYPES.map(t => (
            <option key={t} value={t}>
              {t}{PLANS[t] ? ` — ${PLANS[t].price}` : ''}
            </option>
          ))}
        </select>
        {/* Show selected plan mini-summary inline */}
        {selectedPlan && (
          <div className="mt-3 bg-[#F5F5F3] rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#888] uppercase tracking-widest">{selectedPlan.duration}</span>
              <span className="text-lg font-black text-[#111]">{selectedPlan.price}</span>
            </div>
            <p className="text-sm text-[#555] font-medium leading-relaxed mb-3">{selectedPlan.forWho}</p>
            <ul className="space-y-1">
              {selectedPlan.includes.map((inc, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-[#666] font-medium">
                  <span className="text-[#aaa]">→</span> {inc}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* What are you working on */}
      <div>
        <label className={lbl}>What are you working on? *</label>
        <textarea name="working_on" required value={form.working_on} onChange={handle} rows={3}
          placeholder="Describe the idea, business, or situation. Messy is fine."
          className={(validationErrors.working_on ? inputErr : inputBase) + ' resize-none'} />
        {validationErrors.working_on && <p className="text-red-500 text-xs mt-1 font-medium">{validationErrors.working_on}</p>}
      </div>

      {/* Challenge */}
      <div>
        <label className={lbl}>What is your biggest challenge?</label>
        <textarea name="challenge" value={form.challenge} onChange={handle} rows={3}
          placeholder="What is the thing you can't figure out on your own?"
          className={inputBase + ' resize-none'} />
      </div>

      {/* Figure out */}
      <div>
        <label className={lbl}>What would you like to figure out?</label>
        <textarea name="figure_out" value={form.figure_out} onChange={handle} rows={2}
          placeholder="What would make this session a success for you?"
          className={inputBase + ' resize-none'} />
      </div>

      {/* Optional: date + time + website */}
      <div className="border-t border-[#e8e8e5] pt-6">
        <p className="text-xs font-bold text-[#888] uppercase tracking-widest mb-4">Optional Details</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={lbl}>Website / LinkedIn / Instagram</label>
            <input name="website" value={form.website} onChange={handle} placeholder="Link to your work" className={inputBase} />
          </div>
          <div>
            <label className={lbl}>Preferred Date</label>
            <input type="date" name="preferred_date" value={form.preferred_date} onChange={handle} className={inputBase} />
          </div>
          <div className="md:col-span-2">
            <label className={lbl}>Preferred Time</label>
            <select name="preferred_time" value={form.preferred_time} onChange={handle} className={inputBase}>
              <option value="">Select a time window</option>
              {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-[#111] text-white text-base font-bold rounded-full hover:bg-[#333] transition-colors disabled:opacity-60 flex items-center justify-center gap-3"
        >
          {loading
            ? <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Processing...</>
            : `Continue to Payment${displayPrice ? ` · ${displayPrice}` : ''} →`}
        </button>
        <p className="text-center text-xs text-[#aaa] mt-4">
          {displayPrice
            ? `Session fee: ${displayPrice} · Pay via UPI QR in the next step`
            : 'Select a session type above to see pricing'}
        </p>
      </div>
    </form>
  );
}
