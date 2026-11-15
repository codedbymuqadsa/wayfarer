'use client';
import { createContext, useCallback, useContext, useMemo } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useToast } from './ToastContext';

const WishlistContext = createContext(null);
export const useWishlist = () => useContext(WishlistContext);

// items: [{ type: 'hotel' | 'destination' | 'experience', slug }]
export function WishlistProvider({ children }) {
  const [items, setItems, hydrated] = useLocalStorage('wayfarer-wishlist', []);
  const toast = useToast();

  const has = useCallback((type, slug) => items.some((i) => i.type === type && i.slug === slug), [items]);

  const toggle = useCallback((type, slug, label) => {
    const exists = items.some((i) => i.type === type && i.slug === slug);
    setItems((prev) => (exists ? prev.filter((i) => !(i.type === type && i.slug === slug)) : [{ type, slug, addedAt: Date.now() }, ...prev]));
    toast?.push(exists ? `Removed ${label || 'item'} from wishlist` : `Saved ${label || 'item'} to wishlist`, exists ? 'info' : 'success');
  }, [items, setItems, toast]);

  const remove = useCallback((type, slug) => setItems((prev) => prev.filter((i) => !(i.type === type && i.slug === slug))), [setItems]);
  const clear = useCallback(() => setItems([]), [setItems]);

  const value = useMemo(() => ({ items, has, toggle, remove, clear, count: items.length, hydrated }), [items, has, toggle, remove, clear, hydrated]);
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}
