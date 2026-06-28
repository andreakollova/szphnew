import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@szph/db/client";
import { getAllTeams } from "@szph/db";
import Link from "next/link";
import Image from "next/image";
import type { Team } from "@szph/db/types";
import type { Metadata } from "next";
import { DeleteTeamButton } from "./DeleteTeamButton";

export const metadata: Metadata = { title: "Tímy" };

export default async function AdminTimyPage() {
  const cookieStore = await cookies();
  const supabase = createServerSupabaseClient(cookieStore);
  const teams = await getAllTeams(supabase).catch(() => []);

  const byCategory = teams.reduce<Record<string, Team[]>>((acc, team) => {
    if (!acc[team.category]) acc[team.category] = [];
    acc[team.category]!.push(team);
    return acc;
  }, {});

  const CATEGORY_LABELS: Record<string, string> = {
    muzi: "Muži", zeny: "Ženy", U18: "U18", U14: "U14", U12: "U12",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#051937]">Tímy</h1>
          <p className="text-sm text-[#64748b] mt-1">{teams.length} tímov celkovo</p>
        </div>
        <Link
          href="/admin/timy/novy"
          className="inline-flex items-center gap-2 rounded-xl bg-[#016fb4] px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#016fb4]/90"
        >
          + Nový tím
        </Link>
      </div>

      {Object.entries(byCategory).map(([category, categoryTeams]) => (
        <div key={category}>
          <h2 className="font-bold text-[#64748b] mb-3 text-sm uppercase tracking-wider">
            {CATEGORY_LABELS[category] ?? category}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categoryTeams.map((team) => (
              <div key={team.id} className="rounded-2xl p-4" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
                <div className="flex items-center gap-3">
                  {team.logo_url ? (
                    <div className="relative h-12 w-12 shrink-0">
                      <Image
                        src={team.logo_url}
                        alt={team.name}
                        fill
                        className="object-contain"
                        sizes="48px"
                      />
                    </div>
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-[#64748b] shrink-0">
                      {team.short_name?.slice(0, 2) ?? "?"}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="font-bold text-[#051937] text-sm truncate">{team.name}</p>
                    {team.short_name && (
                      <p className="text-xs text-[#64748b]">{team.short_name}</p>
                    )}
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <DeleteTeamButton id={team.id} name={team.name} />
                  <Link
                    href={`/admin/timy/${team.id}`}
                    className="text-xs text-[#016fb4] hover:underline"
                  >
                    Upraviť →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {teams.length === 0 && (
        <div className="rounded-2xl py-16 text-center" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
          <p className="text-[#64748b]">Žiadne tímy. Vytvorte prvý tím!</p>
        </div>
      )}
    </div>
  );
}
