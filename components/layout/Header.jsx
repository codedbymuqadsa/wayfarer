'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Luggage, Menu, Search, User, ChevronDown, LifeBuoy, Mail, Route } from 'lucide-react';
import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';
import SearchOverlay from './SearchOverlay';
import { useWishlist } from '@/context/WishlistContext';
import { useBookings } from '@/context/BookingContext';
import { useUser } from '@/context/UserContext';
import useOutsideClick from '@/hooks/useOutsideClick';

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef(null);
  const { count } = useWishlist();
  const { bookings } = useBookings();
  const { user } = useUser();
  useOutsideClick(accountRef, () => setAccountOpen(false), accountOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setAccountOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', mobileOpen);
    return () => document.body.classList.remove('no-scroll');
  }, [mobileOpen]);

  const upcoming = bookings.filter((b) => b.status !== 'Cancelled').length;
  const solid = scrolled || pathname !== '/';

  return (
    <>
      <header className={`site-header ${solid ? 'is-solid' : ''} ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container site-header__inner">
          <button type="button" className="icon-btn site-header__burger" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu size={22} />
          </button>
          <Link href="/" className="logo" aria-label="WAYFARER home">WAYFARER</Link>
          <DesktopNavigation />
          <div className="site-header__actions">
            <button type="button" className="icon-btn" onClick={() => setSearchOpen(true)} aria-label="Search">
              <Search size={20} />
            </button>
            <Link href="/wishlist" className="icon-btn icon-btn--badge" aria-label={`Wishlist${count ? `, ${count} saved` : ''}`}>
              <Heart size={20} />
              {count > 0 && <span className="badge">{count}</span>}
            </Link>
            <Link href="/my-trips" className="site-header__trips">
              <Luggage size={18} /> My Trips{upcoming > 0 && <span className="badge badge--inline">{upcoming}</span>}
            </Link>
            <div className="account" ref={accountRef}>
              <button type="button" className="account__btn" onClick={() => setAccountOpen((o) => !o)} aria-expanded={accountOpen} aria-label="Account menu">
                <User size={18} />
                <ChevronDown size={14} />
              </button>
              {accountOpen && (
                <div className="dropdown dropdown--right">
                  <div className="dropdown__user">
                    <strong>{user.firstName} {user.lastName}</strong>
                    <small>{user.email}</small>
                  </div>
                  <Link href="/my-trips" className="dropdown__link"><span><Luggage size={14} /> My Trips</span></Link>
                  <Link href="/wishlist" className="dropdown__link"><span><Heart size={14} /> Wishlist</span></Link>
                  <Link href="/trip-planner" className="dropdown__link"><span><Route size={14} /> Trip Planner</span></Link>
                  <Link href="/faq" className="dropdown__link"><span><LifeBuoy size={14} /> Help &amp; FAQ</span></Link>
                  <Link href="/contact" className="dropdown__link"><span><Mail size={14} /> Contact us</span></Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <MobileNavigation open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
