import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@szph/db/client";
import Link from "next/link";
import type { Metadata } from "next";
import { DeleteTeamButton } from "./DeleteTeamButton";

export const metadata: Metadata = { title: "Timy" };

async function getTeams(supabase: any) {
  // Try teams table first
  const { data: dbTeams } = await supabase.from("teams").select("*").order("name");
  if (dbTeams && dbTeams.length > 0) return dbTeams;

  // Fallback: extract from matches
  const { data } = await supabase
    .from("matches")
    .select("home_team, home_short, home_logo, away_team, away_short, away_logo")
    .eq("site", "szph");

  if (!data) return [];

  const teamMap = new Map<string, { name: string; short_name: string; logo_url: string | null; category: string }>();
  for (const m of data) {
    if (m.home_team && !teamMap.has(m.home_team)) {
      teamMap.set(m.home_team, { name: m.home_team, short_name: m.home_short || "", logo_url: m.home_logo || null, category: "muzi" });
    }
    if (m.away_team && !teamMap.has(m.away_team)) {
      teamMap.set(m.away_team, { name: m.away_team, short_name: m.away_short || "", logo_url: m.away_logo || null, category: "muzi" });
    }
  }

  return Array.from(teamMap.entries()).map(([name, t]) => ({ id: name, ...t })).sort((a, b) => a.name.localeCompare(b.name, "sk"));
}

export default async function AdminTimyPage() {
  const cookieStore = await cookies();
  const supabase = createServerSupabaseClient(cookieStore);
  const teams = await getTeams(supabase);

  const CATEGORY_LABELS: Record<string, string> = {
    muzi: "Muzi", zeny: "Zeny", U18: "U18", U14: "U14", U12: "U12",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#051937]">Timy</h1>
          <p className="text-sm text-[#64748b] mt-1">{teams.length} timov celkovo</p>
        </div>
        <Link
          href="/admin/timy/novy"
          className="inline-flex items-center gap-2 rounded bg-[#012d74] px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#012d74]/90"
        >
          + Novy tim
        </Link>
      </div>

      <div className="rounded overflow-hidden" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
        {teams.length === 0 ? (
          <div className="py-16 text-center text-[#64748b]">Ziadne timy</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[rgba(1,45,116,0.08)]">
                <th className="px-5 py-3 text-left text-[10px] uppercase tracking-wider text-[#64748b]">Tim</th>
                <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-[#64748b]">Skratka</th>
                <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-[#64748b]">Kategoria</th>
                <th className="px-4 py-3 text-right text-[10px] uppercase tracking-wider text-[#64748b]">Akcie</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team: any) => (
                <tr key={team.id} className="border-b border-[rgba(1,45,116,0.08)] hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      {team.logo_url ? (
                        (() => {
                          const logo = team.logo_url;
                          if (logo.startsWith("flag:")) {
                            const code = logo.replace("flag:", "");
                            return (
                              <div className="shrink-0 overflow-hidden rounded-full" style={{ width: 32, height: 32 }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={`https://flagcdn.com/w80/${code}.png`} alt="" width={32} height={32} style={{ width: 32, height: 32, objectFit: "cover" }} />
                              </div>
                            );
                          }
                          return (
                            <div className="shrink-0" style={{ width: 32, height: 32 }}>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={logo} alt="" width={32} height={32} style={{ width: 32, height: 32, objectFit: "contain" }} />
                            </div>
                          );
                        })()
                      ) : (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-[10px] font-bold text-[#64748b] shrink-0">
                          {(team.short_name || team.name).slice(0, 3)}
                        </div>
                      )}
                      <span className="font-semibold text-[#051937]">{team.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-[#64748b]">{team.short_name || "—"}</td>
                  <td className="px-4 py-3.5">
                    <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-[#64748b]">
                      {CATEGORY_LABELS[team.category] || team.category || "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/timy/${team.id}`} className="rounded bg-gray-100 px-3 py-1.5 text-xs font-semibold text-[#051937] hover:bg-gray-200 transition-colors">
                        Upravit
                      </Link>
                      <DeleteTeamButton id={team.id} name={team.name} />
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
