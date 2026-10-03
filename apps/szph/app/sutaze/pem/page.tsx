import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PEM — EuroHockey Club Championships",
  description: "Výsledky slovenských klubov na európskych klubových šampionátoch v pozemnom hokeji.",
};

function resultColor(r: string) { return r.includes("1.") ? "#D4A017" : r.includes("2.") ? "#8a8a8a" : r.includes("3.") ? "#CD7F32" : "#334155"; }
function resultBg(r: string) { return r.includes("1.") ? "rgba(212,160,23,0.08)" : r.includes("2.") ? "rgba(138,138,138,0.06)" : r.includes("3.") ? "rgba(205,127,50,0.06)" : "transparent"; }

const MUZI_HALA = [
  { year: "2015", level: "Challenge I", venue: "Rotterdam (NED)", club: "ŠK Šenkvice", logo: "/images/timy/SEN.webp", result: "4." },
  { year: "2016", level: "Challenge I", venue: "Varna (BUL)", club: "ŠK Šenkvice", logo: "/images/timy/SEN.webp", result: "3." },
  { year: "2017", level: "Challenge I", venue: "Budapešť (HUN)", club: "ŠK Šenkvice", logo: "/images/timy/SEN.webp", result: "4." },
  { year: "2018", level: "Challenge I", venue: "Praha (CZE)", club: "ŠK Šenkvice", logo: "/images/timy/SEN.webp", result: "5." },
  { year: "2019", level: "Challenge I", venue: "Oslo (NOR)", club: "ŠK Šenkvice", logo: "/images/timy/SEN.webp", result: "8. (zostup)" },
  { year: "2020", level: "Challenge II", venue: "Bratislava (SVK)", club: "KPH Rača", logo: "/images/timy/Raca-logo-70x58-1-32x27.webp", result: "1. (postup)" },
  { year: "2022", level: "Challenge I", venue: "Puconci (SLO)", club: "KPH Rača", logo: "/images/timy/Raca-logo-70x58-1-32x27.webp", result: "5." },
  { year: "2023", level: "Challenge I", venue: "Lousada (POR)", club: "KPH Rača", logo: "/images/timy/Raca-logo-70x58-1-32x27.webp", result: "3." },
  { year: "2024", level: "Challenge I", venue: "Ferrara (ITA)", club: "KPH Rača", logo: "/images/timy/Raca-logo-70x58-1-32x27.webp", result: "1. (postup do Trophy)" },
  { year: "2025", level: "Trophy", venue: "Budapešť (HUN)", club: "KPH Rača", logo: "/images/timy/Raca-logo-70x58-1-32x27.webp", result: "7. (zostup)" },
  { year: "2026", level: "Challenge I", venue: "Sofia (BUL)", club: "KPH Rača", logo: "/images/timy/Raca-logo-70x58-1-32x27.webp", result: "3." },
];

const MUZI_VONKU = [
  { year: "2015", level: "Challenge II", venue: "Lousada (POR)", club: "ŠK Šenkvice", logo: "/images/timy/SEN.webp", result: "6." },
  { year: "2016", level: "Challenge II", venue: "Bratislava (SVK)", club: "ŠK Šenkvice", logo: "/images/timy/SEN.webp", result: "5." },
  { year: "2018", level: "Challenge II", venue: "Lipovci (SLO)", club: "KPH Rača", logo: "/images/timy/Raca-logo-70x58-1-32x27.webp", result: "3. v skupine B" },
  { year: "2019", level: "Challenge II", venue: "Praha (CZE)", club: "KPH Rača", logo: "/images/timy/Raca-logo-70x58-1-32x27.webp", result: "2. v skupine A" },
];

const ZENY_HALA = [
  { year: "2018", level: "Challenge I", venue: "Murska Sobota (SLO)", result: "7." },
  { year: "2019", level: "Challenge I", venue: "Douai (FRA)", result: "6." },
  { year: "2020", level: "Challenge I", venue: "Porto (POR)", result: "7." },
  { year: "2022", level: "Challenge I", venue: "Sveti Ivan Zelina (CRO)", result: "4." },
  { year: "2025", level: "Challenge I", venue: "Viedeň (AUT)", result: "4." },
  { year: "2026", level: "Challenge I", venue: "Tbilisi (GEO)", result: "3." },
];

function PEMTable({ data, showClub = true }: { data: typeof MUZI_HALA; showClub?: boolean }) {
  return (
    <div className="overflow-x-auto mb-8">
      <table className="w-full text-sm" style={{ background: "#fff", borderRadius: "6px", border: "1px solid rgba(1,45,116,0.06)" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid rgba(1,45,116,0.08)" }}>
            <th className="px-4 py-3 text-left font-bold text-[#051937]" style={{ fontSize: "11px" }}>Rok</th>
            <th className="px-4 py-3 text-left font-bold text-[#051937]" style={{ fontSize: "11px" }}>Súťaž</th>
            <th className="px-4 py-3 text-left font-bold text-[#051937]" style={{ fontSize: "11px" }}>Miesto</th>
            {showClub && <th className="px-4 py-3 text-left font-bold text-[#051937]" style={{ fontSize: "11px" }}>Klub</th>}
            <th className="px-4 py-3 text-left font-bold text-[#051937]" style={{ fontSize: "11px" }}>Umiestnenie</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r: any, i: number) => (
            <tr key={i} style={{ borderBottom: "1px solid rgba(1,45,116,0.05)", background: resultBg(r.result) }}>
              <td className="px-4 py-3 font-bold text-[#051937]" style={{ fontSize: "13px" }}>{r.year}</td>
              <td className="px-4 py-3 text-[#64748b]" style={{ fontSize: "13px" }}>{r.level}</td>
              <td className="px-4 py-3 text-[#334155]" style={{ fontSize: "13px" }}>{r.venue}</td>
              {showClub && (
                <td className="px-4 py-3" style={{ fontSize: "13px" }}>
                  <div className="flex items-center gap-2">
                    {r.logo && <Image src={r.logo} alt={r.club} width={20} height={20} className="object-contain" />}
                    <span className="text-[#051937] font-semibold">{r.club}</span>
                  </div>
                </td>
              )}
              <td className="px-4 py-3 font-bold" style={{ fontSize: "13px", color: resultColor(r.result) }}>{r.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PEMPage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span className="font-bold uppercase text-white mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>Súťaže</span>
          <h1 className="font-garet font-bold italic text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            EuroHockey Club Championships
          </h1>
          <p className="text-white mt-3 max-w-xl" style={{ fontSize: "15px" }}>
            Prehľad výsledkov slovenských klubov na európskych klubových šampionátoch v pozemnom a halovom hokeji.
          </p>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 pt-12">
        {/* Muži hala */}
        <h2 className="font-bold text-[#051937] mb-6" style={{ fontSize: "24px" }}>Muži — halový PEM</h2>
        <PEMTable data={MUZI_HALA} />

        {/* Muži vonku */}
        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>Muži — vonkajší PEM</h2>
        <PEMTable data={MUZI_VONKU} />

        {/* Ženy hala */}
        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>Ženy — halový PEM</h2>
        <div className="flex items-center gap-3 mb-4">
          <Image src="/images/timy/Raca-logo-70x58-1-32x27.webp" alt="KPH Rača" width={28} height={28} className="object-contain" />
          <span className="font-semibold text-[#051937]" style={{ fontSize: "14px" }}>KPH Rača</span>
        </div>
        <PEMTable data={ZENY_HALA} showClub={false} />

        {/* Historické výsledky */}
        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>Historické výsledky</h2>
        <div className="space-y-3 mb-8">
          <div className="p-5 bg-white" style={{ borderRadius: "6px", border: "1px solid rgba(1,45,116,0.06)" }}>
            <div className="flex items-center gap-2 mb-2">
              <Image src="/images/timy/Raca-logo-70x58-1-32x27.webp" alt="Rača" width={20} height={20} className="object-contain" />
              <h3 className="font-bold text-[#051937]" style={{ fontSize: "14px" }}>Lokomotíva Rača — ženy, vonkajší Club Trophy 1995</h3>
            </div>
            <p className="text-[#334155]" style={{ fontSize: "13px", lineHeight: 1.7 }}>
              Na vonkajšom Club Trophy žien v roku 1995 skončila Lokomotíva Rača na 4. mieste. Turnaj vyhral CA San Sebastián pred Wiener AC, tretí bol Donc Volgodonsk. Club Trophy žien sa konal aj v roku 1994 priamo v Bratislave.
            </p>
          </div>
          <div className="p-5 bg-white" style={{ borderRadius: "6px", border: "1px solid rgba(1,45,116,0.06)" }}>
            <div className="flex items-center gap-2 mb-2">
              <Image src="/images/timy/Raca-logo-70x58-1-32x27.webp" alt="Rača" width={20} height={20} className="object-contain" />
              <h3 className="font-bold text-[#051937]" style={{ fontSize: "14px" }}>Lokomotíva Rača — muži, halový Trophy 1995 (Edinburgh)</h3>
            </div>
            <p className="text-[#334155]" style={{ fontSize: "13px", lineHeight: 1.7 }}>
              Mužský tím Lokomotívy Rača sa zúčastnil halového Club Trophy v roku 1995 v Edinburghu.
            </p>
          </div>
          <div className="p-5 bg-white" style={{ borderRadius: "6px", border: "1px solid rgba(1,45,116,0.06)" }}>
            <div className="flex items-center gap-2 mb-2">
              <Image src="/images/timy/SEN.webp" alt="Šenkvice" width={20} height={20} className="object-contain" />
              <h3 className="font-bold text-[#051937]" style={{ fontSize: "14px" }}>ŠK Šenkvice — halový PEM C-divízia</h3>
            </div>
            <p className="text-[#334155]" style={{ fontSize: "13px", lineHeight: 1.7 }}>
              ŠK Šenkvice sa zúčastnili halového PEM v C-divízii.
            </p>
          </div>
          <div className="p-5" style={{ borderRadius: "6px", background: "linear-gradient(135deg, #051937 0%, #012d74 100%)" }}>
            <div className="flex items-center gap-2 mb-2">
              <Image src="/images/timy/Raca-logo-70x58-1-32x27.webp" alt="Rača" width={20} height={20} className="object-contain" />
              <h3 className="font-bold text-white" style={{ fontSize: "14px" }}>Lokomotíva Rača — majstri Československa</h3>
            </div>
            <p className="text-white/80" style={{ fontSize: "13px", lineHeight: 1.7 }}>
              Muži Lokomotívy Rača boli majstrami Československa v rokoch 1981 a 1986.
            </p>
          </div>
        </div>

        {/* Poznámky */}
        <div className="rounded-lg p-5" style={{ background: "rgba(0,120,253,0.04)", border: "1px solid rgba(0,120,253,0.1)" }}>
          <p className="text-[#334155]" style={{ fontSize: "13px", lineHeight: 1.7 }}>
            V roku 2019 bola brankárka KPH Rača <strong>Daniela Šutovská</strong> vyhlásená za najlepšiu brankárku turnaja EuroHockey Indoor Club Challenge I vo francúzskom Douai.
          </p>
        </div>
      </div>
    </article>
  );
}
