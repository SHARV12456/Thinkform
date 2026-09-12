// Generic location page template
// Usage: Copy page.tsx from a location directory and it will render using the location-specific data
// Location pages: /src/app/interior-design-consultation-[location-name]/page.tsx

"use client";

import Link from 'next/link';
import { LocationData } from '@/lib/locationData';

interface LocationPageProps {
  location: LocationData;
}

export function LocationPageTemplate({ location }: LocationPageProps) {
  return (
    <main className="taas-new-home">
      <header className="taas-new-nav">
        <Link href="/" className="taas-wordmark">TAAS<span>®</span></Link>
        <nav className="taas-nav-menu">
          <Link href="/#services" className="taas-nav-link">SERVICES</Link>
          <Link href="/#process" className="taas-nav-link">PROCESS</Link>
          <Link href="/pricing" className="taas-nav-link active">PRICING</Link>
          <a href="/#founder" className="taas-nav-link">ABOUT</a>
        </nav>
        <Link href="/book" className="taas-nav-book">START A CONVERSATION <b>↗</b></Link>
      </header>

      <section className="taas-new-hero">
        <div className="taas-hero-copy">
          <div className="taas-eyebrow"><span>DESIGN</span> CONSULTATION IN {location.name.toUpperCase()}</div>
          <h1 className="taas-seo-h1">Design Consultation in {location.name} | Independent Design Direction</h1>
          <div className="taas-hero-visual-headline">
            <span dangerouslySetInnerHTML={{ __html: location.heroHeadline }} />
          </div>
          <p>{location.heroSubtext}</p>
          <div className="taas-hero-actions">
            <Link href="/book" className="taas-big-cta">START WITH YOUR DECISION <span>↗</span></Link>
            <a href="#overview" className="taas-text-link">LEARN MORE <span>↓</span></a>
          </div>
        </div>

        <div className="taas-hero-image-wrap">
          <div className="taas-hero-image" />
          <div className="taas-image-tag"><span>TAAS / {location.region.toUpperCase()}</span><span>CONSULTATION / DIRECTION</span></div>
          <div className="taas-image-caption">BEFORE THE DECISION<br /><strong>INDEPENDENT DIRECTION.</strong></div>
        </div>

        <div className="taas-hero-side">SCROLL TO EXPLORE <span>↓</span></div>
      </section>

      <section className="taas-trust-row">
        <div><small>LOCATION</small><strong>{location.name.toUpperCase()}<br />{location.region}</strong></div>
        <div><small>FORMAT</small><strong>ONLINE +<br />IN-PERSON</strong></div>
        <div><small>FOR</small><strong>HOMES +<br />COMMERCIAL</strong></div>
        <div><small>STARTING AT</small><strong>₹1,999<br /><i>PER SESSION</i></strong></div>
      </section>

      <section className="taas-manifesto" id="overview">
        <div className="taas-section-index">01 / DESIGN IN {location.name.toUpperCase()}</div>
        <div className="taas-manifesto-main">
          <h2>EVERY SPACE<br /><span>HAS UNIQUE NEEDS.</span></h2>
          <p>{location.introText}</p>
        </div>
        <div className="taas-manifesto-note">LOCATION-SPECIFIC<br />DESIGN GUIDANCE<br />BUILT FOR {location.name.toUpperCase()}</div>
      </section>

      <section className="taas-focus">
        <div className="taas-section-index">02 / LOCAL DESIGN CHALLENGES</div>
        <h2>WHAT BRINGS CLIENTS<br /><em>TO {location.name.toUpperCase()}?</em></h2>
        <div className="taas-local-problems">
          <div className="taas-problems-list">
            {location.commonProblems.map((problem, index) => (
              <div key={index} className="taas-problem-item">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{problem}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="taas-proof">
        <div className="taas-section-index">03 / HOW WE HELP</div>
        <h2>60 MINUTES.<br /><span>DESIGN DIRECTION.</span></h2>
        <div className="taas-proof-grid">
          <article>
            <span>STEP 01</span>
            <h3>BRING THE<br />PROBLEM</h3>
            <p>Share your space, floor plan or design decision you are working through.</p>
          </article>
          <article>
            <span>STEP 02</span>
            <h3>WE REVIEW<br />+ CHALLENGE</h3>
            <p>We examine the constraints, opportunities and thinking behind your current direction.</p>
          </article>
          <article>
            <span>STEP 03</span>
            <h3>LEAVE WITH<br />CLARITY</h3>
            <p>Walk away with confidence about your next design move for {location.name} space.</p>
          </article>
        </div>
      </section>

      <section className="taas-locations-served">
        <div className="taas-section-index">04 / SERVING {location.name.toUpperCase()}</div>
        <h2>LOCAL<br /><em>EXPERTISE.</em></h2>
        <p className="taas-locations-intro-text">{location.uniqueConsiderations}</p>
        
        <div className="taas-served-locations">
          <div className="taas-location-cluster">
            <h3><span>NEARBY AREAS</span></h3>
            <ul>
              {location.nearbyAreas.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          </div>
          <div className="taas-location-cluster">
            <h3><span>CONSULTATION FORMAT</span></h3>
            <ul>
              <li>In-person sessions in {location.name}</li>
              {location.servesOnline && <li>Online consultations available</li>}
              <li>Flexible scheduling options</li>
              <li>30-60 minute sessions</li>
            </ul>
          </div>
        </div>

        <p className="taas-locations-closing-text">For clients outside {location.name}, online consultations are available for initial design reviews and guidance.</p>
      </section>

      <section className="taas-proof-image">
        <div className="taas-proof-image-bg" />
        <div className="taas-proof-overlay"><span>TAAS / {location.region}</span><h2>BEFORE<br /><em>THE BUILD.</em></h2><p>Design direction for {location.name} spaces from concept to decision.</p></div>
      </section>

      <section className="taas-booking-banner">
        <div className="taas-section-index">05 / READY?</div>
        <h2>START WITH YOUR<br /><em>DESIGN QUESTION.</em></h2>
        <p>Tell us what you're working through in {location.name}. We'll help you decide the right next step before the commitment gets expensive.</p>
        <Link href="/book" className="taas-final-cta">START A CONVERSATION <span>↗</span></Link>
      </section>

      <footer className="taas-new-footer">
        <div className="taas-footer-section">
          <Link href="/" className="taas-wordmark">TAAS<span>®</span></Link>
          <p>Design decision support for better moves. Serving {location.name} and across Mumbai.</p>
        </div>

        <div className="taas-footer-section">
          <h4>SERVICES</h4>
          <ul>
            <li><a href="/#process">Design Consultation</a></li>
            <li><a href="/#process">Layout Review</a></li>
            <li><a href="/#process">Material Guidance</a></li>
            <li><a href="/#process">Space Planning</a></li>
            <li><Link href="/">All Services</Link></li>
          </ul>
        </div>

        <div className="taas-footer-section">
          <h4>MORE AREAS</h4>
          <ul>
            <li><Link href="/interior-design-consultation-mumbai">All Mumbai</Link></li>
            <li><Link href="/">Western Line</Link></li>
            <li><Link href="/">Andheri & Coastal</Link></li>
            <li><Link href="/">Bandra & Central</Link></li>
            <li><Link href="/">South Mumbai</Link></li>
          </ul>
        </div>

        <div className="taas-footer-section taas-footer-cta">
          <Link href="/book" className="taas-footer-book-btn">START A CONVERSATION <span>↗</span></Link>
        </div>
      </footer>
    </main>
  );
}
