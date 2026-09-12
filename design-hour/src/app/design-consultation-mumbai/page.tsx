'use client';

import Link from 'next/link';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const sessionOptions = [
	{
		id: '30',
		duration: '30 MIN',
		title: 'QUICK CLARITY',
		description: 'For one focused design question or decision.',
		price: 1999,
	},
	{
		id: '60',
		duration: '60 MIN',
		title: 'DEEP DIVE',
		description: 'For multiple decisions or a deeper discussion.',
		price: 3999,
		featured: true,
	},
	{
		id: '90',
		duration: '90 MIN',
		title: 'COMPLETE DIRECTION',
		description: 'For broader design situations and connected decisions.',
		price: 5999,
	},
];

const problemiareas = [
	{ icon: 'Layout', label: 'LAYOUT', desc: 'Space planning, circulation and furniture placement.' },
	{ icon: 'Kitchen', label: 'KITCHEN', desc: 'Flow, storage, work zones and finishes.' },
	{ icon: 'Materials', label: 'MATERIALS', desc: 'Compare options and understand where to spend.' },
	{ icon: 'Storage', label: 'STORAGE', desc: 'Make better use of available space.' },
	{ icon: 'Home', label: 'WHOLE HOME', desc: 'Create a coherent design direction.' },
	{ icon: 'Commercial', label: 'COMMERCIAL', desc: 'Design for cafés, offices, salons, retail spaces.' },
	{ icon: 'Opinion', label: 'SECOND OPINION', desc: 'Challenge an existing idea or quotation.' },
	{ icon: 'Help', label: 'NOT SURE', desc: 'Bring the problem as is. We help you figure out where to start.' },
];

const processSteps = [
	{ number: '01', title: 'QUESTION', desc: 'Tell us what you\'re stuck on.' },
	{ number: '02', title: 'CHOOSE', desc: 'Select how much direction you need.' },
	{ number: '03', title: 'BOOK', desc: 'Pick your date and time.' },
	{ number: '04', title: 'PAY', desc: 'Complete payment to confirm.' },
	{ number: '05', title: 'TALK', desc: 'Get direct design guidance.' },
];

const qualifyingPoints = [
	'You already have a floor plan but aren\'t sure about the layout.',
	'You have multiple kitchen options and can\'t decide.',
	'You\'re confused about materials and finishes.',
	'You have a quotation you want to challenge.',
	'You\'re about to renovate and want a second opinion.',
	'You want professional guidance without hiring a full-service designer.',
	'You are planning a commercial space and need design direction.',
];

const mumbaiAreas = [
	'Borivali',
	'Kandivali',
	'Malad',
	'Goregaon',
	'Andheri',
	'Versova',
	'Juhu',
	'Vile Parle',
	'Santacruz',
	'Khar',
	'Bandra',
	'South Mumbai',
	'Churchgate',
];

export default function AdsLandingPage() {
	const [selectedSession, setSelectedSession] = useState('60');

	return (
		<main className="taas-ads-landing">
			<Navbar />

			{/* HERO */}
			<section className="taas-ads-hero">
				<div className="taas-page-shell">
					<div className="taas-ads-hero-grid">
						<div className="taas-ads-hero-content">
							<p className="taas-ads-kicker">TAAS® / INTERIOR DESIGN CONSULTATION / MUMBAI</p>
							<h1 className="taas-ads-headline">
								NEED AN INTERIOR DESIGNER'S<br />OPINION BEFORE YOU SPEND?
							</h1>
							<p className="taas-ads-subhead">
								Get professional, independent direction on your interior decisions — without committing to a full-service design project.
							</p>

							{/* PROBLEM BADGES */}
							<div className="taas-ads-badges">
								<span>LAYOUT</span>
								<span>KITCHEN</span>
								<span>MATERIALS</span>
								<span>STORAGE</span>
								<span>SPACE PLANNING</span>
								<span>WHOLE HOME</span>
								<span>COMMERCIAL</span>
							</div>

							<Link href="/book" className="taas-ads-primary-btn">
								BOOK A CONSULTATION <span>↗</span>
							</Link>

							<p className="taas-ads-secondary-text">
								30 / 60 / 90 MINUTES · FIRST 15 MINUTES INCLUDED
							</p>
						</div>

						<div className="taas-ads-hero-image">
							<img src="/taas-hero-interior.jpg" alt="Premium interior design consultation" />
						</div>
					</div>
				</div>
			</section>

			{/* TRUST STRIP */}
			<section className="taas-ads-trust">
				<div className="taas-page-shell">
					<div className="taas-ads-trust-grid">
						<div className="taas-ads-trust-item">
							<strong>PERSONALLY CONDUCTED</strong>
							<p>Sharvayu Sawant · Principal Designer</p>
						</div>
						<div className="taas-ads-trust-item">
							<strong>VENDOR-NEUTRAL</strong>
							<p>Advice without material or contractor commissions</p>
						</div>
						<div className="taas-ads-trust-item">
							<strong>FIXED DURATION</strong>
							<p>30 / 60 / 90 minute sessions</p>
						</div>
						<div className="taas-ads-trust-item">
							<strong>PAY BEFORE CONFIRMATION</strong>
							<p>Your time is reserved after successful payment</p>
						</div>
					</div>
				</div>
			</section>

			{/* PROBLEM SECTION */}
			<section className="taas-ads-problem">
				<div className="taas-page-shell">
					<p className="taas-ads-kicker">BEFORE YOU SPEND</p>
					<h2 className="taas-ads-section-heading">TOO MANY INTERIOR DECISIONS.<br />NOT ENOUGH CLARITY.</h2>

					<ul className="taas-ads-problem-list">
						<li>Is this layout actually working?</li>
						<li>Should the kitchen be open or closed?</li>
						<li>Where should the storage go?</li>
						<li>Which material is actually worth paying for?</li>
						<li>Is the quotation reasonable?</li>
						<li>Am I making an expensive mistake?</li>
						<li>Does this design actually work for my lifestyle?</li>
					</ul>

					<p className="taas-ads-closing">
						You don't always need a full interior project. Sometimes you need the right answer before you commit.
					</p>
				</div>
			</section>

			{/* WHAT TAAS HELPS WITH */}
			<section className="taas-ads-services">
				<div className="taas-page-shell">
					<h2 className="taas-ads-section-heading">BRING THE DECISION.<br />WE'LL BRING THE DIRECTION.</h2>

					<div className="taas-ads-services-grid">
						{problemiareas.map((area) => (
							<div key={area.label} className="taas-ads-service-item">
								<strong>{area.label}</strong>
								<p>{area.desc}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* HOW IT WORKS */}
			<section className="taas-ads-process">
				<div className="taas-page-shell">
					<h2 className="taas-ads-section-heading">HOW IT WORKS</h2>

					<div className="taas-ads-process-flow">
						{processSteps.map((step) => (
							<div key={step.number} className="taas-ads-process-step">
								<div className="taas-ads-step-number">{step.number}</div>
								<strong>{step.title}</strong>
								<p>{step.desc}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CONSULTATION OPTIONS */}
			<section className="taas-ads-options">
				<div className="taas-page-shell">
					<h2 className="taas-ads-section-heading">HOW MUCH DIRECTION DO YOU NEED?</h2>

					<div className="taas-ads-options-grid">
						{sessionOptions.map((option) => (
							<div
								key={option.id}
								className={`taas-ads-option-card ${option.featured ? 'is-featured' : ''} ${selectedSession === option.id ? 'is-selected' : ''}`}
								onClick={() => setSelectedSession(option.id)}
								role="button"
								tabIndex={0}
								onKeyDown={(e) => {
									if (e.key === 'Enter' || e.key === ' ') setSelectedSession(option.id);
								}}
							>
								<p className="taas-ads-option-duration">{option.duration}</p>
								<h3>{option.title}</h3>
								<p className="taas-ads-option-desc">{option.description}</p>
								<p className="taas-ads-option-price">₹{option.price.toLocaleString('en-IN')}</p>
								<p className="taas-ads-option-included">FIRST 15 MINUTES ON US</p>
							</div>
						))}
					</div>

					<div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
						<Link href="/book" className="taas-ads-primary-btn">
							CHOOSE YOUR SESSION <span>↗</span>
						</Link>
					</div>
				</div>
			</section>

			{/* WHY TAAS */}
			<section className="taas-ads-why">
				<div className="taas-page-shell">
					<h2 className="taas-ads-section-heading">NOT A CONTRACTOR'S SALES PITCH.<br />NOT A FULL DESIGN COMMITMENT.</h2>

					<p className="taas-ads-why-text">
						TAAS gives you an independent design perspective before you commit your money, materials or project to a particular direction.
					</p>

					<p className="taas-ads-why-text" style={{ marginTop: '1.2rem' }}>
						You can take the advice and execute it yourself, work with your own contractor, work with another designer, use another vendor, or continue with TAAS separately.
					</p>

					<p className="taas-ads-why-text" style={{ marginTop: '1.2rem' }}>
						The consultation stands on its own.
					</p>
				</div>
			</section>

			{/* WHO THIS IS FOR */}
			<section className="taas-ads-for">
				<div className="taas-page-shell">
					<h2 className="taas-ads-section-heading">THIS IS FOR YOU IF...</h2>

					<ul className="taas-ads-for-list">
						{qualifyingPoints.map((point, idx) => (
							<li key={idx}>
								<span className="taas-ads-checkmark">✓</span>
								<span>{point}</span>
							</li>
						))}
					</ul>
				</div>
			</section>

			{/* MUMBAI RELEVANCE */}
			<section className="taas-ads-mumbai">
				<div className="taas-page-shell">
					<p className="taas-ads-kicker">MUMBAI / WESTERN CORRIDOR + SOUTH MUMBAI</p>
					<p className="taas-ads-mumbai-text">
						Interior design consultation for homeowners and businesses across Mumbai.
					</p>
					<p className="taas-ads-mumbai-locations">
						{mumbaiAreas.join(' · ')}
					</p>
				</div>
			</section>

			{/* FOUNDER TRUST */}
			<section className="taas-ads-founder">
				<div className="taas-page-shell">
					<p className="taas-ads-kicker">WHO YOU'RE TALKING TO</p>
					<h2 className="taas-ads-section-heading">SHARVAYU SAWANT</h2>
					<p className="taas-ads-founder-title">Principal Designer · TAAS</p>

					<p className="taas-ads-founder-text">
						Every consultation is personally conducted by Sharvayu.
					</p>

					<ul className="taas-ads-founder-list">
						<li>No junior designer</li>
						<li>No outsourced consultation</li>
						<li>No salesperson between you and the design conversation</li>
					</ul>
				</div>
			</section>

			{/* FINAL CTA */}
			<section className="taas-ads-final">
				<div className="taas-page-shell">
					<p className="taas-ads-kicker">STILL THINKING ABOUT IT?</p>
					<h2 className="taas-ads-section-heading">ASK BEFORE YOU SPEND.</h2>

					<p className="taas-ads-final-text">
						Bring the decision you're stuck on. Leave with a clearer direction.
					</p>

					<Link href="/book" className="taas-ads-primary-btn">
						BOOK A CONSULTATION <span>↗</span>
					</Link>

					<p className="taas-ads-secondary-text">
						30 / 60 / 90 MIN · FIRST 15 MINUTES INCLUDED
					</p>
				</div>
			</section>

			<Footer />
		</main>
	);
}
