export const cx = (...args) => args.filter(Boolean).join(' ');
export const uid = (prefix = 'id') => `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
export const makeReference = () => `WF-${Math.random().toString(36).slice(2, 6).toUpperCase()}${Date.now().toString().slice(-5)}`;
export const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// ---- Validation helpers (plain JS, no libraries) ----
export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test((v || '').trim());
export const isPhone = (v) => /^[+()\d\s-]{7,20}$/.test((v || '').trim());
export const minLen = (v, n) => (v || '').trim().length >= n;

export const validate = (values, rules) => {
  const errors = {};
  Object.keys(rules).forEach((field) => {
    const msg = rules[field](values[field], values);
    if (msg) errors[field] = msg;
  });
  return errors;
};

export const rules = {
  required: (label) => (v) => (!v || !String(v).trim() ? `${label} is required` : ''),
  name: (label) => (v) => (!v || !v.trim() ? `${label} is required` : v.trim().length < 2 ? `${label} must be at least 2 characters` : ''),
  email: (v) => (!v || !v.trim() ? 'Email is required' : !isEmail(v) ? 'Enter a valid email address' : ''),
  phone: (v) => (!v || !v.trim() ? 'Phone number is required' : !isPhone(v) ? 'Enter a valid phone number' : ''),
  message: (min) => (v) => (!v || !v.trim() ? 'Message is required' : v.trim().length < min ? `Message must be at least ${min} characters` : ''),
};

export const validateDates = (checkIn, checkOut, today) => {
  const errors = {};
  if (!checkIn) errors.checkIn = 'Select a check-in date';
  else if (today && checkIn < today) errors.checkIn = 'Check-in cannot be in the past';
  if (!checkOut) errors.checkOut = 'Select a check-out date';
  else if (checkIn && checkOut <= checkIn) errors.checkOut = 'Check-out must be after check-in';
  return errors;
};
export const validateGuests = (guests, rooms) => {
  const errors = {};
  if (!guests || guests < 1) errors.guests = 'At least 1 guest is required';
  else if (guests > 20) errors.guests = 'Maximum 20 guests';
  if (!rooms || rooms < 1) errors.rooms = 'At least 1 room is required';
  else if (rooms > guests) errors.rooms = 'Rooms cannot exceed guests';
  return errors;
};
