export const formatCurrency = (n, digits = 0) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: digits, maximumFractionDigits: digits }).format(n || 0);

const parse = (iso) => {
  if (!iso) return null;
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
};

export const formatDate = (iso, opts = { day: 'numeric', month: 'short', year: 'numeric' }) => {
  const d = parse(iso);
  return d ? d.toLocaleDateString('en-US', opts) : '—';
};
export const formatShortDate = (iso) => formatDate(iso, { day: 'numeric', month: 'short' });
export const formatLongDate = (iso) => formatDate(iso, { weekday: 'long', day: 'numeric', month: 'long' });

export const toISO = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};
export const todayISO = () => toISO(new Date());
export const addDays = (iso, n) => {
  const d = parse(iso) || new Date();
  d.setDate(d.getDate() + n);
  return toISO(d);
};
export const nightsBetween = (a, b) => {
  const da = parse(a);
  const db = parse(b);
  if (!da || !db) return 0;
  return Math.round((db - da) / 86400000);
};
export const plural = (n, word, pluralWord) => `${n} ${n === 1 ? word : pluralWord || `${word}s`}`;
export const formatTime = (t) => {
  if (!t) return '';
  const [h, m] = t.split(':').map(Number);
  const ap = h >= 12 ? 'PM' : 'AM';
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')} ${ap}`;
};
export const formatCount = (n) => new Intl.NumberFormat('en-US').format(n);
