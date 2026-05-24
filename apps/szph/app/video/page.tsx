import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@szph/db/client";
import { getPublishedVideos } from "@szph/db";
import { VideoCard } from "@szph/ui";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Video" };

export default async function SzphVideoPage() {
  const cookieStore = await cookies();
  const supabase = createServerSupabaseClient(cookieStore);
  const videos = await getPublishedVideos(supabase, { site: "szph", limit: 24 }).catch(() => []);

  return (
    <div className="container-szph pt-28 pb-20">
      <div className="mb-12">
        <span className="label-wide text-[var(--sky)]">Multimedia</span>
        <h1 className="text-display text-white mt-2">Video</h1>
      </div>
      {videos.length === 0 ? (
        <div className="py-20 text-center text-white/40">Žiadne videá</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {videos.map((video, i) => (
            <VideoCard key={video.id} video={video} delay={i * 0.04} className="w-full" />
          ))}
        </div>
      )}
    </div>
  );
}
