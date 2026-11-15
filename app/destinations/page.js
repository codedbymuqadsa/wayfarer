import PageHero from '@/components/shared/PageHero';
import SectionHeading from '@/components/shared/SectionHeading';
import DestinationGrid from '@/components/destinations/DestinationGrid';
import { destinations, REGIONS } from '@/data/destinations';
import { U } from '@/data/images';

export const metadata = { title: 'Destinations', description: 'Every WAYFARER destination, organised by region.' };

export default function DestinationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Destinations"
        title="Every destination, by region"
        description="A directory of the places we know and love, from European old towns to Indian Ocean atolls."
        image={U(54, 2000)}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Destinations' }]}
      />
      {REGIONS.map((region, i) => {
        const list = destinations.filter((d) => d.region === region);
        if (!list.length) return null;
        return (
          <section key={region} className={`section section--tight ${i % 2 ? 'section--alt' : ''}`}>
            <div className="container">
              <SectionHeading eyebrow={`${list.length} ${list.length === 1 ? 'destination' : 'destinations'}`} title={region} href={`/explore?region=${encodeURIComponent(region)}`} hrefLabel="Filter on Explore" />
              <DestinationGrid destinations={list} columns={4} />
            </div>
          </section>
        );
      })}
    </>
  );
}
