import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Interior Design Consultation in Carter Road | TAAS',
  description: 'Book a professional interior design consultation in Mumbai. Get expert advice on layout, materials, furniture, storage and more.',
};

export default function Page() {
  return (
    <main>
      <Navbar />
      <div style={{ padding: '6rem 2rem', maxWidth: 1200, margin: '0 auto', minHeight: '60vh' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '2rem' }}>Interior Design Consultation in Carter Road</h1>
        <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>
          Get professional design advice for your home, office, rental property or commercial space.
        </p>
        <div style={{ padding: '2rem', background: 'var(--color-off-white)', borderRadius: '0.5rem', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>60-Minute Consultation — ₹3,999</h2>
          <p style={{ marginBottom: '1rem' }}>First 15 minutes complimentary.</p>
          <Link href="/book" className="btn btn-primary" style={{ display: 'inline-block', padding: '1rem 2rem', background: 'var(--color-near-black)', color: 'white', textDecoration: 'none', fontWeight: 600 }}>BOOK MY CONSULTATION</Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
