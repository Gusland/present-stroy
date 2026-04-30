import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import ContactFormSection from "@/components/sections/ContactFormSection";
import { contacts } from "@/data/contacts";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Контакты строительной компании Презент-Строй в Твери. Адрес, телефон, email. Бесплатная консультация.",
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

                <div className="flex gap-4 pt-2">
                  <div className="text-2xl shrink-0 mt-0.5">🌐</div>
                  <div>
                    <div className="text-muted text-sm mb-1">Социальные сети</div>
                    <a
                      href={contacts.vk}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2zm3.08 13.36h-1.67c-.63 0-.82-.5-1.95-1.63-1-.96-1.44-.96-1.68-.96-.34 0-.44.1-.44.57v1.48c0 .41-.13.65-1.23.65-1.81 0-3.82-1.1-5.23-3.14C4.4 10.18 4 8.38 4 7.98c0-.24.1-.46.57-.46h1.67c.43 0 .6.2.76.65.84 2.43 2.24 4.56 2.82 4.56.22 0 .32-.1.32-.65V9.9c-.07-1.17-.68-1.27-.68-1.68 0-.2.16-.4.42-.4h2.62c.37 0 .5.2.5.63v3.4c0 .38.17.5.27.5.22 0 .4-.12.8-.52 1.24-1.4 2.13-3.54 2.13-3.54.12-.24.32-.46.76-.46h1.67c.5 0 .61.26.5.63-.21.97-2.27 3.88-2.27 3.88-.18.3-.24.43 0 .76.17.24.74.74 1.12 1.18.7.79 1.23 1.45 1.37 1.9.15.45-.08.68-.56.68z" />
                      </svg>
                      ВКонтакте
                    </a>
                  </div>
                </div>
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
