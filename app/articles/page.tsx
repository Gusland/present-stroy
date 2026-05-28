import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { articles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Статьи о строительстве домов в Твери — Презент-Строй",
  description:
    "Полезные статьи о строительстве частных домов в Твери и Тверской области: цены, материалы, ипотека, выбор участка. Опыт застройщика с 2013 года.",
  alternates: { canonical: "/articles" },
};

export default function ArticlesPage() {
  return (
    <>
      <section className="bg-primary py-24 pt-36">
        <Container>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Статьи</h1>
          <p className="text-white/70 text-xl max-w-2xl">
            Отвечаем на вопросы о строительстве, ипотеке и выборе участка в Тверской области
          </p>
        </Container>
      </section>

      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-2xl mx-auto space-y-6">
            {articles.map((article) => {
              const date = new Date(article.datePublished).toLocaleDateString("ru-RU", {
                day: "numeric", month: "long", year: "numeric",
              });
              return (
                <Link
                  key={article.slug}
                  href={`/articles/${article.slug}`}
                  className="block border border-border hover:border-accent p-6 transition-colors group"
                >
                  <div className="flex items-center gap-3 text-xs text-muted mb-3">
                    <time dateTime={article.datePublished}>{date}</time>
                    <span>·</span>
                    <span>{article.readingMinutes} мин чтения</span>
                  </div>
                  <h2 className="text-lg font-bold text-primary group-hover:text-accent transition-colors mb-2 leading-snug">
                    {article.title}
                  </h2>
                  <p className="text-muted text-sm leading-relaxed line-clamp-2">
                    {article.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-accent text-sm font-medium mt-4">
                    Читать статью
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
