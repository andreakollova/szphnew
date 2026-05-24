import type { SupabaseClient } from "@supabase/supabase-js";
import type { Page, PageSite } from "../types";

export async function getPageBySlug(
  supabase: SupabaseClient,
  slug: string,
  site: PageSite
): Promise<Page | null> {
  const { data, error } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", slug)
    .eq("site", site)
    .eq("status", "published")
    .single();
  if (error) return null;
  return data as Page;
}

export async function getAllPagesAdmin(
  supabase: SupabaseClient,
  site?: PageSite
): Promise<Page[]> {
  let query = supabase
    .from("pages")
    .select("*")
    .order("created_at", { ascending: false });
  if (site) query = query.eq("site", site);
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as Page[];
}

export async function createPage(
  supabase: SupabaseClient,
  page: Omit<Page, "id" | "created_at" | "updated_at">
): Promise<Page> {
  const { data, error } = await supabase
    .from("pages")
    .insert(page)
    .select()
    .single();
  if (error) throw error;
  return data as Page;
}

export async function updatePage(
  supabase: SupabaseClient,
  id: string,
  page: Partial<Omit<Page, "id" | "created_at" | "updated_at">>
): Promise<Page> {
  const { data, error } = await supabase
    .from("pages")
    .update({ ...page, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as Page;
}

export async function deletePage(
  supabase: SupabaseClient,
  id: string
): Promise<void> {
  const { error } = await supabase.from("pages").delete().eq("id", id);
  if (error) throw error;
}
