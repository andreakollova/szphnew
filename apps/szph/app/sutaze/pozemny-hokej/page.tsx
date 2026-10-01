import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pozemny hokej - Sutaze - Slovensky pozemnohokejovy zvaz",
  description: "Prehlad outdoorovej sezony poznemneho hokeja na Slovensku. Informacie o formate, pravidlach a priebehu pozemnej sezony.",
};

export default function PozemnyHokejSutazPage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      {/* Hero */}
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span className="font-bold uppercase text-white/40 mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>
            Sutaze
          </span>
          <h1 className="font-garet font-bold italic text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Pozemny hokej
          </h1>
          <p className="text-white/50 mt-3 max-w-xl" style={{ fontSize: "15px" }}>
            Outdoorova sezona na umelej trave - hlavna disciplina poznemneho hokeja.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <p className="text-[#334155] mb-8" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Pozemny (outdoor) hokej je zakladna a najrozsirenejsia forma tohto sportu. Hra sa na ihriskach s umelou travou v jarnych a jesennych mesiacoch. Na Slovensku prebieha pozemna sezona typicky od marca do novembra, pricom sa hra v dvoch castich - jarna a jesenna cast.
        </p>

        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Parametre hry
        </h2>
        <div className="space-y-4 mb-8">
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10148;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Ihrisko:</strong> Umela trava s rozmermi 91,4 x 55 metrov, podla medzinarodnych standardov FIH.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10148;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Pocet hracov:</strong> 11 na 11 (vratane brankara) pre seniorske kategorie. Mladeznicke kategorie hraju na mensich ihriskach s mensim poctom hracov.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10148;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Cas zapasu:</strong> 4 x 15 minut s prestavkami. Po 1. a 3. stvrtine 2-minutova prestavka, v polcase 5-minutova prestavka.
            </p>
          </div>
        </div>

        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Sutaze v pozemnej sezone
        </h2>
        <p className="text-[#334155] mb-6" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Pocas pozemnej sezony sa hraju ligove sutaze pre vsetky kategorie: Extraliga muzov, Extraliga zien a mladeznicke ligy (U18, U14, U12). Okrem ligovych zapasov sa konaju aj pohare a turnaje. Vitazi pozemnej sezony ziskavaju titul Majstra Slovenska v pozemnom hokeji.
        </p>

        <div className="rounded-2xl p-6 mb-8" style={{ background: "#051937" }}>
          <h3 className="font-bold text-white mb-3" style={{ fontSize: "16px" }}>Medzinarodny kontext</h3>
          <p className="text-white/70" style={{ fontSize: "14px", lineHeight: 1.8 }}>
            Pozemny hokej je olympijsky sport. Na medzinarodnej urovni ho riadi FIH (Medzinarodna hokejova federacia). Slovensko sa zucastnuje europskych kvalifikacii a turnajov organizovanych EHF (Europska hokejova federacia).
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
