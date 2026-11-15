'use client';
import { createContext, useCallback, useContext, useMemo } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';

const UserContext = createContext(null);
export const useUser = () => useContext(UserContext);

const DEMO_USER = { firstName: 'Alex', lastName: 'Morgan', email: 'alex.morgan@example.com', phone: '+1 555 010 2030', memberSince: '2026' };

// Demo user only: there is no real authentication in this project
export function UserProvider({ children }) {
  const [user, setUser, hydrated] = useLocalStorage('wayfarer-user', DEMO_USER);
  const [newsletter, setNewsletter] = useLocalStorage('wayfarer-newsletter', []);
  const updateUser = useCallback((patch) => setUser((u) => ({ ...u, ...patch })), [setUser]);
  const subscribe = useCallback((email) => setNewsletter((l) => (l.includes(email) ? l : [...l, email])), [setNewsletter]);
  const value = useMemo(() => ({ user, updateUser, subscribe, newsletter, hydrated }), [user, updateUser, subscribe, newsletter, hydrated]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
