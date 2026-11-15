'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AlertCircle, Check, Clock, MapPin, Plus, Users } from 'lucide-react';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import WishlistButton from '@/components/shared/WishlistButton';
import Modal from '@/components/shared/Modal';
import FormInput from '@/components/shared/FormInput';
import { RatingBadge } from '@/components/shared/Rating';
import HotelGallery from '@/components/hotels/HotelGallery';
import { Stepper } from '@/components/search/GuestSelector';
import { useTrips } from '@/context/TripContext';
import { useToast } from '@/context/ToastContext';
import { getDestination } from '@/data/destinations';
import { addDays, formatCurrency, formatShortDate, nightsBetween, plural, todayISO } from '@/lib/formatting';

export default function ExperienceDetails({ experience: x }) {
  const router = useRouter();
  const { trips, addTrip, addActivity } = useTrips();
  const toast = useToast();
  const [date, setDate] = useState(addDays(todayISO(), 21));
  const [people, setPeople] = useState(2);
  const [dateError, setDateError] = useState('');
  const [open, setOpen] = useState(false);
  const [tripId, setTripId] = useState('');
  const [day, setDay] = useState(1);
  const [time, setTime] = useState('09:00');

  const total = x.price * people;
  const dest = getDestination(x.destinationSlug);
  const selectedTrip = trips.find((t) => t.id === tripId);
  const dayCount = selectedTrip ? Math.max(1, nightsBetween(selectedTrip.startDate, selectedTrip.endDate) + 1) : 1;

  const validateDate = () => {
    if (!date) return 'Select a date';
    if (date < todayISO()) return 'Date cannot be in the past';
    return '';
  };

  const openModal = () => {
    const err = validateDate();
    setDateError(err);
    if (err) return;
    const match = trips.find((t) => t.destinationSlug === x.destinationSlug) || trips[0];
    setTripId(match?.id || '');
    if (match) {
      const idx = nightsBetween(match.startDate, date) + 1;
      setDay(idx >= 1 && idx <= nightsBetween(match.startDate, match.endDate) + 1 ? idx : 1);
    }
    setOpen(true);
  };

  const activityFor = () => ({
    title: x.name,
    time,
    location: x.location,
    notes: `${plural(people, 'participant')} · ${formatCurrency(total)} total · planned for ${formatShortDate(date)}`,
    experienceSlug: x.slug,
  });

  const addToExisting = () => {
    if (!selectedTrip) return;
    addActivity(selectedTrip.id, { ...activityFor(), day: Number(day) });
    setOpen(false);
    toast.push(`Added to ${selectedTrip.name}`);
    router.push(`/trip-planner?trip=${selectedTrip.id}`);
  };

  const createAndAdd = () => {
    const t = addTrip({ name: `${dest.name} getaway`, destinationSlug: dest.slug, startDate: date, endDate: addDays(date, 3), travelers: people, description: `A trip to ${dest.name} built around ${x.name}.` });
    addActivity(t.id, { ...activityFor(), day: 1 });
    setOpen(false);
    toast.push(`Created a ${dest.name} trip with this experience`);
    router.push(`/trip-planner?trip=${t.id}`);
  };

  return (
    <div className="hotel-detail exp-detail">
      <div className="container">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Experiences', href: '/experiences' }, { label: x.name }]} />
        <header className="hotel-header">
          <div>
            <div className="hotel-header__meta"><span className="tag">{x.category}</span></div>
            <h1>{x.name}</h1>
            <p className="hotel-header__loc"><MapPin size={16} /> {x.location} · <Link href={`/destinations/${x.destinationSlug}`}>Explore {x.destinationName}</Link></p>
          </div>
          <div className="hotel-header__side">
            <RatingBadge rating={x.rating} count={x.reviewCount} />
            <div className="hotel-header__btns"><WishlistButton type="experience" slug={x.slug} label={x.name} variant="pill" showText /></div>
          </div>
        </header>

        <HotelGallery images={x.images} name={x.name} />

        <div className="hotel-layout">
          <div className="hotel-layout__main">
            <section>
              <h2>About this experience</h2>
              <p className="lead">{x.description}</p>
              <div className="info-cards">
                <div><Clock size={18} /><span><small>Duration</small><strong>{x.duration}</strong></span></div>
                <div><Users size={18} /><span><small>Group size</small><strong>Up to {x.maxPeople} people</strong></span></div>
              </div>
            </section>
            <section>
              <h3>Highlights</h3>
              <ul className="check-list check-list--2">{x.highlights.map((h) => <li key={h}><Check size={16} /> {h}</li>)}</ul>
            </section>
            <section>
              <h3>What&rsquo;s included</h3>
              <ul className="check-list check-list--2">{x.included.map((h) => <li key={h}><Check size={16} /> {h}</li>)}</ul>
            </section>
            <section>
              <h3>Important information</h3>
              <ul className="policy-list">{x.importantInfo.map((h) => <li key={h}><AlertCircle size={16} /><span>{h}</span></li>)}</ul>
            </section>
          </div>

          <aside className="hotel-layout__side">
            <div className="booking-widget" id="booking-widget">
              <div className="booking-widget__price"><span><strong>{formatCurrency(x.price)}</strong> <small>/ person</small></span></div>
              <div className="booking-widget__fields">
                <FormInput label="Select a date" type="date" name="date" min={todayISO()} value={date} onChange={(e) => { setDate(e.target.value); setDateError(''); }} error={dateError} />
                <div className="stepper-box"><Stepper label="Participants" sub={`Up to ${x.maxPeople}`} value={people} onChange={setPeople} max={x.maxPeople} /></div>
              </div>
              <dl className="price-lines">
                <div><dt>{formatCurrency(x.price)} × {plural(people, 'person', 'people')}</dt><dd>{formatCurrency(total)}</dd></div>
                <div className="price-lines__total"><dt>Total</dt><dd>{formatCurrency(total)}</dd></div>
              </dl>
              <button type="button" className="btn btn--primary btn--block" onClick={openModal}><Plus size={16} /> Add to Trip</button>
              <WishlistButton type="experience" slug={x.slug} label={x.name} variant="outline" showText />
              <p className="booking-widget__note">Adds this experience to your saved itinerary. Free cancellation up to 24 hours before.</p>
            </div>
          </aside>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Add to your trip" size="md">
        {trips.length > 0 ? (
          <div className="activity-form">
            <FormInput as="select" label="Trip" name="trip" value={tripId} onChange={(e) => { setTripId(e.target.value); setDay(1); }} options={trips.map((t) => ({ value: t.id, label: t.name }))} />
            <div className="form-grid">
              <FormInput as="select" label="Day" name="day" value={day} onChange={(e) => setDay(Number(e.target.value))} options={Array.from({ length: dayCount }, (_, i) => ({ value: i + 1, label: `Day ${i + 1}` }))} />
              <FormInput label="Start time" type="time" name="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>
            <div className="form-actions">
              <button type="button" className="btn btn--outline" onClick={createAndAdd}>Create new {dest.name} trip instead</button>
              <button type="button" className="btn btn--primary" onClick={addToExisting}>Add to itinerary</button>
            </div>
          </div>
        ) : (
          <div className="activity-form">
            <p>You have no trips yet. We can create a short {dest.name} trip starting on {formatShortDate(date)} and add this experience to day one.</p>
            <div className="form-actions">
              <Link href={`/trip-planner?new=1&destination=${dest.slug}`} className="btn btn--outline">Customise a trip first</Link>
              <button type="button" className="btn btn--primary" onClick={createAndAdd}>Create trip &amp; add</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
