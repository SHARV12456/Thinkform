"use client";

import Link from 'next/link';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const problemOptions = [
  { id: 'layout', label: 'Layout', detail: 'Is the space wrong — or is the plan wrong?' },
  { id: 'kitchen', label: 'Kitchen', detail: 'More storage? Better workflow? Better layout?' },
  { id: 'materials', label: 'Materials', detail: 'What looks good is not always what works.' },
  { id: 'storage', label: 'Storage', detail: 'How much storage do you actually need?' },
  { id: 'whole-home', label: 'Whole home', detail: 'Too many decisions. One direction.' },
  { id: 'commercial', label: 'Commercial', detail: 'Your space has to work as hard as your business.' },
  { id: 'second-opinion', label: 'Second opinion', detail: 'Already have a plan? Question it.' },
  { id: 'not-sure', label: 'Not sure', detail: 'Good. That is a valid question too.' },
];

export default function ServicesPage() {
  const [selected, setSelected] = useState('layout');
  const active = problemOptions.find((option) => option.id === selected) ?? problemOptions[0];

  return (
    <main className="taas-inner-page">
      <Navbar />

      <div className="taas-page-shell">
        <header className="taas-page-hero">
          <p className="taas-page-kicker">TAAS / services</p>
          <h1 className="taas-page-title">What are you trying to solve?</h1>
          <p className="taas-page-lead">
            You do not always need a full design project. Sometimes you need someone to help you make the call before the decision gets expensive.
          </p>
        </header>

        <section className="taas-section">
          <div className="taas-explorer">
            <div className="taas-explorer-list">
              {problemOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`taas-explorer-item ${selected === option.id ? 'is-active' : ''}`}
                  onClick={() => setSelected(option.id)}
                >
                  <span>{option.label}</span>
                  <span>↗</span>
                </button>
              ))}
            </div>

            <div className="taas-explorer-panel">
              <p className="taas-micro-label">Question / {active.label}</p>
              <h3>{active.label}</h3>
              <p>{active.detail}</p>

              <ul>
                {active.id === 'layout' && (
                  <>
                    <li>Flow</li>
                    <li>Furniture</li>
                    <li>Movement</li>
                    <li>Function</li>
                  </>
                )}
                {active.id === 'kitchen' && (
                  <>
                    <li>Workflow</li>
                    <li>Storage</li>
                    <li>Layout</li>
                    <li>Materials</li>
                  </>
                )}
                {active.id === 'materials' && (
                  <>
                    <li>Finish</li>
                    <li>Budget</li>
                    <li>Durability</li>
                    <li>Context</li>
                  </>
                )}
                {active.id === 'storage' && (
                  <>
                    <li>Usage</li>
                    <li>Cabinets</li>
                    <li>Daily logic</li>
                    <li>Visual calm</li>
                  </>
                )}
                {active.id === 'whole-home' && (
                  <>
                    <li>Sequence</li>
                    <li>Coherence</li>
                    <li>Budget</li>
                    <li>Direction</li>
                  </>
                )}
                {active.id === 'commercial' && (
                  <>
                    <li>Customer flow</li>
                    <li>Operations</li>
                    <li>Brand</li>
                    <li>Efficiency</li>
                  </>
                )}
                {active.id === 'second-opinion' && (
                  <>
                    <li>Challenge</li>
                    <li>Review</li>
                    <li>Refine</li>
                    <li>Confirm</li>
                  </>
                )}
                {active.id === 'not-sure' && (
                  <>
                    <li>Question</li>
                    <li>Assess</li>
                    <li>Prioritize</li>
                    <li>Direction</li>
                  </>
                )}
              </ul>

              <Link href="/book" className="taas-solid-btn">Let’s figure it out <span>↗</span></Link>
            </div>
          </div>
        </section>

        <section className="taas-section">
          <div className="taas-split">
            <div>
              <p className="taas-kicker">Why it works</p>
              <h2 className="taas-section-heading">Before the design, there is a decision.</h2>
            </div>
            <p className="taas-body-copy">
              TAAS is a decision platform, not a generic design service. The work is to challenge assumptions, cut through the noise, and give you a direction you can trust before you commit.
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
