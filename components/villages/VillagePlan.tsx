"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/ui/Container";
import { village, getLotCounters, getAvailableLots, type Lot } from "@/data/villages";

// ─── SVG geometry constants ────────────────────────────────────────────────
const VB = { w: 1200, h: 620 };
const LOT = { w: 99, gap: 4, startX: 30 };
const ROW1 = { y: 108, h: 185 };
const ROW2 = { y: 330, h: 210 };
const STEP = LOT.w + LOT.gap;

function lotX(line: 1 | 2, positionInLine: number): number {
  if (line === 1) return LOT.startX + (positionInLine - 1) * STEP;
  // line 2: rendered right-to-left (positionInLine 1=rightmost, 11=leftmost)
  return LOT.startX + (11 - positionInLine) * STEP;
}

function lotY(line: 1 | 2) {
  return line === 1 ? ROW1.y : ROW2.y;
}

function lotH(line: 1 | 2) {
  return line === 1 ? ROW1.h : ROW2.h;
}


// ─── Filter types ──────────────────────────────────────────────────────────
type Filter = "all" | "available" | "sold" | "line1" | "line2";

// ─── Main component ────────────────────────────────────────────────────────
export default function VillagePlan() {
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedId, setSelectedId] = useState<string | null>(
    () => getAvailableLots()[0]?.id ?? null
  );
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [soldModal, setSoldModal] = useState(false);

  const { available } = getLotCounters();
  const lots = village.lots;

  const isVisible = (lot: Lot): boolean => {
    if (filter === "available") return lot.status === "available";
    if (filter === "sold") return lot.status === "sold";
    if (filter === "line1") return lot.line === 1;
    if (filter === "line2") return lot.line === 2;
    return true;
  };

  const selectedLot = lots.find((l) => l.id === selectedId) ?? null;
  const hoveredLot = lots.find((l) => l.id === hoveredId) ?? null;

  const handleLotClick = (lot: Lot) => {
    if (lot.status === "sold") {
      setSoldModal(true);
      return;
    }
    setSelectedId((prev) => (prev === lot.id ? null : lot.id));
    router.prefetch(`/volzhsky-bereg/lot/${lot.id}`);
  };

  const FILTERS: { id: Filter; label: string }[] = [
    { id: "all", label: `Все 22` },
    { id: "available", label: `Свободные ${available}` },
    { id: "sold", label: `Проданы 19` },
    { id: "line1", label: "1-я линия" },
    { id: "line2", label: "2-я линия" },
  ];

  return (
    <section className="py-16 bg-white" id="plan">
      <Container>
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-2">
              Генплан
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-primary">
              Выберите дом на плане
            </h2>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2" role="group" aria-label="Фильтр лотов">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={`px-3 py-1.5 text-xs font-semibold border transition-colors ${
                  filter === f.id
                    ? "bg-primary border-primary text-white"
                    : "border-border text-primary hover:border-accent hover:text-accent"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
          {/* SVG Plan */}
          <div className="border border-border overflow-hidden bg-warm">
            <div className="overflow-x-auto">
                <svg
                  viewBox={`0 0 ${VB.w} ${VB.h}`}
                  className="w-full min-w-[720px]"
                  role="img"
                  aria-label="Генеральный план посёлка Волжский Берег"
                >
                  {/* ── Background layers ──────────────────────────────── */}

                  {/* Sky */}
                  <rect width={VB.w} height={VB.h} fill="#EBF5FB" />

                  {/* River (Волга) */}
                  <rect y={0} width={VB.w} height={100} fill="#5DADE2" opacity={0.7} />
                  {/* River waves */}
                  <path
                    d="M0 60 Q 150 50 300 60 Q 450 70 600 60 Q 750 50 900 60 Q 1050 70 1200 60"
                    fill="none"
                    stroke="white"
                    strokeWidth={2}
                    opacity={0.4}
                  />
                  <path
                    d="M0 75 Q 100 65 200 75 Q 300 85 400 75 Q 500 65 600 75 Q 700 85 800 75 Q 900 65 1000 75 Q 1100 85 1200 75"
                    fill="none"
                    stroke="white"
                    strokeWidth={1.5}
                    opacity={0.3}
                  />
                  {/* River label */}
                  <text x={20} y={55} fill="white" fontSize={14} fontWeight="600" opacity={0.9}>
                    Волга
                  </text>

                  {/* Sand strip */}
                  <rect y={88} width={VB.w} height={22} fill="#F0E68C" opacity={0.7} />

                  {/* Pier — at corner of lot 11 (x=1060) */}
                  <rect x={1054} y={20} width={12} height={90} fill="#8B7355" opacity={0.9} rx={2} />
                  <rect x={1036} y={12} width={48} height={14} fill="#A0845C" opacity={0.9} rx={2} />
                  <text x={992} y={30} fill="white" fontSize={10} opacity={0.8}>пирс</text>

                  {/* Inner road between rows */}
                  <rect y={295} width={VB.w} height={35} fill="#D5D8DC" />
                  <line x1={0} y1={312} x2={VB.w} y2={312} stroke="white" strokeWidth={2} strokeDasharray="20,12" opacity={0.7} />
                  <text x={20} y={308} fill="#7F8C8D" fontSize={11}>дорога</text>

                  {/* Ground between river and row1 */}
                  <rect y={110} width={VB.w} height={ROW1.y - 110} fill="#E8F5E9" opacity={0.5} />

                  {/* Ground between rows */}
                  <rect y={ROW1.y + ROW1.h} width={VB.w} height={ROW2.y - ROW1.y - ROW1.h} fill="#F2F3F4" />

                  {/* Ground below row 2 to road */}
                  <rect y={ROW2.y + ROW2.h} width={VB.w} height={555 - ROW2.y - ROW2.h} fill="#E8F5E9" opacity={0.4} />

                  {/* Деревня Иенево */}
                  <rect y={540} width={VB.w} height={VB.h - 540} fill="#EDE3D0" />
                  {[80, 200, 325, 455, 585, 710, 840, 965, 1090].map((bx) => (
                    <g key={bx}>
                      <rect x={bx} y={552} width={24} height={19} fill="#C9A97A" stroke="#8B6840" strokeWidth={1} rx={1} />
                      <rect x={bx + 28} y={557} width={19} height={15} fill="#C9A97A" stroke="#8B6840" strokeWidth={1} rx={1} />
                    </g>
                  ))}
                  <text x={20} y={598} fill="#6B4823" fontSize={13} fontWeight="600">д. Иенево</text>

                  {/* ── Row labels ──────────────────────────────────────── */}
                  <text x={4} y={ROW1.y + ROW1.h / 2 + 5} fill="#1B3A5C" fontSize={11} fontWeight="600" transform={`rotate(-90, 4, ${ROW1.y + ROW1.h / 2})`} textAnchor="middle">
                    1-я линия
                  </text>
                  <text x={4} y={ROW2.y + ROW2.h / 2 + 5} fill="#1B3A5C" fontSize={11} fontWeight="600" transform={`rotate(-90, 4, ${ROW2.y + ROW2.h / 2})`} textAnchor="middle">
                    2-я линия
                  </text>

                  {/* Compass */}
                  <g transform={`translate(1145, 575)`}>
                    <circle r={22} fill="white" stroke="#E8E4DB" strokeWidth={1.5} />
                    <path d="M 0 -16 L 5 0 L 0 6 L -5 0 Z" fill="#1B3A5C" />
                    <path d="M 0 16 L 5 0 L 0 -6 L -5 0 Z" fill="#D5D8DC" />
                    <text y={-7} textAnchor="middle" fill="#1B3A5C" fontSize={9} fontWeight="700">С</text>
                  </g>

                  {/* Scale */}
                  <g transform="translate(40, 600)">
                    <line x1={0} y1={0} x2={60} y2={0} stroke="#1B3A5C" strokeWidth={2} />
                    <line x1={0} y1={-5} x2={0} y2={5} stroke="#1B3A5C" strokeWidth={1.5} />
                    <line x1={60} y1={-5} x2={60} y2={5} stroke="#1B3A5C" strokeWidth={1.5} />
                    <text x={30} y={-7} textAnchor="middle" fill="#1B3A5C" fontSize={9}>~50 м</text>
                  </g>

                  {/* ── Lots ──────────────────────────────────────────────── */}
                  {lots.map((lot) => {
                    const x = lotX(lot.line, lot.positionInLine);
                    const y = lotY(lot.line);
                    const h = lotH(lot.line);
                    const visible = isVisible(lot);
                    const isAvailable = lot.status === "available";
                    const isSelected = lot.id === selectedId;
                    const isHovered = lot.id === hoveredId;

                    if (!visible) return null;

                    const fillColor = isAvailable
                      ? isSelected
                        ? "#1B3A5C"
                        : isHovered
                        ? "#2A5080"
                        : "#FFFFFF"
                      : "#E8E4DB";

                    const strokeColor = isAvailable
                      ? isSelected || isHovered
                        ? "#1B3A5C"
                        : "#C19A52"
                      : "#BDB8AF";

                    return (
                      <g
                        key={lot.id}
                        role="button"
                        tabIndex={0}
                        aria-label={
                          isAvailable
                            ? `Лот ${lot.number} — свободен, 14 300 000 ₽`
                            : `Лот ${lot.number} — продан`
                        }
                        onClick={() => handleLotClick(lot)}
                        onMouseEnter={() => isAvailable && setHoveredId(lot.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") handleLotClick(lot);
                        }}
                        className="cursor-pointer focus:outline-none"
                        style={{ cursor: isAvailable ? "pointer" : "default" }}
                      >
                        {/* Pulse halo for available */}
                        {isAvailable && !isSelected && (
                          <rect
                            x={x - 3}
                            y={y - 3}
                            width={LOT.w + 6}
                            height={h + 6}
                            fill="none"
                            stroke="#C19A52"
                            strokeWidth={2}
                            opacity={0.4}
                            rx={2}
                          >
                            <animate
                              attributeName="opacity"
                              values="0.4;0.8;0.4"
                              dur="2s"
                              repeatCount="indefinite"
                            />
                          </rect>
                        )}

                        <rect
                          x={x}
                          y={y}
                          width={LOT.w}
                          height={h}
                          fill={fillColor}
                          stroke={strokeColor}
                          strokeWidth={isAvailable ? 2 : 1}
                          rx={1}
                        />

                        {/* Lot number */}
                        <text
                          x={x + LOT.w / 2}
                          y={y + h / 2 - (isAvailable ? 8 : 0)}
                          textAnchor="middle"
                          fill={
                            isAvailable
                              ? isSelected || isHovered
                                ? "white"
                                : "#1B3A5C"
                              : "#9CA3AF"
                          }
                          fontSize={isAvailable ? 14 : 12}
                          fontWeight={isAvailable ? "700" : "400"}
                        >
                          {lot.number}
                        </text>

                        {/* Price for available */}
                        {isAvailable && (
                          <text
                            x={x + LOT.w / 2}
                            y={y + h / 2 + 8}
                            textAnchor="middle"
                            fill="#C19A52"
                            fontSize={9}
                            fontWeight="600"
                          >
                            14,3 млн
                          </text>
                        )}

                        {/* Sold X */}
                        {lot.status === "sold" && (
                          <>
                            <line
                              x1={x + 6}
                              y1={y + 6}
                              x2={x + LOT.w - 6}
                              y2={y + h - 6}
                              stroke="#BDB8AF"
                              strokeWidth={1}
                              opacity={0.5}
                            />
                            <line
                              x1={x + LOT.w - 6}
                              y1={y + 6}
                              x2={x + 6}
                              y2={y + h - 6}
                              stroke="#BDB8AF"
                              strokeWidth={1}
                              opacity={0.5}
                            />
                          </>
                        )}
                      </g>
                    );
                  })}

                  {/* ── Tooltip on hover (available lots) ─────────────── */}
                  {hoveredLot && hoveredLot.status === "available" && (() => {
                    const x = lotX(hoveredLot.line, hoveredLot.positionInLine);
                    const y = lotY(hoveredLot.line);
                    const tipW = 130;
                    const tipH = 60;
                    const tipX = Math.min(x + LOT.w / 2 - tipW / 2, VB.w - tipW - 5);
                    const tipY = y - tipH - 8;
                    return (
                      <g pointerEvents="none">
                        <rect
                          x={tipX}
                          y={tipY}
                          width={tipW}
                          height={tipH}
                          fill="#1B3A5C"
                          rx={4}
                          opacity={0.95}
                        />
                        <text x={tipX + tipW / 2} y={tipY + 18} textAnchor="middle" fill="white" fontSize={12} fontWeight="700">
                          Дом № {hoveredLot.number}
                        </text>
                        <text x={tipX + tipW / 2} y={tipY + 33} textAnchor="middle" fill="#C19A52" fontSize={11} fontWeight="600">
                          14 300 000 ₽
                        </text>
                        {hoveredLot.distanceToPierM && (
                          <text x={tipX + tipW / 2} y={tipY + 48} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize={10}>
                            {hoveredLot.distanceToPierM} м до пирса
                          </text>
                        )}
                      </g>
                    );
                  })()}
                </svg>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-5 px-4 py-3 border-t border-border text-xs text-muted">
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 border-2 border-accent bg-white inline-block" />
                Свободен
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 border border-[#BDB8AF] bg-[#E8E4DB] inline-block" />
                Продан
              </div>
              <span className="ml-auto hidden sm:inline">Кликните по свободному дому</span>
            </div>
          </div>

          {/* Sidebar card */}
          <div className="xl:block">
            {selectedLot && selectedLot.status === "available" ? (
              <VillagePlotCard lot={selectedLot} onClose={() => setSelectedId(null)} />
            ) : (
              <div className="border border-border bg-warm p-6 text-center">
                <div className="text-4xl mb-3">
                  <svg className="w-12 h-12 mx-auto text-border" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <p className="text-primary font-semibold mb-2">Выберите дом</p>
                <p className="text-muted text-sm">
                  Нажмите на свободный лот, чтобы увидеть детали
                </p>
                <div className="mt-6 space-y-2">
                  {village.lots
                    .filter((l) => l.status === "available")
                    .map((l) => (
                      <button
                        key={l.id}
                        type="button"
                        onClick={() => setSelectedId(l.id)}
                        className="w-full text-left border border-border hover:border-accent p-3 transition-colors group"
                      >
                        <span className="font-semibold text-primary group-hover:text-accent text-sm transition-colors">
                          Дом № {l.number}
                        </span>
                        <span className="text-muted text-xs ml-2">{l.distanceToPierM} м до пирса</span>
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>

      {/* Sold modal */}
      {soldModal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={() => setSoldModal(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Дом продан"
        >
          <div
            className="bg-white max-w-sm w-full p-8 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <svg className="w-12 h-12 mx-auto mb-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-bold text-primary mb-2">Дом продан</h3>
            <p className="text-muted text-sm mb-6">
              Этот дом уже нашёл хозяина. Свободных ещё {available} — посмотрите их.
            </p>
            <button
              type="button"
              onClick={() => {
                setSoldModal(false);
                setFilter("available");
              }}
              className="w-full bg-accent text-white font-semibold py-3 text-sm hover:bg-accent-dark transition-colors"
            >
              Смотреть {available} свободных дома
            </button>
            <button
              type="button"
              onClick={() => setSoldModal(false)}
              className="mt-3 text-muted text-sm hover:text-primary transition-colors"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

// ─── Sidebar plot card ─────────────────────────────────────────────────────
function VillagePlotCard({ lot, onClose }: { lot: Lot; onClose: () => void }) {
  const { defaultLot } = village;

  return (
    <div className="border border-accent bg-white">
      {/* Header */}
      <div className="bg-primary text-white p-4 flex items-center justify-between">
        <div>
          <div className="font-bold text-lg">Дом № {lot.number}</div>
          <div className="text-accent text-xs font-semibold mt-0.5">
            СВОБОДЕН · 14 300 000 ₽
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-white/60 hover:text-white transition-colors"
          aria-label="Закрыть карточку"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Params */}
      <div className="p-4">
        <dl className="space-y-2 text-sm">
          {[
            { dt: "Площадь дома", dd: `${defaultLot.houseAreaM2} м²` },
            { dt: "Участок", dd: `${defaultLot.plotAreaSot} соток ИЖС` },
            { dt: "Линия", dd: `${lot.line}-я (у ${lot.line === 1 ? "воды" : "дороги"})` },
            {
              dt: "До пирса",
              dd: lot.distanceToPierM ? `${lot.distanceToPierM} м` : "~120 м",
            },
            { dt: "Спальни", dd: `${defaultLot.bedrooms}` },
            { dt: "Потолки", dd: `${defaultLot.ceilingHeightM} м` },
            { dt: "Гостиная", dd: `${defaultLot.livingRoomM2} м²` },
          ].map(({ dt, dd }) => (
            <div key={dt} className="flex justify-between gap-2">
              <dt className="text-muted">{dt}</dt>
              <dd className="font-semibold text-primary text-right">{dd}</dd>
            </div>
          ))}
        </dl>

        {/* Description excerpt */}
        {lot.description && (
          <p className="mt-4 text-muted text-xs leading-relaxed border-t border-border pt-3">
            {lot.description.split("\n\n")[0]}
          </p>
        )}

        {/* CTAs */}
        <div className="mt-5 space-y-2">
          <a
            href={`/volzhsky-bereg/lot/${lot.id}`}
            className="block w-full text-center bg-primary text-white font-semibold py-2.5 text-sm hover:bg-primary-dark transition-colors"
          >
            Подробнее о доме →
          </a>
          <a
            href="#contact"
            className="block w-full text-center border border-accent text-accent font-semibold py-2.5 text-sm hover:bg-accent hover:text-white transition-colors"
          >
            Записаться на просмотр
          </a>
        </div>
      </div>
    </div>
  );
}
