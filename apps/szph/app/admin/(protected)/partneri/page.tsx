"use client";

import { useState, useEffect } from "react";
import { createBrowserSupabaseClient } from "@szph/db/client";

interface Partner {
  id: string;
  name: string;
  logo_url: string | null;
  url: string | null;
  tier: string;
  sort_order: number;
}

export default function AdminPartneriPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", logo_url: "", url: "", tier: "institucionalny" });
  const supabase = createBrowserSupabaseClient();

  useEffect(() => {
    supabase.from("partners").select("*").order("sort_order").then(({ data }) => {
      setPartners((data as Partner[]) ?? []);
      setLoading(false);
    });
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const maxOrder = partners.reduce((max, p) => Math.max(max, p.sort_order), 0);
    await supabase.from("partners").insert({
      name: form.name,
      logo_url: form.logo_url || null,
      url: form.url || null,
      tier: form.tier,
      sort_order: maxOrder + 1,
    });
    const { data } = await supabase.from("partners").select("*").order("sort_order");
    setPartners((data as Partner[]) ?? []);
    setForm({ name: "", logo_url: "", url: "", tier: "institucionalny" });
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Zmazať partnera?")) return;
    await supabase.from("partners").delete().eq("id", id);
    setPartners((prev) => prev.filter((p) => p.id !== id));
  }

  const inputCls = "w-full rounded-xl border border-[rgba(1,45,116,0.15)] bg-white px-4 py-2.5 text-sm text-[#051937] outline-none focus:border-[#012d74]/50 transition-all placeholder-[#94a3b8]";
  const labelCls = "block text-[10px] font-semibold uppercase tracking-wider text-[#64748b] mb-1.5";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#051937]">Partneri</h1>
        <p className="text-sm text-[#64748b] mt-1">Spravujte sponzorov a partnerov</p>
      </div>

      {/* Pridať partnera */}
      <div className="rounded-2xl p-6" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
        <h2 className="font-bold text-[#051937] mb-4">Pridať partnera</h2>
        <form onSubmit={handleAdd} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Názov *</label>
              <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className={inputCls} placeholder="Názov partnera" />
            </div>
            <div>
              <label className={labelCls}>Tier</label>
              <select value={form.tier} onChange={(e) => setForm((f) => ({ ...f, tier: e.target.value }))} className={inputCls}>
                <option value="oficialny">Oficiálny sponzor</option>
                <option value="institucionalny">Inštitucionálny partner</option>
              </select>
            </div>
          </div>
          <div>
            <label className={labelCls}>Link na logo (URL obrázka)</label>
            <input value={form.logo_url} onChange={(e) => setForm((f) => ({ ...f, logo_url: e.target.value }))} className={inputCls} placeholder="https://example.com/logo.png" />
          </div>
          <div>
            <label className={labelCls}>Link na web partnera</label>
            <input value={form.url} onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))} className={inputCls} placeholder="https://www.partner.sk" />
          </div>
          {form.logo_url && (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#f8f9fa]">
              <span className="text-[10px] font-semibold text-[#94a3b8] uppercase">Náhľad:</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={form.logo_url} alt="Preview" className="h-8 object-contain" />
            </div>
          )}
          <button type="submit" disabled={saving} className="rounded-xl bg-[#012d74] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#012d74]/90 disabled:opacity-50 transition-all">
            {saving ? "Pridávam..." : "Pridať partnera"}
          </button>
        </form>
      </div>

      {/* Zoznam */}
      {!loading && partners.length > 0 && (
        <div className="space-y-2">
          {partners.map((p) => (
            <div key={p.id} className="rounded-xl p-4 flex items-center gap-4" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
              {p.logo_url ? (
                <div className="h-10 w-20 shrink-0 flex items-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.logo_url} alt={p.name} className="h-full w-full object-contain" />
                </div>
              ) : (
                <div className="h-10 w-20 shrink-0 flex items-center justify-center rounded-lg bg-[#f8f9fa] text-xs text-[#94a3b8]">
                  Bez loga
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[#051937]">{p.name}</p>
                {p.url && <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-xs text-[#0078fd] hover:underline truncate block">{p.url}</a>}
              </div>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold shrink-0 ${p.tier === "oficialny" ? "bg-amber-100 text-amber-700" : "bg-[#f0f4fa] text-[#64748b]"}`}>
                {p.tier === "oficialny" ? "Oficiálny" : "Inštit."}
              </span>
              <button onClick={() => handleDelete(p.id)} className="shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold text-[#d00027] hover:bg-red-50 transition-colors" style={{ border: "1px solid rgba(208,0,39,0.2)" }}>
                Zmazať
              </button>
            </div>
          ))}
        </div>
      )}

      {!loading && partners.length === 0 && (
        <p className="text-sm text-[#64748b] py-8 text-center">Žiadni partneri</p>
      )}
    </div>
  );
}
