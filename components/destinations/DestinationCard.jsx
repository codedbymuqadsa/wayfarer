import Link from 'next/link';
import { ArrowUpRight, CalendarDays } from 'lucide-react';
import Img from '@/components/shared/Img';
import WishlistButton from '@/components/shared/WishlistButton';

export default function DestinationCard({ destination: d, variant = 'default', showSeason = false }) {
  return (
    <article className={`dest-card dest-card--${variant}`}>
      <Link href={`/destinations/${d.slug}`} className="dest-card__link" aria-label={`Explore ${d.name}`}>
        <div className="dest-card__media">
          <Img src={d.card} alt={`${d.name}, ${d.country}`} />
          <div className="dest-card__shade" />
        </div>
        <div className="dest-card__body">
          <span className="dest-card__country">{d.country}</span>
          <h3>{d.name}</h3>
          <p>{d.intro}</p>
          {showSeason && <span className="dest-card__season"><CalendarDays size={14} /> Best: {d.bestSeason}</span>}
          <span className="dest-card__cta">Explore <ArrowUpRight size={16} /></span>
        </div>
      </Link>
      <WishlistButton type="destination" slug={d.slug} label={d.name} />
    </article>
  );
}
