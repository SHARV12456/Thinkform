'use client';

/**
 * TestimonialsRating Component
 * Displays star rating summary above testimonials
 * Shows aggregate rating and number of consultations
 */

interface TestimonialsRatingProps {
  rating?: number;
  consultations?: number;
}

export default function TestimonialsRating({
  rating = 4.9,
  consultations = 250,
}: TestimonialsRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="testimonials-rating-summary">
      <div className="rating-container">
        <span className="rating-stars">
          {Array.from({ length: 5 }).map((_, i) => {
            let starClass = '';
            if (i < fullStars) {
              starClass = 'filled';
            } else if (i === fullStars && hasHalfStar) {
              starClass = 'half';
            } else {
              starClass = 'empty';
            }
            return (
              <span key={i} className={`star ${starClass}`} aria-hidden>
                ★
              </span>
            );
          })}
        </span>
        <span className="rating-value">{rating}★</span>
      </div>
      <span className="rating-text">
        from {consultations.toLocaleString('en-IN')}+ consultations
      </span>
    </div>
  );
}
