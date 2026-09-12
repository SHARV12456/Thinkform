'use client';
import { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { usePathname } from 'next/navigation';
import { Save, Globe, Image as ImageIcon } from 'lucide-react';

const MOCK_PAGES = [
  { id: 'home', name: 'Home Page', path: '/', title: 'Design Hour | Professional Interior Design Consultation in Mumbai', desc: 'Book a professional interior designer by the hour in Mumbai. Get expert advice for residential and commercial spaces.' },
  { id: 'pricing', name: 'Pricing', path: '/pricing', title: 'Consultation Pricing | Design Hour', desc: 'Transparent hourly pricing for interior design consultations. No hidden fees.' },
  { id: 'commercial', name: 'Commercial Spaces', path: '/commercial', title: 'Commercial Interior Design Consultation | Design Hour', desc: 'Expert design advice for offices, retail, cafes, and restaurants. Book a commercial consultation today.' },
  { id: 'how-it-works', name: 'How It Works', path: '/how-it-works', title: 'How It Works | Design Hour', desc: 'Learn how our hourly interior design consultation service works step by step.' },
  { id: 'faq', name: 'FAQ', path: '/faq', title: 'Frequently Asked Questions | Design Hour', desc: 'Got questions? Read our FAQs about booking, payments, and what to expect during your consultation.' },
  { id: 'contact', name: 'Contact', path: '/contact', title: 'Contact Us | Design Hour', desc: 'Get in touch with our design team.' },
  { id: 'loc-mumbai', name: 'Mumbai Location', path: '/locations/mumbai', title: 'Interior Design Consultation in Mumbai | Design Hour', desc: 'Top-rated interior design consultation services across Mumbai.' },
  { id: 'loc-bandra', name: 'Bandra Location', path: '/locations/bandra', title: 'Interior Designer in Bandra | Design Hour', desc: 'Book an hourly interior design consultation in Bandra, Mumbai.' },
  { id: 'srv-residential', name: 'Residential Service', path: '/residential-design-consultation', title: 'Residential Interior Design Consultation | Design Hour', desc: 'Transform your home with expert hourly interior design advice.' },
  { id: 'srv-kitchen', name: 'Modular Kitchen', path: '/modular-kitchen-consultation', title: 'Modular Kitchen Design Consultation | Design Hour', desc: 'Get expert advice on modular kitchen layouts, materials, and finishes.' },
];

export default function AdminSEO() {
  const path = usePathname();
  const [pages, setPages] = useState(MOCK_PAGES);
  const [selected, setSelected] = useState(MOCK_PAGES[0]);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setPages(pages.map(p => p.id === selected.id ? selected : p));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-off-white)' }}>
      <AdminSidebar activePath={path} />
      <div className="admin-main" style={{ flex: 1 }}>
        <div style={{ padding: '1.5rem 2rem', background: 'var(--color-white)', borderBottom: '1px solid var(--color-light-grey)' }}>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700 }}>SEO Management</h1>
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-grey)', marginTop: '0.2rem' }}>Manage meta titles, descriptions, and indexing rules.</p>
        </div>
        
        <div style={{ display: 'flex', padding: '2rem', gap: '2rem', alignItems: 'flex-start' }}>
          
          <div style={{ width: 280, background: 'var(--color-white)', border: '1px solid var(--color-light-grey)' }}>
            <div style={{ padding: '1rem', borderBottom: '1px solid var(--color-light-grey)', background: 'var(--color-off-white)', fontWeight: 600, fontSize: '0.875rem' }}>
              Pages
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {pages.map(p => (
                <button
                  key={p.id}
                  onClick={() => setSelected(p)}
                  style={{
                    padding: '1rem', textAlign: 'left', background: selected.id === p.id ? 'var(--color-off-white)' : 'transparent',
                    border: 'none', borderBottom: '1px solid var(--color-light-grey)', cursor: 'pointer',
                    borderLeft: selected.id === p.id ? '2px solid var(--color-near-black)' : '2px solid transparent'
                  }}
                >
                  <p style={{ fontSize: '0.875rem', fontWeight: selected.id === p.id ? 700 : 500, color: 'var(--color-near-black)' }}>{p.name}</p>
                  <p style={{ fontSize: '0.6875rem', color: 'var(--color-grey)', marginTop: '0.25rem', fontFamily: 'monospace' }}>{p.path}</p>
                </button>
              ))}
            </div>
          </div>

          <div style={{ flex: 1, background: 'var(--color-white)', border: '1px solid var(--color-light-grey)', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-light-grey)' }}>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Editing: {selected.name}</h2>
              <a href={selected.path} target="_blank" style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'var(--color-grey)', textDecoration: 'none' }}><Globe size={14} /> View Live</a>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: 600 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <label className="label">Meta Title</label>
                  <span style={{ fontSize: '0.6875rem', color: selected.title.length > 60 ? '#ef4444' : 'var(--color-grey)' }}>{selected.title.length} / 60</span>
                </div>
                <input className="input" value={selected.title} onChange={e => setSelected({...selected, title: e.target.value})} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <label className="label">Meta Description</label>
                  <span style={{ fontSize: '0.6875rem', color: selected.desc.length > 160 ? '#ef4444' : 'var(--color-grey)' }}>{selected.desc.length} / 160</span>
                </div>
                <textarea className="input" rows={4} value={selected.desc} onChange={e => setSelected({...selected, desc: e.target.value})} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label className="label">Open Graph Image (Social Share Preview)</label>
                <div style={{ border: '1px dashed var(--color-light-grey)', padding: '2rem', textAlign: 'center', background: 'var(--color-off-white)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <ImageIcon size={24} style={{ color: 'var(--color-grey)' }} />
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-grey)' }}>Upload 1200x630px image</p>
                  <button className="btn btn-secondary" style={{ marginTop: '0.5rem', padding: '0.5rem 1rem', fontSize: '0.75rem' }}>Browse Files</button>
                </div>
              </div>

              <div style={{ marginTop: '1rem' }}>
                <p className="label" style={{ marginBottom: '0.75rem' }}>Search Engine Preview</p>
                <div style={{ padding: '1rem', background: '#fff', border: '1px solid var(--color-light-grey)', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderRadius: 8 }}>
                  <div style={{ fontSize: '0.875rem', color: '#1a0dab', textDecoration: 'none', cursor: 'pointer', marginBottom: '2px' }}>{selected.path === '/' ? 'designhour.in' : `designhour.in${selected.path}`}</div>
                  <h3 style={{ fontSize: '1.25rem', color: '#1a0dab', fontWeight: 400, margin: '0 0 0.25rem 0' }}>{selected.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: '#4d5156', margin: 0, lineHeight: 1.58 }}>{selected.desc}</p>
                </div>
              </div>

              <div style={{ marginTop: '1rem' }}>
                <button className="btn btn-primary" onClick={handleSave} style={{ padding: '0.875rem 2rem', fontSize: '0.8125rem' }}>
                  <Save size={14} /> {saved ? 'Saved!' : 'Save SEO Metadata'}
                </button>
                {saved && <p style={{ fontSize: '0.8125rem', color: '#16a34a', marginTop: '0.75rem' }}>✓ Changes saved successfully.</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
