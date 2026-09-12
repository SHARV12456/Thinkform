import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Client Stories — Real Mumbai Interior Decisions | TAAS',
  description:
    'See how real Mumbai homeowners and businesses used TAAS to make clearer interior design decisions before spending. Genuine client stories — no fabrication.',
  openGraph: {
    title: 'Real People. Real Interior Decisions. | TAAS',
    description:
      'Genuine client stories from Mumbai homeowners and businesses who used TAAS to make clearer interior decisions.',
    url: 'https://taas-seven.vercel.app/client-stories',
  },
};

export default function ClientStoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
