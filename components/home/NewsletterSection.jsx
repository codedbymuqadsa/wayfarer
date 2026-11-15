import Img from '@/components/shared/Img';
import NewsletterForm from '@/components/shared/NewsletterForm';
import { U } from '@/data/images';

export default function NewsletterSection() {
  return (
    <section className="newsletter">
      <Img src={U(95, 1800)} alt="" className="newsletter__bg" />
      <div className="newsletter__shade" />
      <div className="container newsletter__inner">
        <span className="eyebrow">Letters from the road</span>
        <h2>Get inspired before you pack.</h2>
        <p>One thoughtful email a month — hidden gems, seasonal escapes and first access to new stays.</p>
        <NewsletterForm variant="dark" />
        <small>No spam. Unsubscribe whenever you like.</small>
      </div>
    </section>
  );
}
