'use client';
import { createContext, useCallback, useContext, useMemo } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';
import { uid } from '@/lib/utilities';

const TripContext = createContext(null);
export const useTrips = () => useContext(TripContext);

// trip: { id, name, destinationSlug, startDate, endDate, travelers, description,
//         activities: [{ id, day, title, time, location, notes, experienceSlug? }] }
export function TripProvider({ children }) {
  const [trips, setTrips, hydrated] = useLocalStorage('wayfarer-trips', []);

  const addTrip = useCallback((data) => {
    const trip = { id: uid('trip'), createdAt: Date.now(), activities: [], ...data };
    setTrips((prev) => [trip, ...prev]);
    return trip;
  }, [setTrips]);

  const updateTrip = useCallback((id, patch) => setTrips((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t))), [setTrips]);
  const deleteTrip = useCallback((id) => setTrips((prev) => prev.filter((t) => t.id !== id)), [setTrips]);
  const getTrip = useCallback((id) => trips.find((t) => t.id === id), [trips]);

  const addActivity = useCallback((tripId, activity) => {
    const a = { id: uid('act'), time: '', location: '', notes: '', ...activity };
    setTrips((prev) => prev.map((t) => (t.id === tripId ? { ...t, activities: [...t.activities, a] } : t)));
    return a;
  }, [setTrips]);

  const updateActivity = useCallback((tripId, actId, patch) => setTrips((prev) => prev.map((t) => (t.id === tripId ? { ...t, activities: t.activities.map((a) => (a.id === actId ? { ...a, ...patch } : a)) } : t))), [setTrips]);
  const removeActivity = useCallback((tripId, actId) => setTrips((prev) => prev.map((t) => (t.id === tripId ? { ...t, activities: t.activities.filter((a) => a.id !== actId) } : t))), [setTrips]);

  // Reorder: swap an activity with its neighbour inside the same day (dir = -1 up, +1 down)
  const moveActivity = useCallback((tripId, actId, dir) => {
    setTrips((prev) => prev.map((t) => {
      if (t.id !== tripId) return t;
      const list = [...t.activities];
      const idx = list.findIndex((a) => a.id === actId);
      if (idx < 0) return t;
      const day = list[idx].day;
      let j = idx + dir;
      while (j >= 0 && j < list.length && list[j].day !== day) j += dir;
      if (j < 0 || j >= list.length) return t;
      [list[idx], list[j]] = [list[j], list[idx]];
      return { ...t, activities: list };
    }));
  }, [setTrips]);

  const value = useMemo(
    () => ({ trips, addTrip, updateTrip, deleteTrip, getTrip, addActivity, updateActivity, removeActivity, moveActivity, hydrated }),
    [trips, addTrip, updateTrip, deleteTrip, getTrip, addActivity, updateActivity, removeActivity, moveActivity, hydrated]
  );
  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
}
