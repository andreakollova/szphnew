import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Výsledky hospodárenia",
  description: "Dokumenty o výsledkoch hospodárenia SZPH.",
};

export default function HospodareniePage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      {/* Hero */}
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span className="font-bold uppercase text-white/40 mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>
            O SZPH
          </span>
          <h1 className="font-bold text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Výsledky hospodárenia
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <p className="text-[#334155] mb-6" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Aktuálne dokumenty nájdete na stránke:
        </p>
        <a
          href="https://sport.iedu.sk/Company/Company/10896"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-semibold text-white rounded-full px-6 py-3 transition-opacity hover:opacity-80"
          style={{ background: "#1d4ed8", fontSize: "14px" }}
        >
          sport.iedu.sk
        </a>
      </div>
    </article>
  );
}
