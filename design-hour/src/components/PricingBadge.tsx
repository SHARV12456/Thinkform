'use client';

/**
 * PricingBadge Component
 * Displays microcopy badge on pricing cards
 * E.g., "New here? Start here" for the 30-minute plan
 */

interface PricingBadgeProps {
  text: string;
  variant?: 'primary' | 'secondary';
}

export default function PricingBadge({
  text,
  variant = 'primary',
}: PricingBadgeProps) {
  return (
    <div className={`pricing-badge pricing-badge-${variant}`}>
      {text}
    </div>
  );
}
