'use client';
import { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { usePathname } from 'next/navigation';
import { Save } from 'lucide-react';

const INITIAL = { heroTitle: 'Have a Design Problem? Book an Expert for One Hour.', heroSub: 'Get professional design advice for your home, rental, office or commercial space — without hiring an interior designer for the entire project.', cta: 'BOOK MY CONSULTATION' };

export default function AdminLanding() {
  const path = usePathname();
  const [copy, setCopy] = useState(INITIAL);
  const [saved, setSaved] = useState(false);

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const field = (label: string, key: keyof typeof copy, isTextarea = false) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', marginBottom: '1rem' }}>
      <label className="label">{label}</label>
      {isTextarea ? (
        <textarea className="input" rows={3} value={copy[key]} onChange={e => setCopy({ ...copy, [key]: e.target.value })} />
      ) : (
        <input className="input" value={copy[key]} onChange={e => setCopy({ ...copy, [key]: e.target.value })} />
      )}
    </div>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-off-white)' }}>
      <AdminSidebar activePath={path} />
      <div className="admin-main" style={{ flex: 1 }}>
        <div style={{ padding: '1.5rem 2rem', background: 'var(--color-white)', borderBottom: '1px solid var(--color-light-grey)' }}>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Landing Page Copy</h1>
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-grey)', marginTop: '0.2rem' }}>Manage copy for the dedicated Ads Landing Page. (Mock — not persisted)</p>
        </div>
        <div style={{ padding: '2rem', maxWidth: 640 }}>
          <div style={{ background: 'var(--color-white)', border: '1px solid var(--color-light-grey)', padding: '2rem', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--color-light-grey)' }}>Hero Section</h2>
            {field('Hero Headline', 'heroTitle')}
            {field('Hero Subheading', 'heroSub', true)}
            {field('Call to Action Button', 'cta')}
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
