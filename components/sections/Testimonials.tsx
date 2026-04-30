import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <Container>
        <SectionTitle
          title="Что говорят клиенты"
          subtitle="Реальные отзывы от людей, которые уже живут в построенных нами домах"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-warm border border-border p-7 relative"
            >
              {/* Quote mark */}
              <div className="text-6xl text-accent/20 font-serif leading-none absolute top-4 right-6 select-none">
                "
              </div>

              <p className="text-primary leading-relaxed mb-5 relative z-10">
                {t.text}
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-primary">{t.name}</div>
                  {t.project && (
                    <div className="text-sm text-muted">Дом «{t.project}»</div>
                  )}
                </div>
                <div className="text-sm text-muted">{t.date}</div>
              </div>

              {/* Rating stars */}
              <div className="flex gap-0.5 mt-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
