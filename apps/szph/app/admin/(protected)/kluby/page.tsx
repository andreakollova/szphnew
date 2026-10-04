import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import type { Metadata } from "next";
import { DeleteClubButton } from "./DeleteClubButton";

export const metadata: Metadata = { title: "Kluby" };

function getSupabase() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
}

async function getClubs() {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("clubs")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return data || [];
  } catch {
    return [];
  }
}

export default async function AdminKlubyPage() {
  const clubs = await getClubs();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#051937]">Kluby</h1>
          <p className="text-sm text-[#64748b] mt-1">{clubs.length} klubov celkovo</p>
        </div>
        <Link
          href="/admin/kluby/novy"
          className="inline-flex items-center gap-2 rounded bg-[#012d74] px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#012d74]/90"
        >
          + Novy klub
        </Link>
      </div>

      <div className="rounded overflow-hidden" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
        {clubs.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-[#64748b] mb-2">Ziadne kluby</p>
            <p className="text-xs text-[#94a3b8]">Pridajte prvy klub cez tlacidlo vyssie.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[rgba(1,45,116,0.08)]">
                <th className="px-5 py-3 text-left text-[10px] uppercase tracking-wider text-[#64748b]">Klub</th>
                <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-[#64748b]">Mesto</th>
                <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-[#64748b]">Predseda</th>
                <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-[#64748b]">Stav</th>
                <th className="px-4 py-3 text-right text-[10px] uppercase tracking-wider text-[#64748b]">Akcie</th>
              </tr>
            </thead>
            <tbody>
              {clubs.map((club: any) => (
                <tr key={club.id} className="border-b border-[rgba(1,45,116,0.08)] hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      {club.logo_url ? (
                        <div className="shrink-0" style={{ width: 32, height: 32 }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={club.logo_url} alt="" width={32} height={32} style={{ width: 32, height: 32, objectFit: "contain" }} />
                        </div>
                      ) : (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-[10px] font-bold text-[#64748b] shrink-0">
                          {(club.short_name || club.name).slice(0, 3)}
                        </div>
                      )}
                      <div>
                        <span className="font-semibold text-[#051937]">{club.name}</span>
                        <span className="ml-2 text-xs text-[#94a3b8]">{club.short_name}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-[#64748b]">{club.city || "-"}</td>
                  <td className="px-4 py-3.5 text-[#64748b]">{club.chairman || "-"}</td>
                  <td className="px-4 py-3.5">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      club.status === "published"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-gray-100 text-[#64748b]"
                    }`}>
                      {club.status === "published" ? "Publikovany" : "Koncept"}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/kluby/${club.id}`} className="rounded bg-gray-100 px-3 py-1.5 text-xs font-semibold text-[#051937] hover:bg-gray-200 transition-colors">
                        Upravit
                      </Link>
                      <DeleteClubButton id={club.id} name={club.name} />
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
