import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { EditClubForm } from "./EditClubForm";
import type { Metadata } from "next";
import type { Club } from "@szph/db/types";

interface Props { params: Promise<{ id: string }> }

export const metadata: Metadata = { title: "Upravit klub" };

function getSupabase() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
}

export default async function UpravitKlubPage({ params }: Props) {
  const { id } = await params;
  const supabase = getSupabase();

  const { data: club, error } = await supabase
    .from("clubs")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !club) notFound();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#051937]">Upravit klub</h1>
      <EditClubForm club={club as Club} />
    </div>
  );
}
