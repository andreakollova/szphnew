"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@szph/db/client";
import { GlassCard } from "@szph/ui";

export default function NovaSutazPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "", season: "2025/2026", type: "liga" as "liga" | "turnaj", category: "muzi" as "muzi" | "zeny" | "U18" | "U14" | "U12",
  });
  const supabase = createBrowserSupabaseClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await supabase.from("competitions").insert(form);
    router.push("/admin/sutaze");
    router.refresh();
  }

  const inputCls = "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[var(--sky)]/50 transition-all";
  const selectCls = "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white outline-none [&_option]:bg-[#020817]";
  const labelCls = "block text-[10px] font-semibold uppercase tracking-wider text-white/40 mb-1.5";

  return (
    <div className="space-y-6 max-w-lg">
      <h1 className="font-garet text-2xl font-bold text-white">Nová súťaž</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <GlassCard className="p-6" hover={false}>
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Názov súťaže *</label>
              <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className={inputCls} placeholder="Mužská liga" />
            </div>
            <div>
              <label className={labelCls}>Sezóna</label>
              <input value={form.season} onChange={(e) => setForm((f) => ({ ...f, season: e.target.value }))} className={inputCls} placeholder="2025/2026" />
            </div>
            <div>
              <label className={labelCls}>Typ</label>
              <select value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as "liga" | "turnaj" }))} className={selectCls}>
                <option value="liga">Liga</option>
                <option value="turnaj">Turnaj</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Kategória</label>
              <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as typeof form.category }))} className={selectCls}>
                <option value="muzi">Muži</option>
                <option value="zeny">Ženy</option>
                <option value="U18">U18</option>
                <option value="U14">U14</option>
                <option value="U12">U12</option>
              </select>
            </div>
          </div>
        </GlassCard>
        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="rounded-xl bg-[var(--sky)] px-6 py-3 text-sm font-bold text-white hover:bg-[var(--sky-light)] disabled:opacity-50">
            {saving ? "Ukladám..." : "Vytvoriť súťaž"}
          </button>
          <button type="button" onClick={() => router.back()} className="rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-white/60 hover:bg-white/8">Zrušiť</button>
        </div>
      </form>
    </div>
  );
}
