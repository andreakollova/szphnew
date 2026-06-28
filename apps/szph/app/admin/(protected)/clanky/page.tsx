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
          <h1 className="text-2xl font-bold text-white">Články</h1>
          <p className="text-sm text-white/40 mt-1">{articles.length} článkov celkovo</p>
        </div>
        <Link
          href="/admin/clanky/novy"
          className="inline-flex items-center gap-2 rounded-xl bg-[var(--sky)] px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-[var(--sky-light)]"
        >
          + Nový článok
        </Link>
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
        {articles.length === 0 ? (
          <div className="py-16 text-center text-white/40">Žiadne články. Vytvorte prvý!</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-5 py-3.5 text-left text-[10px] uppercase tracking-wider text-white/40">Nadpis</th>
                <th className="hidden px-4 py-3.5 text-left text-[10px] uppercase tracking-wider text-white/40 md:table-cell">Kategória</th>
                <th className="hidden px-4 py-3.5 text-left text-[10px] uppercase tracking-wider text-white/40 sm:table-cell">Viditeľnosť</th>
                <th className="px-4 py-3.5 text-center text-[10px] uppercase tracking-wider text-white/40">Stav</th>
                <th className="hidden px-4 py-3.5 text-left text-[10px] uppercase tracking-wider text-white/40 lg:table-cell">Dátum</th>
                <th className="px-4 py-3.5 text-right text-[10px] uppercase tracking-wider text-white/40">Akcie</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr
                  key={article.id}
                  className="border-b border-white/5 transition-colors hover:bg-white/5"
                >
                  <td className="px-5 py-4">
                    <p className="font-semibold text-white line-clamp-1">{article.title}</p>
                    <p className="text-xs text-white/30 mt-0.5">{article.slug}</p>
                  </td>
                  <td className="hidden px-4 py-4 md:table-cell">
                    <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-white/60">
                      {article.category}
                    </span>
                  </td>
                  <td className="hidden px-4 py-4 sm:table-cell">
                    <span className="text-xs text-white/50">{article.visible_on}</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        article.status === "published"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-white/10 text-white/40"
                      }`}
                    >
                      {article.status === "published" ? "Publikovaný" : "Draft"}
                    </span>
                  </td>
                  <td className="hidden px-4 py-4 text-xs text-white/40 lg:table-cell">
                    {article.updated_at ? formatDate(article.updated_at) : "—"}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/clanky/upravit/${article.id}`}
                        className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/20"
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
