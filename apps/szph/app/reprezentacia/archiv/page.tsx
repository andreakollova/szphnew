import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Archív výsledkov - Reprezentácia",
  description: "Archív výsledkov slovenských reprezentácií v pozemnom hokeji na medzinárodných turnajoch.",
};

export default function ArchivPage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      {/* Hero */}
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span className="font-bold uppercase text-white mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>
            Reprezentácia
          </span>
          <h1 className="font-garet font-bold italic text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Archív výsledkov
          </h1>
          <p className="text-white mt-3 max-w-xl" style={{ fontSize: "15px" }}>
            História vystúpení slovenských reprezentácií na medzinárodných turnajoch v pozemnom hokeji.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <h2 className="font-bold text-[#051937] mb-6" style={{ fontSize: "24px" }}>
          Medzinárodné turnaje
        </h2>
        <p className="text-[#334155] mb-8" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Slovenské reprezentácie sa pravidelne zúčastňujú medzinárodných turnajov organizovaných EuroHockey a Medzinárodnou hokejovou federáciou (FIH). Nižšie nájdete prehľad hlavných súťaží, v ktorých Slovensko pôsobilo.
        </p>

        <h3 className="font-bold text-[#051937] mt-8 mb-4" style={{ fontSize: "18px" }}>
          EuroHockey Championship
        </h3>
        <div className="space-y-4 mb-8">
          <div className="flex gap-3 items-start">
            <span className="text-[#051937]/30 font-bold shrink-0">-</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              Slovensko sa zúčastňuje EuroHockey Championship v rámci divízneho systému. Cieľom je pravidelne sa zúčastňovať a postupne zlepšovať zaradenie v divízii.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#051937]/30 font-bold shrink-0">-</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              Turnaje sa konajú v dvojročnom cykle a hostia ich rôzne európske krajiny.
            </p>
          </div>
        </div>

        <h3 className="font-bold text-[#051937] mt-8 mb-4" style={{ fontSize: "18px" }}>
          EuroHockey Junior Championship
        </h3>
        <div className="space-y-4 mb-8">
          <div className="flex gap-3 items-start">
            <span className="text-[#051937]/30 font-bold shrink-0">-</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              Mládežnícke reprezentácie do 21 rokov reprezentujú Slovensko na juniorských európskych šampionátoch, ktoré sú dôležitou súčasťou rozvoja mladých hráčov.
            </p>
          </div>
        </div>

        <h3 className="font-bold text-[#051937] mt-8 mb-4" style={{ fontSize: "18px" }}>
          Ďalšie súťaže
        </h3>
        <div className="space-y-4 mb-8">
          <div className="flex gap-3 items-start">
            <span className="text-[#051937]/30 font-bold shrink-0">-</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Indoor Hockey:</strong> Slovensko má tiež zastúpenie v halovom pozemnom hokeji, kde sa zúčastňuje EuroHockey Indoor Championship.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#051937]/30 font-bold shrink-0">-</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Priateľské turnaje:</strong> Počas celej histórie sa slovenské tímy zúčastňovali množstva priateľských turnajov a pozývacích akcií po celej Európe.
            </p>
          </div>
        </div>

        <div className="rounded-lg p-6" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
          <h3 className="font-bold text-[#051937] mb-2" style={{ fontSize: "15px" }}>Detailné výsledky</h3>
          <p className="text-[#334155]" style={{ fontSize: "14px", lineHeight: 1.8 }}>
            Detailné výsledky z jednotlivých turnajov budú postupne dopĺňané. Pre aktuálne informácie o medzinárodných súťažiach sledujte sekciu{" "}
            <Link href="/novinky" className="text-[#012d74] underline hover:no-underline">
              Novinky
            </Link>.
          </p>
        </div>

        <div className="mt-6">
          <Link href="/reprezentacia" className="text-[#012d74] hover:underline" style={{ fontSize: "14px" }}>
            &#8592; Späť na prehľad reprezentácií
          </Link>
        </div>
      </div>
    </article>
  );
}
