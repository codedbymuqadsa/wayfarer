'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Heart, Luggage, X } from 'lucide-react';
import { navLinks } from '@/data/content';
import { isActive } from './DesktopNavigation';
import { useWishlist } from '@/context/WishlistContext';

export default function MobileNavigation({ open, onClose }) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState('');
  const { count } = useWishlist();

  return (
    <>
      <div className={`drawer-backdrop ${open ? 'is-open' : ''}`} onClick={onClose} aria-hidden="true" />
      <aside className={`drawer ${open ? 'is-open' : ''}`} aria-hidden={!open} aria-label="Mobile navigation">
        <div className="drawer__head">
          <Link href="/" className="logo" onClick={onClose}>WAYFARER</Link>
          <button type="button" onClick={onClose} aria-label="Close menu"><X size={22} /></button>
        </div>
        <nav className="drawer__nav">
          {navLinks.map((item) => {
            const active = isActive(pathname, item.href);
            if (!item.children) {
              return <Link key={item.label} href={item.href} className={`drawer__link ${active ? 'is-active' : ''}`} onClick={onClose}>{item.label}</Link>;
            }
            const isOpen = expanded === item.label;
            return (
              <div key={item.label} className="drawer__group">
                <div className="drawer__row">
                  <Link href={item.href} className={`drawer__link ${active ? 'is-active' : ''}`} onClick={onClose}>{item.label}</Link>
                  <button type="button" aria-label={`Toggle ${item.label} links`} aria-expanded={isOpen} className={isOpen ? 'is-open' : ''} onClick={() => setExpanded(isOpen ? '' : item.label)}>
                    <ChevronDown size={18} />
                  </button>
                </div>
                {isOpen && (
                  <div className="drawer__sub">
                    {item.children.map((c) => <Link key={c.label} href={c.href} onClick={onClose}>{c.label}</Link>)}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        <div className="drawer__foot">
          <Link href="/wishlist" className="btn btn--outline" onClick={onClose}><Heart size={16} /> Wishlist{count > 0 ? ` (${count})` : ''}</Link>
          <Link href="/my-trips" className="btn btn--primary" onClick={onClose}><Luggage size={16} /> My Trips</Link>
        </div>
      </aside>
    </>
  );
}
