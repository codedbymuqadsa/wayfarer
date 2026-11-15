'use client';
import { useState } from 'react';
import FormInput from '@/components/shared/FormInput';
import { destinations } from '@/data/destinations';
import { addDays, nightsBetween, todayISO } from '@/lib/formatting';
import { validate } from '@/lib/utilities';

const RULES = {
  name: (v) => (!v || !v.trim() ? 'Trip name is required' : v.trim().length < 3 ? 'Trip name must be at least 3 characters' : v.trim().length > 60 ? 'Keep the name under 60 characters' : ''),
  destinationSlug: (v) => (v ? '' : 'Choose a destination'),
  startDate: (v) => (v ? '' : 'Select a start date'),
  endDate: (v, all) => (!v ? 'Select an end date' : all.startDate && v < all.startDate ? 'End date must be on or after the start date' : all.startDate && nightsBetween(all.startDate, v) > 29 ? 'Trips can be up to 30 days' : ''),
  travelers: (v) => (!(Number(v) >= 1) ? 'At least 1 traveler is required' : Number(v) > 20 ? 'Maximum 20 travelers' : ''),
  description: (v) => (v && v.trim() && v.trim().length < 10 ? 'Description must be at least 10 characters (or leave it empty)' : ''),
};

export default function TripForm({ initial, onSubmit, submitLabel = 'Create trip', onCancel }) {
  const [values, setValues] = useState({
    name: '', destinationSlug: '', startDate: addDays(todayISO(), 30), endDate: addDays(todayISO(), 34), travelers: 2, description: '', ...initial,
  });
  const [errors, setErrors] = useState({});

  const change = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((er) => ({ ...er, [name]: '', ...(name === 'startDate' ? { endDate: '' } : {}) }));
  };

  const submit = (e) => {
    e.preventDefault();
    const errs = validate(values, RULES);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    onSubmit({
      name: values.name.trim(),
      destinationSlug: values.destinationSlug,
      startDate: values.startDate,
      endDate: values.endDate,
      travelers: Number(values.travelers),
      description: values.description.trim(),
    });
  };

  return (
    <form className="trip-form" onSubmit={submit} noValidate>
      <FormInput label="Trip name" name="name" value={values.name} onChange={change} error={errors.name} placeholder="e.g. Anniversary in Santorini" />
      <FormInput as="select" label="Destination" name="destinationSlug" value={values.destinationSlug} onChange={change} error={errors.destinationSlug}
        options={[{ value: '', label: 'Select a destination' }, ...destinations.map((d) => ({ value: d.slug, label: `${d.name}, ${d.country}` }))]} />
      <div className="form-grid form-grid--3">
        <FormInput label="Start date" name="startDate" type="date" value={values.startDate} onChange={change} error={errors.startDate} />
        <FormInput label="End date" name="endDate" type="date" min={values.startDate} value={values.endDate} onChange={change} error={errors.endDate} />
        <FormInput label="Travelers" name="travelers" type="number" min={1} max={20} value={values.travelers} onChange={change} error={errors.travelers} />
      </div>
      <FormInput as="textarea" label="Trip description (optional)" name="description" value={values.description} onChange={change} error={errors.description} rows={3} placeholder="What is this trip about?" />
      <div className="form-actions">
        {onCancel && <button type="button" className="btn btn--outline" onClick={onCancel}>Cancel</button>}
        <button type="submit" className="btn btn--primary">{submitLabel}</button>
      </div>
    </form>
  );
}
