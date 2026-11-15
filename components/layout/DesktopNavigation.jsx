'use client';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { navLinks } from '@/data/content';
import useOutsideClick from '@/hooks/useOutsideClick';

export const isActive = (pathname, href) => {
  const base = href.split(/[?#]/)[0];
  if (base === '/') return pathname === '/';
  return pathname === base || pathname.startsWith(`${base}/`);
};

export default function DesktopNavigation() {
  const pathname = usePathname();
  const [openIdx, setOpenIdx] = useState(-1);
  const ref = useRef(null);
  useOutsideClick(ref, () => setOpenIdx(-1), openIdx >= 0);

  return (
    <nav className="desktop-nav" aria-label="Main" ref={ref} onMouseLeave={() => setOpenIdx(-1)}>
      {navLinks.map((item, i) => {
        const active = isActive(pathname, item.href);
        if (!item.children) {
          return (
            <Link key={item.label} href={item.href} className={`desktop-nav__link ${active ? 'is-active' : ''}`} aria-current={active ? 'page' : undefined}>
              {item.label}
            </Link>
          );
        }
        const open = openIdx === i;
        return (
          <div key={item.label} className={`desktop-nav__item ${open ? 'is-open' : ''}`} onMouseEnter={() => setOpenIdx(i)}>
            <Link href={item.href} className={`desktop-nav__link ${active ? 'is-active' : ''}`} aria-current={active ? 'page' : undefined} onClick={() => setOpenIdx(-1)}>
              {item.label}
            </Link>
            <button type="button" className="desktop-nav__chevron" aria-label={`${item.label} menu`} aria-expanded={open} onClick={() => setOpenIdx(open ? -1 : i)}>
              <ChevronDown size={14} />
            </button>
            <div className="dropdown" hidden={!open}>
              {item.children.map((c) => (
                <Link key={c.label} href={c.href} className="dropdown__link" onClick={() => setOpenIdx(-1)}>
                  <span>{c.label}</span>
                  {c.text && <small>{c.text}</small>}
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </nav>
  );
}
