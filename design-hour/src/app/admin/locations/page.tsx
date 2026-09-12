'use client';
import { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { usePathname } from 'next/navigation';
import { MapPin, Plus, Check, X, Search } from 'lucide-react';

const INITIAL_LOCATIONS = [
  { id: 'loc-1', name: 'Bandra West', active: true, premium: false },
  { id: 'loc-2', name: 'Juhu', active: true, premium: false },
  { id: 'loc-3', name: 'Andheri West', active: true, premium: false },
  { id: 'loc-4', name: 'South Mumbai (SoBo)', active: true, premium: true },
  { id: 'loc-5', name: 'Navi Mumbai', active: false, premium: true },
  { id: 'loc-6', name: 'Powai', active: true, premium: false },
];

export default function AdminLocations() {
  const path = usePathname();
  const [locations, setLocations] = useState(INITIAL_LOCATIONS);
  const [search, setSearch] = useState('');
  const [newLoc, setNewLoc] = useState('');

  const filtered = locations.filter(l => l.name.toLowerCase().includes(search.toLowerCase()));

  const toggleActive = (id: string) => {
    setLocations(locations.map(l => l.id === id ? { ...l, active: !l.active } : l));
  };

  const togglePremium = (id: string) => {
    setLocations(locations.map(l => l.id === id ? { ...l, premium: !l.premium } : l));
  };

  const addLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLoc.trim()) return;
    const newId = `loc-${Date.now()}`;
    setLocations([{ id: newId, name: newLoc, active: true, premium: false }, ...locations]);
    setNewLoc('');
  };

  const deleteLocation = (id: string) => {
    setLocations(locations.filter(l => l.id !== id));
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-off-white)' }}>
      <AdminSidebar activePath={path} />
      <div className="admin-main" style={{ flex: 1 }}>
        <div style={{ padding: '1.5rem 2rem', background: 'var(--color-white)', borderBottom: '1px solid var(--color-light-grey)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Service Locations</h1>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-grey)', marginTop: '0.2rem' }}>Manage serviceable areas in Mumbai.</p>
          </div>
          <div style={{ position: 'relative', width: 280 }}>
            <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-grey)' }} />
            <input className="input" placeholder="Search locations…" value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: '2.25rem' }} />
          </div>
        </div>

        <div style={{ padding: '2rem', display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          
          <div style={{ flex: 1, minWidth: 400, background: 'var(--color-white)', border: '1px solid var(--color-light-grey)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--color-off-white)', borderBottom: '1px solid var(--color-light-grey)' }}>
                  {['Location Name', 'Status', 'Travel Surcharge', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '0.875rem 1rem', textAlign: 'left', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--color-grey)', textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(l => (
                  <tr key={l.id} style={{ borderBottom: '1px solid var(--color-light-grey)' }}>
                    <td style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <MapPin size={16} color="var(--color-grey)" /> {l.name}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <button 
                        onClick={() => toggleActive(l.id)}
                        style={{ background: l.active ? '#16a34a' : '#e5e7eb', color: l.active ? 'white' : 'var(--color-grey)', border: 'none', padding: '0.25rem 0.75rem', borderRadius: 99, fontSize: '0.6875rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}
                      >
                        {l.active ? 'ACTIVE' : 'INACTIVE'}
                      </button>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.8125rem', color: l.premium ? 'var(--color-near-black)' : 'var(--color-grey)' }}>
                        <input type="checkbox" checked={l.premium} onChange={() => togglePremium(l.id)} />
                        Requires Surcharge
                      </label>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <button onClick={() => deleteLocation(l.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><X size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-grey)', fontSize: '0.9375rem' }}>No locations found.</div>
            )}
          </div>

          <div style={{ width: 320, background: 'var(--color-white)', border: '1px solid var(--color-light-grey)', padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.5rem', borderBottom: '1px solid var(--color-light-grey)', paddingBottom: '0.75rem' }}>Add Location</h2>
            <form onSubmit={addLocation} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label className="label">Area Name</label>
                <input className="input" value={newLoc} onChange={e => setNewLoc(e.target.value)} placeholder="e.g. Malabar Hill" required />
              </div>
              <button type="submit" className="btn btn-primary" style={{ padding: '0.875rem', justifyContent: 'center', fontSize: '0.8125rem' }}>
                <Plus size={16} /> Add to Service Areas
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
