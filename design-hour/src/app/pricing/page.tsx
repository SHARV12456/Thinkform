import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const plans = [
	{
		name: 'Quick clarity',
		duration: '30 minutes',
		price: '₹1,999',
		desc: 'For one focused question or a quick design direction.',
		cta: 'Book 30 minutes',
		featured: false,
	},
	{
		name: 'Deep decision',
		duration: '60 minutes',
		price: '₹3,999',
		desc: 'For a real design problem that needs a sharper point of view.',
		cta: 'Book 60 minutes',
		featured: true,
	},
	{
		name: 'Complex space',
		duration: '90 minutes',
		price: '₹5,999',
		desc: 'For multiple connected decisions, big trade-offs or deeper planning.',
		cta: 'Book 90 minutes',
		featured: false,
	},
];

const decisionPaths = [
	{ title: 'One quick question', detail: '30 min / ₹1,999' },
	{ title: 'I need to think this through', detail: '60 min / ₹3,999' },
	{ title: 'I have a complex space to figure out', detail: '90 min / ₹5,999' },
];

const included = [
	'Focused design direction',
	'Experienced perspective',
	'Layout discussion',
	'Material guidance',
	'Practical recommendations',
	'Decision clarity',
	'Next-step direction',
];

export default function PricingPage() {
	return (
		<main className="taas-inner-page">
			<Navbar />

			<div className="taas-page-shell">
				<header className="taas-page-hero">
					<p className="taas-page-kicker">TAAS / pricing</p>
					<h1 className="taas-page-title">How much thinking do you need?</h1>
					<p className="taas-page-lead">
						Match the session to the decision in front of you. Not every design problem needs a full deep-dive — but every important one deserves a clear answer.
					</p>
				</header>

				<section className="taas-section">
					<p className="taas-kicker">Pick the level of clarity</p>
					<div className="taas-compare-grid">
						{decisionPaths.map((item) => (
							<article key={item.title} className="taas-option-card">
								<strong>{item.title}</strong>
								<h3>{item.title}</h3>
								<p>{item.detail}</p>
							</article>
						))}
					</div>
				</section>

				<section className="taas-section">
					<div className="taas-pricing-grid">
						{plans.map((plan) => (
							<article key={plan.name} className={`taas-pricing-card ${plan.featured ? 'is-featured' : ''}`}>
								<p className="taas-pricing-meta">{plan.duration}</p>
								<h3>{plan.name}</h3>
								<p className="taas-pricing-price">{plan.price}</p>
								<p>{plan.desc}</p>
								<Link href="/book" className={`taas-pricing-cta ${plan.featured ? 'is-light' : ''}`}>
									{plan.cta} <span>↗</span>
								</Link>
							</article>
						))}
					</div>
				</section>

				<section className="taas-section">
					<div className="taas-split">
						<div>
							<p className="taas-kicker">What you get</p>
							<h2 className="taas-section-heading">Clearer decisions. Better next steps.</h2>
						</div>
						<ul className="taas-value-list">
							{included.map((item) => (
								<li key={item}><span>✓</span> <span>{item}</span></li>
							))}
						</ul>
					</div>
				</section>

				<section className="taas-end-cta">
					<p className="taas-kicker">Before you commit</p>
					<h2>Know what you’re doing.</h2>
					<div className="taas-end-actions">
						<Link href="/book" className="taas-primary-btn">Start a conversation <span>↗</span></Link>
						<Link href="/services" className="taas-secondary-btn">Explore services</Link>
					</div>
				</section>
			</div>

			<Footer />
		</main>
	);
}
