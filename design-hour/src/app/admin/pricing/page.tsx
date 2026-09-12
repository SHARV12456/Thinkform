'use client';
import { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { usePathname } from 'next/navigation';
import { Save } from 'lucide-react';

const INITIAL = { price30: 1999, price60: 3999, price90: 5999, priceCommercial: 7500, discount: '', promo: '' };

export default function AdminPricing() {
  const path = usePathname();
  const [prices, setPrices] = useState(INITIAL);
  const [saved, setSaved] = useState(false);

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const field = (label: string, key: keyof typeof prices, prefix = '₹', type = 'number') => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
      <label className="label">{label}</label>
      <div style={{ position: 'relative' }}>
        {prefix && <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: '0.875rem', color: 'var(--color-charcoal-light)' }}>{prefix}</span>}
        <input type={type} className="input" value={prices[key]} onChange={e => setPrices({ ...prices, [key]: type === 'number' ? Number(e.target.value) : e.target.value })} style={{ paddingLeft: prefix ? '1.75rem' : '1rem' }} />
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-off-white)' }}>
      <AdminSidebar activePath={path} />
      <div className="admin-main" style={{ flex: 1 }}>
        <div style={{ padding: '1.5rem 2rem', background: 'var(--color-white)', borderBottom: '1px solid var(--color-light-grey)' }}>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Pricing</h1>
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-grey)', marginTop: '0.2rem' }}>Manage consultation prices. Changes update the public pricing page. (Mock — not persisted)</p>
        </div>
        <div style={{ padding: '2rem', maxWidth: 640 }}>
          <div style={{ background: 'var(--color-white)', border: '1px solid var(--color-light-grey)', padding: '2rem', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--color-light-grey)' }}>Consultation Prices</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {field('30-Minute Consultation', 'price30')}
              {field('60-Minute Consultation (TAAS)', 'price60')}
              {field('90-Minute Consultation (Deep Dive)', 'price90')}
              {field('Commercial Consultation (Starting)', 'priceCommercial')}
            </div>
          </div>
          <div style={{ background: 'var(--color-white)', border: '1px solid var(--color-light-grey)', padding: '2rem', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--color-light-grey)' }}>Promotions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {field('Discount Display (e.g. "20% off for first booking")', 'discount', '')}
              {field('Promotional Offer Copy', 'promo', '')}
            </div>
          </div>
          <div style={{ background: 'var(--color-off-white)', border: '1px solid var(--color-light-grey)', padding: '1.25rem', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '0.5rem' }}>Live Price Preview</h3>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', fontSize: '0.875rem' }}>
              {[['Quick', prices.price30], ['TAAS', prices.price60], ['Deep Dive', prices.price90], ['Commercial From', prices.priceCommercial]].map(([l, v]) => (
                <div key={l as string}><span style={{ color: 'var(--color-grey)' }}>{l}: </span><strong>₹{Number(v).toLocaleString('en-IN')}</strong></div>
              ))}
            </div>
          </div>
          <button className="btn btn-primary" onClick={save} style={{ padding: '0.875rem 2rem', fontSize: '0.8125rem' }}>
            <Save size={14} /> {saved ? 'Saved!' : 'Save Changes'}
          </button>
          {saved && <p style={{ fontSize: '0.8125rem', color: '#16a34a', marginTop: '0.75rem' }}>✓ Changes saved (mock — no backend connected)</p>}
        </div>
      </div>
    </div>
  );
}
