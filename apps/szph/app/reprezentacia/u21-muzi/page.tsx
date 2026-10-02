import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "U21 Muži - Reprezentácia",
  description: "Mládežnícka mužská reprezentácia Slovenska do 21 rokov v pozemnom hokeji.",
};

export default function U21MuziPage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      {/* Hero */}
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span className="font-bold uppercase text-white mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>
            Reprezentácia
          </span>
          <h1 className="font-garet font-bold italic text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            U21 Muži
          </h1>
          <p className="text-white mt-3 max-w-xl" style={{ fontSize: "15px" }}>
            Mládežnícka mužská reprezentácia Slovenska do 21 rokov v pozemnom hokeji.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <h2 className="font-bold text-[#051937] mb-6" style={{ fontSize: "24px" }}>
          O tíme
        </h2>
        <p className="text-[#334155] mb-8" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Mládežnícka reprezentácia mužov do 21 rokov je kľúčovým článkom v systéme rozvoja slovenského pozemného hokeja. Tím združuje najtalentovanejších mladých hráčov, ktorí sa pripravujú na prechod do seniorskej reprezentácie. Hráči získavajú cenné medzinárodné skúsenosti na turnajoch EuroHockey Junior Championship.
        </p>

        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Súťaže a turnaje
        </h2>
        <div className="space-y-4 mb-8">
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10140;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>EuroHockey Junior Championship:</strong> Hlavná európska súťaž mládežníckej kategórie, kde sa stretávajú najlepšie juniorské tímy kontinentu. Slovensko sa snaží pravidelne zúčastňovať a zlepšovať svoju pozíciu.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10140;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Prípravné turnaje a kempové:</strong> Okrem oficiálnych súťaží sa tím zúčastňuje prípravných turnajov a sústredení, ktoré sú dôležité pre budovanie tímovej chémie a zlepšovanie herných návykov.
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-2xl p-6" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
          <h3 className="font-bold text-[#051937] mb-2" style={{ fontSize: "15px" }}>Význam mládežníckej reprezentácie</h3>
          <p className="text-[#334155]" style={{ fontSize: "14px", lineHeight: 1.8 }}>
            Mládežnícka reprezentácia je základom budúcnosti slovenského pozemného hokeja. Hráči, ktorí prejdú touto kategóriou, získavajú skúsenosti, ktoré ich pripravia na pôsobenie v seniorskom národnom tíme.
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
