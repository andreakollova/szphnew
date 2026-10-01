import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reprezentacia",
  description: "Slovenske narodne timy v pozemnom hokeji - muzi, zeny, mladeznicke kategorie.",
};

const teams = [
  { title: "Muzi A", href: "/reprezentacia/muzi", desc: "Seniorsky narodny tim muzov" },
  { title: "Zeny A", href: "/reprezentacia/zeny", desc: "Seniorsky narodny tim zien" },
  { title: "U21 Muzi", href: "/reprezentacia/u21-muzi", desc: "Mladeznicka reprezentacia muzov do 21 rokov" },
  { title: "U21 Zeny", href: "/reprezentacia/u21-zeny", desc: "Mladeznicka reprezentacia zien do 21 rokov" },
  { title: "Nominacie", href: "/reprezentacia/nominacie", desc: "Aktualne nominacie pred turnajmi" },
  { title: "FIH rebricek", href: "/reprezentacia/rebricek", desc: "Svetovy rebricek Medzinarodnej hokejovej federacie" },
  { title: "Archiv vysledkov", href: "/reprezentacia/archiv", desc: "Historia vystupeni slovenskych reprezentacii" },
];

export default function ReprezentaciaPage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      {/* Hero */}
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span className="font-bold uppercase text-white/40 mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>
            Reprezentacia
          </span>
          <h1 className="font-garet font-bold italic text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Slovenske reprezentacie v pozemnom hokeji
          </h1>
          <p className="text-white/50 mt-3 max-w-xl" style={{ fontSize: "15px" }}>
            Slovensko zastupuju v medzinarodnych sutaziach seniorske aj mladeznicke narodne timy muzov a zien. Reprezentacie sa zucastnuju turnajov pod hlavickou EuroHockey a Medzinarodnej hokejovej federacie (FIH).
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <h2 className="font-bold text-[#051937] mb-6" style={{ fontSize: "24px" }}>
          Narodne timy
        </h2>
        <p className="text-[#334155] mb-8" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Slovensky zvaz pozemneho hokeja riadi cinnost styroch narodnych timov - muzskej a zienskej seniorskej reprezentacie a dvoch mladeznickych timov v kategorii do 21 rokov. Kazdy z timov sa pravidelne zucastnuje medzinarodnych turnajov organizovanych EuroHockey, pripadne kvalifikacnych sutazi pod zastitou FIH.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          {teams.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="group bg-white px-6 py-5 transition-colors hover:bg-[#f0f4fa]"
              style={{ borderRadius: "6px", border: "1px solid rgba(1,45,116,0.06)" }}
            >
              <h3 className="font-bold text-[#051937] group-hover:text-[#012d74] transition-colors" style={{ fontSize: "14px" }}>
                {t.title}
              </h3>
              <p className="text-[#64748b] mt-1" style={{ fontSize: "12px" }}>{t.desc}</p>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-2xl p-6" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
          <h3 className="font-bold text-[#051937] mb-2" style={{ fontSize: "15px" }}>Medzinarodne sutaze</h3>
          <p className="text-[#334155]" style={{ fontSize: "14px", lineHeight: 1.8 }}>
            Slovenske reprezentacie sutazia predovsetkym v ramci EuroHockey Championship, ktore ma viacero divizii podla vykonnostnej urovne. Cielom je postupne sa prebojovat do vyssich divizii a ziskat miestenku na svetovy sampit ci olympijske hry. Vysledky nasich reprezentacii najdete v sekcii archiv.
          </p>
        </div>
      </div>
    </article>
  );
}
