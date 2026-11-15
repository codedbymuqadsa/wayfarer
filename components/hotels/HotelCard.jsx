import Link from 'next/link';
import { MapPin, Wifi, Waves, Sparkles, Coffee, Dumbbell, Utensils, Check } from 'lucide-react';
import Img from '@/components/shared/Img';
import WishlistButton from '@/components/shared/WishlistButton';
import { RatingBadge, Stars, ratingLabel } from '@/components/shared/Rating';
import { formatCurrency } from '@/lib/formatting';
import { searchToQuery } from '@/lib/search';

const AMENITY_ICONS = { 'Free Wi-Fi': Wifi, 'Swimming Pool': Waves, 'Spa & Wellness': Sparkles, 'Breakfast Included': Coffee, 'Fitness Centre': Dumbbell, 'On-site Restaurant': Utensils };

export default function HotelCard({ hotel: h, view = 'grid', search, nights = 0 }) {
  const query = search ? searchToQuery(search) : '';
  const href = `/hotels/${h.slug}${query}`;
  const rooms = search?.rooms || 1;
  const total = nights > 0 ? h.price * nights * rooms : null;

  return (
    <article className={`hotel-card hotel-card--${view}`}>
      <Link href={href} className="hotel-card__media" aria-label={`View ${h.name}`}>
        <Img src={h.image} alt={h.name} />
        <span className="hotel-card__type">{h.type}</span>
        {h.availability !== 'Available' && <span className="hotel-card__flag">Few rooms left</span>}
      </Link>
      <WishlistButton type="hotel" slug={h.slug} label={h.name} />
      <div className="hotel-card__body">
        <div className="hotel-card__top">
          <Stars count={h.stars} />
          <RatingBadge rating={h.rating} count={h.reviewCount} />
        </div>
        <h3><Link href={href}>{h.name}</Link></h3>
        <p className="hotel-card__loc"><MapPin size={14} /> {h.location}</p>
        {view === 'list' && <p className="hotel-card__desc">{h.description}</p>}
        <ul className="hotel-card__amenities">
          {h.amenities.slice(0, view === 'list' ? 5 : 3).map((a) => {
            const Icon = AMENITY_ICONS[a] || Check;
            return <li key={a}><Icon size={13} /> {a}</li>;
          })}
        </ul>
        <div className="hotel-card__foot">
          <div className="hotel-card__price">
            {view === 'list' && <span className="hotel-card__score">{ratingLabel(h.rating)}</span>}
            <span><small>From</small> <strong>{formatCurrency(h.price)}</strong> <small>/ night</small></span>
            {total != null && <small className="muted">{formatCurrency(total)} total{rooms > 1 ? ` · ${rooms} rooms` : ''}</small>}
          </div>
          <Link href={href} className="btn btn--dark btn--sm">View details</Link>
        </div>
      </div>
    </article>
  );
}
