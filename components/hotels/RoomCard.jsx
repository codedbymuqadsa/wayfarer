import { BedDouble, Check, Maximize2, Users } from 'lucide-react';
import Img from '@/components/shared/Img';
import { formatCurrency } from '@/lib/formatting';

export default function RoomCard({ room, selected, onSelect }) {
  return (
    <article className={`room-card ${selected ? 'is-selected' : ''}`}>
      <div className="room-card__media"><Img src={room.image} alt={room.name} /></div>
      <div className="room-card__body">
        <h4>{room.name}</h4>
        <ul className="room-card__facts">
          <li><Users size={14} /> Sleeps {room.capacity}</li>
          <li><BedDouble size={14} /> {room.bed}</li>
          <li><Maximize2 size={14} /> {room.size} m²</li>
        </ul>
        <ul className="room-card__amenities">
          {room.amenities.map((a) => <li key={a}><Check size={13} /> {a}</li>)}
        </ul>
      </div>
      <div className="room-card__side">
        <span className="room-card__price"><strong>{formatCurrency(room.price)}</strong><small>per night</small></span>
        <button type="button" className={`btn ${selected ? 'btn--primary' : 'btn--outline'} btn--sm`} onClick={() => onSelect(room)} aria-pressed={selected}>
          {selected ? <><Check size={15} /> Selected</> : 'Select room'}
        </button>
      </div>
    </article>
  );
}
