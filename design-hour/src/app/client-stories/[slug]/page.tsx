import { CLIENT_STORIES } from '../data';
import ClientPage from './ClientPage';

export async function generateStaticParams() {
  return CLIENT_STORIES.map(s => ({ slug: s.slug }));
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  return <ClientPage slug={resolvedParams.slug} />;
}
