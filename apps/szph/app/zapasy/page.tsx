import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@szph/db/client";
import { getUpcomingMatches, getAllCompetitions } from "@szph/db";
import { MatchCenter } from "@szph/ui";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zápasy",
  description: "Výsledky, rozpis a tabuľky súťaží SZPH.",
};

export default async function SzphZapasyPage() {
  const cookieStore = await cookies();
  const supabase = createServerSupabaseClient(cookieStore);
  const [matches, competitions] = await Promise.all([
    getUpcomingMatches(supabase, { site: "szph", limit: 50 }).catch(() => []),
    getAllCompetitions(supabase).catch(() => []),
  ]);

  return (
    <div className="container-szph pt-28 pb-20">
      <MatchCenter competitions={competitions} matches={matches} />
    </div>
  );
}
