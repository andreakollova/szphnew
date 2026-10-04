"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@szph/db/client";
import type { CategoryType, CategoryStatus } from "@szph/db/types";

const inputCls = "w-full rounded border border-[rgba(1,45,116,0.15)] bg-white px-4 py-2.5 text-sm text-[#051937] outline-none focus:border-[#012d74]/50 transition-all";
const selectCls = "w-full rounded border border-[rgba(1,45,116,0.15)] bg-white px-4 py-2.5 text-sm text-[#051937] outline-none [&_option]:bg-white";
const labelCls = "block text-[10px] font-semibold uppercase tracking-wider text-[#64748b] mb-1.5";

export default function NovaCategoriaPage() {
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [type, setType] = useState<CategoryType>("reprezentacia");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<CategoryStatus>("draft");
  const [sortOrder, setSortOrder] = useState(10);

  function generateSlug(value: string) {
    return value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const { error: insertError } = await supabase.from("categories").insert({
      name,
      slug,
      type,
      description: description || null,
      status,
      sort_order: sortOrder,
      nominations: null,
      achievements: null,
    });

    setSaving(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    router.push("/admin/kategorie");
    router.refresh();
  }

  return (
    <div className="space-y-6 max-w-lg">
      <h1 className="text-2xl font-bold text-[#051937]">Nova kategoria</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="rounded p-6 space-y-4" style={{ background: "#fff", border: "1px solid rgba(1,45,116,0.08)" }}>
          <div>
            <label className={labelCls}>Nazov *</label>
            <input
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setSlug(generateSlug(e.target.value));
              }}
              className={inputCls}
              placeholder="napr. U18 Muzi"
            />
          </div>
          <div>
            <label className={labelCls}>Slug *</label>
            <input required value={slug} onChange={(e) => setSlug(e.target.value)} className={inputCls} />
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
              rows={3}
              className={inputCls}
              style={{ resize: "vertical" }}
            />
          </div>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded bg-[#012d74] px-6 py-3 text-sm font-bold text-white hover:bg-[#012d74]/90 disabled:opacity-50"
          >
            {saving ? "Ukladam..." : "Vytvorit kategoriu"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded border border-[rgba(1,45,116,0.08)] px-6 py-3 text-sm font-semibold text-[#64748b] hover:bg-gray-50"
          >
            Zrusit
          </button>
        </div>
      </form>
    </div>
  );
}
