'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BedDouble } from 'lucide-react';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import EmptyState from '@/components/shared/EmptyState';
import BookingForm from '@/components/booking/BookingForm';
import BookingSummary from '@/components/booking/BookingSummary';
import { useBookings } from '@/context/BookingContext';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/context/ToastContext';
import { getHotel } from '@/data/hotels';
import { computePricing } from '@/lib/pricing';
import { nightsBetween, todayISO } from '@/lib/formatting';
import { validateDates, validateGuests } from '@/lib/utilities';

export default function BookingPage() {
  const router = useRouter();
  const { draft, setDraft, addBooking, hydrated } = useBookings();
  const { user } = useUser();
  const toast = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [dateErrors, setDateErrors] = useState({});

  const data = useMemo(() => {
    if (!draft) return null;
    const hotel = getHotel(draft.hotelSlug);
    const room = hotel?.rooms.find((r) => r.id === draft.roomId);
    if (!hotel || !room) return null;
    const nights = nightsBetween(draft.checkIn, draft.checkOut);
    return {
      hotelSlug: hotel.slug, hotelName: hotel.name, hotelImage: hotel.image, stars: hotel.stars, location: hotel.location,
      destinationName: hotel.destinationName, destinationSlug: hotel.destinationSlug,
      roomName: room.name, roomPrice: room.price, roomCapacity: room.capacity,
      checkIn: draft.checkIn, checkOut: draft.checkOut, nights,
      checkInTime: hotel.checkIn, checkOutTime: hotel.checkOut,
      guests: draft.guests, rooms: draft.rooms,
      pricing: computePricing({ price: room.price, nights, rooms: draft.rooms }),
    };
  }, [draft]);

  if (!hydrated) return <div className="container section"><p className="muted">Loading your reservation…</p></div>;

  if (!data || submitted) {
    return (
      <div className="container section">
        {submitted ? <p className="muted">Confirming your booking…</p> : (
          <EmptyState icon={BedDouble} title="No stay selected yet" text="Choose a hotel and room first, then come back here to complete your reservation." actionLabel="Browse stays" actionHref="/stays" />
        )}
      </div>
    );
  }

  const submit = (values) => {
    // Re-validate dates and occupancy right before confirming
    const errs = { ...validateDates(data.checkIn, data.checkOut, todayISO()), ...validateGuests(data.guests, data.rooms) };
    if (!errs.guests && data.guests > data.roomCapacity * data.rooms) errs.guests = 'Guest count exceeds room capacity.';
    if (Object.keys(errs).length) {
      setDateErrors(errs);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const booking = addBooking({
      ...data,
      guest: { firstName: values.firstName.trim(), lastName: values.lastName.trim(), email: values.email.trim(), phone: values.phone.trim(), requests: values.requests.trim() },
      paymentMethod: values.payment,
    });
    setSubmitted(true);
    setDraft(null);
    toast.push('Booking confirmed');
    router.push(`/booking-confirmation?ref=${booking.reference}`);
  };

  return (
    <div className="container booking-page section section--tight">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Stays', href: '/stays' }, { label: data.hotelName, href: `/hotels/${data.hotelSlug}` }, { label: 'Booking' }]} />
      <h1 className="page-title">Complete your booking</h1>
      <p className="muted">Review your stay and enter guest details. <Link href={`/hotels/${data.hotelSlug}`} className="link-arrow">Change dates or room</Link></p>
      <div className="booking-layout">
        <BookingForm initial={{ firstName: user.firstName, lastName: user.lastName, email: user.email, phone: user.phone }} extraErrors={dateErrors} onSubmit={submit} />
        <BookingSummary data={data} />
      </div>
    </div>
  );
}
