'use client';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { LayoutGrid, List, SearchX, SlidersHorizontal, X } from 'lucide-react';
import HotelFilters, { defaultFilters, PRICE_MAX } from './HotelFilters';
import HotelGrid from './HotelGrid';
import SearchSummary from '@/components/search/SearchSummary';
import EmptyState from '@/components/shared/EmptyState';
import { hotels } from '@/data/hotels';
import { getDestination } from '@/data/destinations';
import { readSearch } from '@/lib/search';
import { nightsBetween, formatCurrency } from '@/lib/formatting';

const SORTS = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'popular', label: 'Most Popular' },
];

export default function StaysResults() {
  const params = useSearchParams();
  const search = readSearch(params);
  const dest = getDestination(search.destination);
  const initialType = params.get('type');

  const [filters, setFilters] = useState({ ...defaultFilters, types: initialType ? [initialType] : [] });
  const [sort, setSort] = useState('recommended');
  const [view, setView] = useState('grid');
  const [drawer, setDrawer] = useState(false);

  const base = useMemo(() => {
    const t = search.destination.toLowerCase();
    if (dest) return hotels.filter((h) => h.destinationSlug === dest.slug);
    if (t) return hotels.filter((h) => `${h.name} ${h.location}`.toLowerCase().includes(t));
    return hotels;
  }, [search.destination, dest]);

  const results = useMemo(() => {
    const f = filters;
    const out = base.filter((h) =>
      h.price <= f.priceMax &&
      (!f.stars.length || f.stars.some((s) => (s === 3 ? h.stars <= 3 : h.stars === s))) &&
      h.rating >= f.rating &&
      (!f.types.length || f.types.includes(h.type)) &&
      f.amenities.every((a) => h.amenities.includes(a)) &&
      f.facilities.every((a) => h.facilities.includes(a)) &&
      f.features.every((a) => h.features.includes(a))
    );
    const sorted = [...out];
    if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') sorted.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
    else if (sort === 'popular') sorted.sort((a, b) => b.popularity - a.popularity);
    else sorted.sort((a, b) => Number(b.featured) - Number(a.featured) || b.rating - a.rating);
    return sorted;
  }, [base, filters, sort]);

  const nights = nightsBetween(search.checkIn, search.checkOut);

  // Active filter tags
  const tags = [];
  if (filters.priceMax < PRICE_MAX) tags.push({ label: `Up to ${formatCurrency(filters.priceMax)}`, clear: () => setFilters({ ...filters, priceMax: PRICE_MAX }) });
  filters.stars.forEach((s) => tags.push({ label: `${s}${s === 3 ? ' & below' : ''} stars`, clear: () => setFilters({ ...filters, stars: filters.stars.filter((x) => x !== s) }) }));
  if (filters.rating) tags.push({ label: `${filters.rating}+ rating`, clear: () => setFilters({ ...filters, rating: 0 }) });
  ['types', 'amenities', 'facilities', 'features'].forEach((k) => filters[k].forEach((v) => tags.push({ label: v, clear: () => setFilters({ ...filters, [k]: filters[k].filter((x) => x !== v) }) })));
  const reset = () => setFilters(defaultFilters);

  return (
    <div className="container stays">
      <SearchSummary search={search} destinationName={dest?.name || (search.destination ? search.destination : '')} count={results.length} />

      <div className="stays__layout">
        <aside className="stays__sidebar"><HotelFilters filters={filters} onChange={setFilters} onReset={reset} /></aside>

        <div className="stays__main">
          <div className="stays__toolbar">
            <button type="button" className="btn btn--outline btn--sm stays__filter-btn" onClick={() => setDrawer(true)}>
              <SlidersHorizontal size={16} /> Filters{tags.length ? ` (${tags.length})` : ''}
            </button>
            <strong className="stays__count">{results.length} {results.length === 1 ? 'result' : 'results'}</strong>
            <label className="select-inline">
              <span>Sort</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </label>
            <div className="view-toggle" role="group" aria-label="View mode">
              <button type="button" className={view === 'grid' ? 'is-active' : ''} onClick={() => setView('grid')} aria-label="Grid view" aria-pressed={view === 'grid'}><LayoutGrid size={18} /></button>
              <button type="button" className={view === 'list' ? 'is-active' : ''} onClick={() => setView('list')} aria-label="List view" aria-pressed={view === 'list'}><List size={18} /></button>
            </div>
          </div>

          {tags.length > 0 && (
            <div className="filter-tags">
              {tags.map((t) => (
                <button type="button" key={t.label} className="filter-tag" onClick={t.clear}>{t.label} <X size={13} /></button>
              ))}
              <button type="button" className="link-arrow" onClick={reset}>Clear filters</button>
            </div>
          )}

          {results.length ? (
            <HotelGrid hotels={results} view={view} search={search} nights={nights} columns={2} />
          ) : (
            <EmptyState icon={SearchX} title="No stays match your filters" text="Try widening your price range or removing a few filters to see more places." actionLabel="Clear filters" onAction={reset} />
          )}
        </div>
      </div>

      <div className={`drawer-backdrop ${drawer ? 'is-open' : ''}`} onClick={() => setDrawer(false)} aria-hidden="true" />
      <aside className={`drawer drawer--filters ${drawer ? 'is-open' : ''}`} aria-hidden={!drawer} aria-label="Filters">
        <div className="drawer__head">
          <h3>Filters</h3>
          <button type="button" onClick={() => setDrawer(false)} aria-label="Close filters"><X size={22} /></button>
        </div>
        <div className="drawer__scroll"><HotelFilters filters={filters} onChange={setFilters} onReset={reset} /></div>
        <div className="drawer__foot">
          <button type="button" className="btn btn--primary btn--block" onClick={() => setDrawer(false)}>Show {results.length} {results.length === 1 ? 'stay' : 'stays'}</button>
        </div>
      </aside>
    </div>
  );
}
