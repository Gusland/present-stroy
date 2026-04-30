import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { news } from "@/data/news";

export const metadata: Metadata = {
  title: "Новости и акции",
  description:
    "Актуальные новости и акции строительной компании Презент-Строй в Твери.",
};

export default function NewsPage() {
  const promos = news.filter((n) => n.category === "promo");
  const articles = news.filter((n) => n.category === "news");

  return (
    <>
      <section className="bg-primary py-24 pt-36">
        <Container>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Новости и акции
          </h1>
          <p className="text-white/70 text-xl max-w-2xl">
            Актуальные предложения и события компании
          </p>
        </Container>
      </section>

      {promos.length > 0 && (
        <section className="py-20 bg-accent/5 border-b border-border">
          <Container>
            <SectionTitle title="Акции" align="left" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {promos.map((item) => (
                <Link
                  key={item.id}
                  href={`/news/${item.id}`}
                  className="group bg-white border-2 border-accent/30 hover:border-accent hover:shadow-md transition-all duration-300 overflow-hidden"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      unoptimized
                    />
                  </div>
                  <div className="p-5">
                    <span className="inline-block text-xs font-semibold px-2 py-0.5 mb-3 bg-accent/10 text-accent">
                      Акция
                    </span>
                    <h2 className="font-bold text-primary text-lg mb-2 group-hover:text-accent transition-colors leading-snug">
                      {item.title}
                    </h2>
                    <p className="text-muted text-sm mb-4 leading-relaxed">{item.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted">{item.date}</span>
                      <span className="text-accent text-sm font-semibold group-hover:underline">
                        Подробнее →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {articles.length > 0 && (
        <section className="py-20 bg-white">
          <Container>
            <SectionTitle title="Новости" align="left" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((item) => (
                <Link
                  key={item.id}
                  href={`/news/${item.id}`}
                  className="group bg-white border border-border hover:border-accent hover:shadow-md transition-all duration-300 overflow-hidden"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      unoptimized
                    />
                  </div>
                  <div className="p-5">
                    <span className="inline-block text-xs font-semibold px-2 py-0.5 mb-3 bg-primary/10 text-primary">
                      Новость
                    </span>
                    <h2 className="font-bold text-primary text-lg mb-2 group-hover:text-accent transition-colors leading-snug">
                      {item.title}
                    </h2>
                    <p className="text-muted text-sm mb-4 leading-relaxed">{item.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted">{item.date}</span>
                      <span className="text-accent text-sm font-semibold group-hover:underline">
                        Читать →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
