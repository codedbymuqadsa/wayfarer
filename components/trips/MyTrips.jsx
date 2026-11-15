'use client';
import { useState } from 'react';
import Link from 'next/link';
import { CalendarCheck, History, Luggage, Map, Route, Trash2, XCircle } from 'lucide-react';
import BookingCard from './BookingCard';
import TripCard from './TripCard';
import ItineraryBuilder from './ItineraryBuilder';
import BookingSummary from '@/components/booking/BookingSummary';
import Modal from '@/components/shared/Modal';
import EmptyState from '@/components/shared/EmptyState';
import { useBookings } from '@/context/BookingContext';
import { useTrips } from '@/context/TripContext';
import { useToast } from '@/context/ToastContext';
import { formatDate, todayISO } from '@/lib/formatting';

const TABS = [
  { id: 'upcoming', label: 'Upcoming bookings', icon: CalendarCheck },
  { id: 'previous', label: 'Previous bookings', icon: History },
  { id: 'planned', label: 'Planned trips', icon: Map },
  { id: 'itineraries', label: 'Saved itineraries', icon: Route },
];

export default function MyTrips() {
  const { bookings, cancelBooking, removeBooking, hydrated } = useBookings();
  const { trips, deleteTrip, hydrated: tripsReady } = useTrips();
  const toast = useToast();
  const [tab, setTab] = useState('upcoming');
  const [view, setView] = useState(null);
  const [tripToDelete, setTripToDelete] = useState(null);
  const [bookingToDelete, setBookingToDelete] = useState(null);
  const [itinerary, setItinerary] = useState(null);

  if (!hydrated || !tripsReady) return <div className="container section"><p className="muted">Loading your trips…</p></div>;

  const today = todayISO();
  const upcoming = bookings.filter((b) => b.status !== 'Cancelled' && b.checkOut >= today);
  const previous = bookings.filter((b) => b.status === 'Cancelled' || b.checkOut < today);
  const itineraries = trips.filter((t) => t.activities.length > 0);
  const counts = { upcoming: upcoming.length, previous: previous.length, planned: trips.length, itineraries: itineraries.length };

  // Keep the open modal in sync with latest booking state
  const liveView = view ? bookings.find((b) => b.id === view.id) : null;
  const liveItinerary = itinerary ? trips.find((t) => t.id === itinerary.id) : null;
  const tripForBooking = liveView ? trips.find((t) => t.destinationSlug === liveView.destinationSlug) : null;

  return (
    <div className="container section section--tight">
      <div className="mytrips-head">
        <div>
          <span className="eyebrow">My Trips</span>
          <h1 className="page-title">Your journeys</h1>
          <p className="muted">Bookings, plans and itineraries — saved on this device.</p>
        </div>
        <div className="mytrips-head__actions">
          <Link href="/stays" className="btn btn--outline btn--sm">Find a stay</Link>
          <Link href="/trip-planner?new=1" className="btn btn--primary btn--sm">Plan a new trip</Link>
        </div>
      </div>

      <div className="tabs" role="tablist">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button key={id} type="button" role="tab" aria-selected={tab === id} className={`tabs__tab ${tab === id ? 'is-active' : ''}`} onClick={() => setTab(id)}>
            <Icon size={16} /> {label} <span className="tabs__count">{counts[id]}</span>
          </button>
        ))}
      </div>

      {tab === 'upcoming' && (upcoming.length ? <div className="booking-list">{upcoming.map((b) => <BookingCard key={b.id} booking={b} onView={setView} />)}</div>
        : <EmptyState icon={Luggage} title="No upcoming bookings" text="When you reserve a stay it will appear here with its booking reference." actionLabel="Browse stays" actionHref="/stays" />)}

      {tab === 'previous' && (previous.length ? <div className="booking-list">{previous.map((b) => <BookingCard key={b.id} booking={b} onView={setView} />)}</div>
        : <EmptyState icon={History} title="No previous bookings" text="Completed and cancelled bookings will be kept here for reference." />)}

      {tab === 'planned' && (trips.length ? <div className="trip-list">{trips.map((t) => <TripCard key={t.id} trip={t} onDelete={setTripToDelete} />)}</div>
        : <EmptyState icon={Map} title="No planned trips yet" text="Create a trip to start building a day-by-day itinerary." actionLabel="Plan a trip" actionHref="/trip-planner?new=1" />)}

      {tab === 'itineraries' && (itineraries.length ? (
        <div className="trip-list">
          {itineraries.map((t) => (
            <div key={t.id} className="itin-saved">
              <div>
                <h3>{t.name}</h3>
                <p className="muted">{t.activities.length} activities · {formatDate(t.startDate)} – {formatDate(t.endDate)}</p>
              </div>
              <div className="itin-saved__actions">
                <button type="button" className="btn btn--dark btn--sm" onClick={() => setItinerary(t)}>View itinerary</button>
                <Link href={`/trip-planner?trip=${t.id}`} className="btn btn--outline btn--sm">Edit in planner</Link>
              </div>
            </div>
          ))}
        </div>
      ) : <EmptyState icon={Route} title="No saved itineraries" text="Add activities or experiences to a trip and your itinerary will be saved here." actionLabel="Open the planner" actionHref="/trip-planner" />)}

      {/* Booking details */}
      <Modal open={!!liveView} onClose={() => setView(null)} title={liveView ? `Booking ${liveView.reference}` : ''} size="lg">
        {liveView && (
          <div className="booking-detail">
            <div className="booking-detail__head">
              <span className={`status status--${liveView.status.toLowerCase()}`}>{liveView.status}</span>
              <span className="muted">Booked {formatDate(new Date(liveView.createdAt).toISOString().slice(0, 10))}</span>
            </div>
            <div className="booking-detail__grid">
              <div>
                <h4>Guest</h4>
                <p>{liveView.guest.firstName} {liveView.guest.lastName}<br />{liveView.guest.email}<br />{liveView.guest.phone}</p>
                {liveView.guest.requests && <><h4>Special requests</h4><p>{liveView.guest.requests}</p></>}
                <h4>Your trip</h4>
                {tripForBooking ? (
                  <Link href={`/trip-planner?trip=${tripForBooking.id}`} className="link-arrow">View trip itinerary: {tripForBooking.name}</Link>
                ) : (
                  <Link href={`/trip-planner?new=1&destination=${liveView.destinationSlug}&start=${liveView.checkIn}&end=${liveView.checkOut}`} className="link-arrow">Plan an itinerary for this stay</Link>
                )}
              </div>
              <BookingSummary data={liveView} title="Stay summary" />
            </div>
            <div className="form-actions">
              {liveView.status !== 'Cancelled' && <button type="button" className="btn btn--outline" onClick={() => { cancelBooking(liveView.id); toast.push('Booking cancelled', 'info'); }}><XCircle size={16} /> Cancel booking</button>}
              <button type="button" className="btn btn--ghost is-danger" onClick={() => { setBookingToDelete(liveView); setView(null); }}><Trash2 size={16} /> Delete record</button>
            </div>
          </div>
        )}
      </Modal>

      {/* Itinerary view */}
      <Modal open={!!liveItinerary} onClose={() => setItinerary(null)} title={liveItinerary?.name} size="lg">
        {liveItinerary && <ItineraryBuilder trip={liveItinerary} readOnly />}
      </Modal>

      <Modal open={!!tripToDelete} onClose={() => setTripToDelete(null)} title="Remove this planned trip?" size="sm">
        <p>“{tripToDelete?.name}” and its itinerary will be removed.</p>
        <div className="form-actions">
          <button type="button" className="btn btn--outline" onClick={() => setTripToDelete(null)}>Keep</button>
          <button type="button" className="btn btn--danger" onClick={() => { deleteTrip(tripToDelete.id); setTripToDelete(null); toast.push('Trip removed', 'info'); }}>Remove trip</button>
        </div>
      </Modal>
      <Modal open={!!bookingToDelete} onClose={() => setBookingToDelete(null)} title="Delete this booking record?" size="sm">
        <p>This removes the mock booking {bookingToDelete?.reference} from your device. This cannot be undone.</p>
        <div className="form-actions">
          <button type="button" className="btn btn--outline" onClick={() => setBookingToDelete(null)}>Keep</button>
          <button type="button" className="btn btn--danger" onClick={() => { removeBooking(bookingToDelete.id); setBookingToDelete(null); toast.push('Booking record deleted', 'info'); }}>Delete</button>
        </div>
      </Modal>
    </div>
  );
}
