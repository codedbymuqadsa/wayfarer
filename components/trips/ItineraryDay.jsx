import { Plus } from 'lucide-react';
import ActivityCard from './ActivityCard';
import { addDays, formatLongDate } from '@/lib/formatting';

export default function ItineraryDay({ day, startDate, activities, onAdd, onEdit, onRemove, onMove, outside = false, readOnly = false }) {
  const date = startDate ? addDays(startDate, day - 1) : '';
  return (
    <section className={`itin-day ${outside ? 'is-outside' : ''}`}>
      <header className="itin-day__head">
        <span className="itin-day__num">Day {day}</span>
        <div>
          <h4>{date ? formatLongDate(date) : `Day ${day}`}</h4>
          {outside && <small className="muted">Outside your current trip dates</small>}
        </div>
        {!readOnly && <button type="button" className="btn btn--outline btn--sm" onClick={onAdd}><Plus size={14} /> Add activity</button>}
      </header>
      {activities.length ? (
        <ol className="itin-day__list">
          {activities.map((a, i) => (
            <ActivityCard key={a.id} activity={a} isFirst={i === 0} isLast={i === activities.length - 1} readOnly={readOnly}
              onEdit={() => onEdit(a)} onRemove={() => onRemove(a)} onMove={(d) => onMove(a, d)} />
          ))}
        </ol>
      ) : (
        <p className="itin-day__empty">{readOnly ? 'Nothing planned for this day.' : 'Nothing planned yet — add your first activity.'}</p>
      )}
    </section>
  );
}
