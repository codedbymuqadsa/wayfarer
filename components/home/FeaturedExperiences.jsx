import Link from 'next/link';
import Img from '@/components/shared/Img';
import SectionHeading from '@/components/shared/SectionHeading';
import { experienceThemes } from '@/data/content';

export default function FeaturedExperiences() {
  return (
    <section className="section section--dark">
      <div className="container">
        <SectionHeading light eyebrow="Experiences" title="Moments worth travelling for" description="Local-led tours and unforgettable activities, curated by theme." href="/experiences" hrefLabel="All experiences" />
        <div className="exp-showcase">
          {experienceThemes.map((e) => (
            <Link key={e.title} href={`/experiences?category=${e.category}`} className="exp-showcase__item">
              <Img src={e.image} alt={e.title} />
              <div className="exp-showcase__shade" />
              <div className="exp-showcase__text">
                <h3>{e.title}</h3>
                <p>{e.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
