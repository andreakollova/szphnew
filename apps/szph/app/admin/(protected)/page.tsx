import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@szph/db/client";
import { formatDate, formatTime } from "@szph/ui";
import Link from "next/link";
import type { Metadata } from "next";
import { InlineScore } from "./zapasy/InlineScore";
import { DeleteMatchButton } from "./zapasy/DeleteMatchButton";
import { DashboardUlohy } from "./DashboardUlohy";
import { NajblizsiaSkhodza } from "./NajblizsiaSkhodza";

export const metadata: Metadata = { title: "Dashboard" };

async function getDashboardData() {
  const cookieStore = await cookies();
  const supabase = createServerSupabaseClient(cookieStore);

  const now = new Date().toISOString();
  const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();

  const [articles, allMatches, matchCount, partners] = await Promise.allSettled([
    supabase.from("articles").select("id, status, title, category, published_at, updated_at, site").order("updated_at", { ascending: false }).limit(9),
    supabase.from("matches").select("*").eq("site", "szph").order("date", { ascending: false }).limit(50),
    supabase.from("matches").select("id", { count: "exact" }).eq("site", "szph"),
    supabase.from("partners").select("id, name, logo_url, tier, url").order("sort_order"),
  ]);

  const matchesData = allMatches.status === "fulfilled" ? (allMatches.value.data ?? []) : [];

  // Find overdue matches: scheduled, started 2h+ ago, no score
  const overdueMatches = matchesData.filter((m: any) =>
    m.status === "scheduled" && m.date < twoHoursAgo
  );

  // Upcoming matches
  const upcomingMatches = matchesData.filter((m: any) =>
    m.status === "scheduled" && m.date >= now
  ).sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Recent finished
  const recentFinished = matchesData.filter((m: any) =>
    m.status === "finished"
  ).slice(0, 5);

  // Count unique teams from matches
  const teamNames = new Set<string>();
  matchesData.forEach((m: any) => {
    if (m.home_team) teamNames.add(m.home_team);
    if (m.away_team) teamNames.add(m.away_team);
  });

  return {
    articles: articles.status === "fulfilled" ? (articles.value.data ?? []) : [],
    overdueMatches,
    upcomingMatches: upcomingMatches.slice(0, 8),
    recentFinished,
    teamCount: teamNames.size,
    partners: partners.status === "fulfilled" ? (partners.value.data ?? []) : [],
    totalMatches: matchCount.status === "fulfilled" ? (matchCount.value.count ?? 0) : 0,
  };
}

export default async function AdminDashboard() {
  const data = await getDashboardData();

  const STATUS_LABELS: Record<string, string> = {
    scheduled: "Plánovaný", live: "Naživo", finished: "Odohraný", postponed: "Preložený",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#051937]">Dashboard</h1>
        <p className="text-sm text-[#334155] mt-1">Vitajte v admin paneli SZPH</p>
      </div>

      {/* OVERDUE MATCHES — red alert */}
      {data.overdueMatches.length > 0 && (
        <div className="rounded p-5" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="h-2 w-2 rounded-full bg-[#d00027] animate-pulse" />
            <h2 className="font-bold text-[#d00027]" style={{ fontSize: "14px" }}>Zápasy bez výsledku</h2>
            <span className="text-[#d00027]/60 font-bold" style={{ fontSize: "11px" }}>({data.overdueMatches.length})</span>
          </div>
          <p className="text-[#64748b] mb-4" style={{ fontSize: "12px" }}>Tieto zápasy sa už mali odohrať, ale nemajú zadaný výsledok.</p>
          <div className="space-y-2">
            {data.overdueMatches.map((m: any) => (
              <div key={m.id} className="flex items-center gap-3 bg-white rounded p-3" style={{ border: "1px solid rgba(1,45,116,0.06)" }}>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[#051937] truncate" style={{ fontSize: "13px" }}>
                    {m.home_short || m.home_team || "?"} vs {m.away_short || m.away_team || "?"}
                  </p>
                  <p className="text-[#94a3b8]" style={{ fontSize: "11px" }}>{formatDate(m.date)} · {formatTime(m.date)}{m.venue ? ` · ${m.venue}` : ""}</p>
                </div>
                <InlineScore matchId={m.id} homeScore={m.home_score} awayScore={m.away_score} status={m.status} />
                <Link href={`/admin/zapasy/${m.id}`} className="shrink-0 rounded bg-[#d00027] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#d00027]/90 transition-colors">
                  Zadať výsledok
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Matches section — main focus */}
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">

        {/* Zápasy */}
        <div className="space-y-5">

          {/* Nadchádzajúce */}
          <div className="rounded p-5" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-[#051937]" style={{ fontSize: "14px" }}>Nadchádzajúce zápasy</h2>
              <div className="flex gap-2">
                <Link href="/admin/zapasy/novy" className="rounded bg-[#012d74] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#012d74]/90 transition-colors">
                  + Nový zápas
                </Link>
                <Link href="/admin/zapasy" className="text-xs text-[#016fb4] hover:underline self-center">Všetky</Link>
              </div>
            </div>
            {data.upcomingMatches.length === 0 ? (
              <p className="text-sm text-[#334155] py-4">Žiadne naplánované zápasy</p>
            ) : (
              <div className="space-y-1">
                {data.upcomingMatches.map((m: any) => (
                  <Link key={m.id} href={`/admin/zapasy/${m.id}`} className="flex items-center gap-3 rounded p-2.5 hover:bg-gray-50 transition-colors">
                    <div className="shrink-0 text-[#94a3b8]" style={{ fontSize: "11px", width: "70px" }}>
                      <p className="font-bold">{formatDate(m.date)}</p>
                      <p>{formatTime(m.date)}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-[#051937] truncate" style={{ fontSize: "13px" }}>
                        {m.home_short || m.home_team || "?"} vs {m.away_short || m.away_team || "?"}
                      </p>
                      {m.venue && <p className="text-[#94a3b8] truncate" style={{ fontSize: "10px" }}>{m.venue}</p>}
                    </div>
                    <span className="shrink-0 rounded-full px-2 py-0.5 text-[9px] font-semibold text-[#64748b]" style={{ background: "#f0f2f5" }}>
                      {STATUS_LABELS[m.status] ?? m.status}
                    </span>
                    <span className="shrink-0 rounded px-2.5 py-1 text-[10px] font-bold text-[#012d74] hover:bg-[#012d74]/10 transition-colors">
                      Editovať
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Články — compact */}
        <div className="space-y-5">
          <div className="rounded p-5" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-[#051937]" style={{ fontSize: "14px" }}>Posledné články</h2>
              <div className="flex gap-2">
                <Link href="/admin/clanky/novy" className="rounded bg-[#012d74] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#012d74]/90 transition-colors">
                  + Nový článok
                </Link>
                <Link href="/admin/clanky" className="text-xs text-[#016fb4] hover:underline self-center">Všetky</Link>
              </div>
            </div>
            {data.articles.length === 0 ? (
              <p className="text-sm text-[#334155]">Žiadne články</p>
            ) : (
              <div className="space-y-1">
                {data.articles.map((a: any) => (
                  <Link key={a.id} href={`/admin/clanky/upravit/${a.id}`} className="flex items-center gap-2 rounded p-2 hover:bg-gray-50 transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="text-[#051937] font-semibold truncate" style={{ fontSize: "12px" }}>{a.title}</p>
                      <p className="text-[#94a3b8]" style={{ fontSize: "10px" }}>{a.category} · {formatDate(a.updated_at)}</p>
                    </div>
                    <span className="shrink-0 rounded-full px-2 py-0.5 text-[9px] font-semibold" style={{ background: "#f0f2f5", color: "#64748b" }}>
                      {a.status === "published" ? "pub." : "draft"}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Schôdza + Úlohy vedľa seba */}
      <div className="grid gap-6 lg:grid-cols-2">
        <NajblizsiaSkhodza />
        <DashboardUlohy />
      </div>
    </div>
  );
}
