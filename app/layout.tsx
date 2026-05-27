import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import VillageTicker from "@/components/layout/VillageTicker";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://present-stroy.ru"),
  title: {
    default: "Презент-Строй — строительство домов в Твери",
    template: "%s | Презент-Строй",
  },
  description:
    "Строительство домов под ключ в Твери и Тверской области. Более 10 лет опыта, 200+ объектов сданы. Бесплатная консультация и выезд на участок.",
  keywords: [
    "строительство домов Тверь",
    "дома под ключ Тверь",
    "строительная компания Тверь",
    "проекты домов Тверь",
    "строительство коттеджей Тверь",
    "ремонт квартир Тверь",
    "презент строй",
  ],
  authors: [{ name: "Презент-Строй" }],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "Презент-Строй",
    title: "Презент-Строй — строительство домов в Твери",
    description:
      "Строительство домов под ключ в Твери. Более 10 лет опыта, 200+ сданных объектов.",
    url: "https://present-stroy.ru",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Презент-Строй — строительная компания в Твери",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Презент-Строй — строительство домов в Твери",
    description:
      "Строительство домов под ключ в Твери. Более 10 лет опыта, 200+ сданных объектов.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://present-stroy.ru",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness", "HomeAndConstructionBusiness"],
      "@id": "https://present-stroy.ru/#organization",
      name: "Презент-Строй",
      legalName: 'ООО "Презент-Строй"',
      url: "https://present-stroy.ru",
      logo: {
        "@type": "ImageObject",
        url: "https://present-stroy.ru/og-image.jpg",
        width: 200,
        height: 60,
      },
      image: "https://present-stroy.ru/og-image.jpg",
      description:
        "Строительная компания в Твери. Строительство домов и коттеджей под ключ, ремонт квартир и офисов, загородные посёлки. Работаем с 2013 года.",
      foundingDate: "2013",
      address: {
        "@type": "PostalAddress",
        streetAddress: "ул. Маяковского, д. 33, офис 23",
        addressLocality: "Тверь",
        addressRegion: "Тверская область",
        postalCode: "170100",
        addressCountry: "RU",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 56.8589,
        longitude: 35.9176,
      },
      telephone: ["+7-4822-75-13-29", "+7-930-165-13-29"],
      email: "present-stroy@mail.ru",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
      ],
      sameAs: ["https://vk.com/present_stroy"],
      areaServed: {
        "@type": "AdministrativeArea",
        name: "Тверская область",
      },
      priceRange: "₽₽₽",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <VillageTicker />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
