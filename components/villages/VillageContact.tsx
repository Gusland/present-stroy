import Container from "@/components/ui/Container";
import { contacts } from "@/data/contacts";
import LeadForm from "@/components/villages/LeadForm";

type Props = {
  prefillMessage?: string;
  lotId?: string;
  source?: string;
};

export default function VillageContact({ prefillMessage, lotId, source = "village-contact" }: Props) {
  return (
    <section className="py-16 bg-primary" id="contact">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Info */}
          <div className="text-white">
            <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">
              Записаться на просмотр
            </p>
            <h2 className="text-3xl font-bold mb-4">
              Приезжайте и увидите сами
            </h2>
            <p className="text-white/70 mb-8 leading-relaxed">
              Посёлок открыт для просмотров. Встретим, покажем все три свободных дома, расскажем про ипотеку и сроки оформления. Без навязывания — только факты.
            </p>

            {/* Channels */}
            <div className="space-y-4">
              <a
                href={`tel:${contacts.phone2Raw}`}
                className="flex items-center gap-4 group"
              >
                <span className="w-10 h-10 bg-white/10 flex items-center justify-center border border-white/20 group-hover:border-accent transition-colors shrink-0">
                  <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </span>
                <div>
                  <div className="text-white font-semibold group-hover:text-accent transition-colors">
                    {contacts.phone2}
                  </div>
                  <div className="text-white/50 text-xs">Телефон / WhatsApp</div>
                </div>
              </a>

              <a
                href={`tel:${contacts.phone1Raw}`}
                className="flex items-center gap-4 group"
              >
                <span className="w-10 h-10 bg-white/10 flex items-center justify-center border border-white/20 group-hover:border-accent transition-colors shrink-0">
                  <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </span>
                <div>
                  <div className="text-white font-semibold group-hover:text-accent transition-colors">
                    {contacts.phone1}
                  </div>
                  <div className="text-white/50 text-xs">Офис в Твери</div>
                </div>
              </a>

              <a
                href={`mailto:${contacts.email}`}
                className="flex items-center gap-4 group"
              >
                <span className="w-10 h-10 bg-white/10 flex items-center justify-center border border-white/20 group-hover:border-accent transition-colors shrink-0">
                  <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </span>
                <div>
                  <div className="text-white font-semibold group-hover:text-accent transition-colors">
                    {contacts.email}
                  </div>
                  <div className="text-white/50 text-xs">Email</div>
                </div>
              </a>
            </div>

          </div>

          {/* Form */}
          <div className="bg-white p-6 md:p-8">
            <h3 className="text-xl font-bold text-primary mb-1">
              Записаться на выезд
            </h3>
            <p className="text-muted text-sm mb-6">
              Ответим в течение 15 минут и согласуем удобное время
            </p>
            <LeadForm
              type="viewing"
              lotId={lotId}
              source={source}
              messagePlaceholder={prefillMessage ?? "Удобное время для просмотра (необязательно)"}
              ctaLabel="Записаться на просмотр"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
