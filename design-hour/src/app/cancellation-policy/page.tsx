import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = { title: 'Cancellation Policy | TAAS' };

const policies = [
	{
		title: 'Cancellation',
		items: [
			{
				heading: 'Cancellation by Client (24+ hours notice)',
				body: '[ADMIN CONFIGURABLE] Cancellations made more than 24 hours before the scheduled consultation are eligible for a full refund or free rescheduling.',
			},
			{
				heading: 'Cancellation by Client (less than 24 hours)',
				body: '[ADMIN CONFIGURABLE] Cancellations made within 24 hours of the scheduled consultation will incur a cancellation fee. The remaining amount may be refunded or applied as a credit.',
			},
			{
				heading: 'Cancellation by TAAS',
				body: 'In the rare event that we must cancel, you will receive a full refund and the option to reschedule at no extra cost.',
			},
		],
	},
	{
		title: 'Rescheduling',
		items: [
			{
				heading: 'Free Rescheduling Window',
				body: '[ADMIN CONFIGURABLE] You may reschedule your consultation once at no charge, provided you notify us at least 24 hours in advance.',
			},
			{
				heading: 'Late Rescheduling',
				body: '[ADMIN CONFIGURABLE] Rescheduling requests made within 24 hours of the appointment may be subject to an admin fee.',
			},
		],
	},
	{
		title: 'Refunds',
		items: [
			{
				heading: 'Refund Timeline',
				body: '[ADMIN CONFIGURABLE] Approved refunds are processed within 5–7 business days to the original payment method.',
			},
			{
				heading: 'Non-Refundable Situations',
				body: 'The consultation fee is non-refundable if the session has commenced, or if the client fails to attend the scheduled appointment without prior notice.',
			},
		],
	},
	{
		title: 'No-show',
		items: [
			{
				heading: 'Client No-Show',
				body: '[ADMIN CONFIGURABLE] If a client does not attend a scheduled consultation without prior notice, the session will be considered completed and no refund will be issued.',
			},
		],
	},
	{
		title: 'Payment',
		items: [
			{
				heading: 'Payment Requirement',
				body: 'Payment is required before the appointment is confirmed. Your appointment is confirmed after successful online payment.',
			},
			{
				heading: 'Payment Methods',
				body: '[ADMIN CONFIGURABLE] We accept UPI, credit/debit cards, net banking and popular digital wallets via our payment gateway.',
			},
		],
	},
];

export default function CancellationPage() {
	return (
		<main className="taas-legal-page">
			<Navbar />

			<div className="taas-legal-shell">
				<div className="taas-legal-intro">
					<p className="taas-legal-kicker">TAAS / policy</p>
					<h1 className="taas-legal-title">Plans change. The process should stay clear.</h1>
					<p className="taas-legal-meta">Last updated: August 2024</p>
				</div>

				<div className="taas-legal-wrap">
					<div className="taas-legal-article">
						{policies.map((section) => (
							<section key={section.title} className="taas-legal-section">
								<h2>{section.title}</h2>
								<ul>
									{section.items.map((item) => (
										<li key={item.heading}>
											<strong>{item.heading}:</strong> {item.body}
										</li>
									))}
								</ul>
							</section>
						))}
					</div>
				</div>
			</div>

			<Footer />
		</main>
	);
}
