import Img from './Img';
import Breadcrumbs from './Breadcrumbs';

// Cinematic page header used by inner pages
export default function PageHero({ eyebrow, title, description, image, crumbs, children, compact = false }) {
  return (
    <section className={`page-hero ${compact ? 'page-hero--compact' : ''}`}>
      {image && <Img src={image} alt="" className="page-hero__img" priority />}
      <div className="page-hero__shade" />
      <div className="container page-hero__inner">
        {crumbs && <Breadcrumbs items={crumbs} light />}
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {description && <p>{description}</p>}
        {children}
      </div>
    </section>
  );
}
