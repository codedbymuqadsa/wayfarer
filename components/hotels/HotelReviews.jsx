'use client';
import { useState } from 'react';
import { Star } from 'lucide-react';
import { formatCount, formatDate } from '@/lib/formatting';
import { ratingLabel } from '@/components/shared/Rating';

export default function HotelReviews({ hotel, reviews }) {
  const [showAll, setShowAll] = useState(false);
  const list = showAll ? reviews : reviews.slice(0, 3);
  const bars = [5, 4, 3, 2, 1].map((n) => {
    const w = { 5: 74, 4: 19, 3: 5, 2: 1, 1: 1 }[n];
    return { n, w };
  });
  return (
    <div className="reviews">
      <div className="reviews__summary">
        <div className="reviews__score">
          <strong>{hotel.rating.toFixed(1)}</strong>
          <span>{ratingLabel(hotel.rating)}</span>
          <small>{formatCount(hotel.reviewCount)} guest reviews</small>
        </div>
        <div className="reviews__bars">
          {bars.map((b) => (
            <div key={b.n}><span>{b.n} <Star size={11} fill="currentColor" strokeWidth={0} /></span><i><b style={{ width: `${b.w}%` }} /></i><small>{b.w}%</small></div>
          ))}
        </div>
      </div>
      <div className="reviews__list">
        {list.map((r) => (
          <article key={r.id} className="review">
            <header>
              <span className="review__avatar" aria-hidden="true">{r.name.charAt(0)}</span>
              <div><strong>{r.name}</strong><small>{formatDate(r.date)}</small></div>
              <span className="review__rating"><Star size={14} fill="currentColor" strokeWidth={0} /> {r.rating.toFixed(1)}</span>
            </header>
            <h5>{r.title}</h5>
            <p>{r.text}</p>
          </article>
        ))}
      </div>
      {reviews.length > 3 && (
        <button type="button" className="btn btn--outline" onClick={() => setShowAll((s) => !s)}>{showAll ? 'Show fewer reviews' : `Show all ${reviews.length} featured reviews`}</button>
      )}
    </div>
  );
}
