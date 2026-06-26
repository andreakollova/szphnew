import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@szph/db/client";
import { getAllPagesAdmin } from "@szph/db";
import Link from "next/link";
import { GlassCard, formatDate } from "@szph/ui";
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
          <h1 className="font-garet text-2xl font-bold text-white">Stránky</h1>
          <p className="text-sm text-white/40 mt-1">Dynamické stránky pre oba weby</p>
        </div>
        <Link
          href="/admin/stranky/nova"
          className="inline-flex items-center gap-2 rounded-xl bg-[var(--sky)] px-4 py-2.5 text-sm font-bold text-white hover:bg-[var(--sky-light)] transition-all"
        >
          + Nová stránka
        </Link>
      </div>

      {[
        { label: "fieldhockey.sk", pages: fhPages, site: "fieldhockey" },
        { label: "szph.sk",        pages: szphPages, site: "szph" },
      ].map(({ label, pages: sitePgs, site }) => (
        <div key={site}>
          <h2 className="font-garet text-sm font-bold text-white/50 mb-3 uppercase tracking-wider">{label}</h2>
          <GlassCard hover={false} className="overflow-hidden">
            {sitePgs.length === 0 ? (
              <div className="py-8 text-center text-sm text-white/30">Žiadne stránky pre {label}</div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-5 py-3 text-left text-[10px] uppercase tracking-wider text-white/40">Nadpis</th>
                    <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-white/40">Slug</th>
                    <th className="px-4 py-3 text-center text-[10px] uppercase tracking-wider text-white/40">Stav</th>
                    <th className="px-4 py-3 text-right text-[10px] uppercase tracking-wider text-white/40">Akcie</th>
                  </tr>
                </thead>
                <tbody>
                  {sitePgs.map((page) => (
                    <tr key={page.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-5 py-4 font-semibold text-white">{page.title}</td>
                      <td className="px-4 py-4 font-mono text-xs text-white/40">/{page.slug}</td>
                      <td className="px-4 py-4 text-center">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${page.status === "published" ? "bg-emerald-500/20 text-emerald-400" : "bg-white/10 text-white/40"}`}>
                          {page.status === "published" ? "Pub." : "Draft"}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/admin/stranky/${page.id}`} className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/20 transition-colors">Upraviť</Link>
                          <PageActions id={page.id} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </GlassCard>
        </div>
      ))}
    </div>
  );
}
