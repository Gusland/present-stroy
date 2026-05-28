import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { contacts } from "@/data/contacts";

const footerLinks = {
  company: [
    { label: "О компании", href: "/about#about" },
    { label: "Сертификаты", href: "/about#certificates" },
    { label: "Новости и акции", href: "/news" },
    { label: "Отзывы", href: "/about#reviews" },
    { label: "Ипотека", href: "/about#mortgage" },
  ],
  services: [
    { label: "Строительство под ключ", href: "/services#pod-klyuch" },
    { label: "Проектирование", href: "/services#proektirovanie" },
    { label: "Отделочные работы", href: "/services#otdelka" },
    { label: "Инженерные системы", href: "/services#inzhenernye" },
    { label: "Все услуги", href: "/services" },
  ],
  projects: [
    { label: "Все проекты", href: "/projects" },
    { label: "Волжский берег", href: "/volzhsky-bereg" },
    { label: "Фотогалерея", href: "/gallery" },
    { label: "Контакты", href: "/contacts" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <Container className="py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-accent flex items-center justify-center px-2.5 py-1.5">
                <Image
                  src="/images/villages/vb/photos/logo.svg"
                  alt="Презент Строй"
                  width={28}
                  height={43}
                  className="block"
                />
              </div>
              <div>
                <div className="font-bold text-lg leading-none">Презент-Строй</div>
                <div className="text-white/60 text-xs mt-0.5">строительная компания</div>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-5">
              Строим надёжные дома в Твери и Тверской области с 2013 года. Полный цикл — от проекта до ключей.
            </p>
            <a
              href={contacts.vk}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/70 hover:text-accent transition-colors text-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2zm3.08 13.36h-1.67c-.63 0-.82-.5-1.95-1.63-1-.96-1.44-.96-1.68-.96-.34 0-.44.1-.44.57v1.48c0 .41-.13.65-1.23.65-1.81 0-3.82-1.1-5.23-3.14C4.4 10.18 4 8.38 4 7.98c0-.24.1-.46.57-.46h1.67c.43 0 .6.2.76.65.84 2.43 2.24 4.56 2.82 4.56.22 0 .32-.1.32-.65V9.9c-.07-1.17-.68-1.27-.68-1.68 0-.2.16-.4.42-.4h2.62c.37 0 .5.2.5.63v3.4c0 .38.17.5.27.5.22 0 .4-.12.8-.52 1.24-1.4 2.13-3.54 2.13-3.54.12-.24.32-.46.76-.46h1.67c.5 0 .61.26.5.63-.21.97-2.27 3.88-2.27 3.88-.18.3-.24.43 0 .76.17.24.74.74 1.12 1.18.7.79 1.23 1.45 1.37 1.9.15.45-.08.68-.56.68z" />
              </svg>
              ВКонтакте
            </a>
          </div>

          {/* Company links */}
          <div>
            <h4 className="font-semibold mb-4 text-white">О компании</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services links */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Услуги</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Контакты</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <a
                  href={`tel:${contacts.phone1Raw}`}
                  className="hover:text-accent transition-colors"
                >
                  {contacts.phone1}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contacts.phone2Raw}`}
                  className="hover:text-accent transition-colors"
                >
                  {contacts.phone2}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contacts.email}`}
                  className="hover:text-accent transition-colors"
                >
                  {contacts.email}
                </a>
              </li>
              <li>{contacts.address}</li>
              <li>{contacts.hours}</li>
            </ul>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-white/50">
          <p>© 2013–{new Date().getFullYear()} Презент-Строй. Все права защищены.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Политика конфиденциальности
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
