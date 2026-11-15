import Link from 'next/link';
import { Clock, MapPin } from 'lucide-react';
import Img from '@/components/shared/Img';
import WishlistButton from '@/components/shared/WishlistButton';
import { RatingBadge } from '@/components/shared/Rating';
import { formatCurrency } from '@/lib/formatting';

export default function ExperienceCard({ experience: x }) {
  return (
    <article className="exp-card">
      <Link href={`/experiences/${x.slug}`} className="exp-card__media" aria-label={`View ${x.name}`}>
        <Img src={x.image} alt={x.name} />
        <span className="exp-card__cat">{x.category}</span>
      </Link>
      <WishlistButton type="experience" slug={x.slug} label={x.name} />
      <div className="exp-card__body">
        <p className="exp-card__loc"><MapPin size={14} /> {x.location}</p>
        <h3><Link href={`/experiences/${x.slug}`}>{x.name}</Link></h3>
        <div className="exp-card__meta">
          <span><Clock size={14} /> {x.duration}</span>
          <RatingBadge rating={x.rating} count={x.reviewCount} />
        </div>
        <div className="exp-card__foot">
          <span><small>From</small> <strong>{formatCurrency(x.price)}</strong> <small>/ person</small></span>
          <Link href={`/experiences/${x.slug}`} className="btn btn--dark btn--sm">View details</Link>
        </div>
      </div>
    </article>
  );
}
