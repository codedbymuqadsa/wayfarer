'use client';
import { useState } from 'react';
import { CreditCard, Landmark, ShieldCheck, Wallet } from 'lucide-react';
import FormInput from '@/components/shared/FormInput';
import { rules, validate } from '@/lib/utilities';

const PAYMENT = [
  { value: 'card', label: 'Credit / Debit Card', text: 'Pay securely at booking', icon: CreditCard },
  { value: 'paypal', label: 'PayPal', text: 'Use your PayPal balance', icon: Wallet },
  { value: 'property', label: 'Pay at Property', text: 'Settle on arrival', icon: Landmark },
];

const RULES = {
  firstName: rules.name('First name'),
  lastName: rules.name('Last name'),
  email: rules.email,
  phone: rules.phone,
  requests: (v) => (v && v.length > 500 ? 'Special requests must be under 500 characters' : ''),
  terms: (v) => (v ? '' : 'Please accept the booking and cancellation policies'),
};

export default function BookingForm({ initial, extraErrors = {}, onSubmit }) {
  const [values, setValues] = useState({ firstName: '', lastName: '', email: '', phone: '', requests: '', payment: 'card', terms: false, ...initial });
  const [errors, setErrors] = useState({});

  const change = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((v) => ({ ...v, [name]: type === 'checkbox' ? checked : value }));
    setErrors((er) => ({ ...er, [name]: '' }));
  };

  const submit = (e) => {
    e.preventDefault();
    const errs = validate(values, RULES);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = document.querySelector('[aria-invalid="true"]');
      first?.focus();
      return;
    }
    onSubmit(values);
  };

  const all = { ...errors };

  return (
    <form className="booking-form" onSubmit={submit} noValidate>
      {Object.values(extraErrors).filter(Boolean).length > 0 && (
        <div className="alert alert--error" role="alert">{Object.values(extraErrors).filter(Boolean).join(' ')}</div>
      )}
      <section>
        <h3>Guest information</h3>
        <div className="form-grid">
          <FormInput label="First name" name="firstName" value={values.firstName} onChange={change} error={all.firstName} autoComplete="given-name" />
          <FormInput label="Last name" name="lastName" value={values.lastName} onChange={change} error={all.lastName} autoComplete="family-name" />
          <FormInput label="Email" name="email" type="email" value={values.email} onChange={change} error={all.email} autoComplete="email" hint="Your confirmation is shown on screen and saved to My Trips" />
          <FormInput label="Phone" name="phone" type="tel" value={values.phone} onChange={change} error={all.phone} autoComplete="tel" />
        </div>
        <FormInput as="textarea" label="Special requests (optional)" name="requests" value={values.requests} onChange={change} error={all.requests} rows={3} placeholder="Early check-in, dietary needs, celebrations…" />
      </section>

      <section>
        <h3>Payment method</h3>
        <div className="pay-options" role="radiogroup" aria-label="Payment method">
          {PAYMENT.map(({ value, label, text, icon: Icon }) => (
            <label key={value} className={`pay-option ${values.payment === value ? 'is-selected' : ''}`}>
              <input type="radio" name="payment" value={value} checked={values.payment === value} onChange={change} />
              <Icon size={22} strokeWidth={1.5} />
              <span><strong>{label}</strong><small>{text}</small></span>
            </label>
          ))}
        </div>
        <p className="pay-note"><ShieldCheck size={16} /> Demonstration only. No payment is processed and no card details are collected.</p>
      </section>

      <label className={`check check--terms ${all.terms ? 'has-error' : ''}`}>
        <input type="checkbox" name="terms" checked={values.terms} onChange={change} aria-invalid={!!all.terms} />
        <span className="check__box" aria-hidden="true" />
        <span>I agree to the booking and cancellation policies.</span>
      </label>
      {all.terms && <span className="field__error" role="alert">{all.terms}</span>}

      <button type="submit" className="btn btn--primary btn--lg">Confirm booking</button>
    </form>
  );
}
