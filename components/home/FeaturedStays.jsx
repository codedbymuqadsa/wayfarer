import SectionHeading from '@/components/shared/SectionHeading';
import HotelGrid from '@/components/hotels/HotelGrid';
import { hotels } from '@/data/hotels';

const picks = ['alaya-ubud-retreat', 'caldera-blue-suites', 'coral-atoll-villas', 'alpenglow-lake-lodge', 'maison-saint-germain', 'cave-rose-hotel'];

export default function FeaturedStays() {
  const list = picks.map((s) => hotels.find((h) => h.slug === s));
  return (
    <section className="section section--alt">
      <div className="container">
        <SectionHeading eyebrow="Featured stays" title="Hand-picked places to stay" description="Resorts, villas and boutique hotels chosen for design, service and setting." href="/stays" hrefLabel="Browse all stays" />
        <HotelGrid hotels={list} />
      </div>
    </section>
  );
}
