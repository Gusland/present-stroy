import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import ContactFormSection from "@/components/sections/ContactFormSection";
import { buildObjects } from "@/data/objects";

export const metadata: Metadata = {
  title: "Карта объектов",
  description: "Карта реализованных объектов строительной компании Презент-Строй в Твери и Тверской области.",
};

export default function KartaObektovPage() {
  return (
    <>
      <section className="bg-primary py-24 pt-36">
        <Container>
          <div className="text-sm text-white/60 mb-2">
            <Link href="/about" className="hover:text-accent transition-colors">О компании</Link>
            {" / "}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Карта объектов</h1>
          <p className="text-white/70 text-xl max-w-2xl">
            Наши реализованные проекты в Твери и Тверской области
          </p>
        </Container>
      </section>

      <section className="py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {buildObjects.map((obj) => (
              <Link
                key={obj.slug}
                href={`/about/karta-obektov/${obj.slug}`}
                className="group border border-border hover:border-accent hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={obj.image}
                    alt={`Дом «${obj.name}» — ${obj.address}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    unoptimized
                  />
                </div>
                <div className="p-5 bg-white">
                  <h2 className="font-bold text-primary text-lg mb-1 group-hover:text-accent transition-colors">
                    «{obj.name}»
                  </h2>
                  <p className="text-muted text-sm">📍 {obj.address}</p>
                </div>
              </Link>
            ))}
          </div>

          <SectionTitle
            title="Статистика"
            subtitle="Более 200 построенных домов в Твери, Тверской области и Подмосковье"
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-center">
            <div className="bg-warm border border-border p-6">
              <div className="text-4xl font-bold text-accent mb-1">200+</div>
              <div className="text-muted text-sm">объектов построено</div>
            </div>
            <div className="bg-warm border border-border p-6">
              <div className="text-4xl font-bold text-accent mb-1">Тверь</div>
              <div className="text-muted text-sm">основная география</div>
            </div>
            <div className="bg-warm border border-border p-6">
              <div className="text-4xl font-bold text-accent mb-1">10+</div>
              <div className="text-muted text-sm">лет на рынке</div>
            </div>
          </div>
        </Container>
      </section>

      <ContactFormSection />
    </>
  );
}
