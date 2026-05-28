# SEO-этап · present-stroy.рф

Контекст: Next.js + TypeScript, основной домен будущего — `present-stroy.рф`
(сейчас на `vercel.app`). Локальный бизнес: Тверь и область, частное
домостроение, чек 5–15 млн ₽, плюс готовый посёлок «Волжский Берег».
Главный канал — **Яндекс** (60–70 % рынка в РФ), Google — второй
приоритет.

Цель этого этапа: за 4 недели вывести сайт в топ-10 Яндекса по
коммерческим запросам «Тверь + дом/строительство/коттедж» и в топ-20
по информационным «как / сколько стоит / какой выбрать».

---

## Стратегия

1. **Технический фундамент** — без этого ничего не ранжируется.
2. **Локальное SEO** — фокус на Тверь, NAP везде, Я.Бизнес.
3. **Семантическое ядро** — собрать, разнести по страницам.
4. **Микроразметка** schema.org — LocalBusiness, Product, FAQPage и т. д.
5. **Контент-кластеры** — 20 SEO-статей под средне-частотные запросы.
6. **Поведенческие факторы** — Яндекс на них смотрит сильно.
7. **Мониторинг** — Я.Вебмастер, Метрика, GSC.

---

## Файлы-референсы

В репо лежат:
- `_design-reference/volzhsky-styles.css` — design system
- `_design-reference/debt.md` — открытые вопросы (ИНН, ОГРН, адреса)
- этот промт в `_design-reference/prompt-seo.md`

---

## Правила работы

- Все мета-данные → `generateMetadata` в каждом `app/*/page.tsx`,
  никаких `<title>` руками в JSX
- Один источник правды: `lib/seo.ts` с константами и хелперами
- `metadataBase` в `app/layout.tsx` берёт `NEXT_PUBLIC_SITE_URL` из env
  (см. задачу 1.1 — если ещё не сделано)
- JSON-LD через React-компонент `<JsonLd data={…} />` в head
- Никаких keyword stuffing в текстах. Ключи — естественно в H1/H2/alt
- Картинки: `next/image` + осмысленный alt с локацией
- Все ссылки внутри сайта — относительные, без trailing slash

---

## Задачи

### 1.1 — Технический фундамент

**Создай `lib/seo.ts`:**

```ts
export const SITE = {
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://present-stroy.vercel.app',
  name: 'Презент-Строй',
  brand: 'Презент-Строй',
  legalName: 'ООО «ПРЕЗЕНТ-СТРОЙ»',
  inn: '6900000000',        // TODO[ASK]: debt.md §10
  ogrn: '0000000000000',    // TODO[ASK]: debt.md §10
  phone: '+74822751329',    // TODO[ASK]: debt.md §7
  phoneDisplay: '+7 482 275 13 29',
  email: 'hello@present-stroy.ru', // TODO[ASK]: debt.md §10
  address: {
    locality: 'Тверь',
    region: 'Тверская область',
    country: 'RU',
    postalCode: '170000',   // TODO[ASK]
    street: 'TODO',         // TODO[ASK]: debt.md §5
    lat: 56.84,             // TODO[ASK]
    lng: 35.95,
  },
  hours: 'Mo-Su 09:00-20:00',
  social: {
    vk: 'https://vk.com/present-stroy',     // TODO[ASK]
    telegram: 'https://t.me/present_stroy', // TODO[ASK]
  },
  serviceArea: ['Тверь', 'Тверская область', 'Калининский район',
                'Конаковский район'],
};

export const META_DEFAULTS = {
  titleTemplate: '%s | Презент-Строй · Тверь',
  defaultDescription: '...',
};
```

**Обнови `app/layout.tsx`:**

```ts
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Строительство домов в Твери под ключ — Презент-Строй',
    template: '%s | Презент-Строй'
  },
  description: '...', // см. ниже
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: SITE.brand,
    images: [{ url: '/og/default.jpg', width: 1200, height: 630 }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' }
  },
  verification: {
    yandex: 'TODO[ASK]: код подтверждения Я.Вебмастера',
    google: 'TODO[ASK]: код подтверждения GSC',
  },
};
```

**Создай `app/sitemap.ts`** — динамический, с приоритетами:
- `/` priority 1.0
- `/volzhsky-bereg` priority 0.9 (горячий продукт)
- `/volzhsky-bereg/lot/[id]` priority 0.8
- `/projects/[slug]` priority 0.7
- `/services/[slug]` priority 0.7
- `/articles/[slug]` priority 0.5
- `/about`, `/contacts` priority 0.4
- `lastModified` берётся из data-файлов

**Создай `app/robots.ts`:**

```ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/', '/admin/',
        '/volzhsky-bereg/landing/'] },
      { userAgent: 'Yandex', allow: '/' },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url, // важно для Яндекса
  };
}
```

**В `middleware.ts`** для preview-окружения (`*.vercel.app`,
`*.preview.app`):

```ts
const host = req.headers.get('host');
if (host?.includes('vercel.app') || host?.includes('preview.')) {
  res.headers.set('X-Robots-Tag', 'noindex, nofollow');
}
```

**Acceptance 1.1:**
- [ ] `curl https://present-stroy.рф/sitemap.xml` отдаёт валидный XML
- [ ] `/robots.txt` содержит host и sitemap
- [ ] Preview на vercel.app возвращает `X-Robots-Tag: noindex`
- [ ] Все страницы имеют `canonical` на финальный домен

---

### 1.2 — Уникальные мета для каждой страницы

Это **самое важное** для Яндекса. Пройдись по всем `app/*/page.tsx` и
напиши `generateMetadata`. Шаблоны ниже — длина соблюдена строго.

#### Главная `/`
- **title:** «Строительство домов в Твери под ключ — Презент-Строй» (53 симв)
- **description:** «Строим частные дома в Твери и области с 2013 года.
  10+ типовых проектов, фикс. цена в договоре, ипотека от 6 %.
  Готовый посёлок Волжский Берег — 3 дома в продаже.» (159 симв)
- **H1:** «Строим частные дома в Твери под ключ»

#### Проекты `/projects`
- **title:** «Проекты домов в Твери — 12 готовых решений | Презент-Строй»
- **description:** «12 проектов одно- и двухэтажных домов из газоблока
  и кирпича. Площади 90–250 м². Цена от 6,5 до 14 млн ₽ под ключ.
  Адаптируем под ваш участок.»
- **H1:** «Проекты домов для строительства в Твери»

#### Проект `/projects/[slug]`
- **title:** «`{name}` — проект дома `{area}` м² в Твери | Презент-Строй»
- **description:** «Проект дома `{name}`: `{area}` м², `{floors}` этажа,
  `{bedrooms}` спальни. Строительство под ключ в Твери и области,
  цена от `{priceFrom}` ₽. Срок 6–9 месяцев.»
- **H1:** «Дом „`{name}`“ · `{area}` м²»

#### Услуги `/services`
- **title:** «Строительные услуги в Твери — кирпич, газоблок, отделка»
- **description:** «Услуги Презент-Строй: строительство домов из
  кирпича и газоблока, отделка под ключ, благоустройство участка,
  инженерные сети. Гарантия 2 года в договоре.»

#### Услуга `/services/[slug]`
- **title:** «`{name}` в Твери — цена, сроки, гарантия | Презент-Строй»
- **description:** уникальный для каждой услуги (TODO написать копирайт)

#### Волжский Берег `/volzhsky-bereg`
- **title:** «Волжский Берег — готовый посёлок под Тверью, 3 дома по 14,3 млн»
- **description:** «Сданный посёлок ИЖС на правом берегу Волги, 8 км
  от Твери. В продаже 3 дома 138 м² по 14,3 млн ₽. Газ, 15 кВт, пирс
  и пляж в 50 м. Запишитесь на просмотр.»
- **H1:** «Волжский Берег»

#### Лот `/volzhsky-bereg/lot/[id]`
- **title:** «Дом № `{id}` в Волжском Берегу — `{m2}` м², `{price}` ₽»
- **description:** «Готовый дом № `{id}` в посёлке Волжский Берег под
  Тверью: 138 м², 11 соток, 3 спальни. Магистральный газ, отделка
  фасада кирпичом. Цена `{price}` ₽. Запишитесь на просмотр.»

#### Контакты `/contacts`
- **title:** «Контакты Презент-Строй — Тверь, ул. `{street}`, тел. `{phone}`»
- **description:** «Адрес, телефоны и часы работы Презент-Строй в
  Твери. Бесплатная консультация, выезд инженера на участок,
  составление сметы за 24 часа.»

**Acceptance 1.2:**
- [ ] Каждая страница имеет уникальный title 50–65 симв
- [ ] Каждая описание 140–160 симв, упоминает «Тверь» где уместно
- [ ] Один H1 на страницу, остальное — H2/H3
- [ ] В Я.Вебмастере раздел «Мета-теги» — ни одного дубля

---

### 1.3 — Schema.org микроразметка

Создай `components/seo/JsonLd.tsx`:

```tsx
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

И типизированные билдеры в `lib/schema.ts`:

#### LocalBusiness — на `/` и `/contacts`

```ts
{
  '@context': 'https://schema.org',
  '@type': 'GeneralContractor',
  '@id': `${SITE.url}/#organization`,
  name: 'Презент-Строй',
  legalName: SITE.legalName,
  url: SITE.url,
  telephone: SITE.phone,
  email: SITE.email,
  logo: `${SITE.url}/logo.png`,
  image: `${SITE.url}/og/default.jpg`,
  taxID: SITE.inn,
  vatID: SITE.inn,
  foundingDate: '2013',
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.locality,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.country,
  },
  geo: { '@type': 'GeoCoordinates',
         latitude: SITE.address.lat,
         longitude: SITE.address.lng },
  openingHours: SITE.hours,
  areaServed: SITE.serviceArea.map(name => ({
    '@type': 'City', name
  })),
  priceRange: '5 000 000 — 15 000 000 ₽',
  sameAs: Object.values(SITE.social),
  aggregateRating: {            // TODO[ASK]: реальный рейтинг
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '87'
  }
}
```

#### WebSite + SearchAction — на `/`

```ts
{
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  url: SITE.url,
  name: SITE.name,
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint',
              urlTemplate: `${SITE.url}/projects?q={search_term_string}` },
    'query-input': 'required name=search_term_string'
  }
}
```

#### Product — на `/projects/[slug]` (типовой проект)

```ts
{
  '@type': 'Product',
  name: `Проект дома «${project.name}»`,
  description: project.description,
  image: project.photos.map(p => `${SITE.url}${p}`),
  brand: { '@type': 'Brand', name: 'Презент-Строй' },
  offers: {
    '@type': 'Offer',
    price: project.priceFrom,
    priceCurrency: 'RUB',
    availability: 'https://schema.org/InStock',
    seller: { '@id': `${SITE.url}/#organization` },
    priceValidUntil: '2026-12-31'
  }
}
```

#### RealEstateListing — на `/volzhsky-bereg/lot/[id]`

```ts
{
  '@context': 'https://schema.org',
  '@type': 'SingleFamilyResidence',
  name: `Дом № ${lot.id} в посёлке Волжский Берег`,
  description: lot.description,
  image: lot.photos.map(p => `${SITE.url}${p}`),
  url: `${SITE.url}/volzhsky-bereg/lot/${lot.id}`,
  numberOfRooms: lot.bedrooms,
  numberOfBathroomsTotal: lot.bathrooms,
  floorSize: { '@type': 'QuantitativeValue', value: 138, unitCode: 'MTK' },
  yearBuilt: 2023,
  address: { … },
  geo: { … },
  offers: {
    '@type': 'Offer',
    price: lot.priceRub,
    priceCurrency: 'RUB',
    availability: lot.status === 'available'
      ? 'https://schema.org/InStock'
      : 'https://schema.org/SoldOut'
  }
}
```

#### FAQPage — на `/faq` и `/volzhsky-bereg`

```ts
{
  '@type': 'FAQPage',
  mainEntity: faqItems.map(item => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a }
  }))
}
```

#### BreadcrumbList — на всех вложенных

```ts
{
  '@type': 'BreadcrumbList',
  itemListElement: breadcrumbs.map((b, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: b.name,
    item: `${SITE.url}${b.path}`
  }))
}
```

**Acceptance 1.3:**
- [ ] Все JSON-LD проходят validator.schema.org
- [ ] В Я.Вебмастере раздел «Структурированные данные» — без ошибок
- [ ] В GSC раздел «Расширения» показывает Organization, Product, FAQ
- [ ] Через 2–4 недели в выдаче появляются расширенные сниппеты

---

### 1.4 — Семантическое ядро и структура контента

Распредели запросы по страницам (НЕ stuffing — естественные вхождения
в H1/H2, первый абзац, alt, anchor):

#### Главная — высокочастотные, бренд
- строительство домов тверь
- построить дом тверь
- частные дома тверь
- презент строй тверь
- строительная компания тверь

#### `/projects` — средне-частотные коммерческие
- проекты домов тверь
- типовые проекты домов тверь
- готовые проекты домов
- проект дома 150 м2 цена

#### `/services/iz-kirpicha`, `/services/iz-gazoblokov` и т. п.
- дом из кирпича тверь цена
- строительство из газоблока тверь
- дом из газоблоков цена под ключ
- отделка дома под ключ тверь

#### `/volzhsky-bereg`
- купить дом в твери
- готовый дом тверь
- коттеджный посёлок тверь
- дом у воды тверь
- купить дом на волге тверь

#### `/articles/[slug]` — информационные хвосты (см. 1.5)

#### Длинные хвосты для футера и анкоров внутренних ссылок
- сколько стоит построить дом в твери
- ипотека на частный дом тверь
- участок ижс в твери
- разрешение на строительство тверь
- дом 138 м2 в твери

**Acceptance 1.4:**
- [ ] Каждый из этих запросов имеет одну «свою» страницу, не дублируется
- [ ] H1 содержит главный ключ
- [ ] Первый абзац (60–80 слов) — естественное вхождение 1–2 ключей
- [ ] Внутренних ссылок с правильными анкорами ≥ 5 на страницу

---

### 1.5 — Контент-стратегия: 20 SEO-статей

Создай раздел `/articles` (или `/blog`). На MDX. По одной статье в
неделю на 20 недель. Шаблон статьи:

- 1500–3000 слов
- H1, 4–6 H2, 2–4 H3 в каждой
- Хлебные крошки и FAQ-блок в конце (со schema.org)
- 2–3 внутренних ссылки на коммерческие страницы
- Изображение в начале, alt с ключом
- Дата публикации и обновления
- Автор: «Команда Презент-Строй» с микроразметкой

**Готовый план (приоритет сверху):**

1. Сколько стоит построить дом в Твери в 2026 году — разбор цен
2. Дом из газоблока: плюсы, минусы, цена за м² в 2026
3. ИЖС vs СНТ — что выбрать в Тверской области
4. Какой фундамент выбрать: плита, лента или сваи
5. Ипотека на частный дом 2026 — банки, ставки, документы
6. Сколько занимает строительство дома под ключ — реальные сроки
7. Чек-лист приёмки дома от застройщика
8. Газоблок vs кирпич: что лучше для дома в Твери
9. Как выбрать участок ИЖС в Твери и области — 12 критериев
10. Магистральный газ или электричество для отопления — что выгоднее
11. Скважина или централизованная вода: что выбрать
12. Кровля для частного дома: металлочерепица, мягкая, фальц
13. Семейная ипотека 6 % на строительство дома — условия
14. Как читать смету застройщика — расшифровка
15. СРО, лицензии, договор: на что смотреть при выборе застройщика
16. Дом из 138 м²: как разместить семью из 4 человек
17. Готовый дом или строительство с нуля — что выгоднее
18. Прописка в загородном доме — условия и документы
19. Эксплуатация частного дома: зимовка, отопление, расходы
20. Тверь vs Подмосковье — где выгоднее покупать дом

К каждой статье прилагай:
- 3 длинных запроса, под которые оптимизирована
- Внутренние ссылки на главную, проекты, услуги, Волжский Берег

**Acceptance 1.5:**
- [ ] Каркас раздела `/articles` создан
- [ ] Первые 5 статей опубликованы
- [ ] Каждая статья имеет уникальный title, description, FAQ-block,
      schema.org Article + FAQPage

---

### 1.6 — Локальное SEO и NAP

**На КАЖДОЙ странице (в подвале) должны быть единым форматом:**
- Название юр. лица
- ИНН, ОГРН
- Адрес: «Тверь, ул. …»
- Телефон с тег `<a href="tel:…">` и `itemprop="telephone"`
- Часы работы
- Ссылка на Я.Карту

**Создай `app/contacts/page.tsx`:**
- Полные реквизиты + JSON-LD LocalBusiness
- Встроенная Я.Карта iframe (https://yandex.ru/map-widget/v1/)
- 3 канала: телефон, WhatsApp (`wa.me/...`), Telegram (`t.me/...`)
- Форма для общего вопроса

**Чек-лист офлайн-действий (не код, но обязательно вне репо):**

- [ ] Заявить компанию в **Я.Бизнес** — главный приоритет в РФ
- [ ] Добавить в **2ГИС** (запросить размещение)
- [ ] Добавить в **Google Business Profile**
- [ ] Создать страницу **ВКонтакте** и привязать в `sameAs`
- [ ] Запросить отзывы у клиентов в Я.Картах и 2ГИС
      (минимум 10 за первые 2 месяца)

**Acceptance 1.6:**
- [ ] NAP в подвале каждой страницы
- [ ] Компания подтверждена в Я.Бизнесе (вне репо)
- [ ] LocalBusiness JSON-LD валиден

---

### 1.7 — Технические показатели (CWV)

Яндекс с 2024 года учитывает Core Web Vitals наравне с Google.

**Целевые значения (mobile):**
- LCP ≤ 2.5 с
- INP ≤ 200 мс
- CLS ≤ 0.05
- Lighthouse SEO ≥ 95
- Lighthouse Performance ≥ 90

**Что сделать:**
- `next/image` на ВСЕ картинки, AVIF + WebP, явные `sizes`
- `priority` только на LCP-изображении hero
- `font-display: swap` на всех `@font-face`
- Bundle ≤ 200 KB JS gzipped на главной (Next App Router
  по умолчанию это даёт)
- Префетч ключевых страниц через `<Link prefetch>`
- Отложить любые виджеты (чат, метрики) на `requestIdleCallback`

**Подключи на CDN:**
- Vercel Analytics или Plausible — для CWV в продакшене

**Acceptance 1.7:**
- [ ] Запуск Lighthouse даёт ≥ 95 SEO и ≥ 90 Performance
      на главной, /projects, /volzhsky-bereg
- [ ] В GSC раздел Core Web Vitals — все URL Good
- [ ] В Я.Вебмастере «Скорость сайта» — зелёный

---

### 1.8 — Поведенческие факторы

**Яндекс смотрит на поведение и учитывает его как сигнал
ранжирования.** Что сделать в коде:

1. **Глубина просмотра** — добавь блок «Похожие проекты» на каждый
   `/projects/[slug]`, «Другие услуги» на `/services/[slug]`,
   «Свободные дома» в Волжский Берег. Минимум 3 ссылки.
2. **Время на странице** — длинные осмысленные тексты, FAQ-блоки,
   калькуляторы (ипотека на главной и в Волжском Берегу).
3. **Низкий отказ** — на каждой странице видимый CTA в первом экране,
   без необходимости скроллить.
4. **Внутренний поиск** — `/projects?q=` + SearchAction в schema.
5. **Сценарии** — кнопки «Скачать проект PDF», «Записаться на выезд»,
   «Рассчитать стоимость» — это всё триггеры взаимодействия.

**Acceptance 1.8:**
- [ ] Глубина просмотра в Метрике после месяца ≥ 2.5 страниц/сессия
- [ ] Среднее время на странице ≥ 1:30
- [ ] Показатель отказов ≤ 25 %

---

### 1.9 — Мониторинг и аналитика

**Подключи в порядке приоритета:**

1. **Яндекс.Вебмастер** — добавь оба хоста (.рф и старый .vercel.app
   как «несовпадающие зеркала»), укажи главное зеркало, отправь
   sitemap, проверь региональность («Тверь»).
2. **Я.Метрика** — счётчик + цели:
   - `lead_form_submit` — отправка любой формы
   - `phone_click` — клик по tel:
   - `whatsapp_click`, `telegram_click`
   - `calc_complete` — расчёт ипотеки
   - `vb_lot_view` — просмотр карточки лота
   - `download_pdf` — скачивание буклета
3. **Google Search Console** — добавь хост, sitemap, проверь Indexing.
4. **PostHog или Plausible** — поведенческая аналитика (вне Метрики).

**Создай дашборд проверок (вне репо):**
- Раз в неделю: позиции по 30 ключам (вручную или через TopVisor /
  Serpstat)
- Раз в месяц: технический аудит сайта (Screaming Frog бесплатной
  версии достаточно)
- Раз в квартал: контент-аудит — какие статьи дают трафик, какие нет

**Acceptance 1.9:**
- [ ] Все 3 метрики установлены
- [ ] 6+ целей сконфигурированы
- [ ] Я.Вебмастер показывает 0 критических ошибок

---

## Порядок работы

1. Ветка `feat/seo-foundation`
2. Сделай 1.1, 1.2, 1.3 — это технический фундамент, без него
   остальное не имеет смысла. Покажи мне Vercel preview.
3. После приёма — 1.4, 1.6, 1.7, 1.8, 1.9 (можно параллельно).
4. После приёма — 1.5 (контент-кластер): сначала каркас раздела
   `/articles`, потом по 1–2 статьи в неделю.
5. В конце каждой задачи присылай список `TODO[ASK]` со ссылками на
   `debt.md` — я отвечу и обновлю файл.

---

## Что я предоставлю по ходу

- ИНН, ОГРН, юр. адрес (debt.md §10)
- Точный адрес офиса в Твери (debt.md §5)
- Коды подтверждения Я.Вебмастера и GSC
- Реальный рейтинг и количество отзывов (когда соберём в Я.Картах)
- Тексты статей по плану 1.5 (или закажу копирайтера, дам файлами)

---

## Чего НЕ делаем на этом этапе

- Платное продвижение (Я.Директ, контекст) — отдельный бюджет, не код
- Линкбилдинг — отдельная история, делается вне сайта
- A/B-тесты — после первых 3 месяцев данных
- Email-рассылки — отдельный продукт
