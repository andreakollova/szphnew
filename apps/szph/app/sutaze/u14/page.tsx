import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "U14 - Mladeznicke sutaze - Slovensky pozemnohokejovy zvaz",
  description: "Mladeznicka kategoria U14 v pozemnom hokeji na Slovensku. Informacie o sutaziach hracov do 14 rokov.",
};

export default function U14Page() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      {/* Hero */}
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span className="font-bold uppercase text-white/40 mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>
            Sutaze
          </span>
          <h1 className="font-garet font-bold italic text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            U14
          </h1>
          <p className="text-white/50 mt-3 max-w-xl" style={{ fontSize: "15px" }}>
            Mladeznicka kategoria hracov do 14 rokov.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <p className="text-[#334155] mb-8" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Kategoria U14 je stredna mladeznicka vekova skupina v slovenskom pozemnom hokeji. Zdruzuje hracov a hracky do 14 rokov a predstavuje doelzity stupien vo vyvoji mladych hokejistov. V tomto veku sa hraci uz ucsia pokrocilejsie taktiky a pripravuju sa na prechod do vyssich mladeznicskych kategorii.
        </p>

        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Format sutaze
        </h2>
        <div className="space-y-4 mb-8">
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10148;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Pozemna sezona:</strong> Zapasy sa hraju na mensich ihriskach v uparvenom formate, typicky 7 na 7 alebo 8 na 8. Rozmery ihriska a cas zapasu su prisposobene veku hracov.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10148;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Halova sezona:</strong> V zimnych mesiacoch sa hra halovy hokej vo formate prisposobenom tejto vekovej kategorii.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10148;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Turnaje:</strong> Sutaze prebiehaju casto formou turnajoyvch kol, kde sa v priebehu jedneho vikednoveho dna odohraju viacere zapasy.
            </p>
          </div>
        </div>

        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Rozvoj hracov
        </h2>
        <p className="text-[#334155] mb-8" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          V kategorii U14 sa kladie doraz na rozvoj individualnych zrucnosti, timovu hru a zaklady taktiky. Trening je zamerany na zlepsovanie techniky ovladania lopty, prihravaok, strelieb a pohybu na ihrisku. Cielom je pripravit hracov na plnoformatovu hru v kategorii U18.
        </p>

        <div className="rounded-2xl p-6 mb-8" style={{ background: "#051937" }}>
          <h3 className="font-bold text-white mb-3" style={{ fontSize: "16px" }}>Zapojte sa</h3>
          <p className="text-white/70" style={{ fontSize: "14px", lineHeight: 1.8 }}>
            Ak mate zaujem o zaradenie vasho dietata do mladeznickeho poznemneho hokeja, kontaktujte priamo kluby v beznom okoli alebo Slovensky pozemnohokejovy zvaz. Pozemny hokej je vhodny pre chlapcov aj dievcata od utleho veku.
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
