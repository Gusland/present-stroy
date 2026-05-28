import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import ContactFormSection from "@/components/sections/ContactFormSection";

export const metadata: Metadata = {
  title: "Виды построенных коттеджей — Волжский берег",
  description: "Построенные коттеджи в эко-посёлке «Волжский берег» в Твери. Фотогалерея 19 готовых домов.",
  alternates: { canonical: "/volzhsky-bereg/kottedzhi" },
};

const cottagePhotos = [
  { src: "https://present-stroy.ru/netcat_files/multifile/2620/54/WhatsApp_Image_2024_07_05_at_11.19.02_1_.jpeg", alt: "Коттедж 1" },
  { src: "https://present-stroy.ru/netcat_files/multifile/2620/54/WhatsApp_Image_2024_07_05_at_11.19.03_3_.jpeg", alt: "Коттедж 2" },
  { src: "https://present-stroy.ru/netcat_files/multifile/2620/54/WhatsApp_Image_2024_07_05_at_11.19.03.jpeg", alt: "Коттедж 3" },
  { src: "https://present-stroy.ru/netcat_files/multifile/2620/54/2.jpg", alt: "Коттедж 4" },
  { src: "https://present-stroy.ru/netcat_files/multifile/2620/54/5.jpg", alt: "Коттедж 5" },
  { src: "https://present-stroy.ru/netcat_files/multifile/2620/54/12.jpg", alt: "Коттедж 6" },
  { src: "https://present-stroy.ru/netcat_files/multifile/2620/54/11.jpg", alt: "Коттедж 7" },
  { src: "https://present-stroy.ru/netcat_files/multifile/2620/54/IMG_5315.jpg", alt: "Коттедж 8" },
  { src: "https://present-stroy.ru/netcat_files/multifile/2620/54/1.jpg", alt: "Коттедж 9" },
  { src: "https://present-stroy.ru/netcat_files/multifile/2620/54/IMG_5313.jpg", alt: "Коттедж 10" },
  { src: "https://present-stroy.ru/netcat_files/multifile/2620/54/IMG_5321.jpg", alt: "Коттедж 11" },
  { src: "https://present-stroy.ru/netcat_files/multifile/2620/54/IMG_5330.jpg", alt: "Коттедж 12" },
  { src: "https://present-stroy.ru/netcat_files/multifile/2620/54/IMG_2557.jpg", alt: "Коттедж 13" },
  { src: "https://present-stroy.ru/netcat_files/multifile/2620/54/IMG_2558.jpg", alt: "Коттедж 14" },
  { src: "https://present-stroy.ru/netcat_files/multifile/2620/54/IMG_2560.jpg", alt: "Коттедж 15" },
  { src: "https://present-stroy.ru/netcat_files/multifile/2620/54/IMG_2561.jpg", alt: "Коттедж 16" },
  { src: "https://present-stroy.ru/netcat_files/multifile/2620/54/IMG_2563.jpg", alt: "Коттедж 17" },
  { src: "https://present-stroy.ru/netcat_files/multifile/2620/54/IMG_6419.webp", alt: "Коттедж 18" },
  { src: "https://present-stroy.ru/netcat_files/multifile/2620/54/f0ac36c4_642e_4efc_b5ed_5e93ebf8bdb3.jfif", alt: "Коттедж 19" },
];

const types = [
  { title: "Двухэтажный с террасой и гаражом на 2 места" },
  { title: "Коттедж с выходом на зону патио" },
  { title: "Коттедж с террасой и гаражом" },
  { title: "Коттедж с мансардой" },
];

export default function KottedhziPage() {
  return (
    <>
      <section className="bg-primary py-24 pt-36">
        <Container>
          <div className="text-sm text-white/60 mb-2">
            <a href="/volzhsky-bereg" className="hover:text-accent transition-colors">Волжский берег</a>{" /"}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Виды построенных коттеджей</h1>
          <p className="text-white/70 text-xl max-w-2xl">
            Фотогалерея готовых коттеджей в эко-посёлке «Волжский берег»
          </p>
        </Container>
      </section>

      <section className="py-20 bg-white">
        <Container>
          {/* Types */}
          <SectionTitle title="Типы коттеджей" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
            {types.map((t, i) => (
              <div key={i} className="bg-warm border border-border p-5 text-center">
                <div className="text-2xl mb-3">🏡</div>
                <p className="text-primary font-medium text-sm">{t.title}</p>
              </div>
            ))}
          </div>

          {/* All 19 photos */}
          <SectionTitle title="Построенные коттеджи в эко-посёлке" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cottagePhotos.map((photo, i) => (
              <a
                key={i}
                href={photo.src}
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-border hover:border-accent transition-colors overflow-hidden block"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    unoptimized
                  />
                </div>
              </a>
            ))}
          </div>

          <p className="text-center text-muted text-sm mt-8">
            Готовы построить по вашему индивидуальному проекту!
          </p>
        </Container>
      </section>

      <ContactFormSection />
    </>
  );
}
