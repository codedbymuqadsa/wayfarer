import Link from 'next/link';
import PageHero from '@/components/shared/PageHero';
import SectionHeading from '@/components/shared/SectionHeading';
import Img from '@/components/shared/Img';
import { values, whyChoose } from '@/data/content';
import { U } from '@/data/images';

export const metadata = { title: 'About', description: 'The story, philosophy and values behind WAYFARER.' };

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About WAYFARER" title="Travel, made with intention" description="We believe the best journeys begin with a place that moves you — and a plan that gets out of the way." image={U(176, 2000)} crumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]} />

      <section className="section">
        <div className="container split">
          <div className="split__text">
            <span className="eyebrow">Our story</span>
            <h2>Born from too many forgettable trips</h2>
            <p className="lead">WAYFARER began with a simple frustration: planning a beautiful trip meant juggling a dozen tabs, thousands of near-identical hotel listings and recommendations nobody could vouch for.</p>
            <p>So we built the platform we wanted to use — fewer, better places; honest photography; and a planner that turns inspiration into a day-by-day itinerary without the spreadsheet. Today WAYFARER brings together curated stays, local-led experiences and thoughtful tools for travellers who care about the details.</p>
          </div>
          <div className="split__media"><Img src={U(164, 1200)} alt="Rice terraces at sunrise" /></div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container split split--reverse">
          <div className="split__media"><Img src={U(144, 1200)} alt="A cabin at sunset" /></div>
          <div className="split__text">
            <span className="eyebrow">Our philosophy</span>
            <h2>Go slower, look closer</h2>
            <p className="lead">The most memorable moments rarely come from a longer checklist. They come from time to notice — a market at opening, a lantern-lit lane, an unhurried breakfast with a view.</p>
            <p>That philosophy shapes everything we feature: stays with a sense of place, experiences led by locals and itineraries with room to breathe.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="mission">
            <span className="eyebrow">Our mission</span>
            <blockquote>To make discovering and planning extraordinary journeys feel as inspiring as the journeys themselves.</blockquote>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <SectionHeading eyebrow="Our values" title="What we stand for" align="center" />
          <div className="values-grid">
            {values.map((v, i) => (
              <div key={v.title} className="value-card">
                <span className="value-card__num">0{i + 1}</span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Why WAYFARER" title="A calmer way to plan" description="Everything in one place, designed to feel as good as the destination." />
          <div className="why-grid why-grid--plain">
            {whyChoose.map((w) => (
              <div key={w.title} className="why-card why-card--plain"><h3>{w.title}</h3><p>{w.text}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="gallery-strip">
        {[88, 126, 31, 120].map((i) => <Img key={i} src={U(i, 700)} alt="" />)}
      </section>

      <section className="cta">
        <div className="container cta__inner">
          <h2>Your next chapter starts somewhere beautiful.</h2>
          <p>Browse destinations, find the stay that suits you and start planning.</p>
          <Link href="/explore" className="btn btn--light btn--lg">Explore destinations</Link>
        </div>
      </section>
    </>
  );
}
