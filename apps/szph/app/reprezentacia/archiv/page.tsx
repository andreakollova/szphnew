import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Archiv vysledkov - Reprezentacia",
  description: "Archiv vysledkov slovenskych reprezentacii v pozemnom hokeji na medzinarodnych turnajoch.",
};

export default function ArchivPage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      {/* Hero */}
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span className="font-bold uppercase text-white/40 mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>
            Reprezentacia
          </span>
          <h1 className="font-garet font-bold italic text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Archiv vysledkov
          </h1>
          <p className="text-white/50 mt-3 max-w-xl" style={{ fontSize: "15px" }}>
            Historia vystupeni slovenskych reprezentacii na medzinarodnych turnajoch v pozemnom hokeji.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <h2 className="font-bold text-[#051937] mb-6" style={{ fontSize: "24px" }}>
          Medzinarodne turnaje
        </h2>
        <p className="text-[#334155] mb-8" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Slovenske reprezentacie sa pravidelne zucastnuju medzinarodnych turnajov organizovanych EuroHockey a Medzinarodnou hokejovou federaciou (FIH). Nizsie najdete prehlad hlavnych sutazi, v ktorych Slovensko posobilo.
        </p>

        <h3 className="font-bold text-[#051937] mt-8 mb-4" style={{ fontSize: "18px" }}>
          EuroHockey Championship
        </h3>
        <div className="space-y-4 mb-8">
          <div className="flex gap-3 items-start">
            <span className="text-[#051937]/30 font-bold shrink-0">-</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              Slovensko sa zucastnuje EuroHockey Championship v ramci divizneho systemu. Cielom je pravidelne sa zucastnovat a postupne zlepsovat zaradenie v divizi.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#051937]/30 font-bold shrink-0">-</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              Turnaje sa konaju v dvojrocnom cykle a hostia ich rozne europske krajiny.
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
              Mladeznicke reprezentacie do 21 rokov reprezentuju Slovensko na juniorskych europskych sampionatoch, ktore su dolezitou sucastou rozvoja mladych hracov.
            </p>
          </div>
        </div>

        <h3 className="font-bold text-[#051937] mt-8 mb-4" style={{ fontSize: "18px" }}>
          Dalsie sutaze
        </h3>
        <div className="space-y-4 mb-8">
          <div className="flex gap-3 items-start">
            <span className="text-[#051937]/30 font-bold shrink-0">-</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Indoor Hockey:</strong> Slovensko ma tiez zastupenie v halovom pozemnom hokeji, kde sa zucastnuje EuroHockey Indoor Championship.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#051937]/30 font-bold shrink-0">-</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Priatelske turnaje:</strong> Pocas celej historie sa slovenske timy zucastnovali mnozstva priatelskych turnajov a pozyvacich akcii po celej Europe.
            </p>
          </div>
        </div>

        <div className="rounded-2xl p-6" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
          <h3 className="font-bold text-[#051937] mb-2" style={{ fontSize: "15px" }}>Detailne vysledky</h3>
          <p className="text-[#334155]" style={{ fontSize: "14px", lineHeight: 1.8 }}>
            Detailne vysledky z jednotlivych turnajov budu postupne dopinane. Pre aktualne informacie o medzinarodnych sutaziach sledujte sekciu{" "}
            <Link href="/novinky" className="text-[#012d74] underline hover:no-underline">
              Novinky
            </Link>.
          </p>
        </div>

        <div className="mt-6">
          <Link href="/reprezentacia" className="text-[#012d74] hover:underline" style={{ fontSize: "14px" }}>
            &#8592; Spat na prehlad reprezentacii
          </Link>
        </div>
      </div>
    </article>
  );
}
