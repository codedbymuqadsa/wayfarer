import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container section not-found">
      <span className="eyebrow">404</span>
      <h1>This route is off the map</h1>
      <p className="lead">The page you are looking for does not exist or has moved.</p>
      <div className="not-found__actions">
        <Link href="/" className="btn btn--primary">Back to homepage</Link>
        <Link href="/explore" className="btn btn--outline">Explore destinations</Link>
      </div>
    </div>
  );
}
