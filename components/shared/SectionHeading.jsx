import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function SectionHeading({ eyebrow, title, description, align = 'left', href, hrefLabel, light = false }) {
  return (
    <div className={`section-heading section-heading--${align} ${light ? 'section-heading--light' : ''}`}>
      <div className="section-heading__text">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
        {description && <p className="lead">{description}</p>}
      </div>
      {href && (
        <Link href={href} className="link-arrow">
          {hrefLabel || 'View all'} <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
}
