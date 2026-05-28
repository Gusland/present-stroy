import type { Metadata } from "next";
import { village, getLotCounters } from "@/data/villages";
import VillageHero from "@/components/villages/VillageHero";
import VillageManifesto from "@/components/villages/VillageManifesto";
import VillageNumbers from "@/components/villages/VillageNumbers";
import VillagePlan from "@/components/villages/VillagePlan";
import VillageGallery from "@/components/villages/VillageGallery";
import VillageIncluded from "@/components/villages/VillageIncluded";
import VillageMortgage from "@/components/villages/VillageMortgage";
import VillageLocation from "@/components/villages/VillageLocation";
import VillageFAQ from "@/components/villages/VillageFAQ";
import VillageContact from "@/components/villages/VillageContact";

const BASE = "https://xn----itbahmwicjfkkc.xn--p1ai";
const { available } = getLotCounters();

export const metadata: Metadata = {
  title: "Волжский Берег — готовый посёлок под Тверью, дома у Волги",
  description: `Готовые дома на Волге в 8 км от Твери. Посёлок Волжский Берег: 138 м², 11 соток ИЖС, от 14 300 000 ₽. Дом у реки в Тверской области. Ипотека 6%, ${available} дома свободны.`,
  alternates: { canonical: `${BASE}/volzhsky-bereg` },
  keywords: ["дом на Волге в Твери", "дом у реки Тверь", "коттедж у воды Тверь", "дом в Тверской области", "купить дом Тверь", "готовый дом у Волги"],
  openGraph: {
    title: `Волжский Берег — дома на Волге под Тверью, ${available} свободных`,
    description: "138 м², 11 соток ИЖС, от 14 300 000 ₽. Дом у реки в 8 км от Твери. Газ, котёл работает, сдан 2023.",
    url: `${BASE}/volzhsky-bereg`,
    images: [{ url: `${BASE}/volzhsky-bereg/opengraph-image`, width: 1200, height: 630 }],
  },
};

const villageLdJson = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "RealEstateAgent",
      "@id": `${BASE}/volzhsky-bereg#agent`,
      name: village.name,
      description: village.tagline,
      url: `${BASE}/volzhsky-bereg`,
      address: {
        "@type": "PostalAddress",
        streetAddress: village.address,
        addressLocality: "Тверь",
        addressRegion: "Тверская область",
        addressCountry: "RU",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: village.coords.lat,
        longitude: village.coords.lng,
      },
      telephone: "+7-981-202-12-61",
    },
    {
      "@type": "Place",
      "@id": `${BASE}/volzhsky-bereg#place`,
      name: village.name,
      geo: {
        "@type": "GeoCoordinates",
        latitude: village.coords.lat,
        longitude: village.coords.lng,
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${BASE}/volzhsky-bereg#faq`,
      mainEntity: village.faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

export default function VolzhskyBeregPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(villageLdJson) }}
      />
      <VillageHero />
      <VillageManifesto />
      <VillageNumbers />
      <VillagePlan />
      <VillageGallery />
      <VillageIncluded />
      <VillageMortgage priceRub={village.defaultLot.priceRub} />
      <VillageLocation />
      <VillageFAQ />
      <VillageContact />
    </>
  );
}
