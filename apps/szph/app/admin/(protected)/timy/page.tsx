import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@szph/db/client";
import { getAllTeams } from "@szph/db";
import Link from "next/link";
import Image from "next/image";
import { GlassCard } from "@szph/ui";
import type { Team } from "@szph/db/types";
import type { Metadata } from "next";

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
          <h1 className="font-garet text-2xl font-bold text-white">Tímy</h1>
          <p className="text-sm text-white/40 mt-1">{teams.length} tímov celkovo</p>
        </div>
        <Link
          href="/admin/timy/novy"
          className="inline-flex items-center gap-2 rounded-xl bg-[var(--sky)] px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-[var(--sky-light)]"
        >
          + Nový tím
        </Link>
      </div>

      {Object.entries(byCategory).map(([category, categoryTeams]) => (
        <div key={category}>
          <h2 className="font-garet font-bold text-white/60 mb-3 text-sm uppercase tracking-wider">
            {CATEGORY_LABELS[category] ?? category}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categoryTeams.map((team) => (
              <GlassCard key={team.id} className="p-4" hover>
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
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white/50 shrink-0">
                      {team.short_name?.slice(0, 2) ?? "?"}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="font-garet font-bold text-white text-sm truncate">{team.name}</p>
                    {team.short_name && (
                      <p className="text-xs text-white/40">{team.short_name}</p>
                    )}
                  </div>
                </div>
                <div className="mt-3 flex justify-end">
                  <Link
                    href={`/admin/timy/${team.id}`}
                    className="text-xs text-[var(--sky)] hover:underline"
                  >
                    Upraviť →
                  </Link>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      ))}

      {teams.length === 0 && (
        <GlassCard hover={false} className="py-16 text-center">
          <p className="text-white/40">Žiadne tímy. Vytvorte prvý tím!</p>
        </GlassCard>
      )}
    </div>
  );
}
