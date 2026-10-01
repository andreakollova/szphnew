import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "U18 - Mladeznicke sutaze - Slovensky pozemnohokejovy zvaz",
  description: "Mladeznicka kategoria U18 v pozemnom hokeji na Slovensku. Informacie o sutaziach hracov do 18 rokov.",
};

export default function U18Page() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      {/* Hero */}
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span className="font-bold uppercase text-white/40 mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>
            Sutaze
          </span>
          <h1 className="font-garet font-bold italic text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            U18
          </h1>
          <p className="text-white/50 mt-3 max-w-xl" style={{ fontSize: "15px" }}>
            Mladeznicka kategoria hracov do 18 rokov.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <p className="text-[#334155] mb-8" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Kategoria U18 je najvyssia mladeznicka vekova skupina v slovenskom pozemnom hokeji. Zdruzuje hracov a hracky do 18 rokov a sluzi ako klucovy medzistupen medzi mladezou a seniorskym hokejom. V tejto kategorii sa hraci pripravuju na prechod do dospelych sutazi a mnohim z nich sa uz paralelne darí nastupovat aj v Extralige.
        </p>

        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Format sutaze
        </h2>
        <div className="space-y-4 mb-8">
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10148;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Pozemna sezona:</strong> Zapasy sa hraju na ihriskach s umelou travou v plnom formate 11 na 11, rovnako ako v seniorskych kategoriach.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10148;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Halova sezona:</strong> V zimnych mesiacoch sa hra halovy hokej vo formate 6 na 6 v sportovych halach.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10148;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Turnajovy system:</strong> Sutaz prebieha formou ligoveho formatu alebo turnajoyvch kol v zavislosti od poctu prihlasenych timov.
            </p>
          </div>
        </div>

        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Rozvoj a reprezentacia
        </h2>
        <p className="text-[#334155] mb-8" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Kategoria U18 je dolezita pre rozvoj talentov a budovanie zakladu pre slovensku reprezentaciu. Najlepsi hraci z tejto kategorie su nominovani do mladeznickeho narodneho timu, ktory sa zucastnuje medzinarodnych turnajov a kvalifikacii organizovanych EHF. Uspesny prechod z U18 do seniorskych sutazi je jednym z hlavnych cielov systemu mladeznickeho hokeja na Slovensku.
        </p>

        <div className="rounded-2xl p-6 mb-8" style={{ background: "#051937" }}>
          <h3 className="font-bold text-white mb-3" style={{ fontSize: "16px" }}>Pre kluby a trenerov</h3>
          <p className="text-white/70" style={{ fontSize: "14px", lineHeight: 1.8 }}>
            Prihlasovanie timov do mladeznicskych sutazi prebieha prostrednictvom Slovenskeho pozemnohokejoveho zvazu. Aktualne informacie o terminoch, rozpise zapasov a pravidlach najdete v sekcii dokumentov alebo kontaktujte priamo SZPH.
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
