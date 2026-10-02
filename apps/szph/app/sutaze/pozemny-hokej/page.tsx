import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pozemný hokej - Súťaže - Slovenský pozemnohokejový zväz",
  description: "Prehľad outdoorovej sezóny pozemného hokeja na Slovensku. Informácie o formáte, pravidlách a priebehu pozemnej sezóny.",
};

export default function PozemnyHokejSutazPage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      {/* Hero */}
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span className="font-bold uppercase text-white mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>
            Súťaže
          </span>
          <h1 className="font-garet font-bold italic text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Pozemný hokej
          </h1>
          <p className="text-white mt-3 max-w-xl" style={{ fontSize: "15px" }}>
            Outdoorová sezóna na umelej tráve - hlavná disciplína pozemného hokeja.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <p className="text-[#334155] mb-8" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Pozemný (outdoor) hokej je základná a najrozšírenejšia forma tohto športu. Hrá sa na ihriskách s umelou trávou v jarných a jesenných mesiacoch. Na Slovensku prebieha pozemná sezóna typicky od marca do novembra, pričom sa hrá v dvoch častiach - jarná a jesenná časť.
        </p>

        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Parametre hry
        </h2>
        <div className="space-y-4 mb-8">
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10148;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Ihrisko:</strong> Umelá tráva s rozmermi 91,4 x 55 metrov, podľa medzinárodných štandardov FIH.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10148;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Počet hráčov:</strong> 11 na 11 (vrátane brankára) pre seniorské kategórie. Mládežnícke kategórie hrajú na menších ihriskách s menším počtom hráčov.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10148;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Čas zápasu:</strong> 4 x 15 minút s prestávkami. Po 1. a 3. štvrtine 2-minútová prestávka, v polčase 5-minútová prestávka.
            </p>
          </div>
        </div>

        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Súťaže v pozemnej sezóne
        </h2>
        <p className="text-[#334155] mb-6" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Počas pozemnej sezóny sa hrajú ligové súťaže pre všetky kategórie: Extraliga mužov, Extraliga žien a mládežnícke ligy (U18, U14, U12). Okrem ligových zápasov sa konajú aj poháre a turnaje. Víťazi pozemnej sezóny získavajú titul Majstra Slovenska v pozemnom hokeji.
        </p>

        <div className="rounded-lg p-6 mb-8" style={{ background: "#051937" }}>
          <h3 className="font-bold text-white mb-3" style={{ fontSize: "16px" }}>Medzinárodný kontext</h3>
          <p className="text-white" style={{ fontSize: "14px", lineHeight: 1.8 }}>
            Pozemný hokej je olympijský šport. Na medzinárodnej úrovni ho riadi FIH (Medzinárodná hokejová federácia). Slovensko sa zúčastňuje európskych kvalifikácií a turnajov organizovaných EHF (Európska hokejová federácia).
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
