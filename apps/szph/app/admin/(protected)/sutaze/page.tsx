import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@szph/db/client";
import { getAllCompetitions } from "@szph/db";
import Link from "next/link";
import { GlassCard } from "@szph/ui";
import { CompetitionActions } from "./CompetitionActions";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Súťaže" };

export default async function AdminSutazePage() {
  const cookieStore = await cookies();
  const supabase = createServerSupabaseClient(cookieStore);
  const competitions = await getAllCompetitions(supabase).catch(() => []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-garet text-2xl font-bold text-white">Súťaže</h1>
          <p className="text-sm text-white/40 mt-1">{competitions.length} súťaží</p>
        </div>
        <Link
          href="/admin/sutaze/nova"
          className="inline-flex items-center gap-2 rounded-xl bg-[var(--sky)] px-4 py-2.5 text-sm font-bold text-white hover:bg-[var(--sky-light)] transition-all"
        >
          + Nová súťaž
        </Link>
      </div>

      <GlassCard hover={false} className="overflow-hidden">
        {competitions.length === 0 ? (
          <div className="py-16 text-center text-white/40">Žiadne súťaže</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-5 py-3 text-left text-[10px] uppercase tracking-wider text-white/40">Názov</th>
                <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-white/40">Sezóna</th>
                <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-white/40">Typ</th>
                <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-white/40">Kategória</th>
                <th className="px-4 py-3 text-right text-[10px] uppercase tracking-wider text-white/40">Akcie</th>
              </tr>
            </thead>
            <tbody>
              {competitions.map((comp) => (
                <tr key={comp.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-5 py-4 font-semibold text-white">{comp.name}</td>
                  <td className="px-4 py-4 text-white/60">{comp.season}</td>
                  <td className="px-4 py-4">
                    <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-white/60 capitalize">{comp.type}</span>
                  </td>
                  <td className="px-4 py-4 text-white/60">{comp.category}</td>
                  <td className="px-4 py-4 text-right">
                    <CompetitionActions id={comp.id} />
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
