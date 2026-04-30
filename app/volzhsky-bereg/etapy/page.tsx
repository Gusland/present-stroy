import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import ContactFormSection from "@/components/sections/ContactFormSection";

export const metadata: Metadata = {
  title: "Этапы строительства — Волжский берег",
  description: "Этапы строительства эко-посёлка «Волжский берег» в Твери. Фотоотчёт по каждому этапу.",
};

const stages = [
  {
    title: "1 этап строительства",
    src: "https://present-stroy.ru/netcat_files/generated/2050/2460/300x410/79/1548/bed67bbdb7d8dde07ec8e670841a5122.jpg",
  },
  {
    title: "2 этап строительства эко-посёлка",
    src: "https://present-stroy.ru/netcat_files/generated/2050/2460/300x410/75/1450/bed67bbdb7d8dde07ec8e670841a5122.jpg",
  },
  {
    title: "Фундамент. Начало строительства",
    src: "https://present-stroy.ru/netcat_files/generated/2050/2460/300x410/59/1116/bed67bbdb7d8dde07ec8e670841a5122.jpg",
  },
  {
    title: "Кладка цоколя",
    src: "https://present-stroy.ru/netcat_files/generated/2050/2460/300x410/57/1107/bed67bbdb7d8dde07ec8e670841a5122.jpg",
  },
  {
    title: "Кладка стен и перегородок",
    src: "https://present-stroy.ru/netcat_files/generated/2050/2460/300x410/56/1088/bed67bbdb7d8dde07ec8e670841a5122.jpg",
  },
  {
    title: "Монтаж кровли",
    src: "https://present-stroy.ru/netcat_files/generated/2050/2460/300x410/58/1110/bed67bbdb7d8dde07ec8e670841a5122.jpg",
  },
];

export default function EtapyPage() {
  return (
    <>
      <section className="bg-primary py-24 pt-36">
        <Container>
          <div className="text-sm text-white/60 mb-2">
            <a href="/volzhsky-bereg" className="hover:text-accent transition-colors">Волжский берег</a> /
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Этапы строительства</h1>
          <p className="text-white/70 text-xl max-w-2xl">
            Фотоотчёт строительства эко-посёлка «Волжский берег»
          </p>
        </Container>
      </section>

      <section className="py-20 bg-white">
        <Container>
          <SectionTitle title="Строительство в деталях" subtitle="Каждый этап — под контролем инженера и с фотофиксацией" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stages.map((stage, i) => (
              <div key={i} className="group border border-border hover:border-accent transition-colors overflow-hidden">
                <div className="relative aspect-[3/4]">
                  <Image
                    src={stage.src}
                    alt={stage.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-primary group-hover:text-accent transition-colors">
                    {stage.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <ContactFormSection />
    </>
  );
}
