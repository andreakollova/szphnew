import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@szph/db/client";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Tímy" };

async function getTeams(supabase: any) {
  const { data } = await supabase
    .from("matches")
    .select("home_team, home_short, home_logo, away_team, away_short, away_logo")
    .eq("site", "szph");

  if (!data) return [];

  const teamMap = new Map<string, { name: string; short: string; logo: string | null }>();
  for (const m of data) {
    if (m.home_team && !teamMap.has(m.home_team)) {
      teamMap.set(m.home_team, { name: m.home_team, short: m.home_short || "", logo: m.home_logo || null });
    }
    if (m.away_team && !teamMap.has(m.away_team)) {
      teamMap.set(m.away_team, { name: m.away_team, short: m.away_short || "", logo: m.away_logo || null });
    }
  }

  return Array.from(teamMap.values()).sort((a, b) => a.name.localeCompare(b.name, "sk"));
}

export default async function AdminTimyPage() {
  const cookieStore = await cookies();
  const supabase = createServerSupabaseClient(cookieStore);
  const teams = await getTeams(supabase);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#051937]">Tímy</h1>
          <p className="text-sm text-[#64748b] mt-1">{teams.length} tímov celkovo</p>
        </div>
        <Link
          href="/admin/timy/novy"
          className="inline-flex items-center gap-2 rounded bg-[#012d74] px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#012d74]/90"
        >
          + Nový tím
        </Link>
      </div>

      {teams.length === 0 ? (
        <div className="rounded py-16 text-center" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
          <p className="text-[#64748b]">Žiadne tímy</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {teams.map((team) => (
            <div key={team.name} className="rounded p-4 flex items-center gap-3" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
              {team.logo ? (
                (() => {
                  if (team.logo.startsWith("flag:")) {
                    const code = team.logo.replace("flag:", "");
                    return (
                      <div className="shrink-0 overflow-hidden rounded-full" style={{ width: 40, height: 40 }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={`https://flagcdn.com/w80/${code}.png`} alt={team.name} width={40} height={40} style={{ width: 40, height: 40, objectFit: "cover" }} />
                      </div>
                    );
                  }
                  return (
                    <div className="shrink-0" style={{ width: 40, height: 40 }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={team.logo} alt={team.name} width={40} height={40} style={{ width: 40, height: 40, objectFit: "contain" }} />
                    </div>
                  );
                })()
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-[#64748b] shrink-0">
                  {team.short?.slice(0, 3) || team.name.slice(0, 2)}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="font-bold text-[#051937] text-sm truncate">{team.name}</p>
                {team.short && <p className="text-xs text-[#64748b]">{team.short}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
