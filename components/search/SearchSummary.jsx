'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CalendarDays, MapPin, Pencil, Users } from 'lucide-react';
import Modal from '@/components/shared/Modal';
import TravelSearch from './TravelSearch';
import { formatDate, nightsBetween, plural } from '@/lib/formatting';

export default function SearchSummary({ search, destinationName, count }) {
  const [editing, setEditing] = useState(false);
  const router = useRouter();
  const nights = nightsBetween(search.checkIn, search.checkOut);

  return (
    <>
      <div className="search-summary">
        <div className="search-summary__items">
          <div><MapPin size={16} /><span><small>Destination</small><strong>{destinationName || 'All destinations'}</strong></span></div>
          <div><CalendarDays size={16} /><span><small>Check-in</small><strong>{search.checkIn ? formatDate(search.checkIn) : 'Flexible'}</strong></span></div>
          <div><CalendarDays size={16} /><span><small>Check-out</small><strong>{search.checkOut ? formatDate(search.checkOut) : 'Flexible'}</strong></span></div>
          <div><Users size={16} /><span><small>Guests &amp; rooms</small><strong>{plural(search.guests, 'guest')}, {plural(search.rooms, 'room')}</strong></span></div>
        </div>
        <div className="search-summary__end">
          {nights > 0 && <span className="muted">{plural(nights, 'night')}</span>}
          <button type="button" className="btn btn--outline btn--sm" onClick={() => setEditing(true)}><Pencil size={14} /> Edit search</button>
        </div>
      </div>
      <p className="search-summary__count muted" aria-live="polite">{count} {count === 1 ? 'stay' : 'stays'} found{destinationName ? ` in ${destinationName}` : ''}</p>
      <Modal open={editing} onClose={() => setEditing(false)} title="Edit your search" size="lg">
        <TravelSearch
          variant="modal"
          initial={{ destination: search.destination, checkIn: search.checkIn, checkOut: search.checkOut, guests: search.guests, rooms: search.rooms }}
          submitLabel="Update search"
          onSearch={(params) => { setEditing(false); router.push(`/stays?${params.toString()}`); }}
        />
      </Modal>
    </>
  );
}
