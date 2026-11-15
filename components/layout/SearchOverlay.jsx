'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, MapPin, BedDouble, Compass } from 'lucide-react';
import Modal from '@/components/shared/Modal';
import { destinations } from '@/data/destinations';
import { hotels } from '@/data/hotels';
import { experiences } from '@/data/experiences';

// Site-wide quick search (header search icon)
export default function SearchOverlay({ open, onClose }) {
  const [q, setQ] = useState('');
  const inputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      setQ('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (t.length < 2) return null;
    const match = (...f) => f.some((s) => s.toLowerCase().includes(t));
    return {
      destinations: destinations.filter((d) => match(d.name, d.country)).slice(0, 4),
      hotels: hotels.filter((h) => match(h.name, h.location)).slice(0, 4),
      experiences: experiences.filter((e) => match(e.name, e.location, e.category)).slice(0, 4),
    };
  }, [q]);

  const total = results ? results.destinations.length + results.hotels.length + results.experiences.length : 0;

  const submit = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    const first = results?.destinations[0];
    onClose();
    router.push(first ? `/destinations/${first.slug}` : `/stays?destination=${encodeURIComponent(q.trim())}`);
  };

  return (
    <Modal open={open} onClose={onClose} title="Search WAYFARER" size="md" variant="search">
      <form onSubmit={submit} className="search-overlay__form">
        <Search size={20} />
        <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search destinations, stays and experiences" aria-label="Search" />
      </form>
      {!results && (
        <div className="search-overlay__hint">
          <p className="muted">Popular searches</p>
          <div className="chip-row">
            {['Bali', 'Paris', 'Santorini', 'Tokyo', 'Maldives'].map((s) => (
              <button type="button" key={s} className="chip" onClick={() => setQ(s)}>{s}</button>
            ))}
          </div>
        </div>
      )}
      {results && total === 0 && <p className="muted search-overlay__none">No matches for “{q}”. Try a destination like Bali or Paris.</p>}
      {results && total > 0 && (
        <div className="search-overlay__results">
          {results.destinations.length > 0 && <Group title="Destinations" icon={<MapPin size={14} />}>{results.destinations.map((d) => <Row key={d.id} href={`/destinations/${d.slug}`} img={d.card} title={d.name} sub={d.country} onClose={onClose} />)}</Group>}
          {results.hotels.length > 0 && <Group title="Stays" icon={<BedDouble size={14} />}>{results.hotels.map((h) => <Row key={h.id} href={`/hotels/${h.slug}`} img={h.image} title={h.name} sub={h.location} onClose={onClose} />)}</Group>}
          {results.experiences.length > 0 && <Group title="Experiences" icon={<Compass size={14} />}>{results.experiences.map((x) => <Row key={x.id} href={`/experiences/${x.slug}`} img={x.image} title={x.name} sub={x.location} onClose={onClose} />)}</Group>}
        </div>
      )}
    </Modal>
  );
}

const Group = ({ title, icon, children }) => (
  <div className="search-overlay__group">
    <h4>{icon} {title}</h4>
    {children}
  </div>
);

const Row = ({ href, img, title, sub, onClose }) => (
  <Link href={href} className="search-overlay__row" onClick={onClose}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={img} alt="" loading="lazy" />
    <span><strong>{title}</strong><small>{sub}</small></span>
  </Link>
);
