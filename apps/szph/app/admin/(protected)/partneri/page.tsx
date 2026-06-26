"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createBrowserSupabaseClient } from "@szph/db/client";
import { GlassCard } from "@szph/ui";
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

  const inputCls = "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[var(--sky)]/50 transition-all placeholder-white/25";
  const selectCls = "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white outline-none [&_option]:bg-[#020817]";
  const labelCls = "block text-[10px] font-semibold uppercase tracking-wider text-white/40 mb-1.5";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-garet text-2xl font-bold text-white">Partneri</h1>
        <p className="text-sm text-white/40 mt-1">Spravujte logá sponzorov a partnerov</p>
      </div>

      {/* Pridať partnera */}
      <GlassCard className="p-6" hover={false}>
        <h2 className="font-garet font-bold text-white mb-4">Pridať partnera</h2>
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
            <input type="file" accept="image/*,.svg" onChange={(e) => setLogoFile(e.target.files?.[0] ?? null)} className="w-full text-xs text-white/60 file:mr-2 file:rounded-lg file:border-0 file:bg-white/15 file:px-2 file:py-1.5 file:text-xs file:text-white" />
            <button type="submit" disabled={saving} className="mt-2 w-full rounded-xl bg-[var(--sky)] py-2.5 text-sm font-bold text-white hover:bg-[var(--sky-light)] disabled:opacity-50 transition-all">
              {saving ? "Pridávam..." : "Pridať"}
            </button>
          </div>
        </form>
      </GlassCard>

      {/* Zoznam partnerov */}
      {!loading && (
        <div className="space-y-3">
          {partners.map((partner) => (
            <GlassCard key={partner.id} className="p-4 flex items-center gap-4" hover={false}>
              {partner.logo_url ? (
                <div className="relative h-10 w-20 shrink-0">
                  <Image src={partner.logo_url} alt={partner.name} fill className="object-contain" sizes="80px" />
                </div>
              ) : (
                <div className="h-10 w-20 shrink-0 flex items-center justify-center rounded-lg bg-white/5 text-xs text-white/30">
                  Bez loga
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white">{partner.name}</p>
                {partner.url && <a href={partner.url} target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--sky)] hover:underline truncate block">{partner.url}</a>}
              </div>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold shrink-0 ${partner.tier === "oficialny" ? "bg-amber-500/20 text-amber-400" : "bg-white/10 text-white/50"}`}>
                {partner.tier === "oficialny" ? "Oficiálny" : "Inštit."}
              </span>
              <button onClick={() => handleDelete(partner.id)} className="shrink-0 rounded-lg bg-red-500/20 px-3 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-500/30 transition-colors">
                Zmazať
              </button>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
