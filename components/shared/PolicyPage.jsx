import Link from 'next/link';
import Breadcrumbs from './Breadcrumbs';
import { policies } from '@/data/content';

const NAV = [['booking', 'Booking Policy'], ['cancellation', 'Cancellation Policy'], ['privacy', 'Privacy Policy'], ['terms', 'Terms & Conditions']];

export default function PolicyPage({ policyKey }) {
  const p = policies[policyKey];
  return (
    <div className="container section section--tight policy">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Policies' }, { label: p.title }]} />
      <div className="policy__layout">
        <aside className="policy__nav" aria-label="Policies">
          {NAV.map(([k, label]) => <Link key={k} href={`/policies/${k}`} className={k === policyKey ? 'is-active' : ''}>{label}</Link>)}
        </aside>
        <article className="policy__body">
          <span className="eyebrow">Policy</span>
          <h1>{p.title}</h1>
          <p className="muted">Last updated {p.updated}</p>
          <p className="lead">{p.intro}</p>
          {p.sections.map(([h, t], i) => (
            <section key={h}>
              <h2>{i + 1}. {h}</h2>
              <p>{t}</p>
            </section>
          ))}
        </article>
      </div>
    </div>
  );
}
