import Link from 'next/link';
import { CheckCircle2, Luggage, Home, Mail, Phone, User } from 'lucide-react';
import BookingSummary from './BookingSummary';
import { formatDate } from '@/lib/formatting';

const PAY = { card: 'Credit / Debit Card', paypal: 'PayPal', property: 'Pay at Property' };

export default function BookingConfirmation({ booking: b }) {
  return (
    <div className="confirmation">
      <div className="confirmation__head">
        <span className="confirmation__icon"><CheckCircle2 size={44} strokeWidth={1.3} /></span>
        <span className="eyebrow">Booking {b.status.toLowerCase()}</span>
        <h1>Your stay is booked</h1>
        <p>Thank you, {b.guest.firstName}. We have saved your reservation to My Trips and a summary is shown below.</p>
        <div className="confirmation__ref"><small>Booking reference</small><strong>{b.reference}</strong></div>
      </div>

      <div className="confirmation__grid">
        <div className="confirmation__details">
          <h3>Reservation details</h3>
          <dl className="detail-list">
            <div><dt>Status</dt><dd><span className={`status status--${b.status.toLowerCase()}`}>{b.status}</span></dd></div>
            <div><dt>Hotel</dt><dd>{b.hotelName}</dd></div>
            <div><dt>Room</dt><dd>{b.roomName}</dd></div>
            <div><dt>Check-in</dt><dd>{formatDate(b.checkIn, { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })}</dd></div>
            <div><dt>Check-out</dt><dd>{formatDate(b.checkOut, { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })}</dd></div>
            <div><dt>Guests</dt><dd>{b.guests} guest{b.guests > 1 ? 's' : ''}, {b.rooms} room{b.rooms > 1 ? 's' : ''}</dd></div>
            <div><dt>Payment</dt><dd>{PAY[b.paymentMethod] || '—'} (demonstration)</dd></div>
          </dl>
          <h3>Guest details</h3>
          <ul className="contact-list">
            <li><User size={16} /> {b.guest.firstName} {b.guest.lastName}</li>
            <li><Mail size={16} /> {b.guest.email}</li>
            <li><Phone size={16} /> {b.guest.phone}</li>
          </ul>
          {b.guest.requests && <p className="muted"><strong>Special requests:</strong> {b.guest.requests}</p>}
        </div>
        <BookingSummary data={b} title="Stay summary" />
      </div>

      <div className="confirmation__actions">
        <Link href="/my-trips" className="btn btn--primary"><Luggage size={16} /> View My Trips</Link>
        <Link href="/" className="btn btn--outline"><Home size={16} /> Back to Homepage</Link>
      </div>
    </div>
  );
}
