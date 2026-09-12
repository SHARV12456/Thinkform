'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight, Briefcase, Building2, Coffee, Monitor, ShoppingBag, Utensils } from 'lucide-react';

const commercialTypes = [
	{ icon: Briefcase, label: 'Offices', desc: 'Workspace planning, zoning, and productivity-focused layouts.' },
	{ icon: Coffee, label: 'Cafés', desc: 'Seating, flow, ambience and brand expression.' },
	{ icon: Utensils, label: 'Restaurants', desc: 'Dining zones, kitchen adjacency, lighting and material selection.' },
	{ icon: ShoppingBag, label: 'Retail', desc: 'Customer flow, display strategy and brand environment.' },
	{ icon: Building2, label: 'Studios', desc: 'Creative workspaces, acoustics and flexible layouts.' },
	{ icon: Monitor, label: 'Co-working', desc: 'Hot-desking zones, meeting pods and collaborative environments.' },
];

export default function CommercialPage() {
	return (
		<main className="taas-commercial-page">
			<Navbar />

			<div className="taas-commercial-shell">
				<section className="taas-commercial-hero">
					<div className="taas-commercial-hero-inner">
						<div>
							<p className="taas-commercial-kicker">TAAS / commercial</p>
							<h1 className="taas-commercial-title">Your space has to work as hard as your business.</h1>
							<p className="taas-commercial-subtext">
								Whether you’re opening a café, redefining a retail floor, rethinking an office or refining a service space, TAAS helps you make better design decisions before the spend becomes expensive.
							</p>
							<div className="taas-cta-row">
								<Link href="/book" className="taas-primary-btn">
									Start a conversation <span>↗</span>
								</Link>
								<Link href="/services" className="taas-secondary-btn">
									See services
								</Link>
							</div>
						</div>

						<div className="taas-commercial-highlight">
							<strong>
								Customer flow
								<br />
								Function
								<br />
								Brand
							</strong>
							<span>Good commercial design is not decoration. It is operational clarity, customer movement and a better business decision.</span>
						</div>
					</div>
				</section>

				<section className="taas-commercial-body">
					<div className="taas-commercial-grid">
						{commercialTypes.map(({ icon: Icon, label, desc }) => (
							<article key={label} className="taas-commercial-card">
								<strong>{label}</strong>
								<h3>{label}</h3>
								<Icon size={18} style={{ marginBottom: '0.8rem' }} />
								<p>{desc}</p>
							</article>
						))}
					</div>

					<div className="taas-commercial-cta">
						<div>
							<p className="taas-commercial-kicker">Decision support</p>
							<h2 className="taas-section-heading">Before you spend on the wrong layout.</h2>
						</div>
						<Link href="/book" className="taas-primary-btn">
							Start a commercial conversation <span>↗</span>
						</Link>
					</div>
				</section>
			</div>

			<Footer />
		</main>
	);
}
