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
        <Container className="pb-5">
          <p className="text-white/30 text-xs leading-relaxed">
            Информация, размещённая на сайте, носит исключительно ознакомительный характер и не является публичной офертой в соответствии с положениями ст.&nbsp;437 ГК&nbsp;РФ. Цены, характеристики объектов и условия сделок уточняйте у менеджеров компании. Изображения могут отличаться от фактического вида объектов.
          </p>
        </Container>
      </div>
    </footer>
  );
}
