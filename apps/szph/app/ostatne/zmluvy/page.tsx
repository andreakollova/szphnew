import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zmluvy",
  description: "Zmluvy MŠ — príspevky uznanému športu, dodatky a osvedčenia.",
};

const DOCS = [
  { name: "Zmluva MŠ 2021 — príspevok uznanému športu" },
  { name: "Zmluva MŠ 2020 — príspevok uznanému športu" },
  { name: "Dodatok zmluvy MŠ 2019" },
  { name: "Osvedčenie — príspevok uznanému športu" },
  { name: "Zmluva MŠ 2019 — príspevok uznanému športu" },
  { name: "Zmluva MŠ 2018 — príspevok uznanému športu" },
  { name: "Zmluva MŠ 2017 — príspevok uznanému športu" },
];

export default function ZmluvyPage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span className="font-bold uppercase text-white/40 mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>Ostatné</span>
          <h1 className="font-bold text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Zmluvy</h1>
        </div>
      </div>
      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <div className="space-y-3">
          {DOCS.map((doc) => (
            <div key={doc.name} className="flex items-center gap-4 rounded-2xl p-5" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
              <span className="text-[#94a3b8] font-bold shrink-0" style={{ fontSize: "18px" }}>↓</span>
              <span className="font-semibold text-[#051937]" style={{ fontSize: "15px" }}>{doc.name}</span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
