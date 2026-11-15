'use client';
import { useState } from 'react';
import { Plus } from 'lucide-react';

export default function Accordion({ items, defaultOpen = 0 }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="accordion">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className={`accordion__item ${isOpen ? 'is-open' : ''}`}>
            <button type="button" className="accordion__trigger" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : i)}>
              <span>{item.q}</span>
              <Plus size={20} />
            </button>
            <div className="accordion__panel" hidden={!isOpen}>
              <p>{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
