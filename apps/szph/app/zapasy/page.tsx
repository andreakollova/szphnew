import { unstable_cache } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { MatchCenter } from "@szph/ui";
import { TournamentCarousel } from "./TournamentCarousel";
import { WeeklyMatches } from "./WeeklyMatches";
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

const TOURNAMENTS = [
  { league: "EuroHockey Indoor U21 II Men", team: "Slovensko U21", flag: "sk", venue: "Alanya (TUR)", date: "22.–24. januára 2027" },
  { league: "EuroHockey Indoor Club Challenge I Women", team: "KPH Rača", logo: "/images/timy/RAC.webp", venue: "Alanya (TUR)", date: "12.–14. februára 2027" },
  { league: "EuroHockey Indoor Club Challenge I Men", team: "KPH Rača", logo: "/images/timy/RAC.webp", venue: "Lousada (POR)", date: "19.–21. februára 2027" },
  { league: "EuroHockey U18 III Boys", team: "Slovensko U18 Boys", flag: "sk", venue: "Bratislava", date: "11.–17. júla 2027" },
  { league: "EuroHockey U18 III Girls", team: "Slovensko U18 Girls", flag: "sk", venue: "Sveti Ivan Zelina (CRO)", date: "12.–17. júla 2027" },
];

export default async function SzphZapasyPage() {
  const matches = await getMatches();

  return (
    <div style={{ background: "#f8f9fa", minHeight: "100vh" }}>
      <div className="px-4 sm:px-6 lg:px-10 xl:px-16 max-w-[1600px] mx-auto pt-8 pb-20">
        {/* Najbližšie turnaje — always first */}
        <TournamentCarousel tournaments={TOURNAMENTS} />

        <h1 className="font-garet font-bold italic text-[#051937] mb-5" style={{ fontSize: "clamp(1.4rem, 2.2vw, 2rem)", textTransform: "uppercase" }}>
          <span className="notranslate" data-en="Match Center">Zápasové centrum</span>
        </h1>

        {/* MatchCenter — all devices */}
        <MatchCenter matches={matches as any} pageSize={999} />
      </div>
    </div>
  );
}
