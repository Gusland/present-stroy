import type { Metadata } from "next";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-primary py-24 pt-36">
        <Container>
          <h1 className="text-4xl font-bold text-white">Политика конфиденциальности</h1>
        </Container>
      </section>
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-3xl prose prose-lg text-muted">
            <p>
              Настоящая Политика конфиденциальности определяет порядок обработки и защиты
              персональных данных пользователей сайта present-stroy.ru.
            </p>
            <h2 className="text-primary font-bold text-xl mt-8 mb-4">
              Какие данные мы собираем
            </h2>
            <p>
              При заполнении формы обратной связи мы получаем: имя, номер телефона и адрес
              электронной почты. Эти данные используются исключительно для связи с вами по
              вашему запросу.
            </p>
            <h2 className="text-primary font-bold text-xl mt-8 mb-4">
              Как мы используем данные
            </h2>
            <p>
              Персональные данные не передаются третьим лицам и не используются в
              маркетинговых целях без вашего явного согласия.
            </p>
            <h2 className="text-primary font-bold text-xl mt-8 mb-4">Контакты</h2>
            <p>
              По вопросам обработки данных: <a href="mailto:present-stroy@mail.ru" className="text-accent">present-stroy@mail.ru</a>
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
