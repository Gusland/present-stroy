import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

const BASE = "https://xn----itbahmwicjfkkc.xn--p1ai";

export const metadata: Metadata = {
  title: "Электромонтажные работы в Твери",
  description: "Электромонтажные работы в Твери: проводка, подключение оборудования, заземление. Для домов, коттеджей и квартир.",
  alternates: {
    canonical: "/services/elektromontazhnye-raboty",
  },
};

export default function ElektrikaPage() {
  return (
    <ServicePageTemplate
      title="Электромонтажные работы в Твери"
      subtitle="Комплексный электромонтаж для домов, коттеджей и квартир"
      banner={`${BASE}/netcat_files/generated/2105/3466/740x370/53/27354e2a44fbb7f7761c72f9d4dbe784.webp`}
      promo="При заказе электромонтажных работ дарим подарочный сертификат со скидкой 10% на ремонт и отделочные работы"
      description={[
        "Компания «Презент-Строй» выполняет комплексный монтаж электросетей и подключение оборудования. Все работы производятся в соответствии с ПУЭ и действующими стандартами безопасности.",
        "Мы обеспечиваем подачу электроэнергии для частных домов, коттеджей и дач: прокладку кабелей, устройство заземления, установку стабилизаторов и генераторов. Подключаем котлы, посудомоечные и стиральные машины, проверяем оборудование на механические повреждения.",
      ]}
      features={[
        { title: "Подача электроэнергии для дома, коттеджа, дачи" },
        { title: "Полная или частичная замена проводки" },
        { title: "Прокладка кабеля и устройство заземления" },
        { title: "Установка стабилизатора и генератора" },
        { title: "Подключение котлов и бытовой техники" },
        { title: "Тестирование и проверка оборудования" },
      ]}
      photos={[
        `${BASE}/netcat_files/generated/2148/2620/300x410/50/1275/bed67bbdb7d8dde07ec8e670841a5122.jpeg`,
        `${BASE}/netcat_files/generated/2148/2620/300x410/50/1276/bed67bbdb7d8dde07ec8e670841a5122.jpeg`,
        `${BASE}/netcat_files/generated/2148/2620/300x410/50/1277/bed67bbdb7d8dde07ec8e670841a5122.jpeg`,
        `${BASE}/netcat_files/generated/2148/2620/300x410/50/1558/bed67bbdb7d8dde07ec8e670841a5122.jpg`,
      ]}
    />
  );
}
