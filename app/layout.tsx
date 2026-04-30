import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
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
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
