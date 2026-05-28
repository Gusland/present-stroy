import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Placeholder from "@/components/ui/Placeholder";
import ContactFormSection from "@/components/sections/ContactFormSection";
import { testimonials } from "@/data/testimonials";
import { contacts } from "@/data/contacts";

export const metadata: Metadata = {
  title: "О компании Презент-Строй — строительство в Твери с 2013 года",
  description:
    "Презент-Строй — строительная компания в Твери с 2013 года. Более 200 сданных объектов, гарантия до 5 лет, фиксированная цена в договоре. Строим дома в Тверской области.",
  alternates: { canonical: "/about" },
};

const mortgagePrograms = [
  {
    title: "Семейная ипотека",
    rate: "от 6%",
    desc: "Для семей с детьми, рождёнными после 2018 года. Первый взнос от 20%.",
  },
  {
    title: "IT-ипотека",
    rate: "от 5%",
    desc: "Для сотрудников аккредитованных IT-компаний. Первый взнос от 20%.",
  },
  {
    title: "Льготная ипотека",
    rate: "от 8%",
    desc: "Для всех граждан РФ на строительство или покупку загородного дома.",
  },
  {
    title: "Материнский капитал",
    rate: "без %",
    desc: "Принимаем маткапитал в счёт первоначального взноса или погашения долга.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary py-24 pt-36">
        <Container>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">О компании</h1>
          <p className="text-white/70 text-xl max-w-2xl">
            Строим надёжные дома в Твери и Тверской области с 2013 года
          </p>
          {/* Sub-navigation */}
          <nav className="flex flex-wrap gap-3 mt-8">
            {[
              { label: "О нас", href: "#about" },
              { label: "Сертификаты", href: "#certificates" },
              { label: "Отзывы", href: "#reviews" },
              { label: "Ипотека", href: "#mortgage" },
              { label: "Карта объектов", href: "#map" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/70 hover:text-white border border-white/20 hover:border-white/50 px-4 py-1.5 text-sm transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </Container>
      </section>

      {/* About */}
      <section id="about" className="py-20 bg-white scroll-mt-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionTitle title="Наша история" align="left" />
              <div className="space-y-4 text-muted leading-relaxed">
                <p>
                  Компания «Презент-Строй» основана в 2013 году в Твери. За это время мы
                  построили более 200 объектов — от компактных домов для молодых семей
                  до просторных коттеджей.
                </p>
                <p>
                  Мы работаем по принципу полного цикла: сами проектируем, строим,
                  проводим все инженерные коммуникации и выполняем финишную отделку.
                  Вам не нужно искать разных подрядчиков — мы берём это на себя.
                </p>
                <p>
                  Наша команда — опытные инженеры, архитекторы и строители.
                  Используем только сертифицированные материалы и даём гарантию на все работы.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              {[
                { value: "10+", label: "лет на рынке" },
                { value: "200+", label: "сданных объектов" },
                { value: "5 лет", label: "гарантия" },
                { value: "100%", label: "клиентов довольны" },
              ].map((stat) => (
                <div key={stat.label} className="bg-warm border border-border p-6 text-center">
                  <div className="text-4xl font-bold text-accent mb-1">{stat.value}</div>
                  <div className="text-muted text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-16 bg-warm">
        <Container>
          <SectionTitle title="Наши принципы" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🏆", title: "Надёжность", desc: "Работаем с 2013 года. Сотни довольных семей — лучшее подтверждение." },
              { icon: "✅", title: "Качество", desc: "Только сертифицированные материалы и проверенные технологии." },
              { icon: "📋", title: "Гарантии", desc: "Письменная гарантия на все виды работ — от фундамента до кровли." },
              { icon: "💰", title: "Ипотека", desc: "Помогаем оформить льготную ипотеку, материнский капитал и рассрочку." },
            ].map((v) => (
              <div key={v.title} className="bg-white p-6 border border-border text-center">
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="font-bold text-primary text-lg mb-2">{v.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Certificates */}
      <section id="certificates" className="py-20 bg-white scroll-mt-20">
        <Container>
          <SectionTitle
            title="Сертификаты и лицензии"
            subtitle="Все работы выполняются в соответствии с нормами и стандартами"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {Array.from({ length: 5 }, (_, i) => (
              <div
                key={i}
                className="border border-border hover:border-accent transition-colors cursor-pointer group"
              >
                <div className="aspect-[3/4]">
                  <Placeholder
                    className="w-full h-full group-hover:opacity-90 transition-opacity"
                    label={`Сертификат ${i + 1}`}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-muted text-sm mt-6">
            Оригиналы документов предоставляем по запросу
          </p>
        </Container>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-20 bg-warm scroll-mt-20">
        <Container>
          <SectionTitle
            title="Отзывы клиентов"
            subtitle="Реальные отзывы от людей, которые уже живут в построенных нами домах"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-white border border-border p-7 relative">
                <div className="text-6xl text-accent/20 font-serif leading-none absolute top-4 right-6 select-none">
                  "
                </div>
                <p className="text-primary leading-relaxed mb-5 relative z-10">{t.text}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-primary">{t.name}</div>
                    {t.project && (
                      <div className="text-sm text-muted">Дом «{t.project}»</div>
                    )}
                  </div>
                  <div className="text-sm text-muted">{t.date}</div>
                </div>
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

      {/* Mortgage */}
      <section id="mortgage" className="py-20 bg-primary scroll-mt-20">
        <Container>
          <SectionTitle
            title="Ипотека и рассрочка"
            subtitle="Помогаем подобрать выгодную программу финансирования для вашего дома"
            light
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {mortgagePrograms.map((p) => (
              <div key={p.title} className="bg-white/10 border border-white/20 p-6 hover:bg-white/15 transition-colors">
                <div className="text-3xl font-bold text-accent mb-1">{p.rate}</div>
                <h3 className="font-bold text-white text-lg mb-2">{p.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-white/10 border border-white/20 p-6 md:p-8 max-w-3xl mx-auto text-center">
            <p className="text-white/80 mb-4">
              Наши специалисты помогут подобрать оптимальную программу, соберут документы
              и сопроводят сделку в банке. <strong className="text-white">Услуга бесплатна.</strong>
            </p>
            <a
              href="/contacts"
              className="inline-block bg-accent text-white px-8 py-3 font-semibold hover:bg-accent-dark transition-colors"
            >
              Узнать подробнее
            </a>
          </div>
        </Container>
      </section>

      {/* Map */}
      <section id="map" className="py-20 bg-white scroll-mt-20">
        <Container>
          <SectionTitle
            title="Карта объектов"
            subtitle="Наши реализованные проекты в Твери и Тверской области"
          />
          <div className="aspect-[16/7] bg-warm border border-border flex items-center justify-center">
            <div className="text-center text-muted">
              <div className="text-5xl mb-4">🗺️</div>
              <p className="font-medium text-primary mb-2">Интерактивная карта объектов</p>
            </div>
          </div>
        </Container>
      </section>

      <ContactFormSection />
    </>
  );
}
