'use client';
import { useMemo, useRef, useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatDate, toISO, todayISO } from '@/lib/formatting';
import useOutsideClick from '@/hooks/useOutsideClick';

const DOW = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

function buildMonth(year, month) {
  const first = new Date(year, month, 1);
  const lead = (first.getDay() + 6) % 7; // Monday first
  const days = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < lead; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(toISO(new Date(year, month, d)));
  return cells;
}

// Two linked fields (check-in / check-out) sharing a range calendar popover
export default function DateRangePicker({ checkIn, checkOut, onChange, errors = {}, inLabel = 'Check-in', outLabel = 'Check-out' }) {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState('in'); // which date is being chosen next
  const [hover, setHover] = useState('');
  const today = todayISO();
  const seed = checkIn ? new Date(checkIn) : new Date();
  const [view, setView] = useState({ y: seed.getFullYear(), m: seed.getMonth() });
  const ref = useRef(null);
  useOutsideClick(ref, () => setOpen(false), open);

  const months = useMemo(() => [0, 1].map((o) => {
    const d = new Date(view.y, view.m + o, 1);
    return { y: d.getFullYear(), m: d.getMonth(), cells: buildMonth(d.getFullYear(), d.getMonth()) };
  }), [view]);

  const shift = (n) => setView((v) => { const d = new Date(v.y, v.m + n, 1); return { y: d.getFullYear(), m: d.getMonth() }; });
  const canGoBack = view.y > new Date().getFullYear() || view.m > new Date().getMonth();

  const openFor = (p) => { setPhase(p); setOpen(true); };

  const pick = (iso) => {
    if (phase === 'in' || !checkIn || iso <= checkIn) {
      onChange({ checkIn: iso, checkOut: checkOut && checkOut > iso ? checkOut : '' });
      setPhase('out');
    } else {
      onChange({ checkIn, checkOut: iso });
      setPhase('in');
      setOpen(false);
    }
  };

  const end = phase === 'out' && hover && checkIn && hover > checkIn ? hover : checkOut;

  return (
    <div className="date-range" ref={ref}>
      <div className={`search-field ${errors.checkIn ? 'has-error' : ''} ${open && phase === 'in' ? 'is-focus' : ''}`}>
        <label><CalendarDays size={14} /> {inLabel}</label>
        <button type="button" className="search-field__btn" onClick={() => openFor('in')} aria-haspopup="dialog">
          {checkIn ? formatDate(checkIn) : <span className="placeholder">Add date</span>}
        </button>
        {errors.checkIn && <span className="field__error">{errors.checkIn}</span>}
      </div>
      <div className={`search-field ${errors.checkOut ? 'has-error' : ''} ${open && phase === 'out' ? 'is-focus' : ''}`}>
        <label><CalendarDays size={14} /> {outLabel}</label>
        <button type="button" className="search-field__btn" onClick={() => openFor('out')} aria-haspopup="dialog">
          {checkOut ? formatDate(checkOut) : <span className="placeholder">Add date</span>}
        </button>
        {errors.checkOut && <span className="field__error">{errors.checkOut}</span>}
      </div>

      {open && (
        <div className="popover calendar" role="dialog" aria-label="Choose dates">
          <div className="calendar__nav">
            <button type="button" onClick={() => shift(-1)} disabled={!canGoBack} aria-label="Previous month"><ChevronLeft size={18} /></button>
            <button type="button" onClick={() => shift(1)} aria-label="Next month"><ChevronRight size={18} /></button>
          </div>
          <div className="calendar__months">
            {months.map((mo, idx) => (
              <div key={`${mo.y}-${mo.m}`} className={`calendar__month ${idx === 1 ? 'calendar__month--second' : ''}`}>
                <h5>{new Date(mo.y, mo.m, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h5>
                <div className="calendar__grid">
                  {DOW.map((d) => <span key={d} className="calendar__dow">{d}</span>)}
                  {mo.cells.map((iso, i) => {
                    if (!iso) return <span key={`b${i}`} />;
                    const disabled = iso < today;
                    const isStart = iso === checkIn;
                    const isEnd = iso === end;
                    const inRange = checkIn && end && iso > checkIn && iso < end;
                    return (
                      <button
                        type="button"
                        key={iso}
                        disabled={disabled}
                        className={`calendar__day ${isStart ? 'is-start' : ''} ${isEnd ? 'is-end' : ''} ${inRange ? 'in-range' : ''} ${iso === today ? 'is-today' : ''}`}
                        onClick={() => pick(iso)}
                        onMouseEnter={() => setHover(iso)}
                      >
                        {Number(iso.slice(8))}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <p className="calendar__hint">{phase === 'in' ? 'Select your check-in date' : 'Now select your check-out date'}</p>
        </div>
      )}
    </div>
  );
}
