import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Muži A - Reprezentácia",
  description: "Seniorská mužská reprezentácia Slovenska v pozemnom hokeji.",
};

function resultColor(result: string) {
  if (result.includes("1.")) return "#D4A017";
  if (result.includes("2.")) return "#8a8a8a";
  if (result.includes("3.")) return "#CD7F32";
  return "#334155";
}


export default function MuziPage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[1100px] mx-auto">
          <span className="font-bold uppercase text-white mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>Reprezentácia</span>
          <h1 className="font-garet font-bold italic text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Muži A</h1>
          <p className="text-white mt-3 max-w-xl" style={{ fontSize: "15px" }}>
            Seniorská mužská reprezentácia Slovenska v pozemnom hokeji zastupuje krajinu na medzinárodných turnajoch organizovaných EuroHockey a FIH.
          </p>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 pt-12">
        {/* O tíme */}
        <h2 className="font-bold text-[#051937] mb-6" style={{ fontSize: "24px" }}>O tíme</h2>
        <p className="text-[#334155] mb-8" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Mužská A-reprezentácia Slovenska v pozemnom hokeji je najvyšším reprezentačným tímom krajiny. Tím sa pravidelne zúčastňuje turnajov EuroHockey Championship, kde súťaží v rámci divízneho systému. Hráčsky káder tvoria najlepšie dostupní hráči pôsobiaci v slovenských kluboch, pričom niektorých hráčov posilňujú aj legionári pôsobiaci v zahraničných ligách.
        </p>

        {/* Nominácia */}
        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>Nominácia</h2>
        <div className="overflow-x-auto mb-8 notranslate">
          <table className="w-full text-sm" style={{ background: "#fff", borderRadius: "6px", border: "1px solid rgba(1,45,116,0.06)" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid rgba(1,45,116,0.08)" }}>
                <th className="px-4 py-3 text-left font-bold text-[#051937]" style={{ fontSize: "11px" }}>#</th>
                <th className="px-4 py-3 text-left font-bold text-[#051937]" style={{ fontSize: "11px" }}>Hráč</th>
                <th className="px-4 py-3 text-left font-bold text-[#051937]" style={{ fontSize: "11px" }}>Klub</th>
              </tr>
            </thead>
            <tbody>
              {[
                { n: 1, name: "BOGÁR Jakub", club: "SK Slavia Praha", logo: "/images/timy/SLA.webp" },
                { n: 7, name: "VACHA Tomáš", club: "KPH Rača", logo: "/images/timy/RAC-hq.png" },
                { n: 10, name: "ROMANEC Tomáš (C)", club: "KPH Rača", logo: "/images/timy/RAC-hq.png" },
                { n: 11, name: "PETRÁŠ Daniel", club: "Klipper THC Hamburg" },
                { n: 13, name: "AUGUSTINIČ Adrian", club: "PH Plzeň-Litice" },
                { n: 16, name: "GARAJ Richard", club: "KPH Rača", logo: "/images/timy/RAC-hq.png" },
                { n: 9, name: "KAJABA Matúš", club: "KPH Rača", logo: "/images/timy/RAC-hq.png" },
                { n: 18, name: "BLAZOVSKY Michal", club: "HC 1952 Šenkvice", logo: "/images/timy/SEN-hq.png" },
                { n: 20, name: "KRAMPL Matej", club: "KPH Rača", logo: "/images/timy/RAC-hq.png" },
                { n: 23, name: "BOGAR Juraj", club: "KPH Rača", logo: "/images/timy/RAC-hq.png" },
                { n: 24, name: "BARATH Tomas", club: "HC 1952 Šenkvice", logo: "/images/timy/SEN-hq.png" },
                { n: 26, name: "BELOŠOVIČ Šimon", club: "KPH Rača", logo: "/images/timy/RAC-hq.png" },
              ].map((p, i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(1,45,116,0.05)" }}>
                  <td className="px-4 py-2.5 font-bold text-[#012d74]" style={{ fontSize: "13px" }}>{p.n}</td>
                  <td className="px-4 py-2.5 text-[#051937] font-semibold" style={{ fontSize: "13px" }}>{p.name}</td>
                  <td className="px-4 py-2.5 text-[#64748b]" style={{ fontSize: "12px" }}>
                    {p.club}
                  </td>
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
              <strong>EuroHockey Championship:</strong> Hlavná súťaž európskych reprezentácií, rozdelená do viacerých divízií podľa výkonnostnej úrovne. Slovensko sa snaží každoročne zabojovať o postup do vyššej divízie.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10140;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>FIH Hockey Nations Cup:</strong> Medzinárodná súťaž organizovaná Medzinárodnou hokejovou federáciou, ktorá dáva príležitosť krajinám z nižších priečok svetového rebríčka súťažiť na medzinárodnej úrovni.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10140;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Priateľské zápasy:</strong> Okrem oficiálnych turnajov odohrajú muži počas roka viacero priateľských stretnutí, ktoré slúžia ako príprava na hlavné súťaže.
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
                { year: "2026", form: "Hala", event: "ME II-A, Sveti Ivan Zelina", result: "3. miesto" },
                { year: "2024", form: "Hala", event: "ME II-B, Budapešť", result: "3. miesto" },
                { year: "2021", form: "Vonku", event: "ME III, Lousada", result: "5. miesto" },
                { year: "2018", form: "Hala", event: "ME III, Nikózia", result: "2. miesto" },
                { year: "2015", form: "Vonku", event: "ME IV, Vilnius", result: "1. miesto, postup do III. divízie" },
                { year: "2009", form: "Vonku", event: "ME IV, Bratislava", result: "2. miesto" },
                { year: "2008", form: "Hala", event: "Nations Trophy II, Kodaň", result: "3. miesto" },
              ].map((r, i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(1,45,116,0.05)" }}>
                  <td className="px-4 py-3 font-bold text-[#051937]" style={{ fontSize: "13px" }}>{r.year}</td>
                  <td className="px-4 py-3 text-[#64748b]" style={{ fontSize: "13px" }}>{r.form}</td>
                  <td className="px-4 py-3 text-[#334155]" style={{ fontSize: "13px" }}>{r.event}</td>
                  <td className="px-4 py-3 font-bold" style={{ fontSize: "13px", color: resultColor(r.result) }}>{r.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
