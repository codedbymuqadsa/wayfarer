'use client';
import { useState } from 'react';
import Link from 'next/link';
import Accordion from './Accordion';
import { faqs } from '@/data/content';

export default function FaqView() {
  const cats = Object.keys(faqs);
  const [cat, setCat] = useState(cats[0]);
  return (
    <div className="faq">
      <div className="faq__nav" role="tablist" aria-label="FAQ categories">
        {cats.map((c) => <button key={c} type="button" role="tab" aria-selected={c === cat} className={`chip ${c === cat ? 'is-active' : ''}`} onClick={() => setCat(c)}>{c}</button>)}
      </div>
      <div className="faq__body">
        <h2>{cat}</h2>
        <Accordion key={cat} items={faqs[cat]} />
        <p className="faq__more">Still have questions? <Link href="/contact" className="link-arrow">Contact our team</Link></p>
      </div>
    </div>
  );
}
