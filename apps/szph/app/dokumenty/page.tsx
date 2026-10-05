import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dokumenty",
  description: "Dokumenty a tlačivá SZPH.",
};

const ALL_DOCS = [
  {
    category: "Registrácia",
    docs: [
      { name: "Prihláška k evidencii", file: "/files/1.-SLOVENSKY-ZVAZ-POZMENEHO-HOKEJA.pdf" },
      { name: "Hosťovací lístok", file: "/files/6.-Hostovaci-listok-1-12.pdf" },
      { name: "Prestupový lístok", file: "/files/Prestupovy-listok-SZPH (1).pdf" },
    ],
  },
  {
    category: "Ekonomické tlačivá",
    docs: [
      { name: "Prezenčná listina", file: "/files/1.-SZPH-Prezencna-listina_cista.doc" },
      { name: "Zmluva o sponzorstve v športe", file: "/files/2.-SZPH-zmluva-o-sponzorstve-v-sporte.docx" },
      { name: "Vyúčtovanie preddavku tlačivo", file: "/files/3.-SZPH-vyuctovanie-preddavku_tlacivo2015.xls" },
      { name: "Cestovný príkaz od 07.02.2024", file: "/files/4.-SZPH-Cestovny-prikaz_-od-07.02.2024-.xls" },
      { name: "Hromadné vyúčtovanie cestovných lístkov", file: "/files/5.-SZPH-Hromadne-vyuctovanie-cestovnych-listkov.xls" },
    ],
  },
  {
    category: "Zápisy zo stretnutí",
    docs: [
      { name: "Zápis zo stretnutia v pozemnom hokeji", file: "/files/1.-SLOVENSKY-ZVAZ-POZMENEHO-HOKEJA.pdf" },
      { name: "Zápis zo stretnutia v halovom hokeji", file: "/files/2.-HALA-SLOVENSKY-ZVAZ-POZMENEHO-HOKEJA.pdf" },
      { name: "Zápis zo stretnutia v pozemnom hokeji U10 a U8", file: "/files/4.-ZAPIS-ZO-STRETNUTIA-PH-U10.pdf" },
      { name: "Zápis zo stretnutia v halovom hokeji U10 a U8", file: "/files/3.-ZAPIS-ZO-STRETNUTIA-HH-U10.pdf" },
      { name: "Súpiska zo stretnutia v pozemnom a halovom hokeji U10 a U8", file: "/files/5.-Supiska-U10.pdf" },
    ],
  },
];

export default function DokumentyPage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[1100px] mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-white hover:text-white transition-colors mb-6" style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}><svg className="h-3 w-3 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>Späť</Link>
          <h1 className="font-garet font-bold italic text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Dokumenty a tlačivá
          </h1>
          <p className="text-white mt-3 max-w-xl" style={{ fontSize: "15px" }}>
            Všetky dokumenty, formuláre a tlačivá SZPH na jednom mieste.
          </p>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 pt-12">
        {ALL_DOCS.map((section) => (
          <section key={section.category} className="mb-10">
            <h2 className="font-bold text-[#051937] mb-4" style={{ fontSize: "20px" }}>{section.category}</h2>
            <div className="space-y-2">
              {section.docs.map((doc) => (
                <a key={doc.name} href={doc.file} download className="flex items-center gap-4 rounded-lg p-4 transition-all hover:shadow-md" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
                  <span className="text-[#0078fe] font-bold shrink-0" style={{ fontSize: "18px" }}>↓</span>
                  <span className="font-semibold text-[#051937]" style={{ fontSize: "14px" }}>{doc.name}</span>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
