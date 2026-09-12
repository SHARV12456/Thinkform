import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import UrgencyBadge from '@/components/UrgencyBadge';
import Link from 'next/link';

/**
 * Ad Landing Page - Direction / Design Consultation
 * 
 * This page serves paid ad traffic and optimizes for conversion
 * with stronger urgency messaging and direct CTA focus.
 * 
 * TODO: Customize headline and copy based on ad campaign specifics
 */

export const metadata = {
  title: 'Get Expert Interior Design Direction | TAAS',
  description: 'Book a direct design consultation with TAAS. Clear answers on layout, materials, budget, and styling. Sessions from ₹1,999.',
};

export default function AdsDirectionPage() {
  return (
    <main style={{ background: 'var(--c-bg)' }}>
      <Navbar />
      
      <section style={{ padding: '6rem 2rem', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.2 }}>
            Your space is not broken.<br />It’s just undecided.
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--c-grey)', marginBottom: '2rem', maxWidth: 760, margin: '0 auto 2rem' }}>
            Get a clear, expert opinion on layout, materials, budget, and styling — without the usual design confusion.
          </p>

          <div style={{ marginBottom: '2rem' }}>
            <UrgencyBadge variant="strong" />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
          <div style={{ 
            padding: '2rem', 
            background: 'var(--c-white)', 
            border: '1px solid var(--c-light)', 
            borderRadius: '0.5rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--c-grey)', marginBottom: '1rem' }}>
              30 MIN
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>₹1,999</div>
            <p style={{ fontSize: '0.9rem', color: 'var(--c-grey)', marginBottom: '1.5rem' }}>
              One question. One clear answer. Good for targeted decisions.
            </p>
            <Link href="/book" style={{ 
              display: 'inline-block',
              padding: '1rem 2rem',
              background: 'var(--c-black)',
              color: 'var(--c-white)',
              textDecoration: 'none',
              fontWeight: 700,
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              marginBottom: '1rem'
            }}>
              Fix my space
            </Link>
            <div style={{ fontSize: '0.75rem', color: 'var(--c-grey)' }}>
              ✓ Full refund up to 24hrs before
            </div>
          </div>

          <div style={{ 
            padding: '2rem', 
            background: 'var(--c-black)', 
            color: 'var(--c-white)',
            border: '2px solid var(--c-accent)', 
            borderRadius: '0.5rem',
            textAlign: 'center',
            position: 'relative'
          }}>
            <div style={{ 
              position: 'absolute',
              top: '-12px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'var(--c-accent)',
              padding: '0.5rem 1rem',
              fontSize: '0.65rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
              MOST POPULAR
            </div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '1rem', marginTop: '0.5rem' }}>
              60 MIN
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>₹3,999</div>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', marginBottom: '1rem' }}>
              <strong>First 15 min complimentary.</strong> The session that gets you unstuck.
            </p>
            <Link href="/book" style={{ 
              display: 'inline-block',
              padding: '1rem 2rem',
              background: 'var(--c-accent)',
              color: 'var(--c-white)',
              textDecoration: 'none',
              fontWeight: 700,
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              marginBottom: '1rem'
            }}>
              Book this session
            </Link>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>
              ✓ Full refund up to 24hrs before
            </div>
          </div>

          <div style={{ 
            padding: '2rem', 
            background: 'var(--c-white)', 
            border: '1px solid var(--c-light)', 
            borderRadius: '0.5rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--c-grey)', marginBottom: '1rem' }}>
              90 MIN
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>₹5,999</div>
            <p style={{ fontSize: '0.9rem', color: 'var(--c-grey)', marginBottom: '1.5rem' }}>
              Bigger space. More concerns. Real clarity before you spend more.
            </p>
            <Link href="/book" style={{ 
              display: 'inline-block',
              padding: '1rem 2rem',
              background: 'var(--c-black)',
              color: 'var(--c-white)',
              textDecoration: 'none',
              fontWeight: 700,
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              marginBottom: '1rem'
            }}>
              Start here
            </Link>
            <div style={{ fontSize: '0.75rem', color: 'var(--c-grey)' }}>
              ✓ Full refund up to 24hrs before
            </div>
          </div>
        </div>

        <div style={{ 
          background: 'var(--c-white)', 
          padding: '3rem',
          borderRadius: '0.5rem',
          marginBottom: '3rem'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem', textAlign: 'center' }}>Why TAAS?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--c-accent)', marginBottom: '0.5rem' }}>12 years</div>
              <p style={{ color: 'var(--c-grey)' }}>Professional design experience, applied directly to your space.</p>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--c-accent)', marginBottom: '0.5rem' }}>250+ projects</div>
              <p style={{ color: 'var(--c-grey)' }}>Real homes and businesses. Real decisions. Real outcomes.</p>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--c-accent)', marginBottom: '0.5rem' }}>One designer</div>
              <p style={{ color: 'var(--c-grey)' }}>You talk directly to Sharvayu Sawant — no junior handoff.</p>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--c-accent)', marginBottom: '0.5rem' }}>No pressure</div>
              <p style={{ color: 'var(--c-grey)' }}>Full refund up to 24 hours before. Zero commitment after pricing.</p>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <p style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--c-grey)' }}>
            Questions? Check our <Link href="/faq" style={{ color: 'var(--c-black)', textDecoration: 'underline' }}>FAQ</Link>
          </p>
        </div>

        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '1rem', marginBottom: '1.5rem', color: 'var(--c-grey)' }}>
            Want a quick answer before you book?
          </p>
          <a href="https://wa.me/917021XXXXXX?text=Hi%20I%20would%20like%20to%20enquire%20about%20a%20design%20consultation" target="_blank" rel="noopener noreferrer" 
            style={{ 
              display: 'inline-block',
              padding: '1rem 2rem',
              background: '#25D366',
              color: 'var(--c-white)',
              textDecoration: 'none',
              fontWeight: 700,
              borderRadius: '0.375rem',
              fontSize: '0.875rem'
            }}>
            💬 Chat on WhatsApp
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
