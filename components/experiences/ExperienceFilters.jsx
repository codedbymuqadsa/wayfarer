'use client';
import { Search, X } from 'lucide-react';
import { EXPERIENCE_CATEGORIES } from '@/data/experiences';
import { destinations } from '@/data/destinations';

export const SORTS = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'duration', label: 'Shortest Duration' },
];

export default function ExperienceFilters({ f, onChange, onReset, active }) {
  const set = (patch) => onChange({ ...f, ...patch });
  const destOptions = destinations.filter((d) => d.slug);
  return (
    <div className="exp-filters">
      <div className="explorer__bar">
        <div className="explorer__search">
          <Search size={18} />
          <input value={f.q} onChange={(e) => set({ q: e.target.value })} placeholder="Search experiences, places or themes" aria-label="Search experiences" />
          {f.q && <button type="button" onClick={() => set({ q: '' })} aria-label="Clear search"><X size={16} /></button>}
        </div>
        <label className="select-inline">
          <span>Sort by</span>
          <select value={f.sort} onChange={(e) => set({ sort: e.target.value })}>
            {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </label>
      </div>
      <div className="filter-row">
        <span className="filter-row__label">Category</span>
        <div className="chip-row">
          {['All', ...EXPERIENCE_CATEGORIES].map((c) => <button type="button" key={c} className={`chip ${f.category === c ? 'is-active' : ''}`} onClick={() => set({ category: c })}>{c === 'Romantic' ? 'Romantic Experiences' : c}</button>)}
        </div>
      </div>
      <div className="filter-row filter-row--inline">
        <label className="select-inline">
          <span>Destination</span>
          <select value={f.destination} onChange={(e) => set({ destination: e.target.value })}>
            <option value="All">All destinations</option>
            {destOptions.map((d) => <option key={d.slug} value={d.slug}>{d.name}</option>)}
          </select>
        </label>
        <label className="select-inline">
          <span>Max price</span>
          <select value={f.maxPrice} onChange={(e) => set({ maxPrice: Number(e.target.value) })}>
            <option value={1000}>Any price</option>
            <option value={100}>Up to $100</option>
            <option value={150}>Up to $150</option>
            <option value={200}>Up to $200</option>
          </select>
        </label>
        <label className="select-inline">
          <span>Min rating</span>
          <select value={f.minRating} onChange={(e) => set({ minRating: Number(e.target.value) })}>
            <option value={0}>Any rating</option>
            <option value={4.5}>4.5+</option>
            <option value={4.8}>4.8+</option>
          </select>
        </label>
        {active > 0 && <button type="button" className="link-arrow" onClick={onReset}>Clear all filters</button>}
      </div>
    </div>
  );
}
