'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const updateCursor = (x: number, y: number) => {
      dot.style.transform = `translate(${x}px, ${y}px)`;
      ring.style.transform = `translate(${x}px, ${y}px)`;
    };

    const onMove = (event: PointerEvent) => {
      updateCursor(event.clientX, event.clientY);
      setVisible(true);
    };

    const onLeave = () => setVisible(false);

    const onHover = (event: Event) => {
      const target = event.target as HTMLElement | null;
      const interactive = !!target?.closest('a, button, input, textarea, select, .taas-choice, .taas-explorer-item, .taas-btn, .taas-primary-btn, .taas-secondary-btn, .taas-solid-btn, .taas-pricing-cta, .taas-nav-link, .taas-menu-toggle, .taas-close-menu');
      ring.classList.toggle('expanded', interactive);
    };

    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerleave', onLeave);
    document.addEventListener('pointerover', onHover);
    document.addEventListener('pointerout', onHover);

    setVisible(true);
    updateCursor(window.innerWidth / 2, window.innerHeight / 2);

    return () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('pointerover', onHover);
      document.removeEventListener('pointerout', onHover);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="tc-ring"
        aria-hidden="true"
        style={{ opacity: visible ? 1 : 0 }}
      />
      <div
        ref={dotRef}
        className="tc-dot"
        aria-hidden="true"
        style={{ opacity: visible ? 1 : 0 }}
      />
    </>
  );
}
