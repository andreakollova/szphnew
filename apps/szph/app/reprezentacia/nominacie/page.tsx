import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nominacie - Reprezentacia",
  description: "Aktualne nominacie slovenskych reprezentacii v pozemnom hokeji.",
};

export default function NominaciePage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      {/* Hero */}
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span className="font-bold uppercase text-white mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>
            Reprezentacia
          </span>
          <h1 className="font-garet font-bold italic text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Nominacie
          </h1>
          <p className="text-white mt-3 max-w-xl" style={{ fontSize: "15px" }}>
            Aktualne nominacie hracov a hracok do slovenskych reprezentacii v pozemnom hokeji.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <h2 className="font-bold text-[#051937] mb-6" style={{ fontSize: "24px" }}>
          Aktualne nominacie
        </h2>
        <p className="text-[#334155] mb-8" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Nominacie do slovenskych reprezentacii su zverejnovane pred kazdym turnajom alebo medzinarodnym stretnutim. O nominacii rozhoduje trenersky stab prislusneho narodneho timu na zaklade aktualne formy, zdravotneho stavu a dostupnosti hracov.
        </p>

        <div className="rounded-2xl p-8 text-center" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
          <p className="text-[#64748b] mb-2" style={{ fontSize: "15px" }}>
            V sucasnosti nie su zverejnene ziadne aktualne nominacie.
          </p>
          <p className="text-[#94a3b8]" style={{ fontSize: "13px" }}>
            Nominacie budu zverejnene pred najblizsim turnajom alebo medzinarodnym stretnutim.
          </p>
        </div>

        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Ako prebieha nominacia
        </h2>
        <div className="space-y-4 mb-8">
          <div className="flex gap-3 items-start">
            <span className="text-[#051937]/30 font-bold shrink-0">-</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              Trenersky stab sleduje vykonnost hracov v domacich a zahranicnych sutaziach pocas celej sezony.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#051937]/30 font-bold shrink-0">-</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              Pred kazdym turnajom je zostavena nominacia, ktora zohladnuje aktualne formu, zdravotny stav a takticky zamer timu.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#051937]/30 font-bold shrink-0">-</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              Nominacie su zverejnovane na webovej stranke SZPH a na socialnech sietach zvazu.
            </p>
          </div>
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
