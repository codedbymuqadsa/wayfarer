import { CalendarDays, Hash, MapPin } from 'lucide-react';
import Img from '@/components/shared/Img';
import { formatDate, plural } from '@/lib/formatting';

export default function BookingCard({ booking: b, onView }) {
  return (
    <article className="booking-card">
      <div className="booking-card__media"><Img src={b.hotelImage} alt={b.hotelName} /></div>
      <div className="booking-card__body">
        <div className="booking-card__top">
          <span className={`status status--${b.status.toLowerCase()}`}>{b.status}</span>
          <span className="booking-card__ref"><Hash size={13} /> {b.reference}</span>
        </div>
        <h3>{b.hotelName}</h3>
        <ul className="booking-card__meta">
          <li><MapPin size={14} /> {b.destinationName}</li>
          <li><CalendarDays size={14} /> {formatDate(b.checkIn)} – {formatDate(b.checkOut)} · {plural(b.nights, 'night')}</li>
        </ul>
        <div className="booking-card__foot">
          <button type="button" className="btn btn--dark btn--sm" onClick={() => onView(b)}>View details</button>
        </div>
      </div>
    </article>
  );
}
