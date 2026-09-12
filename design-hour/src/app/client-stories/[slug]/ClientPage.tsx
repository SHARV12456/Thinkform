'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CLIENT_STORIES, DURATION_LABELS } from '../data';
import '../client-stories.css';

const FadeIn = ({ children }: { children: React.ReactNode }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.6, ease: "easeOut" }}>
    {children}
  </motion.div>
);

const padSlot = (num: number) => num < 10 ? `0${num}` : num.toString();

export default function ClientPage({ slug }: { slug: string }) {
  const story = CLIENT_STORIES.find(s => s.slug === slug);

  if (!story || !story.published) {
    return <div style={{ padding: '20vh 5%', textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>Story not found.</div>;
  }

  const idx = CLIENT_STORIES.findIndex(s => s.slug === story.slug);
  const prevStory = idx > 0 ? CLIENT_STORIES[idx - 1] : null;
  const nextStory = idx < CLIENT_STORIES.length - 1 ? CLIENT_STORIES[idx + 1] : null;

  const hImg = story.heroImage;
  const name = story.clientDisplayName || story.clientName;

  return (
    <main className="cs-page" style={{ background: '#fff' }}>
      {/* ── NAVBAR ──────────────────────────────────────────────────────────── */}
      <nav className="cs-navbar" style={{ background: 'rgba(255,255,255,0.95)' }}>
        <Link href="/" className="cs-nav-logo">TAAS®</Link>
        <div className="cs-nav-center">
          <Link href="/book" className="cs-nav-link">Design Hour</Link>
          <Link href="/process" className="cs-nav-link">How It Works</Link>
          <Link href="/client-stories" className="cs-nav-link active">Client Stories</Link>
        </div>
        <Link href="/book" className="cs-nav-cta">Book a Design Hour →</Link>
      </nav>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <div style={{ paddingTop: '160px', paddingBottom: '4rem', textAlign: 'center', maxWidth: '900px', margin: '0 auto', paddingLeft: '5%', paddingRight: '5%' }}>
        <div className="cs-eyebrow">The TAAS Journal / {padSlot(story.slot)}</div>
        <h1 className="cs-index-headline" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
          {story.indexHeadline}
        </h1>
        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '1.5rem' }}>
          <span style={{ color: '#1A1A1A' }}>{name}</span> &nbsp;·&nbsp; {story.location} &nbsp;·&nbsp; {DURATION_LABELS[story.consultationDuration] || 'Design Hour'}
        </div>
      </div>

      {hImg && (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 5%', marginBottom: '4rem' }}>
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#F9F8F6', overflow: 'hidden' }}>
            <img src={hImg.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="eager" />
            {hImg.illustrative && (
              <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', background: 'rgba(255,255,255,0.9)', padding: '0.5rem 1rem', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Illustrative interior — fictionalized story
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── BODY ────────────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 5% 6rem' }}>
        
        {story.clientPerspective && (
          <FadeIn>
            <div style={{ margin: '4rem 0', padding: '3rem', background: '#F9F8F6', borderLeft: '4px solid #1A1A1A' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.5rem', color: '#1A1A1A' }}>
                Client Note
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 600, lineHeight: 1.4, color: '#1A1A1A', marginBottom: '1.5rem' }}>
                “{story.clientPerspective}”
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#666', marginBottom: '0.5rem' }}>
                — {name}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#888' }}>
                {story.location} · {story.propertyType}
              </div>
              <div style={{ marginTop: '2rem', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#aaa' }}>
                Illustrative quote from a fictionalized scenario
              </div>
            </div>
          </FadeIn>
        )}

        {story.situation && (
          <FadeIn>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem', color: '#888' }}>
              The Situation
            </div>
            {story.situation.split('\n\n').map((p, i) => (
              <p key={i} style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#4A4A4A', marginBottom: '1.5rem' }}>{p}</p>
            ))}
          </FadeIn>
        )}

        {story.designDecisions && story.designDecisions.length > 0 && (
          <FadeIn>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '4rem', marginBottom: '2rem', color: '#888' }}>
              Key Decisions
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {story.designDecisions.map((d, i) => (
                <div key={i} style={{ padding: '2rem', border: '1px solid rgba(0,0,0,0.1)' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '0.5rem' }}>Before</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 500, color: '#1A1A1A', marginBottom: '1.5rem' }}>{d.before}</div>
                  
                  <div style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '0.5rem' }}>TAAS Direction</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 500, color: '#1A1A1A', marginBottom: '1.5rem' }}>{d.taasDirection}</div>
                  
                  <div style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '0.5rem' }}>Outcome</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1A1A1A' }}>{d.finalDecision}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        )}

      </div>

      {/* ── PROJECT VISUALS ───────────────────────────────────────────────── */}
      {story.projectImages && story.projectImages.length > 0 && (
        <FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto 6rem', padding: '0 5%' }}>
            {story.projectImages.map((img, i) => (
              <div key={i} style={{ position: 'relative', aspectRatio: '4/3', background: '#F9F8F6' }}>
                <img src={img.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                {img.illustrative && (
                  <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', background: 'rgba(255,255,255,0.9)', padding: '0.4rem 0.8rem', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    Illustrative
                  </div>
                )}
              </div>
            ))}
          </div>
        </FadeIn>
      )}

      {/* ── PRICING CTA ────────────────────────────────────────────────────── */}
      <section className="cs-pricing-section">
        <h2 className="cs-pricing-title">Ask before you spend.</h2>
        <p className="cs-pricing-sub">
          Sometimes you don't need a full interior design project. You just need an experienced designer to look at the decision before you commit.
        </p>
        <Link href="/book" className="cs-btn-pri">Book a Design Hour</Link>
      </section>

      {/* ── FOOTER NAV ────────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', padding: '3rem 5%', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
        {idx === 0 ? (
          <Link href="/client-stories" style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#1A1A1A', textDecoration: 'none' }}>← All Stories</Link>
        ) : (
          <Link href={`/client-stories/${prevStory?.slug}`} style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#1A1A1A', textDecoration: 'none' }}>← Prev Story</Link>
        )}

        {idx === CLIENT_STORIES.length - 1 ? (
          <Link href="/client-stories" style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#1A1A1A', textDecoration: 'none' }}>All Stories →</Link>
        ) : (
          <Link href={`/client-stories/${nextStory?.slug}`} style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#1A1A1A', textDecoration: 'none' }}>Next Story →</Link>
        )}
      </div>

      <div style={{ textAlign: 'center', padding: '0 5% 3rem', fontSize: '0.75rem', color: '#888' }}>
        The stories shown on this page are fictionalized examples created to demonstrate the TAAS consultation experience. They are not presented as verified client testimonials.
      </div>
    </main>
  );
}
