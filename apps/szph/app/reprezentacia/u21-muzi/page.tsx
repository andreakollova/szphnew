import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "U21 Muzi - Reprezentacia",
  description: "Mladeznicka muzska reprezentacia Slovenska do 21 rokov v pozemnom hokeji.",
};

export default function U21MuziPage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      {/* Hero */}
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span className="font-bold uppercase text-white/40 mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>
            Reprezentacia
          </span>
          <h1 className="font-garet font-bold italic text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            U21 Muzi
          </h1>
          <p className="text-white/50 mt-3 max-w-xl" style={{ fontSize: "15px" }}>
            Mladeznicka muzska reprezentacia Slovenska do 21 rokov v pozemnom hokeji.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <h2 className="font-bold text-[#051937] mb-6" style={{ fontSize: "24px" }}>
          O time
        </h2>
        <p className="text-[#334155] mb-8" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Mladeznicka reprezentacia muzov do 21 rokov je klucovym clankom v systeme rozvoja slovenskeho pozemneho hokeja. Tim zdruzuje najtalentovanejsich mladych hracov, ktori sa pripravuju na prechod do seniorskej reprezentacie. Hraci ziskavaju cenene medzinarodne skusenosti na turnajoch EuroHockey Junior Championship.
        </p>

        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Sutaze a turnaje
        </h2>
        <div className="space-y-4 mb-8">
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10140;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>EuroHockey Junior Championship:</strong> Hlavna europska sutaz mladeznicke kategorie, kde sa stretavaju najlepsie juniorske timy kontinentu. Slovensko sa snazi pravidelne zucastnovat a zlepsovat svoju poziciu.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10140;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Pripravne turnaje a kempove:</strong> Okrem oficialnych sutazi sa tim zucastnuje pripravenych turnajov a susterovani, ktore su dolezite pre budovanie timovej chemia a zlepsovanie hernych navykov.
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-2xl p-6" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
          <h3 className="font-bold text-[#051937] mb-2" style={{ fontSize: "15px" }}>Vyznam mladeznickej reprezentacie</h3>
          <p className="text-[#334155]" style={{ fontSize: "14px", lineHeight: 1.8 }}>
            Mladeznicka reprezentacia je zakladom buducnosti slovenskeho pozemneho hokeja. Hraci, ktori prejdu touto kategorieou, ziskavaju skusenosti, ktore ich pripravia na posobenie v seniorskom narodnom time.
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
