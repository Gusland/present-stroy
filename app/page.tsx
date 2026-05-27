import HeroSlider from "@/components/sections/HeroSlider";
import VillageHighlight from "@/components/sections/VillageHighlight";
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
      <VillageHighlight />
      <FeaturedProjects />
      <ServicesPreview />
      <Process />
      <Testimonials />
      <NewsPreview />
      <ContactFormSection />
    </>
  );
}
