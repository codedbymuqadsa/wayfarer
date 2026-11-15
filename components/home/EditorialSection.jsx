'use client';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Img from '@/components/shared/Img';
import Modal from '@/components/shared/Modal';
import SectionHeading from '@/components/shared/SectionHeading';
import { editorials } from '@/data/content';

export default function EditorialSection() {
  const [open, setOpen] = useState(null);
  const [lead, ...rest] = editorials;

  const Card = ({ a, large }) => (
    <article className={`editorial__card ${large ? 'editorial__card--lead' : ''}`}>
      <button type="button" className="editorial__media" onClick={() => setOpen(a)} aria-label={`Read ${a.title}`}>
        <Img src={a.image} alt={a.title} />
      </button>
      <div className="editorial__text">
        <span className="eyebrow">{a.category} · {a.read}</span>
        <h3>{a.title}</h3>
        <p>{a.text}</p>
        <button type="button" className="link-arrow" onClick={() => setOpen(a)}>Read more <ArrowRight size={16} /></button>
      </div>
    </article>
  );

  return (
    <section className="section" id="stories">
      <div className="container">
        <SectionHeading eyebrow="The Journal" title="Stories & inspiration" description="Slow-travel essays, seasonal guides and the people behind the places." />
        <div className="editorial">
          <Card a={lead} large />
          <div className="editorial__side">{rest.map((a) => <Card key={a.slug} a={a} />)}</div>
        </div>
      </div>
      <Modal open={!!open} onClose={() => setOpen(null)} title={open?.title} size="lg">
        {open && (
          <article className="article">
            <Img src={open.image} alt={open.title} className="article__img" />
            <span className="eyebrow">{open.category} · {open.read}</span>
            {open.body.map((p, i) => <p key={i}>{p}</p>)}
          </article>
        )}
      </Modal>
    </section>
  );
}
