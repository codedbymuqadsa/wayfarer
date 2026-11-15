import { Suspense } from 'react';
import PageHero from '@/components/shared/PageHero';
import SectionHeading from '@/components/shared/SectionHeading';
import DestinationGrid from '@/components/destinations/DestinationGrid';
import DestinationExplorer from '@/components/destinations/DestinationExplorer';
import { destinations, popularDestinationSlugs } from '@/data/destinations';
import { U } from '@/data/images';

export const metadata = { title: 'Explore Destinations', description: 'Browse beautiful destinations by region, travel style and country.' };

export default function ExplorePage() {
  const popular = popularDestinationSlugs.slice(0, 4).map((s) => destinations.find((d) => d.slug === s));
  return (
    <>
      <PageHero
        eyebrow="Explore"
        title="Discover your next destination"
        description="From alpine villages to island lagoons — filter by region, travel style and season to find the place that fits."
        image={U(21, 2000)}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Explore' }]}
      />
      <section className="section section--tight">
        <div className="container">
          <SectionHeading eyebrow="Trending now" title="Popular destinations" />
          <DestinationGrid destinations={popular} variant="tall" />
        </div>
      </section>
      <section className="section section--alt" id="all">
        <div className="container">
          <SectionHeading eyebrow="All destinations" title="Find your fit" />
          <Suspense fallback={<p className="muted">Loading destinations…</p>}>
            <DestinationExplorer />
          </Suspense>
        </div>
      </section>
    </>
  );
}
