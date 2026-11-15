import ExperienceCard from './ExperienceCard';

export default function ExperienceGrid({ experiences, columns = 3 }) {
  return (
    <div className={`exp-grid exp-grid--${columns}`}>
      {experiences.map((x) => <ExperienceCard key={x.id} experience={x} />)}
    </div>
  );
}
