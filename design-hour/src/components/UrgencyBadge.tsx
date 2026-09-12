'use client';

/**
 * UrgencyBadge Component
 * Displays scarcity/urgency messaging near CTAs
 * Can be customized for different pages (homepage vs ads/landing pages)
 */

interface UrgencyBadgeProps {
  variant?: 'default' | 'strong'; // 'default' for homepage, 'strong' for ad landing pages
}

export default function UrgencyBadge({
  variant = 'default',
}: UrgencyBadgeProps) {
  const messages = {
    default: 'Only a few slots per week — every session is personally taken by Sharvayu Sawant.',
    strong: 'Limited slots available this week. Secure your consultation before slots fill up.',
  };

  return (
    <div className={`urgency-badge urgency-${variant}`}>
      <span className="urgency-icon" aria-hidden>⏱</span>
      <span className="urgency-text">{messages[variant]}</span>
    </div>
  );
}
