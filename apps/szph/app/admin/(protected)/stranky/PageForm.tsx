"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@szph/db/client";

interface PageFormProps {
  page?: {
    id: string;
    slug: string;
    title: string;
    content: any[];
    site: string;
    status: string;
  };
}

export function PageForm({ page }: PageFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: page?.title ?? "",
    slug: page?.slug ?? "",
    site: (page?.site ?? "szph") as "szph" | "fieldhockey",
    status: (page?.status ?? "draft") as "draft" | "published",
    content: page?.content ? JSON.stringify(page.content, null, 2) : "[]",
  });
  const supabase = createBrowserSupabaseClient();

  function generateSlug(title: string) {
    return title.toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    let parsedContent: any[];
    try {
      parsedContent = JSON.parse(form.content);
    } catch {
      setError("Obsah nie je validny JSON");
      setSaving(false);
      return;
    }

    const payload = {
      title: form.title,
      slug: form.slug,
      site: form.site,
      status: form.status,
      content: parsedContent,
    };

    try {
      if (page) {
        await supabase.from("pages").update({ ...payload, updated_at: new Date().toISOString() }).eq("id", page.id);
      } else {
        await supabase.from("pages").insert(payload);
      }
      router.push("/admin/stranky");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Nastala chyba");
    } finally {
      setSaving(false);
    }
  }

  const inputCls = "w-full rounded border border-[rgba(1,45,116,0.15)] bg-white px-4 py-2.5 text-sm text-[#051937] outline-none focus:border-[#012d74]/50 transition-all";
  const selectCls = "w-full rounded border border-[rgba(1,45,116,0.15)] bg-white px-4 py-2.5 text-sm text-[#051937] outline-none [&_option]:bg-white";
  const labelCls = "block text-[10px] font-semibold uppercase tracking-wider text-[#64748b] mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
      {error && (
        <div className="rounded bg-red-500/15 border border-red-500/25 px-4 py-3 text-sm text-red-400">{error}</div>
      )}

      <div className="rounded p-6" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
        <h2 className="font-bold text-[#051937] mb-5">Zakladne informacie</h2>
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Nadpis *</label>
            <input
              required
              value={form.title}
              onChange={(e) => {
                const title = e.target.value;
                setForm((f) => ({
                  ...f,
                  title,
                  slug: page ? f.slug : generateSlug(title),
                }));
              }}
              className={inputCls}
              placeholder="Nazov stranky"
            />
          </div>
          <div>
            <label className={labelCls}>Slug (URL)</label>
            <input
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
              className={inputCls}
              placeholder="nazov-stranky"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Web</label>
              <select value={form.site} onChange={(e) => setForm((f) => ({ ...f, site: e.target.value as typeof form.site }))} className={selectCls}>
                <option value="szph">szph.sk</option>
                <option value="fieldhockey">fieldhockey.sk</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Stav</label>
              <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as typeof form.status }))} className={selectCls}>
                <option value="draft">Draft</option>
                <option value="published">Publikovana</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded p-6" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
        <h2 className="font-bold text-[#051937] mb-5">Obsah (JSON bloky)</h2>
        <p className="text-[#94a3b8] mb-3" style={{ fontSize: "11px" }}>
          Zadajte pole content blokov. Typy: heading, text, image, gallery.
        </p>
        <textarea
          value={form.content}
          onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
          className={inputCls}
          rows={16}
          style={{ fontFamily: "monospace", fontSize: "12px" }}
          placeholder='[{"id":"1","type":"text","content":"Obsah stranky..."}]'
        />
      </div>

      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="rounded bg-[#012d74] px-6 py-3 text-sm font-bold text-white hover:bg-[#012d74]/90 disabled:opacity-50">
          {saving ? "Ukladam..." : page ? "Ulozit zmeny" : "Vytvorit stranku"}
        </button>
        <button type="button" onClick={() => router.back()} className="rounded border border-[rgba(1,45,116,0.08)] px-6 py-3 text-sm font-semibold text-[#64748b] hover:bg-gray-50">
          Zrusit
        </button>
      </div>
    </form>
  );
}
