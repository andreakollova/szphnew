import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { EditTeamForm } from "./EditTeamForm";
import type { Metadata } from "next";
import type { Team } from "@szph/db/types";

interface Props { params: Promise<{ id: string }> }

export const metadata: Metadata = { title: "Upraviť tím" };

function getSupabase() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
}

export default async function UpravitTimPage({ params }: Props) {
  const { id } = await params;
  const supabase = getSupabase();

  const { data: team, error } = await supabase
    .from("teams")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !team) notFound();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#051937]">Upraviť tím</h1>
      <EditTeamForm team={team as Team} />
    </div>
  );
}
