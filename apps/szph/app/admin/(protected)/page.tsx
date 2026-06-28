import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@szph/db/client";
import { formatDate } from "@szph/ui";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard" };

async function getDashboardStats() {
  const cookieStore = await cookies();
  const supabase = createServerSupabaseClient(cookieStore);

  const [articles, videos, matches, teams] = await Promise.allSettled([
    supabase.from("articles").select("id, status, title, updated_at").order("updated_at", { ascending: false }).limit(5),
    supabase.from("videos").select("id", { count: "exact" }),
    supabase.from("matches").select("id, match_date, status, home_team:teams!matches_home_team_id_fkey(name), away_team:teams!matches_away_team_id_fkey(name)").eq("status", "scheduled").gte("match_date", new Date().toISOString()).order("match_date").limit(5),
    supabase.from("teams").select("id", { count: "exact" }),
  ]);

  return {
    recentArticles: articles.status === "fulfilled" ? (articles.value.data ?? []) : [],
    videoCount:     videos.status === "fulfilled"   ? (videos.value.count ?? 0)  : 0,
    upcomingMatches: matches.status === "fulfilled" ? (matches.value.data ?? []) : [],
    teamCount:      teams.status === "fulfilled"    ? (teams.value.count ?? 0)   : 0,
  };
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats();
  const publishedCount = stats.recentArticles.filter((a: any) => a.status === "published").length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#051937]">Dashboard</h1>
        <p className="text-sm text-[#64748b] mt-1">Vitajte v admin paneli SZPH</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Publikovaných článkov", value: publishedCount, color: "#016fb4" },
          { label: "Videí",                 value: stats.videoCount,  color: "#a78bfa" },
          { label: "Tímov",                 value: stats.teamCount,   color: "#34d399" },
          { label: "Nadchádzajúcich zápasov", value: stats.upcomingMatches.length, color: "#C8102E" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl p-5" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-[#64748b]">{stat.label}</p>
                <p className="text-3xl font-black mt-1" style={{ color: stat.color }}>{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent articles */}
        <div className="rounded-2xl p-6" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold text-[#051937]">Posledné články</h2>
            <a href="/admin/clanky" className="text-xs text-blue-400 hover:underline">Všetky →</a>
          </div>
          {stats.recentArticles.length === 0 ? (
            <p className="text-sm text-[#64748b]">Žiadne články</p>
          ) : (
            <ul className="space-y-3">
              {stats.recentArticles.map((article: any) => (
                <li key={article.id} className="flex items-center justify-between gap-2">
                  <a href={`/admin/clanky/upravit/${article.id}`} className="text-sm text-[#051937] hover:text-[#016fb4] truncate flex-1">
                    {article.title}
                  </a>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${article.status === "published" ? "bg-emerald-500/20 text-emerald-400" : "bg-white/10 text-[#64748b]"}`}>
                    {article.status === "published" ? "pub." : "draft"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Upcoming matches */}
        <div className="rounded-2xl p-6" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold text-[#051937]">Najbližšie zápasy</h2>
            <a href="/admin/zapasy" className="text-xs text-blue-400 hover:underline">Všetky →</a>
          </div>
          {stats.upcomingMatches.length === 0 ? (
            <p className="text-sm text-[#64748b]">Žiadne naplánované zápasy</p>
          ) : (
            <ul className="space-y-3">
              {stats.upcomingMatches.map((match: any) => (
                <li key={match.id} className="text-sm">
                  <span className="text-[#64748b] text-xs">{formatDate(match.match_date)} </span>
                  <span className="text-[#051937]">
                    {match.home_team?.name ?? "?"} vs {match.away_team?.name ?? "?"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="font-bold text-[#051937] mb-4">Rýchle akcie</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "Nový článok", href: "/admin/clanky/novy" },
            { label: "Pridať zápas", href: "/admin/zapasy/novy" },
            { label: "Nový tím",    href: "/admin/timy/novy" },
            { label: "Pridať video", href: "/admin/videa" },
          ].map((action) => (
            <a
              key={action.href}
              href={action.href}
              className="inline-flex items-center gap-2 rounded-xl border border-[rgba(1,45,116,0.1)] bg-white px-4 py-2.5 text-sm font-semibold text-[#051937] transition-all hover:bg-gray-50"
            >
              + {action.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
