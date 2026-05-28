import { ImageResponse } from "next/og";
import { getLotCounters } from "@/data/villages";

export const alt = "Волжский Берег — готовые дома у Волги";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const { available } = getLotCounters();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "linear-gradient(135deg, #1B3A5C 0%, #0F2540 100%)",
          padding: "60px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top badge */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: 48,
            left: 60,
            background: "rgba(193,154,82,0.2)",
            border: "1px solid rgba(193,154,82,0.4)",
            color: "#C19A52",
            fontSize: 18,
            fontWeight: 600,
            padding: "8px 20px",
          }}
        >
          СДАН 2023 · {available} ДОМА В ПРОДАЖЕ
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 72,
            fontWeight: 800,
            color: "white",
            lineHeight: 1.1,
            marginBottom: 20,
          }}
        >
          <span>Волжский</span>
          <span style={{ color: "#C19A52" }}>Берег</span>
        </div>

        {/* Subtitle */}
        <div style={{ fontSize: 28, color: "rgba(255,255,255,0.75)", marginBottom: 32 }}>
          8 км от Твери · правый берег Волги
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 40 }}>
          {[
            { v: "138 м²", l: "площадь дома" },
            { v: "11 соток", l: "участок ИЖС" },
            { v: "14,3 млн ₽", l: "от" },
          ].map((s) => (
            <div key={s.v} style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 32, fontWeight: 700, color: "#C19A52" }}>{s.v}</span>
              <span style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", marginTop: 2 }}>
                {s.l}
              </span>
            </div>
          ))}
        </div>

        {/* Brand */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            right: 60,
            fontSize: 18,
            color: "rgba(255,255,255,0.4)",
          }}
        >
          present-stroy.ru
        </div>
      </div>
    ),
    { ...size }
  );
}
