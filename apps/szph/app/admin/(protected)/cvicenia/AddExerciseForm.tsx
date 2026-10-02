"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@szph/db/client";

export function AddExerciseForm() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [players, setPlayers] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [duration, setDuration] = useState("");
  const [goal, setGoal] = useState("");
  const [equipment, setEquipment] = useState("");
  const [description, setDescription] = useState("");
  const [harder, setHarder] = useState("");
  const [easier, setEasier] = useState("");
  const [diagramUrl, setDiagramUrl] = useState("");
  const [tips, setTips] = useState("");
  const [category, setCategory] = useState("utok");
  const [status, setStatus] = useState("published");
  const supabase = createBrowserSupabaseClient();

  function generateSlug(t: string) {
    return t
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title) return;
    setSaving(true);

    const finalSlug = slug || generateSlug(title);
    await supabase.from("exercises").insert({
      title,
      slug: finalSlug,
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
    });

    setTitle(""); setSlug(""); setPlayers(""); setAgeGroup(""); setDuration("");
    setGoal(""); setEquipment(""); setDescription(""); setHarder(""); setEasier("");
    setDiagramUrl(""); setTips("");
    router.refresh();
    setSaving(false);
  }

  const inputCls = "w-full rounded-md border border-[rgba(1,45,116,0.15)] bg-white px-4 py-2.5 text-sm text-[#051937] outline-none focus:border-[#016fb4]/50 transition-all placeholder-[#94a3b8]";
  const selectCls = "w-full rounded-md border border-[rgba(1,45,116,0.15)] bg-white px-4 py-2.5 text-sm text-[#051937] outline-none [&_option]:bg-white";
  const labelCls = "block text-[10px] font-semibold uppercase tracking-wider text-[#64748b] mb-1.5";
  const textareaCls = inputCls + " min-h-[80px] resize-y";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label className={labelCls}>Názov *</label>
          <input required value={title} onChange={(e) => { setTitle(e.target.value); if (!slug) setSlug(generateSlug(e.target.value)); }} className={inputCls} placeholder="Press" />
        </div>
        <div>
          <label className={labelCls}>Slug</label>
          <input value={slug} onChange={(e) => setSlug(e.target.value)} className={inputCls} placeholder="press" />
        </div>
        <div>
          <label className={labelCls}>Počet hráčov</label>
          <input type="number" value={players} onChange={(e) => setPlayers(e.target.value)} className={inputCls} placeholder="5" />
        </div>
        <div>
          <label className={labelCls}>Veková kategória</label>
          <input value={ageGroup} onChange={(e) => setAgeGroup(e.target.value)} className={inputCls} placeholder="< 11 r." />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label className={labelCls}>Trvanie</label>
          <input value={duration} onChange={(e) => setDuration(e.target.value)} className={inputCls} placeholder="15 min" />
        </div>
        <div>
          <label className={labelCls}>Vybavenie</label>
          <input value={equipment} onChange={(e) => setEquipment(e.target.value)} className={inputCls} placeholder="4 kužele" />
        </div>
        <div>
          <label className={labelCls}>Kategória</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className={selectCls}>
            <option value="utok">Útok</option>
            <option value="obrana">Obrana</option>
            <option value="nahravky">Nahrávky</option>
            <option value="technika">Technika</option>
            <option value="kondicia">Kondícia</option>
          </select>
        </div>
        <div>
          <label className={labelCls}>Stav</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className={selectCls}>
            <option value="published">Publikovaný</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelCls}>Cieľ cvičenia</label>
        <textarea value={goal} onChange={(e) => setGoal(e.target.value)} className={textareaCls} placeholder="Čo je cieľom cvičenia..." />
      </div>

      <div>
        <label className={labelCls}>Popis (Organizácia + Cvičenie)</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className={textareaCls} style={{ minHeight: 120 }} placeholder="Organizácia:&#10;...&#10;&#10;Cvičenie:&#10;..." />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls}>Zťažte to</label>
          <textarea value={harder} onChange={(e) => setHarder(e.target.value)} className={textareaCls} placeholder="Ako sťažiť cvičenie..." />
        </div>
        <div>
          <label className={labelCls}>Uľahčenie</label>
          <textarea value={easier} onChange={(e) => setEasier(e.target.value)} className={textareaCls} placeholder="Ako uľahčiť cvičenie..." />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls}>URL diagramu</label>
          <input value={diagramUrl} onChange={(e) => setDiagramUrl(e.target.value)} className={inputCls} placeholder="https://..." />
        </div>
        <div>
          <label className={labelCls}>Zdroj / Poznámky</label>
          <input value={tips} onChange={(e) => setTips(e.target.value)} className={inputCls} placeholder="Zdroj: sportplan.net" />
        </div>
      </div>

      <button type="submit" disabled={saving} className="rounded-md bg-[#016fb4] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#016fb4]/90 disabled:opacity-50 transition-all">
        {saving ? "Pridávam..." : "Pridať cvičenie"}
      </button>
    </form>
  );
}
