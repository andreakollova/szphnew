"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@szph/db/client";
import { optimizeImage } from "../../../utils/optimizeImage";

export default function NovyKlubPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    short_name: "",
    city: "",
    phone: "",
    email: "",
    web: "",
    facebook: "",
    address: "",
    ico: "",
    chairman: "",
    account: "",
    sort_order: 0,
    status: "published" as "published" | "draft",
  });
  const supabase = createBrowserSupabaseClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    let logo_url: string | null = null;
    if (logoFile) {
      try {
        const { blob, filename } = await optimizeImage(logoFile, { maxWidth: 256, quality: 0.85 });
        const path = `${Date.now()}-${filename}`;
        const { data } = await supabase.storage.from("club-logos").upload(path, blob, { upsert: true, contentType: "image/webp" });
        if (data) logo_url = supabase.storage.from("club-logos").getPublicUrl(data.path).data.publicUrl;
      } catch {
        setError("Nepodarilo sa nahrat logo");
        setSaving(false);
        return;
      }
    }

    const { error: insertError } = await supabase.from("clubs").insert({
      name: form.name,
      short_name: form.short_name,
      city: form.city || null,
      phone: form.phone || null,
      email: form.email || null,
      web: form.web || null,
      facebook: form.facebook || null,
      logo_url,
      address: form.address || null,
      ico: form.ico || null,
      chairman: form.chairman || null,
      account: form.account || null,
      sort_order: form.sort_order,
      status: form.status,
    });

    if (insertError) {
      setError(insertError.message);
      setSaving(false);
      return;
    }

    router.push("/admin/kluby");
    router.refresh();
  }

  const inputCls = "w-full rounded border border-[rgba(1,45,116,0.15)] bg-white px-4 py-2.5 text-sm text-[#051937] outline-none focus:border-[#012d74]/50 transition-all";
  const selectCls = "w-full rounded border border-[rgba(1,45,116,0.15)] bg-white px-4 py-2.5 text-sm text-[#051937] outline-none [&_option]:bg-white";
  const labelCls = "block text-[10px] font-semibold uppercase tracking-wider text-[#64748b] mb-1.5";

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-[#051937]">Novy klub</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Zakladne udaje */}
        <div className="rounded p-6" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
          <p className="text-xs font-bold uppercase tracking-wider text-[#051937] mb-4">Zakladne udaje</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Nazov *</label>
              <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className={inputCls} placeholder="KPH Raca" />
            </div>
            <div>
              <label className={labelCls}>Skratka *</label>
              <input required value={form.short_name} onChange={(e) => setForm((f) => ({ ...f, short_name: e.target.value }))} className={inputCls} placeholder="RAC" />
            </div>
            <div>
              <label className={labelCls}>Mesto</label>
              <input value={form.city} onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))} className={inputCls} placeholder="Bratislava" />
            </div>
            <div>
              <label className={labelCls}>Adresa</label>
              <input value={form.address} onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))} className={inputCls} />
            </div>
          </div>
        </div>

        {/* Kontakt */}
        <div className="rounded p-6" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
          <p className="text-xs font-bold uppercase tracking-wider text-[#051937] mb-4">Kontakt</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Telefon</label>
              <input value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>E-mail</label>
              <input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Web</label>
              <input value={form.web} onChange={(e) => setForm((f) => ({ ...f, web: e.target.value }))} className={inputCls} placeholder="https://" />
            </div>
            <div>
              <label className={labelCls}>Facebook</label>
              <input value={form.facebook} onChange={(e) => setForm((f) => ({ ...f, facebook: e.target.value }))} className={inputCls} />
            </div>
          </div>
        </div>

        {/* Organizacia */}
        <div className="rounded p-6" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
          <p className="text-xs font-bold uppercase tracking-wider text-[#051937] mb-4">Organizacia</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>ICO</label>
              <input value={form.ico} onChange={(e) => setForm((f) => ({ ...f, ico: e.target.value }))} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Predseda</label>
              <input value={form.chairman} onChange={(e) => setForm((f) => ({ ...f, chairman: e.target.value }))} className={inputCls} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Bankovy ucet</label>
              <input value={form.account} onChange={(e) => setForm((f) => ({ ...f, account: e.target.value }))} className={inputCls} placeholder="SK..." />
            </div>
          </div>
        </div>

        {/* Logo */}
        <div className="rounded p-6" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
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
        <div className="rounded p-6" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Stav</label>
              <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as "published" | "draft" }))} className={selectCls}>
                <option value="published">Publikovany</option>
                <option value="draft">Koncept</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Poradie</label>
              <input type="number" value={form.sort_order} onChange={(e) => setForm((f) => ({ ...f, sort_order: parseInt(e.target.value) || 0 }))} className={inputCls} />
            </div>
          </div>
        </div>

        {error && (
          <div className="rounded bg-red-50 px-4 py-3 text-sm font-semibold text-red-600" style={{ border: "1px solid rgba(208,0,39,0.15)" }}>
            Chyba: {error}
          </div>
        )}

        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="rounded bg-[#012d74] px-6 py-3 text-sm font-bold text-white hover:bg-[#012d74]/90 disabled:opacity-50 transition-all">
            {saving ? "Ukladam..." : "Vytvorit klub"}
          </button>
          <button type="button" onClick={() => router.back()} className="rounded border border-[rgba(1,45,116,0.08)] px-6 py-3 text-sm font-semibold text-[#64748b] hover:bg-gray-50 transition-colors">
            Zrusit
          </button>
        </div>
      </form>
    </div>
  );
}
