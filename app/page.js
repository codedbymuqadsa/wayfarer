import Hero from '@/components/home/Hero';
import PopularDestinations from '@/components/home/PopularDestinations';
import FeaturedStays from '@/components/home/FeaturedStays';
import TravelCategories from '@/components/home/TravelCategories';
import FeaturedExperiences from '@/components/home/FeaturedExperiences';
import EditorialSection from '@/components/home/EditorialSection';
import WhyChoose from '@/components/home/WhyChoose';
import NewsletterSection from '@/components/home/NewsletterSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <PopularDestinations />
      <FeaturedStays />
      <TravelCategories />
      <FeaturedExperiences />
      <EditorialSection />
      <WhyChoose />
      <NewsletterSection />
    </>
  );
}
