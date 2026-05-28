import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import ContactFormSection from "@/components/sections/ContactFormSection";

export const metadata: Metadata = {
  title: "Ипотека и кредитование",
  description: "Помогаем оформить ипотеку на строительство дома в Твери. Семейная ипотека от 6%, IT-ипотека от 5%, материнский капитал.",
  alternates: { canonical: "/about/ipoteka" },
};

const programs = [
  {
    title: "Семейная ипотека",
    rate: "от 6%",
    desc: "Для семей с детьми, рождёнными после 2018 года. Первоначальный взнос от 20%. Максимальная сумма — 12 млн ₽ для Московской и Ленинградской областей, 6 млн ₽ для остальных регионов.",
    tag: "Популярная",
  },
  {
    title: "IT-ипотека",
    rate: "от 5%",
    desc: "Для сотрудников аккредитованных IT-компаний в возрасте до 50 лет. Первоначальный взнос от 20%. Сумма до 18 млн ₽.",
    tag: null,
  },
  {
    title: "Льготная ипотека",
    rate: "от 8%",
    desc: "Для всех граждан РФ на строительство или покупку загородного дома. Доступна при наличии договора с аккредитованным подрядчиком.",
    tag: null,
  },
  {
    title: "Материнский капитал",
    rate: "без %",
    desc: "Принимаем материнский капитал в счёт первоначального взноса или для погашения действующей ипотеки. Поможем оформить документы.",
    tag: null,
  },
];

const banks = ["Сбербанк", "ВТБ", "Россельхозбанк", "Альфа-Банк", "ДОМ.РФ", "Газпромбанк"];

export default function IpotekaPage() {
  return (
    <>
      <section className="bg-primary py-24 pt-36">
        <Container>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ипотека и кредитование
          </h1>
          <p className="text-white/70 text-xl max-w-2xl">
            Поможем подобрать выгодную программу и оформить все документы бесплатно
          </p>
        </Container>
      </section>

      <section className="py-20 bg-white">
        <Container>
          <SectionTitle
            title="Программы финансирования"
            subtitle="Работаем со всеми ведущими банками и государственными программами"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
            {programs.map((p) => (
              <div key={p.title} className="border border-border p-7 hover:border-accent transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-3xl font-bold text-accent">{p.rate}</div>
                  {p.tag && (
                    <span className="text-xs font-semibold bg-accent/10 text-accent px-2 py-0.5">
                      {p.tag}
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-primary text-xl mb-2">{p.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-warm border border-border p-8">
            <SectionTitle title="Наши банки-партнёры" />
            <div className="flex flex-wrap justify-center gap-4">
              {banks.map((bank) => (
                <div
                  key={bank}
                  className="bg-white border border-border px-6 py-3 font-semibold text-primary text-sm"
                >
                  {bank}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 bg-primary text-white p-8 text-center">
            <h3 className="text-2xl font-bold mb-3">Как мы помогаем</h3>
            <p className="text-white/70 max-w-2xl mx-auto mb-6">
              Наши специалисты подберут оптимальную программу, помогут собрать документы
              и сопроводят сделку в банке. <strong className="text-white">Услуга полностью бесплатна</strong> для наших клиентов.
            </p>
            <a
              href="/contacts"
              className="inline-block bg-accent text-white px-8 py-3 font-semibold hover:bg-accent-dark transition-colors"
            >
              Получить консультацию
            </a>
          </div>
        </Container>
      </section>

      <ContactFormSection />
    </>
  );
}
