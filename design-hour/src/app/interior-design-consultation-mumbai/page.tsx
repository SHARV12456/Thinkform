"use client";

import Link from 'next/link';

const services = [
  ['01', 'LAYOUT REVIEW', 'Assess furniture placement, flow and space utilization'],
  ['02', 'KITCHEN CONSULTATION', 'Plan surfaces, storage and workflow effectively'],
  ['03', 'BEDROOM DESIGN', 'Create proportion, calm and restful environments'],
  ['04', 'MATERIAL GUIDANCE', 'Navigate finishes, colors and material selections'],
  ['05', 'WHOLE HOME CONSULTATION', 'Develop cohesive design direction across spaces'],
  ['06', 'COMMERCIAL CONSULTATION', 'Design decisions with business functionality in mind'],
];

const problems = [
  'Compact Mumbai apartments with layout constraints',
  'Storage planning in space-limited homes',
  'Kitchen layouts optimized for Indian cooking',
  'Managing renovation decisions and timelines',
  'Material selection in Mumbai climate',
  'Space optimization before approving quotes',
  'Society restrictions and building guidelines',
  'Existing layout problems and flow issues',
];

export default function MumbaiConsultationPage() {
  return (
    <main className="taas-new-home">
      <header className="taas-new-nav">
        <Link href="/" className="taas-wordmark">TAAS<span>®</span></Link>
        <nav className="taas-nav-menu">
          <Link href="/#services" className="taas-nav-link">SERVICES</Link>
          <Link href="/#process" className="taas-nav-link">PROCESS</Link>
          <Link href="/pricing" className="taas-nav-link">PRICING</Link>
          <a href="/#founder" className="taas-nav-link">ABOUT</a>
        </nav>
        <Link href="/book" className="taas-nav-book">START A CONVERSATION <b>↗</b></Link>
      </header>

      <section className="taas-new-hero">
        <div className="taas-hero-copy">
          <div className="taas-eyebrow"><span>DESIGN</span> CONSULTATION IN MUMBAI</div>
          <h1 className="taas-seo-h1">Design Consultation in Mumbai | Interior Design Consultation Services</h1>
          <div className="taas-hero-visual-headline">
            <span>BETTER DESIGN</span><br /><em>DECISIONS</em><br /><span>FOR MUMBAI SPACES.</span>
          </div>
          <p>TAAS helps Mumbai homeowners and businesses make better design decisions before they spend, build or settle for a compromise. Independent direction on layout, storage, materials and execution decisions.</p>
          <div className="taas-hero-actions">
            <Link href="/book" className="taas-big-cta">START WITH YOUR DECISION <span>↗</span></Link>
            <a href="#process" className="taas-text-link">HOW IT WORKS <span>↓</span></a>
          </div>
        </div>

        <div className="taas-hero-image-wrap">
          <div className="taas-hero-image" />
          <div className="taas-image-tag"><span>TAAS / MUMBAI</span><span>CONSULTATION / DIRECTION</span></div>
          <div className="taas-image-caption">BEFORE THE DECISION<br /><strong>INDEPENDENT DIRECTION.</strong></div>
        </div>

        <div className="taas-hero-side">SCROLL TO EXPLORE <span>↓</span></div>
      </section>

      <section className="taas-trust-row">
        <div><small>FOR WHO</small><strong>HOMEOWNERS +<br />BUSINESS OWNERS</strong></div>
        <div><small>LOCATIONS</small><strong>MUMBAI ACROSS<br />WESTERN LINE</strong></div>
        <div><small>FORMAT</small><strong>ONLINE +<br />IN-PERSON</strong></div>
        <div><small>STARTING AT</small><strong>₹1,999<br /><i>PER SESSION</i></strong></div>
      </section>

      <section className="taas-manifesto">
        <div className="taas-section-index">01 / THE CHALLENGE</div>
        <div className="taas-manifesto-main">
          <h2>MUMBAI SPACES<br /><span>DEMAND CLARITY.</span></h2>
          <p>Space constraints, building guidelines, society restrictions and timeline pressure make design decisions harder in Mumbai. Before you approve a layout, quote or material finish, you need an independent perspective that helps you think clearly.</p>
        </div>
        <div className="taas-manifesto-note">FOCUSED GUIDANCE<br />NO SALES PRESSURE<br />SMARTER DESIGN DECISIONS</div>
      </section>

      <section className="taas-focus" id="process">
        <div className="taas-section-index">02 / COMMON DESIGN PROBLEMS IN MUMBAI</div>
        <h2>WHAT BRINGS<br /><em>MUMBAI CLIENTS?</em></h2>
        <div className="taas-local-problems">
          <div className="taas-problems-list">
            {problems.map((problem, index) => (
              <div key={index} className="taas-problem-item">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{problem}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="taas-proof">
        <div className="taas-section-index">03 / OUR CONSULTATION PROCESS</div>
        <h2>60 MINUTES.<br /><span>DESIGN DIRECTION.</span></h2>
        <div className="taas-proof-grid">
          <article>
            <span>STEP 01</span>
            <h3>BRING THE<br />PROBLEM</h3>
            <p>Share the room, plan, material decision or quote you are stuck on.</p>
          </article>
          <article>
            <span>STEP 02</span>
            <h3>WE REVIEW<br />+ CHALLENGE</h3>
            <p>We look at the logic, constraints and trade-offs behind the current direction.</p>
          </article>
          <article>
            <span>STEP 03</span>
            <h3>LEAVE WITH<br />CLARITY</h3>
            <p>Leave with a sharper decision and the confidence to move forward.</p>
          </article>
        </div>
      </section>

      <section className="taas-services-detail">
        <div className="taas-section-index">04 / DESIGN CONSULTATION SERVICES</div>
        <h2>WHAT WE<br /><em>HELP WITH.</em></h2>
        <div className="taas-services-grid">
          {services.map(([num, title, text]) => (
            <article key={num} className="taas-service-item">
              <span>{num}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <Link href="/book">START HERE →</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="taas-locations-served">
        <div className="taas-section-index">05 / WHERE WE SERVE IN MUMBAI</div>
        <h2>ACROSS MUMBAI.<br /><em>WESTERN LINE FOCUS.</em></h2>
        <p className="taas-locations-intro-text">TAAS supports clients across Mumbai with particular depth in the Western suburbs and Western Line corridor, including:</p>
        
        <div className="taas-served-locations">
          <div className="taas-location-cluster">
            <h3><span>WESTERN SUBURBS</span></h3>
            <ul>
              <li>Borivali</li>
              <li>Kandivali</li>
              <li>Malad</li>
              <li>Goregaon</li>
              <li>Jogeshwari</li>
            </ul>
          </div>
          <div className="taas-location-cluster">
            <h3><span>ANDHERI + COASTAL</span></h3>
            <ul>
              <li>Andheri</li>
              <li>Versova</li>
              <li>Oshiwara</li>
              <li>Lokhandwala</li>
              <li>Juhu</li>
            </ul>
          </div>
          <div className="taas-location-cluster">
            <h3><span>CENTRAL WEST</span></h3>
            <ul>
              <li>Vile Parle</li>
              <li>Santacruz</li>
              <li>Khar</li>
              <li>Bandra</li>
            </ul>
          </div>
          <div className="taas-location-cluster">
            <h3><span>SOUTHERN MUMBAI</span></h3>
            <ul>
              <li>Mahim</li>
              <li>Dadar</li>
              <li>Prabhadevi</li>
              <li>Worli</li>
              <li>Lower Parel</li>
              <li>Churchgate</li>
            </ul>
          </div>
        </div>

        <p className="taas-locations-closing-text">Online sessions are also available for clients outside these zones or for a first-pass design review.</p>
      </section>

      <section className="taas-faq-section">
        <div className="taas-section-index">06 / FREQUENTLY ASKED</div>
        <h2>QUESTIONS<br /><em>ABOUT TAAS.</em></h2>
        <div className="taas-faq-items">
          <article>
            <h3>How is TAAS different from hiring an interior designer?</h3>
            <p>TAAS is advisory and decision-focused. We help you think clearly before you commit to a project, quote or design direction.</p>
          </article>
          <article>
            <h3>Do I need to prepare anything for my consultation?</h3>
            <p>Bring any floor plans, photos, quotations or material references relevant to the decision. The more specific your question, the more strategic the feedback.</p>
          </article>
          <article>
            <h3>Can you do online consultations in Mumbai?</h3>
            <p>Yes. We work online and in-person, depending on the type of decision and the stage you are at.</p>
          </article>
          <article>
            <h3>What areas of Mumbai do you serve?</h3>
            <p>We have strong coverage across the Western suburbs and Western Line corridor, with online consultations available across greater Mumbai.</p>
          </article>
          <article>
            <h3>How much does a consultation cost?</h3>
            <p>Consultations start at ₹1,999, with longer sessions available depending on complexity and project scope.</p>
          </article>
          <article>
            <h3>Can you consult on commercial spaces?</h3>
            <p>Yes. We help businesses shape clearer decisions for cafés, retail spaces, offices and hospitality environments.</p>
          </article>
        </div>
      </section>

      <section className="taas-proof-image">
        <div className="taas-proof-image-bg" />
        <div className="taas-proof-overlay"><span>TAAS / MUMBAI CONSULTATION</span><h2>BEFORE<br /><em>THE BUILD.</em></h2><p>Get clarity on the decision that matters most before your budget, timeline and design language lock in.</p></div>
      </section>

      <section className="taas-booking-banner">
        <div className="taas-section-index">07 / READY TO CONSULT?</div>
        <h2>LET'S BRING<br /><em>CLARITY.</em></h2>
        <p>Start a focused design conversation in Mumbai. Share the decision you are stuck on, choose a session, and we’ll help you think it through.</p>
        <Link href="/book" className="taas-final-cta">START A CONVERSATION <span>↗</span></Link>
      </section>

      <footer className="taas-new-footer">
        <div className="taas-footer-section">
          <Link href="/" className="taas-wordmark">TAAS<span>®</span></Link>
          <p>Design consultation for better decisions. Based in Mumbai, serving Western Line and beyond.</p>
        </div>

        <div className="taas-footer-section">
          <h4>SERVICES</h4>
          <ul>
            <li><a href="#process">Design Consultation</a></li>
            <li><a href="#process">Layout Review</a></li>
            <li><a href="#process">Material Guidance</a></li>
            <li><a href="#process">Space Planning</a></li>
            <li><Link href="/#services">Residential</Link></li>
            <li><Link href="/#services">Commercial</Link></li>
          </ul>
        </div>

        <div className="taas-footer-section">
          <h4>AREAS WE SERVE</h4>
          <ul>
            <li>Western Suburbs</li>
            <li>Andheri + Coastal</li>
            <li>Bandra + Central West</li>
            <li>Southern Mumbai</li>
            <li><Link href="/">See all locations</Link></li>
          </ul>
        </div>

        <div className="taas-footer-section taas-footer-cta">
          <Link href="/book" className="taas-footer-book-btn">START A CONVERSATION <span>↗</span></Link>
        </div>
      </footer>
    </main>
  );
}
