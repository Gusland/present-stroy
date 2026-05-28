import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import ContactFormSection from "@/components/sections/ContactFormSection";
import { contacts } from "@/data/contacts";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Контакты строительной компании Презент-Строй в Твери. Адрес, телефон, email. Бесплатная консультация.",
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact info */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-8">Наши контакты</h2>
              <div className="space-y-6">
                {[
                  {
                    icon: "📞",
                    label: "Телефоны",
                    content: (
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
                    ),
                  },
                  {
                    icon: "✉️",
                    label: "Email",
                    content: (
                      <a
                        href={`mailto:${contacts.email}`}
                        className="text-primary font-semibold hover:text-accent transition-colors text-lg"
                      >
                        {contacts.email}
                      </a>
                    ),
                  },
                  {
                    icon: "📍",
                    label: "Адрес офиса",
                    content: (
                      <p className="text-primary text-lg">{contacts.address}</p>
                    ),
                  },
                  {
                    icon: "🕐",
                    label: "Режим работы",
                    content: (
                      <p className="text-primary text-lg">{contacts.hours}</p>
                    ),
                  },
                ].map((item) => (
                  <div key={item.label} className="flex gap-4">
                    <div className="text-2xl shrink-0 mt-0.5">{item.icon}</div>
                    <div>
                      <div className="text-muted text-sm mb-1">{item.label}</div>
                      {item.content}
                    </div>
                  </div>
                ))}

              </div>
            </div>

            {/* Map */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-8">Как нас найти</h2>
              <div className="border border-border overflow-hidden">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?ll=35.943544%2C56.863552&z=16&pt=35.943544,56.863552,pm2rdl&text=%D0%A2%D0%B2%D0%B5%D1%80%D1%8C%2C%20%D1%83%D0%BB.%20%D0%9C%D0%B0%D1%8F%D0%BA%D0%BE%D0%B2%D1%81%D0%BA%D0%BE%D0%B3%D0%BE%2C%2033"
                  width="100%"
                  height="360"
                  frameBorder="0"
                  allowFullScreen
                  title="Офис Презент-Строй на карте"
                  className="block"
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-sm">
                <p className="text-muted">{contacts.address}</p>
                <a
                  href="https://yandex.ru/maps/14/tver/house/ulitsa_mayakovskogo_33/Z0wYfwNjTEEDQFtsfXR3cnlmZg==/?ll=35.943544%2C56.863552&z=16.4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline font-medium shrink-0 ml-4"
                >
                  Открыть в Яндекс.Картах →
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <ContactFormSection />
    </>
  );
}
