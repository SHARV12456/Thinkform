import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = { title: 'Terms of Service | TAAS' };

const termsSections = [
  ['1. Acceptance', 'By booking a consultation with TAAS, you agree to these Terms of Service. If you do not agree, please do not proceed with booking.'],
  ['2. The Service', 'TAAS provides professional design consultation services by the hour. The service is advisory in nature. We do not manage interior design projects, procurement, contracting or construction.'],
  ['3. Payment', 'Full payment is required before your appointment is confirmed. We accept payments through our online payment gateway. All prices are in Indian Rupees (INR) and include applicable taxes.'],
  ['4. Cancellations & Refunds', 'Cancellations and refunds are governed by our Cancellation Policy. Please review this policy before booking.'],
  ['5. Limitation of Liability', 'TAAS provides design advice and recommendations. We are not liable for the outcomes of decisions made based on our advice, or for work carried out by third-party contractors, vendors or manufacturers.'],
  ['6. Intellectual Property', 'All advice, recommendations and materials provided during consultations are for the personal use of the client only and may not be reproduced or shared without permission.'],
  ['7. Governing Law', 'These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of the courts of Mumbai, Maharashtra.'],
  ['8. Changes', 'We reserve the right to update these terms. Continued use of our services after changes constitutes acceptance of the updated terms.'],
];

export default function TermsPage() {
  return (
    <main className="taas-legal-page">
      <Navbar />

      <div className="taas-legal-shell">
        <div className="taas-legal-intro">
          <p className="taas-legal-kicker">TAAS / terms</p>
          <h1 className="taas-legal-title">The rules that keep things clear.</h1>
          <p className="taas-legal-meta">Last updated: August 2024</p>
        </div>

        <div className="taas-legal-wrap">
          <div className="taas-legal-article">
            {termsSections.map(([title, body]) => (
              <section key={title} className="taas-legal-section">
                <h2>{title}</h2>
                <p>{body}</p>
              </section>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
