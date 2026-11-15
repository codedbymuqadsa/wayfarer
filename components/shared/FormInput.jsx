'use client';
import { useId } from 'react';

// Handles input, textarea and select with label + inline validation message
export default function FormInput({ label, name, type = 'text', as = 'input', value, onChange, error, hint, options, rows = 4, className = '', ...rest }) {
  const id = useId();
  const common = {
    id,
    name,
    value: value ?? '',
    onChange,
    'aria-invalid': !!error,
    'aria-describedby': error ? `${id}-err` : undefined,
    className: `field__control ${error ? 'has-error' : ''}`,
    ...rest,
  };
  return (
    <div className={`field ${className}`}>
      {label && <label htmlFor={id}>{label}</label>}
      {as === 'textarea' ? (
        <textarea rows={rows} {...common} />
      ) : as === 'select' ? (
        <select {...common}>
          {options.map((o) => (typeof o === 'string' ? <option key={o} value={o}>{o}</option> : <option key={o.value} value={o.value}>{o.label}</option>))}
        </select>
      ) : (
        <input type={type} {...common} />
      )}
      {hint && !error && <span className="field__hint">{hint}</span>}
      {error && <span id={`${id}-err`} className="field__error" role="alert">{error}</span>}
    </div>
  );
}
