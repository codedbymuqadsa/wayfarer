import { Compass, Gem, Route, Sparkles } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import { whyChoose } from '@/data/content';

const ICONS = { Gem, Route, Compass, Sparkles };

export default function WhyChoose() {
  return (
    <section className="section section--alt">
      <div className="container">
        <SectionHeading eyebrow="Why WAYFARER" title="Travel, thoughtfully made simple" align="center" />
        <div className="why-grid">
          {whyChoose.map((w) => {
            const Icon = ICONS[w.icon];
            return (
              <div key={w.title} className="why-card">
                <div className="why-card__icon"><Icon size={24} strokeWidth={1.4} /></div>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
