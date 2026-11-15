import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Landmark, Compass, Utensils, Lightbulb, MapPinned } from 'lucide-react';
import DestinationHero from '@/components/destinations/DestinationHero';
import DestinationHighlights from '@/components/destinations/DestinationHighlights';
import DestinationGrid from '@/components/destinations/DestinationGrid';
import HotelGrid from '@/components/hotels/HotelGrid';
import ExperienceGrid from '@/components/experiences/ExperienceGrid';
import SectionHeading from '@/components/shared/SectionHeading';
import Img from '@/components/shared/Img';
import { destinations, getDestination } from '@/data/destinations';
import { getHotelsByDestination } from '@/data/hotels';
import { getExperiencesByDestination } from '@/data/experiences';

export const generateStaticParams = () => destinations.map((d) => ({ slug: d.slug }));

export function generateMetadata({ params }) {
  const d = getDestination(params.slug);
  return d ? { title: `${d.name}, ${d.country}`, description: d.intro } : { title: 'Destination not found' };
}

const GUIDE = [
  { key: 'attractions', title: 'Top attractions', icon: Landmark },
  { key: 'experiences', title: 'Local experiences', icon: Compass },
  { key: 'food', title: 'Food recommendations', icon: Utensils },
  { key: 'tips', title: 'Travel tips', icon: Lightbulb },
  { key: 'neighborhoods', title: 'Popular neighbourhoods', icon: MapPinned },
];

export default function DestinationPage({ params }) {
  const d = getDestination(params.slug);
  if (!d) notFound();
  const stays = getHotelsByDestination(d.slug);
  const exps = getExperiencesByDestination(d.slug);
  const related = d.related.map((s) => getDestination(s)).filter(Boolean);

  return (
    <>
      <DestinationHero destination={d} />

      <section className="section">
        <div className="container"><DestinationHighlights destination={d} /></div>
      </section>

      {d.gallery.length > 2 && (
        <section className="section section--tight dest-gallery-section">
          <div className="container">
            <div className={`dest-gallery dest-gallery--${Math.min(d.gallery.length, 5)}`}>
              {d.gallery.slice(0, 5).map((src, i) => (
                <div key={src} className={`dest-gallery__item dest-gallery__item--${i}`}><Img src={src} alt={`${d.name} view ${i + 1}`} /></div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section section--alt">
        <div className="container">
          <SectionHeading eyebrow="Things to do" title={`Make the most of ${d.name}`} />
          <div className="todo-grid">
            {d.thingsToDo.map((t) => (
              <article key={t.title} className="todo-card">
                <div className="todo-card__media"><Img src={t.image} alt={t.title} /></div>
                <div className="todo-card__body">
                  <span className="tag">{t.category}</span>
                  <h3>{t.title}</h3>
                  <p>{t.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Popular stays" title={`Where to stay in ${d.name}`} href={`/stays?destination=${d.slug}`} hrefLabel={`All stays in ${d.name}`} />
          {stays.length ? <HotelGrid hotels={stays} /> : <p className="muted">New stays are coming soon. <Link href="/stays">Browse all stays</Link>.</p>}
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <SectionHeading eyebrow="Travel guide" title={`${d.name} travel guide`} description="Local knowledge to help you plan with confidence." />
          <div className="guide-grid">
            {GUIDE.map(({ key, title, icon: Icon }) => (
              <div key={key} className="guide-card">
                <div className="guide-card__head"><Icon size={20} strokeWidth={1.5} /><h3>{title}</h3></div>
                <ul>{d.guide[key].map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {exps.length > 0 && (
        <section className="section">
          <div className="container">
            <SectionHeading eyebrow="Experiences" title={`Experiences in ${d.name}`} href="/experiences" hrefLabel="All experiences" />
            <ExperienceGrid experiences={exps} />
          </div>
        </section>
      )}

      <section className="section section--alt">
        <div className="container">
          <SectionHeading eyebrow="You might also like" title="Related destinations" />
          <DestinationGrid destinations={related} columns={3} />
        </div>
      </section>
    </>
  );
}
