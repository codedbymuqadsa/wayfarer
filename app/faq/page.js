import PageHero from '@/components/shared/PageHero';
import FaqView from '@/components/shared/FaqView';
import { U } from '@/data/images';

export const metadata = { title: 'FAQ', description: 'Answers to common questions about reservations, payments and trip planning.' };

export default function FaqPage() {
  return (
    <>
      <PageHero compact eyebrow="Help centre" title="Frequently asked questions" description="Quick answers about booking, payments, cancellations and planning." image={U(124, 2000)} crumbs={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]} />
      <section className="section">
        <div className="container"><FaqView /></div>
      </section>
    </>
  );
}
