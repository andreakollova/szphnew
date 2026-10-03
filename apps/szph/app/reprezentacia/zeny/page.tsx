import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ženy A - Reprezentácia",
  description: "Seniorská ženská reprezentácia Slovenska v pozemnom hokeji.",
};

function resultColor(r: string) { return r.includes("1.") ? "#D4A017" : r.includes("2.") ? "#8a8a8a" : r.includes("3.") ? "#CD7F32" : "#334155"; }
function resultBg(r: string) { return r.includes("1.") ? "rgba(212,160,23,0.08)" : r.includes("2.") ? "rgba(138,138,138,0.06)" : r.includes("3.") ? "rgba(205,127,50,0.06)" : "transparent"; }

export default function ZenyPage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span className="font-bold uppercase text-white mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>Reprezentácia</span>
          <h1 className="font-garet font-bold italic text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Ženy A</h1>
          <p className="text-white mt-3 max-w-xl" style={{ fontSize: "15px" }}>
            Seniorská ženská reprezentácia Slovenska v pozemnom hokeji reprezentuje krajinu na európskych a medzinárodných súťažiach.
          </p>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 pt-12">
        {/* O tíme */}
        <h2 className="font-bold text-[#051937] mb-6" style={{ fontSize: "24px" }}>O tíme</h2>
        <p className="text-[#334155] mb-8" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Ženská A-reprezentácia Slovenska v pozemnom hokeji združuje najlepšie hráčky slovenského pozemného hokeja. Tím sa pravidelne zúčastňuje turnajov EuroHockey Championship v rámci ženského divízneho systému. Ženská reprezentácia má kľúčový význam pre rozvoj ženského pozemného hokeja na Slovensku a slúži ako motivácia pre mladé hráčky v kluboch.
        </p>

        {/* Nominácia */}
        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>Nominácia</h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm" style={{ background: "#fff", borderRadius: "6px", border: "1px solid rgba(1,45,116,0.06)" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid rgba(1,45,116,0.08)" }}>
                <th className="px-4 py-3 text-left font-bold text-[#051937]" style={{ fontSize: "11px" }}>#</th>
                <th className="px-4 py-3 text-left font-bold text-[#051937]" style={{ fontSize: "11px" }}>Hráčka</th>
              </tr>
            </thead>
            <tbody>
              {[
                { n: 1, name: "SUTOVSKA Daniela (GK)" },
                { n: 2, name: "LISKOVA Natalia (GK)" },
                { n: 3, name: "VYSKOČOVÁ Karolína" },
                { n: 7, name: "MEDVIKOVA Šarlota" },
                { n: 8, name: "ČAPOVÁ Vanessa" },
                { n: 9, name: "HUŠKOVÁ Bianka" },
                { n: 10, name: "KRAMPLOVA Lenka" },
                { n: 12, name: "FONDRKOVA Natalia (C)" },
                { n: 14, name: "SURINOVA Martina" },
                { n: 18, name: "HORÁČKOVÁ Lenka" },
                { n: 20, name: "MÉSZÁROS Réka" },
              ].map((p, i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(1,45,116,0.05)" }}>
                  <td className="px-4 py-2.5 font-bold text-[#012d74]" style={{ fontSize: "13px" }}>{p.n}</td>
                  <td className="px-4 py-2.5 text-[#051937] font-semibold" style={{ fontSize: "13px" }}>{p.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Medzinárodné súťaže */}
        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>Medzinárodné súťaže</h2>
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

        {/* Ocenenia a výsledky */}
        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>Ocenenia a výsledky</h2>
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
                { year: "1996, 1998, 2000", form: "Hala", event: "Elitné ME – Glasgow, Ourense, Viedeň", result: "Trikrát 5. miesto" },
                { year: "2010", form: "Hala", event: "Nations Trophy II, Nymburk", result: "3. miesto" },
                { year: "2018", form: "Hala", event: "ME III, Apače", result: "2. miesto" },
                { year: "2022", form: "Hala", event: "ME III, Bratislava", result: "2. miesto" },
                { year: "2005", form: "Vonku", event: "ME III, Praha", result: "3. miesto" },
                { year: "2023", form: "Vonku", event: "ME II, Praha", result: "8. miesto – účasť v II. divízii" },
              ].map((r, i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(1,45,116,0.05)", background: resultBg(r.result) }}>
                  <td className="px-4 py-3 font-bold text-[#051937]" style={{ fontSize: "13px" }}>{r.year}</td>
                  <td className="px-4 py-3 text-[#64748b]" style={{ fontSize: "13px" }}>{r.form}</td>
                  <td className="px-4 py-3 text-[#334155]" style={{ fontSize: "13px" }}>{r.event}</td>
                  <td className="px-4 py-3 font-bold" style={{ fontSize: "13px", color: resultColor(r.result) }}>{r.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Historický presah */}
        <div className="flex gap-4 p-6 mb-8" style={{ background: "linear-gradient(135deg, #051937 0%, #012d74 100%)", borderRadius: "8px" }}>
          <div className="shrink-0 pt-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo-olympics.png" alt="Olympijské hry" width={48} height={24} style={{ objectFit: "contain" }} />
          </div>
          <div>
            <h3 className="font-bold text-white mb-1" style={{ fontSize: "15px" }}>Historický presah: olympijské striebro 1980</h3>
            <p className="text-white/80 leading-relaxed" style={{ fontSize: "13px" }}>
              Na OH v Moskve získali striebro tri Slovenky: Alena Kyselicová, Viera Podhányiová a Iveta Šranková. Asistentom trénerky bol Slovák Pavol Rosa. Je to významný úspech slovenských osobností pozemného hokeja, ale medaila patrí reprezentácii Československa.
            </p>
            <Link href="/novinky/reportaz-alena-kyselicova" className="inline-flex items-center gap-1.5 mt-2 font-bold text-white/70 hover:text-white transition-colors" style={{ fontSize: "11px" }}>
              Reportáž s Alenou Kyselicovou
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>

        <div className="mt-6">
          <Link href="/reprezentacia" className="text-[#012d74] hover:underline" style={{ fontSize: "14px" }}>&#8592; Späť na prehľad reprezentácií</Link>
        </div>
      </div>
    </article>
  );
}
