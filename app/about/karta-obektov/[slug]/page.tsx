import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import ContactFormSection from "@/components/sections/ContactFormSection";
import { buildObjects } from "@/data/objects";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return buildObjects.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const obj = buildObjects.find((o) => o.slug === slug);
  if (!obj) return {};
  return {
    title: `Объект «${obj.name}» — ${obj.address}`,
    description: `Реализованный проект дома «${obj.name}» по адресу ${obj.address}. Строительная компания Презент-Строй.`,
    alternates: { canonical: `/about/karta-obektov/${slug}` },
  };
}

export default async function ObjectPage({ params }: Props) {
  const { slug } = await params;
  const obj = buildObjects.find((o) => o.slug === slug);
  if (!obj) notFound();

  const specRows = [
    obj.specs?.жилая && { label: "Жилая площадь", value: `${obj.specs.жилая} м²` },
    obj.specs?.общая && { label: "Общая площадь", value: `${obj.specs.общая} м²` },
    obj.specs?.этажность && { label: "Этажность", value: `${obj.specs.этажность} эт.` },
    obj.specs?.высота && { label: "Высота конька", value: `${obj.specs.высота} м` },
  ].filter(Boolean) as { label: string; value: string }[];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: "https://xn----itbahmwicjfkkc.xn--p1ai" },
      { "@type": "ListItem", position: 2, name: "Карта объектов", item: "https://xn----itbahmwicjfkkc.xn--p1ai/about/karta-obektov" },
      { "@type": "ListItem", position: 3, name: obj.name, item: `https://xn----itbahmwicjfkkc.xn--p1ai/about/karta-obektov/${slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="bg-primary py-24 pt-36">
        <Container>
          <div className="text-sm text-white/60 mb-2">
            <Link href="/about" className="hover:text-accent transition-colors">О компании</Link>
            {" / "}
            <Link href="/about/karta-obektov" className="hover:text-accent transition-colors">Карта объектов</Link>
            {" / "}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Дом «{obj.name}»
          </h1>
          <p className="text-white/70 text-xl">
            📍 {obj.address}
          </p>
        </Container>
      </section>

      <section className="py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Photo */}
            <div>
              <a
                href={obj.image}
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative aspect-[4/3] overflow-hidden border border-border hover:border-accent transition-colors"
              >
                <Image
                  src={obj.image}
                  alt={`Дом «${obj.name}» — ${obj.address}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  unoptimized
                />
              </a>
            </div>

            {/* Info */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">Информация об объекте</h2>

              <div className="bg-warm border border-border p-5 mb-6">
                <div className="text-sm text-muted mb-1">Адрес объекта</div>
                <div className="font-semibold text-primary">📍 {obj.address}</div>
              </div>

              {specRows.length > 0 && (
                <table className="w-full text-sm mb-6">
                  <tbody>
                    {specRows.map((row) => (
                      <tr key={row.label} className="border-b border-border">
                        <td className="py-3 text-muted pr-4">{row.label}</td>
                        <td className="py-3 font-semibold text-primary text-right">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {obj.projectSlug && (
                <Link
                  href={`/projects/${obj.projectSlug}`}
                  className="inline-flex items-center gap-2 border-2 border-primary text-primary px-6 py-3 font-semibold hover:bg-primary hover:text-white transition-colors mb-4 w-full justify-center"
                >
                  Смотреть проект «{obj.name}»
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              )}

              <Link
                href="/contacts"
                className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 font-semibold hover:bg-accent-dark transition-colors w-full justify-center"
              >
                Заказать такой же дом
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <ContactFormSection />
    </>
  );
}
