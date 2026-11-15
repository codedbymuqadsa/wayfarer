'use client';
import { createContext, useCallback, useContext, useMemo } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';
import { makeReference, uid } from '@/lib/utilities';

const BookingContext = createContext(null);
export const useBookings = () => useContext(BookingContext);

export function BookingProvider({ children }) {
  const [bookings, setBookings, hydrated] = useLocalStorage('wayfarer-bookings', []);
  // The in-progress selection (hotel, room, dates) carried from the hotel page to the booking page
  const [draft, setDraft, draftHydrated] = useLocalStorage('wayfarer-booking-draft', null);

  const addBooking = useCallback((data) => {
    const booking = { id: uid('bk'), reference: makeReference(), status: 'Confirmed', createdAt: Date.now(), ...data };
    setBookings((prev) => [booking, ...prev]);
    return booking;
  }, [setBookings]);

  const removeBooking = useCallback((id) => setBookings((prev) => prev.filter((b) => b.id !== id)), [setBookings]);
  const cancelBooking = useCallback((id) => setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: 'Cancelled' } : b))), [setBookings]);
  const getBooking = useCallback((id) => bookings.find((b) => b.id === id || b.reference === id), [bookings]);

  const value = useMemo(
    () => ({ bookings, addBooking, removeBooking, cancelBooking, getBooking, draft, setDraft, hydrated: hydrated && draftHydrated }),
    [bookings, addBooking, removeBooking, cancelBooking, getBooking, draft, setDraft, hydrated, draftHydrated]
  );
  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}
