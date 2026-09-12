import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { CLIENT_STORIES } from './data';
import './client-stories.css';

export default function ClientStoriesPage() {
  const visibleStories = CLIENT_STORIES.filter(s => s.published);

  const padSlot = (num: number) => num < 10 ? `0${num}` : num;

  const filters = ['ALL', 'LAYOUT', 'KITCHEN', 'MATERIALS', 'SPACE PLANNING', 'SECOND OPINION'];

  const extendedStories = visibleStories.map(story => {
    let explanation = '';
    let decision = '';
    let result = '';
    let ratingText = '';

    if (story.slug === 'story-01') {
      explanation = 'Rohan wanted to finalise his furniture layout but was unsure whether the proposed circulation would actually work in daily life.';
      decision = 'Reworked the furniture placement and circulation before execution.';
      result = 'Clearer movement · Better storage · No unnecessary civil changes';
      ratingText = 'Clarity after one Design Hour';
    } else if (story.slug === 'story-02') {
      explanation = 'Priya had ample kitchen space but the proposed modular layout ignored her actual cooking workflow and storage needs.';
      decision = 'Redesigned the storage zones around prep, cooking, and cleaning logic.';
      result = 'Ergonomic workflow · Usable deep storage · Cleaner aesthetic';
      ratingText = 'Decision confidence';
    } else if (story.slug === 'story-03') {
      explanation = 'Aarav and Neha were overwhelmed by Pinterest boards and conflicting advice from contractors on material finishes.';
      decision = 'Filtered 200 references down to one cohesive material direction.';
      result = 'Cohesive palette · Faster vendor selection · No aesthetic clashes';
      ratingText = 'Clarity after one Design Hour';
    } else if (story.slug === 'story-04') {
      explanation = 'Karan was about to execute a commercial office build but felt the workstation density might feel claustrophobic.';
      decision = 'Adjusted the floor plan to improve natural light and team circulation.';
      result = 'Better team circulation · Maximized natural light · Executive privacy';
      ratingText = 'Decision confidence';
    } else if (story.slug === 'story-05') {
      explanation = 'Ananya had a completed design from a contractor but felt uncertain before signing the final execution cheque.';
      decision = 'Provided an independent, objective review of the layout and material specs.';
      result = 'Peace of mind · Prevented expensive mistakes · Validated good ideas';
      ratingText = 'Clarity after one Design Hour';
    }

    return { ...story, explanation, decision, result, ratingText };
  });

  const baList = [
    { before: 'Too many layout possibilities', after: 'Clear furniture + circulation plan' },
    { before: 'Storage everywhere, but nothing worked', after: 'Storage designed around actual usage' },
    { before: '200 saved references', after: 'One coherent material direction' },
    { before: 'Office ready for execution', after: 'Workstation layout corrected before build' },
    { before: 'Unsure whether to redesign', after: 'Independent second opinion before spending' },
  ];

  return (
    <main className="cs-page">
      {/* ── NAVBAR ──────────────────────────────────────────────────────────── */}
      <nav className="cs-navbar">
        <Link href="/" className="cs-nav-logo">TAAS®</Link>
        <div className="cs-nav-center">
          <Link href="/book" className="cs-nav-link">Design Hour</Link>
          <Link href="/process" className="cs-nav-link">How It Works</Link>
          <Link href="/client-stories" className="cs-nav-link active">Client Stories</Link>
        </div>
        <Link href="/book" className="cs-nav-cta">Book a Design Hour →</Link>
      </nav>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="cs-index-hero">
        <div className="cs-eyebrow">TAAS® / CLIENT STORIES</div>
        <h1 className="cs-index-headline">Interior decisions people wanted to get right.</h1>
        <p className="cs-index-sub">
          See how a TAAS Design Hour helps homeowners and businesses make clearer decisions before committing money to the wrong layout, material, storage or design direction.
        </p>
        <div className="cs-trust-line">
          5 illustrated client scenarios · Mumbai · Residential + Commercial
        </div>
        <div className="cs-hero-ctas">
          <Link href="/book" className="cs-btn-pri">Book a Design Hour</Link>
          <a href="#stories" className="cs-btn-sec">See the Stories</a>
        </div>
      </section>

      {/* ── FILTERS ────────────────────────────────────────────────────── */}
      <div className="cs-filter-bar" id="stories">
        {filters.map(f => (
          <button key={f} className={`cs-filter-btn ${f === 'ALL' ? 'active' : ''}`}>{f}</button>
        ))}
      </div>

      {/* ── STORY LIST ────────────────────────────────────────────────────── */}
      <section className="cs-story-list">
        {extendedStories.map((story) => {
          const img = story.heroImage;
          return (
            <Link key={story.slug} href={`/client-stories/${story.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
              <article className="cs-story-card">
                <div className="cs-story-img-wrap">
                  {img && <img src={img.src} alt="" className="cs-story-img" loading="lazy" />}
                </div>

                <div className="cs-story-content">
                  <div className="cs-story-num">{padSlot(story.slot)}</div>
                  <div className="cs-story-meta">
                    <span>{story.clientDisplayName || story.clientName}</span>
                    <span>{story.location} &nbsp;·&nbsp; {story.propertyType}</span>
                  </div>
                  
                  <h2 className="cs-story-headline">
                    “{story.indexHeadline}”
                  </h2>
                  
                  <p className="cs-story-explanation">{story.explanation}</p>
                  
                  <div className="cs-mini-decision">
                    <div className="cs-mini-label">TAAS Decision</div>
                    <div className="cs-mini-text">{story.decision}</div>
                    <div className="cs-mini-label">Result</div>
                    <div className="cs-mini-text" style={{ marginBottom: 0 }}>{story.result}</div>
                  </div>

                  <div className="cs-rating-block">
                    <div className="cs-rating-label">Illustrative Experience Rating</div>
                    <div className="cs-rating-stars">★★★★★</div>
                    <div className="cs-rating-text">5.0 / 5 — {story.ratingText}</div>
                  </div>
                  
                  <div className="cs-read-cta">Read the full story →</div>
                </div>
              </article>
            </Link>
          );
        })}
      </section>

      {/* ── BEFORE / AFTER ────────────────────────────────────────────────────── */}
      <section className="cs-ba-section">
        <h2 className="cs-ba-title">What they came with / What they left with</h2>
        <div className="cs-ba-grid">
          {baList.map((item, i) => (
            <div className="cs-ba-row" key={i}>
              <div className="cs-ba-col">
                <div className="cs-ba-label">Before TAAS</div>
                <div className="cs-ba-text">“{item.before}”</div>
              </div>
              <div className="cs-ba-arrow">→</div>
              <div className="cs-ba-col after">
                <div className="cs-ba-label">After TAAS</div>
                <div className="cs-ba-text">“{item.after}”</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHAT PEOPLE ASK ────────────────────────────────────────────────────── */}
      <section className="cs-ask-section">
        <div className="cs-eyebrow">WHAT PEOPLE ASK TAAS ABOUT</div>
        <div className="cs-ask-grid">
          {['Layout', 'Kitchen planning', 'Storage', 'Materials', 'Furniture placement', 'Space planning', 'Second opinions', 'Commercial layouts'].map(tag => (
            <div className="cs-ask-tag" key={tag}>{tag}</div>
          ))}
        </div>
      </section>

      {/* ── PRICING CTA ────────────────────────────────────────────────────── */}
      <section className="cs-pricing-section">
        <h2 className="cs-pricing-title">Sometimes you don't need a designer for the whole project.</h2>
        <p className="cs-pricing-sub">
          A TAAS Design Hour is for the decision sitting between “I think this works” and “I'm confident this works.”
        </p>
        <div className="cs-pricing-tiers">
          <span>30 MIN — ₹1,999</span>
          <span>60 MIN — ₹3,999</span>
          <span>90 MIN — ₹5,999</span>
        </div>
        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#888', marginBottom: '3rem', letterSpacing: '0.1em' }}>
          FIRST 15 MINUTES INCLUDED
        </div>
        <Link href="/book" className="cs-btn-pri">Ask before you spend →</Link>
      </section>

      <div style={{ textAlign: 'center', padding: '3rem 5%', fontSize: '0.75rem', color: '#888' }}>
        These stories are fictionalized examples created to demonstrate the TAAS consultation experience. They are not presented as verified client testimonials.
      </div>
    </main>
  );
}
