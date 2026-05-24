import type { SupabaseClient } from "@supabase/supabase-js";
import type { Team, TeamCategory, Competition } from "../types";

export async function getAllTeams(
  supabase: SupabaseClient,
  category?: TeamCategory
): Promise<Team[]> {
  let query = supabase
    .from("teams")
    .select("*")
    .order("name", { ascending: true });

  if (category) query = query.eq("category", category);

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as Team[];
}

export async function createTeam(
  supabase: SupabaseClient,
  team: Omit<Team, "id" | "created_at">
): Promise<Team> {
  const { data, error } = await supabase
    .from("teams")
    .insert(team)
    .select()
    .single();
  if (error) throw error;
  return data as Team;
}

export async function updateTeam(
  supabase: SupabaseClient,
  id: string,
  team: Partial<Omit<Team, "id" | "created_at">>
): Promise<Team> {
  const { data, error } = await supabase
    .from("teams")
    .update(team)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as Team;
}

export async function deleteTeam(
  supabase: SupabaseClient,
  id: string
): Promise<void> {
  const { error } = await supabase.from("teams").delete().eq("id", id);
  if (error) throw error;
}

export async function getAllCompetitions(
  supabase: SupabaseClient
): Promise<Competition[]> {
  const { data, error } = await supabase
    .from("competitions")
    .select("*")
    .order("name", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Competition[];
}

export async function createCompetition(
  supabase: SupabaseClient,
  competition: Omit<Competition, "id" | "created_at">
): Promise<Competition> {
  const { data, error } = await supabase
    .from("competitions")
    .insert(competition)
    .select()
    .single();
  if (error) throw error;
  return data as Competition;
}

export async function deleteCompetition(
  supabase: SupabaseClient,
  id: string
): Promise<void> {
  const { error } = await supabase.from("competitions").delete().eq("id", id);
  if (error) throw error;
}
