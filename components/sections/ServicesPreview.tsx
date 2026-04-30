import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { services } from "@/data/services";

export default function ServicesPreview() {
  const preview = services.slice(0, 6);

  return (
    <section className="py-20 bg-warm">
      <Container>
        <SectionTitle
          title="Что мы делаем"
          subtitle="Полный комплекс услуг — не нужно искать разных подрядчиков"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {preview.map((service) => (
            <Link
              key={service.id}
              href={service.href}
              className="bg-white p-6 border border-border hover:border-accent hover:shadow-md transition-all duration-300 group"
            >
              <div className="text-3xl mb-4">{service.icon}</div>
              <h3 className="font-bold text-primary text-lg mb-2 group-hover:text-accent transition-colors">
                {service.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">{service.description}</p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 border-2 border-primary text-primary px-8 py-3 font-semibold hover:bg-primary hover:text-white transition-colors"
          >
            Все услуги
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </Container>
    </section>
  );
}
