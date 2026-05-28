import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import ContactFormSection from "@/components/sections/ContactFormSection";
import { news } from "@/data/news";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return news.map((n) => ({ slug: n.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = news.find((n) => n.id === slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.excerpt,
    alternates: { canonical: `/news/${slug}` },
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const item = news.find((n) => n.id === slug);
  if (!item) notFound();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: "https://xn----itbahmwicjfkkc.xn--p1ai" },
      { "@type": "ListItem", position: 2, name: "Новости и акции", item: "https://xn----itbahmwicjfkkc.xn--p1ai/news" },
      { "@type": "ListItem", position: 3, name: item.title, item: `https://xn----itbahmwicjfkkc.xn--p1ai/news/${slug}` },
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
            <Link href="/news" className="hover:text-accent transition-colors">
              Новости и акции
            </Link>
            {" / "}
          </div>
          <span
            className={`inline-block text-xs font-semibold px-3 py-1 mb-4 ${
              item.category === "promo"
                ? "bg-accent/20 border border-accent/30 text-accent"
                : "bg-white/10 text-white/70"
            }`}
          >
            {item.category === "promo" ? "Акция" : "Новость"}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight max-w-3xl">
            {item.title}
          </h1>
          <p className="text-white/60 text-sm">{item.date}</p>
        </Container>
      </section>

      <section className="py-16 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {/* Main content */}
            <div className="lg:col-span-2">
              {/* Featured image */}
              <div className="relative aspect-[4/3] overflow-hidden border border-border mb-8">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
              </div>

              {/* Body text */}
              {item.content && item.content.length > 0 && (
                <div className="prose prose-lg max-w-none text-muted leading-relaxed space-y-4 mb-8">
                  {item.content.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              )}

              {/* Property details table */}
              {item.details && item.details.length > 0 && (
                <div className="bg-warm border border-border p-6 mb-8">
                  <h2 className="font-bold text-primary text-xl mb-4">Характеристики</h2>
                  <table className="w-full text-sm">
                    <tbody>
                      {item.details.map((row) => (
                        <tr key={row.label} className="border-b border-border last:border-0">
                          <td className="py-3 text-muted pr-4">{row.label}</td>
                          <td className="py-3 font-semibold text-primary text-right">{row.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <Link
                href="/contacts"
                className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 font-semibold text-lg hover:bg-accent-dark transition-colors"
              >
                Узнать подробнее
              </Link>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-warm border border-border p-6 sticky top-28">
                <h3 className="font-bold text-primary text-lg mb-4">Связаться с нами</h3>
                <p className="text-muted text-sm mb-5 leading-relaxed">
                  Есть вопросы? Звоните или оставьте заявку — бесплатно проконсультируем.
                </p>
                <Link
                  href="/contacts"
                  className="block text-center bg-primary text-white px-6 py-3 font-semibold hover:bg-accent transition-colors text-sm mb-3"
                >
                  Оставить заявку
                </Link>
                <a
                  href="tel:+79812021261"
                  className="block text-center border border-primary text-primary px-6 py-3 font-semibold hover:bg-primary hover:text-white transition-colors text-sm"
                >
                  +7 (981) 202-12-61
                </a>

                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="font-semibold text-primary text-sm mb-3">Другие материалы</h4>
                  <div className="space-y-3">
                    {news
                      .filter((n) => n.id !== item.id)
                      .map((other) => (
                        <Link
                          key={other.id}
                          href={`/news/${other.id}`}
                          className="flex gap-3 group"
                        >
                          <div className="relative w-16 h-16 shrink-0 overflow-hidden border border-border">
                            <Image
                              src={other.image}
                              alt={other.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-300"
                              unoptimized
                            />
                          </div>
                          <p className="text-sm text-primary group-hover:text-accent transition-colors leading-snug line-clamp-3">
                            {other.title}
                          </p>
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <ContactFormSection />
    </>
  );
}
