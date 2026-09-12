'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Decision {
  number: string;
  category: string;
  question: string;
  description: string;
  result: string;
  imagePlaceholder: string;
}

const decisions: Decision[] = [
  {
    number: '01',
    category: 'RESIDENTIAL',
    question: 'Layout Direction',
    description: "A homeowner wasn't sure how to approach an open-plan conversion. Too many layout options created decision paralysis.",
    result: 'Through focused review, we established a direction they could confidently take forward — prioritizing flow over configuration.',
    imagePlaceholder: 'residential-01'
  },
  {
    number: '02',
    category: 'KITCHEN',
    question: 'Storage vs. Style',
    description: 'Competing priorities: how much storage was actually needed versus maintaining visual simplicity in a compact space.',
    result: "A clear framework for storage decisions that didn't require compromising on the aesthetic they wanted.",
    imagePlaceholder: 'kitchen-01'
  },
  {
    number: '03',
    category: 'MATERIALS',
    question: 'Material Selection',
    description: 'Endless options paralyzed a decision. Which material actually made sense for their use case, budget and vision?',
    result: 'Clear evaluation criteria and confidence in the material chosen — no second-guessing on installation day.',
    imagePlaceholder: 'materials-01'
  },
  {
    number: '04',
    category: 'COMMERCIAL',
    question: 'Space Planning',
    description: "A small retail space needed rethinking. Existing layout wasn't optimizing for customer flow or product display.",
    result: 'A redesigned layout that improved both customer experience and operational efficiency without major reconstruction.',
    imagePlaceholder: 'commercial-01'
  }
];

export default function DecisionsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="taas-decisions">
      <div className="taas-section-index">06 / THE DECISIONS</div>
      <h2>DECISIONS<br /><em>WE HELPED MAKE.</em></h2>
      <p className="taas-decisions-intro">TAAS is built on the moments when clarity matters most. Here are some of the design decisions we've helped guide.</p>

      <div className="taas-decisions-grid">
        {decisions.map((decision, index) => (
          <article
            key={decision.number}
            className="taas-decision-card"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="decision-header">
              <span className="decision-number">{decision.number}</span>
              <span className="decision-category">{decision.category}</span>
            </div>

            <div className="decision-image-wrap">
              <div className={`decision-image decision-image-${decision.imagePlaceholder}`} />
              <div className="decision-image-overlay">
                <span>TAAS / {decision.category}</span>
              </div>
            </div>

            <div className="decision-content">
              <h3 className="decision-question">{decision.question}</h3>
              
              <div className="decision-text">
                <div className="decision-context">
                  <h4>THE QUESTION</h4>
                  <p>{decision.description}</p>
                </div>

                <div className="decision-result">
                  <h4>THE RESULT</h4>
                  <p>{decision.result}</p>
                </div>
              </div>
            </div>

            <div className="decision-footer">
              <Link href="/book" className="decision-cta">
                BRING YOUR DECISION <span>↗</span>
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="taas-decisions-closing">
        <p>These aren't portfolio pieces. These are real moments where clear design thinking clarified what to do next.</p>
        <Link href="/book" className="taas-text-link">START WITH YOUR DECISION <span>↗</span></Link>
      </div>
    </section>
  );
}
