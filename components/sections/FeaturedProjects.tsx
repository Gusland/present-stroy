import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { projects } from "@/data/projects";

export default function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured).slice(0, 4);

  return (
    <section className="py-20 bg-white">
      <Container>
        <SectionTitle
          title="Наши проекты"
          subtitle="Готовые типовые проекты домов с возможностью адаптации под ваш участок"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group bg-white border border-border hover:border-accent transition-all duration-300 hover:shadow-lg overflow-hidden"
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <Image
                  src={project.images[0]}
                  alt={`Дом «${project.name}»`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  unoptimized
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-primary text-lg mb-1 group-hover:text-accent transition-colors">
                  «{project.name}»
                </h3>
                <div className="flex gap-4 text-sm text-muted mb-3">
                  <span>{project.specs.общая} м²</span>
                  <span>{project.specs.этажность} эт.</span>
                </div>
                <span className="text-accent text-sm font-semibold flex items-center gap-1">
                  Смотреть проект
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 border-2 border-primary text-primary px-8 py-3 font-semibold hover:bg-primary hover:text-white transition-colors"
          >
            Все проекты
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </Container>
    </section>
  );
}
