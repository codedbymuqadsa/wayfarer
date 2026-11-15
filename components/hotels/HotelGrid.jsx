import HotelCard from './HotelCard';

export default function HotelGrid({ hotels, view = 'grid', search, nights = 0, columns = 3 }) {
  return (
    <div className={`hotel-grid hotel-grid--${view} hotel-grid--c${columns}`}>
      {hotels.map((h) => <HotelCard key={h.id} hotel={h} view={view} search={search} nights={nights} />)}
    </div>
  );
}
