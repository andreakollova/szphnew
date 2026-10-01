import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Extraliga zien - Slovensky pozemnohokejovy zvaz",
  description: "Extraliga zien je najvyssia zienska sutaz v pozemnom hokeji na Slovensku. Informacie o formate, kluboch a priebehu sutaze.",
};

export default function ZenskaLigaPage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      {/* Hero */}
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span className="font-bold uppercase text-white mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>
            Sutaze
          </span>
          <h1 className="font-garet font-bold italic text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Extraliga zien
          </h1>
          <p className="text-white mt-3 max-w-xl" style={{ fontSize: "15px" }}>
            Najvyssia zienska sutaz v pozemnom hokeji na Slovensku.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <p className="text-[#334155] mb-8" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Extraliga zien je hlavna sutaz zienskeho poznemneho hokeja na Slovensku. Reprezentuje najvyssiu uroven zienskeho hokeja v krajine a kazdu sezonu v nej suria najlepsie zienske timy o titul Majsteriek Slovenska. Sutaz organizuje Slovensky pozemnohokejovy zvaz.
        </p>

        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Format a priebeh
        </h2>
        <p className="text-[#334155] mb-6" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Extraliga zien prebieha v pozemnej aj halovej forme. Timy hraju systemom kazda s kazdou, s domacimi aj vonkajsimi zapasmi. Na zaklade vysledkov zakladnej casti sa urcuje poradie a prip. play-off. Format sa prisposobuje poctu prihlasenych timov v danej sezone.
        </p>

        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Pozemna a halova sezona
        </h2>
        <div className="space-y-4 mb-8">
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10148;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Pozemna sezona:</strong> Hra sa na jar a na jesen na ihriskach s umelou travou. Zapasy prebiehaju v plnom formate 11 na 11.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10148;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Halova sezona:</strong> Zimna cast sutaze prebieha v sportovych halach vo formate 6 na 6 s odlisnymi pravidlami.
            </p>
          </div>
        </div>

        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Rozvoj zienskeho hokeja
        </h2>
        <p className="text-[#334155] mb-8" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Ziensky pozemny hokej ma na Slovensku rastuce zastupenie. Slovensky pozemnohokejovy zvaz aktivne podporuje rozvoj zienskeho hokeja prostrednictvom sutazi, treningovych programov a zapojenia hraciek do medzinarodnych turnajov. Hracky z Extraligy tvoria jadro zienskej reprezentacie Slovenska.
        </p>

        <div className="rounded-2xl p-6 mb-8" style={{ background: "#051937" }}>
          <h3 className="font-bold text-white mb-3" style={{ fontSize: "16px" }}>Reprezentacia zien</h3>
          <p className="text-white" style={{ fontSize: "14px", lineHeight: 1.8 }}>
            Zienska reprezentacia Slovenska sa zucastnuje medzinarodnych podujati pod zastitou FIH a EHF. Extraliga je zakladom pre selekciu a pripravu reprezentantiek na medzinarodne sutaze.
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
