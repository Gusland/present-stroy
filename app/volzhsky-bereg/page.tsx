import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import ContactFormSection from "@/components/sections/ContactFormSection";

export const metadata: Metadata = {
  title: "Волжский берег — эко-посёлок в Твери",
  description: "Коттеджный эко-посёлок «Волжский берег» в 3 км от Твери. Хвойный лес, берег Волги, участки от 10 соток. Строительство с апреля 2023.",
};

const topFeatures = [
  {
    icon: "https://present-stroy.ru/netcat_files/217/610/ico_slider1.svg",
    text: "Сосновый бор и расположение на первой линии реки Волги",
  },
  {
    icon: "https://present-stroy.ru/netcat_files/217/610/ico_slider2.svg",
    text: "Качество и современный дизайн домов, комфорт премиум класса",
  },
  {
    icon: "https://present-stroy.ru/netcat_files/217/610/ico_slider3.svg",
    text: "Комфортное проживание со всеми необходимыми коммуникациями",
  },
  {
    icon: "https://present-stroy.ru/netcat_files/217/610/ico_slider4.svg",
    text: "Находится в границах населенного пункта деревни Иенево в 3 км от города Тверь",
  },
];

const galleryImages = [
  {
    src: "https://present-stroy.ru/netcat_files/generated/2107/2554/410x300/255/500cd7fd5f21d6463694aa63134a6ad9.jpg",
    alt: "Волжский берег — Берег реки Волга",
    href: "/volzhsky-bereg/kottedzhi",
  },
  {
    src: "https://present-stroy.ru/netcat_files/generated/2107/2554/410x300/256/500cd7fd5f21d6463694aa63134a6ad9.webp",
    alt: "Волжский берег — Виды коттеджей",
    href: "/volzhsky-bereg/kottedzhi",
  },
  {
    src: "https://present-stroy.ru/netcat_files/generated/2107/2554/410x300/257/500cd7fd5f21d6463694aa63134a6ad9.jpg",
    alt: "Волжский берег — Обустроенная территория",
    href: "/volzhsky-bereg/kottedzhi",
  },
];

const infoFeatures = [
  {
    icon: "https://present-stroy.ru/netcat_files/217/613/icon1.svg",
    title: "Природная красота",
    text: "Поселок «Волжский берег» раскинулся на берегах реки Волги, окружённый живописной природой. Вы сможете наслаждаться захватывающими видами и уютной обстановкой, которые придадут вашему дому особую гармонию.",
  },
  {
    icon: "https://present-stroy.ru/netcat_files/217/613/icon2.svg",
    title: "Современный дизайн",
    text: "Все жилые зоны в поселке выполнены в современном архитектурном стиле с особым вниманием к деталям. Эксклюзивный дизайн и удобства обеспечат вашему жилью неповторимый шарм и уют.",
  },
  {
    icon: "https://present-stroy.ru/netcat_files/217/613/icon3.svg",
    title: "Развитая инфраструктура",
    text: "«Волжский берег» предлагает разнообразную инфраструктуру для комфортного проживания. От специально оборудованных спортивных площадок до современных детских игровых зон — здесь найдутся занятия на любой вкус и возраст.",
  },
  {
    icon: "https://present-stroy.ru/netcat_files/217/613/icon4.svg",
    title: "Близость к городу",
    text: "Эко-посёлок удачно расположен в 3 километрах от Твери. Близость двух столиц обеспечивает удобный доступ ко всей городской инфраструктуре и культурным мероприятиям.",
  },
];

const projects = [
  { name: "Гармония", area: 150.75 },
  { name: "Норвежский", area: 182.38 },
  { name: "Симфония", area: 165.93 },
  { name: "Калифорния", area: 323.19 },
];

const subNav = [
  { label: "Этапы строительства", href: "/volzhsky-bereg/etapy" },
  { label: "Виды коттеджей", href: "/volzhsky-bereg/kottedzhi" },
  { label: "План поселка", href: "/volzhsky-bereg/plan" },
];

export default function VolzhskyBeregPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-primary min-h-[60vh] flex items-center pt-24">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/bg2.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-primary/70 z-10" />
        <Container className="relative z-20 py-20">
          <div className="inline-block bg-accent/20 border border-accent/30 text-accent text-sm font-medium px-4 py-1.5 mb-6">
            Строительство началось в апреле 2023 года
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Коттеджный эко-посёлок<br />
            <span className="text-accent">«Волжский берег»</span>
          </h1>
          <p className="text-white/80 text-xl max-w-2xl mb-8">
            3 км от Твери, д. Иенево. Первая линия реки Волги, хвойный лес, собственный пляж.
          </p>
          <nav className="flex flex-wrap gap-3">
            {subNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border border-white/30 text-white/80 hover:border-accent hover:text-accent px-4 py-2 text-sm transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </Container>
      </section>

      {/* Top 4 features */}
      <section className="bg-white border-b border-border">
        <Container className="py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {topFeatures.map((f, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-4">
                <Image
                  src={f.icon}
                  alt={f.text}
                  width={64}
                  height={64}
                  unoptimized
                />
                <p className="text-primary text-sm font-medium leading-snug">{f.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Красота, безопасность и инфраструктура */}
      <section className="py-20 bg-warm">
        <Container>
          <SectionTitle
            title="Красота, безопасность и развитая инфраструктура"
            align="left"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                Коттеджный эко-поселок находится в 3 км от города Твери, в границах населённого пункта д. Иенево, Каблуковского сельского поселения, Калининского района, Тверской области. Вокруг посёлка хвойные леса, берег реки Волги и красивые озёра-карьеры. Собственный песочный пляж, волейбольная и детская площадки.
              </p>
              <p>
                Строительство коттеджного поселка началось в апреле 2023 года. Коттеджи построены в едином стиле с просторной кухней-гостиной и выходом на зону патио (террасу).
              </p>
              <p>
                Мы дорожим своей репутацией и строим только качественные коттеджи для круглогодичного проживания, используя строительные материалы от проверенных производителей.
              </p>
              <p>
                Категория земель посёлка — земли населённых пунктов, вид разрешённого использования — индивидуальное жилищное строительство. Земельные участки не менее 10 соток, по желанию их можно увеличить. В продаже имеются земельные участки на первой и второй линии от реки Волги.
              </p>
              <p>
                В коттеджном эко-посёлке мы строим дома как по индивидуальному проекту с учётом пожеланий заказчика, так и по стандартным проектам нашей компании. Также в наличии готовые коттеджи — продажа от застройщика.
              </p>
              <p className="font-medium text-primary">
                Для уточнения стоимости строительства и подготовки сметной документации обращайтесь по телефону{" "}
                <a href="tel:+79301651329" className="text-accent hover:underline">
                  +7 (930) 165-13-29
                </a>
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {galleryImages.map((img, i) => (
                <Link key={i} href={img.href} className="group overflow-hidden border border-border hover:border-accent transition-colors block">
                  <div className="relative aspect-[410/300]">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      unoptimized
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 4 info features */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {infoFeatures.map((f, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <Image
                  src={f.icon}
                  alt={f.title}
                  width={80}
                  height={80}
                  className="mb-5"
                  unoptimized
                />
                <h3 className="font-bold text-primary text-lg mb-3">{f.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Мы на карте */}
      <section className="py-20 bg-warm">
        <Container>
          <SectionTitle title="Мы на карте" subtitle="Эко-посёлок «Волжский берег» — д. Иенево, Калининский район, Тверская область" />
          <div className="border border-border overflow-hidden">
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A4504c115e405f9c89174b1c3499a615b1f6caece14015fc3612d1ad1e4f881da&source=constructor"
              width="100%"
              height="480"
              frameBorder="0"
              allowFullScreen
              title="Карта эко-посёлка Волжский берег"
              className="block"
            />
          </div>
          <div className="mt-4 flex flex-col sm:flex-row gap-3 items-center justify-between text-sm">
            <p className="text-muted">📍 Тверская область, Калининский район, д. Иенево</p>
            <a
              href="https://yandex.ru/maps/?from=mapframe&ll=36.005419%2C56.819105&mode=usermaps&um=constructor%3A4504c115e405f9c89174b1c3499a615b1f6caece14015fc3612d1ad1e4f881da"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline font-medium shrink-0"
            >
              Открыть в Яндекс.Картах →
            </a>
          </div>
        </Container>
      </section>

      {/* Волжский берег в кадре */}
      <section className="py-20 bg-white">
        <Container>
          <SectionTitle title="Волжский берег в кадре" subtitle="Фотогалерея посёлка и построенных коттеджей" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((img, i) => (
              <Link key={i} href="/volzhsky-bereg/kottedzhi" className="group overflow-hidden border border-border hover:border-accent transition-colors block">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 33vw"
                    unoptimized
                  />
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/volzhsky-bereg/kottedzhi"
              className="inline-flex items-center gap-2 border-2 border-primary text-primary px-8 py-3 font-semibold hover:bg-primary hover:text-white transition-colors"
            >
              Все фото коттеджей
            </Link>
          </div>
        </Container>
      </section>

      {/* Предлагаем реализовать следующие проекты */}
      <section className="py-20 bg-primary">
        <Container>
          <SectionTitle title="Предлагаем реализовать следующие проекты" light />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {projects.map((p) => (
              <div key={p.name} className="bg-white/10 border border-white/20 p-6 text-center hover:bg-white/15 transition-colors">
                <div className="text-3xl font-bold text-accent mb-1">{p.area} м²</div>
                <div className="font-semibold text-white">«{p.name}»</div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-3 font-semibold hover:bg-white hover:text-primary transition-colors"
            >
              Все проекты
            </Link>
          </div>
        </Container>
      </section>

      {/* Больше информации */}
      <section className="py-20 bg-warm">
        <Container>
          <div className="max-w-3xl mx-auto">
            <SectionTitle title="Больше информации о посёлке" />
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                Приобретение земельного участка — первый шаг к осуществлению мечты о собственном доме! Коттеджный эко-посёлок «Волжский берег» — это новый проект компании «Презент-Строй», который поможет изменить ваше мнение о том, что дом у большой воды — это удел избранных!
              </p>
              <p>
                Мы позаботимся о том, чтобы все жилые зоны были выполнены в современном стиле, с уникальным рельефом и удобствами, которые придадут им особую привлекательность.
              </p>
              <p>
                Одной из главных привлекательных точек для жителей и гостей посёлка будет берег реки Волги с оборудованной зоной для отдыха и купания. Здесь можно гулять с детьми, играть, заниматься спортом и просто жить в своё удовольствие!
              </p>
              <p>
                Мы берём на себя всю работу под ключ — от оформления документов на земельный участок до сдачи построенного и подключённого ко всем коммуникациям дома его владельцам.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Sub-pages navigation */}
      <section className="py-16 bg-white border-t border-border">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { title: "Этапы строительства", href: "/volzhsky-bereg/etapy", desc: "Фотоотчёт по каждому этапу возведения посёлка" },
              { title: "Виды коттеджей", href: "/volzhsky-bereg/kottedzhi", desc: "19 фото готовых коттеджей в посёлке" },
              { title: "План поселка", href: "/volzhsky-bereg/plan", desc: "Генеральный план с расположением участков" },
            ].map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="group border border-border hover:border-accent p-6 transition-all hover:shadow-md"
              >
                <h3 className="font-bold text-primary text-lg mb-2 group-hover:text-accent transition-colors">
                  {p.title}
                </h3>
                <p className="text-muted text-sm mb-3">{p.desc}</p>
                <span className="text-accent text-sm font-semibold">Перейти →</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <ContactFormSection />
    </>
  );
}
