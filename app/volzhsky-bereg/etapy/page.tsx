import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import ContactFormSection from "@/components/sections/ContactFormSection";
import EtapyStages from "@/components/villages/EtapyStages";

export const metadata: Metadata = {
  title: "Этапы строительства — Волжский берег",
  description: "Этапы строительства эко-посёлка «Волжский берег» в Твери. Фотоотчёт по каждому этапу.",
  alternates: { canonical: "/volzhsky-bereg/etapy" },
};

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
          <EtapyStages />
        </Container>
      </section>

      <ContactFormSection />
    </>
  );
}
