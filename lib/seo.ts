const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://xn----itbahmwicjfkkc.xn--p1ai";

export const SITE = {
  url: BASE,
  name: "Презент-Строй",
  brand: "Презент-Строй",
  legalName: 'ООО "Презент-Строй"',
  phone: "+79812021261",
  phoneDisplay: "+7 (981) 202-12-61",
  email: "present-stroy@inbox.ru",
  address: {
    street: "ул. Маяковского, д. 33, офис 23",
    locality: "Тверь",
    region: "Тверская область",
    postalCode: "170100",
    country: "RU",
    lat: 56.8589,
    lng: 35.9176,
  },
  hours: "Пн–Пт: 9:00–18:00",
  hoursSchema: "Mo-Fr 09:00-18:00",
  foundingDate: "2013",
  serviceArea: ["Тверь", "Тверская область", "Калининский район", "Конаковский район"],
  priceRange: "5 000 000 — 15 000 000 ₽",
  ogImage: `${BASE}/og-image.jpg`,
};

export const META = {
  titleTemplate: "%s | Презент-Строй",
  defaultTitle: "Презент-Строй — строительство домов в Твери под ключ",
  defaultDescription:
    "Строим частные дома в Твери и области с 2013 года. 10+ типовых проектов, фиксированная цена в договоре, ипотека от 6%. Готовый посёлок Волжский Берег — дома у Волги.",
};
