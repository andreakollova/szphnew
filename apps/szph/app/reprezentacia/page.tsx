import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reprezentácia",
  description: "Slovenské národné tímy v pozemnom hokeji - muži, ženy, mládežnícke kategórie.",
};

const teams = [
  { title: "Muži A", href: "/reprezentacia/muzi", desc: "Seniorský národný tím mužov" },
  { title: "Ženy A", href: "/reprezentacia/zeny", desc: "Seniorský národný tím žien" },
  { title: "U21 Muži", href: "/reprezentacia/u21-muzi", desc: "Mládežnícka reprezentácia mužov do 21 rokov" },
  { title: "U21 Ženy", href: "/reprezentacia/u21-zeny", desc: "Mládežnícka reprezentácia žien do 21 rokov" },
  { title: "Nominácie", href: "/reprezentacia/nominacie", desc: "Aktuálne nominácie pred turnajmi" },
  { title: "FIH rebríček", href: "/reprezentacia/rebricek", desc: "Svetový rebríček Medzinárodnej hokejovej federácie" },
  { title: "Archív výsledkov", href: "/reprezentacia/archiv", desc: "História vystúpení slovenských reprezentácií" },
];

export default function ReprezentaciaPage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      {/* Hero */}
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[1100px] mx-auto">
          <span className="font-bold uppercase text-white mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>
            Reprezentácia
          </span>
          <h1 className="font-garet font-bold italic text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Slovenské reprezentácie v pozemnom hokeji
          </h1>
          <p className="text-white mt-3 max-w-xl" style={{ fontSize: "15px" }}>
            Slovensko zastupujú v medzinárodných súťažiach seniorské aj mládežnícke národné tímy mužov a žien. Reprezentácie sa zúčastňujú turnajov pod hlavičkou EuroHockey a Medzinárodnej hokejovej federácie (FIH).
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1100px] mx-auto px-6 pt-12">
        <h2 className="font-bold text-[#051937] mb-6" style={{ fontSize: "24px" }}>
          Národné tímy
        </h2>
        <p className="text-[#334155] mb-8" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Slovenský zväz pozemného hokeja riadi činnosť štyroch národných tímov - mužskej a ženskej seniorskej reprezentácie a dvoch mládežníckych tímov v kategórii do 21 rokov. Každý z tímov sa pravidelne zúčastňuje medzinárodných turnajov organizovaných EuroHockey, prípadne kvalifikačných súťaží pod záštitou FIH.
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

        <div className="mt-12 rounded-lg p-6" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
          <h3 className="font-bold text-[#051937] mb-2" style={{ fontSize: "15px" }}>Medzinárodné súťaže</h3>
          <p className="text-[#334155]" style={{ fontSize: "14px", lineHeight: 1.8 }}>
            Slovenské reprezentácie súťažia predovšetkým v rámci EuroHockey Championship, ktoré má viacero divízií podľa výkonnostnej úrovne. Cieľom je postupne sa prebojovať do vyšších divízií a získať miestenku na svetový šampionát či olympijské hry. Výsledky našich reprezentácií nájdete v sekcii archív.
          </p>
        </div>
      </div>
    </article>
  );
}
