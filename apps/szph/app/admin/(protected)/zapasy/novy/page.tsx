import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@szph/db/client";
import { getAllTeams, getAllCompetitions } from "@szph/db";
import { MatchForm } from "../MatchForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Nový zápas" };

export default async function NovyZapaasPage() {
  const cookieStore = await cookies();
  const supabase = createServerSupabaseClient(cookieStore);

  const [teams, competitions] = await Promise.all([
    getAllTeams(supabase).catch(() => []),
    getAllCompetitions(supabase).catch(() => []),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-garet text-2xl font-bold text-white">Nový zápas</h1>
      </div>
      <MatchForm teams={teams} competitions={competitions} />
    </div>
  );
}
