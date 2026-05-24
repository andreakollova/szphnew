import type { SupabaseClient } from "@supabase/supabase-js";
import type { Video, VisibleOn } from "../types";

export async function getPublishedVideos(
  supabase: SupabaseClient,
  options: { site?: VisibleOn; limit?: number } = {}
): Promise<Video[]> {
  const { site, limit = 12 } = options;

  let query = supabase
    .from("videos")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(limit);

  if (site && site !== "both") {
    query = query.in("visible_on", [site, "both"]);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as Video[];
}

export async function getAllVideosAdmin(
  supabase: SupabaseClient,
  options: { limit?: number; offset?: number } = {}
): Promise<Video[]> {
  const { limit = 50, offset = 0 } = options;
  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);
  if (error) throw error;
  return (data ?? []) as Video[];
}

export async function createVideo(
  supabase: SupabaseClient,
  video: Omit<Video, "id" | "created_at">
): Promise<Video> {
  const { data, error } = await supabase
    .from("videos")
    .insert(video)
    .select()
    .single();
  if (error) throw error;
  return data as Video;
}

export async function updateVideo(
  supabase: SupabaseClient,
  id: string,
  video: Partial<Omit<Video, "id" | "created_at">>
): Promise<Video> {
  const { data, error } = await supabase
    .from("videos")
    .update(video)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as Video;
}

export async function deleteVideo(
  supabase: SupabaseClient,
  id: string
): Promise<void> {
  const { error } = await supabase.from("videos").delete().eq("id", id);
  if (error) throw error;
}

// Extrahuje YouTube thumbnail z URL
export function getYoutubeThumbnail(youtubeUrl: string): string {
  const match = youtubeUrl.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
  );
  if (match?.[1]) {
    return `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`;
  }
  return "";
}

// Extrahuje YouTube video ID
export function getYoutubeId(youtubeUrl: string): string | null {
  const match = youtubeUrl.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
  );
  return match?.[1] ?? null;
}
