import { SITE } from "./seo";

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "GeneralContractor"],
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    logo: { "@type": "ImageObject", url: SITE.ogImage, width: 200, height: 60 },
    image: SITE.ogImage,
    foundingDate: SITE.foundingDate,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.address.lat,
      longitude: SITE.address.lng,
    },
    openingHours: SITE.hoursSchema,
    areaServed: SITE.serviceArea.map((name) => ({ "@type": "City", name })),
    priceRange: SITE.priceRange,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: SITE.url,
    name: SITE.name,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE.url}/projects?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.name,
      item: `${SITE.url}${b.path}`,
    })),
  };
}

export function productSchema(p: {
  name: string;
  description: string;
  images: string[];
  priceFrom: number;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    image: p.images.map((img) => `${SITE.url}${img}`),
    brand: { "@type": "Brand", name: SITE.brand },
    offers: {
      "@type": "Offer",
      price: p.priceFrom,
      priceCurrency: "RUB",
      availability: "https://schema.org/InStock",
      seller: { "@id": `${SITE.url}/#organization` },
      priceValidUntil: "2026-12-31",
    },
  };
}

export function realEstateSchema(lot: {
  id: string;
  number: number | string;
  description?: string;
  photos: string[];
  priceRub: number;
  status: string;
  bedrooms: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SingleFamilyResidence",
    name: `Дом № ${lot.number} — посёлок Волжский Берег`,
    description: lot.description ?? `Готовый дом 138 м² у Волги в 8 км от Твери`,
    image: lot.photos.map((p) => (p.startsWith("http") ? p : `${SITE.url}${p}`)),
    url: `${SITE.url}/volzhsky-bereg/lot/${lot.id}`,
    numberOfRooms: lot.bedrooms + 2,
    floorSize: { "@type": "QuantitativeValue", value: 138, unitCode: "MTK" },
    yearBuilt: 2023,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Тверь",
      addressRegion: "Тверская область",
      addressCountry: "RU",
    },
    offers: {
      "@type": "Offer",
      price: lot.priceRub,
      priceCurrency: "RUB",
      availability:
        lot.status === "available"
          ? "https://schema.org/InStock"
          : "https://schema.org/SoldOut",
    },
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function articleSchema(a: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    url: `${SITE.url}/articles/${a.slug}`,
    datePublished: a.datePublished,
    dateModified: a.dateModified ?? a.datePublished,
    image: a.image ? `${SITE.url}${a.image}` : SITE.ogImage,
    author: { "@type": "Organization", name: SITE.name, url: SITE.url },
    publisher: { "@type": "Organization", name: SITE.name, logo: { "@type": "ImageObject", url: SITE.ogImage } },
  };
}
