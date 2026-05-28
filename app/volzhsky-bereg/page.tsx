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
  title: "Волжский Берег — готовые дома у Волги | 14,3 млн ₽",
  description: `Коттеджный посёлок Волжский Берег, 8 км от Твери. Готовые дома 138 м², 11 соток, от 14 300 000 ₽. Осталось ${available} дома. Газ, электричество, ИЖС, ипотека.`,
  alternates: { canonical: `${BASE}/volzhsky-bereg` },
  openGraph: {
    title: `Волжский Берег — ${available} готовых дома у Волги`,
    description: "138 м², 11 соток ИЖС, от 14 300 000 ₽. Сдан 2023. Газ, котёл работает, 8 км от Твери.",
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
      telephone: "+7-930-165-13-29",
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
