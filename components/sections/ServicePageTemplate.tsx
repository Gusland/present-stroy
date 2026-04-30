import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Placeholder from "@/components/ui/Placeholder";
import ContactFormSection from "@/components/sections/ContactFormSection";

const processSteps = [
  { step: 1, title: "Звонок и консультация", desc: "Отвечаем на вопросы, обсуждаем задачу." },
  { step: 2, title: "Выезд замерщика", desc: "Бесплатно выезжаем на объект, делаем замеры." },
  { step: 3, title: "Смета и договор", desc: "Составляем смету, фиксируем стоимость и сроки." },
  { step: 4, title: "Выполнение работ", desc: "Закупаем материалы и выполняем все работы." },
  { step: 5, title: "Сдача и оплата", desc: "Принимаете результат, подписываем акт." },
];

type Feature = { title: string; desc?: string };
type PriceItem = { title: string; price: string; desc?: string };

type ServicePageTemplateProps = {
  title: string;
  subtitle: string;
  description: string[];
  features: Feature[];
  prices?: PriceItem[];
  photos?: string[];
  banner?: string;
  photosCount?: number;
  promo?: string;
};

export default function ServicePageTemplate({
  title,
  subtitle,
  description,
  features,
  prices,
  photos,
  banner,
  photosCount = 6,
  promo,
}: ServicePageTemplateProps) {
  const galleryPhotos = photos && photos.length > 0 ? photos : null;

  return (
    <>
      {/* Hero */}
      <section className="relative bg-primary py-24 pt-36 overflow-hidden">
        {banner && (
          <>
            <Image
              src={banner}
              alt={title}
              fill
              className="object-cover"
              priority
              unoptimized
            />
            <div className="absolute inset-0 bg-primary/80" />
          </>
        )}
        <Container className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>
          <p className="text-white/70 text-xl max-w-2xl">{subtitle}</p>
          {promo && (
            <div className="mt-6 inline-block bg-accent/20 border border-accent/40 text-accent px-5 py-2 text-sm font-semibold">
              🎁 {promo}
            </div>
          )}
        </Container>
      </section>

      {/* Description + Features */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
            <div>
              <SectionTitle title="Об услуге" align="left" />
              <div className="space-y-4 text-muted leading-relaxed">
                {description.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
            <div>
              <SectionTitle title="Что входит" align="left" />
              <ul className="space-y-3">
                {features.map((f, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-accent font-bold mt-0.5 shrink-0">✓</span>
                    <div>
                      <span className="font-semibold text-primary">{f.title}</span>
                      {f.desc && <p className="text-muted text-sm mt-0.5">{f.desc}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Prices */}
      {prices && prices.length > 0 && (
        <section className="py-16 bg-warm">
          <Container>
            <SectionTitle title="Цены" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {prices.map((item) => (
                <div key={item.title} className="bg-white border border-border p-6 hover:border-accent transition-colors">
                  <div className="text-2xl font-bold text-accent mb-1">{item.price}</div>
                  <div className="font-semibold text-primary mb-2">{item.title}</div>
                  {item.desc && <p className="text-muted text-sm">{item.desc}</p>}
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Gallery */}
      <section className="py-16 bg-white">
        <Container>
          <SectionTitle title="Выполненные работы" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {galleryPhotos ? (
              galleryPhotos.map((src, i) => (
                <a
                  key={i}
                  href={src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden border border-border hover:border-accent transition-colors block aspect-[3/4]"
                >
                  <Image
                    src={src}
                    alt={`${title} — фото ${i + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 33vw"
                    unoptimized
                  />
                </a>
              ))
            ) : (
              Array.from({ length: photosCount }, (_, i) => (
                <div key={i} className="aspect-[3/4]">
                  <Placeholder className="w-full h-full" label={`Фото ${i + 1}`} />
                </div>
              ))
            )}
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="py-16 bg-primary">
        <Container>
          <SectionTitle title="Как мы работаем" light />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {processSteps.map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-14 h-14 rounded-full bg-accent text-white font-bold text-xl flex items-center justify-center mx-auto mb-3">
                  {s.step}
                </div>
                <div className="font-bold text-white text-sm mb-1">{s.title}</div>
                <div className="text-white/60 text-xs">{s.desc}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <ContactFormSection />
    </>
  );
}
