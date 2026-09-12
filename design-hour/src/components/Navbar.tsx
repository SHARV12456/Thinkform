'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

const navItems = [
	{ href: '/services', label: 'Explore' },
	{ href: '/process', label: 'How it works' },
	{ href: '/pricing', label: 'Pricing' },
	{ href: '/client-stories', label: 'Stories' },
	{ href: '/about', label: 'About' },
];

const mobileSections = [
	{
		title: 'Explore',
		items: [
			{ href: '/', label: 'Landing' },
			{ href: '/services', label: 'Services' },
			{ href: '/process', label: 'Process' },
			{ href: '/pricing', label: 'Pricing' },
			{ href: '/client-stories', label: 'Client Stories' },
			{ href: '/about', label: 'About' },
		],
	},
	{
		title: 'Services',
		items: [
			{ href: '/design-consultation-mumbai', label: 'Design Consultation Mumbai' },
			{ href: '/commercial', label: 'Commercial' },
			{ href: '/', label: 'Home' },
		],
	},
	{
		title: 'Info',
		items: [
			{ href: '/faq', label: 'FAQ' },
			{ href: '/privacy', label: 'Privacy' },
			{ href: '/terms', label: 'Terms' },
			{ href: '/cancellation-policy', label: 'Cancellation' },
		],
	},
];

export default function Navbar() {
	const pathname = usePathname();
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		setMenuOpen(false);
	}, [pathname]);

	useEffect(() => {
		// toggle body class for consistent scroll lock handling and styling
		if (menuOpen) {
			document.body.classList.add('menu-open');
		} else {
			document.body.classList.remove('menu-open');
		}

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setMenuOpen(false);
			}
		};

		document.addEventListener('keydown', onKeyDown);

		return () => {
			document.body.classList.remove('menu-open');
			document.removeEventListener('keydown', onKeyDown);
		};
	}, [menuOpen]);

	const mobileMenuId = useMemo(() => 'taas-mobile-menu', []);

	return (
		<header className="taas-shell-header">
			<div className="taas-page-shell taas-header-inner">
				<Link href="/" className="taas-brand" aria-label="TAAS home">
					TAAS<span>®</span>
				</Link>

				<nav className="taas-nav" aria-label="Main navigation">
				{navItems.map((item) => {
					const isActive = pathname === item.href || pathname.startsWith(item.href);
					return (
						<Link
							key={item.href}
							href={item.href}
							className={`taas-nav-link ${isActive ? 'is-active' : ''}`}
						>
							{item.label}
						</Link>
					);
				})}
				</nav>

				<div className="taas-header-actions">
				<Link href="/book" className="taas-cta">
					BOOK A SESSION ↗
				</Link>

				<button
					type="button"
					className={`taas-menu-toggle ${menuOpen ? 'is-open' : ''}`}
					aria-label={menuOpen ? 'Close menu' : 'Open menu'}
					aria-expanded={menuOpen}
					aria-controls={mobileMenuId}
					onClick={() => setMenuOpen((current) => !current)}
				>
					<span />
					<span />
					<span />
				</button>
				</div>
			</div>

			{menuOpen && (
				<div className="taas-mobile-menu-overlay" role="presentation" onClick={() => setMenuOpen(false)}>
					<div
						id={mobileMenuId}
						className="taas-mobile-menu-panel"
						role="dialog"
						aria-modal="true"
						aria-label="Mobile navigation"
						onClick={(event) => event.stopPropagation()}
					>
						<div className="taas-mobile-menu-header">
							<Link href="/" className="taas-brand" aria-label="TAAS home" onClick={() => setMenuOpen(false)}>
								TAAS<span>®</span>
							</Link>

							<button
								type="button"
								className="taas-close-menu"
								onClick={() => setMenuOpen(false)}
								aria-label="Close navigation menu"
							>
								<span aria-hidden="true">×</span>
							</button>
						</div>

						<div className="taas-mobile-menu-body">
							{mobileSections.map((section, si) => (
								<div key={section.title} className="taas-mobile-menu-section">
									<p className="taas-mobile-menu-label">{(si+1).toString().padStart(2,'0')} — {section.title}</p>
									<nav className="taas-mobile-nav" aria-label={section.title}>
										{section.items.map((item) => (
											<Link
												key={`${section.title}-${item.href}`}
												href={item.href}
												onClick={() => setMenuOpen(false)}
											>
												<span>{item.label}</span>
												<span aria-hidden="true">↗</span>
											</Link>
										))}
									</nav>
								</div>
							))}
						</div>

						<div className="taas-mobile-menu-actions">
							<Link href="/book" className="taas-mobile-cta" onClick={() => setMenuOpen(false)}>
								BOOK A SESSION →
							</Link>
							<Link href="https://wa.me/919999999999" className="taas-mobile-whatsapp" onClick={() => setMenuOpen(false)} target="_blank" rel="noreferrer">
								WhatsApp ↗
							</Link>
						</div>

						<div className="taas-mobile-menu-footer">Mumbai · India</div>
					</div>
				</div>
			)}
		</header>
	);
}
