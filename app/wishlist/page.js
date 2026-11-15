'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Heart, MapPin, Trash2 } from 'lucide-react';
import Img from '@/components/shared/Img';
import EmptyState from '@/components/shared/EmptyState';
import { RatingBadge } from '@/components/shared/Rating';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';
import { getDestination } from '@/data/destinations';
import { getHotel } from '@/data/hotels';
import { getExperience } from '@/data/experiences';
import { formatCurrency } from '@/lib/formatting';

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'hotel', label: 'Hotels' },
  { id: 'destination', label: 'Destinations' },
  { id: 'experience', label: 'Experiences' },
];

// Normalise each saved item into one card shape
function resolve(item) {
  if (item.type === 'hotel') {
    const h = getHotel(item.slug);
    return h && { ...item, name: h.name, image: h.image, location: h.location, href: `/hotels/${h.slug}`, rating: h.rating, count: h.reviewCount, price: `${formatCurrency(h.price)} / night`, kind: h.type };
  }
  if (item.type === 'destination') {
    const d = getDestination(item.slug);
    return d && { ...item, name: d.name, image: d.card, location: `${d.country} · ${d.region}`, href: `/destinations/${d.slug}`, detail: `Best time: ${d.bestSeason}`, kind: 'Destination' };
  }
  const x = getExperience(item.slug);
  return x && { ...item, name: x.name, image: x.image, location: x.location, href: `/experiences/${x.slug}`, rating: x.rating, count: x.reviewCount, price: `${formatCurrency(x.price)} / person`, kind: x.category };
}

export default function WishlistPage() {
  const { items, remove, clear, hydrated } = useWishlist();
  const toast = useToast();
  const [tab, setTab] = useState('all');

  if (!hydrated) return <div className="container section"><p className="muted">Loading your wishlist…</p></div>;

  const resolved = items.map(resolve).filter(Boolean);
  const list = tab === 'all' ? resolved : resolved.filter((i) => i.type === tab);
  const count = (id) => (id === 'all' ? resolved.length : resolved.filter((i) => i.type === id).length);

  return (
    <div className="container section section--tight">
      <div className="mytrips-head">
        <div>
          <span className="eyebrow">Wishlist</span>
          <h1 className="page-title">Saved for later</h1>
          <p className="muted">Hotels, destinations and experiences you love.</p>
        </div>
        {resolved.length > 0 && <button type="button" className="btn btn--outline btn--sm" onClick={() => { clear(); toast.push('Wishlist cleared', 'info'); }}>Clear all</button>}
      </div>

      <div className="tabs" role="tablist">
        {TABS.map((t) => (
          <button key={t.id} type="button" role="tab" aria-selected={tab === t.id} className={`tabs__tab ${tab === t.id ? 'is-active' : ''}`} onClick={() => setTab(t.id)}>
            {t.label} <span className="tabs__count">{count(t.id)}</span>
          </button>
        ))}
      </div>

      {list.length ? (
        <div className="wish-grid">
          {list.map((i) => (
            <article key={`${i.type}-${i.slug}`} className="wish-card">
              <Link href={i.href} className="wish-card__media"><Img src={i.image} alt={i.name} /><span className="tag">{i.kind}</span></Link>
              <div className="wish-card__body">
                <h3><Link href={i.href}>{i.name}</Link></h3>
                <p className="muted"><MapPin size={14} /> {i.location}</p>
                <div className="wish-card__meta">
                  {i.rating != null && <RatingBadge rating={i.rating} count={i.count} />}
                  {i.detail && <span className="muted">{i.detail}</span>}
                  {i.price && <strong>{i.price}</strong>}
                </div>
                <div className="wish-card__actions">
                  <Link href={i.href} className="btn btn--dark btn--sm">View details</Link>
                  <button type="button" className="btn btn--ghost btn--sm is-danger" onClick={() => { remove(i.type, i.slug); toast.push(`Removed ${i.name}`, 'info'); }}><Trash2 size={14} /> Remove</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState icon={Heart} title={tab === 'all' ? 'Your wishlist is empty' : `No saved ${tab === 'hotel' ? 'hotels' : tab === 'destination' ? 'destinations' : 'experiences'}`} text="Tap the heart on any stay, destination or experience to save it here." actionLabel="Explore destinations" actionHref="/explore" />
      )}
    </div>
  );
}
