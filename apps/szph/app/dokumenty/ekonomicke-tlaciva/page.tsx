import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ekonomické tlačivá",
  description: "Ekonomické tlačivá SZPH — prezenčná listina, zmluva o sponzorstve, cestovný príkaz a ďalšie.",
};

const DOCS = [
  { name: "Prezenčná listina", file: "/files/1.-SZPH-Prezencna-listina_cista.doc" },
  { name: "Zmluva o sponzorstve v športe", file: "/files/2.-SZPH-zmluva-o-sponzorstve-v-sporte.docx" },
  { name: "Vyúčtovanie preddavku tlačivo", file: "/files/3.-SZPH-vyuctovanie-preddavku_tlacivo2015.xls" },
  { name: "Cestovný príkaz od 07.02.2024", file: "/files/4.-SZPH-Cestovny-prikaz_-od-07.02.2024-.xls" },
  { name: "Hromadné vyúčtovanie cestovných lístkov", file: "/files/5.-SZPH-Hromadne-vyuctovanie-cestovnych-listkov.xls" },
];

export default function EkonomickeTlacivaPage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span className="font-bold uppercase text-white/40 mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>Dokumenty</span>
          <h1 className="font-bold text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Ekonomické tlačivá</h1>
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
