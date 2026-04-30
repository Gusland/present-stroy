import HeroSlider from "@/components/sections/HeroSlider";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import ServicesPreview from "@/components/sections/ServicesPreview";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import NewsPreview from "@/components/sections/NewsPreview";
import ContactFormSection from "@/components/sections/ContactFormSection";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <FeaturedProjects />
      <ServicesPreview />
      <Process />
      <Testimonials />
      <NewsPreview />
      <ContactFormSection />
    </>
  );
}
