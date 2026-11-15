import Link from 'next/link';
import NewsletterForm from '@/components/shared/NewsletterForm';
import { socials } from '@/components/shared/SocialIcons';

const cols = [
  { title: 'Explore', links: [['Explore destinations', '/explore'], ['Stays', '/stays'], ['Experiences', '/experiences'], ['Trip planner', '/trip-planner'], ['Wishlist', '/wishlist']] },
  { title: 'Destinations', links: [['Bali', '/destinations/bali'], ['Paris', '/destinations/paris'], ['Santorini', '/destinations/santorini'], ['Tokyo', '/destinations/tokyo'], ['Maldives', '/destinations/maldives']] },
  { title: 'Support', links: [['Help & FAQ', '/faq'], ['Contact us', '/contact'], ['Booking policy', '/policies/booking'], ['Cancellation policy', '/policies/cancellation'], ['My trips', '/my-trips']] },
  { title: 'Company', links: [['About WAYFARER', '/about'], ['Privacy policy', '/policies/privacy'], ['Terms & conditions', '/policies/terms'], ['Travel stories', '/#stories']] },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <Link href="/" className="logo logo--light">WAYFARER</Link>
            <p>A considered way to discover beautiful places, book distinctive stays and shape journeys worth remembering.</p>
            <div className="socials">
              {socials.map(({ label, Icon, href }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}><Icon /></a>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title} className="site-footer__col">
              <h4>{c.title}</h4>
              <ul>
                {c.links.map(([label, href]) => <li key={label}><Link href={href}>{label}</Link></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="site-footer__news">
          <div>
            <h4>Letters from the road</h4>
            <p>One thoughtful email a month. Hidden gems, seasonal escapes, no noise.</p>
          </div>
          <NewsletterForm variant="dark" />
        </div>
        <div className="site-footer__bottom">
          <span>© {new Date().getFullYear()} WAYFARER. A demonstration travel platform — no real bookings are made.</span>
          <span>Photography via Unsplash contributors.</span>
        </div>
      </div>
    </footer>
  );
}
