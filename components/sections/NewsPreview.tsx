import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { news } from "@/data/news";

export default function NewsPreview() {
  return (
    <section className="py-20 bg-warm">
      <Container>
        <SectionTitle
          title="Новости и акции"
          subtitle="Актуальные предложения и события компании"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {news.map((item) => (
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
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                />
              </div>
              <div className="p-5">
                <span
                  className={`inline-block text-xs font-semibold px-2 py-0.5 mb-3 ${
                    item.category === "promo"
                      ? "bg-accent/10 text-accent"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  {item.category === "promo" ? "Акция" : "Новость"}
                </span>
                <h3 className="font-bold text-primary mb-2 group-hover:text-accent transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-muted text-sm line-clamp-3 mb-3 leading-relaxed">
                  {item.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">{item.date}</span>
                  <span className="text-accent text-sm font-semibold group-hover:underline">
                    Смотреть →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 border-2 border-primary text-primary px-8 py-3 font-semibold hover:bg-primary hover:text-white transition-colors"
          >
            Все новости
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </Container>
    </section>
  );
}
