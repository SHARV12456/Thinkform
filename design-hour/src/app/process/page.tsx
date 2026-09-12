'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const steps = [
	{
		number: '01',
		title: 'Question',
		text: 'What are you actually trying to solve?',
		detail: 'We start with the real problem in front of you — not the generic design brief. The question must be honest before it becomes a plan.',
	},
	{
		number: '02',
		title: 'Context',
		text: 'What does the space actually need?',
		detail: 'We review the room, the use, the constraints and the practical logic behind the decision before it gets expensive.',
	},
	{
		number: '03',
		title: 'Challenge',
		text: 'Which assumptions should we question?',
		detail: 'We challenge the ideas that sound good but do not actually hold up under use, budget, flow or built reality.',
	},
	{
		number: '04',
		title: 'Direction',
		text: 'Which options actually make sense?',
		detail: 'We narrow the options to the ones that genuinely fit the situation and sharpen the direction.',
	},
	{
		number: '05',
		title: 'Decision',
		text: 'What should you actually do?',
		detail: 'The goal is clarity: what matters, what gets simplified, what moves next and what should stop being considered.',
	},
	{
		number: '06',
		title: 'Confidence',
		text: 'Now move forward.',
		detail: 'You leave with a better point of view and enough certainty to act without second-guessing the decision.',
	},
];

export default function ProcessPage() {
	return (
		<main className="taas-inner-page">
			<Navbar />

			<div className="taas-page-shell">
				<header className="taas-page-hero">
					<p className="taas-page-kicker">TAAS / process</p>
					<h1 className="taas-page-title">From question to decision.</h1>
					<p className="taas-page-lead">
						TAAS helps you move from uncertainty to a clear design direction — without the noise, the false confidence and the expensive mistakes.
					</p>
				</header>

				<section className="taas-section">
					<div className="taas-process-grid">
						{steps.map((step) => (
							<article key={step.number} className="taas-process-step">
								<span className="taas-step-number">{step.number}</span>
								<p className="taas-micro-label">{step.title}</p>
								<h3>{step.text}</h3>
								<p>{step.detail}</p>
							</article>
						))}
					</div>

					<div className="taas-signoff">
						<div className="taas-signoff-block">You do not need<br />more ideas.</div>
						<div className="taas-signoff-block">You need<br />a better call.</div>
					</div>
				</section>

				<section className="taas-end-cta">
					<p className="taas-kicker">Ready to move?</p>
					<h2>Start a conversation.</h2>
					<div className="taas-end-actions">
						<Link href="/book" className="taas-primary-btn">Start a conversation <span>↗</span></Link>
						<Link href="/pricing" className="taas-secondary-btn">See pricing</Link>
					</div>
				</section>
			</div>

			<Footer />
		</main>
	);
}
