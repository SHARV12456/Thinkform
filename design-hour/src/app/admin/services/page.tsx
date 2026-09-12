'use client';
import { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { usePathname } from 'next/navigation';
import { ADMIN_SERVICES } from '@/lib/mockData';
import { Edit, Plus, ToggleLeft, ToggleRight } from 'lucide-react';

export default function AdminServices() {
  const path = usePathname();
  const [services, setServices] = useState(ADMIN_SERVICES);
  const [editing, setEditing] = useState<string | null>(null);

  const toggleStatus = (id: string) => {
    setServices(s => s.map(svc => svc.id === id ? { ...svc, status: svc.status === 'Active' ? 'Inactive' : 'Active' } : svc));
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-off-white)' }}>
      <AdminSidebar activePath={path} />
      <div className="admin-main" style={{ flex: 1 }}>
        <div style={{ padding: '1.5rem 2rem', background: 'var(--color-white)', borderBottom: '1px solid var(--color-light-grey)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Services</h1>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-grey)', marginTop: '0.2rem' }}>Manage consultation services and their availability.</p>
          </div>
          <button className="btn btn-primary" style={{ padding: '0.625rem 1.25rem', fontSize: '0.75rem' }}>
            <Plus size={13} /> Add Service
          </button>
        </div>
        <div style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {services.map(svc => (
              <div key={svc.id} style={{ background: 'var(--color-white)', border: '1px solid var(--color-light-grey)', padding: '1.75rem', display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem', alignItems: 'center', opacity: svc.status === 'Inactive' ? 0.6 : 1, transition: 'opacity 0.2s' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1.5rem' }}>
                  <div>
                    <p className="label" style={{ marginBottom: '0.25rem' }}>Service Name</p>
                    <p style={{ fontSize: '0.9375rem', fontWeight: 600 }}>{svc.name}</p>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--color-charcoal-light)', marginTop: '0.25rem' }}>{svc.description}</p>
                  </div>
                  <div>
                    <p className="label" style={{ marginBottom: '0.25rem' }}>Duration</p>
                    <p style={{ fontSize: '0.9375rem', fontWeight: 600 }}>{svc.duration > 0 ? `${svc.duration} min` : 'Variable'}</p>
                  </div>
                  <div>
                    <p className="label" style={{ marginBottom: '0.25rem' }}>Price</p>
                    <p style={{ fontSize: '0.9375rem', fontWeight: 600 }}>₹{svc.price.toLocaleString('en-IN')}</p>
                  </div>
                  <div>
                    <p className="label" style={{ marginBottom: '0.25rem' }}>Complimentary</p>
                    <p style={{ fontSize: '0.9375rem', fontWeight: 600 }}>{svc.complimentaryMinutes > 0 ? `${svc.complimentaryMinutes} min` : '—'}</p>
                  </div>
                  <div>
                    <p className="label" style={{ marginBottom: '0.25rem' }}>Availability</p>
                    <p style={{ fontSize: '0.9375rem', fontWeight: 600 }}>{svc.availability}</p>
                  </div>
                  <div>
                    <p className="label" style={{ marginBottom: '0.25rem' }}>Status</p>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '0.2rem 0.6rem', background: svc.status === 'Active' ? '#f0fdf4' : '#fef2f2', color: svc.status === 'Active' ? '#16a34a' : '#dc2626', border: `1px solid ${svc.status === 'Active' ? '#bbf7d0' : '#fecaca'}` }}>{svc.status}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.625rem', flexShrink: 0 }}>
                  <button onClick={() => setEditing(svc.id)} style={{ background: 'none', border: '1px solid var(--color-light-grey)', padding: '0.5rem 0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: 'var(--color-charcoal)' }}>
                    <Edit size={12} /> Edit
                  </button>
                  <button onClick={() => toggleStatus(svc.id)} style={{ background: 'none', border: '1px solid var(--color-light-grey)', padding: '0.5rem 0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: svc.status === 'Active' ? '#dc2626' : '#16a34a' }}>
                    {svc.status === 'Active' ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
                    {svc.status === 'Active' ? 'Deactivate' : 'Activate'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
