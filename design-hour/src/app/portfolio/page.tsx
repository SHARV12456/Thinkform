// Replace the file with a clean, minimal portfolio page implementation
'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const PROJECTS = [
  { id: 1, image: '/portfolio-living-room.jpg', category: 'Residential', type: 'Living Room', neighborhood: 'Bandra West', headline: 'Compact living room — rethought.', outcome: 'Client avoided a ₹4.5L mistake on sofa placement and chose a layout that doubled perceived floor area.', service: '60-Minute TAAS Session' },
  { id: 2, image: '/portfolio-kitchen.jpg', category: 'Modular Kitchen', type: 'Modular Kitchen', neighborhood: 'Andheri West', headline: 'Modular kitchen — optimised before manufacturing.', outcome: 'Design changes made during consultation saved the client from a non-functional counter depth.', service: '30-Minute Quick Consultation' },
  { id: 3, image: '/portfolio-bedroom.jpg', category: 'Residential', type: 'Bedroom', neighborhood: 'Powai', headline: 'Bedroom redesign — budget-conscious.', outcome: 'Complete visual transformation achieved without structural changes.', service: '60-Minute TAAS Session' },
];

const CATEGORY_COLORS: Record<string, string> = {
  Residential: 'var(--color-charcoal)',
  'Modular Kitchen': '#2e3d1e',
};

export default function PortfolioPage() {
  return (
    <main>
      <Navbar />

      <section style={{ padding: '6rem 0', background: 'var(--color-off-white)', borderBottom: '1px solid var(--color-light-grey)' }}>
        <div className="container">
          <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Real spaces. Real outcomes.</h1>
          <p style={{ color: 'var(--color-grey)', marginTop: '0.5rem' }}>Selected case studies — Problem → Decision → Result</p>
        </div>
      </section>

      <section style={{ padding: '2.5rem 0', background: 'var(--color-white)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '1.5rem' }}>
          {PROJECTS.map(p => (
            <article key={p.id} style={{ border: '1px solid var(--color-light-grey)', overflow: 'hidden', background: 'var(--color-white)' }}>
              <div style={{ position: 'relative', height: 200 }}>
                <Image src={p.image} alt={p.headline} fill style={{ objectFit: 'cover' }} sizes="(max-width:600px) 100vw, 33vw"/>
              </div>
              <div style={{ padding: '1rem' }}>
                <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-grey)', textTransform: 'uppercase' }}>{p.type} · {p.neighborhood}</p>
                <h3 style={{ marginTop: '0.5rem', fontSize: '1.05rem' }}>{p.headline}</h3>
                <p style={{ color: 'var(--color-charcoal-light)', marginTop: '0.5rem' }}>{p.outcome}</p>
                <div style={{ marginTop: '0.75rem' }}>
                  <Link href={`/portfolio/${p.id}`} style={{ fontWeight: 700, display: 'inline-flex', gap: 8, alignItems: 'center' }}>Read case study <ArrowRight size={14} /></Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section style={{ padding: '3rem 0', background: 'var(--color-near-black)', color: 'white', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ marginBottom: '0.5rem' }}>Your space could be next.</h2>
          <p style={{ opacity: 0.8, maxWidth: 600, margin: '0 auto 1rem' }}>Every project above began with a single consultation. Book yours today.</p>
          <Link href="/book" style={{ background: 'white', color: 'black', padding: '0.75rem 1.5rem', fontWeight: 800, textDecoration: 'none' }}>Check Availability</Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
