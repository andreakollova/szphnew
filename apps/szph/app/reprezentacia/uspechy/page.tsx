"use client";

import { useState } from "react";
import Link from "next/link";

const TABS = [
  "Muži - hala",
  "Muži - vonku",
  "Ženy - hala",
  "Ženy - vonku",
  "Juniori U21 - hala",
  "Juniorky U21 - hala",
  "Mládež - vonku",
] as const;

type TabKey = (typeof TABS)[number];

interface Row {
  year: string;
  event: string;
  result: string;
}

const DATA: Record<TabKey, Row[]> = {
  "Muži - hala": [
    { year: "2026", event: "Championship II-A, Sv. Ivan Zelina", result: "3. miesto" },
    { year: "2024", event: "Championship II-B, Budapešť", result: "3. miesto" },
    { year: "2018", event: "Championship III, Nikózia", result: "2. miesto" },
    { year: "2008", event: "Nations Trophy, Kodaň", result: "3. miesto" },
  ],
  "Muži - vonku": [
    { year: "2015", event: "Championship IV, Vilnius", result: "1. miesto, postup" },
    { year: "2009", event: "Challenge II, Bratislava", result: "2. miesto, postup" },
  ],
  "Ženy - hala": [
    { year: "2022", event: "Championship III, Bratislava", result: "2. miesto" },
    { year: "2018", event: "Championship III, Apače", result: "2. miesto" },
    { year: "2010", event: "Nations Trophy, Nymburk", result: "3. miesto" },
  ],
  "Ženy - vonku": [
    { year: "2022", event: "Kvalifikácia na ME, Durham", result: "3. miesto, postup do Championship II" },
    { year: "2005", event: "Challenge, Praha", result: "3. miesto" },
  ],
  "Juniori U21 - hala": [
    { year: "2025", event: "Championship II, Lousada", result: "2. miesto" },
    { year: "2019", event: "Championship II, Paredes", result: "2. miesto" },
    { year: "2017", event: "Championship II, Puconci", result: "3. miesto" },
    { year: "2015", event: "Championship II, Sv. Ivan Zelina", result: "3. miesto" },
    { year: "2013", event: "Championship II, Bratislava", result: "3. miesto" },
    { year: "2007", event: "Trophy, Miláno", result: "3. miesto" },
    { year: "2002", event: "Trophy, Sopron", result: "3. miesto" },
    { year: "1998", event: "Trophy, Bratislava", result: "2. miesto" },
  ],
  "Juniorky U21 - hala": [
    { year: "2019", event: "Championship II, Sv. Ivan Zelina", result: "2. miesto" },
    { year: "2011", event: "Championship II, Lignano", result: "3. miesto" },
    { year: "2005", event: "Trophy, Bratislava", result: "1. miesto" },
    { year: "2001", event: "Trophy, Bratislava", result: "3. miesto" },
    { year: "1994", event: "ME, Llodio", result: "3. miesto v Európe" },
  ],
  "Mládež - vonku": [
    { year: "2026", event: "Dievčatá U16 5s Championship II, Kutaisi", result: "3. miesto" },
    { year: "2022", event: "Chlapci U16 5s Championship II, Alanya", result: "2. miesto" },
    { year: "2014", event: "Muži U21 Championship III, Hradec Králové", result: "3. miesto" },
    { year: "2012", event: "Muži U21 Championship III-B, Bratislava", result: "2. miesto" },
    { year: "2010", event: "Muži U21 Championship III, Atény", result: "3. miesto" },
    { year: "2008", event: "Ženy U21 Challenge, Viedeň", result: "3. miesto" },
    { year: "2006", event: "Ženy U21 Challenge, Albena", result: "3. miesto" },
  ],
};

function resultColor(r: string) {
  if (r.includes("1.")) return "#D4A017";
  if (r.includes("2.")) return "#8a8a8a";
  if (r.includes("3.")) return "#CD7F32";
  return "#334155";
}

function Table({ data }: { data: Row[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="notranslate w-full text-sm" style={{ background: "#fff", borderRadius: "6px", border: "1px solid rgba(1,45,116,0.06)" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid rgba(1,45,116,0.08)" }}>
            <th className="px-4 py-3 text-left font-bold text-[#051937]" style={{ fontSize: "11px" }}>Rok</th>
            <th className="px-4 py-3 text-left font-bold text-[#051937]" style={{ fontSize: "11px" }}>Súťaž a miesto</th>
            <th className="px-4 py-3 text-left font-bold text-[#051937]" style={{ fontSize: "11px" }}>Výsledok</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r, i) => (
            <tr key={i} style={{ borderBottom: "1px solid rgba(1,45,116,0.05)" }}>
              <td className="px-4 py-3 font-bold text-[#051937]" style={{ fontSize: "13px" }}>{r.year}</td>
              <td className="px-4 py-3 text-[#334155]" style={{ fontSize: "13px" }}>{r.event}</td>
              <td className="px-4 py-3 font-bold whitespace-nowrap" style={{ fontSize: "13px", color: resultColor(r.result) }}>{r.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function UspechyPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("Muži - hala");

  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      {/* Hero */}
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[1100px] mx-auto">
          <span className="font-bold uppercase text-white mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>Reprezentácia</span>
          <h1 className="font-garet font-bold italic text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Úspechy a ocenenia</h1>
          <p className="text-white mt-3 max-w-xl" style={{ fontSize: "15px" }}>
            Kompletný prehľad medailí a výsledkov slovenských reprezentácií na medzinárodných súťažiach v pozemnom a halovom hokeji.
          </p>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 pt-12">

        {/* Olympijské striebro */}
        <div className="flex gap-4 p-6 mb-12" style={{ background: "linear-gradient(135deg, #051937 0%, #012d74 100%)", borderRadius: "8px" }}>
          <div className="shrink-0 pt-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo-olympics.png" alt="Olympijské hry" width={56} height={28} style={{ objectFit: "contain" }} />
          </div>
          <div>
            <h3 className="font-bold text-white mb-1" style={{ fontSize: "17px" }}>Olympijské striebro 1980</h3>
            <p className="text-white/80 leading-relaxed" style={{ fontSize: "13px" }}>
              Na Letných olympijských hrách 1980 získali striebornú medailu tri Slovenky: Alena Kyselicová, Viera Podhányiová a Iveta Šranková. Asistentom trénerky bol Slovák Pavol Rosa. Medaila patrí reprezentácii Československa, no ide o významný úspech slovenských osobností pozemného hokeja.
            </p>
            <Link href="/novinky/reportaz-alena-kyselicova" className="inline-flex items-center gap-2 mt-4 font-bold text-white transition-all hover:brightness-110" style={{ fontSize: "12px", background: "#d80027", borderRadius: "20px", padding: "10px 20px" }}>
              Reportáž s Alenou Kyselicovou
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="overflow-x-auto pb-2 mb-6 -mx-6 px-6" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <div className="flex gap-2" style={{ minWidth: "max-content" }}>
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="whitespace-nowrap font-bold transition-all"
                style={{
                  fontSize: "13px",
                  padding: "8px 18px",
                  borderRadius: "20px",
                  background: activeTab === tab ? "#012d74" : "rgba(1,45,116,0.06)",
                  color: activeTab === tab ? "#fff" : "#334155",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Active tab table */}
        <Table data={DATA[activeTab]} />

        {/* Klubové */}
        <div className="mt-12 p-6 bg-white" style={{ borderRadius: "6px", border: "1px solid rgba(1,45,116,0.06)" }}>
          <h3 className="font-bold text-[#051937] mb-2" style={{ fontSize: "16px" }}>Klubové výsledky na európskej scéne</h3>
          <p className="text-[#334155] mb-4" style={{ fontSize: "14px", lineHeight: 1.7 }}>
            Slovenské kluby sa pravidelne zúčastňujú EuroHockey Club Championships od roku 1992. Kompletné výsledky nájdete na stránke PEM.
          </p>
          <Link href="/sutaze/pem" className="inline-flex items-center gap-2 font-bold text-[#012d74] hover:text-[#051937] transition-colors" style={{ fontSize: "13px" }}>
            PEM - Klubové ME
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>

        <div className="mt-8">
          <Link href="/reprezentacia" className="text-[#012d74] hover:underline" style={{ fontSize: "14px" }}>&#8592; Späť na prehľad reprezentácií</Link>
        </div>
      </div>
    </article>
  );
}
