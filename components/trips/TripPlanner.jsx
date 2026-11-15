'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CalendarDays, ListChecks, MapPin, Pencil, Plus, Route, Timer, Trash2, Users } from 'lucide-react';
import TripForm from './TripForm';
import ItineraryBuilder, { tripDayCount } from './ItineraryBuilder';
import Modal from '@/components/shared/Modal';
import Img from '@/components/shared/Img';
import EmptyState from '@/components/shared/EmptyState';
import { useTrips } from '@/context/TripContext';
import { useToast } from '@/context/ToastContext';
import { getDestination } from '@/data/destinations';
import { formatDate, plural } from '@/lib/formatting';

export default function TripPlanner() {
  const router = useRouter();
  const params = useSearchParams();
  const { trips, addTrip, updateTrip, deleteTrip, hydrated } = useTrips();
  const toast = useToast();
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const tripId = params.get('trip');
  const trip = trips.find((t) => t.id === tripId) || trips[0];

  // Deep links: ?new=1&destination=bali&start=...&end=... and ?trip=id&edit=1
  useEffect(() => {
    if (!hydrated) return;
    if (params.get('new')) setCreating(true);
    if (params.get('edit') && trip) setEditing(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);

  if (!hydrated) return <div className="container section"><p className="muted">Loading your trips…</p></div>;

  const select = (id) => router.replace(`/trip-planner?trip=${id}`, { scroll: false });

  const create = (data) => {
    const t = addTrip(data);
    setCreating(false);
    toast.push('Trip created — start building your itinerary');
    router.replace(`/trip-planner?trip=${t.id}`, { scroll: false });
  };

  const initialNew = {
    destinationSlug: params.get('destination') || '',
    ...(params.get('start') ? { startDate: params.get('start') } : {}),
    ...(params.get('end') ? { endDate: params.get('end') } : {}),
    ...(params.get('destination') && getDestination(params.get('destination')) ? { name: `${getDestination(params.get('destination')).name} getaway` } : {}),
  };

  if (!trips.length && !creating) {
    return (
      <div className="container section">
        <div className="planner-intro">
          <div className="planner-intro__text">
            <span className="eyebrow">Trip planner</span>
            <h2>Plan a trip, day by day</h2>
            <p className="lead">Start with a destination and your dates, then add activities, times and notes. Reorder as plans change — everything is saved on this device.</p>
          </div>
          <div className="planner-intro__form"><TripForm initial={initialNew} onSubmit={create} /></div>
        </div>
      </div>
    );
  }

  const dest = trip ? getDestination(trip.destinationSlug) : null;

  return (
    <div className="container section section--tight">
      <div className="planner-tabs">
        {trips.map((t) => (
          <button key={t.id} type="button" className={`chip ${trip?.id === t.id ? 'is-active' : ''}`} onClick={() => select(t.id)}>{t.name}</button>
        ))}
        <button type="button" className="chip chip--add" onClick={() => setCreating(true)}><Plus size={14} /> New trip</button>
      </div>

      {trip && (
        <>
          <section className="trip-overview">
            <div className="trip-overview__media">{dest && <Img src={dest.hero} alt={dest.name} />}<div className="trip-overview__shade" /></div>
            <div className="trip-overview__body">
              <span className="eyebrow">Trip overview</span>
              <h2>{trip.name}</h2>
              {trip.description && <p>{trip.description}</p>}
              <ul className="trip-overview__stats">
                <li><MapPin size={18} /><span><small>Destination</small><strong>{dest ? `${dest.name}, ${dest.country}` : '—'}</strong></span></li>
                <li><CalendarDays size={18} /><span><small>Travel dates</small><strong>{formatDate(trip.startDate)} – {formatDate(trip.endDate)}</strong></span></li>
                <li><Timer size={18} /><span><small>Duration</small><strong>{plural(tripDayCount(trip), 'day')}</strong></span></li>
                <li><Users size={18} /><span><small>Travelers</small><strong>{trip.travelers}</strong></span></li>
                <li><ListChecks size={18} /><span><small>Planned activities</small><strong>{trip.activities.length}</strong></span></li>
              </ul>
              <div className="trip-overview__actions">
                <button type="button" className="btn btn--outline btn--sm" onClick={() => setEditing(true)}><Pencil size={14} /> Edit trip</button>
                <button type="button" className="btn btn--ghost btn--sm is-danger" onClick={() => setConfirmDelete(true)}><Trash2 size={14} /> Delete trip</button>
              </div>
            </div>
          </section>

          <div className="itinerary-head">
            <h2><Route size={22} /> Itinerary</h2>
            <p className="muted">Add activities to each day, then use the arrows to reorder.</p>
          </div>
          <ItineraryBuilder trip={trip} />
        </>
      )}

      <Modal open={creating} onClose={() => setCreating(false)} title="Create a new trip" size="lg">
        <TripForm initial={initialNew} onSubmit={create} onCancel={() => setCreating(false)} />
      </Modal>
      <Modal open={editing && !!trip} onClose={() => setEditing(false)} title="Edit trip" size="lg">
        {trip && <TripForm initial={trip} submitLabel="Save changes" onCancel={() => setEditing(false)} onSubmit={(data) => { updateTrip(trip.id, data); setEditing(false); toast.push('Trip updated'); }} />}
      </Modal>
      <Modal open={confirmDelete} onClose={() => setConfirmDelete(false)} title="Delete this trip?" size="sm">
        <p>“{trip?.name}” and its {trip?.activities.length} planned activities will be removed from this device.</p>
        <div className="form-actions">
          <button type="button" className="btn btn--outline" onClick={() => setConfirmDelete(false)}>Keep trip</button>
          <button type="button" className="btn btn--danger" onClick={() => { deleteTrip(trip.id); setConfirmDelete(false); toast.push('Trip deleted', 'info'); router.replace('/trip-planner', { scroll: false }); }}>Delete trip</button>
        </div>
      </Modal>
    </div>
  );
}
