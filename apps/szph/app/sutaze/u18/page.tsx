import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "U18 - Mládežnícke súťaže - Slovenský pozemnohokejový zväz",
  description: "Mládežnícka kategória U18 v pozemnom hokeji na Slovensku. Informácie o súťažiach hráčov do 18 rokov.",
};

export default function U18Page() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      {/* Hero */}
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span className="font-bold uppercase text-white mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>
            Súťaže
          </span>
          <h1 className="font-garet font-bold italic text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            U18
          </h1>
          <p className="text-white mt-3 max-w-xl" style={{ fontSize: "15px" }}>
            Mládežnícka kategória hráčov do 18 rokov.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <p className="text-[#334155] mb-8" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Kategória U18 je najvyššia mládežnícka veková skupina v slovenskom pozemnom hokeji. Združuje hráčov a hráčky do 18 rokov a slúži ako kľúčový medzistupeň medzi mládežou a seniorským hokejom. V tejto kategórii sa hráči pripravujú na prechod do dospelých súťaží a mnohým z nich sa už paralelne darí nastupovať aj v Extralige.
        </p>

        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Formát súťaže
        </h2>
        <div className="space-y-4 mb-8">
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10148;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Pozemná sezóna:</strong> Zápasy sa hrajú na ihriskách s umelou trávou v plnom formáte 11 na 11, rovnako ako v seniorských kategóriách.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10148;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Halová sezóna:</strong> V zimných mesiacoch sa hrá halový hokej vo formáte 6 na 6 v športových halách.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10148;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Turnajový systém:</strong> Súťaž prebieha formou ligového formátu alebo turnajových kôl v závislosti od počtu prihlásených tímov.
            </p>
          </div>
        </div>

        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Rozvoj a reprezentácia
        </h2>
        <p className="text-[#334155] mb-8" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Kategória U18 je dôležitá pre rozvoj talentov a budovanie základu pre slovenskú reprezentáciu. Najlepší hráči z tejto kategórie sú nominovaní do mládežníckeho národného tímu, ktorý sa zúčastňuje medzinárodných turnajov a kvalifikácií organizovaných EHF. Úspešný prechod z U18 do seniorských súťaží je jedným z hlavných cieľov systému mládežníckeho hokeja na Slovensku.
        </p>

        <div className="rounded-2xl p-6 mb-8" style={{ background: "#051937" }}>
          <h3 className="font-bold text-white mb-3" style={{ fontSize: "16px" }}>Pre kluby a trénerov</h3>
          <p className="text-white" style={{ fontSize: "14px", lineHeight: 1.8 }}>
            Prihlasovanie tímov do mládežníckych súťaží prebieha prostredníctvom Slovenského pozemnohokejového zväzu. Aktuálne informácie o termínoch, rozpise zápasov a pravidlách nájdete v sekcii dokumentov alebo kontaktujte priamo SZPH.
          </p>
        </div>

        {/* Link to results */}
        <div className="mt-12 flex gap-6">
          <Link href="/zapasy" className="inline-flex items-center gap-2 font-bold text-[#012d74] hover:underline" style={{ fontSize: "15px" }}>
            Výsledky a tabuľky
            <span>&#8594;</span>
          </Link>
          <Link href="/sutaze" className="inline-flex items-center gap-2 font-bold text-[#334155] hover:underline" style={{ fontSize: "15px" }}>
            Všetky súťaže
          </Link>
        </div>
      </div>
    </article>
  );
}
