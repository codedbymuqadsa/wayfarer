import { ArrowDown, ArrowUp, Clock, MapPin, Pencil, StickyNote, Trash2 } from 'lucide-react';
import { formatTime } from '@/lib/formatting';

export default function ActivityCard({ activity: a, isFirst, isLast, onEdit, onRemove, onMove, readOnly = false }) {
  return (
    <li className="activity">
      <div className="activity__time">{a.time ? formatTime(a.time) : 'Anytime'}</div>
      <div className="activity__body">
        <h5>{a.title}{a.experienceSlug && <span className="tag">Experience</span>}</h5>
        {a.location && <p><MapPin size={13} /> {a.location}</p>}
        {a.notes && <p className="activity__notes"><StickyNote size={13} /> {a.notes}</p>}
      </div>
      {!readOnly && (
        <div className="activity__actions">
          <button type="button" onClick={() => onMove(-1)} disabled={isFirst} aria-label={`Move ${a.title} up`}><ArrowUp size={16} /></button>
          <button type="button" onClick={() => onMove(1)} disabled={isLast} aria-label={`Move ${a.title} down`}><ArrowDown size={16} /></button>
          <button type="button" onClick={onEdit} aria-label={`Edit ${a.title}`}><Pencil size={16} /></button>
          <button type="button" onClick={onRemove} aria-label={`Remove ${a.title}`} className="is-danger"><Trash2 size={16} /></button>
        </div>
      )}
    </li>
  );
}
