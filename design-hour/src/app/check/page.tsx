'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, ArrowUpRight, MessageCircle, Check } from 'lucide-react';
import { getWhatsAppNumber } from '@/lib/mockData';

const WA_MSG = encodeURIComponent("Hi, I'd like to enquire about a TAAS design consultation.");
function getWaUrl() { return `https://wa.me/${getWhatsAppNumber()}?text=${WA_MSG}`; }

function useInView(t = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } }, { threshold: t });
    o.observe(el); return () => o.disconnect();
  }, [t]);
  return { ref, v };
}

function getHL(src: string|null, cmp: string|null) {
  if (src==='google'&&cmp==='consultation') return ['Interior Design Consultation in Mumbai','Get practical design direction without committing to a full interior project.'];
  if (src==='google'&&cmp==='second-opinion') return ['Already Have a Design? Get a Second Opinion.','Validate every critical decision before execution begins.'];
  if (src==='meta'&&cmp==='mistakes') return ['Before You Renovate,\nCheck These 3 Things.','Layout. Materials. Lighting. One wrong decision can become an expensive correction.'];
  if (src==='meta'&&cmp==='materials') return ["Choosing Materials?\nDon't Choose From Samples Alone.",'Get an expert eye on your selections before you commit.'];
  if (src==='meta'&&cmp==='second-opinion') return ['Before You Approve the Design,\nGet Another Perspective.','One session. Practical direction. No project commitment required.'];
  return ["Before You Spend on Your Interiors,\nCheck This.",'One wrong decision can become an expensive correction.'];
}

function Inner() {
  const sp = useSearchParams();
  const [hl, sub] = getHL(sp.get('utm_source'), sp.get('utm_campaign'));
  
  const [phase, setPhase] = useState<'intro'|'content'>('intro');
  useEffect(() => { const t = setTimeout(() => setPhase('content'), 1200); return () => clearTimeout(t); }, []);

  const heroRef = useRef<HTMLElement>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);
  useEffect(() => {
    const el = heroRef.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => setShowStickyBar(!e.isIntersecting), { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  const s1 = useInView(0.1);
  const s2 = useInView(0.1);
  const s3 = useInView(0.1);
  const s4 = useInView(0.1);

  return (
    <div style={{ background: '#0A0A0A', color: '#F4F4F4', overflowX: 'hidden', fontFamily: 'var(--font-primary)' }}>

      {/* Desktop Sticky Bar */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 60,
        background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        padding: '0.875rem clamp(1.5rem,5vw,4rem)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transform: showStickyBar ? 'translateY(0)' : 'translateY(-100%)',
        opacity: showStickyBar ? 1 : 0,
        transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.5s ease',
        pointerEvents: showStickyBar ? 'auto' : 'none',
      }} className="hidden md:flex">
        <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1rem', letterSpacing: '0.15em', color: '#fff' }}>TAAS</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', color: '#888', textTransform: 'uppercase' }}>60 MIN · ₹3,999</span>
          <Link href="/book" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#C4956A', color: '#000', padding: '0.75rem 1.75rem', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none' }}>
            Book Now
          </Link>
        </div>
      </div>

      {/* ── INTRO SEQUENCE ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 100, background: '#0A0A0A',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: phase === 'intro' ? 1 : 0, pointerEvents: phase === 'intro' ? 'auto' : 'none',
        transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1)'
      }}>
        <div style={{
          fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(3rem, 10vw, 8rem)',
          letterSpacing: '0.2em', color: '#fff',
          transform: phase === 'intro' ? 'scale(1)' : 'scale(1.1)',
          transition: 'transform 2s cubic-bezier(0.16,1,0.3,1)'
        }}>
          TAAS
        </div>
      </div>

      {/* ── HIGH-DRAMA HERO ── */}
      <section ref={heroRef} style={{ position: 'relative', minHeight: '100svh', paddingTop: '10vh', paddingBottom: '10vh', display: 'flex', flexDirection: 'column' }}>
        
        {/* Floating background image (asymmetrical crop) */}
        <div style={{
          position: 'absolute', top: 0, right: 0, width: '55%', height: '100%', zIndex: 0,
          opacity: phase === 'content' ? 0.7 : 0, transform: phase === 'content' ? 'translateX(0)' : 'translateX(40px)',
          transition: 'opacity 1.5s ease 0.3s, transform 1.5s cubic-bezier(0.16,1,0.3,1) 0.3s'
        }}>
          <Image src="/taas-hero-interior.jpg" alt="Interior" fill style={{ objectFit: 'cover' }} priority />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #0A0A0A 0%, transparent 40%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0A0A0A 0%, transparent 30%)' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 10, padding: '0 clamp(1.5rem,5vw,5rem)', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          
          <div style={{ maxWidth: '900px' }}>
            <h1 style={{
              fontFamily: 'var(--font-heading)', fontWeight: 400, lineHeight: 1.05,
              fontSize: 'clamp(3rem, 7vw, 6.5rem)', letterSpacing: '-0.03em', color: '#fff',
              marginBottom: '2rem',
              opacity: phase === 'content' ? 1 : 0, transform: phase === 'content' ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 1s ease 0.4s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.4s'
            }}>
              {hl}
            </h1>

            <p style={{ 
              fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 'clamp(1.5rem,2.5vw,2rem)', color: '#A3A3A3', maxWidth: '600px', lineHeight: 1.4, marginBottom: '4rem',
              opacity: phase === 'content' ? 1 : 0, transform: phase === 'content' ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 1s ease 0.6s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.6s'
            }}>
              {sub}
            </p>

            <div style={{ 
              display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center',
              opacity: phase === 'content' ? 1 : 0, transform: phase === 'content' ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 1s ease 0.7s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.7s'
            }}>
              <Link href="/book" style={{
                display: 'inline-flex', alignItems: 'center', gap: '1rem',
                background: '#C4956A', color: '#000',
                padding: '1.5rem 3rem', fontSize: '0.875rem', fontWeight: 800,
                letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none',
              }}>BOOK A SESSION <ArrowUpRight size={18} /></Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── UNCONVENTIONAL PROBLEM GRID ── */}
      <section style={{ padding: 'clamp(8rem, 15vw, 12rem) 0', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div ref={s1.ref} style={{ padding: '0 clamp(1.5rem,5vw,5rem)' }}>
          <h2 style={{ 
            fontFamily: 'var(--font-heading)', fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 800, textTransform: 'uppercase', color: '#fff', marginBottom: '6rem',
            opacity: s1.v ? 1 : 0, transform: s1.v ? 'none' : 'translateY(30px)', transition: 'all 0.8s ease'
          }}>
            Don't let assumptions<br/>
            <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400, color: '#C4956A', textTransform: 'none' }}>become expensive corrections.</span>
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              { n: '01', label: 'Layout Flow', desc: 'Are you using every square foot intelligently, or just placing furniture where it fits?' },
              { n: '02', label: 'Material Truth', desc: 'Are you choosing finishes that look good in a catalog, but fail in real-world application?' },
              { n: '03', label: 'Lighting Math', desc: 'Is your electrical plan built for mood and function, or did you leave it to the contractor?' },
            ].map((p, i) => (
              <div key={p.n} style={{
                position: 'relative', display: 'flex', flexDirection: 'column', gap: '1rem',
                padding: '4rem 0', borderTop: '1px solid rgba(255,255,255,0.1)',
                opacity: s1.v ? 1 : 0, transform: s1.v ? 'none' : 'translateX(-20px)', transition: `all 0.6s ease ${Math.min(0.2 + i * 0.15, 0.6)}s`,
                overflow: 'hidden'
              }} className="md:flex-row md:items-center md:justify-between group">
                
                {/* Lighting Effect on the 3rd item */}
                {p.n === '03' && (
                  <div style={{
                    position: 'absolute', top: '50%', left: '30%', transform: 'translate(-50%, -50%)',
                    width: '600px', height: '300px',
                    background: 'radial-gradient(ellipse, rgba(255,245,220,0.1) 0%, rgba(196,149,106,0.05) 40%, transparent 70%)',
                    pointerEvents: 'none', zIndex: 0,
                    transition: 'opacity 0.6s ease, transform 1s ease',
                    filter: 'blur(20px)'
                  }} className="opacity-40 group-hover:opacity-100 group-hover:scale-110" />
                )}

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '2rem', position: 'relative', zIndex: 1 }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: '#444', transition: 'color 0.4s' }} className={p.n === '03' ? "group-hover:text-[#C4956A]" : ""}>{p.n}</span>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-0.02em', color: '#fff', transition: 'text-shadow 0.4s' }} className={p.n === '03' ? "group-hover:drop-shadow-[0_0_15px_rgba(255,245,220,0.4)]" : ""}>{p.label}</h3>
                </div>
                <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 'clamp(1.25rem, 2vw, 1.5rem)', color: '#A3A3A3', maxWidth: '400px', lineHeight: 1.5, position: 'relative', zIndex: 1 }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STARK PRICING & CTA (FRICTION & SCARCITY) ── */}
      <section style={{ padding: 'clamp(8rem, 15vw, 12rem) 0', background: '#fff', color: '#0A0A0A' }}>
        <div ref={s2.ref} style={{ padding: '0 clamp(1.5rem,5vw,5rem)', display: 'grid', gridTemplateColumns: '1fr', gap: '4rem' }} className="md:grid-cols-2">
          
          <div style={{ opacity: s2.v ? 1 : 0, transform: s2.v ? 'none' : 'translateY(30px)', transition: 'all 0.8s ease' }}>
            <p style={{ fontSize: '0.875rem', fontWeight: 800, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C4956A', marginBottom: '2rem' }}>The Investment</p>
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(5rem, 12vw, 10rem)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.05em', color: '#0A0A0A', marginBottom: '1rem' }}>
              ₹3,999
            </p>
            <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.5rem', color: '#666', marginBottom: '3rem' }}>
              Strictly 60 Minutes. Limited to 4 spaces per week.
            </p>
            
            <Link href="/book" style={{
              display: 'inline-flex', alignItems: 'center', gap: '1rem',
              background: '#0A0A0A', color: '#fff',
              padding: '1.5rem 3rem', fontSize: '0.875rem', fontWeight: 800,
              letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none',
            }}>CHECK AVAILABILITY <ArrowUpRight size={18} /></Link>

            <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#C4956A', marginTop: '2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Don't pay for guesswork.
            </p>
            <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.5rem', maxWidth: '350px', lineHeight: 1.5 }}>
              Catch expensive layout and material mistakes before execution begins. We only accept sessions where we can add immediate value.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', justifyContent: 'center', opacity: s2.v ? 1 : 0, transform: s2.v ? 'none' : 'translateX(20px)', transition: 'all 0.8s ease 0.2s' }}>
            <p style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0A0A0A', marginBottom: '1rem' }}>What happens in 60 minutes?</p>
            {[
              'We dissect your floor plan & layout constraints.', 
              'We review your material & finish selections.', 
              'We identify structural & electrical blind spots.', 
              'You leave with a decisive action plan.'
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', paddingBottom: '1.5rem', borderBottom: '1px solid #E5E5E5' }}>
                <Check size={20} color="#C4956A" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '1.125rem', color: '#444', lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── BRUTALIST CLOSE (LOSS AVERSION) ── */}
      <section style={{ padding: 'clamp(8rem, 15vw, 15rem) 0', textAlign: 'center', position: 'relative' }}>
        <div ref={s3.ref} style={{ position: 'relative', zIndex: 10, padding: '0 clamp(1.5rem,5vw,5rem)', opacity: s3.v ? 1 : 0, transform: s3.v ? 'none' : 'translateY(40px)', transition: 'all 1s ease' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(4rem, 10vw, 8rem)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1, letterSpacing: '-0.04em', color: '#fff', marginBottom: '2rem' }}>
            DESIGN IS<br/>DECISION.
          </h2>
          <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: '#C4956A', marginBottom: '4rem' }}>
            Make the right ones. Before you sign the check.
          </p>
          <Link href="/book" style={{
            display: 'inline-flex', alignItems: 'center', gap: '1rem',
            background: '#C4956A', color: '#000',
            padding: '1.5rem 4rem', fontSize: '1rem', fontWeight: 800,
            letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none',
          }}>APPLY FOR A SESSION</Link>
        </div>
      </section>

      {/* MOBILE STICKY */}
      <div className="ad-sticky-cta md:hidden">
        <Link href="/book" style={{ display: 'block', textAlign: 'center', background: '#C4956A', color: '#000', padding: '1rem', fontSize: '0.875rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none' }}>
          BOOK · ₹3,999
        </Link>
      </div>
    </div>
  );
}

export default function AdPage() {
  return <Suspense fallback={<div style={{ minHeight: '100vh', background: '#0A0A0A' }} />}><Inner /></Suspense>;
}
