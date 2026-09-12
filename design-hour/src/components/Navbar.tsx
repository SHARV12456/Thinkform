'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const navItems = [
	{ href: '/services', label: 'Explore' },
	{ href: '/process', label: 'How it works' },
	{ href: '/pricing', label: 'Pricing' },
	{ href: '/about', label: 'About' },
];

type ThemeMode = 'light' | 'dark';

export default function Navbar() {
	const pathname = usePathname();
	const [theme, setTheme] = useState<ThemeMode>('light');
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		if (typeof window === 'undefined') return;

		const savedTheme = window.localStorage.getItem('taas-theme');
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		const nextTheme: ThemeMode = savedTheme === 'dark' || savedTheme === 'light'
			? savedTheme
			: prefersDark ? 'dark' : 'light';

		setTheme(nextTheme);
		document.documentElement.dataset.theme = nextTheme;
	}, []);

	useEffect(() => {
		if (typeof window === 'undefined') return;
		document.documentElement.dataset.theme = theme;
		window.localStorage.setItem('taas-theme', theme);
	}, [theme]);

	useEffect(() => {
		if (!menuOpen) return;

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') setMenuOpen(false);
		};

		document.body.style.overflow = 'hidden';
		document.addEventListener('keydown', onKeyDown);

		return () => {
			document.body.style.overflow = '';
			document.removeEventListener('keydown', onKeyDown);
		};
	}, [menuOpen]);

	useEffect(() => {
		if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) return;

		document.body.classList.add('cursor-ready');

		const handlePointerMove = (event: PointerEvent) => {
			document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`);
			document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`);
		};

		window.addEventListener('pointermove', handlePointerMove);
		return () => window.removeEventListener('pointermove', handlePointerMove);
	}, []);

	return (
		<header className="taas-shell-header">
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
				<button
					type="button"
					className="taas-theme-toggle"
					onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
				>
					{theme === 'dark' ? 'Light' : 'Dark'}
				</button>

				<Link href="/book" className="taas-cta">
					Start a conversation <span>↗</span>
				</Link>

				<button
					type="button"
					className="taas-menu-toggle"
					aria-label={menuOpen ? 'Close menu' : 'Open menu'}
					aria-expanded={menuOpen}
					onClick={() => setMenuOpen((current) => !current)}
				>
					<span />
					<span />
					<span />
				</button>
			</div>

			{menuOpen && (
				<div className="taas-mobile-menu-overlay" onClick={() => setMenuOpen(false)}>
					<div className="taas-mobile-menu-panel" onClick={(event) => event.stopPropagation()}>
						<div className="taas-mobile-menu-header">
							<Link href="/" className="taas-brand" aria-label="TAAS home" onClick={() => setMenuOpen(false)}>
								TAAS<span>®</span>
							</Link>
							<button type="button" className="taas-close-menu" onClick={() => setMenuOpen(false)}>
								Close
							</button>
						</div>

						<nav className="taas-mobile-nav" aria-label="Mobile navigation">
							{navItems.map((item) => (
								<Link
									key={item.href}
									href={item.href}
									onClick={() => setMenuOpen(false)}
								>
									<span>{item.label}</span>
									<span>↗</span>
								</Link>
							))}
						</nav>

						<Link href="/book" className="taas-mobile-cta" onClick={() => setMenuOpen(false)}>
							Start a conversation <span>↗</span>
						</Link>
					</div>
				</div>
			)}
		</header>
	);
}
