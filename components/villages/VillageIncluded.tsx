import Container from "@/components/ui/Container";
import { village } from "@/data/villages";

export default function VillageIncluded() {
  const price = (village.defaultLot.priceRub / 1_000_000)
    .toFixed(1)
    .replace(".", ",");

  return (
    <section className="py-16 bg-warm" id="included">
      <Container>
        <div className="mb-10">
          <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-2">
            Комплектация
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-primary">
            Что входит в {price} млн ₽
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Included */}
          <div className="bg-white border border-border p-6 md:p-8">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-5 h-5 bg-primary rounded-full flex items-center justify-center shrink-0">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <h3 className="font-bold text-primary text-lg">
                Включено — всё готово к ремонту
              </h3>
            </div>
            <ul className="space-y-3">
              {village.included.map((item) => (
                <li key={item.label} className="flex gap-3">
                  <svg
                    className="w-5 h-5 text-accent shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <span className="text-primary font-medium text-sm">
                      {item.label}
                    </span>
                    {item.detail && (
                      <span className="text-muted text-sm"> — {item.detail}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Excluded */}
          <div className="bg-white border border-border p-6 md:p-8">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-5 h-5 bg-border rounded-full flex items-center justify-center shrink-0">
                <svg className="w-3 h-3 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </span>
              <h3 className="font-bold text-primary text-lg">
                Отдельно — по вашему выбору
              </h3>
            </div>
            <ul className="space-y-3">
              {village.excluded.map((item) => (
                <li key={item.label} className="flex gap-3">
                  <svg
                    className={`w-5 h-5 shrink-0 mt-0.5 ${item.canOrder ? "text-accent" : "text-muted"}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    {item.canOrder ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    )}
                  </svg>
                  <div>
                    <span className="text-primary font-medium text-sm">
                      {item.label}
                    </span>
                    {item.detail && (
                      <span className="text-muted text-sm"> — {item.detail}</span>
                    )}
                    {item.canOrder && (
                      <span className="ml-2 text-accent text-xs font-semibold border border-accent/30 px-2 py-0.5">
                        под ключ
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm text-muted border-t border-border pt-4">
              Скважина и септик устанавливаем по дополнительному договору — стоимость и сроки обсуждаются на встрече.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
