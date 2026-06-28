"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { createBrowserSupabaseClient } from "@szph/db/client";
import type { Team } from "@szph/db/types";

export default function UpravitTimPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [team, setTeam] = useState<Team | null>(null);
  const [saving, setSaving] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const supabase = createBrowserSupabaseClient();

  useEffect(() => {
    supabase.from("teams").select("*").eq("id", id).single().then(({ data }) => {
      if (data) {
        setTeam(data as Team);
        setLogoPreview(data.logo_url);
      }
    });
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!team) return;
    setSaving(true);

    let logo_url = team.logo_url;
    if (logoFile) {
      const ext = logoFile.name.split(".").pop();
      const path = `${id}.${ext}`;
      const { data } = await supabase.storage.from("team-logos").upload(path, logoFile, { upsert: true });
      if (data) logo_url = supabase.storage.from("team-logos").getPublicUrl(data.path).data.publicUrl;
    }

    await supabase.from("teams").update({ name: team.name, short_name: team.short_name, category: team.category, logo_url }).eq("id", id);
    router.push("/admin/timy");
    router.refresh();
  }

  const inputCls = "w-full rounded-xl border border-[rgba(1,45,116,0.15)] bg-white px-4 py-2.5 text-sm text-[#051937] outline-none focus:border-[#016fb4]/50 transition-all";
  const selectCls = "w-full rounded-xl border border-[rgba(1,45,116,0.15)] bg-white px-4 py-2.5 text-sm text-[#051937] outline-none [&_option]:bg-white";
  const labelCls = "block text-[10px] font-semibold uppercase tracking-wider text-[#64748b] mb-1.5";

  if (!team) return <div className="text-[#64748b]">Načítavam...</div>;

  return (
    <div className="space-y-6 max-w-lg">
      <h1 className="text-2xl font-bold text-[#051937]">Upraviť tím</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="rounded-2xl p-6" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Celý názov *</label>
              <input required value={team.name} onChange={(e) => setTeam((t) => t ? { ...t, name: e.target.value } : t)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Skrátený názov</label>
              <input value={team.short_name ?? ""} onChange={(e) => setTeam((t) => t ? { ...t, short_name: e.target.value } : t)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Kategória</label>
              <select value={team.category} onChange={(e) => setTeam((t) => t ? { ...t, category: e.target.value as Team["category"] } : t)} className={selectCls}>
                <option value="muzi">Muži</option>
                <option value="zeny">Ženy</option>
                <option value="U18">U18</option>
                <option value="U14">U14</option>
                <option value="U12">U12</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Logo</label>
              {logoPreview && <img src={logoPreview} alt="logo" className="h-14 w-14 object-contain mb-2" />}
              <input type="file" accept="image/*,.svg" onChange={(e) => { const f = e.target.files?.[0]; if (f) { setLogoFile(f); setLogoPreview(URL.createObjectURL(f)); }}} className="w-full text-xs text-[#64748b] file:mr-4 file:rounded-lg file:border-0 file:bg-gray-100 file:px-3 file:py-2 file:text-xs file:text-[#051937]" />
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="rounded-xl bg-[#016fb4] px-6 py-3 text-sm font-bold text-white hover:bg-[#016fb4]/90 disabled:opacity-50">{saving ? "Ukladám..." : "Uložiť"}</button>
          <button type="button" onClick={() => router.back()} className="rounded-xl border border-[rgba(1,45,116,0.08)] px-6 py-3 text-sm font-semibold text-[#64748b] hover:bg-gray-50">Zrušiť</button>
        </div>
      </form>
    </div>
  );
}
