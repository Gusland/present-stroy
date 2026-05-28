import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { village, getAvailableLots } from "@/data/villages";

export default function VillageHighlight() {
  const lots = getAvailableLots();

  return (
    <section className="py-16 bg-white border-b border-border">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Photo */}
          <div className="relative aspect-[4/3] overflow-hidden border border-border">
            <Image
              src={village.heroPhoto}
              alt="Аэропанорама посёлка Волжский Берег на берегу Волги"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
            />
            <div className="absolute top-4 left-4 bg-primary/90 text-white text-xs font-semibold px-3 py-1.5">
              ГОТОВЫЙ ПОСЁЛОК · СДАН 2023
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">
              Волжский Берег
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4 leading-snug">
              {lots.length} готовых дома{" "}
              <br className="hidden md:block" />
              в 8 км от Твери
            </h2>

            <ul className="space-y-2 mb-6">
              {[
                "138 м², 11 соток ИЖС — всё в собственности",
                "Газ, котёл работает. Три зимы позади",
                "50 м до пирса на Волге",
                "Ипотека, семейная 6%, материнский капитал",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-muted">
                  <svg className="w-4 h-4 text-accent shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {b}
                </li>
              ))}
            </ul>

            {/* Mini lot previews */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              {lots.map((lot) => (
                <Link
                  key={lot.id}
                  href={`/volzhsky-bereg/lot/${lot.id}`}
                  className="border border-border hover:border-accent p-3 text-center transition-colors group"
                >
                  <div className="text-base font-bold text-primary group-hover:text-accent transition-colors">
                    № {lot.number}
                  </div>
                  <div className="text-accent text-xs font-semibold">
                    14,3 млн
                  </div>
                  <div className="text-muted text-xs mt-0.5 truncate">
                    {lot.distanceToPierM} м до пирса
                  </div>
                </Link>
              ))}
            </div>

            <Link
              href="/volzhsky-bereg"
              className="inline-flex items-center gap-2 bg-accent text-white font-semibold px-6 py-3 text-sm hover:bg-accent-dark transition-colors"
            >
              Смотреть посёлок
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
