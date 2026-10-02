"use client";

import { useState, useEffect } from "react";
import { createBrowserSupabaseClient } from "@szph/db/client";

interface Uloha {
  id: string;
  title: string;
  description: string | null;
  status: "nesplnena" | "rozpracovana" | "splnena";
  assignees: string | null;
  note: string | null;
  created_at: string;
}

const STATUS_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  nesplnena: { bg: "bg-red-50", text: "text-red-600", label: "Nesplnená" },
  rozpracovana: { bg: "bg-amber-50", text: "text-amber-600", label: "Rozpracovaná" },
  splnena: { bg: "bg-emerald-50", text: "text-emerald-600", label: "Splnená" },
};

export function DashboardUlohy() {
  const [ulohy, setUlohy] = useState<Uloha[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", assignees: "", note: "" });
  const [saving, setSaving] = useState(false);
  const supabase = createBrowserSupabaseClient();

  async function load() {
    const { data } = await supabase.from("admin_tasks").select("*").order("created_at", { ascending: false });
    setUlohy((data as Uloha[]) ?? []);
  }

  useEffect(() => { load(); }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await supabase.from("admin_tasks").insert({
      title: form.title,
      description: form.description || null,
      assignees: form.assignees || null,
      note: form.note || null,
      status: "nesplnena",
    });
    setForm({ title: "", description: "", assignees: "", note: "" });
    setShowForm(false);
    await load();
    setSaving(false);
  }

  async function updateStatus(id: string, status: string) {
    await supabase.from("admin_tasks").update({ status }).eq("id", id);
    setUlohy((prev) => prev.map((u) => u.id === id ? { ...u, status: status as Uloha["status"] } : u));
  }

  async function handleDelete(id: string) {
    if (!confirm("Zmazať úlohu?")) return;
    await supabase.from("admin_tasks").delete().eq("id", id);
    setUlohy((prev) => prev.filter((u) => u.id !== id));
  }

  const inputCls = "w-full rounded border border-[rgba(1,45,116,0.15)] bg-white px-4 py-2.5 text-sm text-[#051937] outline-none focus:border-[#012d74]/50 transition-all placeholder-[#94a3b8]";

  return (
    <div className="rounded p-5" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-[#051937]" style={{ fontSize: "14px" }}>Úlohy</h2>
        <button onClick={() => setShowForm(!showForm)} className="rounded bg-[#012d74] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#012d74]/90 transition-colors">
          + Nová úloha
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="mb-4 space-y-3 p-4 rounded" style={{ background: "#f8f9fa" }}>
          <input required value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className={inputCls} placeholder="Názov úlohy *" />
          <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className={inputCls} placeholder="Popis úlohy" rows={2} />
          <div className="grid grid-cols-2 gap-3">
            <input value={form.assignees} onChange={(e) => setForm((f) => ({ ...f, assignees: e.target.value }))} className={inputCls} placeholder="Kto rieši (mená)" />
            <input value={form.note} onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))} className={inputCls} placeholder="Poznámka" />
          </div>
          <div className="flex gap-2">
            <button type="submit" disabled={saving} className="rounded bg-[#012d74] px-4 py-2 text-xs font-bold text-white disabled:opacity-50">{saving ? "..." : "Pridať"}</button>
            <button type="button" onClick={() => setShowForm(false)} className="rounded px-4 py-2 text-xs font-bold text-[#64748b] hover:bg-gray-100">Zrušiť</button>
          </div>
        </form>
      )}

      {ulohy.length === 0 ? (
        <p className="text-sm text-[#64748b] py-2">Žiadne úlohy</p>
      ) : (
        <div className="space-y-2">
          {ulohy.map((u) => {
            const s = STATUS_COLORS[u.status] || STATUS_COLORS.nesplnena;
            return (
              <div key={u.id} className="rounded p-3" style={{ border: "1px solid rgba(1,45,116,0.06)" }}>
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold text-[#051937] ${u.status === "splnena" ? "line-through opacity-50" : ""}`} style={{ fontSize: "13px" }}>{u.title}</p>
                    {u.description && <p className="text-[#64748b] mt-0.5" style={{ fontSize: "11px" }}>{u.description}</p>}
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      {u.assignees && (
                        <span className="rounded-full bg-[#012d74]/10 px-2 py-0.5 text-[9px] font-bold text-[#012d74]">{u.assignees}</span>
                      )}
                      {u.note && (
                        <span className="text-[#94a3b8]" style={{ fontSize: "10px" }}>{u.note}</span>
                      )}
                    </div>
                  </div>
                  <select
                    value={u.status}
                    onChange={(e) => updateStatus(u.id, e.target.value)}
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold border-0 outline-none cursor-pointer ${s.bg} ${s.text}`}
                  >
                    <option value="nesplnena">Nesplnená</option>
                    <option value="rozpracovana">Rozpracovaná</option>
                    <option value="splnena">Splnená</option>
                  </select>
                  <button onClick={() => handleDelete(u.id)} className="shrink-0 text-[#94a3b8] hover:text-[#d00027] transition-colors">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
