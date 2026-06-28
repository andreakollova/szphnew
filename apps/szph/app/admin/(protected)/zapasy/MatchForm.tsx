"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createBrowserSupabaseClient } from "@szph/db/client";
import type { Team, Competition, Match } from "@szph/db/types";

const matchSchema = z.object({
  competition_id: z.string().min(1, "Vyberte súťaž"),
  home_team_id:   z.string().min(1, "Vyberte domáci tím"),
  away_team_id:   z.string().min(1, "Vyberte hosťujúci tím"),
  match_date:     z.string().min(1, "Vyberte dátum a čas"),
  venue:          z.string().optional(),
  status:         z.enum(["scheduled", "live", "finished", "postponed"]),
  home_score:     z.coerce.number().int().min(0).nullable().optional(),
  away_score:     z.coerce.number().int().min(0).nullable().optional(),
  visible_on:     z.enum(["fieldhockey", "szph", "both"]),
});

type MatchFormValues = z.infer<typeof matchSchema>;

interface MatchFormProps {
  teams: Team[];
  competitions: Competition[];
  match?: Match;
}

export function MatchForm({ teams, competitions, match }: MatchFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState<string | null>(null);
  const supabase = createBrowserSupabaseClient();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<MatchFormValues>({
    resolver: zodResolver(matchSchema),
    defaultValues: {
      competition_id: match?.competition_id ?? "",
      home_team_id:   match?.home_team_id   ?? "",
      away_team_id:   match?.away_team_id   ?? "",
      match_date:     match?.match_date
        ? new Date(match.match_date).toISOString().slice(0, 16)
        : "",
      venue:          match?.venue ?? "",
      status:         match?.status ?? "scheduled",
      home_score:     match?.home_score ?? null,
      away_score:     match?.away_score ?? null,
      visible_on:     match?.visible_on ?? "both",
    },
  });

  const status = watch("status");

  async function onSubmit(values: MatchFormValues) {
    setSaving(true);
    setError(null);

    try {
      const payload = {
        competition_id: values.competition_id,
        home_team_id:   values.home_team_id,
        away_team_id:   values.away_team_id,
        match_date:     new Date(values.match_date).toISOString(),
        venue:          values.venue || null,
        status:         values.status,
        home_score:     values.status === "finished" ? (values.home_score ?? null) : null,
        away_score:     values.status === "finished" ? (values.away_score ?? null) : null,
        visible_on:     values.visible_on,
      };

      if (match) {
        await supabase.from("matches").update({ ...payload, updated_at: new Date().toISOString() }).eq("id", match.id);
      } else {
        await supabase.from("matches").insert(payload);
      }

      router.push("/admin/zapasy");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Nastala chyba");
    } finally {
      setSaving(false);
    }
  }

  const inputCls = "w-full rounded-xl border border-[rgba(1,45,116,0.15)] bg-white px-4 py-2.5 text-sm text-[#051937] outline-none focus:border-[#016fb4]/50 transition-all";
  const selectCls = "w-full rounded-xl border border-[rgba(1,45,116,0.15)] bg-white px-4 py-2.5 text-sm text-[#051937] outline-none focus:border-[#016fb4]/50 [&_option]:bg-white";
  const labelCls = "block text-[10px] font-semibold uppercase tracking-wider text-[#64748b] mb-1.5";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-2xl">
      {error && (
        <div className="rounded-xl bg-red-500/15 border border-red-500/25 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="rounded-2xl p-6" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
        <h2 className="font-bold text-[#051937] mb-5">Základné informácie</h2>
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Súťaž</label>
            <select {...register("competition_id")} className={selectCls}>
              <option value="">— Vyberte súťaž —</option>
              {competitions.map((c) => (
                <option key={c.id} value={c.id}>{c.name} ({c.season})</option>
              ))}
            </select>
            {errors.competition_id && <p className="text-red-400 text-xs mt-1">{errors.competition_id.message}</p>}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Domáci tím</label>
              <select {...register("home_team_id")} className={selectCls}>
                <option value="">— Domáci —</option>
                {teams.map((t) => (
                  <option key={t.id} value={t.id}>{t.name} ({t.category})</option>
                ))}
              </select>
              {errors.home_team_id && <p className="text-red-400 text-xs mt-1">{errors.home_team_id.message}</p>}
            </div>
            <div>
              <label className={labelCls}>Hosťujúci tím</label>
              <select {...register("away_team_id")} className={selectCls}>
                <option value="">— Hosťujúci —</option>
                {teams.map((t) => (
                  <option key={t.id} value={t.id}>{t.name} ({t.category})</option>
                ))}
              </select>
              {errors.away_team_id && <p className="text-red-400 text-xs mt-1">{errors.away_team_id.message}</p>}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Dátum a čas</label>
              <input type="datetime-local" {...register("match_date")} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Miesto</label>
              <input {...register("venue")} className={inputCls} placeholder="Napr. Šenkvice" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Stav zápasu</label>
              <select {...register("status")} className={selectCls}>
                <option value="scheduled">Plánovaný</option>
                <option value="live">Naživo</option>
                <option value="finished">Odohraný</option>
                <option value="postponed">Preložený</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Viditeľnosť</label>
              <select {...register("visible_on")} className={selectCls}>
                <option value="both">Oba weby</option>
                <option value="fieldhockey">fieldhockey.sk</option>
                <option value="szph">szph.sk</option>
              </select>
            </div>
          </div>

          {(status === "finished" || status === "live") && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelCls}>Góly domáci</label>
                <input type="number" min="0" {...register("home_score")} className={inputCls} placeholder="0" />
              </div>
              <div>
                <label className={labelCls}>Góly hosťujúci</label>
                <input type="number" min="0" {...register("away_score")} className={inputCls} placeholder="0" />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-[#016fb4] px-6 py-3 text-sm font-bold text-white transition-all hover:bg-[#016fb4]/90 disabled:opacity-50"
        >
          {saving ? "Ukladám..." : match ? "Uložiť zmeny" : "Vytvoriť zápas"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-xl border border-[rgba(1,45,116,0.08)] px-6 py-3 text-sm font-semibold text-[#64748b] hover:bg-gray-50 transition-colors"
        >
          Zrušiť
        </button>
      </div>
    </form>
  );
}
