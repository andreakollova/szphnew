import type { SupabaseClient } from "@supabase/supabase-js";
import type { Article, ArticleCategory, VisibleOn, Status } from "../types";

export async function getPublishedArticles(
  supabase: SupabaseClient,
  options: {
    site?: VisibleOn;
    category?: ArticleCategory;
    limit?: number;
    offset?: number;
  } = {}
): Promise<Article[]> {
  const { site, category, limit = 12, offset = 0 } = options;

  let query = supabase
    .from("articles")
    .select("*, author:profiles(id, email, full_name, avatar_url)")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (site && site !== "both") {
    query = query.in("visible_on", [site, "both"]);
  }
  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as Article[];
}

export async function getArticleBySlug(
  supabase: SupabaseClient,
  slug: string
): Promise<Article | null> {
  const { data, error } = await supabase
    .from("articles")
    .select("*, author:profiles(id, email, full_name, avatar_url)")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) return null;
  return data as Article;
}

export async function getAllArticlesAdmin(
  supabase: SupabaseClient,
  options: { status?: Status; limit?: number; offset?: number } = {}
): Promise<Article[]> {
  const { status, limit = 50, offset = 0 } = options;

  let query = supabase
    .from("articles")
    .select("*, author:profiles(id, email, full_name)")
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (status) query = query.eq("status", status);

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as Article[];
}

export async function createArticle(
  supabase: SupabaseClient,
  article: Omit<Article, "id" | "created_at" | "updated_at">
): Promise<Article> {
  const { data, error } = await supabase
    .from("articles")
    .insert(article)
    .select()
    .single();
  if (error) throw error;
  return data as Article;
}

export async function updateArticle(
  supabase: SupabaseClient,
  id: string,
  article: Partial<Omit<Article, "id" | "created_at" | "updated_at">>
): Promise<Article> {
  const { data, error } = await supabase
    .from("articles")
    .update({ ...article, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as Article;
}

export async function deleteArticle(
  supabase: SupabaseClient,
  id: string
): Promise<void> {
  const { error } = await supabase.from("articles").delete().eq("id", id);
  if (error) throw error;
}
