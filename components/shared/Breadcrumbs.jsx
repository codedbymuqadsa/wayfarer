import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumbs({ items, light = false }) {
  return (
    <nav className={`breadcrumbs ${light ? 'breadcrumbs--light' : ''}`} aria-label="Breadcrumb">
      <ol>
        {items.map((item, i) => (
          <li key={item.label}>
            {item.href && i < items.length - 1 ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
            {i < items.length - 1 && <ChevronRight size={14} />}
          </li>
        ))}
      </ol>
    </nav>
  );
}
