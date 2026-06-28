"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createBrowserSupabaseClient } from "@szph/db/client";
import type { Partner } from "@szph/db/types";

export default function AdminPartneriPage() {
  const router = useRouter();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [form, setForm] = useState({ name: "", url: "", tier: "institucionalny" as Partner["tier"] });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const supabase = createBrowserSupabaseClient();

  useEffect(() => {
    supabase.from("partners").select("*").order("sort_order").then(({ data }) => {
      setPartners(data ?? []);
      setLoading(false);
    });
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    let logo_url: string | null = null;

    if (logoFile) {
      const ext = logoFile.name.split(".").pop();
      const path = `${Date.now()}.${ext}`;
      const { data } = await supabase.storage.from("partner-logos").upload(path, logoFile);
      if (data) logo_url = supabase.storage.from("partner-logos").getPublicUrl(data.path).data.publicUrl;
    }

    const maxOrder = partners.reduce((max, p) => Math.max(max, p.sort_order), 0);
    await supabase.from("partners").insert({ ...form, logo_url, sort_order: maxOrder + 1 });
    const { data } = await supabase.from("partners").select("*").order("sort_order");
    setPartners(data ?? []);
    setForm({ name: "", url: "", tier: "institucionalny" });
    setLogoFile(null);
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Zmazať partnera?")) return;
    await supabase.from("partners").delete().eq("id", id);
    setPartners((prev) => prev.filter((p) => p.id !== id));
  }

  const inputCls = "w-full rounded-xl border border-[rgba(1,45,116,0.15)] bg-white px-4 py-2.5 text-sm text-[#051937] outline-none focus:border-[#016fb4]/50 transition-all placeholder-[#94a3b8]";
  const selectCls = "w-full rounded-xl border border-[rgba(1,45,116,0.15)] bg-white px-4 py-2.5 text-sm text-[#051937] outline-none [&_option]:bg-white";
  const labelCls = "block text-[10px] font-semibold uppercase tracking-wider text-[#64748b] mb-1.5";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#051937]">Partneri</h1>
        <p className="text-sm text-[#64748b] mt-1">Spravujte logá sponzorov a partnerov</p>
      </div>

      {/* Pridať partnera */}
      <div className="rounded-2xl p-6" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
        <h2 className="font-bold text-[#051937] mb-4">Pridať partnera</h2>
        <form onSubmit={handleAdd} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className={labelCls}>Názov *</label>
            <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className={inputCls} placeholder="Názov partnera" />
          </div>
          <div>
            <label className={labelCls}>URL webu</label>
            <input value={form.url} onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))} className={inputCls} placeholder="https://..." />
          </div>
          <div>
            <label className={labelCls}>Tier</label>
            <select value={form.tier} onChange={(e) => setForm((f) => ({ ...f, tier: e.target.value as Partner["tier"] }))} className={selectCls}>
              <option value="oficialny">Oficiálny</option>
              <option value="institucionalny">Inštitucionálny</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Logo</label>
            <input type="file" accept="image/*,.svg" onChange={(e) => setLogoFile(e.target.files?.[0] ?? null)} className="w-full text-xs text-[#64748b] file:mr-2 file:rounded-lg file:border-0 file:bg-gray-100 file:px-2 file:py-1.5 file:text-xs file:text-[#051937]" />
            <button type="submit" disabled={saving} className="mt-2 w-full rounded-xl bg-[#016fb4] py-2.5 text-sm font-bold text-white hover:bg-[#016fb4]/90 disabled:opacity-50 transition-all">
              {saving ? "Pridávam..." : "Pridať"}
            </button>
          </div>
        </form>
      </div>

      {/* Zoznam partnerov */}
      {!loading && (
        <div className="space-y-3">
          {partners.map((partner) => (
            <div key={partner.id} className="rounded-2xl p-4 flex items-center gap-4" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
              {partner.logo_url ? (
                <div className="relative h-10 w-20 shrink-0">
                  <Image src={partner.logo_url} alt={partner.name} fill className="object-contain" sizes="80px" />
                </div>
              ) : (
                <div className="h-10 w-20 shrink-0 flex items-center justify-center rounded-lg bg-gray-50 text-xs text-[#94a3b8]">
                  Bez loga
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[#051937]">{partner.name}</p>
                {partner.url && <a href={partner.url} target="_blank" rel="noopener noreferrer" className="text-xs text-[#016fb4] hover:underline truncate block">{partner.url}</a>}
              </div>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold shrink-0 ${partner.tier === "oficialny" ? "bg-amber-500/20 text-amber-400" : "bg-gray-100 text-[#64748b]"}`}>
                {partner.tier === "oficialny" ? "Oficiálny" : "Inštit."}
              </span>
              <button onClick={() => handleDelete(partner.id)} className="shrink-0 rounded-lg bg-red-500/20 px-3 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-500/30 transition-colors">
                Zmazať
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
