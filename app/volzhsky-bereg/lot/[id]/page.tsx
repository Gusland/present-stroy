import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { village, getLotById } from "@/data/villages";
import Container from "@/components/ui/Container";
import VillageIncluded from "@/components/villages/VillageIncluded";
import VillageMortgage from "@/components/villages/VillageMortgage";
import VillageContact from "@/components/villages/VillageContact";

const BASE = "https://present-stroy.ru";

export async function generateStaticParams() {
  return village.lots.map((lot) => ({ id: lot.id }));
}

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const lot = getLotById(id);
  if (!lot) return {};

  const isSold = lot.status === "sold";
  const title = isSold
    ? `Дом № ${lot.number} — продан | Волжский Берег`
    : `Дом № ${lot.number} — 138 м² у Волги | Волжский Берег`;

  return {
    title,
    description: isSold
      ? `Дом № ${lot.number} в посёлке Волжский Берег уже продан. Посмотрите свободные дома.`
      : `Готовый дом № ${lot.number} в посёлке Волжский Берег. 138 м², 11 соток ИЖС, 14 300 000 ₽. До пирса ${lot.distanceToPierM ?? 120} м.`,
    alternates: { canonical: `${BASE}/volzhsky-bereg/lot/${id}` },
    openGraph: {
      title,
      url: `${BASE}/volzhsky-bereg/lot/${id}`,
      images: [{ url: `${BASE}/volzhsky-bereg/lot/${id}/opengraph-image`, width: 1200, height: 630 }],
    },
    robots: isSold ? undefined : { index: true, follow: true },
  };
}

export default async function LotPage({ params }: Props) {
  const { id } = await params;
  const lot = getLotById(id);
  if (!lot) notFound();

  const { defaultLot } = village;
  const isSold = lot.status === "sold";
  const price = new Intl.NumberFormat("ru-RU").format(defaultLot.priceRub);

  const availableLots = village.lots.filter(
    (l) => l.status === "available" && l.id !== lot.id
  );

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: `${BASE}` },
      { "@type": "ListItem", position: 2, name: "Волжский Берег", item: `${BASE}/volzhsky-bereg` },
      { "@type": "ListItem", position: 3, name: `Дом № ${lot.number}`, item: `${BASE}/volzhsky-bereg/lot/${id}` },
    ],
  };

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Дом № ${lot.number} — ${village.name}`,
    description: lot.description ?? `Готовый дом ${defaultLot.houseAreaM2} м², ${defaultLot.plotAreaSot} соток.`,
    image: lot.photos[0] ? `${BASE}${lot.photos[0]}` : undefined,
    brand: { "@type": "Organization", name: "Презент-Строй" },
    offers: {
      "@type": "Offer",
      price: defaultLot.priceRub,
      priceCurrency: "RUB",
      availability: isSold
        ? "https://schema.org/SoldOut"
        : "https://schema.org/InStock",
      url: `${BASE}/volzhsky-bereg/lot/${id}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />

      {/* Breadcrumbs */}
      <div className="bg-warm border-b border-border pt-24 pb-3">
        <Container>
          <nav aria-label="Навигация" className="flex items-center gap-2 text-sm text-muted flex-wrap">
            <Link href="/" className="hover:text-accent transition-colors">
              Главная
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/volzhsky-bereg" className="hover:text-accent transition-colors">
              Волжский Берег
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-primary font-medium">Дом № {lot.number}</span>
          </nav>
        </Container>
      </div>

      {/* Hero */}
      <section className="py-10 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
            {/* Gallery */}
            <div>
              {isSold ? (
                <div className="relative aspect-[4/3] bg-border flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-muted mb-2">Продан</p>
                    <p className="text-muted text-sm">Этот дом уже нашёл хозяина</p>
                  </div>
                </div>
              ) : lot.photos.length > 0 ? (
                <div className="space-y-3">
                  <div className="relative aspect-[4/3] overflow-hidden border border-border">
                    <Image
                      src={lot.photos[0]}
                      alt={`Дом № ${lot.number} — ${village.name}`}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                  </div>
                  {lot.photos.length > 1 && (
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                      {lot.photos.slice(1).map((src, i) => (
                        <div key={src} className="relative aspect-square overflow-hidden border border-border">
                          <Image
                            src={src}
                            alt={`Дом № ${lot.number} — фото ${i + 2}`}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                            sizes="150px"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative aspect-[4/3] overflow-hidden border border-border">
                  <Image
                    src={village.heroPhoto}
                    alt={`Дом № ${lot.number} — ${village.name}`}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                </div>
              )}
            </div>

            {/* Card */}
            <div className="lg:sticky lg:top-24">
              <div className="border border-border bg-warm p-6">
                {isSold ? (
                  <>
                    <div className="inline-block bg-muted/20 text-muted text-xs font-semibold px-3 py-1 mb-3">
                      ПРОДАН
                    </div>
                    <h1 className="text-2xl font-bold text-primary mb-4">
                      Дом № {lot.number}
                    </h1>
                    <p className="text-muted text-sm mb-6">
                      Этот дом уже продан. Посмотрите оставшиеся свободные дома.
                    </p>
                    <Link
                      href="/volzhsky-bereg#plan"
                      className="block w-full text-center bg-accent text-white font-semibold py-3 text-sm hover:bg-accent-dark transition-colors"
                    >
                      Смотреть свободные дома →
                    </Link>
                  </>
                ) : (
                  <>
                    <div className="inline-block bg-accent/15 text-accent text-xs font-semibold px-3 py-1 mb-3">
                      СВОБОДЕН
                    </div>
                    <h1 className="text-2xl font-bold text-primary mb-1">
                      Дом № {lot.number}
                    </h1>

                    <div className="text-3xl font-bold text-primary mb-5">
                      {price} ₽
                    </div>

                    {/* Key params */}
                    <dl className="space-y-2 text-sm mb-6 border-t border-border pt-4">
                      {[
                        { dt: "Площадь", dd: `${defaultLot.houseAreaM2} м²` },
                        { dt: "Участок", dd: `${defaultLot.plotAreaSot} соток ИЖС` },
                        { dt: "Линия", dd: `${lot.line}-я` },
                        { dt: "До пирса", dd: `${lot.distanceToPierM ?? 120} м` },
                        { dt: "Спальни", dd: `${defaultLot.bedrooms}` },
                        { dt: "Потолки", dd: `${defaultLot.ceilingHeightM} м` },
                        { dt: "Год", dd: `${village.year}` },
                        { dt: "Отделка", dd: defaultLot.finish },
                        { dt: "Гарантия", dd: `${defaultLot.warrantyYears} года` },
                      ].map(({ dt, dd }) => (
                        <div key={dt} className="flex justify-between gap-2">
                          <dt className="text-muted">{dt}</dt>
                          <dd className="font-semibold text-primary text-right">{dd}</dd>
                        </div>
                      ))}
                    </dl>

                    {/* CTAs */}
                    <div className="space-y-2">
                      <Link
                        href="#contact"
                        className="block w-full text-center bg-accent text-white font-semibold py-3 text-sm hover:bg-accent-dark transition-colors"
                      >
                        Записаться на просмотр
                      </Link>
                      <Link
                        href="#contact"
                        className="block w-full text-center border border-primary text-primary font-semibold py-3 text-sm hover:bg-primary hover:text-white transition-colors"
                      >
                        Забронировать на 3 дня
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Description */}
      {!isSold && lot.description && (
        <section className="py-12 bg-warm">
          <Container>
            <div className="max-w-2xl">
              <h2 className="text-xl font-bold text-primary mb-4">О доме</h2>
              <div className="text-muted leading-relaxed space-y-3">
                {lot.description.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {!isSold && (
        <>
          <VillageIncluded />
          <VillageMortgage priceRub={defaultLot.priceRub} />
        </>
      )}

      {/* Mini plan highlight */}
      <section className="py-12 bg-white">
        <Container>
          <h2 className="text-xl font-bold text-primary mb-6">
            Расположение на плане
          </h2>
          <div className="border border-border overflow-hidden bg-warm">
            <svg
              viewBox="0 0 1200 620"
              className="w-full max-h-64"
              aria-label={`Расположение дома № ${lot.number} на плане`}
            >
              {/* Simplified mini plan */}
              <rect width={1200} height={620} fill="#EBF5FB" />
              <rect y={0} width={1200} height={100} fill="#5DADE2" opacity={0.6} />
              <text x={20} y={55} fill="white" fontSize={14} fontWeight="600" opacity={0.9}>Волга</text>
              <rect y={88} width={1200} height={22} fill="#F0E68C" opacity={0.6} />
              <rect y={295} width={1200} height={35} fill="#D5D8DC" />
              <rect y={552} width={1200} height={30} fill="#BDC3C7" />
              <rect y={582} width={1200} height={38} fill="#2ECC71" opacity={0.35} />
              {village.lots.map((l) => {
                const step = 99 + 4;
                const lx = l.line === 1
                  ? 30 + (l.positionInLine - 1) * step
                  : 30 + (11 - l.positionInLine) * step;
                const ly = l.line === 1 ? 108 : 330;
                const lh = l.line === 1 ? 185 : 210;
                const isThis = l.id === lot.id;
                return (
                  <rect
                    key={l.id}
                    x={lx}
                    y={ly}
                    width={99}
                    height={lh}
                    fill={isThis ? "#1B3A5C" : l.status === "available" ? "#FFF" : "#E8E4DB"}
                    stroke={isThis ? "#C19A52" : l.status === "available" ? "#C19A52" : "#BDB8AF"}
                    strokeWidth={isThis ? 3 : 1}
                    rx={1}
                  />
                );
              })}
              {/* Highlight label */}
              {(() => {
                const step = 99 + 4;
                const lx = lot.line === 1
                  ? 30 + (lot.positionInLine - 1) * step
                  : 30 + (11 - lot.positionInLine) * step;
                const ly = lot.line === 1 ? 108 : 330;
                const lh = lot.line === 1 ? 185 : 210;
                return (
                  <text
                    x={lx + 99 / 2}
                    y={ly + lh / 2 + 5}
                    textAnchor="middle"
                    fill="white"
                    fontSize={14}
                    fontWeight="700"
                  >
                    {lot.number}
                  </text>
                );
              })()}
            </svg>
          </div>
          <p className="text-muted text-xs mt-2">
            Синим выделен дом № {lot.number} · {lot.line === 1 ? "1-я линия (у воды)" : "2-я линия (у дороги)"}
          </p>
        </Container>
      </section>

      {/* Other available lots */}
      {availableLots.length > 0 && !isSold && (
        <section className="py-12 bg-warm">
          <Container>
            <h2 className="text-xl font-bold text-primary mb-6">
              Другие свободные дома
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {availableLots.map((l) => (
                <Link
                  key={l.id}
                  href={`/volzhsky-bereg/lot/${l.id}`}
                  className="border border-border bg-white p-5 hover:border-accent transition-colors group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-primary group-hover:text-accent transition-colors">
                      Дом № {l.number}
                    </span>
                    <span className="text-accent font-bold text-sm">
                      {new Intl.NumberFormat("ru-RU").format(defaultLot.priceRub)} ₽
                    </span>
                  </div>
                  {l.distanceToPierM && (
                    <p className="text-muted text-xs mt-1">
                      {l.distanceToPierM} м до пирса
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <VillageContact
        lotId={lot.id}
        prefillMessage={
          !isSold
            ? `Интересует дом № ${lot.number}${lot.distanceToPierM ? `, ${lot.distanceToPierM} м до пирса` : ""}`
            : undefined
        }
      />
    </>
  );
}
