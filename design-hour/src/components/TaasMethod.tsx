"use client";
import { useEffect, useRef, useState } from 'react';

const STEPS = [
  { num: '01', title: 'QUESTION', body: 'We begin with the real question behind the idea.' },
  { num: '02', title: 'ANALYSE', body: 'We analyse constraints, costs and spatial logic.' },
  { num: '03', title: 'DIRECTION', body: 'Clear, actionable direction you can execute.' },
  { num: '04', title: 'DECIDE', body: 'A confident decision — minimal risk, maximal clarity.' },
  { num: '05', title: 'BUILD', body: 'The right actions that avoid costly rework.' },
];

export default function TaasMethod() {
  const ref = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = total > 0 ? Math.max(0, Math.min(1, -r.top / total)) : 0;
      const idx = Math.min(STEPS.length - 1, Math.floor(p * STEPS.length));
      setActive(idx);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="taas-method-section" ref={ref} id="process" aria-label="TAAS Method">
      <div className="taas-method-sticky">
        <div className="taas-method-inner">
          <div className="taas-step-num">{STEPS[active].num}</div>
          <div>
            <h3 className="taas-step-word">{STEPS[active].title}</h3>
            <p className="taas-step-body">{STEPS[active].body}</p>
            <div className="taas-method-controls">
              <small style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em' }}>Scroll to move</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
