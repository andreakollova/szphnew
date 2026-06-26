"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";

interface MegaLink { label: string; href: string; desc?: string; }
interface MegaColumn { title: string; links: MegaLink[]; }
interface MegaFeatured { image: string; tag: string; title: string; desc: string; href: string; }
interface NavItem {
  label: string;
  href: string;
  mega?: { columns: MegaColumn[]; featured: MegaFeatured; };
}

const QUICK_LINKS = [
  { label: "SZPH",              href: "/o-szph" },
  { label: "Dokumenty",         href: "/dokumenty" },
  { label: "Ostatné",           href: "/ostatne" },
  { label: "Kalendár akcií",    href: "/kalendar" },
  { label: "Najbližšie zápasy", href: "/zapasy" },
];

const MAIN_NAV: NavItem[] = [
  {
    label: "Pozemný hokej", href: "/pozemny-hokej",
    mega: {
      featured: {
        image: "/images/banner1.jpg",
        tag: "Šport",
        title: "Čo je pozemný hokej?",
        desc: "Rýchly, technický a taktický šport pre celú rodinu. Zisti prečo si ho zamilujú tisíce hráčov.",
        href: "/pozemny-hokej",
      },
      columns: [
        {
          title: "O športe",
          links: [
            { label: "Čo je pozemný hokej", href: "/pozemny-hokej", desc: "Základy a pravidlá" },
            { label: "História na Slovensku", href: "/pozemny-hokej/historia", desc: "Od roku 1928" },
            { label: "Pravidlá hry", href: "/pozemny-hokej/pravidla", desc: "Oficiálne pravidlá FIH" },
            { label: "Medzinárodné súťaže", href: "/pozemny-hokej/medzinarodne-sutaze", desc: "OH, MS, EH" },
          ],
        },
        {
          title: "Začni hrať",
          links: [
            { label: "Nájdi klub", href: "/kluby", desc: "Klub vo tvojom meste" },
            { label: "Začni hrať hokej", href: "/zacni-hrat", desc: "Pre začiatočníkov" },
            { label: "Vybavenie", href: "/pozemny-hokej/vybavenie", desc: "Čo potrebuješ" },
            { label: "Trénerské licencie", href: "/vzdelavanie/treneri", desc: "Pre trénerov" },
          ],
        },
      ],
    },
  },
  {
    label: "Reprezentácia", href: "/reprezentacia",
    mega: {
      featured: {
        image: "/images/banner2.jpg",
        tag: "Národný tím",
        title: "Slovenská reprezentácia",
        desc: "Sleduj výsledky, zostavy a príbehy slovenských národných tímov na medzinárodnej scéne.",
        href: "/reprezentacia",
      },
      columns: [
        {
          title: "Tímy",
          links: [
            { label: "Muži A", href: "/reprezentacia/muzi", desc: "Mužský národný tím" },
            { label: "Ženy A", href: "/reprezentacia/zeny", desc: "Ženský národný tím" },
            { label: "U21 Muži", href: "/reprezentacia/u21-muzi", desc: "Juniorský tím" },
            { label: "U21 Ženy", href: "/reprezentacia/u21-zeny", desc: "Juniorský tím" },
          ],
        },
        {
          title: "Aktuálne",
          links: [
            { label: "Výsledky a zápasy", href: "/zapasy", desc: "Posledné výsledky" },
            { label: "Nominácie", href: "/reprezentacia/nominacie", desc: "Aktuálne zostavy" },
            { label: "Rebríčky FIH", href: "/reprezentacia/rebricek", desc: "Svetový rebríček" },
            { label: "Archív výsledkov", href: "/reprezentacia/archiv", desc: "Historické výsledky" },
          ],
        },
      ],
    },
  },
  {
    label: "Súťaže", href: "/sutaze",
    mega: {
      featured: {
        image: "/images/banner3.jpg",
        tag: "Súťažný systém",
        title: "Slovenské ligy a turnaje",
        desc: "Kompletný prehľad všetkých súťaží — od extraligy až po mládežnícke turnaje po celom Slovensku.",
        href: "/sutaze",
      },
      columns: [
        {
          title: "Dospelí",
          links: [
            { label: "Extraliga muži", href: "/sutaze/muzska-liga", desc: "Najvyššia súťaž" },
            { label: "Extraliga ženy", href: "/sutaze/zenska-liga", desc: "Najvyššia súťaž" },
            { label: "Plážový hokej", href: "/sutaze/plazovy-hokej", desc: "Letná sezóna" },
          ],
        },
        {
          title: "Mládež",
          links: [
            { label: "U18", href: "/sutaze/u18", desc: "Do 18 rokov" },
            { label: "U14", href: "/sutaze/u14", desc: "Do 14 rokov" },
            { label: "U12", href: "/sutaze/u12", desc: "Do 12 rokov" },
            { label: "Výsledky a tabuľky", href: "/zapasy", desc: "Aktuálne tabuľky" },
          ],
        },
      ],
    },
  },
  {
    label: "Kluby", href: "/kluby",
    mega: {
      featured: {
        image: "/images/bannerbg.png",
        tag: "Pre kluby",
        title: "Všetko pre váš klub",
        desc: "Registrácie, dokumenty, ekonomické tlačivá a podpora pre všetky členské kluby SZPH.",
        href: "/kluby",
      },
      columns: [
        {
          title: "Zoznam a registrácia",
          links: [
            { label: "Zoznam klubov", href: "/kluby", desc: "Všetky členské kluby" },
            { label: "Registrácia hráča", href: "/kluby/registracia", desc: "Postup registrácie" },
            { label: "Prestup hráča", href: "/kluby/prestup", desc: "Prestupy a hosťovania" },
          ],
        },
        {
          title: "Dokumenty a podpora",
          links: [
            { label: "Pre trénerov", href: "/kluby/treneri", desc: "Trénerské materiály" },
            { label: "Ekonomické tlačivá", href: "/dokumenty/ekonomicke-tlaciva", desc: "Formuláre" },
            { label: "Súťažný poriadok", href: "/dokumenty/sutazny-poriadok", desc: "Platné predpisy" },
            { label: "Kontakt SZPH", href: "/kontakt", desc: "Pomoc a otázky" },
          ],
        },
      ],
    },
  },
  {
    label: "Vzdelávanie", href: "/vzdelavanie",
    mega: {
      featured: {
        image: "/images/banner2.jpg",
        tag: "Vzdelávanie",
        title: "Rozvíjaj sa s SZPH",
        desc: "Kurzy, semináre a školenia pre hráčov, trénerov aj rozhodcov. Investuj do svojho rozvoja.",
        href: "/vzdelavanie",
      },
      columns: [
        {
          title: "Pre trénerov",
          links: [
            { label: "Trénerské licencie", href: "/vzdelavanie/treneri", desc: "UEFA/FIH licencie" },
            { label: "Kurzy a školenia", href: "/vzdelavanie/kurzy", desc: "Termíny kurzov" },
            { label: "Semináre", href: "/vzdelavanie/seminare", desc: "Odborné semináre" },
          ],
        },
        {
          title: "Pre rozhodcov",
          links: [
            { label: "Rozhodcovské kurzy", href: "/vzdelavanie/rozhodcovia", desc: "Staň sa rozhodcom" },
            { label: "Pravidlá hry", href: "/pozemny-hokej/pravidla", desc: "Aktuálne pravidlá FIH" },
            { label: "Kontakt komisie", href: "/kontakt", desc: "Rozhodcovská komisia" },
          ],
        },
      ],
    },
  },
  { label: "Kontakt", href: "/kontakt" },
];

function MegaMenu({ item, onLeave }: { item: NavItem; onLeave: () => void }) {
  if (!item.mega) return null;
  const { columns, featured } = item.mega;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed inset-x-0 z-40 bg-white"
      style={{ top: "112px", boxShadow: "0 16px 48px rgba(1,45,116,0.12), 0 2px 8px rgba(1,45,116,0.06)" }}
      onMouseLeave={onLeave}
    >
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-[320px_1fr] gap-8">

        {/* Featured karta */}
        <Link href={featured.href} className="group relative overflow-hidden rounded-2xl block" style={{ minHeight: "240px" }}>
          <Image src={featured.image} alt={featured.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(to top, rgba(5,25,55,0.92) 0%, rgba(5,25,55,0.3) 60%, transparent 100%)" }} />
          <div className="absolute bottom-0 p-5">
            <span className="inline-block px-2 py-0.5 rounded-full text-white font-bold uppercase tracking-widest mb-2" style={{ fontSize: "7px", background: "#C8102E" }}>
              {featured.tag}
            </span>
            <h3 className="font-garet font-black italic text-white text-lg leading-tight mb-1">{featured.title}</h3>
            <p className="text-white/65 text-xs leading-relaxed line-clamp-2">{featured.desc}</p>
            <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-white/80 group-hover:text-white transition-colors">
              Zobraziť
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </Link>

        {/* Stĺpce s linkami */}
        <div className="grid gap-8" style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="font-bold uppercase tracking-widest text-[#94a3b8] mb-4" style={{ fontSize: "7.5px" }}>
                {col.title}
              </p>
              <ul className="space-y-1">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-start gap-3 px-3 py-2.5 rounded-xl transition-colors hover:bg-[#f5f7fb]"
                    >
                      <div className="mt-0.5 h-5 w-5 rounded-lg flex items-center justify-center shrink-0 transition-colors group-hover:bg-[#051937]" style={{ background: "rgba(1,45,116,0.07)" }}>
                        <svg className="h-2.5 w-2.5 text-[#051937] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-[#051937] text-sm leading-none group-hover:text-[#C8102E] transition-colors">{link.label}</p>
                        {link.desc && <p className="text-[#94a3b8] text-xs mt-0.5 leading-tight">{link.desc}</p>}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>

      {/* Spodná lišta */}
      <div className="border-t border-[rgba(1,45,116,0.06)]" style={{ background: "rgba(1,45,116,0.02)" }}>
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <p className="text-xs text-[#94a3b8]">Slovenský zväz pozemného hokeja — <span className="font-semibold text-[#051937]">szph.sk</span></p>
          <Link href="/kontakt" className="text-xs font-semibold text-[#051937] hover:text-[#C8102E] transition-colors">
            Kontaktujte nás →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export function NavbarSzph() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = (href: string) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setActiveMega(href);
  };

  const handleLeave = () => {
    leaveTimer.current = setTimeout(() => setActiveMega(null), 120);
  };

  const activeItem = MAIN_NAV.find(n => n.href === activeMega);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex flex-col" style={{ background: "rgba(246,246,248,0.88)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}>

        {/* ── TIER 1 ── */}
        <div className="hidden md:flex items-center justify-end px-6 h-8 pt-[7px]">
          <nav className="flex items-center gap-8">
            {QUICK_LINKS.map((item) => (
              <Link key={item.href} href={item.href}
                className="text-[8.5px] font-bold uppercase tracking-widest text-[#041834] hover:text-[#041834]/60 transition-colors whitespace-nowrap">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* ── TIER 2 ── */}
        <div className="hidden md:flex items-center gap-2 px-6 h-20">
          <Link href="/" className="shrink-0 mr-10">
            <Image src="/images/logo-szph.png" alt="SZPH" height={76} width={234} className="h-[76px] w-auto object-contain" priority />
          </Link>

          <nav className="flex-1" onMouseLeave={handleLeave}>
            <ul className="flex items-center">
              {MAIN_NAV.map(item => (
                <li key={item.href} onMouseEnter={() => item.mega ? handleEnter(item.href) : setActiveMega(null)}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1 px-3 py-2 text-[11px] font-extrabold uppercase tracking-wide transition-colors rounded-lg whitespace-nowrap",
                      activeMega === item.href
                        ? "text-[#C8102E] bg-[rgba(200,16,46,0.06)]"
                        : "text-[#061b3a] hover:text-[#061b3a]/80 hover:bg-[#f0f4fa]"
                    )}
                  >
                    {item.label}
                    {item.mega && (
                      <svg className={cn("h-3 w-3 shrink-0 transition-transform duration-200", activeMega === item.href && "rotate-180")}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3 ml-auto shrink-0">
            <button className="flex items-center justify-center h-8 w-8 rounded-full border transition-colors hover:bg-[#f0f4fa]"
              style={{ borderColor: "rgba(1,45,116,0.18)", color: "rgba(1,45,116,0.6)" }} aria-label="Vyhľadať">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="flex items-center justify-center h-8 w-8 rounded-full border transition-colors hover:bg-[#f0f4fa]"
              style={{ borderColor: "rgba(1,45,116,0.18)", color: "rgba(1,45,116,0.6)" }} aria-label="Profil">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </button>
            <a href="https://fieldhockey.sk/video-zona/" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold text-white transition-all hover:brightness-110"
              style={{ background: "#C8102E" }}>
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                <circle cx="12" cy="12" r="9" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 8.5l5 3.5-5 3.5V8.5z" />
              </svg>
              Live zápasy
            </a>
          </div>
        </div>

        {/* ── MOBILNÁ HLAVIČKA ── */}
        <div className="flex md:hidden items-center justify-between px-4 h-16">
          <Link href="/" className="shrink-0">
            <Image src="/images/logo-szph.png" alt="SZPH" height={36} width={110} className="h-9 w-auto object-contain" priority />
          </Link>
          <div className="flex items-center gap-2">
            <a href="https://fieldhockey.sk/video-zona/" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold text-white"
              style={{ background: "#C8102E" }}>
              <span className="h-1.5 w-1.5 rounded-full bg-white/70 animate-pulse" />
              Live
            </a>
            <button onClick={() => setMobileOpen(v => !v)}
              className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-lg"
              aria-label="Menu" aria-expanded={mobileOpen}>
              <span className={cn("h-0.5 w-5 bg-[#051937] transition-all duration-300", mobileOpen && "translate-y-2 rotate-45")} />
              <span className={cn("h-0.5 w-5 bg-[#051937] transition-all duration-300", mobileOpen && "opacity-0")} />
              <span className={cn("h-0.5 w-5 bg-[#051937] transition-all duration-300", mobileOpen && "-translate-y-2 -rotate-45")} />
            </button>
          </div>
        </div>

        {/* ── MOBILNÉ MENU ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }}
              className="overflow-hidden border-t border-[rgba(1,45,116,0.08)] md:hidden bg-white">
              <div className="px-4 py-4 space-y-1">
                {MAIN_NAV.map(item => (
                  <div key={item.href}>
                    <button onClick={() => setMobileExpanded(mobileExpanded === item.href ? null : item.href)}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-[#051937] hover:bg-[#f0f4fa] transition-colors">
                      {item.label}
                      {item.mega && (
                        <svg className={cn("h-4 w-4 transition-transform text-[#64748b]", mobileExpanded === item.href && "rotate-180")}
                          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </button>
                    <AnimatePresence>
                      {item.mega && mobileExpanded === item.href && (
                        <motion.div initial={{ height: 0 }} animate={{ height: "auto" }}
                          exit={{ height: 0 }} transition={{ duration: 0.15 }} className="overflow-hidden">
                          <div className="ml-3 mt-1 space-y-0.5 border-l border-[rgba(1,45,116,0.1)] pl-3 pb-1">
                            {item.mega.columns.flatMap(col => col.links).map(link => (
                              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                                className="block rounded px-2 py-1.5 text-sm text-[#051937]/60 hover:text-[#051937] transition-colors">
                                {link.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
                <div className="pt-3 border-t border-[rgba(1,45,116,0.08)] space-y-2">
                  <Link href="/zacni-hrat" onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-4 py-2.5 text-center text-sm font-bold text-white transition-all"
                    style={{ background: "#051937" }}>
                    Začni hrať hokej
                  </Link>
                  <a href="https://fieldhockey.sk/video-zona/" target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold text-white"
                    style={{ background: "#C8102E" }}>
                    <span className="h-2 w-2 rounded-full bg-white/70 animate-pulse" />
                    Live zápasy a archív
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── MEGA MENU (mimo header aby neprekrýval) ── */}
      <AnimatePresence>
        {activeMega && activeItem?.mega && (
          <MegaMenu item={activeItem} onLeave={handleLeave} />
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {activeMega && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30"
            style={{ background: "rgba(5,25,55,0.25)", backdropFilter: "blur(2px)", top: "112px" }}
            onClick={() => setActiveMega(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
