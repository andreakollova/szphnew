import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@szph/db/client";
import { getAllTeams, getAllCompetitions } from "@szph/db";
import { notFound } from "next/navigation";
import { MatchForm } from "../MatchForm";
import type { Metadata } from "next";
import type { Match } from "@szph/db/types";

interface Props { params: Promise<{ id: string }> }

export const metadata: Metadata = { title: "Upraviť zápas" };

export default async function UpravitZapaasPage({ params }: Props) {
  const { id } = await params;
  const cookieStore = await cookies();
  const supabase = createServerSupabaseClient(cookieStore);

  const [matchRes, teams, competitions] = await Promise.all([
    supabase.from("matches").select("*, competition:competitions(*), home_team:teams!matches_home_team_id_fkey(*), away_team:teams!matches_away_team_id_fkey(*)").eq("id", id).single(),
    getAllTeams(supabase).catch(() => []),
    getAllCompetitions(supabase).catch(() => []),
  ]);

  if (!matchRes.data) notFound();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#051937]">Upraviť zápas</h1>
      <MatchForm match={matchRes.data as Match} teams={teams} competitions={competitions} />
    </div>
  );
}
