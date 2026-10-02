"use client";

import { useState, useEffect } from "react";
import { createBrowserSupabaseClient } from "@szph/db/client";

interface AdminUser {
  id: string;
  username: string;
  password: string;
  role: string;
  active: boolean;
  created_at: string;
}

const ROLES = [
  { value: "superadmin", label: "Superadmin", desc: "Plný prístup ku všetkému" },
  { value: "editor", label: "Editor", desc: "Články, zápasy, tímy, súťaže, cvičenia" },
  { value: "zapasy", label: "Zápasy", desc: "Len zápasy a tímy" },
];

export default function AdminSpravcoviaPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ username: "", password: "", role: "zapasy" });
  const supabase = createBrowserSupabaseClient();

  async function loadUsers() {
    const { data } = await supabase.from("admin_users").select("*").order("created_at", { ascending: true });
    setUsers((data as AdminUser[]) ?? []);
    setLoading(false);
  }

  useEffect(() => { loadUsers(); }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await supabase.from("admin_users").insert({
      username: form.username,
      password: form.password,
      role: form.role,
      active: true,
    });
    setForm({ username: "", password: "", role: "zapasy" });
    await loadUsers();
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Zmazať správcu?")) return;
    await supabase.from("admin_users").delete().eq("id", id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }

  async function toggleActive(id: string, active: boolean) {
    await supabase.from("admin_users").update({ active: !active }).eq("id", id);
    setUsers((prev) => prev.map((u) => u.id === id ? { ...u, active: !active } : u));
  }

  const inputCls = "w-full rounded-xl border border-[rgba(1,45,116,0.15)] bg-white px-4 py-2.5 text-sm text-[#051937] outline-none focus:border-[#012d74]/50 transition-all placeholder-[#94a3b8]";
  const labelCls = "block text-[10px] font-semibold uppercase tracking-wider text-[#64748b] mb-1.5";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#051937]">Správcovia</h1>
        <p className="text-sm text-[#64748b] mt-1">Spravujte prístupy do admin panelu</p>
      </div>

      {/* Pridať správcu */}
      <div className="rounded-2xl p-6" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
        <h2 className="font-bold text-[#051937] mb-4">Pridať správcovský účet</h2>
        <form onSubmit={handleAdd} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className={labelCls}>Prihlasovacie meno *</label>
              <input required value={form.username} onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))} className={inputCls} placeholder="napr. jan.novak" />
            </div>
            <div>
              <label className={labelCls}>Heslo *</label>
              <input required value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} className={inputCls} placeholder="Heslo" />
            </div>
            <div>
              <label className={labelCls}>Rola</label>
              <select value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))} className={inputCls}>
                {ROLES.map((r) => (
                  <option key={r.value} value={r.value}>{r.label} — {r.desc}</option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit" disabled={saving} className="rounded-xl bg-[#012d74] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#012d74]/90 disabled:opacity-50 transition-all">
            {saving ? "Pridávam..." : "Pridať správcu"}
          </button>
        </form>
      </div>

      {/* Popis rolí */}
      <div className="rounded-xl p-5" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
        <h3 className="font-bold text-[#051937] mb-3" style={{ fontSize: "13px" }}>Prehľad rolí</h3>
        <div className="grid gap-2 sm:grid-cols-3">
          {ROLES.map((r) => (
            <div key={r.value} className="rounded-lg p-3" style={{ background: "#f8f9fa" }}>
              <p className="font-bold text-[#051937]" style={{ fontSize: "12px" }}>{r.label}</p>
              <p className="text-[#64748b]" style={{ fontSize: "11px" }}>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Zoznam */}
      {!loading && users.length > 0 && (
        <div className="space-y-2">
          <h2 className="font-bold text-[#051937]" style={{ fontSize: "14px" }}>Existujúci správcovia</h2>
          {users.map((u) => (
            <div key={u.id} className="rounded-xl p-4 flex items-center gap-4" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)", opacity: u.active ? 1 : 0.5 }}>
              <div className="w-9 h-9 rounded-full bg-[#012d74] flex items-center justify-center shrink-0">
                <span className="font-bold text-white" style={{ fontSize: "13px" }}>{u.username.charAt(0).toUpperCase()}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[#051937]">{u.username}</p>
                <p className="text-[#94a3b8]" style={{ fontSize: "11px" }}>
                  {ROLES.find((r) => r.value === u.role)?.label || u.role}
                </p>
              </div>
              <button
                onClick={() => toggleActive(u.id, u.active)}
                className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${u.active ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100" : "bg-gray-100 text-[#94a3b8] hover:bg-gray-200"}`}
              >
                {u.active ? "Aktívny" : "Neaktívny"}
              </button>
              <button onClick={() => handleDelete(u.id)} className="shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold text-[#d00027] hover:bg-red-50 transition-colors" style={{ border: "1px solid rgba(208,0,39,0.2)" }}>
                Zmazať
              </button>
            </div>
          ))}
        </div>
      )}

      {!loading && users.length === 0 && (
        <p className="text-sm text-[#64748b] py-4 text-center">Žiadni správcovia (používa sa predvolený admin účet)</p>
      )}
    </div>
  );
}
