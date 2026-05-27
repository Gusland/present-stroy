import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { village, getLotCounters } from "@/data/villages";
import VillageIncluded from "@/components/villages/VillageIncluded";
import VillageMortgage from "@/components/villages/VillageMortgage";
import VillageContact from "@/components/villages/VillageContact";
import LeadForm from "@/components/villages/LeadForm";

const LANDINGS: Record<
  string,
  {
    title: string;
    h1: string;
    subtitle: string;
    ctaLabel: string;
    formType: "viewing" | "callback" | "mortgage" | "info";
    bullets: string[];
    formMessage: string;
  }
> = {
  "gotovyy-dom": {
    title: "Готовый дом под Тверью | Волжский Берег",
    h1: "Готовый дом — заехать через месяц",
    subtitle: "Не ждите 1,5–2 года строительства. 3 готовых дома на Волге, 8 км от Твери.",
    ctaLabel: "Записаться на просмотр",
    formType: "viewing",
    bullets: [
      "Дом сдан в 2023, три зимы уже прожиты",
      "Газ горит, котёл работает — можно жить сразу",
      "Черновая отделка: делайте ремонт немедленно",
      "138 м², 11 соток ИЖС, прописка возможна",
    ],
    formMessage: "Хочу посмотреть готовый дом",
  },
  "u-vody": {
    title: "Дом у воды под Тверью | Волжский Берег",
    h1: "50 метров до пирса на Волге",
    subtitle: "Дом в двух шагах от реки. Пирс, пляж Боровое озеро, деревянные скамейки над водой.",
    ctaLabel: "Посмотреть дома у воды",
    formType: "viewing",
    bullets: [
      "Пирс в 50 м от первой линии",
      "Пляж Боровое озеро — карьер с чистой водой",
      "Волга рядом — виды, рыбалка, вода",
      "22 дома, 19 продано — осталось 3",
    ],
    formMessage: "Интересует дом у воды",
  },
  ipoteka: {
    title: "Ипотека на готовый дом | Волжский Берег",
    h1: "Семейная ипотека 6% на готовый дом",
    subtitle: "ИЖС — работают все ипотечные программы. Семейная 6%, «Свой дом» 7%, стандарт.",
    ctaLabel: "Рассчитать ипотечный платёж",
    formType: "mortgage",
    bullets: [
      "Семейная ипотека 6% — если есть дети до 18 лет",
      "«Свой дом» 7% — ИЖС и дача",
      "Стандарт 16,5% — без ограничений",
      "Помогаем собрать документы и подать заявку",
    ],
    formMessage: "Хочу рассчитать ипотеку на дом",
  },
  pmzh: {
    title: "Дом для ПМЖ под Тверью | Волжский Берег",
    h1: "Постоянная прописка — уже сейчас",
    subtitle: "Категория ИЖС, дом в границах населённого пункта. Прописка через МФЦ без ограничений.",
    ctaLabel: "Узнать про оформление",
    formType: "info",
    bullets: [
      "ИЖС — постоянная регистрация (ПМЖ) разрешена",
      "Кадастр пройден, документы чистые",
      "8 км от центра Твери — вся инфраструктура рядом",
      "Школа, детский сад, магазин, аптека поблизости",
    ],
    formMessage: "Хочу узнать про прописку и документы",
  },
  "vyezd-na-prosmotr": {
    title: "Выезд на просмотр дома | Волжский Берег",
    h1: "Запишитесь на просмотр сегодня",
    subtitle: "Встретим, покажем все 3 свободных дома. Без навязывания — только честный разговор.",
    ctaLabel: "Записаться на выезд",
    formType: "viewing",
    bullets: [
      "Посёлок открыт для просмотров",
      "Покажем все 3 свободных дома",
      "Расскажем про ипотеку и сроки сделки",
      "Ответим на все вопросы на месте",
    ],
    formMessage: "Хочу записаться на просмотр",
  },
};

const SLUGS = Object.keys(LANDINGS);

export async function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<Record<string, string>> };

export default async function LandingPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const utm = await searchParams;
  const landing = LANDINGS[slug];
  if (!landing) notFound();

  const { available } = getLotCounters();

  // Filter UTM params only
  const utmParams: Record<string, string> = {};
  for (const [k, v] of Object.entries(utm)) {
    if (k.startsWith("utm_")) utmParams[k] = v;
  }

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end bg-primary overflow-hidden">
        <Image
          src={village.heroPhoto}
          alt="Пирс на Волге — посёлок Волжский Берег"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-primary/20" />

        <Container className="relative z-10 pb-12 pt-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
            <div>
              <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 text-accent text-sm font-medium px-4 py-1.5 mb-4">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                {available} дома в продаже · 14,3 млн ₽
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                {landing.h1}
              </h1>
              <p className="text-white/75 text-lg mb-6 leading-relaxed">
                {landing.subtitle}
              </p>
              <ul className="space-y-2">
                {landing.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-white/80 text-sm">
                    <svg className="w-4 h-4 text-accent shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* Inline form in hero */}
            <div className="bg-white p-6">
              <h2 className="text-lg font-bold text-primary mb-4">
                {landing.ctaLabel}
              </h2>
              <LeadForm
                type={landing.formType}
                source={`landing-${slug}`}
                utm={utmParams}
                messagePlaceholder={landing.formMessage}
                ctaLabel={landing.ctaLabel}
              />
            </div>
          </div>
        </Container>
      </section>

      {slug === "ipoteka" && (
        <VillageMortgage priceRub={village.defaultLot.priceRub} />
      )}

      <VillageIncluded />

      <VillageContact source={`landing-${slug}`} />

      {/* Back to main page */}
      <div className="py-8 bg-warm text-center">
        <Link
          href="/volzhsky-bereg"
          className="text-accent hover:underline text-sm font-medium"
        >
          ← Вернуться на страницу посёлка
        </Link>
      </div>
    </>
  );
}
