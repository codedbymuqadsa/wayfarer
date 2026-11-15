import Link from 'next/link';
import { MapPin } from 'lucide-react';
import Img from '@/components/shared/Img';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import WishlistButton from '@/components/shared/WishlistButton';

export default function DestinationHero({ destination: d }) {
  return (
    <section className="dest-hero">
      <Img src={d.hero} alt={`${d.name} landscape`} className="dest-hero__img" priority />
      <div className="dest-hero__shade" />
      <div className="container dest-hero__inner">
        <Breadcrumbs light items={[{ label: 'Home', href: '/' }, { label: 'Destinations', href: '/destinations' }, { label: d.name }]} />
        <div className="dest-hero__content">
          <span className="dest-hero__country"><MapPin size={16} /> {d.country} · {d.region}</span>
          <h1>{d.name}</h1>
          <p>{d.intro}</p>
          <div className="dest-hero__actions">
            <Link href={`/stays?destination=${d.slug}`} className="btn btn--light">Find stays</Link>
            <WishlistButton type="destination" slug={d.slug} label={d.name} variant="pill" showText />
          </div>
        </div>
      </div>
    </section>
  );
}
