'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const regions = [
	{
		id: 'western',
		title: 'Western suburbs',
		areas: ['Borivali', 'Kandivali', 'Malad', 'Goregaon', 'Jogeshwari'],
		desc: 'Apartment layouts and renovation decisions often need a clearer point of view before execution begins.',
	},
	{
		id: 'coastal',
		title: 'Andheri & coastal belt',
		areas: ['Andheri', 'Versova', 'Oshiwara', 'Lokhandwala', 'Juhu'],
		desc: 'Practical design decisions often get tangled in aesthetics and assumptions in tighter urban spaces.',
	},
	{
		id: 'bandra',
		title: 'Bandra & western corridor',
		areas: ['Vile Parle', 'Santacruz', 'Khar', 'Bandra'],
		desc: 'Premium residential and commercial spaces need sharper business and design logic before the spend gets large.',
	},
	{
		id: 'south',
		title: 'Central & south Mumbai',
		areas: ['Mahim', 'Dadar', 'Prabhadevi', 'Worli', 'Lower Parel', 'Churchgate'],
		desc: 'Historic, compact and high-constraint spaces require clarity around function, proportion and the real decision at hand.',
	},
];

const serviceCards = [
	{ title: 'Layout & space planning', text: 'Understanding whether the change improves real daily life, not just the look of the plan.' },
	{ title: 'Kitchen direction', text: 'Evaluating workflow, storage and material choices before costly construction starts.' },
	{ title: 'Bedroom & living space review', text: 'Making rooms work functionally, calmly and in proportion to the way you live.' },
	{ title: 'Material guidance', text: 'Choosing finishes that make sense for maintenance, use, budget and the space itself.' },
	{ title: 'Whole home direction', text: 'Creating one coherent language across rooms before decisions multiply.' },
	{ title: 'Commercial space planning', text: 'Helping businesses align design, efficiency and customer experience with practical decisions.' },
];

const steps = [
	{ number: '01', title: 'Bring the problem', text: 'Share the space, decision or plan that feels unclear.' },
	{ number: '02', title: 'Review & discuss', text: 'We identify assumptions, trade-offs and the real opportunity in front of you.' },
	{ number: '03', title: 'Get direction', text: 'Leave with a clearer plan and more certainty about the next move.' },
];

export default function MumbaiPage() {
	return (
		<main className="taas-mumbai-page">
			<Navbar />

			<div className="taas-page-shell">
				<section className="taas-page-hero taas-mumbai-hero">
					<p className="taas-page-kicker">TAAS / mumbai</p>
					<h1 className="taas-page-title">Design decisions<br />for real Mumbai spaces.</h1>
					<p className="taas-page-lead">
						TAAS helps people in Mumbai make better design calls before they spend on layouts, materials, renovation work or construction. The decision usually matters more than the aesthetic reference board.
					</p>
				</section>

				<section className="taas-mumbai-layout">
					<div className="taas-mumbai-hero-panel">
						<p className="taas-mumbai-kicker">Service area / 01</p>
						<h2 className="taas-section-heading">Mumbai is full of tight spaces and bigger decisions.</h2>
						<p className="taas-body-copy" style={{ marginTop: '1rem' }}>
							Whether it’s a compact apartment, a small commercial fit-out, a renovation under constraint, or a layout that suddenly feels wrong, TAAS helps you decide with more clarity before the commitment gets expensive.
						</p>
					</div>

					<div className="taas-mumbai-side-panel">
						<p className="taas-mumbai-kicker" style={{ color: 'rgba(255,255,255,0.58)' }}>Typical problems</p>
						<ul>
							<li>Limited storage</li>
							<li>Old-building constraints</li>
							<li>Layout confusion</li>
							<li>Material overload</li>
							<li>Renovation cost pressure</li>
						</ul>
					</div>
				</section>

				<section className="taas-mumbai-body">
					<div className="taas-region-grid">
						{regions.map((region) => (
							<article key={region.id} className="taas-region-card">
								<strong>{region.title}</strong>
								<h3>{region.title}</h3>
								<p>{region.desc}</p>
								<ul>
									{region.areas.map((area) => (
										<li key={area}><Link href={`/locations/${area.toLowerCase().replace(/\s+/g, '-')}`}>{area}</Link></li>
									))}
								</ul>
							</article>
						))}
					</div>

					<div className="taas-mumbai-services-grid">
						{serviceCards.map((service) => (
							<article key={service.title} className="taas-mumbai-service">
								<strong>TAAS / direction</strong>
								<h3>{service.title}</h3>
								<p>{service.text}</p>
							</article>
						))}
					</div>

					<div className="taas-mumbai-process-grid">
						{steps.map((step) => (
							<article key={step.number} className="taas-mumbai-step">
								<strong>{step.number}</strong>
								<h3>{step.title}</h3>
								<p>{step.text}</p>
							</article>
						))}
					</div>

					<div className="taas-mumbai-cta">
						<div>
							<p className="taas-mumbai-kicker">Ready to make the right call?</p>
							<h2 className="taas-section-heading">Start with the decision.</h2>
						</div>
						<Link href="/book" className="taas-primary-btn">Start your session <span>↗</span></Link>
					</div>
				</section>
			</div>

			<Footer />
		</main>
	);
}
