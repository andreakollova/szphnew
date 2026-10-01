import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Muzi A - Reprezentacia",
  description: "Seniorska muzska reprezentacia Slovenska v pozemnom hokeji.",
};

export default function MuziPage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      {/* Hero */}
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span className="font-bold uppercase text-white/40 mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>
            Reprezentacia
          </span>
          <h1 className="font-garet font-bold italic text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Muzi A
          </h1>
          <p className="text-white/50 mt-3 max-w-xl" style={{ fontSize: "15px" }}>
            Seniorska muzska reprezentacia Slovenska v pozemnom hokeji zastupuje krajinu na medzinarodnych turnajoch organizovanych EuroHockey a FIH.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <h2 className="font-bold text-[#051937] mb-6" style={{ fontSize: "24px" }}>
          O time
        </h2>
        <p className="text-[#334155] mb-8" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Muzska A-reprezentacia Slovenska v pozemnom hokeji je najvyssim reprezentacnym timom krajiny. Tim sa pravidelne zucastnuje turnajov EuroHockey Championship, kde sutazi v ramci divizneho systemu. Hracsky kader tvoria najlepsie dostupni hraci posobiacej v slovenskych kluboch, pricom niektorych hracov posilnuju aj legionari posobiacej v zahranicnych ligach.
        </p>

        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Medzinarodne sutaze
        </h2>
        <div className="space-y-4 mb-8">
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10140;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>EuroHockey Championship:</strong> Hlavna sutaz europskych reprezentacii, rozdelena do viacerych divizii podla vykonnostnej urovne. Slovensko sa snazi kazdorocne zabojovat o postup do vyssej divizie.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10140;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>FIH Hockey Nations Cup:</strong> Medzinarodna sutaz organizovana Medzinarodnou hokejovou federaciou, ktora dava prilezitost krajina z nizsich prieck svetoveho rebricka sutazit na medzinarodnej urovni.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10140;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Priatelske zapasy:</strong> Okrem oficialnych turnajov odohraju muzi pocas roka viacero priatelskych stretnutia, ktore sluzia ako priprava na hlavne sutaze.
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-2xl p-6" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
          <h3 className="font-bold text-[#051937] mb-2" style={{ fontSize: "15px" }}>Aktualne nominacie</h3>
          <p className="text-[#334155]" style={{ fontSize: "14px", lineHeight: 1.8 }}>
            Aktualne nominacie na nadchadzajuce turnaje najdete v sekcii{" "}
            <Link href="/reprezentacia/nominacie" className="text-[#012d74] underline hover:no-underline">
              Nominacie
            </Link>.
          </p>
        </div>

        <div className="mt-6">
          <Link href="/reprezentacia" className="text-[#012d74] hover:underline" style={{ fontSize: "14px" }}>
            &#8592; Spat na prehlad reprezentacii
          </Link>
        </div>
      </div>
    </article>
  );
}
