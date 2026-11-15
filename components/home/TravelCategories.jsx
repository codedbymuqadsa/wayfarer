import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Img from '@/components/shared/Img';
import SectionHeading from '@/components/shared/SectionHeading';
import { travelCategories } from '@/data/content';

export default function TravelCategories() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading eyebrow="Travel by mood" title="What kind of escape are you after?" align="center" />
        <div className="category-grid">
          {travelCategories.map((c) => (
            <Link key={c.title} href={c.href} className="category-card">
              <Img src={c.image} alt={c.title} />
              <div className="category-card__shade" />
              <div className="category-card__text">
                <h3>{c.title}</h3>
                <p>{c.text}</p>
                <span><ArrowUpRight size={18} /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
