import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Halový hokej - Súťaže - Slovenský pozemnohokejový zväz",
  description: "Prehľad halovej sezóny pozemného hokeja na Slovensku. Informácie o formáte, pravidlách a priebehu halovej sezóny.",
};

export default function HalovyHokejPage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      {/* Hero */}
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span className="font-bold uppercase text-white mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>
            Súťaže
          </span>
          <h1 className="font-garet font-bold italic text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Halový hokej
          </h1>
          <p className="text-white mt-3 max-w-xl" style={{ fontSize: "15px" }}>
            Zimná halová sezóna - rýchla a technická forma pozemného hokeja.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <p className="text-[#334155] mb-8" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Halový hokej je indoor forma pozemného hokeja, ktorá sa hrá v športových halách počas zimných mesiacov. Na Slovensku prebieha halová sezóna typicky od decembra do marca. Halový hokej sa vyznačuje rýchlym tempom, technickou náročnosťou a odlišnými pravidlami oproti pozemnej forme.
        </p>

        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Hlavné rozdiely oproti pozemnému hokeju
        </h2>
        <div className="space-y-4 mb-8">
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10148;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Počet hráčov:</strong> 6 na 6 (5 hráčov v poli a brankár) namiesto 11 na 11 v pozemnej forme.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10148;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Hracia plocha:</strong> Menšia plocha v športovej hale (40 x 20 metrov) s postrannými mantinelmi (bordami), od ktorých sa loptička odráža.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10148;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Pravidlá:</strong> Lopta sa nesmie zdvíhať zo zeme (okrem strely v kruhu). Hra je založená na pushoch a technickom ovládaní lopty po podlahe.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10148;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Čas zápasu:</strong> 2 x 20 minút s polčasovou prestávkou.
            </p>
          </div>
        </div>

        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Halové súťaže na Slovensku
        </h2>
        <p className="text-[#334155] mb-6" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Slovenský pozemnohokejový zväz organizuje halovú ligu pre mužov aj ženy. Halová sezóna je samostatná súťaž s vlastným systémom bodovania a tabuľkami. Víťazi halovej sezóny získavajú titul Majstra Slovenska v halovom hokeji.
        </p>

        <div className="rounded-lg p-6 mb-8" style={{ background: "#051937" }}>
          <h3 className="font-bold text-white mb-3" style={{ fontSize: "16px" }}>Medzinárodné halové súťaže</h3>
          <p className="text-white" style={{ fontSize: "14px", lineHeight: 1.8 }}>
            Halový hokej má vlastné medzinárodné súťaže vrátane Majstrovstiev Európy a Svetového pohára v halovom hokeji. Slovensko sa zúčastňuje európskych kvalifikácií a turnajov pod hlavičkou EHF.
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
