'use client';
import { ToastProvider } from './ToastContext';
import { UserProvider } from './UserContext';
import { WishlistProvider } from './WishlistContext';
import { BookingProvider } from './BookingContext';
import { TripProvider } from './TripContext';

export default function Providers({ children }) {
  return (
    <ToastProvider>
      <UserProvider>
        <WishlistProvider>
          <BookingProvider>
            <TripProvider>{children}</TripProvider>
          </BookingProvider>
        </WishlistProvider>
      </UserProvider>
    </ToastProvider>
  );
}
