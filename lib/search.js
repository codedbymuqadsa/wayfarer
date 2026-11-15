// Helpers to read / write the shared search parameters (destination, dates, guests, rooms)
export const readSearch = (params) => ({
  destination: params.get('destination') || '',
  checkIn: params.get('checkIn') || '',
  checkOut: params.get('checkOut') || '',
  guests: Math.max(1, Number(params.get('guests')) || 2),
  rooms: Math.max(1, Number(params.get('rooms')) || 1),
});

export const searchToQuery = (s) => {
  const p = new URLSearchParams();
  if (s.checkIn) p.set('checkIn', s.checkIn);
  if (s.checkOut) p.set('checkOut', s.checkOut);
  if (s.guests) p.set('guests', String(s.guests));
  if (s.rooms) p.set('rooms', String(s.rooms));
  const str = p.toString();
  return str ? `?${str}` : '';
};
