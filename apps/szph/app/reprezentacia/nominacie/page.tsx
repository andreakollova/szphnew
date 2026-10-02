import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nominácie - Reprezentácia",
  description: "Aktuálne nominácie slovenských reprezentácií v pozemnom hokeji.",
};

export default function NominaciePage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      {/* Hero */}
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span className="font-bold uppercase text-white mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>
            Reprezentácia
          </span>
          <h1 className="font-garet font-bold italic text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Nominácie
          </h1>
          <p className="text-white mt-3 max-w-xl" style={{ fontSize: "15px" }}>
            Aktuálne nominácie hráčov a hráčok do slovenských reprezentácií v pozemnom hokeji.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <h2 className="font-bold text-[#051937] mb-6" style={{ fontSize: "24px" }}>
          Aktuálne nominácie
        </h2>
        <p className="text-[#334155] mb-8" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Nominácie do slovenských reprezentácií sú zverejňované pred každým turnajom alebo medzinárodným stretnutím. O nominácii rozhoduje trénerský štáb príslušného národného tímu na základe aktuálnej formy, zdravotného stavu a dostupnosti hráčov.
        </p>

        <div className="rounded-lg p-8 text-center" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
          <p className="text-[#64748b] mb-2" style={{ fontSize: "15px" }}>
            V súčasnosti nie sú zverejnené žiadne aktuálne nominácie.
          </p>
          <p className="text-[#94a3b8]" style={{ fontSize: "13px" }}>
            Nominácie budú zverejnené pred najbližším turnajom alebo medzinárodným stretnutím.
          </p>
        </div>

        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Ako prebieha nominácia
        </h2>
        <div className="space-y-4 mb-8">
          <div className="flex gap-3 items-start">
            <span className="text-[#051937]/30 font-bold shrink-0">-</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              Trénerský štáb sleduje výkonnosť hráčov v domácich a zahraničných súťažiach počas celej sezóny.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#051937]/30 font-bold shrink-0">-</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              Pred každým turnajom je zostavená nominácia, ktorá zohľadňuje aktuálnu formu, zdravotný stav a taktický zámer tímu.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#051937]/30 font-bold shrink-0">-</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              Nominácie sú zverejňované na webovej stránke SZPH a na sociálnych sieťach zväzu.
            </p>
          </div>
        </div>

        <div className="mt-6">
          <Link href="/reprezentacia" className="text-[#012d74] hover:underline" style={{ fontSize: "14px" }}>
            &#8592; Späť na prehľad reprezentácií
          </Link>
        </div>
      </div>
    </article>
  );
}
