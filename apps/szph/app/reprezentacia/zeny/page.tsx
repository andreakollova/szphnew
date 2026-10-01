import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ženy A - Reprezentácia",
  description: "Seniorská ženská reprezentácia Slovenska v pozemnom hokeji.",
};

export default function ZenyPage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      {/* Hero */}
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span className="font-bold uppercase text-white mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>
            Reprezentácia
          </span>
          <h1 className="font-garet font-bold italic text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Ženy A
          </h1>
          <p className="text-white mt-3 max-w-xl" style={{ fontSize: "15px" }}>
            Seniorská ženská reprezentácia Slovenska v pozemnom hokeji reprezentuje krajinu na európskych a medzinárodných súťažiach.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <h2 className="font-bold text-[#051937] mb-6" style={{ fontSize: "24px" }}>
          O tíme
        </h2>
        <p className="text-[#334155] mb-8" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Ženská A-reprezentácia Slovenska v pozemnom hokeji združuje najlepšie hráčky slovenského pozemného hokeja. Tím sa pravidelne zúčastňuje turnajov EuroHockey Championship v rámci ženského divízneho systému. Ženská reprezentácia má kľúčový význam pre rozvoj ženského pozemného hokeja na Slovensku a slúži ako motivácia pre mladé hráčky v kluboch.
        </p>

        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Medzinárodné súťaže
        </h2>
        <div className="space-y-4 mb-8">
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10140;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>EuroHockey Championship Women:</strong> Hlavná európska súťaž ženských reprezentácií. Slovensko súťaží v divízii zodpovedajúcej aktuálnej výkonnostnej úrovni tímu.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10140;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Priateľské turnaje:</strong> Ženská reprezentácia absolvuje počas roka viacero prípravných stretnutí a pozývnych turnajov, ktoré sú dôležitou súčasťou prípravy na hlavné súťaže.
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-2xl p-6" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
          <h3 className="font-bold text-[#051937] mb-2" style={{ fontSize: "15px" }}>Rozvoj ženského pozemného hokeja</h3>
          <p className="text-[#334155]" style={{ fontSize: "14px", lineHeight: 1.8 }}>
            Ženská reprezentácia je ukážkou, že pozemný hokej je šport pre všetkých. SZPH aktívne podporuje rozvoj ženského hokeja na Slovensku a snaží sa zvyšovať počet hráčok v kluboch po celej krajine.
          </p>
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
