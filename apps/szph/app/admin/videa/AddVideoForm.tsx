"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@szph/db/client";
import { getYoutubeThumbnail } from "@szph/db";

export function AddVideoForm() {
  const router = useRouter();
  const [saving, setSaving]     = useState(false);
  const [title, setTitle]       = useState("");
  const [youtubeUrl, setYoutube] = useState("");
  const [visible, setVisible]   = useState("both");
  const [status, setStatus]     = useState("published");
  const supabase = createBrowserSupabaseClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !youtubeUrl) return;
    setSaving(true);

    const thumbnail = getYoutubeThumbnail(youtubeUrl);
    await supabase.from("videos").insert({
      title,
      youtube_url: youtubeUrl,
      thumbnail_url: thumbnail || null,
      visible_on: visible,
      status,
      published_at: status === "published" ? new Date().toISOString() : null,
    });

    setTitle("");
    setYoutube("");
    router.refresh();
    setSaving(false);
  }

  const inputCls = "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[var(--sky)]/50 transition-all placeholder-white/25";
  const selectCls = "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white outline-none [&_option]:bg-[#020817]";
  const labelCls = "block text-[10px] font-semibold uppercase tracking-wider text-white/40 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <label className={labelCls}>Názov videa *</label>
        <input required value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls} placeholder="Highlights: Slovakia vs..." />
      </div>
      <div>
        <label className={labelCls}>YouTube URL *</label>
        <input required value={youtubeUrl} onChange={(e) => setYoutube(e.target.value)} className={inputCls} placeholder="https://youtube.com/watch?v=..." />
      </div>
      <div>
        <label className={labelCls}>Viditeľnosť</label>
        <select value={visible} onChange={(e) => setVisible(e.target.value)} className={selectCls}>
          <option value="both">Oba weby</option>
          <option value="fieldhockey">fieldhockey.sk</option>
          <option value="szph">szph.sk</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label className={labelCls}>Stav</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className={selectCls}>
          <option value="published">Publikovaný</option>
          <option value="draft">Draft</option>
        </select>
        <button type="submit" disabled={saving} className="mt-auto rounded-xl bg-[var(--sky)] py-2.5 text-sm font-bold text-white hover:bg-[var(--sky-light)] disabled:opacity-50 transition-all mt-4">
          {saving ? "Pridávam..." : "Pridať video"}
        </button>
      </div>
    </form>
  );
}
