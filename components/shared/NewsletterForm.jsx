'use client';
import { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/context/ToastContext';
import { rules } from '@/lib/utilities';

export default function NewsletterForm({ variant = 'light' }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const { subscribe } = useUser();
  const toast = useToast();

  const submit = (e) => {
    e.preventDefault();
    const msg = rules.email(email);
    if (msg) return setError(msg);
    subscribe(email.trim());
    setError('');
    setDone(true);
    toast.push('You are subscribed — welcome aboard.');
    setEmail('');
  };

  if (done) {
    return (
      <div className={`newsletter-form newsletter-form--${variant} is-done`} role="status">
        <CheckCircle2 size={22} />
        <div>
          <strong>You are on the list.</strong>
          <p>Look out for our next dispatch of hidden gems and seasonal escapes.</p>
        </div>
      </div>
    );
  }
  return (
    <form className={`newsletter-form newsletter-form--${variant}`} onSubmit={submit} noValidate>
      <div className="newsletter-form__row">
        <input type="email" placeholder="Your email address" aria-label="Email address" value={email} onChange={(e) => { setEmail(e.target.value); setError(''); }} aria-invalid={!!error} />
        <button type="submit" className="btn btn--primary">Subscribe <ArrowRight size={16} /></button>
      </div>
      {error && <span className="field__error" role="alert">{error}</span>}
    </form>
  );
}
