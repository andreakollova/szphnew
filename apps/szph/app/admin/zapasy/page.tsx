import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@szph/db/client";
import { getAllMatches, getAllCompetitions, getAllTeams } from "@szph/db";
import Link from "next/link";
import { GlassCard, formatDate, formatTime } from "@szph/ui";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Zápasy" };

export default async function AdminZapasyPage() {
  const cookieStore = await cookies();
  const supabase = createServerSupabaseClient(cookieStore);

  const [matches, competitions] = await Promise.all([
    getAllMatches(supabase, { limit: 100 }).catch(() => []),
    getAllCompetitions(supabase).catch(() => []),
  ]);

  const STATUS_LABELS: Record<string, string> = {
    scheduled: "Plánovaný", live: "Naživo", finished: "Odohraný", postponed: "Preložený",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-garet text-2xl font-bold text-white">Zápasy</h1>
          <p className="text-sm text-white/40 mt-1">{matches.length} zápasov celkovo</p>
        </div>
        <Link
          href="/admin/zapasy/novy"
          className="inline-flex items-center gap-2 rounded-xl bg-[var(--sky)] px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-[var(--sky-light)]"
        >
          + Nový zápas
        </Link>
      </div>

      <GlassCard hover={false} className="overflow-x-auto">
        {matches.length === 0 ? (
          <div className="py-16 text-center text-white/40">Žiadne zápasy</div>
        ) : (
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-5 py-3 text-left text-[10px] uppercase tracking-wider text-white/40">Dátum</th>
                <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-white/40">Zápas</th>
                <th className="px-4 py-3 text-center text-[10px] uppercase tracking-wider text-white/40">Skóre</th>
                <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-white/40">Súťaž</th>
                <th className="px-4 py-3 text-center text-[10px] uppercase tracking-wider text-white/40">Stav</th>
                <th className="px-4 py-3 text-right text-[10px] uppercase tracking-wider text-white/40">Akcie</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((match) => (
                <tr key={match.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-5 py-3.5 text-white/60 whitespace-nowrap">
                    <p>{formatDate(match.match_date)}</p>
                    <p className="text-xs text-white/30">{formatTime(match.match_date)}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="text-white font-semibold">
                      {match.home_team?.name ?? "?"} <span className="text-white/30">vs</span> {match.away_team?.name ?? "?"}
                    </p>
                    {match.venue && <p className="text-xs text-white/30 mt-0.5">{match.venue}</p>}
                  </td>
                  <td className="px-4 py-3.5 text-center font-garet font-bold text-white">
                    {match.home_score !== null && match.away_score !== null
                      ? `${match.home_score} : ${match.away_score}`
                      : "—"}
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs text-white/50">{match.competition?.name ?? "—"}</span>
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold badge-${match.status}`}>
                      {STATUS_LABELS[match.status] ?? match.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <Link
                      href={`/admin/zapasy/${match.id}`}
                      className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/20 transition-colors"
                    >
                      Upraviť
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </GlassCard>
    </div>
  );
}
