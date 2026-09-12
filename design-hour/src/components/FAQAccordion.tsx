'use client'

import React, { useState } from 'react'

type QA = { id: string; q: string; a: React.ReactNode }

const defaultList: QA[] = [
  { id: 'q1', q: 'What happens during a Design Hour?', a: 'A focused one-hour conversation to clarify decisions, priorities and next steps.' },
  { id: 'q2', q: 'Do I need to prepare anything?', a: 'Bring photos, sketches or specific questions — anything that helps the conversation.' },
  { id: 'q3', q: 'Can I ask about an existing design?', a: 'Yes — we review existing plans, layouts and material choices.' },
  { id: 'q4', q: 'Can TAAS help with commercial spaces?', a: 'Yes — we consult on commercial layouts, flow and functional decisions.' },
  { id: 'q5', q: 'Can I discuss materials and budget?', a: 'Yes — we give practical guidance on material choices and trade-offs.' },
  { id: 'q6', q: 'Can I get a second opinion?', a: 'Yes — TAAS provides independent perspectives to validate decisions.' },
]

export default function FAQAccordion({ items = defaultList }: { items?: QA[] }) {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <div className="taas-faq">
      <div className="taas-faq-header">
        <p className="taas-faq-eyebrow">QUESTIONS BEFORE YOU BOOK</p>
        <h2 className="taas-faq-title">Still wondering if a Design Hour is right for you?</h2>
      </div>

      <div className="taas-faq-list">
        {items.map((it) => (
          <div key={it.id} className={`taas-faq-row ${open === it.id ? 'is-open' : ''}`}>
            <button
              className="taas-faq-toggle"
              aria-expanded={open === it.id}
              aria-controls={`ans-${it.id}`}
              onClick={() => setOpen((cur) => (cur === it.id ? null : it.id))}
            >
              <div className="taas-faq-num">{it.id.replace('q','0')}</div>
              <div className="taas-faq-q">{it.q}</div>
              <div className="taas-faq-icon" aria-hidden>{open === it.id ? '−' : '+'}</div>
            </button>

            <div id={`ans-${it.id}`} className="taas-faq-answer" role="region" aria-labelledby={`ans-${it.id}`}>
              <div className="taas-faq-answer-inner">{it.a}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

