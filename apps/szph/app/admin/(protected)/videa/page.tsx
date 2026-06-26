import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@szph/db/client";
import { getAllVideosAdmin } from "@szph/db";
import { GlassCard, formatDate } from "@szph/ui";
import { VideoAdminActions } from "./VideoAdminActions";
import { AddVideoForm } from "./AddVideoForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Videá" };

export default async function AdminVideaPage() {
  const cookieStore = await cookies();
  const supabase = createServerSupabaseClient(cookieStore);
  const videos = await getAllVideosAdmin(supabase, { limit: 50 }).catch(() => []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-garet text-2xl font-bold text-white">Videá</h1>
          <p className="text-sm text-white/40 mt-1">{videos.length} videí</p>
        </div>
      </div>

      {/* Formulár na pridanie videa */}
      <GlassCard className="p-6" hover={false}>
        <h2 className="font-garet font-bold text-white mb-4">Pridať video</h2>
        <AddVideoForm />
      </GlassCard>

      {/* Zoznam videí */}
      <GlassCard hover={false} className="overflow-hidden">
        {videos.length === 0 ? (
          <div className="py-12 text-center text-white/40">Žiadne videá</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-5 py-3 text-left text-[10px] uppercase tracking-wider text-white/40">Názov</th>
                <th className="hidden px-4 py-3 text-left text-[10px] uppercase tracking-wider text-white/40 md:table-cell">Viditeľnosť</th>
                <th className="px-4 py-3 text-center text-[10px] uppercase tracking-wider text-white/40">Stav</th>
                <th className="px-4 py-3 text-right text-[10px] uppercase tracking-wider text-white/40">Akcie</th>
              </tr>
            </thead>
            <tbody>
              {videos.map((video) => (
                <tr key={video.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-white line-clamp-1">{video.title}</p>
                    {video.youtube_url && (
                      <a href={video.youtube_url} target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--sky)] hover:underline truncate block max-w-xs">
                        {video.youtube_url}
                      </a>
                    )}
                  </td>
                  <td className="hidden px-4 py-4 text-xs text-white/50 md:table-cell">{video.visible_on}</td>
                  <td className="px-4 py-4 text-center">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${video.status === "published" ? "bg-emerald-500/20 text-emerald-400" : "bg-white/10 text-white/40"}`}>
                      {video.status === "published" ? "Pub." : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <VideoAdminActions video={video} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </GlassCard>
    </div>
  );
}
