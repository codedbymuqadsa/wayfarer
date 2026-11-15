'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import DestinationAutocomplete from './DestinationAutocomplete';
import DateRangePicker from './DateRangePicker';
import GuestSelector from './GuestSelector';
import { destinations, getDestination } from '@/data/destinations';
import { addDays, todayISO } from '@/lib/formatting';
import { validateDates, validateGuests } from '@/lib/utilities';

// Main search widget. `initial` pre-fills (used when editing a search), `onSearch` overrides navigation.
export default function TravelSearch({ initial, variant = 'hero', onSearch, submitLabel = 'Search stays' }) {
  const router = useRouter();
  const [text, setText] = useState('');
  const [selected, setSelected] = useState(null);
  const [dates, setDates] = useState({ checkIn: '', checkOut: '' });
  const [party, setParty] = useState({ guests: 2, rooms: 1 });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const dest = initial?.destination ? getDestination(initial.destination) : null;
    if (dest) { setText(dest.name); setSelected(dest); }
    else if (initial?.destination) setText(initial.destination);
    setDates({
      checkIn: initial?.checkIn || addDays(todayISO(), 14),
      checkOut: initial?.checkOut || addDays(todayISO(), 18),
    });
    setParty({ guests: Number(initial?.guests) || 2, rooms: Number(initial?.rooms) || 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial?.destination, initial?.checkIn, initial?.checkOut, initial?.guests, initial?.rooms]);

  const submit = (e) => {
    e.preventDefault();
    const errs = { ...validateDates(dates.checkIn, dates.checkOut, todayISO()), ...validateGuests(party.guests, party.rooms) };
    let match = selected;
    if (!match && text.trim()) {
      match = destinations.find((d) => d.name.toLowerCase() === text.trim().toLowerCase()) || null;
    }
    if (!text.trim()) errs.destination = 'Choose a destination';
    else if (!match) errs.destination = 'Pick a destination from the suggestions';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    const params = new URLSearchParams({ destination: match.slug, checkIn: dates.checkIn, checkOut: dates.checkOut, guests: String(party.guests), rooms: String(party.rooms) });
    if (onSearch) onSearch(params);
    else router.push(`/stays?${params.toString()}`);
  };

  return (
    <form className={`travel-search travel-search--${variant}`} onSubmit={submit} noValidate>
      <DestinationAutocomplete value={text} onChange={setText} onSelect={setSelected} error={errors.destination} />
      <DateRangePicker checkIn={dates.checkIn} checkOut={dates.checkOut} onChange={(d) => { setDates(d); setErrors((x) => ({ ...x, checkIn: '', checkOut: '' })); }} errors={errors} />
      <GuestSelector guests={party.guests} rooms={party.rooms} onChange={(p) => setParty(p)} errors={errors} align="right" />
      <button type="submit" className="btn btn--primary travel-search__submit">
        <Search size={18} /> {submitLabel}
      </button>
    </form>
  );
}
