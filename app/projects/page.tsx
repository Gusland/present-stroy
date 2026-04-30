import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import ContactFormSection from "@/components/sections/ContactFormSection";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Проекты домов",
  description:
    "Каталог проектов домов в Твери: типовые и индивидуальные проекты от 63 до 325 м². Планировки, фото, характеристики.",
};

export default function ProjectsPage() {
  return (
    <>
      <section className="bg-primary py-24 pt-36">
        <Container>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Проекты в наличии</h1>
          <p className="text-white/70 text-xl max-w-2xl">
            Готовые типовые проекты с возможностью адаптации под ваш участок
          </p>
        </Container>
      </section>

      <section className="py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group bg-white border border-border hover:border-accent hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.images[0]}
                    alt={`Дом «${project.name}»`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    unoptimized
                  />
                </div>
                <div className="p-6">
                  <h2 className="font-bold text-primary text-xl mb-3 group-hover:text-accent transition-colors">
                    «{project.name}»
                  </h2>
                  <div className="grid grid-cols-2 gap-2 text-sm text-muted mb-5">
                    <div>
                      <span className="block text-xs text-muted/70 mb-0.5">Общая площадь</span>
                      <span className="font-semibold text-primary">{project.specs.общая} м²</span>
                    </div>
                    <div>
                      <span className="block text-xs text-muted/70 mb-0.5">Этажность</span>
                      <span className="font-semibold text-primary">{project.specs.этажность} эт.</span>
                    </div>
                    {project.specs.жилая && (
                      <div>
                        <span className="block text-xs text-muted/70 mb-0.5">Жилая площадь</span>
                        <span className="font-semibold text-primary">{project.specs.жилая} м²</span>
                      </div>
                    )}
                    {project.specs.высота && (
                      <div>
                        <span className="block text-xs text-muted/70 mb-0.5">Высота конька</span>
                        <span className="font-semibold text-primary">{project.specs.высота} м</span>
                      </div>
                    )}
                  </div>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center justify-center w-full gap-2 bg-primary text-white py-2.5 font-semibold text-sm hover:bg-accent transition-colors"
                  >
                    Смотреть проект
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 bg-warm border-t border-border">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
              Нашли подходящий проект?
            </h2>
            <p className="text-muted mb-8">
              Оставьте заявку — мы рассчитаем стоимость строительства и проконсультируем по всем вопросам бесплатно.
            </p>
            <Link
              href="/contacts"
              className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 font-semibold text-lg hover:bg-accent-dark transition-colors"
            >
              Получить консультацию
            </Link>
          </div>
        </Container>
      </section>

      <ContactFormSection />
    </>
  );
}
