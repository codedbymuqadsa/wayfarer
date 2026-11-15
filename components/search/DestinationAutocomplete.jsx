'use client';
import { useMemo, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';
import { destinations } from '@/data/destinations';
import useOutsideClick from '@/hooks/useOutsideClick';

// Autocomplete against local destination data. onSelect(destination | null)
export default function DestinationAutocomplete({ value, onChange, onSelect, error, label = 'Destination', placeholder = 'Where to?' }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  useOutsideClick(ref, () => setOpen(false), open);

  const suggestions = useMemo(() => {
    const t = value.trim().toLowerCase();
    const list = t ? destinations.filter((d) => `${d.name} ${d.country} ${d.region}`.toLowerCase().includes(t)) : destinations.slice(0, 6);
    return list.slice(0, 7);
  }, [value]);

  const choose = (d) => {
    onChange(d.name);
    onSelect(d);
    setOpen(false);
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setOpen(true); setActive((a) => Math.min(a + 1, suggestions.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === 'Enter' && open && suggestions[active]) { e.preventDefault(); choose(suggestions[active]); }
    else if (e.key === 'Escape') setOpen(false);
  };

  return (
    <div className={`search-field search-field--dest ${error ? 'has-error' : ''}`} ref={ref}>
      <label htmlFor="dest-input"><MapPin size={14} /> {label}</label>
      <input
        id="dest-input"
        autoComplete="off"
        value={value}
        placeholder={placeholder}
        role="combobox"
        aria-expanded={open}
        aria-autocomplete="list"
        onFocus={() => setOpen(true)}
        onChange={(e) => { onChange(e.target.value); onSelect(null); setOpen(true); setActive(0); }}
        onKeyDown={onKeyDown}
      />
      {open && (
        <ul className="popover autocomplete" role="listbox">
          {suggestions.length === 0 && <li className="autocomplete__empty">No destinations match “{value}”</li>}
          {suggestions.map((d, i) => (
            <li key={d.id} role="option" aria-selected={i === active} className={i === active ? 'is-active' : ''} onMouseEnter={() => setActive(i)} onMouseDown={(e) => { e.preventDefault(); choose(d); }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={d.card} alt="" />
              <span><strong>{d.name}</strong><small>{d.country} · {d.region}</small></span>
            </li>
          ))}
        </ul>
      )}
      {error && <span className="field__error">{error}</span>}
    </div>
  );
}
