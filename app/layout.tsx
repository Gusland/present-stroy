import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import VillageTicker from "@/components/layout/VillageTicker";
import { SITE, META } from "@/lib/seo";
import { localBusinessSchema } from "@/lib/schema";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: META.defaultTitle,
    template: META.titleTemplate,
  },
  description: META.defaultDescription,
  keywords: [
    "строительство домов Тверь",
    "дома под ключ Тверь",
    "строительная компания Тверь",
    "проекты домов Тверь",
    "строительство коттеджей Тверь",
    "ремонт квартир Тверь",
    "презент строй",
  ],
  authors: [{ name: SITE.name }],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: SITE.brand,
    title: META.defaultTitle,
    description: META.defaultDescription,
    url: SITE.url,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: `${SITE.name} — строительная компания в Твери` }],
  },
  twitter: {
    card: "summary_large_image",
    title: META.defaultTitle,
    description: META.defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: { canonical: SITE.url },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const ldJson = localBusinessSchema();

  return (
    <html lang="ru" className={`${inter.variable} h-full`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }} />
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
