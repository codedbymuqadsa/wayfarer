'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

// SSR-safe persistent state. Returns [value, setValue, hydrated, reset]
export default function useLocalStorage(key, initial) {
  const [value, setValue] = useState(initial);
  const [hydrated, setHydrated] = useState(false);
  const initialRef = useRef(initial);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) setValue(JSON.parse(raw));
    } catch (e) {
      /* storage unavailable or corrupt: keep initial */
    }
    setHydrated(true);
  }, [key]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      /* ignore quota / private mode errors */
    }
  }, [key, value, hydrated]);

  const reset = useCallback(() => setValue(initialRef.current), []);
  return [value, setValue, hydrated, reset];
}
