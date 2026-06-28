import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@szph/db/client";
import { getAllArticlesAdmin } from "@szph/db";
import Link from "next/link";
import { formatDate } from "@szph/ui";
import { DeleteButton } from "./DeleteButton";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Články" };

export default async function AdminClankyPage() {
  const cookieStore = await cookies();
  const supabase = createServerSupabaseClient(cookieStore);
  const articles = await getAllArticlesAdmin(supabase, { limit: 50 }).catch(() => []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#051937]">Články</h1>
          <p className="text-sm text-[#64748b] mt-1">{articles.length} článkov celkovo</p>
        </div>
        <Link
          href="/admin/clanky/novy"
          className="inline-flex items-center gap-2 rounded-xl bg-[#016fb4] px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#016fb4]/90"
        >
          + Nový článok
        </Link>
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
        {articles.length === 0 ? (
          <div className="py-16 text-center text-[#64748b]">Žiadne články. Vytvorte prvý!</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[rgba(1,45,116,0.08)]">
                <th className="px-5 py-3.5 text-left text-[10px] uppercase tracking-wider text-[#64748b]">Nadpis</th>
                <th className="hidden px-4 py-3.5 text-left text-[10px] uppercase tracking-wider text-[#64748b] md:table-cell">Kategória</th>
                <th className="hidden px-4 py-3.5 text-left text-[10px] uppercase tracking-wider text-[#64748b] sm:table-cell">Viditeľnosť</th>
                <th className="px-4 py-3.5 text-center text-[10px] uppercase tracking-wider text-[#64748b]">Stav</th>
                <th className="hidden px-4 py-3.5 text-left text-[10px] uppercase tracking-wider text-[#64748b] lg:table-cell">Dátum</th>
                <th className="px-4 py-3.5 text-right text-[10px] uppercase tracking-wider text-[#64748b]">Akcie</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr
                  key={article.id}
                  className="border-b border-[rgba(1,45,116,0.08)] transition-colors hover:bg-gray-50"
                >
                  <td className="px-5 py-4">
                    <p className="font-semibold text-[#051937] line-clamp-1">{article.title}</p>
                    <p className="text-xs text-[#94a3b8] mt-0.5">{article.slug}</p>
                  </td>
                  <td className="hidden px-4 py-4 md:table-cell">
                    <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-[#64748b]">
                      {article.category}
                    </span>
                  </td>
                  <td className="hidden px-4 py-4 sm:table-cell">
                    <span className="text-xs text-[#64748b]">{article.visible_on}</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        article.status === "published"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-gray-100 text-[#64748b]"
                      }`}
                    >
                      {article.status === "published" ? "Publikovaný" : "Draft"}
                    </span>
                  </td>
                  <td className="hidden px-4 py-4 text-xs text-[#64748b] lg:table-cell">
                    {article.updated_at ? formatDate(article.updated_at) : "—"}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/clanky/upravit/${article.id}`}
                        className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-semibold text-[#051937] transition-colors hover:bg-gray-200"
                      >
                        Upraviť
                      </Link>
                      <DeleteButton id={article.id} title={article.title} />
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
