'use client';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, SearchX, X } from 'lucide-react';
import DestinationGrid from './DestinationGrid';
import EmptyState from '@/components/shared/EmptyState';
import { destinations, REGIONS, TRAVEL_TYPES, countries } from '@/data/destinations';

const SORTS = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'az', label: 'Name: A – Z' },
  { value: 'za', label: 'Name: Z – A' },
  { value: 'country', label: 'Country' },
];

export default function DestinationExplorer() {
  const params = useSearchParams();
  const [q, setQ] = useState('');
  const [region, setRegion] = useState(params.get('region') || 'All');
  const [type, setType] = useState(params.get('type') || 'All');
  const [country, setCountry] = useState('All');
  const [sort, setSort] = useState('recommended');

  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    let out = destinations.filter((d) =>
      (region === 'All' || d.region === region) &&
      (type === 'All' || d.types.includes(type)) &&
      (country === 'All' || d.country === country) &&
      (!t || `${d.name} ${d.country} ${d.intro}`.toLowerCase().includes(t))
    );
    if (sort === 'az') out = [...out].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'za') out = [...out].sort((a, b) => b.name.localeCompare(a.name));
    if (sort === 'country') out = [...out].sort((a, b) => a.country.localeCompare(b.country) || a.name.localeCompare(b.name));
    return out;
  }, [q, region, type, country, sort]);

  const active = (region !== 'All') + (type !== 'All') + (country !== 'All') + (q ? 1 : 0);
  const clear = () => { setQ(''); setRegion('All'); setType('All'); setCountry('All'); setSort('recommended'); };

  return (
    <div className="explorer">
      <div className="explorer__bar">
        <div className="explorer__search">
          <Search size={18} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search destinations or countries" aria-label="Search destinations" />
          {q && <button type="button" onClick={() => setQ('')} aria-label="Clear search"><X size={16} /></button>}
        </div>
        <label className="select-inline">
          <span>Sort by</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </label>
      </div>

      <div className="explorer__filters">
        <div className="filter-row">
          <span className="filter-row__label">Region</span>
          <div className="chip-row">
            {['All', ...REGIONS].map((r) => <button key={r} type="button" className={`chip ${region === r ? 'is-active' : ''}`} onClick={() => setRegion(r)}>{r}</button>)}
          </div>
        </div>
        <div className="filter-row">
          <span className="filter-row__label">Travel type</span>
          <div className="chip-row">
            {['All', ...TRAVEL_TYPES].map((r) => <button key={r} type="button" className={`chip ${type === r ? 'is-active' : ''}`} onClick={() => setType(r)}>{r}</button>)}
          </div>
        </div>
        <div className="filter-row">
          <span className="filter-row__label">Country</span>
          <select className="select-pill" value={country} onChange={(e) => setCountry(e.target.value)} aria-label="Country">
            <option value="All">All countries</option>
            {countries.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          {active > 0 && <button type="button" className="link-arrow" onClick={clear}>Clear all filters</button>}
        </div>
      </div>

      <p className="muted explorer__count" aria-live="polite">{list.length} {list.length === 1 ? 'destination' : 'destinations'}</p>
      {list.length ? (
        <DestinationGrid destinations={list} showSeason />
      ) : (
        <EmptyState icon={SearchX} title="No destinations match" text="Try removing a filter or searching for something else." actionLabel="Clear filters" onAction={clear} />
      )}
    </div>
  );
}
