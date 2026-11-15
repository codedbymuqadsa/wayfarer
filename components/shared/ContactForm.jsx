'use client';
import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import FormInput from './FormInput';
import { useToast } from '@/context/ToastContext';
import { rules, validate } from '@/lib/utilities';

const RULES = {
  name: rules.name('Name'),
  email: rules.email,
  subject: (v) => (!v || !v.trim() ? 'Subject is required' : v.trim().length < 3 ? 'Subject must be at least 3 characters' : ''),
  message: rules.message(20),
};

export default function ContactForm() {
  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const toast = useToast();

  const change = (e) => { setValues((v) => ({ ...v, [e.target.name]: e.target.value })); setErrors((er) => ({ ...er, [e.target.name]: '' })); };
  const submit = (e) => {
    e.preventDefault();
    const errs = validate(values, RULES);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSent(true); // mock success — nothing is transmitted
    toast.push('Message sent — we will be in touch soon');
  };

  if (sent) {
    return (
      <div className="form-success" role="status">
        <CheckCircle2 size={36} strokeWidth={1.3} />
        <h3>Thank you, {values.name.split(' ')[0]}.</h3>
        <p>Your message has been received. We will reply to {values.email} within one working day.</p>
        <button type="button" className="btn btn--outline" onClick={() => { setSent(false); setValues({ name: '', email: '', subject: '', message: '' }); }}>Send another message</button>
      </div>
    );
  }
  return (
    <form onSubmit={submit} noValidate className="contact-form">
      <div className="form-grid">
        <FormInput label="Name" name="name" value={values.name} onChange={change} error={errors.name} autoComplete="name" />
        <FormInput label="Email" name="email" type="email" value={values.email} onChange={change} error={errors.email} autoComplete="email" />
      </div>
      <FormInput label="Subject" name="subject" value={values.subject} onChange={change} error={errors.subject} />
      <FormInput as="textarea" label="Message" name="message" rows={6} value={values.message} onChange={change} error={errors.message} hint="At least 20 characters" />
      <button type="submit" className="btn btn--primary btn--lg">Send message</button>
    </form>
  );
}
