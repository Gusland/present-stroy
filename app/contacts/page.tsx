import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import ContactFormSection from "@/components/sections/ContactFormSection";
import { contacts } from "@/data/contacts";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Контакты строительной компании Презент-Строй в Твери. Телефон, email. Бесплатная консультация.",
  alternates: { canonical: "/contacts" },
};

export default function ContactsPage() {
  return (
    <>
      <section className="bg-primary py-24 pt-36">
        <Container>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Контакты</h1>
          <p className="text-white/70 text-xl max-w-2xl">
            Свяжитесь с нами любым удобным способом
          </p>
        </Container>
      </section>

      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-lg">
            <h2 className="text-2xl font-bold text-primary mb-8">Наши контакты</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="text-2xl shrink-0 mt-0.5">📞</div>
                <div>
                  <div className="text-muted text-sm mb-1">Телефоны</div>
                  <div className="space-y-1">
                    <a
                      href={`tel:${contacts.phone1Raw}`}
                      className="block text-primary font-semibold hover:text-accent transition-colors text-lg"
                    >
                      {contacts.phone1}
                    </a>
                    <a
                      href={`tel:${contacts.phone2Raw}`}
                      className="block text-primary font-semibold hover:text-accent transition-colors text-lg"
                    >
                      {contacts.phone2}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-2xl shrink-0 mt-0.5">✉️</div>
                <div>
                  <div className="text-muted text-sm mb-1">Email</div>
                  <a
                    href={`mailto:${contacts.email}`}
                    className="text-primary font-semibold hover:text-accent transition-colors text-lg"
                  >
                    {contacts.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <ContactFormSection />
    </>
  );
}
