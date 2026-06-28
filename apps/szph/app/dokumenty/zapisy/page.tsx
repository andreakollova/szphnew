import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zápisy",
  description: "Zápisy zo stretnutí v pozemnom a halovom hokeji — formuláre na stiahnutie.",
};

const DOCS = [
  { name: "Zápis zo stretnutia v pozemnom hokeji", file: "/files/1.-SLOVENSKY-ZVAZ-POZMENEHO-HOKEJA.pdf" },
  { name: "Zápis zo stretnutia v halovom hokeji", file: "/files/2.-HALA-SLOVENSKY-ZVAZ-POZMENEHO-HOKEJA.pdf" },
  { name: "Zápis zo stretnutia v pozemnom hokeji U10 a U8", file: "/files/4.-ZAPIS-ZO-STRETNUTIA-PH-U10.pdf" },
  { name: "Zápis zo stretnutia v halovom hokeji U10 a U8", file: "/files/3.-ZAPIS-ZO-STRETNUTIA-HH-U10.pdf" },
  { name: "Súpiska zo stretnutia v pozemnom a halovom hokeji U10 a U8", file: "/files/5.-Supiska-U10.pdf" },
];

export default function ZapisyPage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span className="font-bold uppercase text-white/40 mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>Dokumenty</span>
          <h1 className="font-bold text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Zápisy</h1>
        </div>
      </div>
      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <div className="space-y-3">
          {DOCS.map((doc) => (
            <a key={doc.name} href={doc.file} download className="flex items-center gap-4 rounded-2xl p-5 transition-all hover:shadow-md" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
              <span className="text-[#1d4ed8] font-bold shrink-0" style={{ fontSize: "18px" }}>↓</span>
              <span className="font-semibold text-[#051937]" style={{ fontSize: "15px" }}>{doc.name}</span>
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
