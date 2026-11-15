import { Suspense } from 'react';
import PageHero from '@/components/shared/PageHero';
import ExperiencesExplorer from '@/components/experiences/ExperiencesExplorer';
import { U } from '@/data/images';

export const metadata = { title: 'Experiences', description: 'Curated tours and activities, from sunrise balloon flights to food walks.' };

export default function ExperiencesPage({ searchParams }) {
  return (
    <>
      <PageHero eyebrow="Experiences" title="Moments worth travelling for" description="Hand-picked tours, classes and adventures led by people who know their place best." image={U(125, 2000)} crumbs={[{ label: 'Home', href: '/' }, { label: 'Experiences' }]} />
      <section className="section section--alt">
        <div className="container">
          <Suspense fallback={<p className="muted">Loading experiences…</p>}>
            <ExperiencesExplorer key={searchParams?.category || 'all'} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
