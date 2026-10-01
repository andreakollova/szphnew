import type { SupabaseClient } from "@supabase/supabase-js";
import type { Exercise } from "../types";

export async function getPublishedExercises(
  supabase: SupabaseClient,
  options: { limit?: number } = {}
): Promise<Exercise[]> {
  const { limit = 50 } = options;
  const { data, error } = await supabase
    .from("exercises")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as Exercise[];
}

export async function getExerciseBySlug(
  supabase: SupabaseClient,
  slug: string
): Promise<Exercise | null> {
  const { data, error } = await supabase
    .from("exercises")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) return null;
  return data as Exercise;
}

export async function getAllExercisesAdmin(
  supabase: SupabaseClient,
  options: { limit?: number; offset?: number } = {}
): Promise<Exercise[]> {
  const { limit = 50, offset = 0 } = options;
  const { data, error } = await supabase
    .from("exercises")
    .select("*")
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);
  if (error) throw error;
  return (data ?? []) as Exercise[];
}

export async function createExercise(
  supabase: SupabaseClient,
  exercise: Omit<Exercise, "id" | "created_at" | "updated_at">
): Promise<Exercise> {
  const { data, error } = await supabase
    .from("exercises")
    .insert(exercise)
    .select()
    .single();
  if (error) throw error;
  return data as Exercise;
}

export async function updateExercise(
  supabase: SupabaseClient,
  id: string,
  exercise: Partial<Omit<Exercise, "id" | "created_at">>
): Promise<Exercise> {
  const { data, error } = await supabase
    .from("exercises")
    .update({ ...exercise, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as Exercise;
}

export async function deleteExercise(
  supabase: SupabaseClient,
  id: string
): Promise<void> {
  const { error } = await supabase.from("exercises").delete().eq("id", id);
  if (error) throw error;
}
