import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = { title: 'Privacy Policy | TAAS' };

const privacySections = [
  ['Information We Collect', 'We collect information you provide during booking: name, email address, phone number, property details and design requirements. We also collect payment information processed securely through our payment gateway.'],
  ['How We Use Your Information', 'Your information is used to schedule and confirm your consultation, communicate about your appointment, and improve our services. We do not sell your personal data to third parties.'],
  ['Payment Data', 'Payment is processed securely through our payment gateway partner. We do not store card details on our servers.'],
  ['Analytics & Tracking', 'We use analytics tools to understand how visitors use our website. This may include Google Analytics and Meta Pixel. You can opt out through your browser settings.'],
  ['Data Retention', 'We retain your booking information for a reasonable period to manage your account and comply with legal obligations.'],
  ['Your Rights', 'You have the right to access, correct or request deletion of your personal data. Contact us at hello@designhour.in to exercise these rights.'],
  ['Contact', 'For privacy-related questions, contact us at: hello@designhour.in'],
];

export default function PrivacyPage() {
  return (
    <main className="taas-legal-page">
      <Navbar />

      <div className="taas-legal-shell">
        <div className="taas-legal-intro">
          <p className="taas-legal-kicker">TAAS / privacy</p>
          <h1 className="taas-legal-title">Privacy without the wall of fine print.</h1>
          <p className="taas-legal-meta">Last updated: August 2024</p>
        </div>

        <div className="taas-legal-wrap">
          <div className="taas-legal-article">
            {privacySections.map(([title, body]) => (
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
