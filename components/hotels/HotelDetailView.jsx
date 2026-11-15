'use client';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Check, Clock, MapPin, Share2, ShieldCheck } from 'lucide-react';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import WishlistButton from '@/components/shared/WishlistButton';
import { RatingBadge, Stars, ratingLabel } from '@/components/shared/Rating';
import HotelGallery from './HotelGallery';
import RoomCard from './RoomCard';
import HotelReviews from './HotelReviews';
import HotelBookingWidget from './HotelBookingWidget';
import { getReviews } from '@/data/hotels';
import { useToast } from '@/context/ToastContext';
import { addDays, formatCurrency, todayISO } from '@/lib/formatting';
import { readSearch } from '@/lib/search';

export default function HotelDetailView({ hotel }) {
  const params = useSearchParams();
  const toast = useToast();
  const [search, setSearch] = useState({ checkIn: '', checkOut: '', guests: 2, rooms: 1 });
  const [room, setRoom] = useState(hotel.rooms[0]);
  const reviews = useMemo(() => getReviews(hotel), [hotel]);

  useEffect(() => {
    const s = readSearch(params);
    setSearch({
      checkIn: s.checkIn || addDays(todayISO(), 14),
      checkOut: s.checkOut || addDays(todayISO(), 18),
      guests: s.guests,
      rooms: s.rooms,
    });
  }, [params]);

  const patchSearch = (patch) => setSearch((s) => ({ ...s, ...patch }));

  const selectRoom = (r) => {
    setRoom(r);
    toast.push(`${r.name} selected`, 'info');
    document.getElementById('booking-widget')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: hotel.name, url });
      else { await navigator.clipboard.writeText(url); toast.push('Link copied to clipboard'); }
    } catch (e) {
      toast.push('Copy this page URL from your address bar', 'info');
    }
  };

  return (
    <div className="hotel-detail">
      <div className="container">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Stays', href: '/stays' }, { label: hotel.destinationName, href: `/destinations/${hotel.destinationSlug}` }, { label: hotel.name }]} />

        <header className="hotel-header">
          <div>
            <div className="hotel-header__meta"><Stars count={hotel.stars} size={16} /><span className="tag">{hotel.type}</span>{hotel.availability !== 'Available' && <span className="tag tag--warn">Limited availability</span>}</div>
            <h1>{hotel.name}</h1>
            <p className="hotel-header__loc"><MapPin size={16} /> {hotel.location} · <Link href={`/destinations/${hotel.destinationSlug}`}>Explore {hotel.destinationName}</Link></p>
          </div>
          <div className="hotel-header__side">
            <a href="#reviews" className="hotel-header__score"><RatingBadge rating={hotel.rating} count={hotel.reviewCount} /><span>{ratingLabel(hotel.rating)}</span></a>
            <div className="hotel-header__btns">
              <WishlistButton type="hotel" slug={hotel.slug} label={hotel.name} variant="pill" showText />
              <button type="button" className="wish-btn wish-btn--pill" onClick={share}><Share2 size={18} /><span>Share</span></button>
            </div>
          </div>
        </header>

        <HotelGallery images={hotel.images} name={hotel.name} />

        <div className="hotel-layout">
          <div className="hotel-layout__main">
            <section>
              <h2>About this stay</h2>
              <p className="lead">{hotel.description}</p>
              <h3 className="mt">Property highlights</h3>
              <ul className="check-list check-list--2">{hotel.highlights.map((h) => <li key={h}><Check size={16} /> {h}</li>)}</ul>
            </section>

            <section>
              <h3>Amenities</h3>
              <ul className="pill-list">{hotel.amenities.map((a) => <li key={a}>{a}</li>)}</ul>
              <h3 className="mt">Facilities &amp; services</h3>
              <ul className="pill-list">{hotel.facilities.map((a) => <li key={a}>{a}</li>)}</ul>
              {hotel.features.length > 0 && <>
                <h3 className="mt">Room features</h3>
                <ul className="pill-list">{hotel.features.map((a) => <li key={a}>{a}</li>)}</ul>
              </>}
            </section>

            <section>
              <h3>Check-in &amp; check-out</h3>
              <div className="info-cards">
                <div><Clock size={18} /><span><small>Check-in</small><strong>From {hotel.checkIn}</strong></span></div>
                <div><Clock size={18} /><span><small>Check-out</small><strong>Until {hotel.checkOut}</strong></span></div>
              </div>
              <h3 className="mt">Policies</h3>
              <ul className="policy-list">
                <li><ShieldCheck size={16} /><span><strong>Cancellation</strong> Free cancellation up to 48 hours before check-in. Later cancellations may be charged the first night.</span></li>
                <li><ShieldCheck size={16} /><span><strong>Children</strong> Children of all ages are welcome. Extra beds are available on request.</span></li>
                <li><ShieldCheck size={16} /><span><strong>Pets</strong> {hotel.amenities.includes('Pet Friendly') ? 'Pets are welcome on request; fees may apply.' : 'Pets are not allowed.'}</span></li>
                <li><ShieldCheck size={16} /><span><strong>Payment</strong> Pay at the property or in advance. A valid photo ID is required at check-in.</span></li>
              </ul>
            </section>

            <section id="rooms">
              <h2>Choose your room</h2>
              <div className="room-list">
                {hotel.rooms.map((r) => <RoomCard key={r.id} room={r} selected={r.id === room.id} onSelect={selectRoom} />)}
              </div>
            </section>

            <section id="reviews">
              <h2>Guest reviews</h2>
              <HotelReviews hotel={hotel} reviews={reviews} />
            </section>
          </div>

          <aside className="hotel-layout__side">
            <HotelBookingWidget hotel={hotel} room={room} search={search} onSearchChange={patchSearch} onRoomChange={setRoom} />
          </aside>
        </div>
      </div>

      <div className="mobile-reserve">
        <span><small>From</small> <strong>{formatCurrency(room.price)}</strong> <small>/ night</small></span>
        <button type="button" className="btn btn--primary btn--sm" onClick={() => document.getElementById('booking-widget')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>Reserve</button>
      </div>
    </div>
  );
}
