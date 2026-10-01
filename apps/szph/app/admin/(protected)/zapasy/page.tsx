import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@szph/db/client";
import { getAllMatches, getAllCompetitions, getAllTeams } from "@szph/db";
import Link from "next/link";
import { formatDate, formatTime } from "@szph/ui";
import { InlineScore } from "./InlineScore";
import { DeleteMatchButton } from "./DeleteMatchButton";
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
          <h1 className="text-2xl font-bold text-[#051937]">Zápasy</h1>
          <p className="text-sm text-[#64748b] mt-1">{matches.length} zápasov celkovo</p>
        </div>
        <Link
          href="/admin/zapasy/novy"
          className="inline-flex items-center gap-2 rounded-xl bg-[#016fb4] px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#016fb4]/90"
        >
          + Nový zápas
        </Link>
      </div>

      <div className="rounded-2xl overflow-x-auto" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
        {matches.length === 0 ? (
          <div className="py-16 text-center text-[#64748b]">Žiadne zápasy</div>
        ) : (
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="border-b border-[rgba(1,45,116,0.08)]">
                <th className="px-5 py-3 text-left text-[10px] uppercase tracking-wider text-[#64748b]">Dátum</th>
                <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-[#64748b]">Zápas</th>
                <th className="px-4 py-3 text-center text-[10px] uppercase tracking-wider text-[#64748b]">Skóre</th>
                <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-[#64748b]">Súťaž</th>
                <th className="px-4 py-3 text-center text-[10px] uppercase tracking-wider text-[#64748b]">Stav</th>
                <th className="px-4 py-3 text-right text-[10px] uppercase tracking-wider text-[#64748b]">Akcie</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((match) => (
                <tr key={match.id} className="border-b border-[rgba(1,45,116,0.08)] hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 text-[#64748b] whitespace-nowrap">
                    <p>{formatDate(match.match_date)}</p>
                    <p className="text-xs text-[#94a3b8]">{formatTime(match.match_date)}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="text-[#051937] font-semibold">
                      {match.home_team?.name ?? "?"} <span className="text-[#94a3b8]">vs</span> {match.away_team?.name ?? "?"}
                    </p>
                    {match.venue && <p className="text-xs text-[#94a3b8] mt-0.5">{match.venue}</p>}
                    <div className="flex items-center gap-1.5 mt-0.5">
                      {(match as any).video_url && (
                        <span className="inline-flex items-center gap-1 text-[9px] font-bold text-[#d80027]">
                          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                          VIDEO
                        </span>
                      )}
                      {(match as any).goals?.length > 0 && (
                        <span className="text-[9px] font-bold text-[#16a34a]">{(match as any).goals.length} gólov</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <InlineScore
                      matchId={match.id}
                      homeScore={match.home_score}
                      awayScore={match.away_score}
                      status={match.status}
                      homeTeamName={match.home_team?.name}
                      awayTeamName={match.away_team?.name}
                    />
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs text-[#64748b]">{match.competition?.name ?? "—"}</span>
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      match.status === "scheduled" ? "bg-emerald-500/15 text-emerald-600" :
                      match.status === "finished" ? "bg-gray-100 text-[#64748b]" :
                      match.status === "live" ? "bg-blue-500/15 text-blue-600" :
                      match.status === "postponed" ? "bg-red-500/15 text-red-600" :
                      "bg-gray-100 text-[#64748b]"
                    }`}>
                      {STATUS_LABELS[match.status] ?? match.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/zapasy/${match.id}`}
                        className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-semibold text-[#051937] hover:bg-gray-200 transition-colors"
                      >
                        Upraviť
                      </Link>
                      <DeleteMatchButton id={match.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
