import DestinationCard from './DestinationCard';

export default function DestinationGrid({ destinations, variant = 'default', columns = 4, showSeason = false }) {
  return (
    <div className={`dest-grid dest-grid--${columns}`}>
      {destinations.map((d) => <DestinationCard key={d.id} destination={d} variant={variant} showSeason={showSeason} />)}
    </div>
  );
}
