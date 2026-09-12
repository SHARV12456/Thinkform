'use client';

/**
 * TrustBar Component
 * Displays logos, certifications, press mentions, or featured-in badges
 * Placeholder component ready for content updates
 */

interface TrustBarProps {
  variant?: 'light' | 'dark';
}

export default function TrustBar({ variant = 'light' }: TrustBarProps) {
  const trustItems = [
    { id: 1, label: 'Architectural Digest', tag: 'India' },
    { id: 2, label: 'Elle Decor', tag: 'India' },
    { id: 3, label: 'India Today Homes', tag: 'Design' },
    { id: 4, label: 'The Hindu', tag: 'Property' },
    { id: 5, label: 'Home & Décor', tag: 'Magazine' },
    { id: 6, label: 'Design Anthology', tag: 'Studio' },
  ];

  return (
    <section className={`trust-bar trust-bar-${variant}`}>
      <div className="trust-bar-container">
        <div className="trust-bar-heading">
          <p className="trust-bar-label">As featured in</p>
          <p className="trust-bar-subtitle">
            Design guidance, editorial thinking and practical home clarity.
          </p>
        </div>

        <div className="trust-bar-items">
          {trustItems.map((item) => (
            <div key={item.id} className="trust-bar-item">
              <div className="trust-bar-badge">
                <span className="trust-badge-main">{item.label}</span>
                <span className="trust-badge-tag">{item.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
