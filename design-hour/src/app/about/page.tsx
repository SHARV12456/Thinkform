'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const stories = [
	{
		label: 'The question',
		title: 'What was unclear?',
		text: 'The issue was not just aesthetic. It was what should actually work in real life.',
	},
	{
		label: 'The decision',
		title: 'What needed to be decided?',
		text: 'The client needed to narrow the real trade-offs before the project got expensive.',
	},
	{
		label: 'The direction',
		title: 'What was recommended?',
		text: 'The recommendation focused on clarity, function and decision quality, not visual noise.',
	},
	{
		label: 'The outcome',
		title: 'What happened?',
		text: 'The final direction gave the client a stronger basis for action and fewer expensive surprises later.',
	},
];

export default function AboutPage() {
	return (
		<main className="taas-inner-page">
			<Navbar />

			<div className="taas-page-shell">
				<header className="taas-page-hero">
					<p className="taas-page-kicker">TAAS / about</p>
					<h1 className="taas-page-title">Design is easy. Deciding is hard.</h1>
					<p className="taas-page-lead">
						People have more inspiration than ever — Pinterest, Instagram, YouTube, AI, endless references — but more information does not
						automatically produce better decisions.
					</p>
				</header>

				<section className="taas-section">
					<div className="taas-split">
						<div>
							<p className="taas-kicker">Why TAAS exists</p>
							<h2 className="taas-section-heading">Not another interior design service.</h2>
						</div>
						<p className="taas-body-copy">
							TAAS sits between idea and execution. It helps people make better decisions before they commit to layouts, materials, renovation work, budgets and full interior projects. This is the strategic difference.
						</p>
					</div>
				</section>

				<section className="taas-section">
					<div className="taas-founder-grid">
						<div className="taas-founder-photo">TAAS</div>
						<div className="taas-founder-copy">
							<p className="taas-kicker">The idea</p>
							<h2>Clearer decisions. Better moves.</h2>
							<p>
								TAAS exists for the moment when a design decision matters most — when you know something should change, but you are not fully sure what the right move is.
							</p>
							<p>
								The value is not more inspiration. It is experienced perspective, challenge, direction and confidence before the build, spend or commitment becomes permanent.
							</p>
						</div>
					</div>
				</section>

				<section className="taas-section">
					<p className="taas-kicker">Decision stories</p>
					<div className="taas-case-grid">
						{stories.map((story) => (
							<article key={story.label} className="taas-case-card">
								<p>{story.label}</p>
								<h3>{story.title}</h3>
								<p>{story.text}</p>
							</article>
						))}
					</div>
				</section>

				<section className="taas-end-cta">
					<p className="taas-kicker">Have a design decision you’re stuck on?</p>
					<h2>Start with a question.</h2>
					<div className="taas-end-actions">
						<Link href="/book" className="taas-primary-btn">
							Start a conversation <span>↗</span>
						</Link>
						<Link href="/services" className="taas-secondary-btn">
							Explore services
						</Link>
					</div>
				</section>
			</div>

			<Footer />
		</main>
	);
}
