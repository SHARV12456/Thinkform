import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';

export const metadata = { title: 'Design Consultation | TAAS', description: 'Decision-focused design guidance for homes, offices and commercial spaces before you commit.' };

export default function ConsultationPage() {
  return (
    <main>
      <Navbar />
      <div style={{ paddingTop: '6rem', minHeight: '100vh' }}>
        <div style={{ background: 'var(--color-off-white)', padding: '5rem 0' }}>
          <div className="container" style={{ maxWidth: 680 }}>
            <p className="label-caps" style={{ color: 'var(--color-grey)', marginBottom: '1rem' }}>The Service</p>
            <h1 className="heading-1" style={{ marginBottom: '1.25rem' }}>Design support for the decision that matters most.</h1>
            <p style={{ fontSize: '1.0625rem', color: 'var(--color-charcoal-light)', lineHeight: 1.75, marginBottom: '2rem' }}>
              TAAS is not a generic booking website. It is a focused design decision service for moments when the wrong move would cost you time, money or clarity.
            </p>
            <Link href="/book" className="btn btn-primary" style={{ padding: '1rem 2rem' }}>
              Start with Your Decision <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div style={{ padding: '4rem 0', background: 'var(--color-white)' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', alignItems: 'start' }}>
              <div>
                <h2 className="heading-2" style={{ marginBottom: '1.5rem' }}>This is not a traditional interior design service.</h2>
                <p style={{ fontSize: '0.9375rem', color: 'var(--color-charcoal-light)', lineHeight: 1.75, marginBottom: '1rem' }}>
                  Sometimes you do not need a full interior project. Sometimes you need a clear, experienced perspective before a layout, material, quote or renovation decision becomes expensive.
                </p>
                <p style={{ fontSize: '0.9375rem', color: 'var(--color-charcoal-light)', lineHeight: 1.75 }}>
                  TAAS gives you direct design thinking on your terms: focused, practical, and built around the decision in front of you rather than a long process with vague outcomes.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  'Residential interiors', 'Rental homes', 'Modular kitchens', 'Living rooms', 'Bedrooms',
                  'Offices', 'Retail spaces', 'Cafés and restaurants', 'Commercial interiors', 'Space planning decisions',
                ].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <CheckCircle size={15} style={{ color: 'var(--color-charcoal)', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.9375rem', color: 'var(--color-charcoal)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding: '4rem 0', background: 'var(--color-off-white)' }}>
          <div className="container">
            <h2 className="heading-2" style={{ marginBottom: '2.5rem' }}>Consultation formats.</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
              {[
                { type: 'On-Site', desc: 'A practical review in your space, ideal for layout pressure, material decisions and day-to-day problem-solving.', note: 'Available within Mumbai.' },
                { type: 'Video', desc: 'Share plans, photos and the design decision you are stuck on, then get direct guidance over a focused call.', note: 'Available anywhere in India.' },
              ].map(({ type, desc, note }) => (
                <div key={type} style={{ padding: '2rem', background: 'var(--color-white)', border: '1px solid var(--color-light-grey)' }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.75rem' }}>{type} Consultation</h3>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--color-charcoal-light)', lineHeight: 1.65, marginBottom: '0.75rem' }}>{desc}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-grey)', letterSpacing: '0.05em' }}>{note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ padding: '4rem 0', background: 'var(--color-white)' }}>
          <div className="container" style={{ textAlign: 'center', maxWidth: 760 }}>
            <p className="label-caps" style={{ color: 'var(--color-grey)', marginBottom: '1rem' }}>Before the commitment</p>
            <h2 className="heading-2" style={{ marginBottom: '1rem' }}>Think better. Decide better. Build with confidence.</h2>
            <p style={{ color: 'var(--color-charcoal-light)', lineHeight: 1.75, marginBottom: '2rem' }}>
              Bring the decision. We will help you see the trade-offs clearly and move forward with more certainty.
            </p>
            <Link href="/book" className="btn btn-primary" style={{ justifyContent: 'center', padding: '0.95rem 1.6rem' }}>
              Start a Conversation
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
