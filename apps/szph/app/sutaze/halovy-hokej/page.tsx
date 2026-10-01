import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Halovy hokej - Sutaze - Slovensky pozemnohokejovy zvaz",
  description: "Prehlad halovej sezony poznemneho hokeja na Slovensku. Informacie o formate, pravidlach a priebehu halovej sezony.",
};

export default function HalovyHokejPage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      {/* Hero */}
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span className="font-bold uppercase text-white/40 mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>
            Sutaze
          </span>
          <h1 className="font-garet font-bold italic text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Halovy hokej
          </h1>
          <p className="text-white/50 mt-3 max-w-xl" style={{ fontSize: "15px" }}>
            Zimna halova sezona - rychla a technicka forma poznemneho hokeja.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <p className="text-[#334155] mb-8" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Halovy hokej je indoor forma poznemneho hokeja, ktora sa hra v sportovych halach pocas zimnych mesiacov. Na Slovensku prebieha halova sezona typicky od decembra do marca. Halovy hokej sa vyznacuje rychlym tempom, technickou narocnostou a odlisnymi pravidlami oproti pozemnej forme.
        </p>

        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Hlavne rozdiely oproti pozemnemu hokeju
        </h2>
        <div className="space-y-4 mb-8">
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10148;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Pocet hracov:</strong> 6 na 6 (5 hracov v poli a brankar) namiesto 11 na 11 v pozemnej forme.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10148;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Hracia plocha:</strong> Mensia plocha v sportovej hale (40 x 20 metrov) s postranymi mantinelmi (bordami), od ktorych sa loptička odraza.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10148;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Pravidla:</strong> Lopta sa nesmie zdvihat zo zeme (okrem strely v kruhu). Hra je zalozena na pushoch a technickom ovladani lopty po podlahe.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10148;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Cas zapasu:</strong> 2 x 20 minut s polcasovou prestavkou.
            </p>
          </div>
        </div>

        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Halove sutaze na Slovensku
        </h2>
        <p className="text-[#334155] mb-6" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Slovensky pozemnohokejovy zvaz organizuje halovu ligu pre muzov aj zeny. Halova sezona je samostatna sutaz s vlastnym systremom bodovnia a tabulkami. Vitazi halovej sezony ziskavaju titul Majstra Slovenska v halovom hokeji.
        </p>

        <div className="rounded-2xl p-6 mb-8" style={{ background: "#051937" }}>
          <h3 className="font-bold text-white mb-3" style={{ fontSize: "16px" }}>Medzinarodne halove sutaze</h3>
          <p className="text-white/70" style={{ fontSize: "14px", lineHeight: 1.8 }}>
            Halovy hokej ma vlastne medzinarodne sutaze vratane Majstrovstiev Europy a Svetoveho pohara v halovom hokeji. Slovensko sa zucastnuje europskych kvalifikacii a turnajov pod hlavickou EHF.
          </p>
        </div>

        {/* Link to results */}
        <div className="mt-12 flex gap-6">
          <Link href="/zapasy" className="inline-flex items-center gap-2 font-bold text-[#012d74] hover:underline" style={{ fontSize: "15px" }}>
            Vysledky a tabulky
            <span>&#8594;</span>
          </Link>
          <Link href="/sutaze" className="inline-flex items-center gap-2 font-bold text-[#334155] hover:underline" style={{ fontSize: "15px" }}>
            Vsetky sutaze
          </Link>
        </div>
      </div>
    </article>
  );
}
