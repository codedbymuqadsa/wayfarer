import { Suspense } from 'react';
import PageHero from '@/components/shared/PageHero';
import TripPlanner from '@/components/trips/TripPlanner';
import { U } from '@/data/images';

export const metadata = { title: 'Trip Planner', description: 'Create trips and build day-by-day itineraries.' };

export default function TripPlannerPage() {
  return (
    <>
      <PageHero compact eyebrow="Trip planner" title="Shape your journey" image={U(29, 2000)} crumbs={[{ label: 'Home', href: '/' }, { label: 'Trip Planner' }]} />
      <Suspense fallback={<div className="container section"><p className="muted">Loading planner…</p></div>}>
        <TripPlanner />
      </Suspense>
    </>
  );
}
