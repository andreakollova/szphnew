import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@szph/db/client";
import { GlassCard, GlassPanel } from "@szph/ui";
import { formatDate } from "@szph/ui";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard" };

async function getDashboardStats(supabase: ReturnType<typeof createServerSupabaseClient>) {
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
  const cookieStore = await cookies();
  const supabase = createServerSupabaseClient(cookieStore);
  const stats = await getDashboardStats(supabase);

  const publishedCount = stats.recentArticles.filter((a) => a.status === "published").length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-garet text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-white/40 mt-1">Vitajte v admin paneli SZPH</p>
      </div>

      {/* Štatistiky */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Publikovaných článkov", value: publishedCount, icon: "📝", color: "var(--sky)" },
          { label: "Videí",                 value: stats.videoCount,  icon: "🎬", color: "#a78bfa" },
          { label: "Tímov",                 value: stats.teamCount,   icon: "🏒", color: "#34d399" },
          { label: "Nadch. zápasov",        value: stats.upcomingMatches.length, icon: "⚽", color: "var(--red)" },
        ].map((stat) => (
          <GlassCard key={stat.label} className="p-5" hover={false}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-white/40">{stat.label}</p>
                <p
                  className="font-garet text-3xl font-black mt-1"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </p>
              </div>
              <span className="text-2xl">{stat.icon}</span>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Posledné články */}
        <GlassCard className="p-6" hover={false}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-garet font-bold text-white">Posledné články</h2>
            <a href="/admin/clanky" className="text-xs text-[var(--sky)] hover:underline">Všetky →</a>
          </div>
          {stats.recentArticles.length === 0 ? (
            <p className="text-sm text-white/40">Žiadne články</p>
          ) : (
            <ul className="space-y-3">
              {stats.recentArticles.map((article) => (
                <li key={article.id} className="flex items-center justify-between gap-2">
                  <a
                    href={`/admin/clanky/upravit/${article.id}`}
                    className="text-sm text-white/80 hover:text-white truncate flex-1"
                  >
                    {article.title}
                  </a>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      article.status === "published"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-white/10 text-white/40"
                    }`}
                  >
                    {article.status === "published" ? "pub." : "draft"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </GlassCard>

        {/* Najbližšie zápasy */}
        <GlassCard className="p-6" hover={false}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-garet font-bold text-white">Najbližšie zápasy</h2>
            <a href="/admin/zapasy" className="text-xs text-[var(--sky)] hover:underline">Všetky →</a>
          </div>
          {stats.upcomingMatches.length === 0 ? (
            <p className="text-sm text-white/40">Žiadne naplánované zápasy</p>
          ) : (
            <ul className="space-y-3">
              {stats.upcomingMatches.map((match) => (
                <li key={match.id} className="text-sm">
                  <span className="text-white/40 text-xs">{formatDate(match.match_date)} </span>
                  <span className="text-white/80">
                    {(match.home_team as unknown as { name: string } | null)?.name ?? "?"} vs{" "}
                    {(match.away_team as unknown as { name: string } | null)?.name ?? "?"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </GlassCard>
      </div>

      {/* Quick akcie */}
      <div>
        <h2 className="font-garet font-bold text-white mb-4">Rýchle akcie</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "Nový článok", href: "/admin/clanky/novy", icon: "✏️" },
            { label: "Pridať zápas", href: "/admin/zapasy/novy", icon: "⚽" },
            { label: "Nový tím",    href: "/admin/timy/novy",   icon: "🏒" },
            { label: "Pridať video", href: "/admin/videa",       icon: "🎬" },
          ].map((action) => (
            <a
              key={action.href}
              href={action.href}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/8 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/15"
            >
              {action.icon} {action.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
