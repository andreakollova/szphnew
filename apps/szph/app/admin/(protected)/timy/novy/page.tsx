"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@szph/db/client";
import { optimizeImage } from "../../../utils/optimizeImage";

export default function NovyTimPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    short_name: "",
    category: "muzi" as "muzi" | "zeny" | "U18" | "U14" | "U12",
  });
  const supabase = createBrowserSupabaseClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    let logo_url: string | null = null;
    if (logoFile) {
      const { blob, filename } = await optimizeImage(logoFile, { maxWidth: 256, quality: 0.85 });
      const path = `${Date.now()}-${filename}`;
      const { data } = await supabase.storage.from("team-logos").upload(path, blob, { upsert: true, contentType: "image/webp" });
      if (data) logo_url = supabase.storage.from("team-logos").getPublicUrl(data.path).data.publicUrl;
    }

    await supabase.from("teams").insert({
      name: form.name,
      short_name: form.short_name || null,
      category: form.category,
      logo_url,
    });

    router.push("/admin/timy");
    router.refresh();
  }

  const inputCls = "w-full rounded border border-[rgba(1,45,116,0.15)] bg-white px-4 py-2.5 text-sm text-[#051937] outline-none focus:border-[#012d74]/50 transition-all";
  const selectCls = "w-full rounded border border-[rgba(1,45,116,0.15)] bg-white px-4 py-2.5 text-sm text-[#051937] outline-none [&_option]:bg-white";
  const labelCls = "block text-[10px] font-semibold uppercase tracking-wider text-[#64748b] mb-1.5";

  return (
    <div className="space-y-6 max-w-lg">
      <h1 className="text-2xl font-bold text-[#051937]">Novy tim</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="rounded p-6" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Cely nazov *</label>
              <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className={inputCls} placeholder="KPH Raca" />
            </div>
            <div>
              <label className={labelCls}>Skrateny nazov</label>
              <input value={form.short_name} onChange={(e) => setForm((f) => ({ ...f, short_name: e.target.value }))} className={inputCls} placeholder="RAC" />
            </div>
            <div>
              <label className={labelCls}>Kategoria</label>
              <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as typeof form.category }))} className={selectCls}>
                <option value="muzi">Muzi</option>
                <option value="zeny">Zeny</option>
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
              <input
                type="file"
                accept="image/*,.svg"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) { setLogoFile(f); setLogoPreview(URL.createObjectURL(f)); }
                }}
                className="w-full text-xs text-[#64748b] file:mr-4 file:rounded file:border-0 file:bg-gray-100 file:px-3 file:py-2 file:text-xs file:text-[#051937]"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="rounded bg-[#012d74] px-6 py-3 text-sm font-bold text-white hover:bg-[#012d74]/90 disabled:opacity-50">
            {saving ? "Ukladam..." : "Vytvorit tim"}
          </button>
          <button type="button" onClick={() => router.back()} className="rounded border border-[rgba(1,45,116,0.08)] px-6 py-3 text-sm font-semibold text-[#64748b] hover:bg-gray-50">Zrusit</button>
        </div>
      </form>
    </div>
  );
}
