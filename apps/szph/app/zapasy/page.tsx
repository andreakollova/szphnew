import { unstable_cache } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { MatchCenter } from "@szph/ui";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zápasy",
  description: "Výsledky, rozpis a tabuľky súťaží SZPH.",
};

const getMatches = unstable_cache(
  async () => {
    const sb = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data } = await sb
      .from("matches")
      .select("*")
      .eq("site", "szph")
      .order("date", { ascending: false })
      .limit(500);
    return data ?? [];
  },
  ["zapasy-all"],
  { revalidate: 300 }
);

export default async function SzphZapasyPage() {
  const matches = await getMatches();

  // Upcoming tournaments
  const upcoming = matches.filter((m: any) => m.status === "scheduled" && m.league?.includes("EuroHockey")).sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div style={{ background: "#f8f9fa", minHeight: "100vh" }}>
      <div className="px-6 lg:px-10 xl:px-16 max-w-[1600px] mx-auto pt-8 pb-20">
        <h1 className="font-garet font-bold italic text-[#051937] mb-8" style={{ fontSize: "clamp(1.4rem, 2.2vw, 2rem)", textTransform: "uppercase" }}>
          Zápasové centrum
        </h1>

        {/* Najbližšie turnaje */}
        <div className="mb-10">
          <h2 className="font-garet font-bold italic text-[#051937] mb-4" style={{ fontSize: "14px", letterSpacing: "0.05em", textTransform: "uppercase" }}>
            Najbližšie turnaje
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
            {[
              { league: "EuroHockey Indoor U21 II Men", team: "Slovensko U21", flag: "sk", venue: "Alanya (TUR)", date: "22.–24. januára 2027" },
              { league: "EuroHockey Indoor Club Challenge I Women", team: "KPH Rača", logo: "/images/timy/RAC.png", venue: "Alanya (TUR)", date: "12.–14. februára 2027" },
              { league: "EuroHockey Indoor Club Challenge I Men", team: "KPH Rača", logo: "/images/timy/RAC.png", venue: "Lousada (POR)", date: "19.–21. februára 2027" },
              { league: "EuroHockey U18 III Boys", team: "Slovensko U18 Boys", flag: "sk", venue: "Bratislava", date: "11.–17. júla 2027" },
              { league: "EuroHockey U18 III Girls", team: "Slovensko U18 Girls", flag: "sk", venue: "Sveti Ivan Zelina (CRO)", date: "12.–17. júla 2027" },
            ].map((t: any, i: number) => (
              <div key={i} className="bg-white px-5 py-4 flex flex-col gap-2" style={{ borderRadius: "6px", border: "1px solid rgba(1,45,116,0.06)" }}>
                <span className="font-bold uppercase text-[#012d74]" style={{ fontSize: "8px", letterSpacing: "0.1em" }}>{t.league}</span>
                <div className="flex items-center gap-2">
                  {t.flag ? (
                    <div className="shrink-0 overflow-hidden rounded-full" style={{ width: 22, height: 22 }}>
                      <img src={`https://flagcdn.com/w40/${t.flag}.png`} alt="" width={22} height={22} style={{ width: 22, height: 22, objectFit: "cover" }} />
                    </div>
                  ) : t.logo ? (
                    <div className="shrink-0" style={{ width: 22, height: 22 }}>
                      <img src={t.logo} alt="" width={22} height={22} style={{ width: 22, height: 22, objectFit: "contain" }} />
                    </div>
                  ) : null}
                  <span className="font-bold text-[#051937]" style={{ fontSize: "12px" }}>{t.team}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#64748b]">
                  <svg className="h-3 w-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <span className="font-bold" style={{ fontSize: "9px" }}>{t.venue}</span>
                </div>
                <span className="font-bold text-[#64748b]" style={{ fontSize: "9px" }}>{t.date}</span>
                <span className="text-[#64748b] italic" style={{ fontSize: "8px" }}>Rozpis zápasov zatiaľ nie je k dispozícii</span>
              </div>
            ))}
          </div>
        </div>

        {/* MatchCenter s prepínačmi */}
        <MatchCenter matches={matches as any} />
      </div>
    </div>
  );
}
