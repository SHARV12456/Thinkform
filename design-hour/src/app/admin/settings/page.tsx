'use client';
import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { usePathname } from 'next/navigation';
import { Save, MessageSquare, Check, ExternalLink } from 'lucide-react';
import { TRACKING_CONFIG, WHATSAPP_CONFIG } from '@/lib/mockData';

const STORAGE_KEY = 'dh_whatsapp_number';

export default function AdminSettings() {
  const path = usePathname();
  const [config, setConfig] = useState(TRACKING_CONFIG);
  const [trackingSaved, setTrackingSaved] = useState(false);

  // WhatsApp state
  const [waNumber, setWaNumber] = useState('');
  const [waInput, setWaInput] = useState('');
  const [waSaved, setWaSaved] = useState(false);
  const [waError, setWaError] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) || WHATSAPP_CONFIG.number;
    // Strip country code 91 prefix for display
    const display = saved.startsWith('91') ? saved.slice(2) : saved;
    setWaNumber(saved);
    setWaInput(display);
  }, []);

  const saveTracking = () => {
    setTrackingSaved(true);
    setTimeout(() => setTrackingSaved(false), 2500);
  };

  const saveWhatsApp = () => {
    setWaError('');
    const digits = waInput.replace(/\D/g, '');
    if (digits.length !== 10) {
      setWaError('Please enter a valid 10-digit Indian mobile number.');
      return;
    }
    const full = `91${digits}`;
    localStorage.setItem(STORAGE_KEY, full);
    setWaNumber(full);
    setWaSaved(true);
    setTimeout(() => setWaSaved(false), 2500);
  };

  const resetToDefault = () => {
    localStorage.removeItem(STORAGE_KEY);
    const display = WHATSAPP_CONFIG.number.startsWith('91')
      ? WHATSAPP_CONFIG.number.slice(2)
      : WHATSAPP_CONFIG.number;
    setWaInput(display);
    setWaNumber(WHATSAPP_CONFIG.number);
    setWaError('');
  };

  const field = (label: string, key: keyof typeof config) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', marginBottom: '1rem' }}>
      <label className="label">{label}</label>
      <input
        className="input"
        value={config[key]}
        onChange={e => setConfig({ ...config, [key]: e.target.value })}
        style={{ fontFamily: 'monospace', fontSize: '0.8125rem' }}
      />
    </div>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-off-white)' }}>
      <AdminSidebar activePath={path} />
      <div className="admin-main" style={{ flex: 1 }}>
        <div style={{ padding: '1.5rem 2rem', background: 'var(--color-white)', borderBottom: '1px solid var(--color-light-grey)' }}>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Settings</h1>
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-grey)', marginTop: '0.2rem' }}>Manage contact details, tracking pixels and integration IDs.</p>
        </div>
        <div style={{ padding: '2rem', maxWidth: 640 }}>

          {/* ── WhatsApp Settings ── */}
          <div style={{ background: 'var(--color-white)', border: '1px solid var(--color-light-grey)', padding: '2rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--color-light-grey)' }}>
              <MessageSquare size={18} />
              <h2 style={{ fontSize: '1rem', fontWeight: 700 }}>WhatsApp Number</h2>
            </div>

            <p style={{ fontSize: '0.8125rem', color: 'var(--color-charcoal-light)', marginBottom: '1.25rem', lineHeight: '1.6' }}>
              This number is used for all WhatsApp CTAs on the site — the booking flow, admin message buttons, the floating chat bubble, and billing messages.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
              <label className="label" htmlFor="wa-input">Mobile Number</label>
              <div style={{ display: 'flex', gap: '0', border: '1px solid var(--color-light-grey)', overflow: 'hidden' }}>
                <span style={{ background: 'var(--color-off-white)', padding: '0 1rem', display: 'flex', alignItems: 'center', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-charcoal)', borderRight: '1px solid var(--color-light-grey)', flexShrink: 0 }}>
                  +91
                </span>
                <input
                  id="wa-input"
                  type="tel"
                  maxLength={10}
                  value={waInput}
                  onChange={e => { setWaInput(e.target.value.replace(/\D/g, '')); setWaError(''); }}
                  placeholder="7400162509"
                  style={{ flex: 1, border: 'none', padding: '0.75rem 1rem', fontSize: '1rem', fontFamily: 'monospace', fontWeight: 600, letterSpacing: '0.05em', outline: 'none' }}
                />
              </div>
              {waError && <p style={{ fontSize: '0.8125rem', color: '#dc2626' }}>{waError}</p>}
            </div>

            {/* Preview */}
            <div style={{ background: 'var(--color-off-white)', padding: '0.875rem 1rem', border: '1px solid var(--color-light-grey)', marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: '0.6875rem', color: 'var(--color-grey)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>Active Number</p>
                <p style={{ fontSize: '0.9375rem', fontWeight: 700, fontFamily: 'monospace' }}>+{waNumber}</p>
              </div>
              <a
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '0.75rem', color: '#25d366', display: 'flex', alignItems: 'center', gap: '0.25rem', textDecoration: 'none', fontWeight: 600 }}
              >
                <ExternalLink size={13} /> Test on WhatsApp
              </a>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                className="btn btn-primary"
                onClick={saveWhatsApp}
                style={{ padding: '0.75rem 1.5rem', fontSize: '0.8125rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                {waSaved ? <><Check size={14} /> Saved!</> : <><Save size={14} /> Save Number</>}
              </button>
              <button
                className="btn btn-ghost"
                onClick={resetToDefault}
                style={{ padding: '0.75rem 1rem', fontSize: '0.8125rem' }}
              >
                Reset to Default
              </button>
            </div>
            {waSaved && (
              <p style={{ fontSize: '0.8125rem', color: '#16a34a', marginTop: '0.75rem' }}>
                ✓ Number updated. All WhatsApp CTAs will now use +91 {waInput}.
              </p>
            )}
          </div>

          {/* ── Analytics ── */}
          <div style={{ background: 'var(--color-white)', border: '1px solid var(--color-light-grey)', padding: '2rem', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--color-light-grey)' }}>Analytics & Tracking</h2>
            {field('Meta Pixel ID', 'META_PIXEL_ID')}
            {field('Google Analytics ID', 'GOOGLE_ANALYTICS_ID')}
            {field('Google Ads Conversion ID', 'GOOGLE_ADS_CONVERSION_ID')}
          </div>

          <div style={{ background: 'var(--color-white)', border: '1px solid var(--color-light-grey)', padding: '2rem', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--color-light-grey)' }}>Google Ads Conversion Labels</h2>
            {field('Booking Started Label', 'GOOGLE_ADS_LABEL_BOOKING_STARTED')}
            {field('Booking Completed Label', 'GOOGLE_ADS_LABEL_BOOKING_COMPLETED')}
            {field('Payment Initiated Label', 'GOOGLE_ADS_LABEL_PAYMENT_INITIATED')}
            {field('Payment Completed Label', 'GOOGLE_ADS_LABEL_PAYMENT_COMPLETED')}
          </div>

          <button className="btn btn-primary" onClick={saveTracking} style={{ padding: '0.875rem 2rem', fontSize: '0.8125rem' }}>
            <Save size={14} /> {trackingSaved ? 'Saved!' : 'Save Tracking Config'}
          </button>
          {trackingSaved && <p style={{ fontSize: '0.8125rem', color: '#16a34a', marginTop: '0.75rem' }}>✓ Tracking config saved (mock)</p>}
        </div>
      </div>
    </div>
  );
}
