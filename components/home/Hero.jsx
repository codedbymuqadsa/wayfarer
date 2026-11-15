import Link from 'next/link';
import Img from '@/components/shared/Img';
import TravelSearch from '@/components/search/TravelSearch';
import { U } from '@/data/images';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__media">
        <Img src={U(186, 2000)} alt="Whitewashed cliffside village above the Aegean sea" priority />
        <div className="hero__shade" />
      </div>
      <div className="container hero__inner">
        <span className="hero__eyebrow">Curated stays · Considered journeys</span>
        <h1>Find the places that change how you travel.</h1>
        <p>Discover beautiful destinations, book distinctive stays and shape every day of your trip — all in one quietly elegant place.</p>
        <div className="hero__ctas">
          <Link href="/explore" className="btn btn--light">Explore Destinations</Link>
          <Link href="/trip-planner" className="btn btn--ghost-light">Plan Your Trip</Link>
        </div>
      </div>
      <div className="container hero__search">
        <TravelSearch variant="hero" />
      </div>
    </section>
  );
}
