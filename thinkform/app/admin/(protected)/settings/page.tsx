'use client';
import { useState, useEffect } from 'react';

interface SettingsState {
  // General
  siteTagline: string;
  contactEmail: string;
  whatsappNumber: string;
  calLink: string;
  // Booking
  bookingOpen: string;
  sessionPrice: string;
  sessionDuration: string;
  maxBookingsPerDay: string;
  // Admin
  adminName: string;
  adminBio: string;
}

const DEFAULTS: SettingsState = {
  siteTagline: 'Creative strategy for founders who are serious about building.',
  contactEmail: '',
  whatsappNumber: '',
  calLink: '',
  bookingOpen: 'true',
  sessionPrice: '4999',
  sessionDuration: '60',
  maxBookingsPerDay: '3',
  adminName: 'Manaant Sawant',
  adminBio: 'Founder & creative strategist at Thinkform.',
};

type Section = 'general' | 'booking' | 'admin';

type SettingsStateProps = {
  label: string;
  value: string;
  onChange: (val: string) => void;
  type?: string;
  placeholder?: string;
  hint?: string;
  rows?: number;
};

const Field = ({ label, value, onChange, type = 'text', placeholder = '', hint = '' }: SettingsStateProps) => (
  <div>
    <label className="block text-xs font-bold text-[#888] uppercase tracking-widest mb-2">{label}</label>
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-3 bg-[#f5f5f3] border border-[#e8e8e5] rounded-xl text-sm font-medium focus:outline-none focus:border-[#111] transition-colors"
    />
    {hint && <p className="text-xs text-[#aaa] mt-1.5">{hint}</p>}
  </div>
);

const TextAreaField = ({ label, value, onChange, rows = 3, placeholder = '', hint = '' }: SettingsStateProps) => (
  <div>
    <label className="block text-xs font-bold text-[#888] uppercase tracking-widest mb-2">{label}</label>
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      rows={rows}
      placeholder={placeholder}
      className="w-full px-4 py-3 bg-[#f5f5f3] border border-[#e8e8e5] rounded-xl text-sm font-medium focus:outline-none focus:border-[#111] transition-colors resize-none"
    />
    {hint && <p className="text-xs text-[#aaa] mt-1.5">{hint}</p>}
  </div>
);

const Toggle = ({ label, value, onChange, hint = '' }: SettingsStateProps) => (
  <div className="flex items-start justify-between gap-4">
    <div>
      <p className="text-sm font-bold text-[#111]">{label}</p>
      {hint && <p className="text-xs text-[#aaa] mt-0.5">{hint}</p>}
    </div>
    <button
      type="button"
      onClick={() => onChange(value === 'true' ? 'false' : 'true')}
      className={`relative shrink-0 w-12 h-6 rounded-full transition-colors ${
        value === 'true' ? 'bg-[#111]' : 'bg-[#e0e0dc]'
      }`}
    >
      <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
        value === 'true' ? 'left-7' : 'left-1'
      }`} />
    </button>
  </div>
);

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SettingsState>(DEFAULTS);
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [saved, setSaved]       = useState(false);
  const [error, setError]       = useState('');
  const [section, setSection]   = useState<Section>('general');

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(r => r.json())
      .then(d => {
        if (d.success && d.settings) {
          setSettings(prev => ({ ...prev, ...d.settings }));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const set = (key: keyof SettingsState, val: string) =>
    setSettings(prev => ({ ...prev, [key]: val }));

  const save = async () => {
    setSaving(true);
    setError('');
    try {
      const res = await fetch('/api/admin/settings', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ settings }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message ?? 'Save failed');
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };



  const tabs: { id: Section; label: string }[] = [
    { id: 'general', label: 'General' },
    { id: 'booking', label: 'Booking' },
    { id: 'admin',   label: 'Profile' },
  ];

  return (
    <div>
      {/* Header */}
      <div className="bg-white border border-[#e8e8e5] rounded-[2rem] p-8 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-[#111] mb-1">Settings</h1>
            <p className="text-sm text-[#888] font-medium">Manage site-wide configuration and preferences.</p>
          </div>
          <div className="flex items-center gap-3">
            {error && <span className="text-xs font-bold text-red-500">{error}</span>}
            {saved && <span className="text-xs font-bold text-green-600 uppercase tracking-widest">✓ Saved</span>}
            <button
              onClick={save}
              disabled={saving || loading}
              className="px-6 py-2.5 bg-[#111] text-white text-sm font-bold rounded-full hover:bg-[#333] transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="bg-white border border-[#e8e8e5] rounded-[2rem] p-12 text-center text-[#888] text-sm font-medium">
          Loading settings…
        </div>
      ) : (
        <div className="bg-white border border-[#e8e8e5] rounded-[2rem] overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-[#e8e8e5] px-6 pt-4">
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => setSection(t.id)}
                className={`px-5 py-2.5 text-sm font-bold rounded-t-xl transition-colors ${
                  section === t.id
                    ? 'bg-[#f5f5f3] text-[#111] border-b-2 border-[#111]'
                    : 'text-[#888] hover:text-[#111]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="p-8 space-y-6">
            {/* General */}
            {section === 'general' && (
              <>
                <Field label="Site Tagline" value={settings.siteTagline} onChange={v => set('siteTagline', v)} placeholder="Your brand one-liner" hint="Shown in hero and meta descriptions." />
                <Field label="Contact Email" value={settings.contactEmail} onChange={v => set('contactEmail', v)} type="email" placeholder="hello@thinkform.in" hint="Used in contact forms and auto-replies." />
                <Field label="WhatsApp Number" value={settings.whatsappNumber} onChange={v => set('whatsappNumber', v)} placeholder="+91 98765 43210" hint="With country code. Used in WhatsApp CTA buttons." />
                <Field label="Cal.com / Calendly Link" value={settings.calLink} onChange={v => set('calLink', v)} placeholder="https://cal.com/yourname" hint="Booking link for the Schedule a Call button." />
              </>
            )}

            {/* Booking */}
            {section === 'booking' && (
              <>
                <Toggle
                  label="Booking Open"
                  value={settings.bookingOpen} onChange={v => set('bookingOpen', v)}
                  hint="When off, the booking form shows a 'Not accepting new clients' message."
                />
                <div className="h-px bg-[#f0f0ee]" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Field label="Session Price (₹)" value={settings.sessionPrice} onChange={v => set('sessionPrice', v)} type="number" placeholder="4999" hint="Shown on pricing page." />
                  <Field label="Duration (mins)" value={settings.sessionDuration} onChange={v => set('sessionDuration', v)} type="number" placeholder="60" hint="Session length displayed to clients." />
                  <Field label="Max / Day" value={settings.maxBookingsPerDay} onChange={v => set('maxBookingsPerDay', v)} type="number" placeholder="3" hint="Max new bookings per calendar day." />
                </div>
              </>
            )}

            {/* Admin Profile */}
            {section === 'admin' && (
              <>
                <Field label="Your Name" value={settings.adminName} onChange={v => set('adminName', v)} placeholder="Manaant Sawant" />
                <TextAreaField
                  label="Short Bio"
                  value={settings.adminBio} onChange={v => set('adminBio', v)}
                  rows={3}
                  placeholder="What you do and who you help."
                  hint="Used on the About page and consultation sections."
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
