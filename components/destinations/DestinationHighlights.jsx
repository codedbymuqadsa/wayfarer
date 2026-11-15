import { CalendarDays, Clock, Sparkles } from 'lucide-react';

export default function DestinationHighlights({ destination: d }) {
  return (
    <div className="dest-overview">
      <div className="dest-overview__text">
        <span className="eyebrow">Overview</span>
        <h2>About {d.name}</h2>
        <p className="lead">{d.description}</p>
      </div>
      <aside className="dest-facts">
        <div className="dest-facts__item"><CalendarDays size={20} /><span><small>Best time to visit</small><strong>{d.bestSeason}</strong></span></div>
        <div className="dest-facts__item"><Clock size={20} /><span><small>Average stay</small><strong>{d.avgStay}</strong></span></div>
        <div className="dest-facts__item dest-facts__item--list">
          <Sparkles size={20} />
          <span>
            <small>Travel highlights</small>
            <ul>{d.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
          </span>
        </div>
      </aside>
    </div>
  );
}
