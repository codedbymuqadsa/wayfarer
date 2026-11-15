'use client';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { SearchX } from 'lucide-react';
import ExperienceFilters from './ExperienceFilters';
import ExperienceGrid from './ExperienceGrid';
import EmptyState from '@/components/shared/EmptyState';
import { experiences, EXPERIENCE_CATEGORIES } from '@/data/experiences';

const defaults = { q: '', category: 'All', destination: 'All', maxPrice: 1000, minRating: 0, sort: 'recommended' };

export default function ExperiencesExplorer() {
  const params = useSearchParams();
  const cat = params.get('category');
  const [f, setF] = useState({ ...defaults, category: EXPERIENCE_CATEGORIES.includes(cat) ? cat : 'All', q: params.get('q') || '' });

  const list = useMemo(() => {
    const t = f.q.trim().toLowerCase();
    const out = experiences.filter((x) =>
      (f.category === 'All' || x.category === f.category) &&
      (f.destination === 'All' || x.destinationSlug === f.destination) &&
      x.price <= f.maxPrice && x.rating >= f.minRating &&
      (!t || `${x.name} ${x.location} ${x.category} ${x.description}`.toLowerCase().includes(t))
    );
    const s = [...out];
    if (f.sort === 'price-asc') s.sort((a, b) => a.price - b.price);
    else if (f.sort === 'price-desc') s.sort((a, b) => b.price - a.price);
    else if (f.sort === 'rating') s.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
    else if (f.sort === 'duration') s.sort((a, b) => a.hours - b.hours);
    return s;
  }, [f]);

  const active = (f.q ? 1 : 0) + (f.category !== 'All') + (f.destination !== 'All') + (f.maxPrice < 1000) + (f.minRating > 0);
  const reset = () => setF(defaults);

  return (
    <div className="explorer">
      <ExperienceFilters f={f} onChange={setF} onReset={reset} active={active} />
      <p className="muted explorer__count" aria-live="polite">{list.length} {list.length === 1 ? 'experience' : 'experiences'}</p>
      {list.length ? <ExperienceGrid experiences={list} /> : <EmptyState icon={SearchX} title="No experiences found" text="Try a different category or loosen your filters." actionLabel="Clear filters" onAction={reset} />}
    </div>
  );
}
