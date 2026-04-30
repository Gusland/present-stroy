import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import ContactFormSection from "@/components/sections/ContactFormSection";

export const metadata: Metadata = {
  title: "Отзывы клиентов",
  description: "Отзывы клиентов о строительной компании Презент-Строй в Твери.",
};

const reviews = [
  {
    name: "Наталья Владимировна К.",
    date: "13.05.2025",
    text: "Ремонт был выполнен в срок, очень качественно, и с учётом всех нестандартных решений. Очень довольна результатом, рекомендую!",
    stars: 5,
  },
  {
    name: "Евгений Петров",
    date: "19.10.2023",
    text: "Всё быстро, качественно. Приемлимые цены. Работали аккуратно, мусор убирали за собой. Буду обращаться снова.",
    stars: 5,
  },
  {
    name: "Ольга Александрова",
    date: "28.04.2023",
    text: "Профессиональный подход, работы выполнены качественно и в срок!!! Очень понравилось взаимодействие с командой — всегда на связи.",
    stars: 5,
  },
  {
    name: "Ирина",
    date: "28.04.2023",
    text: "Честный и добросовестный подрядчик. Качество отличное, коммуникация на высшем уровне. Чётко выполняют всё, что обещают.",
    stars: 5,
  },
  {
    name: "Андрей Смирнов",
    date: "Март 2024",
    text: "Обратились по рекомендации знакомых. Не пожалели. Дом «Финляндия» построили точно в срок. Менеджеры всегда на связи, все вопросы решались быстро.",
    stars: 5,
  },
  {
    name: "Елена Новикова",
    date: "Ноябрь 2023",
    text: "Строительство шло около 8 месяцев, нас держали в курсе каждого этапа. Теперь живём в прекрасном доме — просторно, тепло, красиво. Спасибо всей команде!",
    stars: 5,
  },
  {
    name: "Виктор Козлов",
    date: "Июнь 2023",
    text: "Цены честные, материалы качественные, бригада профессиональная. Дом стоит как монолит. Буду советовать всем знакомым.",
    stars: 5,
  },
  {
    name: "Ирина Власова",
    date: "Февраль 2023",
    text: "Помогли оформить ипотеку под строительство, сами ничего не понимали в этом. Это мечта, которая стала реальностью благодаря Презент-Строй.",
    stars: 5,
  },
];

export default function ReviewPage() {
  return (
    <>
      <section className="bg-primary py-24 pt-36">
        <Container>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Отзывы клиентов</h1>
          <p className="text-white/70 text-xl max-w-2xl">
            Нас рекомендуют те, кто уже построил свой дом
          </p>
        </Container>
      </section>

      <section className="py-20 bg-warm">
        <Container>
          <SectionTitle title="Что говорят клиенты" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review, i) => (
              <div key={i} className="bg-white border border-border p-7 relative">
                <div className="text-6xl text-accent/20 font-serif leading-none absolute top-4 right-6 select-none">
                  "
                </div>
                <p className="text-primary leading-relaxed mb-5 relative z-10">{review.text}</p>
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-primary">{review.name}</div>
                  <div className="text-sm text-muted">{review.date}</div>
                </div>
                <div className="flex gap-0.5 mt-3">
                  {[...Array(review.stars)].map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <ContactFormSection />
    </>
  );
}
