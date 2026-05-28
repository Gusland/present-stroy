import type { Metadata } from "next";
import HeroSlider from "@/components/sections/HeroSlider";
import VillageHighlight from "@/components/sections/VillageHighlight";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import ServicesPreview from "@/components/sections/ServicesPreview";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import NewsPreview from "@/components/sections/NewsPreview";
import ContactFormSection from "@/components/sections/ContactFormSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { websiteSchema } from "@/lib/schema";
import { SITE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Строительство домов в Твери под ключ — Презент-Строй",
  description:
    "Строим частные дома в Твери и области с 2013 года. 10+ типовых проектов, фиксированная цена в договоре, ипотека от 6%. Готовый посёлок Волжский Берег — 3 дома у Волги.",
  alternates: { canonical: SITE.url },
};

export default function Home() {
  return (
    <>
      <JsonLd data={websiteSchema()} />
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
