"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@szph/db/client";
import type { Video } from "@szph/db/types";

export function VideoAdminActions({ video }: { video: Video }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();

  async function toggleStatus() {
    setLoading(true);
    const newStatus = video.status === "published" ? "draft" : "published";
    await supabase.from("videos").update({
      status: newStatus,
      published_at: newStatus === "published" ? new Date().toISOString() : null,
    }).eq("id", video.id);
    router.refresh();
    setLoading(false);
  }

  async function handleDelete() {
    if (!confirm("Naozaj zmazať toto video?")) return;
    setLoading(true);
    await supabase.from("videos").delete().eq("id", video.id);
    router.refresh();
  }

  return (
    <div className="flex items-center justify-end gap-2">
      <button
        onClick={toggleStatus}
        disabled={loading}
        className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/20 transition-colors disabled:opacity-50"
      >
        {video.status === "published" ? "Draft" : "Pub."}
      </button>
      <button
        onClick={handleDelete}
        disabled={loading}
        className="rounded-lg bg-red-500/20 px-3 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-500/30 transition-colors disabled:opacity-50"
      >
        Zmazať
      </button>
    </div>
  );
}
