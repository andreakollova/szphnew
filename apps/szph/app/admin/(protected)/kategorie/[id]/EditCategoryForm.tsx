"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@szph/db/client";
import type { Category, NominationPlayer, Achievement, CategoryType, CategoryStatus } from "@szph/db/types";

const inputCls = "w-full rounded border border-[rgba(1,45,116,0.15)] bg-white px-4 py-2.5 text-sm text-[#051937] outline-none focus:border-[#012d74]/50 transition-all";
const selectCls = "w-full rounded border border-[rgba(1,45,116,0.15)] bg-white px-4 py-2.5 text-sm text-[#051937] outline-none [&_option]:bg-white";
const labelCls = "block text-[10px] font-semibold uppercase tracking-wider text-[#64748b] mb-1.5";
const smallInputCls = "rounded border border-[rgba(1,45,116,0.15)] bg-white px-3 py-2 text-sm text-[#051937] outline-none focus:border-[#012d74]/50 transition-all";

type Tab = "zakladne" | "nominacia" | "uspechy";

export function EditCategoryForm({ category }: { category: Category }) {
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("zakladne");

  const [name, setName] = useState(category.name);
  const [slug, setSlug] = useState(category.slug);
  const [type, setType] = useState<CategoryType>(category.type);
  const [description, setDescription] = useState(category.description || "");
  const [status, setStatus] = useState<CategoryStatus>(category.status);
  const [sortOrder, setSortOrder] = useState(category.sort_order);

  const [nominations, setNominations] = useState<NominationPlayer[]>(category.nominations || []);
  const [achievements, setAchievements] = useState<Achievement[]>(category.achievements || []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);

    const { error: updateError } = await supabase
      .from("categories")
      .update({
        name,
        slug,
        type,
        description: description || null,
        status,
        sort_order: sortOrder,
        nominations: nominations.length > 0 ? nominations : null,
        achievements: achievements.length > 0 ? achievements : null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", category.id);

    setSaving(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    router.refresh();
  }

  const viewUrl = type === "reprezentacia" ? `/reprezentacia/${slug}` : `/sutaze/${slug}`;

  const tabBtnCls = (t: Tab) =>
    `px-4 py-2 text-sm font-semibold transition-all border-b-2 ${
      tab === t
        ? "border-[#012d74] text-[#012d74]"
        : "border-transparent text-[#64748b] hover:text-[#051937]"
    }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-1 border-b border-[rgba(1,45,116,0.08)]">
        <button type="button" className={tabBtnCls("zakladne")} onClick={() => setTab("zakladne")}>Zakladne info</button>
        <button type="button" className={tabBtnCls("nominacia")} onClick={() => setTab("nominacia")}>
          Nominacia ({nominations.length})
        </button>
        <button type="button" className={tabBtnCls("uspechy")} onClick={() => setTab("uspechy")}>
          Uspechy ({achievements.length})
        </button>
      </div>

      {/* Tab: Zakladne */}
      {tab === "zakladne" && (
        <div className="rounded p-6 space-y-4" style={{ background: "#fff", border: "1px solid rgba(1,45,116,0.08)" }}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Nazov *</label>
              <input required value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Slug *</label>
              <input required value={slug} onChange={(e) => setSlug(e.target.value)} className={inputCls} placeholder="napr. muzi" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className={labelCls}>Typ</label>
              <select value={type} onChange={(e) => setType(e.target.value as CategoryType)} className={selectCls}>
                <option value="reprezentacia">Reprezentacia</option>
                <option value="liga">Liga</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value as CategoryStatus)} className={selectCls}>
                <option value="published">Publikovane</option>
                <option value="draft">Koncept</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Poradie</label>
              <input type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))} className={inputCls} />
            </div>
          </div>
          <div>
            <label className={labelCls}>Popis</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className={inputCls}
              style={{ resize: "vertical" }}
            />
          </div>
          <div>
            <a
              href={viewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-[#012d74] hover:underline"
            >
              Zobrazit stranku
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </div>
        </div>
      )}

      {/* Tab: Nominacia */}
      {tab === "nominacia" && (
        <div className="rounded p-6 space-y-4" style={{ background: "#fff", border: "1px solid rgba(1,45,116,0.08)" }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-[#051937]">Zoznam hracov</p>
            <button
              type="button"
              onClick={() => setNominations((n) => [...n, { number: 0, name: "", club: "" }])}
              className="rounded bg-[#012d74] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#012d74]/90"
            >
              + Pridat hraca
            </button>
          </div>

          {nominations.length === 0 ? (
            <p className="text-[#64748b] text-sm py-4 text-center">Ziadni hraci v nominacii</p>
          ) : (
            <div className="space-y-2">
              <div className="grid grid-cols-[60px_1fr_1fr_40px] gap-2 text-[10px] font-semibold uppercase tracking-wider text-[#64748b] px-1">
                <span>#</span>
                <span>Meno</span>
                <span>Klub</span>
                <span />
              </div>
              {nominations.map((player, idx) => (
                <div key={idx} className="grid grid-cols-[60px_1fr_1fr_40px] gap-2 items-center">
                  <input
                    type="number"
                    value={player.number}
                    onChange={(e) => {
                      const updated = [...nominations];
                      updated[idx] = { ...updated[idx], number: Number(e.target.value) };
                      setNominations(updated);
                    }}
                    className={smallInputCls}
                  />
                  <input
                    value={player.name}
                    onChange={(e) => {
                      const updated = [...nominations];
                      updated[idx] = { ...updated[idx], name: e.target.value };
                      setNominations(updated);
                    }}
                    className={smallInputCls}
                    placeholder="Meno hraca"
                  />
                  <input
                    value={player.club}
                    onChange={(e) => {
                      const updated = [...nominations];
                      updated[idx] = { ...updated[idx], club: e.target.value };
                      setNominations(updated);
                    }}
                    className={smallInputCls}
                    placeholder="Klub"
                  />
                  <button
                    type="button"
                    onClick={() => setNominations((n) => n.filter((_, i) => i !== idx))}
                    className="text-red-400 hover:text-red-600 transition-colors text-center"
                    title="Odstranit"
                  >
                    <svg className="h-4 w-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab: Uspechy */}
      {tab === "uspechy" && (
        <div className="rounded p-6 space-y-4" style={{ background: "#fff", border: "1px solid rgba(1,45,116,0.08)" }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-[#051937]">Ocenenia a vysledky</p>
            <button
              type="button"
              onClick={() => setAchievements((a) => [...a, { year: "", form: "Hala", event: "", result: "" }])}
              className="rounded bg-[#012d74] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#012d74]/90"
            >
              + Pridat vysledok
            </button>
          </div>

          {achievements.length === 0 ? (
            <p className="text-[#64748b] text-sm py-4 text-center">Ziadne uspechy</p>
          ) : (
            <div className="space-y-2">
              <div className="grid grid-cols-[80px_100px_1fr_1fr_40px] gap-2 text-[10px] font-semibold uppercase tracking-wider text-[#64748b] px-1">
                <span>Rok</span>
                <span>Forma</span>
                <span>Sutaz / miesto</span>
                <span>Vysledok</span>
                <span />
              </div>
              {achievements.map((ach, idx) => (
                <div key={idx} className="grid grid-cols-[80px_100px_1fr_1fr_40px] gap-2 items-center">
                  <input
                    value={ach.year}
                    onChange={(e) => {
                      const updated = [...achievements];
                      updated[idx] = { ...updated[idx], year: e.target.value };
                      setAchievements(updated);
                    }}
                    className={smallInputCls}
                    placeholder="2024"
                  />
                  <select
                    value={ach.form}
                    onChange={(e) => {
                      const updated = [...achievements];
                      updated[idx] = { ...updated[idx], form: e.target.value };
                      setAchievements(updated);
                    }}
                    className={smallInputCls}
                  >
                    <option value="Hala">Hala</option>
                    <option value="Vonku">Vonku</option>
                  </select>
                  <input
                    value={ach.event}
                    onChange={(e) => {
                      const updated = [...achievements];
                      updated[idx] = { ...updated[idx], event: e.target.value };
                      setAchievements(updated);
                    }}
                    className={smallInputCls}
                    placeholder="ME II, Bratislava"
                  />
                  <input
                    value={ach.result}
                    onChange={(e) => {
                      const updated = [...achievements];
                      updated[idx] = { ...updated[idx], result: e.target.value };
                      setAchievements(updated);
                    }}
                    className={smallInputCls}
                    placeholder="2. miesto"
                  />
                  <button
                    type="button"
                    onClick={() => setAchievements((a) => a.filter((_, i) => i !== idx))}
                    className="text-red-400 hover:text-red-600 transition-colors text-center"
                    title="Odstranit"
                  >
                    <svg className="h-4 w-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      {error && <p className="text-sm text-red-600">{error}</p>}
      {saved && <p className="text-sm text-green-600">Ulozene!</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded bg-[#012d74] px-6 py-3 text-sm font-bold text-white hover:bg-[#012d74]/90 disabled:opacity-50"
        >
          {saving ? "Ukladam..." : "Ulozit zmeny"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/kategorie")}
          className="rounded border border-[rgba(1,45,116,0.08)] px-6 py-3 text-sm font-semibold text-[#64748b] hover:bg-gray-50"
        >
          Zrusit
        </button>
      </div>
    </form>
  );
}
