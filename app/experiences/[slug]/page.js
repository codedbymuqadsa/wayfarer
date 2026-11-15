import { notFound } from 'next/navigation';
import ExperienceDetails from '@/components/experiences/ExperienceDetails';
import ExperienceGrid from '@/components/experiences/ExperienceGrid';
import SectionHeading from '@/components/shared/SectionHeading';
import { experiences, getExperience } from '@/data/experiences';

export const generateStaticParams = () => experiences.map((x) => ({ slug: x.slug }));

export function generateMetadata({ params }) {
  const x = getExperience(params.slug);
  return x ? { title: `${x.name} — ${x.destinationName}`, description: x.description.slice(0, 150) } : { title: 'Experience not found' };
}

export default function ExperiencePage({ params }) {
  const x = getExperience(params.slug);
  if (!x) notFound();
  const more = experiences.filter((e) => e.slug !== x.slug && (e.category === x.category || e.destinationSlug === x.destinationSlug)).slice(0, 3);
  return (
    <>
      <ExperienceDetails experience={x} />
      <section className="section section--alt">
        <div className="container">
          <SectionHeading eyebrow="More to do" title="Similar experiences" />
          <ExperienceGrid experiences={more} />
        </div>
      </section>
    </>
  );
}
