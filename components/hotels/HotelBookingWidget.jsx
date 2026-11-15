'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DateRangePicker from '@/components/search/DateRangePicker';
import GuestSelector from '@/components/search/GuestSelector';
import { useBookings } from '@/context/BookingContext';
import { computePricing } from '@/lib/pricing';
import { formatCurrency, nightsBetween, plural, todayISO } from '@/lib/formatting';
import { validateDates, validateGuests } from '@/lib/utilities';
import FormInput from '@/components/shared/FormInput';

export default function HotelBookingWidget({ hotel, room, search, onSearchChange, onRoomChange }) {
  const router = useRouter();
  const { setDraft } = useBookings();
  const [errors, setErrors] = useState({});

  const nights = nightsBetween(search.checkIn, search.checkOut);
  const pricing = computePricing({ price: room.price, nights, rooms: search.rooms });

  const reserve = () => {
    const errs = { ...validateDates(search.checkIn, search.checkOut, todayISO()), ...validateGuests(search.guests, search.rooms) };
    if (!errs.guests && search.guests > room.capacity * search.rooms) errs.guests = `${room.name} sleeps ${room.capacity} per room — add a room or choose a larger room`;
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setDraft({ hotelSlug: hotel.slug, roomId: room.id, checkIn: search.checkIn, checkOut: search.checkOut, guests: search.guests, rooms: search.rooms });
    router.push('/booking');
  };

  return (
    <div className="booking-widget" id="booking-widget">
      <div className="booking-widget__price">
        <span><strong>{formatCurrency(room.price)}</strong> <small>/ night</small></span>
        <small className="muted">{room.name}</small>
      </div>
      <div className="booking-widget__fields">
        <DateRangePicker checkIn={search.checkIn} checkOut={search.checkOut} onChange={(d) => { onSearchChange(d); setErrors({}); }} errors={errors} />
        <GuestSelector guests={search.guests} rooms={search.rooms} onChange={onSearchChange} errors={errors} />
        <FormInput as="select" label="Room" name="room" value={room.id} onChange={(e) => onRoomChange(hotel.rooms.find((r) => r.id === e.target.value))} options={hotel.rooms.map((r) => ({ value: r.id, label: `${r.name} — ${formatCurrency(r.price)}` }))} />
      </div>

      <dl className="price-lines">
        <div><dt>{formatCurrency(room.price)} × {plural(Math.max(nights, 0), 'night')}{search.rooms > 1 ? ` × ${search.rooms} rooms` : ''}</dt><dd>{formatCurrency(pricing.subtotal)}</dd></div>
        <div><dt>Taxes &amp; service fees</dt><dd>{formatCurrency(pricing.taxes)}</dd></div>
        <div className="price-lines__total"><dt>Total</dt><dd>{formatCurrency(pricing.total)}</dd></div>
      </dl>
      <button type="button" className="btn btn--primary btn--block" onClick={reserve}>Reserve</button>
      <p className="booking-widget__note">You won’t be charged yet. Free cancellation up to 48 hours before check-in.</p>
    </div>
  );
}
