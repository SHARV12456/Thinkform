'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';

const SESSION_TYPES = ['Idea Session', 'Business Brainstorm', 'Business Reset', '1:1 Strategy Session', 'Not sure yet'];
const TIME_SLOTS = ['Morning (9am – 12pm)', 'Afternoon (1pm – 5pm)', 'Evening (6pm – 9pm)'];

interface ValidationError {
  field: string;
  message: string;
}

export function BookingForm() {
  const searchParams = useSearchParams();
  const planQuery = searchParams.get('plan');
  
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    working_on: '', challenge: '', figure_out: '',
    website: '', session_type: '', preferred_date: '', preferred_time: '',
  });

  useEffect(() => {
    if (planQuery) {
      // Try to find a matching session type
      const matched = SESSION_TYPES.find(t => t.toLowerCase().includes(planQuery.toLowerCase()));
      if (matched) {
        setForm(p => ({ ...p, session_type: matched }));
      }
    }
  }, [planQuery]);

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setValidationErrors({});

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors && Array.isArray(data.errors)) {
          const errors: Record<string, string> = {};
          data.errors.forEach((err: ValidationError) => {
            errors[err.field] = err.message;
          });
          setValidationErrors(errors);
        }
        setError(data.message || 'Failed to submit request. Please try again.');
        setLoading(false);
        return;
      }

      setSubmitted(true);
      setLoading(false);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Network error. Please check your connection and try again.');
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-20 max-w-md mx-auto animate-fadeInUp">
        <div className="text-6xl mb-6">✦</div>
        <h2 className="text-4xl font-black tracking-tighter text-[#111] mb-4">Got it.</h2>
        <p className="text-[#555] leading-relaxed text-lg mb-8">
          Your request is in. I&apos;ll review what you&apos;re working on and get back to you within 24 hours with the next step.
        </p>
        <Button href="/" variant="primary">Back to Home</Button>
      </div>
    );
  }

  const inputBase = "w-full px-4 py-3.5 bg-white border border-[#e0e0dc] rounded-xl text-[#111] placeholder:text-[#aaa] text-sm font-medium focus:outline-none focus:border-[#111] transition-colors";
  const inputError = "w-full px-4 py-3.5 bg-white border border-red-300 rounded-xl text-[#111] placeholder:text-[#aaa] text-sm font-medium focus:outline-none focus:border-red-500 transition-colors";
  const label = "block text-xs font-bold text-[#888] uppercase tracking-widest mb-2";

  return (
    <form onSubmit={submit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={label}>Name *</label>
          <input 
            name="name" 
            required 
            value={form.name} 
            onChange={handle} 
            placeholder="Your full name" 
            className={validationErrors.name ? inputError : inputBase}
          />
          {validationErrors.name && (
            <p className="text-red-500 text-xs mt-1 font-medium">{validationErrors.name}</p>
          )}
        </div>
        <div>
          <label className={label}>Email *</label>
          <input 
            name="email" 
            type="email" 
            required 
            value={form.email} 
            onChange={handle} 
            placeholder="hello@yourname.com" 
            className={validationErrors.email ? inputError : inputBase}
          />
          {validationErrors.email && (
            <p className="text-red-500 text-xs mt-1 font-medium">{validationErrors.email}</p>
          )}
        </div>
      </div>

      <div>
        <label className={label}>Phone</label>
        <input 
          name="phone" 
          value={form.phone} 
          onChange={handle} 
          placeholder="+91 00000 00000" 
          className={validationErrors.phone ? inputError : inputBase}
        />
        {validationErrors.phone && (
          <p className="text-red-500 text-xs mt-1 font-medium">{validationErrors.phone}</p>
        )}
      </div>

      <div>
        <label className={label}>What are you working on? *</label>
        <textarea 
          name="working_on" 
          required 
          value={form.working_on} 
          onChange={handle} 
          rows={3} 
          placeholder="Describe the idea, business, or situation. Messy is fine." 
          className={validationErrors.working_on ? inputError + ' resize-none' : inputBase + ' resize-none'}
        />
        {validationErrors.working_on && (
          <p className="text-red-500 text-xs mt-1 font-medium">{validationErrors.working_on}</p>
        )}
      </div>

      <div>
        <label className={label}>What is your biggest challenge?</label>
        <textarea 
          name="challenge" 
          value={form.challenge} 
          onChange={handle} 
          rows={3} 
          placeholder="What is the thing you can't figure out on your own?" 
          className={validationErrors.challenge ? inputError + ' resize-none' : inputBase + ' resize-none'}
        />
        {validationErrors.challenge && (
          <p className="text-red-500 text-xs mt-1 font-medium">{validationErrors.challenge}</p>
        )}
      </div>

      <div>
        <label className={label}>What would you like to figure out?</label>
        <textarea 
          name="figure_out" 
          value={form.figure_out} 
          onChange={handle} 
          rows={2} 
          placeholder="What would make this session a success for you?" 
          className={validationErrors.figure_out ? inputError + ' resize-none' : inputBase + ' resize-none'}
        />
        {validationErrors.figure_out && (
          <p className="text-red-500 text-xs mt-1 font-medium">{validationErrors.figure_out}</p>
        )}
      </div>

      <div className="border-t border-[#e8e8e5] pt-6">
        <p className="text-xs font-bold text-[#888] uppercase tracking-widest mb-4">Optional Details</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={label}>Website / LinkedIn / Instagram</label>
            <input 
              name="website" 
              value={form.website} 
              onChange={handle} 
              placeholder="Link to your work" 
              className={validationErrors.website ? inputError : inputBase}
            />
            {validationErrors.website && (
              <p className="text-red-500 text-xs mt-1 font-medium">{validationErrors.website}</p>
            )}
          </div>
          <div>
            <label className={label}>Session Type</label>
            <select name="session_type" value={form.session_type} onChange={handle} className={inputBase}>
              <option value="">Select session type</option>
              {SESSION_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className={label}>Preferred Date</label>
            <input 
              type="date" 
              name="preferred_date" 
              value={form.preferred_date} 
              onChange={handle} 
              className={validationErrors.preferred_date ? inputError : inputBase}
            />
            {validationErrors.preferred_date && (
              <p className="text-red-500 text-xs mt-1 font-medium">{validationErrors.preferred_date}</p>
            )}
          </div>
          <div>
            <label className={label}>Preferred Time</label>
            <select name="preferred_time" value={form.preferred_time} onChange={handle} className={inputBase}>
              <option value="">Select a time window</option>
              {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-[#111] text-white text-base font-bold rounded-full hover:bg-[#333] transition-colors disabled:opacity-60 flex items-center justify-center gap-3"
        >
          {loading ? (
            <>
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Sending...
            </>
          ) : 'Request My Session →'}
        </button>
        <p className="text-center text-xs text-[#aaa] mt-4">
          No payment required now. I&apos;ll confirm details after reviewing your request.
        </p>
      </div>
    </form>
  );
}
