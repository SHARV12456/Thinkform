"use client";
import React, { useState } from "react";

const PROBLEMS = ["Layout", "Materials", "Kitchen", "Bedroom", "Whole home", "Something else"];
const NEEDS = ["Second opinion", "Layout help", "Design direction", "Plan review", "Start execution"];
const SESSIONS = [
  { id: "30", label: "30 MIN", price: 1999 },
  { id: "60", label: "60 MIN", price: 3999 },
  { id: "90", label: "90 MIN", price: 5999 },
];

export default function WhatsAppBooking() {
  const [step, setStep] = useState(0);
  const [problem, setProblem] = useState<string | null>(null);
  const [need, setNeed] = useState<string | null>(null);
  const [bhk, setBhk] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string>("60");
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const next = () => setStep(s => Math.min(5, s + 1));
  const back = () => setStep(s => Math.max(0, s - 1));

  function sendWhatsApp() {
    const session = SESSIONS.find(s => s.id === sessionId);
    const parts = [
      `Hi TAAS, I want to book a consultation.`,
      `Problem: ${problem || '—'}`,
      `Need: ${need || '—'}`,
      `Space: ${bhk || '—'}`,
      `Session: ${session?.label || sessionId} (₹${session?.price?.toLocaleString() || '?'})`,
      `When: ${date || 'TBD'} ${time || ''}`,
      `Name: ${name}`,
      `Phone: ${phone}`,
    ];
    const text = encodeURIComponent(parts.join('\n'));
    const wa = `https://wa.me/?text=${text}`;
    window.open(wa, '_blank');
  }

  return (
    <div className="booking-root">
      <header className="booking-header">
        <div className="brand">TAAS</div>
      </header>

      <div className="booking-stage">
        <div className="progress">{String(step + 1).padStart(2, '0')} / 06</div>

        {step === 0 && (
          <section className="screen">
            <h1 className="huge">WHAT ARE YOU TRYING TO FIX?</h1>
            <div className="choices">
              {PROBLEMS.map(p => (
                <button key={p} className={`choice ${problem===p? 'active':''}`} onClick={()=>{ setProblem(p); setTimeout(next, 160); }}>{p}</button>
              ))}
            </div>
          </section>
        )}

        {step === 1 && (
          <section className="screen">
            <h2 className="huge">WHAT DO YOU NEED?</h2>
            <div className="choices col">
              {NEEDS.map(n => (<button key={n} className={`choice ${need===n? 'active':''}`} onClick={()=>{ setNeed(n); setTimeout(next, 160); }}>{n}</button>))}
            </div>
          </section>
        )}

        {step === 2 && (
          <section className="screen">
            <h2 className="huge">TELL US ABOUT YOUR SPACE</h2>
            <div className="choices">
              {['1 BHK','2 BHK','3 BHK','4+ BHK'].map(b=> (
                <button key={b} className={`choice ${bhk===b? 'active':''}`} onClick={()=>setBhk(b)}>{b}</button>
              ))}
            </div>
            <div className="cta-row"><button className="cta" onClick={next} disabled={!bhk}>Next →</button></div>
          </section>
        )}

        {step === 3 && (
          <section className="screen">
            <h2 className="huge">CHOOSE A SESSION</h2>
            <div className="sessions">
              {SESSIONS.map(s => (
                <div key={s.id} className={`session ${sessionId===s.id? 'active':''}`} onClick={()=>setSessionId(s.id)}>
                  <div>{s.label}</div>
                  <div>₹{s.price.toLocaleString()}</div>
                </div>
              ))}
            </div>
            <div className="cta-row"><button className="cta" onClick={next}>Select →</button></div>
          </section>
        )}

        {step === 4 && (
          <section className="screen">
            <h2 className="huge">PICK A DATE & TIME</h2>
            <div className="calendar">
              <input type="date" className="date-input" value={date} onChange={e=>setDate(e.target.value)} />
              <div className="times">
                {['10:00 AM','11:30 AM','2:00 PM','4:30 PM','6:00 PM'].map(t => (
                  <button key={t} className={`time ${time===t? 'active':''}`} onClick={()=>setTime(t)}>{t}</button>
                ))}
              </div>
            </div>
            <div className="cta-row"><button className="cta" onClick={next} disabled={!date||!time}>Next →</button></div>
          </section>
        )}

        {step === 5 && (
          <section className="screen">
            <h2 className="huge">CONFIRM & SEND VIA WHATSAPP</h2>
            <div className="form-grid">
              <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
              <input placeholder="Phone (with country code)" value={phone} onChange={e=>setPhone(e.target.value)} />
            </div>
            <div style={{marginTop: '1rem'}}>
              <button className="cta" onClick={sendWhatsApp} disabled={!name||!phone}>Send to WhatsApp →</button>
              <button className="cta muted" style={{marginLeft: '0.75rem'}} onClick={back}>Back</button>
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
