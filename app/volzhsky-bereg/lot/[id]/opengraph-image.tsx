import { ImageResponse } from "next/og";
import { getLotById, village } from "@/data/villages";

export const alt = "Волжский Берег — дом в продаже";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ id: string }> };

export default async function Image({ params }: Props) {
  const { id } = await params;
  const lot = getLotById(id);
  const { defaultLot } = village;

  const isSold = lot?.status === "sold";
  const price = new Intl.NumberFormat("ru-RU").format(defaultLot.priceRub);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: isSold
            ? "linear-gradient(135deg, #4A5568 0%, #2D3748 100%)"
            : "linear-gradient(135deg, #1B3A5C 0%, #0F2540 100%)",
          padding: "60px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Status badge */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: 48,
            left: 60,
            background: isSold ? "rgba(255,255,255,0.1)" : "rgba(193,154,82,0.2)",
            border: `1px solid ${isSold ? "rgba(255,255,255,0.3)" : "rgba(193,154,82,0.4)"}`,
            color: isSold ? "rgba(255,255,255,0.6)" : "#C19A52",
            fontSize: 18,
            fontWeight: 600,
            padding: "8px 20px",
          }}
        >
          {isSold ? "ПРОДАН" : "СВОБОДЕН"}
        </div>

        {/* Village name */}
        <div style={{ fontSize: 22, color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>
          Волжский Берег
        </div>

        {/* Lot title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "white",
            lineHeight: 1.1,
            marginBottom: 20,
          }}
        >
          Дом №{" "}
          <span style={{ color: isSold ? "rgba(255,255,255,0.6)" : "#C19A52" }}>
            {lot?.number ?? id}
          </span>
        </div>

        {/* Lot details */}
        {!isSold && (
          <div style={{ display: "flex", gap: 48 }}>
            {[
              { v: `${defaultLot.houseAreaM2} м²`, l: "площадь" },
              { v: `${defaultLot.plotAreaSot} соток`, l: "участок ИЖС" },
              { v: `${price} ₽`, l: "цена" },
            ].map((s) => (
              <div key={s.v} style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: 28, fontWeight: 700, color: "#C19A52" }}>{s.v}</span>
                <span style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>
                  {s.l}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Brand */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            right: 60,
            fontSize: 18,
            color: "rgba(255,255,255,0.35)",
          }}
        >
          present-stroy.ru
        </div>
      </div>
    ),
    { ...size }
  );
}
