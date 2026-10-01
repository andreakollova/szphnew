import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Zeny A - Reprezentacia",
  description: "Seniorska zienska reprezentacia Slovenska v pozemnom hokeji.",
};

export default function ZenyPage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      {/* Hero */}
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span className="font-bold uppercase text-white/40 mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>
            Reprezentacia
          </span>
          <h1 className="font-garet font-bold italic text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Zeny A
          </h1>
          <p className="text-white/50 mt-3 max-w-xl" style={{ fontSize: "15px" }}>
            Seniorska zienska reprezentacia Slovenska v pozemnom hokeji reprezentuje krajinu na europskych a medzinarodnych sutaziach.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <h2 className="font-bold text-[#051937] mb-6" style={{ fontSize: "24px" }}>
          O time
        </h2>
        <p className="text-[#334155] mb-8" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Zienska A-reprezentacia Slovenska v pozemnom hokeji zdruzuje najlepsie hracky slovenskeho pozemneho hokeja. Tim sa pravidelne zucastnuje turnajov EuroHockey Championship v ramci zenskeho divizneho systemu. Zienska reprezentacia ma klucovy vyznam pre rozvoj zenskeho pozemneho hokeja na Slovensku a sluzi ako motivacia pre mlade hracky v kluboch.
        </p>

        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Medzinarodne sutaze
        </h2>
        <div className="space-y-4 mb-8">
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10140;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>EuroHockey Championship Women:</strong> Hlavna europska sutaz zienskych reprezentacii. Slovensko sutazi v divizi zodpovedajucej aktualnej vykonnostnej urovni timu.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10140;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Priatelske turnaje:</strong> Zienska reprezentacia absolvuje pocas roka viacero pripravenych stretnutia a pozyvnych turnajov, ktore su dolezitou sucastou pripravy na hlavne sutaze.
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-2xl p-6" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
          <h3 className="font-bold text-[#051937] mb-2" style={{ fontSize: "15px" }}>Rozvoj zienskeho pozemneho hokeja</h3>
          <p className="text-[#334155]" style={{ fontSize: "14px", lineHeight: 1.8 }}>
            Zienska reprezentacia je ukazkou, ze pozemny hokej je sport pre vsetkych. SZPH aktivne podporuje rozvoj zienskeho hokeja na Slovensku a snazi sa zvysovat pocet hracok v kluboch po celej krajine.
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
