'use client';
import { allAmenities, allFacilities, allFeatures, PROPERTY_TYPES } from '@/data/hotels';
import { formatCurrency } from '@/lib/formatting';

export const PRICE_MIN = 100;
export const PRICE_MAX = 1000;

export const defaultFilters = { priceMax: PRICE_MAX, stars: [], rating: 0, types: [], amenities: [], facilities: [], features: [] };

const toggle = (list, v) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

function CheckGroup({ title, options, selected, onToggle }) {
  return (
    <fieldset className="filter-group">
      <legend>{title}</legend>
      {options.map((o) => (
        <label key={o.value} className="check">
          <input type="checkbox" checked={selected.includes(o.value)} onChange={() => onToggle(o.value)} />
          <span className="check__box" aria-hidden="true" />
          <span>{o.label}</span>
        </label>
      ))}
    </fieldset>
  );
}

export default function HotelFilters({ filters, onChange, onReset }) {
  const set = (patch) => onChange({ ...filters, ...patch });
  const opts = (arr) => arr.map((v) => ({ value: v, label: v }));
  return (
    <div className="filters">
      <div className="filters__head">
        <h3>Filters</h3>
        <button type="button" className="link-arrow" onClick={onReset}>Clear all</button>
      </div>

      <fieldset className="filter-group">
        <legend>Max price per night</legend>
        <input type="range" min={PRICE_MIN} max={PRICE_MAX} step={10} value={filters.priceMax} onChange={(e) => set({ priceMax: Number(e.target.value) })} aria-label="Maximum price per night" />
        <div className="range-values"><span>{formatCurrency(PRICE_MIN)}</span><strong>Up to {formatCurrency(filters.priceMax)}</strong></div>
      </fieldset>

      <CheckGroup title="Star rating" options={[5, 4, 3].map((s) => ({ value: s, label: `${s} ${s === 5 ? 'stars' : 'stars'}${s === 3 ? ' & below' : ''}` }))} selected={filters.stars} onToggle={(v) => set({ stars: toggle(filters.stars, v) })} />

      <fieldset className="filter-group">
        <legend>Guest rating</legend>
        {[[0, 'Any'], [4.5, '4.5+ Excellent'], [4.7, '4.7+ Exceptional'], [4.8, '4.8+ Outstanding']].map(([v, label]) => (
          <label key={v} className="check check--radio">
            <input type="radio" name="guest-rating" checked={filters.rating === v} onChange={() => set({ rating: v })} />
            <span className="check__box" aria-hidden="true" />
            <span>{label}</span>
          </label>
        ))}
      </fieldset>

      <CheckGroup title="Property type" options={opts(PROPERTY_TYPES)} selected={filters.types} onToggle={(v) => set({ types: toggle(filters.types, v) })} />
      <CheckGroup title="Amenities" options={opts(allAmenities)} selected={filters.amenities} onToggle={(v) => set({ amenities: toggle(filters.amenities, v) })} />
      <CheckGroup title="Facilities" options={opts(allFacilities)} selected={filters.facilities} onToggle={(v) => set({ facilities: toggle(filters.facilities, v) })} />
      <CheckGroup title="Accommodation features" options={opts(allFeatures)} selected={filters.features} onToggle={(v) => set({ features: toggle(filters.features, v) })} />
    </div>
  );
}
