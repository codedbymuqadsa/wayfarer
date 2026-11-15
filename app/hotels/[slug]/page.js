import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import HotelDetailView from '@/components/hotels/HotelDetailView';
import HotelGrid from '@/components/hotels/HotelGrid';
import SectionHeading from '@/components/shared/SectionHeading';
import { hotels, getHotel } from '@/data/hotels';

export const generateStaticParams = () => hotels.map((h) => ({ slug: h.slug }));

export function generateMetadata({ params }) {
  const h = getHotel(params.slug);
  return h ? { title: `${h.name} — ${h.destinationName}`, description: h.description.slice(0, 150) } : { title: 'Stay not found' };
}

export default function HotelPage({ params }) {
  const hotel = getHotel(params.slug);
  if (!hotel) notFound();
  const similar = hotels.filter((h) => h.slug !== hotel.slug && (h.destinationSlug === hotel.destinationSlug || h.type === hotel.type)).slice(0, 3);
  return (
    <>
      <Suspense fallback={<div className="container section"><p className="muted">Loading stay…</p></div>}>
        <HotelDetailView hotel={hotel} />
      </Suspense>
      {similar.length > 0 && (
        <section className="section section--alt">
          <div className="container">
            <SectionHeading eyebrow="Similar stays" title="You might also like" />
            <HotelGrid hotels={similar} />
          </div>
        </section>
      )}
    </>
  );
}
