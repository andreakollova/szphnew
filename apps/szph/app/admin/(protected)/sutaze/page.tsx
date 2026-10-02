import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@szph/db/client";
import { getAllCompetitions } from "@szph/db";
import Link from "next/link";
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
          <h1 className="text-2xl font-bold text-[#051937]">Súťaže</h1>
          <p className="text-sm text-[#64748b] mt-1">{competitions.length} súťaží</p>
        </div>
        <Link
          href="/admin/sutaze/nova"
          className="inline-flex items-center gap-2 rounded bg-[#012d74] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#012d74]/90 transition-all"
        >
          + Nová súťaž
        </Link>
      </div>

      <div className="rounded overflow-hidden" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
        {competitions.length === 0 ? (
          <div className="py-16 text-center text-[#64748b]">Žiadne súťaže</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[rgba(1,45,116,0.08)]">
                <th className="px-5 py-3 text-left text-[10px] uppercase tracking-wider text-[#64748b]">Názov</th>
                <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-[#64748b]">Sezóna</th>
                <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-[#64748b]">Typ</th>
                <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-[#64748b]">Kategória</th>
                <th className="px-4 py-3 text-right text-[10px] uppercase tracking-wider text-[#64748b]">Akcie</th>
              </tr>
            </thead>
            <tbody>
              {competitions.map((comp) => (
                <tr key={comp.id} className="border-b border-[rgba(1,45,116,0.08)] hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4 font-semibold text-[#051937]">{comp.name}</td>
                  <td className="px-4 py-4 text-[#64748b]">{comp.season}</td>
                  <td className="px-4 py-4">
                    <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-[#64748b] capitalize">{comp.type}</span>
                  </td>
                  <td className="px-4 py-4 text-[#64748b]">{comp.category}</td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/sutaze/${comp.id}`} className="rounded bg-gray-100 px-3 py-1.5 text-xs font-semibold text-[#051937] hover:bg-gray-200 transition-colors">Upravit</Link>
                      <CompetitionActions id={comp.id} />
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
