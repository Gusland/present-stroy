"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { contacts } from "@/data/contacts";

const slides = [
  {
    title: "Из мечты в реальность",
    subtitle: "Строим частные дома и коттеджи в Твери с 2013 года. Фиксированные цены, гарантия 5 лет.",
    image: "https://present-stroy.ru/netcat_files/1/592/finlyandiya.webp?1727183081",
    href: "/projects/finlyandia",
  },
  {
    title: "Жизнь в гармонии с природой",
    subtitle: "Полный цикл строительства — от проектирования до сдачи ключей. Один подрядчик на всё.",
    image: "https://present-stroy.ru/netcat_files/1/592/garmoniya_1_.webp?1727183082",
    href: "/projects/garmoniya",
  },
  {
    title: "Новый уровень загородной жизни",
    subtitle: "Качественные материалы, современные технологии и прозрачная смета без скрытых платежей.",
    image: "https://present-stroy.ru/netcat_files/1/592/kaliforniya.webp?1727183081",
    href: "/projects/kaliforniya",
  },
  {
    title: "Дом, в котором хочется жить",
    subtitle: "Строительство из кирпича и газосиликата. 200+ сданных объектов по Твери и области.",
    image: "https://present-stroy.ru/netcat_files/1/592/etud.webp?1727183081",
    href: "/projects/etud",
  },
];

const stats = [
  { value: "10+", label: "лет опыта" },
  { value: "200+", label: "объектов сдано" },
  { value: "5 лет", label: "гарантия" },
  { value: "0%", label: "рассрочка" },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Slides */}
      <div className="relative flex-1 overflow-hidden">
        {slides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={s.image}
              alt={s.title}
              fill
              className="object-cover"
              priority={i === 0}
              unoptimized
            />
            <div className="absolute inset-0 bg-primary/65" />
          </div>
        ))}

        {/* Content */}
        <Container className="relative z-10 flex flex-col justify-center min-h-screen py-32">
          <div className="max-w-2xl">
            <div className="inline-block bg-accent/20 border border-accent/30 text-accent text-sm font-medium px-4 py-1.5 mb-6">
              Строительная компания в Твери с 2013 года
            </div>

            <h1
              key={current}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 animate-fade-in"
            >
              {slide.title}
            </h1>

            <p className="text-white/80 text-lg md:text-xl mb-8 leading-relaxed">
              {slide.subtitle}
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link
                href={slide.href}
                className="bg-accent text-white px-8 py-4 font-semibold text-lg hover:bg-accent-dark transition-colors"
              >
                Смотреть проект
              </Link>
              <Link
                href="/contacts"
                className="border-2 border-white text-white px-8 py-4 font-semibold text-lg hover:bg-white hover:text-primary transition-colors"
              >
                Бесплатная консультация
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="border-l-2 border-accent pl-4">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot navigation */}
          <div className="flex gap-2 mt-10">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 transition-all duration-300 ${
                  i === current ? "bg-accent w-8" : "bg-white/40 w-4"
                }`}
                aria-label={`Слайд ${i + 1}`}
              />
            ))}
          </div>
        </Container>

        {/* Prev/Next arrows */}
        <button
          onClick={() => setCurrent((c) => (c - 1 + slides.length) % slides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 border border-white/20 text-white p-3 transition-colors"
          aria-label="Предыдущий"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 border border-white/20 text-white p-3 transition-colors"
          aria-label="Следующий"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Phone bar */}
      <div className="bg-white/10 backdrop-blur-sm border-t border-white/10 absolute bottom-0 left-0 right-0 z-10">
        <Container className="py-3 flex items-center justify-between">
          <p className="text-white/70 text-sm">Звоните — консультируем бесплатно</p>
          <a
            href={`tel:${contacts.phone1Raw}`}
            className="text-white font-bold text-lg hover:text-accent transition-colors"
          >
            {contacts.phone1}
          </a>
        </Container>
      </div>
    </section>
  );
}
