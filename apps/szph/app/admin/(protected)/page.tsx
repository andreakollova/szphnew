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
    supabase.from("articles").select("id, status, title, category, published_at, updated_at, site").order("updated_at", { ascending: false }).limit(12),
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

      {/* Evidencia — rýchle odkazy */}
      <div className="rounded-xl p-5" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
        <h2 className="font-bold text-[#051937] mb-4" style={{ fontSize: "14px" }}>Evidencia</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {[
            { label: "Články", href: "/admin/clanky", icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" },
            { label: "Zápasy", href: "/admin/zapasy", icon: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" },
            { label: "Tímy", href: "/admin/timy", icon: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" },
            { label: "Súťaže", href: "/admin/sutaze", icon: "M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" },
            { label: "Cvičenia", href: "/admin/cvicenia", icon: "M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" },
            { label: "Partneri", href: "/admin/partneri", icon: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="flex flex-col items-center gap-2 rounded-xl p-4 hover:bg-[#f0f4fa] transition-colors" style={{ border: "1px solid rgba(1,45,116,0.06)" }}>
              <svg className="h-5 w-5 text-[#012d74]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
              <span className="font-bold text-[#051937]" style={{ fontSize: "11px" }}>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* OVERDUE MATCHES — red alert */}
      {data.overdueMatches.length > 0 && (
        <div className="rounded-xl p-5" style={{ background: "rgba(220,38,38,0.05)", border: "1px solid rgba(220,38,38,0.15)" }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            <h2 className="font-bold text-red-600" style={{ fontSize: "14px" }}>Zápasy bez výsledku</h2>
            <span className="text-red-400 font-bold" style={{ fontSize: "11px" }}>({data.overdueMatches.length})</span>
          </div>
          <p className="text-red-400 mb-4" style={{ fontSize: "12px" }}>Tieto zápasy sa už mali odohrať, ale nemajú zadaný výsledok.</p>
          <div className="space-y-2">
            {data.overdueMatches.map((m: any) => (
              <div key={m.id} className="flex items-center gap-3 bg-white rounded-lg p-3" style={{ border: "1px solid rgba(220,38,38,0.12)" }}>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[#051937] truncate" style={{ fontSize: "13px" }}>
                    {m.home_short || m.home_team || "?"} vs {m.away_short || m.away_team || "?"}
                  </p>
                  <p className="text-[#94a3b8]" style={{ fontSize: "11px" }}>{formatDate(m.date)} · {formatTime(m.date)}</p>
                </div>
                <InlineScore matchId={m.id} homeScore={m.home_score} awayScore={m.away_score} status={m.status} />
                <Link href={`/admin/zapasy/${m.id}`} className="shrink-0 rounded-lg bg-red-500 px-3 py-1.5 text-xs font-bold text-white hover:bg-red-600 transition-colors">
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
          <div className="rounded-xl p-5" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-[#051937]" style={{ fontSize: "14px" }}>Nadchádzajúce zápasy</h2>
              <div className="flex gap-2">
                <Link href="/admin/zapasy/novy" className="rounded-lg bg-[#016fb4] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#016fb4]/90 transition-colors">
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
                  <Link key={m.id} href={`/admin/zapasy/${m.id}`} className="flex items-center gap-3 rounded-lg p-2.5 hover:bg-gray-50 transition-colors">
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
                    <span className="shrink-0 rounded-full px-2 py-0.5 text-[9px] font-semibold bg-emerald-500/15 text-emerald-600">
                      {STATUS_LABELS[m.status] ?? m.status}
                    </span>
                    <svg className="h-3.5 w-3.5 text-[#94a3b8] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Posledné odohraté */}
          {data.recentFinished.length > 0 && (
            <div className="rounded-xl p-5" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-[#051937]" style={{ fontSize: "14px" }}>Posledné výsledky</h2>
              </div>
              <div className="space-y-1">
                {data.recentFinished.map((m: any) => (
                  <Link key={m.id} href={`/admin/zapasy/${m.id}`} className="flex items-center gap-3 rounded-lg p-2.5 hover:bg-gray-50 transition-colors">
                    <div className="shrink-0 text-[#94a3b8]" style={{ fontSize: "11px", width: "70px" }}>
                      <p className="font-bold">{formatDate(m.date)}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-[#051937] truncate" style={{ fontSize: "13px" }}>
                        {m.home_short || m.home_team || "?"} vs {m.away_short || m.away_team || "?"}
                      </p>
                    </div>
                    <div className="shrink-0 flex items-center gap-1 font-bold" style={{ fontSize: "14px" }}>
                      <span className="text-[#051937]">{m.home_score ?? 0}</span>
                      <span className="text-[#94a3b8]" style={{ fontSize: "10px" }}>:</span>
                      <span className="text-[#051937]">{m.away_score ?? 0}</span>
                    </div>
                    <svg className="h-3.5 w-3.5 text-[#94a3b8] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Články — compact */}
        <div className="space-y-5">
          <div className="rounded-xl p-5" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-[#051937]" style={{ fontSize: "14px" }}>Posledné články</h2>
              <div className="flex gap-2">
                <Link href="/admin/clanky/novy" className="rounded-lg bg-[#016fb4] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#016fb4]/90 transition-colors">
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
                  <Link key={a.id} href={`/admin/clanky/upravit/${a.id}`} className="flex items-center gap-2 rounded-lg p-2 hover:bg-gray-50 transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="text-[#051937] font-semibold truncate" style={{ fontSize: "12px" }}>{a.title}</p>
                      <p className="text-[#94a3b8]" style={{ fontSize: "10px" }}>{a.category} · {formatDate(a.updated_at)}</p>
                    </div>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-semibold ${a.status === "published" ? "bg-emerald-500/15 text-emerald-600" : "bg-gray-100 text-[#334155]"}`}>
                      {a.status === "published" ? "pub." : "draft"}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Najbližšia schôdza */}
          <NajblizsiaSkhodza />

          {/* Úlohy */}
          <DashboardUlohy />
        </div>
      </div>
    </div>
  );
}
