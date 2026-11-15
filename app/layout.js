import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google';
import Providers from '@/context/Providers';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import '@/styles/main.scss';

const heading = Fraunces({ subsets: ['latin'], variable: '--font-heading', display: 'swap' });
const body = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-body', display: 'swap' });

export const metadata = {
  title: { default: 'WAYFARER — Premium Travel Discovery & Booking', template: '%s | WAYFARER' },
  description: 'Discover beautiful destinations, book distinctive stays and plan unforgettable trips with WAYFARER.',
};

export const viewport = { width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body>
        <Providers>
          <Header />
          <main className="page-main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
