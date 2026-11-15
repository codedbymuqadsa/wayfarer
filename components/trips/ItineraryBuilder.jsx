'use client';
import { useState } from 'react';
import ItineraryDay from './ItineraryDay';
import Modal from '@/components/shared/Modal';
import FormInput from '@/components/shared/FormInput';
import { useTrips } from '@/context/TripContext';
import { useToast } from '@/context/ToastContext';
import { activityTemplates } from '@/data/activities';
import { nightsBetween } from '@/lib/formatting';
import { validate } from '@/lib/utilities';

const RULES = {
  title: (v) => (!v || !v.trim() ? 'Activity title is required' : v.trim().length < 2 ? 'Title must be at least 2 characters' : ''),
  notes: (v) => (v && v.length > 300 ? 'Notes must be under 300 characters' : ''),
};

export const tripDayCount = (trip) => Math.max(1, nightsBetween(trip.startDate, trip.endDate) + 1);

export default function ItineraryBuilder({ trip, readOnly = false }) {
  const { addActivity, updateActivity, removeActivity, moveActivity } = useTrips();
  const toast = useToast();
  const [editor, setEditor] = useState(null); // { day, activity? }
  const [values, setValues] = useState({ title: '', time: '', location: '', notes: '' });
  const [errors, setErrors] = useState({});

  const count = tripDayCount(trip);
  const maxUsed = trip.activities.reduce((m, a) => Math.max(m, a.day), 0);
  const days = Array.from({ length: Math.max(count, maxUsed) }, (_, i) => i + 1);

  const openAdd = (day) => { setValues({ title: '', time: '', location: '', notes: '' }); setErrors({}); setEditor({ day }); };
  const openEdit = (a) => { setValues({ title: a.title, time: a.time || '', location: a.location || '', notes: a.notes || '' }); setErrors({}); setEditor({ day: a.day, activity: a }); };

  const change = (e) => { setValues((v) => ({ ...v, [e.target.name]: e.target.value })); setErrors((er) => ({ ...er, [e.target.name]: '' })); };

  const save = (e) => {
    e.preventDefault();
    const errs = validate(values, RULES);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    const clean = { title: values.title.trim(), time: values.time, location: values.location.trim(), notes: values.notes.trim() };
    if (editor.activity) { updateActivity(trip.id, editor.activity.id, clean); toast.push('Activity updated'); }
    else { addActivity(trip.id, { ...clean, day: editor.day }); toast.push('Activity added'); }
    setEditor(null);
  };

  const remove = (a) => { removeActivity(trip.id, a.id); toast.push(`Removed “${a.title}”`, 'info'); };

  return (
    <div className="itinerary">
      {days.map((day) => (
        <ItineraryDay
          key={day}
          day={day}
          startDate={trip.startDate}
          outside={day > count}
          readOnly={readOnly}
          activities={trip.activities.filter((a) => a.day === day)}
          onAdd={() => openAdd(day)}
          onEdit={openEdit}
          onRemove={remove}
          onMove={(a, d) => moveActivity(trip.id, a.id, d)}
        />
      ))}

      <Modal open={!!editor} onClose={() => setEditor(null)} title={editor?.activity ? 'Edit activity' : `Add activity — Day ${editor?.day}`} size="md">
        <form onSubmit={save} noValidate className="activity-form">
          {!editor?.activity && (
            <div className="activity-form__ideas">
              <small>Quick ideas</small>
              <div className="chip-row">
                {activityTemplates.slice(0, 6).map((t) => (
                  <button type="button" key={t.title} className="chip" onClick={() => { setValues({ title: t.title, time: t.time, location: t.location, notes: t.notes }); setErrors({}); }}>{t.title}</button>
                ))}
              </div>
            </div>
          )}
          <FormInput label="Activity" name="title" value={values.title} onChange={change} error={errors.title} placeholder="e.g. Sunset dinner at the harbour" />
          <div className="form-grid">
            <FormInput label="Time" name="time" type="time" value={values.time} onChange={change} />
            <FormInput label="Location" name="location" value={values.location} onChange={change} placeholder="Where?" />
          </div>
          <FormInput as="textarea" label="Notes" name="notes" value={values.notes} onChange={change} error={errors.notes} rows={3} placeholder="Reservations, tips, reminders…" />
          <div className="form-actions">
            <button type="button" className="btn btn--outline" onClick={() => setEditor(null)}>Cancel</button>
            <button type="submit" className="btn btn--primary">{editor?.activity ? 'Save changes' : 'Add activity'}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
