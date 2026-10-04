import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@szph/db/client";
import { getPageBySlug } from "@szph/db";
import type { Page } from "@szph/db";

/**
 * Checks Supabase for DB-managed content for a given slug.
 * Returns the Page if found and published, null otherwise.
 * Static pages call this to decide: render DB content or fallback to hardcoded.
 */
export async function getDbPageContent(slug: string): Promise<Page | null> {
  try {
    const cookieStore = await cookies();
    const supabase = createServerSupabaseClient(cookieStore);
    return await getPageBySlug(supabase, slug, "szph");
  } catch {
    return null;
  }
}
