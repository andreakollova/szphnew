"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@szph/db/client";
import type { Team } from "@szph/db/types";
import { optimizeImage } from "../../../utils/optimizeImage";

export function EditTeamForm({ team: initialTeam }: { team: Team }) {
  const router = useRouter();
  const [team, setTeam] = useState(initialTeam);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(initialTeam.logo_url);
  const supabase = createBrowserSupabaseClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!team) return;
    setSaving(true);
    setError(null);
    setSaved(false);

    let logo_url = team.logo_url;
    if (logoFile) {
      try {
        const { blob, filename } = await optimizeImage(logoFile, { maxWidth: 256, quality: 0.85 });
        const path = `${team.id}-${filename}`;
        const { data } = await supabase.storage.from("team-logos").upload(path, blob, { upsert: true, contentType: "image/webp" });
        if (data) logo_url = supabase.storage.from("team-logos").getPublicUrl(data.path).data.publicUrl;
      } catch {
        setError("Nepodarilo sa nahrať logo");
        setSaving(false);
        return;
      }
    }

    const { error: updateError } = await supabase
      .from("teams")
      .update({ name: team.name, short_name: team.short_name, category: team.category, logo_url })
      .eq("id", team.id);

    setSaving(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    router.refresh();
  }

  const inputCls = "w-full rounded border border-[rgba(1,45,116,0.15)] bg-white px-4 py-2.5 text-sm text-[#051937] outline-none focus:border-[#012d74]/50 transition-all";
  const selectCls = "w-full rounded border border-[rgba(1,45,116,0.15)] bg-white px-4 py-2.5 text-sm text-[#051937] outline-none [&_option]:bg-white";
  const labelCls = "block text-[10px] font-semibold uppercase tracking-wider text-[#64748b] mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
      <div className="rounded p-6" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Celý názov *</label>
            <input required value={team.name} onChange={(e) => setTeam((t) => ({ ...t, name: e.target.value }))} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Skrátený názov</label>
            <input value={team.short_name ?? ""} onChange={(e) => setTeam((t) => ({ ...t, short_name: e.target.value }))} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Kategória</label>
            <select value={team.category} onChange={(e) => setTeam((t) => ({ ...t, category: e.target.value as Team["category"] }))} className={selectCls}>
              <option value="muzi">Muži</option>
              <option value="zeny">Ženy</option>
              <option value="U18">U18</option>
              <option value="U14">U14</option>
              <option value="U12">U12</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Logo</label>
            {logoPreview && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logoPreview} alt="logo" className="h-14 w-14 object-contain mb-2" />
            )}
            <input type="file" accept="image/*,.svg" onChange={(e) => { const f = e.target.files?.[0]; if (f) { setLogoFile(f); setLogoPreview(URL.createObjectURL(f)); }}} className="w-full text-xs text-[#64748b] file:mr-4 file:rounded file:border-0 file:bg-gray-100 file:px-3 file:py-2 file:text-xs file:text-[#051937]" />
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded bg-red-50 px-4 py-3 text-sm font-semibold text-red-600" style={{ border: "1px solid rgba(208,0,39,0.15)" }}>
          Chyba: {error}
        </div>
      )}

      {saved && (
        <div className="rounded bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700" style={{ border: "1px solid rgba(16,185,129,0.2)" }}>
          Zmeny uložené
        </div>
      )}

      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="rounded bg-[#012d74] px-6 py-3 text-sm font-bold text-white hover:bg-[#012d74]/90 disabled:opacity-50 transition-all">
          {saving ? "Ukladám..." : "Uložiť"}
        </button>
        <button type="button" onClick={() => router.push("/admin/timy")} className="rounded border border-[rgba(1,45,116,0.08)] px-6 py-3 text-sm font-semibold text-[#64748b] hover:bg-gray-50 transition-colors">
          Späť
        </button>
      </div>
    </form>
  );
}
