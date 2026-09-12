"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const questionOptions = [
	{ id: 'layout', label: 'Layout' },
	{ id: 'kitchen', label: 'Kitchen' },
	{ id: 'material', label: 'Material' },
	{ id: 'storage', label: 'Storage' },
	{ id: 'reno', label: 'Renovation' },
	{ id: 'commercial', label: 'Commercial' },
	{ id: 'unsure', label: 'Not sure' },
];

const decisionStories = [
	{
		label: 'Residential',
		title: 'Open plan or not?',
		text: 'The client wanted openness without losing the daily practicality of the home.',
	},
	{
		label: 'Kitchen',
		title: 'Storage or simplicity?',
		text: 'The design needed to feel calm and usable, not crowded by the wrong solution.',
	},
	{
		label: 'Materials',
		title: 'What actually makes sense?',
		text: 'A clearer material strategy removed the noise and kept the budget honest.',
	},
];

const serviceIdeas = [
	{ title: 'Space planning', items: ['Flow', 'Furniture', 'Movement', 'Function'] },
	{ title: 'Kitchen', items: ['Layout', 'Workflow', 'Storage', 'Materials'] },
	{ title: 'Materials', items: ['Durability', 'Budget', 'Finish', 'Tone'] },
	{ title: 'Commercial', items: ['Experience', 'Customer flow', 'Operations', 'Brand'] },
];

export default function HomePage() {
	const [selected, setSelected] = useState('layout');
	const active = questionOptions.find((opt) => opt.id === selected) ?? questionOptions[0];

	useEffect(() => {
		const nodes = document.querySelectorAll('[data-reveal]');
		if (!nodes.length) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) entry.target.classList.add('is-visible');
				});
			},
			{ threshold: 0.18, rootMargin: '0px 0px -35px 0px' }
		);

		nodes.forEach((node) => observer.observe(node));
		return () => observer.disconnect();
	}, []);

	return (
		<main className="taas-home">
			<Navbar />

			<section className="taas-hero" data-reveal>
				<div className="taas-page-shell">
					<div className="taas-hero-grid">
						<div>
							<p className="taas-kicker">TAAS / Design decision platform</p>
							<h1 className="taas-display">
								Make the
								<span className="taas-inline-accent">right</span>
								<span className="taas-outline">decision.</span>
							</h1>
							<p className="taas-lead">
								TAAS helps people standing at an important design decision get clarity before they spend, renovate or commit.
							</p>

							<div className="taas-cta-row">
								<Link href="/book" className="taas-primary-btn">Start a conversation <span>↗</span></Link>
								<Link href="/services" className="taas-secondary-btn">Explore services</Link>
							</div>

							<div className="taas-question-panel">
								<h3>What are you trying to figure out?</h3>
								<div className="taas-question-chips">
									{questionOptions.map((option) => (
										<button
											key={option.id}
											type="button"
											className={`taas-choice ${selected === option.id ? 'is-active' : ''}`}
											onClick={() => setSelected(option.id)}
										>
											{option.label}
										</button>
									))}
								</div>
							</div>
						</div>

						<div className="taas-hero-visual" aria-label="TAAS design consultation visual">
							<div className="taas-floating-tag">TAAS / 001</div>
							<div className="taas-floating-figure">Design decision / Mumbai</div>
						</div>
					</div>
				</div>
			</section>

			<section className="taas-section">
				<div className="taas-page-shell">
					<div className="taas-split">
						<div>
							<p className="taas-kicker">The problem</p>
							<h2 className="taas-section-heading">Before the design, there is a decision.</h2>
						</div>
						<p className="taas-body-copy">
							People have more inspiration than ever, but more references does not necessarily make the right call easier. TAAS exists for the exact moment when a decision matters most.
						</p>
					</div>
				</div>
			</section>

			<section className="taas-section" data-reveal>
				<div className="taas-page-shell">
					<p className="taas-kicker">Decisions we helped make</p>
					<div className="taas-story-grid">
						{decisionStories.map((story) => (
							<article key={story.title} className="taas-story-card">
								<strong>{story.label}</strong>
								<h3>{story.title}</h3>
								<p>{story.text}</p>
							</article>
						))}
					</div>
				</div>
			</section>

			<section className="taas-section">
				<div className="taas-page-shell">
					<p className="taas-kicker">What are you trying to solve?</p>
					<div className="taas-explorer">
						<div className="taas-explorer-list">
							{questionOptions.map((option) => (
								<button
									key={option.id}
									type="button"
									className={`taas-explorer-item ${selected === option.id ? 'is-active' : ''}`}
									onClick={() => setSelected(option.id)}
								>
									<span>{option.label}</span>
									<span>↗</span>
								</button>
							))}
						</div>

						<div className="taas-explorer-panel">
							<p className="taas-micro-label">Question / {active.label}</p>
							<h3>{active.label}</h3>
							<p>
								{active.id === 'kitchen' && 'Is the problem actually the kitchen — or the way the space around it works?'}
								{active.id === 'layout' && 'Is the space wrong — or is the plan wrong?'}
								{active.id === 'material' && 'Are you choosing finishes for the look, or because they actually suit the space?'}
								{active.id === 'storage' && 'Do you need more storage — or better planning?'}
								{active.id === 'reno' && 'Should you keep, change, or remove before the renovation becomes expensive?'}
								{active.id === 'commercial' && 'Does the space support the business — or simply look functional on paper?'}
								{active.id === 'unsure' && 'You may not need a full project — just a sharper point of view.'}
							</p>
							<ul>
								{active.id === 'kitchen' && <>
									<li>Workflow</li>
									<li>Storage</li>
									<li>Layout</li>
									<li>Materials</li>
								</>}
								{active.id === 'layout' && <>
									<li>Flow</li>
									<li>Furniture</li>
									<li>Movement</li>
									<li>Proportion</li>
								</>}
								{active.id === 'material' && <>
									<li>Durability</li>
									<li>Budget</li>
									<li>Finish</li>
									<li>Context</li>
								</>}
								{active.id === 'storage' && <>
									<li>Cabinets</li>
									<li>Open shelves</li>
									<li>Daily use</li>
									<li>Visual calm</li>
								</>}
								{active.id === 'reno' && <>
									<li>Keep</li>
									<li>Change</li>
									<li>Rework</li>
									<li>Prioritize</li>
								</>}
								{active.id === 'commercial' && <>
									<li>Customer flow</li>
									<li>Operations</li>
									<li>Experience</li>
									<li>Brand</li>
								</>}
								{active.id === 'unsure' && <>
									<li>Second opinion</li>
									<li>Direction</li>
									<li>Planning</li>
									<li>Clarity</li>
								</>}
							</ul>
							<Link href="/book" className="taas-solid-btn">Let’s figure it out <span>↗</span></Link>
						</div>
					</div>
				</div>
			</section>

			<section className="taas-section">
				<div className="taas-page-shell">
					<p className="taas-kicker">What TAAS helps decide</p>
					<div className="taas-service-grid">
						{serviceIdeas.map((service) => (
							<article key={service.title} className="taas-service-card">
								<strong>{service.title}</strong>
								<h3>{service.title}</h3>
								<ul>
									{service.items.map((item) => (
										<li key={item}>{item}</li>
									))}
								</ul>
							</article>
						))}
					</div>

					<div className="taas-faux-banner">
						<strong>We help you decide before it gets expensive</strong>
						<span>Think better. Decide better. Build with confidence.</span>
					</div>
				</div>
			</section>

			<Footer />
		</main>
	);
}
