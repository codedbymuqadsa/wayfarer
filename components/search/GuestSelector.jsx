'use client';
import { useRef, useState } from 'react';
import { Minus, Plus, Users } from 'lucide-react';
import useOutsideClick from '@/hooks/useOutsideClick';
import { plural } from '@/lib/formatting';

export function Stepper({ label, sub, value, onChange, min = 1, max = 20 }) {
  return (
    <div className="stepper">
      <div>
        <strong>{label}</strong>
        {sub && <small>{sub}</small>}
      </div>
      <div className="stepper__ctrl">
        <button type="button" onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label={`Decrease ${label}`}><Minus size={16} /></button>
        <output aria-live="polite">{value}</output>
        <button type="button" onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} aria-label={`Increase ${label}`}><Plus size={16} /></button>
      </div>
    </div>
  );
}

// Combined guest + room counter popover
export default function GuestSelector({ guests, rooms, onChange, errors = {}, align = 'left' }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useOutsideClick(ref, () => setOpen(false), open);
  const err = errors.guests || errors.rooms;

  return (
    <div className={`search-field search-field--guests ${err ? 'has-error' : ''} ${open ? 'is-focus' : ''}`} ref={ref}>
      <label><Users size={14} /> Guests &amp; rooms</label>
      <button type="button" className="search-field__btn" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        {plural(guests, 'guest')} · {plural(rooms, 'room')}
      </button>
      {open && (
        <div className={`popover guest-pop guest-pop--${align}`}>
          <Stepper label="Guests" sub="Adults and children" value={guests} onChange={(v) => onChange({ guests: v, rooms: Math.min(rooms, v) })} max={20} />
          <Stepper label="Rooms" sub="Number of rooms" value={rooms} onChange={(v) => onChange({ guests: Math.max(guests, v), rooms: v })} max={10} />
          <button type="button" className="btn btn--dark btn--sm" onClick={() => setOpen(false)}>Done</button>
        </div>
      )}
      {err && <span className="field__error">{err}</span>}
    </div>
  );
}
