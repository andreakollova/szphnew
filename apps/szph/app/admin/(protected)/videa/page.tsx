import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@szph/db/client";
import { getAllVideosAdmin } from "@szph/db";
import { formatDate } from "@szph/ui";
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
          <h1 className="text-2xl font-bold text-[#051937]">Videá</h1>
          <p className="text-sm text-[#64748b] mt-1">{videos.length} videí</p>
        </div>
      </div>

      {/* Formulár na pridanie videa */}
      <div className="rounded-2xl p-6" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
        <h2 className="font-bold text-[#051937] mb-4">Pridať video</h2>
        <AddVideoForm />
      </div>

      {/* Zoznam videí */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
        {videos.length === 0 ? (
          <div className="py-12 text-center text-[#64748b]">Žiadne videá</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[rgba(1,45,116,0.08)]">
                <th className="px-5 py-3 text-left text-[10px] uppercase tracking-wider text-[#64748b]">Názov</th>
                <th className="hidden px-4 py-3 text-left text-[10px] uppercase tracking-wider text-[#64748b] md:table-cell">Viditeľnosť</th>
                <th className="px-4 py-3 text-center text-[10px] uppercase tracking-wider text-[#64748b]">Stav</th>
                <th className="px-4 py-3 text-right text-[10px] uppercase tracking-wider text-[#64748b]">Akcie</th>
              </tr>
            </thead>
            <tbody>
              {videos.map((video) => (
                <tr key={video.id} className="border-b border-[rgba(1,45,116,0.08)] hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-[#051937] line-clamp-1">{video.title}</p>
                    {video.youtube_url && (
                      <a href={video.youtube_url} target="_blank" rel="noopener noreferrer" className="text-xs text-[#016fb4] hover:underline truncate block max-w-xs">
                        {video.youtube_url}
                      </a>
                    )}
                  </td>
                  <td className="hidden px-4 py-4 text-xs text-[#64748b] md:table-cell">{video.visible_on}</td>
                  <td className="px-4 py-4 text-center">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${video.status === "published" ? "bg-emerald-500/20 text-emerald-400" : "bg-gray-100 text-[#64748b]"}`}>
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
      </div>
    </div>
  );
}
