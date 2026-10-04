import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@szph/db/client";
import { getAllPagesAdmin } from "@szph/db";
import Link from "next/link";
import { formatDate } from "@szph/ui";
import { PageActions } from "./PageActions";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Stránky" };

const SITE_PAGES = [
  { group: "Hlavné", pages: [
    { slug: "/", title: "Domov (homepage)" },
    { slug: "/novinky", title: "Novinky a oznamy" },
    { slug: "/zapasy", title: "Zápasové centrum" },
    { slug: "/video", title: "Video" },
    { slug: "/podcast", title: "Podcast" },
    { slug: "/kontakt", title: "Kontakt" },
    { slug: "/eshop", title: "E-shop" },
  ]},
  { group: "Pozemný hokej", pages: [
    { slug: "/pozemny-hokej", title: "Pozemný hokej" },
    { slug: "/pozemny-hokej/historia", title: "História" },
    { slug: "/pozemny-hokej/pravidla", title: "Pravidlá" },
    { slug: "/pozemny-hokej/vybavenie", title: "Vybavenie" },
    { slug: "/pozemny-hokej/medzinarodne-sutaze", title: "Medzinárodné súťaže" },
  ]},
  { group: "Reprezentácia", pages: [
    { slug: "/reprezentacia", title: "Reprezentácia" },
    { slug: "/reprezentacia/muzi", title: "Muži" },
    { slug: "/reprezentacia/zeny", title: "Ženy" },
    { slug: "/reprezentacia/u21-muzi", title: "U21 muži" },
    { slug: "/reprezentacia/u21-zeny", title: "U21 ženy" },
    { slug: "/reprezentacia/nominacie", title: "Nominácie" },
    { slug: "/reprezentacia/rebricek", title: "Rebríček" },
    { slug: "/reprezentacia/archiv", title: "Archív" },
  ]},
  { group: "Súťaže", pages: [
    { slug: "/sutaze", title: "Súťaže" },
    { slug: "/sutaze/muzska-liga", title: "Mužská liga" },
    { slug: "/sutaze/zenska-liga", title: "Ženská liga" },
    { slug: "/sutaze/u18", title: "U18" },
    { slug: "/sutaze/u14", title: "U14" },
    { slug: "/sutaze/u12", title: "U12" },
    { slug: "/sutaze/pozemny-hokej", title: "Pozemný hokej" },
    { slug: "/sutaze/halovy-hokej", title: "Halový hokej" },
  ]},
  { group: "Vzdelávanie", pages: [
    { slug: "/vzdelavanie", title: "Vzdelávanie" },
    { slug: "/vzdelavanie/cvicenia", title: "Cvičenia" },
    { slug: "/vzdelavanie/treneri", title: "Tréneri" },
    { slug: "/vzdelavanie/trenerske-kurzy", title: "Trénerské kurzy" },
    { slug: "/vzdelavanie/rozhodcovia", title: "Rozhodcovia" },
    { slug: "/vzdelavanie/kurz-rozhodcov", title: "Kurz rozhodcov" },
    { slug: "/vzdelavanie/licencie", title: "Licencie" },
    { slug: "/vzdelavanie/fih-licencie", title: "FIH licencie" },
    { slug: "/vzdelavanie/kurzy", title: "Kurzy" },
    { slug: "/vzdelavanie/seminare", title: "Semináre" },
    { slug: "/vzdelavanie/certifikacia", title: "Certifikácia" },
  ]},
  { group: "Kluby", pages: [
    { slug: "/kluby", title: "Kluby" },
    { slug: "/kluby/registracia", title: "Registrácia" },
    { slug: "/kluby/prestup", title: "Prestup" },
    { slug: "/kluby/treneri", title: "Tréneri" },
  ]},
  { group: "O SZPH", pages: [
    { slug: "/o-szph", title: "O SZPH" },
    { slug: "/o-szph/predsednictvo", title: "Predsedníctvo" },
    { slug: "/o-szph/stanovy", title: "Stanovy" },
    { slug: "/o-szph/konferencia", title: "Konferencia" },
    { slug: "/o-szph/hospodarenie", title: "Hospodárenie" },
    { slug: "/o-szph/dotacie", title: "Dotácie" },
    { slug: "/o-szph/kontrolor", title: "Kontrolór" },
    { slug: "/o-szph/doping", title: "Doping" },
  ]},
  { group: "Začni hrať", pages: [
    { slug: "/zacni-hrat", title: "Začni hrať" },
    { slug: "/zacni-hrat/hrac", title: "Chcem byť hráč" },
    { slug: "/zacni-hrat/trener", title: "Chcem byť tréner" },
    { slug: "/zacni-hrat/rozhodca", title: "Chcem byť rozhodca" },
  ]},
  { group: "Projekty", pages: [
    { slug: "/projekty", title: "Projekty" },
    { slug: "/projekty/hockey-tv", title: "Hockey TV" },
    { slug: "/projekty/hokej-na-skolach", title: "Hokej na školách" },
    { slug: "/projekty/hokejova-akademia", title: "Hokejová akadémia" },
    { slug: "/projekty/vzdelavanie-rozhodcov", title: "Vzdelávanie rozhodcov" },
  ]},
  { group: "Pre kluby", pages: [
    { slug: "/pre-kluby/zalozenie", title: "Založenie klubu" },
    { slug: "/pre-kluby/registracia", title: "Registrácia" },
    { slug: "/pre-kluby/podmienky", title: "Podmienky" },
  ]},
  { group: "Dokumenty", pages: [
    { slug: "/dokumenty", title: "Dokumenty" },
    { slug: "/dokumenty/sutazny-poriadok", title: "Súťažný poriadok" },
    { slug: "/dokumenty/registracia", title: "Registrácia" },
    { slug: "/dokumenty/ekonomicke-tlaciva", title: "Ekonomické tlačivá" },
    { slug: "/dokumenty/zapisy", title: "Zápisy" },
  ]},
  { group: "Ostatné", pages: [
    { slug: "/ostatne", title: "Ostatné" },
    { slug: "/ostatne/zmluvy", title: "Zmluvy" },
    { slug: "/ostatne/zoznamy", title: "Zoznamy" },
    { slug: "/ostatne/dobrovolnicka-cinnost", title: "Dobrovoľnícka činnosť" },
    { slug: "/evidencia", title: "Evidencia" },
    { slug: "/cookies", title: "Cookies" },
    { slug: "/ochrana-osobnych-udajov", title: "Ochrana osobných údajov" },
    { slug: "/hra", title: "Hra" },
  ]},
];

export default async function AdminStrankyPage() {
  const cookieStore = await cookies();
  const supabase = createServerSupabaseClient(cookieStore);
  const dbPages = await getAllPagesAdmin(supabase).catch(() => []);

  const totalPages = SITE_PAGES.reduce((sum, g) => sum + g.pages.length, 0);

  // Build a map of slug -> dbPage for quick lookup
  const dbPageBySlug = new Map<string, (typeof dbPages)[number]>();
  for (const p of dbPages) {
    dbPageBySlug.set(p.slug, p);
    dbPageBySlug.set("/" + p.slug, p);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#051937]">Stránky</h1>
          <p className="text-sm text-[#64748b] mt-1">{totalPages} podstránok na webe</p>
        </div>
        <Link
          href="/admin/stranky/nova"
          className="inline-flex items-center gap-2 rounded bg-[#012d74] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#012d74]/90 transition-all"
        >
          + Nová stránka
        </Link>
      </div>

      {/* All site pages grouped */}
      {SITE_PAGES.map(({ group, pages }) => {
        return (
          <div key={group}>
            <h2 className="text-sm font-bold text-[#64748b] mb-3 uppercase tracking-wider">{group}</h2>
            <div className="rounded overflow-hidden" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
              {pages.map((page, i) => {
                const slug = page.slug.startsWith("/") ? page.slug.slice(1) : page.slug;
                const dbPage = dbPageBySlug.get(page.slug) || dbPageBySlug.get(slug);
                const editHref = dbPage
                  ? `/admin/stranky/${dbPage.id}`
                  : `/admin/stranky/upravit/${slug || "domov"}?title=${encodeURIComponent(page.title)}`;

                return (
                  <div
                    key={page.slug}
                    className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors"
                    style={{ borderBottom: i < pages.length - 1 ? "1px solid rgba(1,45,116,0.06)" : undefined }}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-[#051937] text-sm">{page.title}</p>
                        {dbPage && (
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${dbPage.status === "published" ? "bg-emerald-500/20 text-emerald-600" : "bg-amber-500/20 text-amber-600"}`}>
                            {dbPage.status === "published" ? "V DB" : "Draft"}
                          </span>
                        )}
                      </div>
                      <p className="text-[#94a3b8] font-mono" style={{ fontSize: "10px" }}>{page.slug}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        href={editHref}
                        className="rounded bg-[#012d74]/10 px-3 py-1.5 text-xs font-semibold text-[#012d74] hover:bg-[#012d74]/20 transition-colors"
                      >
                        Upraviť
                      </Link>
                      <a
                        href={page.slug}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded bg-gray-100 px-3 py-1.5 text-xs font-semibold text-[#051937] hover:bg-gray-200 transition-colors"
                      >
                        Zobraziť
                      </a>
                      {dbPage && <PageActions id={dbPage.id} />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* DB-only pages (not in SITE_PAGES) */}
      {(() => {
        const sitePageSlugs = new Set(
          SITE_PAGES.flatMap(g => g.pages.map(p => {
            const s = p.slug.startsWith("/") ? p.slug.slice(1) : p.slug;
            return s;
          }))
        );
        const extraDbPages = dbPages.filter(p => !sitePageSlugs.has(p.slug));
        if (extraDbPages.length === 0) return null;
        return (
          <div>
            <h2 className="text-sm font-bold text-[#64748b] mb-3 uppercase tracking-wider">Dynamicke stranky (len v DB)</h2>
            <div className="rounded overflow-hidden" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
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
                  {extraDbPages.map((page) => (
                    <tr key={page.id} className="border-b border-[rgba(1,45,116,0.08)] hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4 font-semibold text-[#051937]">{page.title}</td>
                      <td className="px-4 py-4 font-mono text-xs text-[#64748b]">/{page.slug}</td>
                      <td className="px-4 py-4 text-center">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${page.status === "published" ? "bg-emerald-500/20 text-emerald-600" : "bg-gray-100 text-[#64748b]"}`}>
                          {page.status === "published" ? "Pub." : "Draft"}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/admin/stranky/${page.id}`} className="rounded bg-[#012d74]/10 px-3 py-1.5 text-xs font-semibold text-[#012d74] hover:bg-[#012d74]/20 transition-colors">Upraviť</Link>
                          <PageActions id={page.id} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
