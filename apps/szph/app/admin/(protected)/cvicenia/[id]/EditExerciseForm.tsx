"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@szph/db/client";
import type { Exercise } from "@szph/db";
import { optimizeImage } from "../../../utils/optimizeImage";

export function EditExerciseForm({ exercise }: { exercise: Exercise }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState(exercise.title);
  const [slug, setSlug] = useState(exercise.slug);
  const [players, setPlayers] = useState(exercise.players?.toString() ?? "");
  const [ageGroup, setAgeGroup] = useState(exercise.age_group ?? "");
  const [duration, setDuration] = useState(exercise.duration ?? "");
  const [goal, setGoal] = useState(exercise.goal ?? "");
  const [equipment, setEquipment] = useState(exercise.equipment ?? "");
  const [description, setDescription] = useState(exercise.description ?? "");
  const [harder, setHarder] = useState(exercise.harder ?? "");
  const [easier, setEasier] = useState(exercise.easier ?? "");
  const [diagramUrl, setDiagramUrl] = useState(exercise.diagram_url ?? "");
  const [tips, setTips] = useState(exercise.tips ?? "");
  const [category, setCategory] = useState(exercise.category);
  const [status, setStatus] = useState(exercise.status);

  const supabase = createBrowserSupabaseClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title) return;
    setSaving(true);
    setError(null);
    setSaved(false);

    const { error: updateError } = await supabase
      .from("exercises")
      .update({
        title,
        slug,
        players: players ? parseInt(players) : null,
        age_group: ageGroup || null,
        duration: duration || null,
        goal: goal || null,
        equipment: equipment || null,
        description: description || null,
        harder: harder || null,
        easier: easier || null,
        diagram_url: diagramUrl || null,
        tips: tips || null,
        category,
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", exercise.id);

    setSaving(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    router.refresh();
  }

  const inputCls = "w-full rounded border border-[rgba(1,45,116,0.15)] bg-white px-4 py-2.5 text-sm text-[#051937] outline-none focus:border-[#012d74]/50 transition-all placeholder-[#94a3b8]";
  const selectCls = "w-full rounded border border-[rgba(1,45,116,0.15)] bg-white px-4 py-2.5 text-sm text-[#051937] outline-none [&_option]:bg-white";
  const labelCls = "block text-[10px] font-semibold uppercase tracking-wider text-[#64748b] mb-1.5";
  const textareaCls = inputCls + " min-h-[80px] resize-y";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="rounded p-6" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className={labelCls}>Názov *</label>
              <input required value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Slug</label>
              <input value={slug} onChange={(e) => setSlug(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Počet hráčov</label>
              <input type="number" value={players} onChange={(e) => setPlayers(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Veková kategória</label>
              <input value={ageGroup} onChange={(e) => setAgeGroup(e.target.value)} className={inputCls} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className={labelCls}>Trvanie</label>
              <input value={duration} onChange={(e) => setDuration(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Vybavenie</label>
              <input value={equipment} onChange={(e) => setEquipment(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Kategória</label>
              <select value={category} onChange={(e) => setCategory(e.target.value as any)} className={selectCls}>
                <option value="utok">Útok</option>
                <option value="obrana">Obrana</option>
                <option value="nahravky">Nahrávky</option>
                <option value="technika">Technika</option>
                <option value="kondicia">Kondícia</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Stav</label>
              <select value={status} onChange={(e) => setStatus(e.target.value as any)} className={selectCls}>
                <option value="published">Publikovaný</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          <div>
            <label className={labelCls}>Cieľ cvičenia</label>
            <textarea value={goal} onChange={(e) => setGoal(e.target.value)} className={textareaCls} />
          </div>

          <div>
            <label className={labelCls}>Popis (Organizácia + Cvičenie)</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className={textareaCls} style={{ minHeight: 120 }} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Sťažte to</label>
              <textarea value={harder} onChange={(e) => setHarder(e.target.value)} className={textareaCls} />
            </div>
            <div>
              <label className={labelCls}>Uľahčenie</label>
              <textarea value={easier} onChange={(e) => setEasier(e.target.value)} className={textareaCls} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Diagram</label>
              {diagramUrl && (
                <div className="mb-2 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={diagramUrl} alt="Diagram" className="w-full max-h-48 object-contain rounded" style={{ background: "#f8f9fa" }} />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  try {
                    const { blob, filename } = await optimizeImage(file);
                    const path = `diagrams/${Date.now()}-${filename}`;
                    const { data, error: upErr } = await supabase.storage.from("exercises").upload(path, blob, { contentType: "image/webp", upsert: false });
                    if (upErr) throw upErr;
                    const { data: { publicUrl } } = supabase.storage.from("exercises").getPublicUrl(data.path);
                    setDiagramUrl(publicUrl);
                  } catch { alert("Chyba pri nahrávaní diagramu"); }
                  e.target.value = "";
                }}
                className="w-full text-xs text-[#64748b] file:mr-4 file:rounded file:border-0 file:bg-gray-100 file:px-3 file:py-2 file:text-xs file:text-[#051937] mb-1"
              />
              <input value={diagramUrl} onChange={(e) => setDiagramUrl(e.target.value)} className={inputCls} placeholder="alebo zadaj URL..." />
            </div>
            <div>
              <label className={labelCls}>Zdroj / Poznámky</label>
              <input value={tips} onChange={(e) => setTips(e.target.value)} className={inputCls} />
            </div>
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
          Zmeny uložené
        </div>
      )}

      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="rounded bg-[#012d74] px-6 py-3 text-sm font-bold text-white hover:bg-[#012d74]/90 disabled:opacity-50 transition-all">
          {saving ? "Ukladám..." : "Uložiť zmeny"}
        </button>
        <button type="button" onClick={() => router.push("/admin/cvicenia")} className="rounded border border-[rgba(1,45,116,0.08)] px-6 py-3 text-sm font-semibold text-[#64748b] hover:bg-gray-50 transition-colors">
          Späť
        </button>
      </div>
    </form>
  );
}
