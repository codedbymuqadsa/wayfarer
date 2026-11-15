'use client';
import { useEffect } from 'react';

export default function useOutsideClick(ref, handler, active = true) {
  useEffect(() => {
    if (!active) return undefined;
    const fn = (e) => {
      if (ref.current && !ref.current.contains(e.target)) handler(e);
    };
    document.addEventListener('mousedown', fn);
    document.addEventListener('touchstart', fn);
    return () => {
      document.removeEventListener('mousedown', fn);
      document.removeEventListener('touchstart', fn);
    };
  }, [ref, handler, active]);
}
