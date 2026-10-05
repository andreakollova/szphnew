"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function rc(r: string) { return r.includes("1.") ? "#D4A017" : r.includes("2.") ? "#8a8a8a" : r.includes("3.") ? "#CD7F32" : "#334155"; }
function rb(r: string) { return r.includes("1.") ? "rgba(212,160,23,0.08)" : r.includes("2.") ? "rgba(138,138,138,0.06)" : r.includes("3.") ? "rgba(205,127,50,0.06)" : "transparent"; }

const LOGOS: Record<string, string> = {
  "Lokomotíva Bratislava": "/images/timy/RAC-hq.png",
  "Lokomotíva Rača": "/images/timy/RAC-hq.png",
  "Mazda Bratislava": "/images/timy/RAC-hq.png",
  "KPH Rača": "/images/timy/RAC-hq.png",
  "Palma Šenkvice": "/images/timy/SEN-hq.png",
  "ŠKPH Šenkvice": "/images/timy/SEN-hq.png",
  "Šenkvice": "/images/timy/SEN-hq.png",
  "SK Šenkvice": "/images/timy/SEN-hq.png",
  "ŠK Šenkvice": "/images/timy/SEN-hq.png",
  "HK Zlaté Moravce": "/images/timy/logo-KPH-HOKO-1-Photoroom-32x18.webp",
  "HKM Nová Dubnica": "/images/timy/NOV-hq.png",
};

function T({ data, showClub = true }: { data: { year: string; level: string; venue: string; club?: string; result: string }[]; showClub?: boolean }) {
  return (
    <div className="overflow-x-auto mb-8">
      <table className="w-full text-sm" style={{ background: "#fff", borderRadius: "6px", border: "1px solid rgba(1,45,116,0.06)" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid rgba(1,45,116,0.08)" }}>
            <th className="px-3 py-3 text-left font-bold text-[#051937]" style={{ fontSize: "11px" }}>Rok</th>
            <th className="px-3 py-3 text-left font-bold text-[#051937]" style={{ fontSize: "11px" }}>Súťaž</th>
            <th className="px-3 py-3 text-left font-bold text-[#051937]" style={{ fontSize: "11px" }}>Miesto</th>
            {showClub && <th className="px-3 py-3 text-left font-bold text-[#051937]" style={{ fontSize: "11px" }}>Klub</th>}
            <th className="px-3 py-3 text-left font-bold text-[#051937]" style={{ fontSize: "11px" }}>Umiestnenie</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r, i) => (
            <tr key={i} style={{ borderBottom: "1px solid rgba(1,45,116,0.05)", background: rb(r.result) }}>
              <td className="px-3 py-2.5 font-bold text-[#051937]" style={{ fontSize: "12px" }}>{r.year}</td>
              <td className="px-3 py-2.5 text-[#64748b]" style={{ fontSize: "12px" }}>{r.level}</td>
              <td className="px-3 py-2.5 text-[#334155]" style={{ fontSize: "12px" }}>{r.venue}</td>
              {showClub && r.club && (
                <td className="px-3 py-2.5" style={{ fontSize: "12px" }}>
                  <div className="flex items-center gap-1.5">
                    {LOGOS[r.club] && <Image src={LOGOS[r.club]} alt="" width={16} height={16} className="object-contain" />}
                    <span className="text-[#051937] font-semibold">{r.club}</span>
                  </div>
                </td>
              )}
              <td className="px-3 py-2.5 font-bold" style={{ fontSize: "12px", color: rc(r.result) }}>{r.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const MH = [
  { year: "1994", level: "Trophy", venue: "Praha", club: "Lokomotíva Bratislava", result: "2." },
  { year: "1995", level: "Trophy", venue: "Edinburgh", club: "Lokomotíva Rača", result: "8." },
  { year: "1998", level: "Challenge I", venue: "Belehrad", club: "Lokomotíva Rača", result: "7." },
  { year: "1999", level: "Challenge I", venue: "Budapešť", club: "Lokomotíva Rača", result: "9." },
  { year: "2000", level: "Challenge I", venue: "Venlo", club: "Palma Šenkvice", result: "5." },
  { year: "2001", level: "Challenge I", venue: "Brusel", club: "Palma Šenkvice", result: "2." },
  { year: "2002", level: "Challenge I", venue: "Porto", club: "ŠKPH Šenkvice", result: "3." },
  { year: "2003", level: "Challenge I", venue: "Brusel", club: "Šenkvice", result: "3." },
  { year: "2004", level: "Challenge I", venue: "Loughborough", club: "Šenkvice", result: "4." },
  { year: "2005", level: "Challenge I", venue: "Budapešť", club: "KPH Rača", result: "4." },
  { year: "2006", level: "Challenge II", venue: "Praha", club: "SK Šenkvice", result: "3." },
  { year: "2007", level: "Challenge I", venue: "Budapešť", club: "SK Šenkvice", result: "3." },
  { year: "2008", level: "Challenge I", venue: "Vršac", club: "KPH Rača", result: "5." },
  { year: "2009", level: "Challenge I", venue: "Cambrai", club: "SK Šenkvice", result: "7." },
  { year: "2010", level: "Challenge II", venue: "Bratislava", club: "SK Šenkvice", result: "1." },
  { year: "2011", level: "Challenge I", venue: "Lousada", club: "SK Šenkvice", result: "4." },
  { year: "2012", level: "Challenge I", venue: "Padova", club: "SK Šenkvice", result: "3." },
  { year: "2013", level: "Challenge I", venue: "Budapešť", club: "SK Šenkvice", result: "4." },
  { year: "2014", level: "Challenge I", venue: "Praha", club: "SK Šenkvice", result: "3." },
  { year: "2015", level: "Challenge I", venue: "Rotterdam", club: "SK Šenkvice", result: "4." },
  { year: "2016", level: "Challenge I", venue: "Varna", club: "SK Šenkvice", result: "3." },
  { year: "2017", level: "Challenge I", venue: "Budapešť", club: "SK Šenkvice", result: "4." },
  { year: "2018", level: "Challenge I", venue: "Praha", club: "SK Šenkvice", result: "5." },
  { year: "2019", level: "Challenge I", venue: "Oslo", club: "SK Šenkvice", result: "8. (zostup)" },
  { year: "2020", level: "Challenge II", venue: "Bratislava", club: "KPH Rača", result: "1. (postup)" },
  { year: "2022", level: "Challenge I", venue: "Puconci", club: "KPH Rača", result: "5." },
  { year: "2023", level: "Challenge I", venue: "Lousada", club: "KPH Rača", result: "3." },
  { year: "2024", level: "Challenge I", venue: "Ferrara", club: "KPH Rača", result: "1. (postup do Trophy)" },
  { year: "2025", level: "Trophy", venue: "Budapešť", club: "KPH Rača", result: "7. (zostup)" },
  { year: "2026", level: "Challenge I", venue: "Sofia", club: "KPH Rača", result: "3." },
];

const MV = [
  { year: "1995", level: "Challenge I", venue: "Bratislava", club: "Mazda Bratislava", result: "5." },
  { year: "1996", level: "Challenge I", venue: "Viedeň", club: "Mazda Bratislava", result: "7." },
  { year: "2006", level: "Challenge II", venue: "Atény", club: "KPH Rača", result: "1., postup" },
  { year: "2007", level: "Challenge I", venue: "Rím", club: "KPH Rača", result: "7." },
  { year: "2008", level: "Challenge III", venue: "Bratislava", club: "KPH Rača", result: "3." },
  { year: "2009", level: "Challenge III", venue: "Bratislava", club: "KPH Rača", result: "1., postup" },
  { year: "2010", level: "Challenge IV", venue: "Albena", club: "SK Šenkvice", result: "2." },
  { year: "2012a", level: "Challenge III", venue: "Bratislava", club: "KPH Rača", result: "1., postup" },
  { year: "2012b", level: "Challenge III", venue: "Bratislava", club: "SK Šenkvice", result: "3." },
  { year: "2013a", level: "Challenge III", venue: "Bratislava", club: "SK Šenkvice", result: "1., postup" },
  { year: "2013b", level: "Challenge II", venue: "Atény", club: "KPH Rača", result: "7." },
  { year: "2014a", level: "Challenge II", venue: "Slagelse", club: "SK Šenkvice", result: "3." },
  { year: "2014b", level: "Challenge III", venue: "Bratislava", club: "KPH Rača", result: "3." },
  { year: "2015", level: "Challenge II", venue: "Lousada", club: "SK Šenkvice", result: "6." },
  { year: "2016", level: "Challenge II", venue: "Bratislava", club: "SK Šenkvice", result: "5." },
  { year: "2017", level: "Challenge II", venue: "Gibraltár", club: "KPH Rača", result: "6." },
  { year: "2018", level: "Challenge II", venue: "Lipovci", club: "KPH Rača", result: "5." },
  { year: "2019", level: "Challenge II", venue: "Praha", club: "KPH Rača", result: "1., postup" },
];

const ZH = [
  { year: "1992", level: "Trophy", venue: "Viedeň", club: "Lokomotíva Bratislava", result: "4." },
  { year: "1993", level: "Trophy", venue: "Zürich", club: "Lokomotíva Rača", result: "5." },
  { year: "1994", level: "Trophy", venue: "Bratislava", club: "Lokomotíva Rača", result: "3." },
  { year: "1995", level: "Trophy", venue: "Mödling", club: "Lokomotíva Rača", result: "2." },
  { year: "1996", level: "Club Cup", venue: "Bratislava", club: "Lokomotíva Rača", result: "6." },
  { year: "1997", level: "Club Cup", venue: "Amiens", club: "Lokomotíva Rača", result: "7." },
  { year: "1998", level: "Trophy", venue: "Mödling", club: "Lokomotíva Rača", result: "1." },
  { year: "1999", level: "Club Cup", venue: "Glasgow", club: "Lokomotíva Rača", result: "8." },
  { year: "2000", level: "Trophy", venue: "Wiener Neudorf", club: "KPH Rača", result: "6." },
  { year: "2001", level: "Trophy", venue: "Rotterdam", club: "KPH Rača", result: "7." },
  { year: "2002", level: "Trophy", venue: "Opole", club: "KPH Rača", result: "8." },
  { year: "2003", level: "Challenge I", venue: "Olcote", club: "KPH Rača", result: "1." },
  { year: "2004", level: "Trophy", venue: "Wettingen", club: "KPH Rača", result: "8." },
  { year: "2005", level: "Challenge I", venue: "Verona", club: "KPH Rača", result: "2." },
  { year: "2006", level: "Challenge I", venue: "Bratislava", club: "KPH Rača", result: "2." },
  { year: "2007", level: "Trophy", venue: "Praha", club: "KPH Rača", result: "7." },
  { year: "2011", level: "Challenge I", venue: "Bratislava", club: "KPH Rača", result: "3." },
  { year: "2018", level: "Challenge I", venue: "Murska Sobota", club: "KPH Rača", result: "7." },
  { year: "2019", level: "Challenge I", venue: "Douai", club: "KPH Rača", result: "6." },
  { year: "2020", level: "Challenge I", venue: "Porto", club: "KPH Rača", result: "7." },
  { year: "2022", level: "Challenge I", venue: "Sv. Ivan Zelina", club: "KPH Rača", result: "4." },
  { year: "2023", level: "Trophy", venue: "Cambrai", club: "KPH Rača", result: "6." },
  { year: "2024", level: "Trophy", venue: "Skierniewice", club: "KPH Rača", result: "6." },
  { year: "2025", level: "Challenge I", venue: "Viedeň", club: "KPH Rača", result: "4." },
  { year: "2026", level: "Challenge I", venue: "Tbilisi", club: "KPH Rača", result: "3." },
];

const ZV = [
  { year: "1994", level: "Trophy", venue: "Bratislava", club: "Lokomotíva Rača", result: "5." },
  { year: "1995", level: "Trophy", venue: "San Sebastián", club: "Lokomotíva Rača", result: "4." },
  { year: "1996", level: "Trophy", venue: "Praha", club: "Lokomotíva Rača", result: "5." },
  { year: "1997", level: "Trophy", venue: "Catania", club: "Lokomotíva Rača", result: "7." },
  { year: "1998", level: "Challenge I", venue: "Gibraltár", club: "Lokomotíva Rača", result: "1." },
  { year: "1999", level: "Trophy", venue: "Miláno", club: "Lokomotíva Rača", result: "7." },
  { year: "2000", level: "Challenge I", venue: "Wettingen", club: "Lokomotíva Rača", result: "5." },
  { year: "2003", level: "Challenge I", venue: "Moravské Toplice", club: "Lokomotíva Rača", result: "5." },
  { year: "2006", level: "Challenge I", venue: "Atény", club: "KPH Rača", result: "5." },
  { year: "2007", level: "Challenge I", venue: "Záhreb", club: "KPH Rača", result: "5." },
  { year: "2008", level: "Challenge I", venue: "Viedeň", club: "KPH Rača", result: "5." },
  { year: "2009", level: "Challenge I", venue: "Viedeň", club: "HK Zlaté Moravce", result: "3." },
  { year: "2010a", level: "Challenge II", venue: "Wels", club: "HKM Nová Dubnica", result: "7." },
  { year: "2010b", level: "Challenge III", venue: "Bratislava", club: "KPH Rača", result: "5." },
  { year: "2011", level: "Challenge III", venue: "Moravské Toplice", club: "KPH Rača", result: "3." },
  { year: "2014", level: "Challenge III", venue: "Viedeň", club: "KPH Rača", result: "5." },
];

function PEMTabs() {
  const [active, setActive] = useState("Muži - halový");
  const tabs = ["Muži - halový", "Muži - vonkajší", "Ženy - halový", "Ženy - vonkajší"];
  const tabData: Record<string, any[]> = {
    "Muži - halový": [...MH].reverse(),
    "Muži - vonkajší": [...MV].reverse().map(r => ({ ...r, year: r.year.replace(/[ab]$/, "") })),
    "Ženy - halový": [...ZH].reverse(),
    "Ženy - vonkajší": [...ZV].reverse().map(r => ({ ...r, year: r.year.replace(/[ab]$/, "") })),
  };
  return (
    <>
      <div className="flex items-center gap-2 mb-8 flex-wrap">
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActive(tab)}
            className="px-5 py-2.5 font-bold uppercase transition-all"
            style={{ fontSize: "11px", letterSpacing: "0.08em", background: active === tab ? "#012d74" : "transparent", color: active === tab ? "#fff" : "#64748b", border: active === tab ? "1px solid #012d74" : "1px solid rgba(1,45,116,0.12)", borderRadius: "24px" }}>
            {tab}
          </button>
        ))}
      </div>
      <T data={tabData[active]} />
    </>
  );
}

export default function PEMPage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[1000px] mx-auto">
          <Link href="/sutaze" className="inline-flex items-center gap-2 font-bold text-white hover:text-white transition-colors mb-6" style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}><svg className="h-3 w-3 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>Späť</Link>
          <span className="font-bold uppercase text-white mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>Súťaže</span>
          <div className="flex items-center gap-4 mb-2">
            <Image src="/images/logo-eurohockey-white.webp" alt="EuroHockey" width={60} height={50} className="object-contain" />
          </div>
          <h1 className="font-garet font-bold italic text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            EuroHockey Club Championships
          </h1>
          <p className="text-white mt-3 max-w-xl" style={{ fontSize: "15px" }}>
            Kompletný prehľad výsledkov slovenských klubov na európskych klubových šampionátoch od roku 1992. Slovenské kluby reprezentujú krajinu v halovom aj vonkajšom pozemnom hokeji na úrovni Challenge, Trophy aj Club Cup.
          </p>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-6 pt-12">
        <PEMTabs />

        {/* Zaujímavosti */}
        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>Historické zaujímavosti</h2>
        <div className="space-y-3 mb-8">
          <div className="p-5" style={{ borderRadius: "6px", background: "linear-gradient(135deg, #051937 0%, #012d74 100%)" }}>
            <h3 className="font-bold text-white mb-1" style={{ fontSize: "14px" }}>Lokomotíva Rača — majstri Československa</h3>
            <p className="text-white/80" style={{ fontSize: "13px", lineHeight: 1.7 }}>
              Muži Lokomotívy Rača boli majstrami Československa v rokoch 1981 a 1986.
            </p>
          </div>
          <div className="rounded-lg p-5" style={{ background: "rgba(0,120,253,0.04)", border: "1px solid rgba(0,120,253,0.1)" }}>
            <p className="text-[#334155]" style={{ fontSize: "13px", lineHeight: 1.7 }}>
              V roku 2019 bola brankárka KPH Rača <strong>Daniela Šutovská</strong> vyhlásená za najlepšiu brankárku turnaja EuroHockey Indoor Club Challenge I vo francúzskom Douai.
            </p>
          </div>
          <div className="rounded-lg p-5" style={{ background: "rgba(0,120,253,0.04)", border: "1px solid rgba(0,120,253,0.1)" }}>
            <p className="text-[#334155]" style={{ fontSize: "13px", lineHeight: 1.7 }}>
              Ženy Lokomotívy Rača sa v rokoch 1996, 1997 a 1999 zúčastnili najvyššej úrovne — <strong>Club Cup</strong> (predchodca dnešnej EHL). Ide o historicky najvyššiu klubovú účasť slovenského tímu na európskej scéne.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <Link href="/pozemny-hokej/historia" className="text-[#012d74] hover:underline font-bold" style={{ fontSize: "14px" }}>
            &#8592; História pozemného hokeja na Slovensku
          </Link>
        </div>
      </div>
    </article>
  );
}
