// TODO[ASK] §5 — точный адрес и координаты; используем приближённые.
// TODO[ASK] §7 — контакты менеджера; используем данные компании как fallback.

export type LotStatus = 'sold' | 'available';

export type Lot = {
  id: string;
  number: number;
  line: 1 | 2;
  positionInLine: number;
  status: LotStatus;
  shortLabel?: string;
  distanceToPierM?: number;
  photos: string[];
  description?: string;
};

export type IncludedItem = {
  label: string;
  detail?: string;
  canOrder?: boolean;
};

export type FaqItem = {
  q: string;
  a: string;
};

// Базовый путь к фото
const P = (n: number) =>
  `/images/villages/vb/photos/${String(n).padStart(2, '0')}.jpg`;

const INTERIOR_PHOTOS = [5, 6, 7, 8, 9, 10].map(P);

export const village = {
  slug: 'volzhsky-bereg',
  name: 'Волжский Берег',
  tagline: 'Готовый посёлок на берегу Волги, 8 км от Твери',
  year: 2023,

  // TODO[ASK] §5 — уточнить точный адрес
  address: 'Тверская область, Калининский район, правый берег Волги',
  // TODO[ASK] §5 — уточнить точные координаты через plan-picker
  coords: { lat: 56.84, lng: 35.95 },
  // TODO[ASK] §5 — уточнить URL Яндекс-карты виджета
  mapEmbedUrl:
    'https://yandex.ru/map-widget/v1/?um=constructor%3A4504c115e405f9c89174b1c3499a615b1f6caece14015fc3612d1ad1e4f881da&source=constructor',
  mapOpenUrl:
    'https://yandex.ru/maps/?from=mapframe&ll=35.95%2C56.84&z=15',

  heroPhoto: '/images/villages/vb/photos/plan_poselka_dobav_te_i_eto_foto.webp',
  ogPhoto: P(1),

  galleryPhotos: [P(25), P(24), P(1), P(12), P(11), P(19), P(29), P(7), P(4), P(28), P(3), P(35), P(30)],

  defaultLot: {
    priceRub: 14_300_000,
    houseAreaM2: 138,
    plotAreaSot: 11,
    floors: 1,
    bedrooms: 3,
    bathrooms: 2,
    ceilingHeightM: 3,
    livingRoomM2: 70,
    wallMaterial: 'газоблок + облицовочный кирпич',
    foundation: 'монолитная плита',
    roof: 'металлочерепица',
    finish: 'черновая',
    warrantyYears: 2,
  },

  engineering: {
    gas: 'Магистральный газ, двухконтурный котёл в каждом доме',
    electricity: '15 кВт на дом',
    water: 'Централизованного нет — скважина (устанавливаем под ключ)',
    sewage: 'Централизованной нет — септик (устанавливаем под ключ)',
    roads: 'Асфальт до посёлка (М-11); внутри — грунтовка/щебень, муниципальная',
    lighting: 'Уличное освещение есть',
    internet: 'Оптоволокно — магистральный провайдер «Тверьрегионсвязь»',
    // TODO[ASK] §4 — охрана/видеонаблюдение
    security: undefined as string | undefined,
  },

  infrastructure: {
    pierDistanceM: 50,
    beach: 'Боровое озеро — 50 м от 1-й линии',
    nearbyAmenities: 'Магазин, аптека, детский сад, школа',
  },

  routes: [
    { label: 'Центр Твери', detail: '', time: '8 км · ~15 мин' },
    { label: 'МКАД (М-11)', detail: '', time: '~170 км · 1 ч 30 мин' },
    { label: 'Завидово', detail: '', time: '~40 мин' },
    { label: 'Тверь (Сапсан)', detail: '+ 20 мин на такси', time: '~3 ч 50 мин из СПб' },
  ],

  included: [
    { label: 'Дом 138 м², черновая отделка', detail: '3 спальни, 2 санузла, гостиная 70 м²' },
    { label: 'Участок 11 соток в собственности', detail: 'ИЖС, прописка возможна' },
    { label: 'Газ магистральный', detail: 'двухконтурный котёл — уже работает' },
    { label: 'Электричество 15 кВт', detail: 'счётчик на столбе' },
    { label: 'Интернет', detail: 'оптоволокно, «Тверьрегионсвязь»' },
    { label: 'Терраса', detail: 'под основной крышей, на колоннах' },
    { label: 'Парковочное место', detail: 'на участке' },
    { label: 'Окна VEKA', detail: 'металлопластик, тёмный профиль' },
    { label: 'Металлическая входная дверь', detail: '' },
    { label: 'Уличное освещение', detail: 'в посёлке' },
    { label: 'Гарантия на СМР', detail: '2 года' },
  ] satisfies IncludedItem[],

  excluded: [
    { label: 'Скважина', detail: 'устанавливаем под ключ', canOrder: true },
    { label: 'Септик', detail: 'устанавливаем под ключ', canOrder: true },
    { label: 'Чистовая отделка', detail: 'ваш выбор и бюджет' },
    { label: 'Мебель и техника', detail: '' },
    { label: 'Благоустройство участка', detail: 'газон, забор — по желанию' },
  ] satisfies IncludedItem[],

  faq: [
    {
      q: 'Можно ли купить в ипотеку?',
      a: 'Да. Дом категории ИЖС — ипотека оформляется по стандартным программам. Семейная 6% (есть дети до 18 лет), «Свой дом» 7%, стандарт 16,5%. Минимальный первоначальный взнос от 15%. Помогаем с подбором банка и сборкой пакета документов.',
    },
    {
      q: 'Что входит в цену 14,3 млн ₽?',
      a: 'Готовый одноэтажный дом 138 м² на участке 11 соток в собственности: черновая отделка (стены под штукатурку), терраса, парковочное место, окна VEKA, металлическая входная дверь, работающий двухконтурный газовый котёл, электричество 15 кВт. Гарантия 2 года на СМР. Скважина и септик — отдельно.',
    },
    {
      q: 'Почему нет центральной воды и канализации?',
      a: 'В этом районе Тверской области централизованных сетей нет — стандартная ситуация для загородного ИЖС. Скважина глубиной 30–50 м и септик устанавливаются самостоятельно или через нас. Это разовые расходы; в эксплуатации скважина обходится дешевле водопровода.',
    },
    {
      q: 'Когда можно заехать?',
      a: 'Сразу после подписания договора и регистрации права собственности — обычно 2–4 недели. Дом сдан в 2023 году, кадастр пройден, документы чистые. При ипотеке — 1–3 месяца с момента одобрения. Черновая отделка позволяет начать ремонт немедленно.',
    },
    {
      q: 'Можно ли прописаться в доме?',
      a: 'Да. Категория земель — ИЖС, дом в границах населённого пункта. Постоянная регистрация (ПМЖ) оформляется в стандартном порядке через МФЦ.',
    },
    {
      q: 'Как далеко до Москвы и Твери?',
      a: 'До центра Твери 8 км, около 15 минут на машине. До МКАД по трассе М-11 — примерно 170 км, 1 ч 30 мин без пробок. «Сапсан» доезжает из Санкт-Петербурга до Твери за 2,5 часа, а от вокзала до посёлка — 20 минут на такси.',
    },
  ] satisfies FaqItem[],

  lots: ([
    // ─── Линия 1 (у воды) · 11 участков · все проданы ───────────────────────────
    {
      id: 'vb-01', number: 1,  line: 1, positionInLine: 1,  status: 'sold',
      photos: [],
    },
    {
      id: 'vb-02', number: 2,  line: 1, positionInLine: 2,  status: 'sold',
      photos: [],
    },
    {
      id: 'vb-03', number: 3,  line: 1, positionInLine: 3,  status: 'sold',
      photos: [],
    },
    {
      id: 'vb-04', number: 4,  line: 1, positionInLine: 4,  status: 'sold',
      photos: [],
    },
    {
      id: 'vb-05', number: 5,  line: 1, positionInLine: 5,  status: 'sold',
      photos: [],
    },
    {
      id: 'vb-06', number: 6,  line: 1, positionInLine: 6,  status: 'sold',
      photos: [],
    },
    {
      id: 'vb-07', number: 7,  line: 1, positionInLine: 7,  status: 'sold',
      photos: [],
    },
    {
      id: 'vb-08', number: 8,  line: 1, positionInLine: 8,  status: 'sold',
      photos: [],
    },
    {
      id: 'vb-09', number: 9,  line: 1, positionInLine: 9,  status: 'sold',
      photos: [],
    },
    {
      id: 'vb-10', number: 10, line: 1, positionInLine: 10, status: 'sold',
      photos: [],
    },
    {
      id: 'vb-11', number: 11, line: 1, positionInLine: 11, status: 'sold',
      photos: [],
    },

    // ─── Линия 2 (у дороги) · 11 участков ───────────────────────────────────────
    // Отображение: справа-налево по кадастру → positionInLine 1=правый, 11=левый
    {
      id: 'vb-12', number: 12, line: 2, positionInLine: 1,  status: 'sold',
      photos: [],
    },
    {
      id: 'vb-13', number: 13, line: 2, positionInLine: 2,  status: 'sold',
      photos: [],
    },
    {
      id: 'vb-14',
      number: 14,
      line: 2,
      positionInLine: 3,
      status: 'available',
      shortLabel: '2-я линия · западный край',
      distanceToPierM: 110,
      photos: [P(1), P(2), P(3), P(4), ...INTERIOR_PHOTOS.slice(0, 2)],
      description:
        'Крайний западный дом второй линии — участок открывается на три стороны. Монолитная плита в основании: дом не просел за три зимы. Газовый котёл запущен, 15 кВт подключены, счётчики опломбированы.\n\nДо пирса на Волге пешком 110 метров — меньше двух минут. Вторая линия на 20% дешевле первой, а тишины здесь даже больше: от уличного движения вас отделяет ряд соседних домов. Черновая отделка — стены газоблока ровные, под штукатурку без дополнительной подготовки.\n\nЦена — 14,3 млн ₽, торга нет. Гарантия 2 года на СМР.',
    },
    {
      id: 'vb-15', number: 15, line: 2, positionInLine: 4,  status: 'sold',
      photos: [],
    },
    {
      id: 'vb-16', number: 16, line: 2, positionInLine: 5,  status: 'sold',
      photos: [],
    },
    {
      id: 'vb-17', number: 17, line: 2, positionInLine: 6,  status: 'sold',
      photos: [],
    },
    {
      id: 'vb-18', number: 18, line: 2, positionInLine: 7,  status: 'sold',
      photos: [],
    },
    {
      id: 'vb-19', number: 19, line: 2, positionInLine: 8,  status: 'sold',
      photos: [],
    },
    {
      id: 'vb-20',
      number: 20,
      line: 2,
      positionInLine: 9,
      status: 'available',
      shortLabel: '2-я линия · быстрый въезд',
      distanceToPierM: 130,
      photos: [P(12), P(31), P(14), ...INTERIOR_PHOTOS.slice(2, 4)],
      description:
        'Девятый дом второй линии — напротив главного въезда в посёлок, кратчайший путь от шлагбаума до порога. Котёл работает, газ в трубе, документы в порядке.\n\nДо пирса 130 метров. Участок стандартный — 11 соток ИЖС, прописка без ограничений. Черновая отделка: стены из газоблока уже стоят ровно, потолки 3 метра, гостиная 70 м² с панорамным остеклением на террасу.\n\nМатеринский капитал, семейная ипотека под 6%, стандартные программы — всё работает. Покажем расчёт платежа прямо на просмотре. Цена — 14,3 млн ₽.',
    },
    {
      id: 'vb-21',
      number: 21,
      line: 2,
      positionInLine: 10,
      status: 'available',
      shortLabel: '2-я линия · восточный край · максимум солнца',
      distanceToPierM: 140,
      photos: [P(11), P(15), P(16), P(18), P(21), ...INTERIOR_PHOTOS.slice(4)],
      description:
        'Второй от восточного края — максимум утреннего солнца на участке, гостиная смотрит на восток. Дом прошёл три зимы без единой протечки и трещины. Газ в трубе, котёл греет батареи, 15 кВт заведены.\n\nСтены газоблока подготовлены под штукатурку, перекрытия на высоте 3 м. До пирса — 140 метров по дорожке посёлка.\n\nСвободных домов в первой линии уже нет — это лучшее из того, что осталось. Цена — 14,3 млн ₽, фиксированная.',
    },
    {
      id: 'vb-22', number: 22, line: 2, positionInLine: 11, status: 'sold',
      photos: [],
    },
  ] as Lot[]),
};

// ─── Хелперы ──────────────────────────────────────────────────────────────────

export function getLotCounters() {
  return { total: 22, sold: 19, available: 3 };
}

export function getAvailableLots(): Lot[] {
  return village.lots.filter((l) => l.status === 'available') as Lot[];
}

export function getLotById(id: string): Lot | undefined {
  return village.lots.find((l) => l.id === id) as Lot | undefined;
}
