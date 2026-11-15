import Link from 'next/link';
import { BedDouble, CalendarDays, MapPin, Users } from 'lucide-react';
import Img from '@/components/shared/Img';
import { Stars } from '@/components/shared/Rating';
import { formatCurrency, formatDate, plural } from '@/lib/formatting';

// Works with a booking-in-progress summary object (see booking page) or a stored booking
export default function BookingSummary({ data, title = 'Your stay' }) {
  const { pricing } = data;
  return (
    <aside className="booking-summary">
      <h3>{title}</h3>
      <div className="booking-summary__hotel">
        <Img src={data.hotelImage} alt={data.hotelName} />
        <div>
          <Stars count={data.stars} size={12} />
          <strong>{data.hotelName}</strong>
          <small><MapPin size={12} /> {data.location}</small>
        </div>
      </div>
      <ul className="booking-summary__list">
        <li><BedDouble size={16} /><span><small>Room</small><strong>{data.roomName}</strong></span></li>
        <li><MapPin size={16} /><span><small>Destination</small><strong>{data.destinationName}</strong></span></li>
        <li><CalendarDays size={16} /><span><small>Check-in</small><strong>{formatDate(data.checkIn)} · from {data.checkInTime}</strong></span></li>
        <li><CalendarDays size={16} /><span><small>Check-out</small><strong>{formatDate(data.checkOut)} · by {data.checkOutTime}</strong></span></li>
        <li><Users size={16} /><span><small>Guests</small><strong>{plural(data.guests, 'guest')} · {plural(data.rooms, 'room')} · {plural(data.nights, 'night')}</strong></span></li>
      </ul>
      <dl className="price-lines">
        <div><dt>{formatCurrency(data.roomPrice)} × {plural(data.nights, 'night')}{data.rooms > 1 ? ` × ${data.rooms} rooms` : ''}</dt><dd>{formatCurrency(pricing.subtotal)}</dd></div>
        <div><dt>Taxes &amp; service fees</dt><dd>{formatCurrency(pricing.taxes)}</dd></div>
        <div className="price-lines__total"><dt>Total</dt><dd>{formatCurrency(pricing.total)}</dd></div>
      </dl>
      {data.hotelSlug && <Link href={`/hotels/${data.hotelSlug}`} className="link-arrow">View stay details</Link>}
    </aside>
  );
}
