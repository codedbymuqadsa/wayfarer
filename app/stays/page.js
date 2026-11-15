import { Suspense } from 'react';
import PageHero from '@/components/shared/PageHero';
import StaysResults from '@/components/hotels/StaysResults';
import { U } from '@/data/images';

export const metadata = { title: 'Stays', description: 'Search resorts, boutique hotels, villas and lodges.' };

export default function StaysPage({ searchParams }) {
  return (
    <>
      <PageHero compact eyebrow="Stays" title="Find your perfect stay" image={U(206, 2000)} crumbs={[{ label: 'Home', href: '/' }, { label: 'Stays' }]} />
      <section className="section section--tight">
        <Suspense fallback={<div className="container"><p className="muted">Loading stays…</p></div>}>
          <StaysResults key={searchParams?.type || 'all'} />
        </Suspense>
      </section>
    </>
  );
}
