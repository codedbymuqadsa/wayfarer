import PageHero from '@/components/shared/PageHero';
import ContactForm from '@/components/shared/ContactForm';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { socials } from '@/components/shared/SocialIcons';
import { U } from '@/data/images';

export const metadata = { title: 'Contact', description: 'Get in touch with the WAYFARER team.' };

export default function ContactPage() {
  return (
    <>
      <PageHero compact eyebrow="Contact" title="We would love to hear from you" description="Questions about a stay, a trip plan or a booking? Send us a note and we will reply within one working day." image={U(124, 2000)} crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />
      <section className="section">
        <div className="container contact">
          <div className="contact__form">
            <h2>Send a message</h2>
            <ContactForm />
          </div>
          <aside className="contact__info">
            <h3>Get in touch</h3>
            <ul>
              <li><Mail size={18} /><span><small>Email</small><strong>hello@wayfarer.example</strong></span></li>
              <li><Phone size={18} /><span><small>Phone</small><strong>+1 (555) 014 2200</strong></span></li>
              <li><MapPin size={18} /><span><small>Studio</small><strong>12 Harbour Lane, Lisbon</strong></span></li>
              <li><Clock size={18} /><span><small>Hours</small><strong>Mon – Fri, 9:00 – 18:00 (UTC)</strong></span></li>
            </ul>
            <h3>Follow along</h3>
            <div className="socials socials--dark">
              {socials.map(({ label, Icon, href }) => <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}><Icon /></a>)}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
