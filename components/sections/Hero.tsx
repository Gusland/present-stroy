import Link from "next/link";
import Container from "@/components/ui/Container";
import { contacts } from "@/data/contacts";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-primary overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      {/* Placeholder image area */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block bg-primary-dark opacity-50" />

      <Container className="relative z-10 py-32">
        <div className="max-w-2xl">
          <div className="inline-block bg-accent/20 border border-accent/30 text-accent text-sm font-medium px-4 py-1.5 mb-6">
            Строительная компания в Твери с 2013 года
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Строим дома,
            <br />
            <span className="text-accent">в которых хочется жить</span>
          </h1>

          <p className="text-white/80 text-lg md:text-xl mb-8 leading-relaxed">
            Полный цикл строительства — от проектирования до сдачи под ключ.
            Качественные материалы, фиксированные цены и гарантия до 5 лет.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <Link
              href="/projects"
              className="bg-accent text-white px-8 py-4 font-semibold text-lg hover:bg-accent-dark transition-colors"
            >
              Смотреть проекты
            </Link>
            <Link
              href="/contacts"
              className="border-2 border-white text-white px-8 py-4 font-semibold text-lg hover:bg-white hover:text-primary transition-colors"
            >
              Бесплатная консультация
            </Link>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "10+", label: "лет опыта" },
              { value: "200+", label: "объектов сдано" },
              { value: "5 лет", label: "гарантия" },
              { value: "0%", label: "рассрочка" },
            ].map((stat) => (
              <div key={stat.label} className="border-l-2 border-accent pl-4">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Phone bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-sm border-t border-white/10">
        <Container className="py-3 flex items-center justify-between">
          <p className="text-white/70 text-sm">Звоните — консультируем бесплатно</p>
          <a
            href={`tel:${contacts.phone1Raw}`}
            className="text-white font-bold text-lg hover:text-accent transition-colors"
          >
            {contacts.phone1}
          </a>
        </Container>
      </div>
    </section>
  );
}
