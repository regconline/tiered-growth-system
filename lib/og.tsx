import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

/** Branded 1200×630 social card used by every opengraph-image route. */
export function ogCard({ eyebrow, title, footer }: { eyebrow: string; title: string; footer?: string }) {
  const size = title.length > 70 ? 56 : title.length > 45 ? 64 : 74;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between",
          padding: "64px 72px", color: "#fff",
          background: "radial-gradient(ellipse 80% 80% at 80% 20%, #6a2490 0%, #3d0b5c 40%, #120a18 80%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#9b3fc4,#c4317a 55%,#f05060)" }}>
            <svg width="44" height="44" viewBox="0 0 40 40">
              <path d="M13.5 29.5V10.5h7.75a5.9 5.9 0 0 1 0 11.8H13.5M20.4 22.3l6.6 7.2" fill="none" stroke="#fff" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="29.2" cy="11.2" r="2.6" fill="#fff" />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: -1, display: "flex" }}>REGC <span style={{ color: "#ff86ab", marginLeft: 10 }}>Digital</span></div>
            <div style={{ fontSize: 16, letterSpacing: 4, opacity: 0.6, textTransform: "uppercase" }}>Healthcare Marketing</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 3, textTransform: "uppercase", color: "#ff9ab8" }}>{eyebrow}</div>
          <div style={{ display: "flex", fontSize: size, fontWeight: 800, lineHeight: 1.08, letterSpacing: -2, maxWidth: 1000 }}>{title}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 22, color: "rgba(255,255,255,0.65)" }}>
          <span>{footer ?? "regcdigital.co.za"}</span>
          <span style={{ display: "flex", height: 6, width: 220, borderRadius: 6, background: "linear-gradient(90deg,#c4317a,#9b3fc4)" }} />
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
