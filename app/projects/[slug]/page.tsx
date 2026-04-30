import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import ContactFormSection from "@/components/sections/ContactFormSection";
import { projects } from "@/data/projects";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `Проект «${project.name}» — ${project.specs.общая} м²`,
    description: `Проект дома «${project.name}» площадью ${project.specs.общая} м², ${project.specs.этажность} этаж. Строительство в Твери.`,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const specRows = [
    project.specs.жилая && { label: "Жилая площадь", value: `${project.specs.жилая} м²` },
    project.specs.застройка && { label: "Площадь застройки", value: `${project.specs.застройка} м²` },
    { label: "Общая площадь", value: `${project.specs.общая} м²` },
    project.specs.объём && { label: "Объём", value: `${project.specs.объём} м³` },
    { label: "Этажность", value: `${project.specs.этажность} эт.` },
    project.specs.высота && { label: "Высота конька", value: `${project.specs.высота} м` },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <>
      {/* Hero */}
      <section className="bg-primary py-24 pt-36">
        <Container>
          <div className="text-sm text-white/60 mb-2">
            <Link href="/projects" className="hover:text-accent transition-colors">Проекты</Link>
            {" / "}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Дом «{project.name}»
          </h1>
          <p className="text-white/70 text-xl">
            {project.specs.общая} м² · {project.specs.этажность} эт. · Тверь
          </p>
        </Container>
      </section>

      <section className="py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Gallery */}
            <div>
              {/* Main image */}
              <a href={project.images[0]} target="_blank" rel="noopener noreferrer" className="block group relative aspect-[4/3] overflow-hidden border border-border hover:border-accent transition-colors mb-3">
                <Image
                  src={project.images[0]}
                  alt={`Дом «${project.name}» — главное фото`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  unoptimized
                />
              </a>
              {/* Thumbnails */}
              {project.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {project.images.slice(1).map((src, i) => (
                    <a
                      key={i}
                      href={src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative aspect-square overflow-hidden border border-border hover:border-accent transition-colors block"
                    >
                      <Image
                        src={src}
                        alt={`Дом «${project.name}» — фото ${i + 2}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="25vw"
                        unoptimized
                      />
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">Характеристики</h2>
              <table className="w-full text-sm mb-8">
                <tbody>
                  {specRows.map((row) => (
                    <tr key={row.label} className="border-b border-border">
                      <td className="py-3 text-muted pr-4">{row.label}</td>
                      <td className="py-3 font-semibold text-primary text-right">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* 90 days */}
              <div className="bg-warm border border-border p-5 mb-5">
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-bold text-accent shrink-0">90</div>
                  <div>
                    <div className="font-bold text-primary">дней — срок строительства</div>
                    <div className="text-muted text-sm">Точные сроки прописываем в договоре</div>
                  </div>
                </div>
              </div>

              {/* Financing */}
              <div className="bg-warm border border-border p-5 mb-8">
                <h3 className="font-bold text-primary mb-3">Варианты финансирования</h3>
                <ul className="space-y-2 text-sm text-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">✓</span>
                    Семейная ипотека — от 6%
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">✓</span>
                    IT-ипотека — от 5%
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">✓</span>
                    Материнский капитал
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">✓</span>
                    Рассрочка 0%
                  </li>
                </ul>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contacts"
                  className="flex-1 text-center bg-accent text-white px-6 py-3 font-semibold hover:bg-accent-dark transition-colors"
                >
                  Получить смету
                </Link>
                <Link
                  href="/contacts"
                  className="flex-1 text-center border-2 border-primary text-primary px-6 py-3 font-semibold hover:bg-primary hover:text-white transition-colors"
                >
                  Задать вопрос
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <ContactFormSection />
    </>
  );
}
