import { Star } from 'lucide-react';

// Compact rating badge: ★ 4.8 (1,204)
export function RatingBadge({ rating, count }) {
  return (
    <span className="rating-badge">
      <Star size={14} fill="currentColor" strokeWidth={0} />
      <strong>{rating.toFixed(1)}</strong>
      {count != null && <span className="muted">({new Intl.NumberFormat('en-US').format(count)})</span>}
    </span>
  );
}

// Row of filled stars for hotel classification
export function Stars({ count, size = 14 }) {
  return (
    <span className="stars" aria-label={`${count} star`}>
      {Array.from({ length: count }, (_, i) => (
        <Star key={i} size={size} fill="currentColor" strokeWidth={0} />
      ))}
    </span>
  );
}

export function ratingLabel(r) {
  if (r >= 4.8) return 'Exceptional';
  if (r >= 4.6) return 'Excellent';
  if (r >= 4.3) return 'Very good';
  return 'Good';
}
