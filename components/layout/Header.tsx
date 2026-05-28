"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { contacts } from "@/data/contacts";

const navItems = [
  {
    label: "О компании",
    href: "/about",
    dropdown: [
      { label: "О компании", href: "/about" },
      { label: "Сертификаты", href: "/about/sertifikaty" },
      { label: "Акции и новости", href: "/news" },
      { label: "Отзывы", href: "/about/review" },
      { label: "Ипотека и кредитование", href: "/about/ipoteka" },
      { label: "Карта объектов", href: "/about/karta-obektov" },
    ],
  },
  {
    label: "Услуги",
    href: "/services",
    dropdown: [
      { label: "Все услуги", href: "/services" },
      { label: "Строительство из кирпича", href: "/services/stroitelstvo-chastnyh-domov-i-kottedzhey-iz-kirpicha" },
      { label: "Строительство из газосиликата", href: "/services/stroitelstvo-iz-gazosilikatnogo-bloka" },
      { label: "Ремонт квартир и офисов", href: "/services/remont-i-otdelka-kvartir-i-ofisov" },
      { label: "Механизированная штукатурка", href: "/services/mehanizirovannaya-shtukaturka-sten" },
      { label: "Электромонтажные работы", href: "/services/elektromontazhnye-raboty" },
      { label: "Сантехнические работы", href: "/services/santehnicheskie-raboty" },
      { label: "Кровельные работы", href: "/services/krovelnye-raboty" },
      { label: "Фасадные работы", href: "/services/fasadnye-raboty" },
      { label: "Строительство фундамента", href: "/services/stroitelstvo-fundamenta" },
    ],
  },
  {
    label: "Волжский берег",
    href: "/volzhsky-bereg",
    highlight: true,
    dropdown: [
      { label: "О посёлке", href: "/volzhsky-bereg" },
      { label: "Этапы строительства", href: "/volzhsky-bereg/etapy" },
      { label: "Виды коттеджей", href: "/volzhsky-bereg/kottedzhi" },
      { label: "План поселка", href: "/volzhsky-bereg/plan" },
    ],
  },
  { label: "Проекты", href: "/projects" },
  { label: "Галерея", href: "/gallery" },
  { label: "Контакты", href: "/contacts" },
];

type NavItem = (typeof navItems)[number];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [tickerVisible, setTickerVisible] = useState(false);
  const pathname = usePathname();
  const isVillagePage = pathname.startsWith("/volzhsky-bereg");

  const isActive = (item: NavItem): boolean => {
    if (pathname === item.href || pathname.startsWith(item.href + "/")) return true;
    return item.dropdown?.some((d) => pathname === d.href || pathname.startsWith(d.href + "/")) ?? false;
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sync ticker visibility from localStorage on route change
  useEffect(() => {
    if (isVillagePage) { setTickerVisible(false); return; }
    try {
      const until = localStorage.getItem("vbDismissUntil");
      setTickerVisible(!(until && Date.now() < Number(until)));
    } catch { setTickerVisible(true); }
  }, [isVillagePage, pathname]);

  // Listen for ticker close dispatched by VillageTicker
  useEffect(() => {
    const onClose = () => setTickerVisible(false);
    window.addEventListener("vb-ticker-closed", onClose);
    return () => window.removeEventListener("vb-ticker-closed", onClose);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
        tickerVisible ? "top-9" : "top-0"
      } ${scrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-[padding] duration-300 ${scrolled ? "py-1.5" : "py-3"}`}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className={`bg-primary flex items-center justify-center transition-[padding] duration-300 ${scrolled ? "px-2 py-1" : "px-2.5 py-1.5"}`}>
              <Image
                src="/images/villages/vb/photos/logo.svg"
                alt="Презент Строй"
                width={28}
                height={43}
                className={`block transition-all duration-300 ${scrolled ? "w-5 h-auto" : "w-7 h-auto"}`}
              />
            </div>
            <div className="leading-tight">
              <div className={`font-bold text-primary leading-none transition-all duration-300 ${scrolled ? "text-base" : "text-lg"}`}>
                Презент-Строй
              </div>
              <div className={`text-muted leading-none mt-0.5 transition-all duration-300 ${scrolled ? "text-[10px]" : "text-xs"}`}>
                строительная компания
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const active = isActive(item);
              return (
                <div
                  key={item.href}
                  className="relative group"
                  onMouseEnter={() => item.dropdown && setOpenDropdown(item.href)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={
                      item.highlight
                        ? `px-3 py-1.5 text-sm font-semibold flex items-center gap-1 transition-colors ${
                            active
                              ? "bg-primary text-white"
                              : "bg-accent text-white hover:bg-accent-dark"
                          }`
                        : active
                        ? "px-3 pb-1.5 pt-2 text-sm font-semibold text-accent flex items-center gap-1 border-b-2 border-accent"
                        : "px-3 py-2 text-sm font-medium text-primary hover:text-accent transition-colors flex items-center gap-1"
                    }
                  >
                    {item.highlight && (
                      <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>
                    )}
                    {item.label}
                    {item.dropdown && (
                      <svg className="w-3 h-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>
                  {item.dropdown && openDropdown === item.href && (
                    <div className="absolute top-full left-0 pt-1 z-50 min-w-48">
                      <div className="bg-white shadow-xl border border-border rounded-sm py-1">
                        {item.dropdown.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className={`block px-4 py-2 text-sm transition-colors ${
                              pathname === sub.href || pathname.startsWith(sub.href + "/")
                                ? "text-accent font-semibold bg-warm"
                                : "text-primary hover:bg-warm hover:text-accent"
                            }`}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Phone + CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${contacts.phone1Raw}`}
              className="text-primary font-semibold text-sm hover:text-accent transition-colors"
            >
              {contacts.phone1}
            </a>
            <Link
              href="/contacts"
              className="bg-accent text-white px-4 py-2 text-sm font-semibold hover:bg-accent-dark transition-colors"
            >
              Связаться
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            className="lg:hidden p-2 text-primary"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Меню"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-border shadow-lg">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navItems.map((item) => {
              const active = isActive(item);
              return (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    className={
                      item.highlight || active
                        ? "block py-2 font-semibold text-accent flex items-center gap-2"
                        : "block py-2 font-medium text-primary hover:text-accent transition-colors"
                    }
                    onClick={() => setMobileOpen(false)}
                  >
                    {(item.highlight || active) && (
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 inline-block" />
                    )}
                    {item.label}
                  </Link>
                  {item.dropdown && (
                    <div className="pl-4 flex flex-col gap-1 border-l-2 border-border ml-2 mb-1">
                      {item.dropdown.slice(1).map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className={`block py-1 text-sm transition-colors ${
                            pathname === sub.href || pathname.startsWith(sub.href + "/")
                              ? "text-accent font-semibold"
                              : "text-muted hover:text-accent"
                          }`}
                          onClick={() => setMobileOpen(false)}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <div className="pt-3 border-t border-border mt-2">
              <a
                href={`tel:${contacts.phone1Raw}`}
                className="block text-primary font-semibold mb-3"
              >
                {contacts.phone1}
              </a>
              <Link
                href="/contacts"
                className="inline-block bg-accent text-white px-6 py-2 font-semibold text-sm hover:bg-accent-dark transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Связаться
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
