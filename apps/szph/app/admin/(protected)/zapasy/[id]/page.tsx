import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@szph/db/client";
import { getAllTeams, getAllCompetitions } from "@szph/db";
import { notFound } from "next/navigation";
import { MatchForm } from "../MatchForm";
import type { Metadata } from "next";

interface Props { params: Promise<{ id: string }> }

export const metadata: Metadata = { title: "Upraviť zápas" };

export default async function UpravitZapasPage({ params }: Props) {
  const { id } = await params;
  const cookieStore = await cookies();
  const supabase = createServerSupabaseClient(cookieStore);

  const [{ data: match }, teams, competitions] = await Promise.all([
    supabase.from("matches").select("*").eq("id", id).single(),
    getAllTeams(supabase).catch(() => []),
    getAllCompetitions(supabase).catch(() => []),
  ]);

  if (!match) notFound();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#051937]">Upraviť zápas</h1>
      <MatchForm match={match as any} teams={teams} competitions={competitions} />
    </div>
  );
}
