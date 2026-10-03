import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "U21 Ženy - Reprezentácia",
  description: "Mládežnícka ženská reprezentácia Slovenska do 21 rokov v pozemnom hokeji.",
};

export default function U21ZenyPage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      {/* Hero */}
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span className="font-bold uppercase text-white mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>
            Reprezentácia
          </span>
          <h1 className="font-garet font-bold italic text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            U21 Ženy
          </h1>
          <p className="text-white mt-3 max-w-xl" style={{ fontSize: "15px" }}>
            Mládežnícka ženská reprezentácia Slovenska do 21 rokov v pozemnom hokeji.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <h2 className="font-bold text-[#051937] mb-6" style={{ fontSize: "24px" }}>
          O tíme
        </h2>
        <p className="text-[#334155] mb-8" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Ženská mládežnícka reprezentácia do 21 rokov je dôležitou súčasťou rozvoja ženského pozemného hokeja na Slovensku. Tím združuje mladé hráčky s najväčším potenciálom, ktoré sa pripravujú na pôsobenie v seniorskej reprezentácii. Účasť na medzinárodných turnajoch im dáva príležitosť porovnať sa s rovesníčkami z iných európskych krajín.
        </p>

        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Súťaže a turnaje
        </h2>
        <div className="space-y-4 mb-8">
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10140;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>EuroHockey Junior Championship Women:</strong> Hlavná európska súťaž juniorských ženských tímov. Slovensko sa zúčastňuje v príslušnej divízii podľa aktuálneho zaradenia.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10140;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Prípravné akcie:</strong> Sústredenia, tréningové kempy a priateľské zápasy pomáhajú mladým hráčkam rozvíjať sa a budovať tímovú spoluprácu.
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
                { year: "1994", form: "Hala", event: "Elitné ME, Llodio", result: "3. miesto v Európe" },
                { year: "2007", form: "Hala", event: "Elitné ME, Viedeň", result: "4. miesto" },
                { year: "2005", form: "Hala", event: "II. úroveň, Bratislava", result: "1. miesto" },
                { year: "2001, 2011", form: "Hala", event: "II. úroveň", result: "3. miesto v oboch rokoch" },
                { year: "2019", form: "Hala", event: "ME II", result: "2. miesto" },
                { year: "2006, 2008", form: "Vonku", event: "ME III", result: "3. miesto v oboch rokoch" },
              ].map((r, i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(1,45,116,0.05)", background: r.result.includes("1.") ? "rgba(212,160,23,0.08)" : r.result.includes("2.") ? "rgba(138,138,138,0.06)" : r.result.includes("3.") ? "rgba(205,127,50,0.06)" : "transparent" }}>
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
          <h3 className="font-bold text-[#051937] mb-2" style={{ fontSize: "15px" }}>Budovanie budúcnosti</h3>
          <p className="text-[#334155]" style={{ fontSize: "14px", lineHeight: 1.8 }}>
            Investícia do mladých hráčok je investícia do budúcnosti slovenského pozemného hokeja. Mládežnícka reprezentácia pomáha vytvárať základňu pre rast ženského hokeja na Slovensku a motivuje ďalšie dievčatá, aby sa tomuto športu venovali.
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
