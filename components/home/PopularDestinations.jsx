import SectionHeading from '@/components/shared/SectionHeading';
import DestinationGrid from '@/components/destinations/DestinationGrid';
import { destinations, popularDestinationSlugs } from '@/data/destinations';

export default function PopularDestinations() {
  const list = popularDestinationSlugs.map((s) => destinations.find((d) => d.slug === s));
  return (
    <section className="section">
      <div className="container">
        <SectionHeading eyebrow="Popular destinations" title="Where the world is travelling" description="Eight places our travellers keep coming back to — each with a stay, a story and a reason to linger." href="/explore" hrefLabel="All destinations" />
        <DestinationGrid destinations={list} />
      </div>
    </section>
  );
}
