"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@szph/db/client";
import type { Club } from "@szph/db/types";
import { optimizeImage } from "../../../utils/optimizeImage";

const inputCls = "w-full rounded border border-[rgba(1,45,116,0.15)] bg-white px-4 py-2.5 text-sm text-[#051937] outline-none focus:border-[#012d74]/50 transition-all";
const selectCls = "w-full rounded border border-[rgba(1,45,116,0.15)] bg-white px-4 py-2.5 text-sm text-[#051937] outline-none [&_option]:bg-white";
const labelCls = "block text-[10px] font-semibold uppercase tracking-wider text-[#64748b] mb-1.5";

export function EditClubForm({ club: initialClub }: { club: Club }) {
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();
  const [club, setClub] = useState(initialClub);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(initialClub.logo_url);

  function update(field: keyof Club, value: string | number) {
    setClub((c) => ({ ...c, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);

    let logo_url = club.logo_url;
    if (logoFile) {
      try {
        const { blob, filename } = await optimizeImage(logoFile, { maxWidth: 256, quality: 0.85 });
        const path = `${club.id}-${filename}`;
        const { data } = await supabase.storage.from("club-logos").upload(path, blob, { upsert: true, contentType: "image/webp" });
        if (data) logo_url = supabase.storage.from("club-logos").getPublicUrl(data.path).data.publicUrl;
      } catch {
        setError("Nepodarilo sa nahrat logo");
        setSaving(false);
        return;
      }
    }

    const { error: updateError } = await supabase
      .from("clubs")
      .update({
        name: club.name,
        short_name: club.short_name,
        city: club.city,
        phone: club.phone || null,
        email: club.email || null,
        web: club.web || null,
        facebook: club.facebook || null,
        logo_url,
        address: club.address || null,
        ico: club.ico || null,
        chairman: club.chairman || null,
        account: club.account || null,
        sort_order: club.sort_order,
        status: club.status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", club.id);

    setSaving(false);
    if (updateError) { setError(updateError.message); return; }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
      {/* Zakladne udaje */}
      <div className="rounded p-6" style={{ background: "#fff", border: "1px solid rgba(1,45,116,0.08)" }}>
        <p className="text-xs font-bold uppercase tracking-wider text-[#051937] mb-4">Zakladne udaje</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Nazov klubu *</label>
            <input required value={club.name} onChange={(e) => update("name", e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Skratka *</label>
            <input required value={club.short_name} onChange={(e) => update("short_name", e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Mesto</label>
            <input value={club.city || ""} onChange={(e) => update("city", e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Adresa</label>
            <input value={club.address || ""} onChange={(e) => update("address", e.target.value)} className={inputCls} />
          </div>
        </div>
      </div>

      {/* Kontakt */}
      <div className="rounded p-6" style={{ background: "#fff", border: "1px solid rgba(1,45,116,0.08)" }}>
        <p className="text-xs font-bold uppercase tracking-wider text-[#051937] mb-4">Kontakt</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Telefon</label>
            <input value={club.phone || ""} onChange={(e) => update("phone", e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>E-mail</label>
            <input type="email" value={club.email || ""} onChange={(e) => update("email", e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Web</label>
            <input value={club.web || ""} onChange={(e) => update("web", e.target.value)} className={inputCls} placeholder="https://" />
          </div>
          <div>
            <label className={labelCls}>Facebook</label>
            <input value={club.facebook || ""} onChange={(e) => update("facebook", e.target.value)} className={inputCls} />
          </div>
        </div>
      </div>

      {/* Organizacia */}
      <div className="rounded p-6" style={{ background: "#fff", border: "1px solid rgba(1,45,116,0.08)" }}>
        <p className="text-xs font-bold uppercase tracking-wider text-[#051937] mb-4">Organizacia</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>ICO</label>
            <input value={club.ico || ""} onChange={(e) => update("ico", e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Predseda</label>
            <input value={club.chairman || ""} onChange={(e) => update("chairman", e.target.value)} className={inputCls} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>Bankovy ucet</label>
            <input value={club.account || ""} onChange={(e) => update("account", e.target.value)} className={inputCls} placeholder="SK..." />
          </div>
        </div>
      </div>

      {/* Logo */}
      <div className="rounded p-6" style={{ background: "#fff", border: "1px solid rgba(1,45,116,0.08)" }}>
        <p className="text-xs font-bold uppercase tracking-wider text-[#051937] mb-4">Logo</p>
        {logoPreview && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logoPreview} alt="logo" className="h-16 w-16 object-contain mb-3" />
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

      {/* Stav a poradie */}
      <div className="rounded p-6" style={{ background: "#fff", border: "1px solid rgba(1,45,116,0.08)" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Stav</label>
            <select value={club.status} onChange={(e) => update("status", e.target.value)} className={selectCls}>
              <option value="published">Publikovany</option>
              <option value="draft">Koncept</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Poradie</label>
            <input type="number" value={club.sort_order} onChange={(e) => update("sort_order", parseInt(e.target.value) || 0)} className={inputCls} />
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
          Zmeny ulozene
        </div>
      )}

      <div className="flex items-center gap-3">
        <button type="submit" disabled={saving} className="rounded bg-[#012d74] px-6 py-3 text-sm font-bold text-white hover:bg-[#012d74]/90 disabled:opacity-50 transition-all">
          {saving ? "Ukladam..." : "Ulozit zmeny"}
        </button>
        <button type="button" onClick={() => router.push("/admin/kluby")} className="rounded border border-[rgba(1,45,116,0.08)] px-6 py-3 text-sm font-semibold text-[#64748b] hover:bg-gray-50 transition-colors">
          Spat
        </button>
        <a href="/kluby" target="_blank" rel="noopener noreferrer" className="ml-auto text-xs font-semibold text-[#012d74] hover:underline">
          Zobrazit na webe
        </a>
      </div>
    </form>
  );
}
