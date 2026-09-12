'use client';

/**
 * RefundGuarantee Component
 * Displays refund/cancellation guarantee under pricing cards
 * Improves conversion by reducing booking friction
 */

export default function RefundGuarantee() {
  return (
    <div className="refund-guarantee">
      <span className="refund-icon" aria-hidden>✓</span>
      <span className="refund-text">Full refund up to 24hrs before your slot</span>
    </div>
  );
}
