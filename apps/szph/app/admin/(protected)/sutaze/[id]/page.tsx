"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { createBrowserSupabaseClient } from "@szph/db/client";

export default function UpravitSutazPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "", season: "", type: "liga" as "liga" | "turnaj", category: "muzi" as "muzi" | "zeny" | "U18" | "U14" | "U12",
  });
  const [loaded, setLoaded] = useState(false);
  const supabase = createBrowserSupabaseClient();

  useEffect(() => {
    supabase.from("competitions").select("*").eq("id", id).single().then(({ data }) => {
      if (data) {
        setForm({ name: data.name, season: data.season, type: data.type, category: data.category });
        setLoaded(true);
      }
    });
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await supabase.from("competitions").update(form).eq("id", id);
    router.push("/admin/sutaze");
    router.refresh();
  }

  const inputCls = "w-full rounded border border-[rgba(1,45,116,0.15)] bg-white px-4 py-2.5 text-sm text-[#051937] outline-none focus:border-[#012d74]/50 transition-all";
  const selectCls = "w-full rounded border border-[rgba(1,45,116,0.15)] bg-white px-4 py-2.5 text-sm text-[#051937] outline-none [&_option]:bg-white";
  const labelCls = "block text-[10px] font-semibold uppercase tracking-wider text-[#64748b] mb-1.5";

  if (!loaded) return <div className="text-[#64748b]">Načítavam...</div>;

  return (
    <div className="space-y-6 max-w-lg">
      <h1 className="text-2xl font-bold text-[#051937]">Upraviť súťaž</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="rounded p-6" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Názov súťaže *</label>
              <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Sezóna</label>
              <input value={form.season} onChange={(e) => setForm((f) => ({ ...f, season: e.target.value }))} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Typ</label>
              <select value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as typeof form.type }))} className={selectCls}>
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
        </div>
        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="rounded bg-[#012d74] px-6 py-3 text-sm font-bold text-white hover:bg-[#012d74]/90 disabled:opacity-50">
            {saving ? "Ukladám..." : "Uložiť zmeny"}
          </button>
          <button type="button" onClick={() => router.back()} className="rounded border border-[rgba(1,45,116,0.08)] px-6 py-3 text-sm font-semibold text-[#64748b] hover:bg-gray-50">Zrušiť</button>
        </div>
      </form>
    </div>
  );
}
