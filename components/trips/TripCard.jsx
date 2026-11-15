import Link from 'next/link';
import { CalendarDays, ListChecks, Pencil, Trash2, Users } from 'lucide-react';
import Img from '@/components/shared/Img';
import { getDestination } from '@/data/destinations';
import { formatShortDate, nightsBetween, plural } from '@/lib/formatting';

export default function TripCard({ trip, onDelete }) {
  const d = getDestination(trip.destinationSlug);
  const days = nightsBetween(trip.startDate, trip.endDate) + 1;
  return (
    <article className="trip-card">
      <Link href={`/trip-planner?trip=${trip.id}`} className="trip-card__media">
        {d && <Img src={d.card} alt={d.name} />}
        <span className="tag">{d?.name || 'Trip'}</span>
      </Link>
      <div className="trip-card__body">
        <h3>{trip.name}</h3>
        <ul className="trip-card__meta">
          <li><CalendarDays size={14} /> {formatShortDate(trip.startDate)} – {formatShortDate(trip.endDate)} · {plural(days, 'day')}</li>
          <li><Users size={14} /> {plural(trip.travelers, 'traveler')}</li>
          <li><ListChecks size={14} /> {plural(trip.activities.length, 'planned activity', 'planned activities')}</li>
        </ul>
        {trip.description && <p className="trip-card__desc">{trip.description}</p>}
        <div className="trip-card__actions">
          <Link href={`/trip-planner?trip=${trip.id}`} className="btn btn--dark btn--sm">View itinerary</Link>
          <Link href={`/trip-planner?trip=${trip.id}&edit=1`} className="btn btn--outline btn--sm"><Pencil size={14} /> Edit</Link>
          <button type="button" className="btn btn--ghost btn--sm is-danger" onClick={() => onDelete(trip)}><Trash2 size={14} /> Remove</button>
        </div>
      </div>
    </article>
  );
}
