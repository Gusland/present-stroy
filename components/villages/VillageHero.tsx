import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { village, getLotCounters } from "@/data/villages";

export default function VillageHero() {
  const { total, sold, available } = getLotCounters();

  return (
    <section className="relative min-h-[90vh] flex items-end bg-primary overflow-hidden">
      <Image
        src={village.heroPhoto}
        alt="Аэропанорама посёлка Волжский Берег на берегу Волги"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/40 to-primary/20" />

      <Container className="relative z-10 pb-16 pt-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 text-accent text-sm font-medium px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            Сдан 2023 · {available} дома в продаже
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Волжский Берег
            <br />
            <span className="text-accent">готовые дома</span>
          </h1>

          <p className="text-white/80 text-xl mb-2 font-medium">
            8 км от центра Твери · правый берег Волги
          </p>
          <p className="text-white/65 text-lg mb-8">
            {total} домов в 2 линиях · {sold} продано · {available} свободных от{" "}
            <span className="text-accent font-semibold">14 300 000 ₽</span>
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-10">
            <Link
              href="#plan"
              className="bg-accent text-white font-semibold px-6 py-3.5 hover:bg-accent-dark transition-colors text-sm"
            >
              Смотреть свободные дома
            </Link>
            <Link
              href="#contact"
              className="border-2 border-white text-white font-semibold px-6 py-3.5 hover:bg-white hover:text-primary transition-colors text-sm"
            >
              Записаться на просмотр
            </Link>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 border-t border-white/20 pt-6">
            {[
              { value: "138 м²", label: "площадь дома" },
              { value: "11 соток", label: "участок ИЖС" },
              { value: "3 зимы", label: "дом уже живёт" },
              { value: "50 м", label: "до пирса" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-bold text-accent">{s.value}</div>
                <div className="text-white/60 text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
