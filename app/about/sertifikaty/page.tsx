import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import ContactFormSection from "@/components/sections/ContactFormSection";

export const metadata: Metadata = {
  title: "Сертификаты",
  description: "Сертификаты и лицензии строительной компании Презент-Строй в Твери.",
  alternates: { canonical: "/about/sertifikaty" },
};

const certificates = [
  { src: "https://present-stroy.ru/netcat_files/multifile/2620/53/_page_0001_1_.jpg", alt: "Сертификат 1" },
  { src: "https://present-stroy.ru/netcat_files/multifile/2620/53/_page_0001.jpg", alt: "Сертификат 2" },
  { src: "https://present-stroy.ru/netcat_files/multifile/2620/53/sertificat_1.jpg", alt: "Сертификат 3" },
  { src: "https://present-stroy.ru/netcat_files/multifile/2620/53/sert.jpg", alt: "Сертификат 4" },
];

export default function SertifikatyPage() {
  return (
    <>
      <section className="bg-primary py-24 pt-36">
        <Container>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Сертификаты</h1>
          <p className="text-white/70 text-xl max-w-2xl">
            Все работы выполняются в соответствии с нормами и стандартами
          </p>
        </Container>
      </section>

      <section className="py-20 bg-white">
        <Container>
          <SectionTitle
            title="Наши документы"
            subtitle="Оригиналы предоставляем по запросу на встрече в офисе"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {certificates.map((cert) => (
              <a
                key={cert.src}
                href={cert.src}
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-border hover:border-accent transition-colors overflow-hidden block"
              >
                <div className="relative aspect-[3/4]">
                  <Image
                    src={cert.src}
                    alt={cert.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                  />
                </div>
                <div className="p-2 text-center text-xs text-muted group-hover:text-accent transition-colors">
                  {cert.alt} — нажмите для просмотра
                </div>
              </a>
            ))}
          </div>
        </Container>
      </section>

      <ContactFormSection />
    </>
  );
}
