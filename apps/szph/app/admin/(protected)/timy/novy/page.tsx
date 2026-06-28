"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@szph/db/client";

export default function NovyTimPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "", short_name: "", category: "muzi" as const,
  });

  const supabase = createBrowserSupabaseClient();

  function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      let logo_url: string | null = null;
      if (logoFile) {
        const ext = logoFile.name.split(".").pop();
        const path = `${Date.now()}.${ext}`;
        const { data, error: uploadError } = await supabase.storage
          .from("team-logos")
          .upload(path, logoFile, { cacheControl: "3600" });
        if (uploadError) throw uploadError;
        logo_url = supabase.storage.from("team-logos").getPublicUrl(data.path).data.publicUrl;
      }

      const { error: insertError } = await supabase.from("teams").insert({
        name:       form.name,
        short_name: form.short_name || null,
        category:   form.category,
        logo_url,
      });
      if (insertError) throw insertError;

      router.push("/admin/timy");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Nastala chyba");
    } finally {
      setSaving(false);
    }
  }

  const inputCls = "w-full rounded-xl border border-[rgba(1,45,116,0.15)] bg-white px-4 py-2.5 text-sm text-[#051937] outline-none focus:border-[#016fb4]/50 transition-all";
  const labelCls = "block text-[10px] font-semibold uppercase tracking-wider text-[#64748b] mb-1.5";

  return (
    <div className="space-y-6 max-w-lg">
      <div>
        <h1 className="text-2xl font-bold text-[#051937]">Nový tím</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="rounded-xl bg-red-500/15 border border-red-500/25 px-4 py-3 text-sm text-red-400">{error}</div>
        )}

        <div className="rounded-2xl p-6" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Celý názov tímu *</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className={inputCls}
                placeholder="KPH Rača Bratislava"
              />
            </div>
            <div>
              <label className={labelCls}>Skrátený názov</label>
              <input
                value={form.short_name}
                onChange={(e) => setForm((f) => ({ ...f, short_name: e.target.value }))}
                className={inputCls}
                placeholder="KPH Rača"
              />
            </div>
            <div>
              <label className={labelCls}>Kategória *</label>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as typeof form.category }))}
                className="w-full rounded-xl border border-[rgba(1,45,116,0.15)] bg-white px-4 py-2.5 text-sm text-[#051937] outline-none [&_option]:bg-white"
              >
                <option value="muzi">Muži</option>
                <option value="zeny">Ženy</option>
                <option value="U18">U18</option>
                <option value="U14">U14</option>
                <option value="U12">U12</option>
              </select>
            </div>

            {/* Logo upload */}
            <div>
              <label className={labelCls}>Logo tímu</label>
              {logoPreview && (
                <div className="mb-3 flex items-center gap-3">
                  <img src={logoPreview} alt="Logo preview" className="h-14 w-14 object-contain" />
                  <button type="button" onClick={() => { setLogoPreview(null); setLogoFile(null); }} className="text-xs text-red-400 hover:underline">
                    Odstrániť
                  </button>
                </div>
              )}
              <input
                type="file"
                accept="image/*,.svg"
                onChange={handleLogoChange}
                className="w-full text-sm text-[#64748b] file:mr-4 file:rounded-lg file:border-0 file:bg-gray-100 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-[#051937] hover:file:bg-gray-200"
              />
              <p className="text-xs text-[#94a3b8] mt-1">PNG, SVG, JPG — odporúčané: transparentné pozadie, aspoň 200×200px</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-[#016fb4] px-6 py-3 text-sm font-bold text-white hover:bg-[#016fb4]/90 disabled:opacity-50 transition-all"
          >
            {saving ? "Ukladám..." : "Vytvoriť tím"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-xl border border-[rgba(1,45,116,0.08)] px-6 py-3 text-sm font-semibold text-[#64748b] hover:bg-gray-50 transition-colors"
          >
            Zrušiť
          </button>
        </div>
      </form>
    </div>
  );
}
