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
        <div className="max-w-[1100px] mx-auto">
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
      <div className="max-w-[1100px] mx-auto px-6 pt-12">
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

        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Ocenenia a výsledky
        </h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm" style={{ background: "#fff", borderRadius: "6px", border: "1px solid rgba(1,45,116,0.06)" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid rgba(1,45,116,0.08)" }}>
                <th className="px-4 py-3 text-left font-bold text-[#051937]" style={{ fontSize: "11px" }}>Rok</th>
                <th className="px-4 py-3 text-left font-bold text-[#051937]" style={{ fontSize: "11px" }}>Forma</th>
                <th className="px-4 py-3 text-left font-bold text-[#051937]" style={{ fontSize: "11px" }}>Súťaž a miesto</th>
                <th className="px-4 py-3 text-left font-bold text-[#051937]" style={{ fontSize: "11px" }}>Výsledok</th>
              </tr>
            </thead>
            <tbody>
              {[
                { year: "2025", form: "Hala", event: "ME II, Lousada", result: "2. miesto" },
                { year: "2019", form: "Hala", event: "ME II, Paredes", result: "2. miesto" },
                { year: "2015, 2017", form: "Hala", event: "ME II", result: "3. miesto v oboch rokoch" },
                { year: "2012", form: "Vonku", event: "ME III-B, Bratislava", result: "2. miesto" },
                { year: "2010, 2014", form: "Vonku", event: "ME III", result: "3. miesto v oboch rokoch" },
                { year: "2002, 2007, 2013", form: "Hala", event: "II. úroveň", result: "3. miesto v každom ročníku" },
                { year: "1998", form: "Hala", event: "II. úroveň, Bratislava", result: "2. miesto" },
              ].map((r, i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(1,45,116,0.05)" }}>
                  <td className="px-4 py-3 font-bold text-[#051937]" style={{ fontSize: "13px" }}>{r.year}</td>
                  <td className="px-4 py-3 text-[#64748b]" style={{ fontSize: "13px" }}>{r.form}</td>
                  <td className="px-4 py-3 text-[#334155]" style={{ fontSize: "13px" }}>{r.event}</td>
                  <td className="px-4 py-3 font-bold" style={{ fontSize: "13px", color: r.result.includes("1.") ? "#D4A017" : r.result.includes("2.") ? "#8a8a8a" : r.result.includes("3.") ? "#CD7F32" : "#334155" }}>{r.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-12 rounded-lg p-6" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
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
