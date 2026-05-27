import Container from "@/components/ui/Container";
import { village } from "@/data/villages";

const { defaultLot } = village;

const STATS = [
  { value: `${defaultLot.houseAreaM2} м²`, label: "площадь дома" },
  { value: `${defaultLot.plotAreaSot} соток`, label: "участок в собственности" },
  {
    value: `${(defaultLot.priceRub / 1_000_000).toFixed(1).replace(".", ",")} млн`,
    label: "цена — фиксированная",
  },
  { value: `${defaultLot.bedrooms} спальни`, label: `+ ${defaultLot.bathrooms} санузла` },
  { value: `${defaultLot.ceilingHeightM} м`, label: "высота потолков" },
  { value: `${village.year}`, label: "год постройки, сдан" },
];

export default function VillageNumbers() {
  return (
    <section className="py-16 bg-warm">
      <Container>
        <div className="max-w-3xl mb-10">
          <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">
            Характеристики
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-primary leading-snug">
            Газ горит, котёл греет батареи,
            <br />
            стены проверены тремя зимами
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="bg-white border border-border p-5 text-center"
            >
              <div className="text-2xl md:text-3xl font-bold text-accent mb-1">
                {s.value}
              </div>
              <div className="text-xs text-muted leading-tight">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Engineering tags */}
        <div className="flex flex-wrap gap-3 mt-8">
          {[
            village.engineering.gas,
            village.engineering.electricity,
            village.engineering.roads,
            village.engineering.lighting,
            `Фундамент: ${defaultLot.foundation}`,
            `Кровля: ${defaultLot.roof}`,
            `Стены: ${defaultLot.wallMaterial}`,
            `Гарантия ${defaultLot.warrantyYears} года`,
          ].map((tag) => (
            <span
              key={tag}
              className="bg-white border border-border text-primary text-xs px-3 py-1.5"
            >
              {tag}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
