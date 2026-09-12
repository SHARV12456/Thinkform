import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FAQAccordion from '@/components/FAQAccordion';
import { FAQS } from '@/lib/mockData';
import Link from 'next/link';

export const metadata = { title: 'FAQ | TAAS', description: 'Straight answers about TAAS consultations, pricing, and booking.' };

export default function FAQPage() {
  return (
    <main className="taas-faq-page">
      <Navbar />

      <div className="taas-faq-shell">
        <div className="taas-faq-intro">
          <p className="taas-faq-kicker">TAAS / faq</p>
          <h1 className="taas-faq-title">Questions people ask before they decide.</h1>
          <p className="taas-faq-subtext">
            If you’re wondering whether a design conversation is useful, this is the place to start. We keep it direct, practical, and useful.
          </p>
        </div>

        <div className="taas-legal-wrap" style={{ paddingTop: '2rem' }}>
          <FAQAccordion items={FAQS} />
        </div>

        <div className="taas-faq-cta">
          <div>
            <h3>Still not sure?</h3>
            <p>Ask before you spend money on the wrong fix.</p>
          </div>
          <Link href="/book" className="taas-primary-btn">
            Start a conversation <span>↗</span>
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
