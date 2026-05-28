import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/ui/Container";
import ContactFormSection from "@/components/sections/ContactFormSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleSchema, faqSchema, breadcrumbSchema } from "@/lib/schema";
import { articles, getArticleBySlug } from "@/lib/articles";
import IzhsVsSnt from "@/components/articles/IzhsVsSnt";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical: `/articles/${slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.datePublished,
      modifiedTime: article.dateModified ?? article.datePublished,
      authors: ["Презент-Строй"],
    },
  };
}

const CONTENT_MAP: Record<string, React.FC> = {
  "izhs-vs-snt-chto-vybrat-v-tverskoy-oblasti": IzhsVsSnt,
};

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const Content = CONTENT_MAP[slug];
  if (!Content) notFound();

  const crumbsLd = breadcrumbSchema([
    { name: "Главная", path: "/" },
    { name: "Статьи", path: "/articles" },
    { name: article.title, path: `/articles/${slug}` },
  ]);

  const articleLd = articleSchema({
    title: article.title,
    description: article.description,
    slug: article.slug,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
  });

  const faqLd = faqSchema(article.faq);

  const publishDate = new Date(article.datePublished).toLocaleDateString("ru-RU", {
    day: "numeric", month: "long", year: "numeric",
  });

  return (
    <>
      <JsonLd data={crumbsLd} />
      <JsonLd data={articleLd} />
      <JsonLd data={faqLd} />

      {/* Hero */}
      <section className="bg-primary py-20 pt-32">
        <Container>
          <nav className="flex items-center gap-2 text-sm text-white/50 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Главная</Link>
            <span>/</span>
            <Link href="/articles" className="hover:text-white transition-colors">Статьи</Link>
            <span>/</span>
            <span className="text-white/80 line-clamp-1">{article.title}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight max-w-3xl">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-white/50 text-sm">
            <time dateTime={article.datePublished}>{publishDate}</time>
            <span>·</span>
            <span>{article.readingMinutes} мин чтения</span>
            <span>·</span>
            <span>Команда Презент-Строй</span>
          </div>
        </Container>
      </section>

      {/* Article body */}
      <section className="py-14 bg-white">
        <Container>
          <div className="max-w-2xl mx-auto">
            <article className="article-body">
              <Content />
            </article>

            {/* FAQ */}
            <div className="mt-14">
              <h2 className="text-2xl font-bold text-primary mb-6">Часто задаваемые вопросы</h2>
              <div className="space-y-4">
                {article.faq.map((item, i) => (
                  <details key={i} className="border border-border group">
                    <summary className="flex items-center justify-between gap-3 px-5 py-4 cursor-pointer font-semibold text-primary hover:text-accent transition-colors list-none">
                      {item.q}
                      <svg className="w-4 h-4 shrink-0 text-muted group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-5 pb-4 text-muted text-sm leading-relaxed">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>

            {/* Back */}
            <div className="mt-10 pt-8 border-t border-border">
              <Link href="/articles" className="inline-flex items-center gap-2 text-accent hover:underline text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Все статьи
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <ContactFormSection />
    </>
  );
}
