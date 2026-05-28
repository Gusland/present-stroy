import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import ContactFormSection from "@/components/sections/ContactFormSection";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Услуги строительной компании в Твери",
  description:
    "Полный комплекс строительных услуг в Твери: строительство из кирпича и газосиликата, ремонт, штукатурка, электрика, сантехника, кровля, фасад, фундамент.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-primary py-24 pt-36">
        <Container>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Наши услуги</h1>
          <p className="text-white/70 text-xl max-w-2xl">
            Полный цикл строительства — один подрядчик, никаких лишних согласований
          </p>
        </Container>
      </section>

      <section className="py-20 bg-white">
        <Container>
          <SectionTitle
            title="Что мы делаем"
            subtitle="От первого эскиза до передачи ключей — всё в одном месте"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service) => (
              <Link
                key={service.id}
                href={service.href}
                className="group bg-warm border border-border p-7 hover:border-accent hover:shadow-md transition-all duration-300 flex flex-col"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h2 className="font-bold text-primary text-xl mb-3 group-hover:text-accent transition-colors">
                  {service.title}
                </h2>
                <p className="text-muted leading-relaxed text-sm flex-1">{service.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  {service.price ? (
                    <span className="text-accent font-semibold text-sm">{service.price}</span>
                  ) : (
                    <span />
                  )}
                  <span className="text-accent text-sm font-semibold group-hover:underline flex items-center gap-1">
                    Подробнее
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <ContactFormSection />
    </>
  );
}
