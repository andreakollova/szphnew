"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@szph/db/client";

interface InlineScoreProps {
  matchId: string;
  homeScore: number | null;
  awayScore: number | null;
  status: string;
}

export function InlineScore({ matchId, homeScore, awayScore, status }: InlineScoreProps) {
  const [home, setHome] = useState(homeScore?.toString() ?? "");
  const [away, setAway] = useState(awayScore?.toString() ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  const hasChanged = home !== (homeScore?.toString() ?? "") || away !== (awayScore?.toString() ?? "");

  async function handleSave() {
    setSaving(true);
    const supabase = createBrowserSupabaseClient();
    const h = home === "" ? null : parseInt(home);
    const a = away === "" ? null : parseInt(away);
    const newStatus = h !== null && a !== null ? "finished" : status;

    await supabase.from("matches").update({
      home_score: h,
      away_score: a,
      status: newStatus,
      updated_at: new Date().toISOString(),
    }).eq("id", matchId);

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    router.refresh();
  }

  return (
    <div className="flex items-center gap-1">
      <input
        type="number"
        min="0"
        value={home}
        onChange={(e) => setHome(e.target.value)}
        className="w-10 h-8 text-center rounded-lg border text-sm font-bold text-[#051937] outline-none transition-colors focus:border-[#016fb4]"
        style={{ border: "1px solid rgba(1,45,116,0.15)", background: home ? "#ffffff" : "#f8f9fa" }}
        placeholder="-"
      />
      <span className="text-[#94a3b8] text-xs font-bold">:</span>
      <input
        type="number"
        min="0"
        value={away}
        onChange={(e) => setAway(e.target.value)}
        className="w-10 h-8 text-center rounded-lg border text-sm font-bold text-[#051937] outline-none transition-colors focus:border-[#016fb4]"
        style={{ border: "1px solid rgba(1,45,116,0.15)", background: away ? "#ffffff" : "#f8f9fa" }}
        placeholder="-"
      />
      {hasChanged && (
        <button
          onClick={handleSave}
          disabled={saving}
          className="ml-1 rounded-lg bg-[#016fb4] px-2 py-1 text-[10px] font-bold text-white hover:bg-[#016fb4]/90 transition-colors disabled:opacity-50"
        >
          {saving ? "..." : saved ? "OK" : "Uloz"}
        </button>
      )}
      {saved && !hasChanged && (
        <span className="ml-1 text-emerald-500 text-[10px] font-bold">OK</span>
      )}
    </div>
  );
}
