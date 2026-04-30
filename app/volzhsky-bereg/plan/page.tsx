import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/Container";
import ContactFormSection from "@/components/sections/ContactFormSection";

export const metadata: Metadata = {
  title: "План поселка — Волжский берег",
  description: "Генеральный план эко-посёлка «Волжский берег» в Твери. Расположение участков, инфраструктура.",
};

const planImages = [
  {
    src: "https://present-stroy.ru/netcat_files/220/767/plan_poselka_dobav_te_i_eto_foto.jpg",
    alt: "План поселка Волжский берег",
  },
  {
    src: "https://present-stroy.ru/netcat_files/220/767/gen_plan.jpeg",
    alt: "Генеральный план поселка",
  },
];

export default function PlanPage() {
  return (
    <>
      <section className="bg-primary py-24 pt-36">
        <Container>
          <div className="text-sm text-white/60 mb-2">
            <a href="/volzhsky-bereg" className="hover:text-accent transition-colors">Волжский берег</a> /
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">План поселка</h1>
          <p className="text-white/70 text-xl max-w-2xl">
            Генеральный план эко-посёлка «Волжский берег»
          </p>
        </Container>
      </section>

      <section className="py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
            {planImages.map((img, i) => (
              <div key={i} className="border border-border overflow-hidden">
                <div className="relative aspect-square">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="p-3 text-center text-sm text-muted">{img.alt}</div>
              </div>
            ))}
          </div>

          <div className="bg-warm border border-border p-8 max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-primary mb-3">Скачать план поселка</h2>
            <p className="text-muted mb-6">
              Генеральный план эко-посёлка «Волжский берег» в формате PDF с расположением
              всех участков и инфраструктуры.
            </p>
            <a
              href="/volzskiyBeregPlan.pdf"
              download
              className="inline-flex items-center gap-3 bg-accent text-white px-8 py-3 font-semibold hover:bg-accent-dark transition-colors mb-4"
            >
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
              Скачать план (PDF)
            </a>
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-muted text-sm mb-3">Остались вопросы?</p>
              <a
                href="/contacts"
                className="inline-block border-2 border-primary text-primary px-8 py-3 font-semibold hover:bg-primary hover:text-white transition-colors"
              >
                Получить консультацию
              </a>
            </div>
          </div>
        </Container>
      </section>

      <ContactFormSection />
    </>
  );
}
