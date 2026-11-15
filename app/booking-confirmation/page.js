'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Ticket } from 'lucide-react';
import BookingConfirmation from '@/components/booking/BookingConfirmation';
import EmptyState from '@/components/shared/EmptyState';
import { useBookings } from '@/context/BookingContext';

function Content() {
  const params = useSearchParams();
  const { getBooking, hydrated, bookings } = useBookings();
  const ref = params.get('ref');
  if (!hydrated) return <p className="muted">Loading confirmation…</p>;
  const booking = ref ? getBooking(ref) : bookings[0];
  if (!booking) return <EmptyState icon={Ticket} title="Booking not found" text="We could not find that reservation on this device." actionLabel="View My Trips" actionHref="/my-trips" />;
  return <BookingConfirmation booking={booking} />;
}

export default function BookingConfirmationPage() {
  return (
    <div className="container section section--tight">
      <Suspense fallback={<p className="muted">Loading confirmation…</p>}>
        <Content />
      </Suspense>
    </div>
  );
}
