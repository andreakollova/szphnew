import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@szph/db/client";
import { getAllPagesAdmin } from "@szph/db";
import Link from "next/link";
import { formatDate } from "@szph/ui";
import { PageActions } from "./PageActions";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Stránky" };

export default async function AdminStrankyPage() {
  const cookieStore = await cookies();
  const supabase = createServerSupabaseClient(cookieStore);
  const pages = await getAllPagesAdmin(supabase).catch(() => []);

  const fhPages   = pages.filter((p) => p.site === "fieldhockey");
  const szphPages = pages.filter((p) => p.site === "szph");

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#051937]">Stránky</h1>
          <p className="text-sm text-[#64748b] mt-1">Dynamické stránky pre oba weby</p>
        </div>
        <Link
          href="/admin/stranky/nova"
          className="inline-flex items-center gap-2 rounded-xl bg-[#016fb4] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#016fb4]/90 transition-all"
        >
          + Nová stránka
        </Link>
      </div>

      {[
        { label: "fieldhockey.sk", pages: fhPages, site: "fieldhockey" },
        { label: "szph.sk",        pages: szphPages, site: "szph" },
      ].map(({ label, pages: sitePgs, site }) => (
        <div key={site}>
          <h2 className="text-sm font-bold text-[#64748b] mb-3 uppercase tracking-wider">{label}</h2>
          <div className="rounded-2xl overflow-hidden" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
            {sitePgs.length === 0 ? (
              <div className="py-8 text-center text-sm text-[#94a3b8]">Žiadne stránky pre {label}</div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[rgba(1,45,116,0.08)]">
                    <th className="px-5 py-3 text-left text-[10px] uppercase tracking-wider text-[#64748b]">Nadpis</th>
                    <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-[#64748b]">Slug</th>
                    <th className="px-4 py-3 text-center text-[10px] uppercase tracking-wider text-[#64748b]">Stav</th>
                    <th className="px-4 py-3 text-right text-[10px] uppercase tracking-wider text-[#64748b]">Akcie</th>
                  </tr>
                </thead>
                <tbody>
                  {sitePgs.map((page) => (
                    <tr key={page.id} className="border-b border-[rgba(1,45,116,0.08)] hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4 font-semibold text-[#051937]">{page.title}</td>
                      <td className="px-4 py-4 font-mono text-xs text-[#64748b]">/{page.slug}</td>
                      <td className="px-4 py-4 text-center">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${page.status === "published" ? "bg-emerald-500/20 text-emerald-400" : "bg-gray-100 text-[#64748b]"}`}>
                          {page.status === "published" ? "Pub." : "Draft"}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/admin/stranky/${page.id}`} className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-semibold text-[#051937] hover:bg-gray-200 transition-colors">Upraviť</Link>
                          <PageActions id={page.id} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
