export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  price?: string;
};

export const services: Service[] = [
  {
    id: "kirpich",
    title: "Строительство из кирпича",
    description: "Строительство частных домов и коттеджей из кирпича — полный цикл работ от фундамента до отделки.",
    icon: "🏠",
    href: "/services/stroitelstvo-chastnyh-domov-i-kottedzhey-iz-kirpicha",
  },
  {
    id: "gazosilikat",
    title: "Строительство из газосиликата",
    description: "Современные тёплые дома из газосиликатного блока. Быстро, выгодно, энергоэффективно.",
    icon: "🏗️",
    href: "/services/stroitelstvo-iz-gazosilikatnogo-bloka",
  },
  {
    id: "remont",
    title: "Ремонт и отделка квартир и офисов",
    description: "Косметический, капитальный и дизайнерский ремонт. Бесплатный выезд замерщика.",
    icon: "🖌️",
    href: "/services/remont-i-otdelka-kvartir-i-ofisov",
    price: "от 8 500 ₽/м²",
  },
  {
    id: "shtukaturka",
    title: "Механизированная штукатурка стен",
    description: "Немецкое оборудование PFT RITMO XL. До 600 м² за смену. Идеально ровные стены.",
    icon: "🔧",
    href: "/services/mehanizirovannaya-shtukaturka-sten",
    price: "от 700 ₽/м²",
  },
  {
    id: "elektrika",
    title: "Электромонтажные работы",
    description: "Монтаж проводки, щитов, заземление, подключение оборудования и бытовой техники.",
    icon: "💡",
    href: "/services/elektromontazhnye-raboty",
  },
  {
    id: "santehnika",
    title: "Сантехнические работы",
    description: "Монтаж отопления, водоснабжения, канализации, тёплых полов и автономных систем.",
    icon: "🚿",
    href: "/services/santehnicheskie-raboty",
  },
  {
    id: "krovlya",
    title: "Кровельные работы",
    description: "Монтаж и ремонт кровли из любых материалов. Гидроизоляция, водосток, утепление.",
    icon: "🏚️",
    href: "/services/krovelnye-raboty",
    price: "от 2 800 ₽/м²",
  },
  {
    id: "fasad",
    title: "Фасадные работы",
    description: "Утепление, штукатурка, облицовка, вентилируемые фасады и остекление зданий.",
    icon: "🏢",
    href: "/services/fasadnye-raboty",
  },
  {
    id: "fundament",
    title: "Строительство фундамента",
    description: "Монолитная плита, ленточный фундамент — с учётом типа грунта и нагрузки.",
    icon: "⚙️",
    href: "/services/stroitelstvo-fundamenta",
    price: "от 5 500 ₽/м³",
  },
];
