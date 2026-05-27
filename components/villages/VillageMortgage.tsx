"use client";

import { useState, useMemo } from "react";
import Container from "@/components/ui/Container";

const PROGRAMS = [
  { id: "family", label: "Семейная", rate: 6.0, note: "дети до 18 лет" },
  { id: "svoy", label: "«Свой дом»", rate: 7.0, note: "ИЖС и дача" },
  { id: "standard", label: "Стандарт", rate: 16.5, note: "без ограничений" },
] as const;

function calcAnnuity(principal: number, annualRate: number, months: number) {
  if (principal <= 0 || months <= 0) return 0;
  const r = annualRate / 100 / 12;
  if (r === 0) return principal / months;
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

type Props = {
  priceRub?: number;
};

export default function VillageMortgage({ priceRub = 14_300_000 }: Props) {
  const [downPct, setDownPct] = useState(30);
  const [termYears, setTermYears] = useState(20);
  const [programId, setProgramId] = useState<string>("family");

  const program = PROGRAMS.find((p) => p.id === programId) ?? PROGRAMS[0];

  const { payment, total, overpay } = useMemo(() => {
    const down = priceRub * (downPct / 100);
    const principal = priceRub - down;
    const months = termYears * 12;
    const basePayment = calcAnnuity(principal, program.rate, months);
    const insuranceMonthly = (principal * 0.004) / 12;
    const payment = basePayment + insuranceMonthly;
    const total = payment * months + down;
    const overpay = total - priceRub;
    return { payment, total, overpay };
  }, [priceRub, downPct, termYears, program]);

  const fmt = (n: number) =>
    new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <section className="py-16 bg-white" id="mortgage">
      <Container>
        <div className="mb-10">
          <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-2">
            Ипотека
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-primary">
            Рассчитайте платёж
          </h2>
          <p className="text-muted mt-2 text-sm max-w-lg">
            Категория ИЖС — доступны семейная ипотека, программа «Свой дом» и стандартные программы банков. Помогаем с оформлением.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Controls */}
          <div className="lg:col-span-3 space-y-6">
            {/* Programs */}
            <div>
              <label className="block text-sm font-semibold text-primary mb-3">
                Программа
              </label>
              <div className="grid grid-cols-3 gap-2">
                {PROGRAMS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setProgramId(p.id)}
                    className={`border p-3 text-center transition-colors ${
                      programId === p.id
                        ? "border-accent bg-accent/10 text-primary"
                        : "border-border hover:border-accent/50 text-muted"
                    }`}
                  >
                    <div className="font-bold text-lg text-primary">{p.rate}%</div>
                    <div className="text-xs font-semibold text-primary">{p.label}</div>
                    <div className="text-xs text-muted mt-0.5">{p.note}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Down payment */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-primary">
                  Первоначальный взнос
                </label>
                <span className="text-accent font-bold">
                  {downPct}% — {fmt(priceRub * (downPct / 100))}
                </span>
              </div>
              <input
                type="range"
                min={15}
                max={70}
                step={5}
                value={downPct}
                onChange={(e) => setDownPct(Number(e.target.value))}
                className="w-full accent-accent cursor-pointer"
                aria-label="Первоначальный взнос"
              />
              <div className="flex justify-between text-xs text-muted mt-1">
                <span>15%</span>
                <span>70%</span>
              </div>
            </div>

            {/* Term */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-primary">Срок</label>
                <span className="text-accent font-bold">{termYears} лет</span>
              </div>
              <input
                type="range"
                min={5}
                max={30}
                step={1}
                value={termYears}
                onChange={(e) => setTermYears(Number(e.target.value))}
                className="w-full accent-accent cursor-pointer"
                aria-label="Срок ипотеки"
              />
              <div className="flex justify-between text-xs text-muted mt-1">
                <span>5 лет</span>
                <span>30 лет</span>
              </div>
            </div>

            <p className="text-xs text-muted">
              * Расчёт приблизительный: аннуитетный платёж + страхование 0,4%/год. Точные условия — в банке.
            </p>
          </div>

          {/* Result */}
          <div className="lg:col-span-2 bg-primary text-white p-6 md:p-8 flex flex-col justify-between">
            <div>
              <p className="text-white/60 text-sm mb-1">Ежемесячный платёж</p>
              <div className="text-4xl font-bold text-accent mb-1">
                {fmt(payment)}
              </div>
              <p className="text-white/60 text-xs">
                включая страховку ~{fmt((priceRub * (1 - downPct / 100) * 0.004) / 12)}/мес
              </p>

              <div className="border-t border-white/20 mt-6 pt-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Цена дома</span>
                  <span className="font-semibold">{fmt(priceRub)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Первый взнос</span>
                  <span className="font-semibold">{fmt(priceRub * (downPct / 100))}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Кредит</span>
                  <span className="font-semibold">{fmt(priceRub * (1 - downPct / 100))}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Переплата</span>
                  <span className="font-semibold text-accent/80">{fmt(overpay)}</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <a
                href="#contact"
                className="block w-full text-center bg-accent text-white font-semibold py-3 text-sm hover:bg-accent-dark transition-colors"
              >
                Получить расчёт от банка
              </a>
              <p className="text-white/50 text-xs mt-3 text-center">
                Помогаем с подбором программы и сбором документов
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
