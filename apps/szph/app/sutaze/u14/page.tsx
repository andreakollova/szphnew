import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "U14 - Mládežnícke súťaže - Slovenský pozemnohokejový zväz",
  description: "Mládežnícka kategória U14 v pozemnom hokeji na Slovensku. Informácie o súťažiach hráčov do 14 rokov.",
};

export default function U14Page() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      {/* Hero */}
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span className="font-bold uppercase text-white mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>
            Súťaže
          </span>
          <h1 className="font-garet font-bold italic text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            U14
          </h1>
          <p className="text-white mt-3 max-w-xl" style={{ fontSize: "15px" }}>
            Mládežnícka kategória hráčov do 14 rokov.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <p className="text-[#334155] mb-8" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Kategória U14 je stredná mládežnícka veková skupina v slovenskom pozemnom hokeji. Združuje hráčov a hráčky do 14 rokov a predstavuje dôležitý stupeň vo vývoji mladých hokejistov. V tomto veku sa hráči už učia pokročilejšie taktiky a pripravujú sa na prechod do vyšších mládežníckych kategórií.
        </p>

        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Formát súťaže
        </h2>
        <div className="space-y-4 mb-8">
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10148;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Sezóna - pozemný hokej:</strong> Zápasy sa hrajú na menších ihriskách v upravenom formáte, typicky 7 na 7 alebo 8 na 8. Rozmery ihriska a čas zápasu sú prispôsobené veku hráčov.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10148;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Sezóna - halový hokej:</strong> V zimných mesiacoch sa hrá halový hokej vo formáte prispôsobenom tejto vekovej kategórii.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10148;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Turnaje:</strong> Súťaže prebiehajú často formou turnajových kôl, kde sa v priebehu jedného víkendového dňa odohrá viacero zápasov.
            </p>
          </div>
        </div>

        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Rozvoj hráčov
        </h2>
        <p className="text-[#334155] mb-8" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          V kategórii U14 sa kladie dôraz na rozvoj individuálnych zručností, tímovú hru a základy taktiky. Tréning je zameraný na zlepšovanie techniky ovládania lopty, prihrávok, strieľania a pohybu na ihrisku. Cieľom je pripraviť hráčov na plnoformátovú hru v kategórii U18.
        </p>

        <div className="rounded-lg p-6 mb-8" style={{ background: "#051937" }}>
          <h3 className="font-bold text-white mb-3" style={{ fontSize: "16px" }}>Zapojte sa</h3>
          <p className="text-white" style={{ fontSize: "14px", lineHeight: 1.8 }}>
            Ak máte záujem o zaradenie vášho dieťaťa do mládežníckeho pozemného hokeja, kontaktujte priamo kluby v blízkom okolí alebo Slovenský pozemnohokejový zväz. Pozemný hokej je vhodný pre chlapcov aj dievčatá od útleho veku.
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
