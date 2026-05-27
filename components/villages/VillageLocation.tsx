import Container from "@/components/ui/Container";
import { village } from "@/data/villages";

export default function VillageLocation() {
  return (
    <section className="py-16 bg-warm" id="location">
      <Container>
        <div className="mb-8">
          <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-2">
            Расположение
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-primary">
            8 км от центра Твери
          </h2>
          <p className="text-muted mt-2 text-sm">
            {village.address}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {village.routes.map((r) => (
            <div key={r.label} className="bg-white border border-border p-5">
              <div className="text-lg font-bold text-accent">{r.time}</div>
              <div className="font-semibold text-primary text-sm mt-1">
                {r.label}
              </div>
              {r.detail && (
                <div className="text-muted text-xs mt-0.5">{r.detail}</div>
              )}
            </div>
          ))}
          <div className="bg-white border border-border p-5">
            <div className="text-lg font-bold text-accent">50 м</div>
            <div className="font-semibold text-primary text-sm mt-1">
              до пирса на Волге
            </div>
            <div className="text-muted text-xs mt-0.5">пешком из 1-й линии</div>
          </div>
        </div>

        {/* Map embed */}
        <div className="border border-border overflow-hidden">
          <iframe
            src={village.mapEmbedUrl}
            width="100%"
            height="460"
            frameBorder="0"
            allowFullScreen
            title="Карта посёлка Волжский Берег"
            className="block"
            loading="lazy"
          />
        </div>

        <div className="mt-4 flex flex-col sm:flex-row gap-3 items-center justify-between text-sm">
          <p className="text-muted">
            Тверская область, правый берег Волги, 8 км от Твери
          </p>
          <a
            href={village.mapOpenUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline font-medium shrink-0"
          >
            Открыть в Яндекс.Картах →
          </a>
        </div>
      </Container>
    </section>
  );
}
