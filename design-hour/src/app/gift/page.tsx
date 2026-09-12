'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Gift, Copy, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function GiftPage() {
  const [recipient, setRecipient] = useState('');
  const [sender, setSender] = useState('');
  const [message, setMessage] = useState('');
  const [occasion, setOccasion] = useState('New Home');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://taas.in/redeem?code=GIFT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ background: '#0A0A0A', color: '#F4F4F4', minHeight: '100svh', fontFamily: 'var(--font-primary)' }}>
      <Navbar />

      <div style={{ paddingTop: '120px', paddingBottom: '4rem', maxWidth: '1200px', margin: '0 auto', paddingLeft: 'clamp(1.5rem, 5vw, 4rem)', paddingRight: 'clamp(1.5rem, 5vw, 4rem)' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C4956A', marginBottom: '1rem' }}>
            TAAS Digital Gift
          </p>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '1.5rem' }}>
            Gift Design <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400, color: '#A3A3A3', textTransform: 'none' }}>Clarity.</span>
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#888', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
            The perfect gift for someone buying a new home or starting a renovation. Gift a 60-minute objective design review before they spend lakhs on execution.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem' }} className="lg:grid-cols-2">
          
          {/* Customizer Form */}
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--font-heading)', textTransform: 'uppercase', marginBottom: '2rem' }}>
              Customize Your Gift
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '0.5rem' }}>Occasion</label>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {['New Home', 'Renovation', 'Wedding', 'Just Because'].map(occ => (
                    <button 
                      key={occ}
                      onClick={() => setOccasion(occ)}
                      style={{
                        padding: '0.75rem 1.25rem', fontSize: '0.875rem', fontWeight: 600,
                        background: occasion === occ ? '#C4956A' : 'transparent',
                        color: occasion === occ ? '#000' : '#fff',
                        border: `1px solid ${occasion === occ ? '#C4956A' : '#333'}`,
                        transition: 'all 0.2s', cursor: 'pointer'
                      }}
                    >
                      {occ}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '0.5rem' }}>Recipient Name</label>
                <input 
                  type="text" 
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="Who is this for?"
                  style={{ width: '100%', padding: '1rem', background: 'transparent', border: '1px solid #333', color: '#fff', fontSize: '1rem', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '0.5rem' }}>Personal Message</label>
                <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Add a custom note..."
                  rows={3}
                  style={{ width: '100%', padding: '1rem', background: 'transparent', border: '1px solid #333', color: '#fff', fontSize: '1rem', outline: 'none', resize: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '0.5rem' }}>Your Name</label>
                <input 
                  type="text" 
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  placeholder="Who is this from?"
                  style={{ width: '100%', padding: '1rem', background: 'transparent', border: '1px solid #333', color: '#fff', fontSize: '1rem', outline: 'none' }}
                />
              </div>
            </div>

            <div style={{ marginTop: '3rem' }}>
              <Link href={`/book?gift=true&recipient=${encodeURIComponent(recipient)}`} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem',
                background: '#C4956A', color: '#0A0A0A', width: '100%',
                padding: '1.25rem', fontSize: '0.875rem', fontWeight: 800,
                letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none',
              }}>
                <Gift size={18} /> Purchase Gift · ₹3,999
              </Link>
            </div>
          </div>

          {/* Live Preview */}
          <div style={{ position: 'sticky', top: '120px', alignSelf: 'start' }}>
            <h2 style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '1.5rem', textAlign: 'center' }}>
              Live Preview
            </h2>
            
            <div style={{ 
              background: 'linear-gradient(135deg, #1C1A17 0%, #0A0A0A 100%)',
              border: '1px solid #333', padding: '3rem 2.5rem', position: 'relative', overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
            }}>
              {/* Decorative watermark */}
              <div style={{ position: 'absolute', top: '-10%', right: '-10%', fontSize: '12rem', fontFamily: 'var(--font-heading)', fontWeight: 900, color: 'rgba(255,255,255,0.02)', lineHeight: 0.8, pointerEvents: 'none' }}>
                TAAS
              </div>

              <div style={{ position: 'relative', zIndex: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.5rem', letterSpacing: '0.15em', color: '#fff' }}>TAAS</span>
                  <span style={{ fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C4956A', border: '1px solid #C4956A', padding: '0.25rem 0.75rem' }}>
                    {occasion}
                  </span>
                </div>

                <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.75rem', color: '#fff', marginBottom: '1rem', minHeight: '2.5rem' }}>
                  {recipient ? `For ${recipient},` : 'For ...,'}
                </p>

                <p style={{ fontSize: '0.875rem', color: '#A3A3A3', lineHeight: 1.6, minHeight: '4.2rem', marginBottom: '2rem' }}>
                  {message || "A 60-minute objective design review before you execute. Clarity before commitment."}
                </p>

                <div style={{ borderTop: '1px solid #333', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    From: <span style={{ color: '#F4F4F4', fontWeight: 600 }}>{sender || '...'}</span>
                  </p>
                  <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#C4956A' }}>60 MIN</p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <button onClick={handleCopy} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#888', background: 'transparent', border: 'none', cursor: 'pointer', transition: 'color 0.2s' }} className="hover:text-white">
                {copied ? <><Check size={14} color="#C4956A"/> Link Copied</> : <><Copy size={14} /> Copy demo link to share</>}
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
