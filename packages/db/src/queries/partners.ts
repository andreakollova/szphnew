import type { SupabaseClient } from "@supabase/supabase-js";
import type { Partner, PartnerTier } from "../types";

export async function getPartners(
  supabase: SupabaseClient,
  tier?: PartnerTier
): Promise<Partner[]> {
  let query = supabase
    .from("partners")
    .select("*")
    .order("sort_order", { ascending: true });

  if (tier) query = query.eq("tier", tier);

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as Partner[];
}

export async function createPartner(
  supabase: SupabaseClient,
  partner: Omit<Partner, "id" | "created_at">
): Promise<Partner> {
  const { data, error } = await supabase
    .from("partners")
    .insert(partner)
    .select()
    .single();
  if (error) throw error;
  return data as Partner;
}

export async function updatePartner(
  supabase: SupabaseClient,
  id: string,
  partner: Partial<Omit<Partner, "id" | "created_at">>
): Promise<Partner> {
  const { data, error } = await supabase
    .from("partners")
    .update(partner)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as Partner;
}

export async function deletePartner(
  supabase: SupabaseClient,
  id: string
): Promise<void> {
  const { error } = await supabase.from("partners").delete().eq("id", id);
  if (error) throw error;
}

export async function updatePartnersOrder(
  supabase: SupabaseClient,
  updates: Array<{ id: string; sort_order: number }>
): Promise<void> {
  await Promise.all(
    updates.map(({ id, sort_order }) =>
      supabase.from("partners").update({ sort_order }).eq("id", id)
    )
  );
}
