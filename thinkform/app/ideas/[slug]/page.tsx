import Link from 'next/link';
import { notFound } from 'next/navigation';
import articles from '@/data/articles.json';

const ideas = articles;

type Idea = typeof ideas[0];

function renderContent(block: Idea['content'][0], idx: number) {
  switch (block.type) {
    case 'body':
      return (
        <p key={idx} className="text-lg text-[#555] font-medium leading-relaxed mb-6">
          {block.text}
        </p>
      );
    case 'quote':
      return (
        <blockquote key={idx} className="border-l-4 border-[#111] pl-6 my-10">
          <p className="text-xl md:text-2xl font-bold text-[#111] leading-snug italic">
            {block.text}
          </p>
        </blockquote>
      );
    case 'heading':
      return (
        <h2 key={idx} className="text-2xl font-black tracking-tight text-[#111] mt-10 mb-4">
          {block.text}
        </h2>
      );
    case 'bullets':
      return (
        <ul key={idx} className="space-y-3 my-6">
          {'items' in block && block.items!.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-[#555] font-medium">
              <span className="text-[#111] mt-1 shrink-0">→</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    default:
      return null;
  }
}

export default async function IdeaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idea = ideas.find(i => i.slug === slug);
  if (!idea) return notFound();

  const currentIdx = ideas.findIndex(i => i.slug === slug);
  const next = ideas[currentIdx + 1];
  const prev = ideas[currentIdx - 1];

  return (
    <div className="pt-32 pb-24 px-6 bg-white min-h-screen">
      <div className="max-w-2xl mx-auto">
        {/* Back */}
        <Link href="/ideas" className="inline-flex items-center gap-2 text-sm font-bold text-[#888] hover:text-[#111] transition-colors mb-12 group">
          <span className="group-hover:-translate-x-1 transition-transform">←</span> All Thoughts
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="text-xs font-bold text-[#888] uppercase tracking-widest mb-4">{idea.category} · {idea.readTime}</div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight text-[#111]">{idea.title}</h1>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#e8e8e5] mb-12" />

        {/* Content */}
        <article>
          {idea.content.map((block, i) => renderContent(block, i))}
        </article>

        {/* CTA */}
        <div className="mt-16 bg-[#F5F5F3] border border-[#e8e8e5] rounded-[2rem] p-10 text-center">
          <p className="text-sm font-bold text-[#888] uppercase tracking-widest mb-3">Want to apply this to your idea?</p>
          <h3 className="text-2xl font-black tracking-tight mb-6">Let's think it through together.</h3>
          <Link href="/book" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#111] text-white rounded-full text-sm font-bold hover:bg-[#333] transition-colors">
            Book a 1:1 Session
          </Link>
        </div>

        {/* Prev / Next */}
        {(prev || next) && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-[#e8e8e5] pt-12">
            {prev && (
              <Link href={`/ideas/${prev.slug}`} className="group p-6 border border-[#e8e8e5] rounded-2xl hover:border-[#111] transition-colors">
                <div className="text-xs font-bold text-[#888] uppercase tracking-widest mb-2">← Previous</div>
                <div className="font-black text-[#111] tracking-tight leading-snug">{prev.title}</div>
              </Link>
            )}
            {next && (
              <Link href={`/ideas/${next.slug}`} className={`group p-6 border border-[#e8e8e5] rounded-2xl hover:border-[#111] transition-colors ${!prev ? 'md:col-start-2' : ''}`}>
                <div className="text-xs font-bold text-[#888] uppercase tracking-widest mb-2">Next →</div>
                <div className="font-black text-[#111] tracking-tight leading-snug">{next.title}</div>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
