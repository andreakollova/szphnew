"use client";

import { useState, useRef, useEffect, useLayoutEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";
import { createClient } from "@supabase/supabase-js";

interface MegaLink { label: string; href: string; desc?: string; }
interface MegaColumn { title: string; links: MegaLink[]; }
interface MegaBanner { label: string; href: string; bg: string; }
interface MegaFeatured { image: string; tag: string; title: string; desc: string; href: string; cta?: { label: string; href: string }; banners?: MegaBanner[]; imagePosition?: string; }
interface NavItem {
  label: string;
  href: string;
  mega?: { columns: MegaColumn[]; featured: MegaFeatured; };
}

const QUICK_LINKS = [
  { label: "SZPH",              href: "/o-szph" },
  { label: "Dokumenty",         href: "/dokumenty" },
  { label: "Ostatné",           href: "/ostatne" },
  { label: "Najbližšie zápasy", href: "/zapasy" },
];

const MAIN_NAV: NavItem[] = [
  {
    label: "Pozemný hokej", href: "/pozemny-hokej",
    mega: {
      featured: {
        image: "/images/mega-pozemny-hokej.webp",
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
            { label: "História a osobnosti", href: "/pozemny-hokej/historia", desc: "Od roku 1928" },
            { label: "Pravidlá hry", href: "/pozemny-hokej/pravidla", desc: "Oficiálne pravidlá FIH" },
            { label: "Medzinárodné súťaže", href: "/pozemny-hokej/medzinarodne-sutaze", desc: "OH, MS, EH" },
          ],
        },
        {
          title: "Začni hrať",
          links: [
            { label: "Nájdi klub", href: "/kluby", desc: "Klub vo tvojom meste" },
            { label: "Začni hrať hokej", href: "/zacni-hrat/hrac", desc: "Pre začiatočníkov" },
            { label: "Vybavenie", href: "/pozemny-hokej/vybavenie", desc: "Čo potrebuješ" },
            { label: "Trénerské licencie", href: "/zacni-hrat/trener", desc: "Pre trénerov" },
          ],
        },
      ],
    },
  },
  {
    label: "Reprezentácia", href: "/reprezentacia",
    mega: {
      featured: {
        image: "/images/mega-reprezentacia.webp",
        imagePosition: "top",
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
        image: "/images/mega-sutaze.webp",
        tag: "Súťažný systém",
        title: "Slovenské ligy a turnaje",
        desc: "Kompletný prehľad všetkých súťaží — od extraligy až po mládežnícke turnaje po celom Slovensku.",
        href: "/sutaze",
        banners: [
          { label: "Pozemný hokej", href: "/sutaze/pozemny-hokej", bg: "#051937" },
          { label: "Halový hokej", href: "/sutaze/halovy-hokej", bg: "#d80027" },
        ],
      },
      columns: [
        {
          title: "Dospelí",
          links: [
            { label: "Extraliga muži", href: "/sutaze/muzska-liga", desc: "Najvyššia súťaž" },
            { label: "Extraliga ženy", href: "/sutaze/zenska-liga", desc: "Najvyššia súťaž" },
            { label: "Pozemný hokej", href: "/sutaze/pozemny-hokej", desc: "Vonkajšia sezóna" },
            { label: "Halový hokej", href: "/sutaze/halovy-hokej", desc: "Halová sezóna" },
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
        image: "/images/mega-kluby.webp",
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
        image: "/images/korim-u4e-gallery0.webp",
        tag: "Vzdelávanie",
        title: "Rozvíjaj sa s SZPH",
        desc: "Kurzy, semináre a školenia pre hráčov, trénerov aj rozhodcov. Investuj do svojho rozvoja.",
        href: "/vzdelavanie",
        cta: { label: "Vzdelávacia platforma SZPH Akadémia", href: "/projekty/hokejova-akademia" },
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
  { label: "E-shop", href: "/eshop" },
  { label: "Kontakt", href: "/kontakt" },
];

function MegaMenu({ item, onLeave, onEnter, topOffset }: { item: NavItem; onLeave: () => void; onEnter: () => void; topOffset: number }) {
  if (!item.mega) return null;
  const { columns, featured } = item.mega;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed inset-x-0 z-40 bg-white"
      style={{ top: `${topOffset}px`, boxShadow: "0 16px 48px rgba(1,45,116,0.12), 0 2px 8px rgba(1,45,116,0.06)" }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="max-w-5xl mx-auto px-6 py-5 grid grid-cols-[240px_1fr] gap-5 items-start">

        {/* Featured karta — landscape */}
        <div className="flex flex-col">
          {featured.banners ? (
            /* Two banner cards instead of featured image */
            <div className="flex flex-col gap-2 h-full">
              {featured.banners.map((b) => (
                <Link key={b.label} href={b.href} className="group flex-1 relative overflow-hidden flex items-center px-5" style={{ borderRadius: "4px", background: b.bg }}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "rgba(255,255,255,0.06)" }} />
                  <div className="relative flex items-center justify-between w-full">
                    <div>
                      <span className="font-garet font-bold italic text-white" style={{ fontSize: "18px" }}>{b.label}</span>
                    </div>
                    <svg className="h-4 w-4 text-white/40 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <Link href={featured.href} className="group relative overflow-hidden block" style={{ height: "100%", minHeight: "180px", borderRadius: "4px" }}>
              <Image src={featured.image} alt={featured.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" style={featured.imagePosition ? { objectPosition: featured.imagePosition } : undefined} />
              <div className="absolute inset-0" style={{ borderRadius: "4px", background: "linear-gradient(to top, #012d74 0%, rgba(1,45,116,0.9) 30%, rgba(1,45,116,0.3) 55%, transparent 75%)" }} />
              <div className="absolute bottom-0 p-4">
                <h3 className="font-garet font-black italic text-white leading-tight mb-2" style={{ fontSize: "16px" }}>{featured.title}</h3>
                <span className="inline-flex items-center gap-1.5 font-bold text-white px-3 py-1.5 transition-all hover:brightness-110" style={{ fontSize: "10px", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "20px" }}>
                  Zobraziť
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </Link>
          )}

          {/* CTA button pod featured */}
          {featured.cta && (
            <Link href={featured.cta.href} className="flex items-center gap-2 mt-2 px-4 py-2.5 font-bold text-white transition-all hover:brightness-110" style={{ background: "#012d74", borderRadius: "4px", fontSize: "11px" }}>
              <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" /></svg>
              {featured.cta.label}
              <svg className="h-3 w-3 shrink-0 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          )}
        </div>

        {/* Stĺpce s linkami */}
        <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="font-bold uppercase tracking-widest text-[#051937] mb-2" style={{ fontSize: "11px" }}>
                {col.title}
              </p>
              <ul className="space-y-1">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-start gap-2.5 px-2 py-2 rounded-lg transition-colors hover:bg-[#f5f7fb]"
                    >
                      <div className="mt-[7px] shrink-0 transition-all duration-200" style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#051937" }}>
                        <div className="w-full h-full rounded-full transition-all duration-200 scale-0 group-hover:scale-100" style={{ background: "#012d74" }} />
                      </div>
                      <div>
                        <p className="font-semibold text-[#051937] leading-none group-hover:text-[#012d74] transition-colors" style={{ fontSize: "14px" }}>{link.label}</p>
                        {link.desc && <p className="text-[#94a3b8] mt-0.5 leading-tight" style={{ fontSize: "12px" }}>{link.desc}</p>}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </motion.div>
  );
}

function LangSelector({ scrolled }: { scrolled: boolean }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-lang-selector]")) setOpen(false);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [open]);

  return (
    <div className="relative shrink-0" data-lang-selector>
      <button
        onClick={() => setOpen(v => !v)}
        className={cn("flex items-center justify-center h-8 px-1 rounded transition-all duration-300", "hover:bg-white/10")}
        aria-label="Jazyk"
      >
        <div className="overflow-hidden" style={{ width: 20, height: 14, borderRadius: "2px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://flagcdn.com/w40/sk.png" alt="SK" width={20} height={14} style={{ width: 20, height: 14, objectFit: "cover" }} />
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 py-2 overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: "0 8px 32px rgba(1,45,116,0.15), 0 1px 4px rgba(1,45,116,0.08)",
              minWidth: "130px",
              border: "1px solid rgba(1,45,116,0.08)",
              borderRadius: "3px",
            }}
          >
            <button
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-[#051937] hover:bg-[#051937]/[0.04] transition-colors"
              style={{ fontSize: "12px", fontWeight: 600 }}
            >
              <div className="overflow-hidden" style={{ width: 22, height: 15, borderRadius: "2px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://flagcdn.com/w40/sk.png" alt="SK" width={22} height={15} style={{ width: 22, height: 15, objectFit: "cover" }} />
              </div>
              Slovenčina
            </button>
            <button
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-[#051937]/50 hover:bg-[#051937]/[0.04] transition-colors"
              style={{ fontSize: "12px", fontWeight: 600 }}
            >
              <div className="overflow-hidden" style={{ width: 22, height: 15, borderRadius: "2px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://flagcdn.com/w40/gb.png" alt="EN" width={22} height={15} style={{ width: 22, height: 15, objectFit: "cover" }} />
              </div>
              English
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileNotificationButton() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setEnabled(localStorage.getItem("szph-notif") === "on");
    }
  }, []);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    localStorage.setItem("szph-notif", next ? "on" : "off");
  };

  return (
    <button
      onClick={toggle}
      className="relative flex items-center justify-center h-11 w-11 rounded-full hover:bg-[#051937]/5 transition-colors"
      aria-label={enabled ? "Notifikácie zapnuté" : "Notifikácie vypnuté"}
    >
      {enabled ? (
        <svg className="h-6 w-6 text-[#012d74]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M5.85 3.5a.75.75 0 00-1.117-1 9.719 9.719 0 00-2.348 4.876.75.75 0 001.479.248A8.219 8.219 0 015.85 3.5zM19.267 2.5a.75.75 0 10-1.118 1 8.22 8.22 0 011.987 4.124.75.75 0 001.48-.248A9.72 9.72 0 0019.266 2.5z" />
          <path fillRule="evenodd" d="M12 2.25A6.75 6.75 0 005.25 9v.75a8.217 8.217 0 01-2.119 5.52.75.75 0 00.298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 107.48 0 24.583 24.583 0 004.83-1.244.75.75 0 00.298-1.205 8.217 8.217 0 01-2.118-5.52V9A6.75 6.75 0 0012 2.25zM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 004.496 0l.002.1a2.25 2.25 0 11-4.5 0z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg className="h-6 w-6 text-[#b0b8c9]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
        </svg>
      )}
      {enabled && (
        <span
          className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-[#012d74]"
          style={{ boxShadow: "0 0 0 2px #fff" }}
        />
      )}
    </button>
  );
}

interface NavbarSzphProps {
  announcement?: { text: string; href?: string } | null;
}

export function NavbarSzph({ announcement }: NavbarSzphProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
  }, [pathname]);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [scrolled, setScrolled] = useState(true);
  const [hasHero, setHasHero] = useState(false);
  const [quickLinksOpen, setQuickLinksOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<{ articles: any[]; matches: any[] }>({ articles: [], matches: [] });
  const [searchLoading, setSearchLoading] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Detect hero immediately on mount to avoid flash
  useLayoutEffect(() => {
    const heroExists = !!document.querySelector("[data-hero]");
    if (heroExists) {
      setHasHero(true);
      setScrolled(window.scrollY > 80);
    }
  }, []);

  useEffect(() => {
    let scrollCleanup: (() => void) | undefined;
    const check = () => {
      const heroExists = !!document.querySelector("[data-hero]");
      setHasHero(heroExists);
      if (!heroExists) {
        setScrolled(true);
        if (scrollCleanup) { scrollCleanup(); scrollCleanup = undefined; }
        return;
      }
      const onScroll = () => setScrolled(window.scrollY > 80);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      scrollCleanup = () => window.removeEventListener("scroll", onScroll);
    };
    check();
    const observer = new MutationObserver(() => check());
    observer.observe(document.body, { childList: true, subtree: true });
    return () => { scrollCleanup?.(); observer.disconnect(); };
  }, []);

  // Search
  const doSearch = useCallback(async (q: string) => {
    if (q.trim().length < 2) {
      setSearchResults({ articles: [], matches: [] });
      return;
    }
    setSearchLoading(true);
    try {
      const sb = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      const [articlesRes, matchesRes] = await Promise.allSettled([
        sb.from("articles").select("id, slug, title, category, cover_image_url").eq("site", "szph").eq("status", "published").ilike("title", `%${q}%`).order("published_at", { ascending: false }).limit(6),
        sb.from("matches").select("id, home_team, away_team, home_short, away_short, home_score, away_score, date, league, status, home_logo, away_logo").eq("site", "szph").or(`home_team.ilike.%${q}%,away_team.ilike.%${q}%,league.ilike.%${q}%`).order("date", { ascending: false }).limit(6),
      ]);
      setSearchResults({
        articles: articlesRes.status === "fulfilled" ? (articlesRes.value.data ?? []) : [],
        matches: matchesRes.status === "fulfilled" ? (matchesRes.value.data ?? []) : [],
      });
    } catch {
      setSearchResults({ articles: [], matches: [] });
    }
    setSearchLoading(false);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
    if (!searchOpen) {
      setSearchQuery("");
      setSearchResults({ articles: [], matches: [] });
    }
  }, [searchOpen]);

  useEffect(() => {
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => doSearch(searchQuery), 300);
    return () => { if (searchTimer.current) clearTimeout(searchTimer.current); };
  }, [searchQuery, doSearch]);

  // Close search on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && searchOpen) setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen]);

  // Close quick links on click outside
  useEffect(() => {
    if (!quickLinksOpen) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-quick-links]")) setQuickLinksOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [quickLinksOpen]);

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
      {/* ── ANNOUNCEMENT BAR — glass/dark ── */}
      <div
        className="fixed inset-x-0 top-0 z-[60] hidden md:flex items-center justify-center px-6 transition-all duration-300"
        style={{
          height: "36px",
          background: (hasHero && !scrolled)
            ? "linear-gradient(135deg, rgba(16,43,80,0.92) 0%, rgba(16,43,80,0.88) 100%)"
            : "linear-gradient(135deg, #0a1f3d 0%, #102b50 100%)",
          backdropFilter: (hasHero && !scrolled) ? "blur(20px)" : "none",
          WebkitBackdropFilter: (hasHero && !scrolled) ? "blur(20px)" : "none",
        }}
      >
        {announcement ? (
          announcement.href ? (
            <Link href={announcement.href} className="flex items-center gap-2 text-white font-bold truncate" style={{ fontSize: "11px", letterSpacing: "0.03em" }}>
              <span className="shrink-0 h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
              {announcement.text}
              <svg className="h-3 w-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ) : (
            <span className="flex items-center gap-2 text-white font-bold truncate" style={{ fontSize: "11px", letterSpacing: "0.03em" }}>
              <span className="shrink-0 h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
              {announcement.text}
            </span>
          )
        ) : <div />}
      </div>

      {/* ── MOBILE FIXED HEADER — starts at top:0, bg extends under status bar ── */}
      <div className="flex flex-col md:hidden mobile-fixed-header" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 60 }}>
        {/* Announcement bar — padding-top pushes content below status bar icons */}
        {/* Dark blue zone: safe area + announcement */}
        <div className="mobile-announcement-bar flex items-end justify-center px-4 pb-1.5" style={{ background: "#0e264a" }}>
          {announcement && (
            announcement.href ? (
              <Link href={announcement.href} className="flex items-center gap-1.5 text-white font-bold" style={{ fontSize: "10px", letterSpacing: "0.03em", maxWidth: "100%" }}>
                <span className="shrink-0 h-1 w-1 rounded-full bg-green-400 animate-pulse" />
                <span className="truncate">{announcement.text.length > 50 ? announcement.text.slice(0, 50) + "..." : announcement.text}</span>
                <svg className="h-3 w-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </Link>
            ) : (
              <span className="flex items-center gap-1.5 text-white font-bold truncate" style={{ fontSize: "9px" }}>
                <span className="shrink-0 h-1 w-1 rounded-full bg-green-400 animate-pulse" />
                <span className="truncate">{announcement.text.length > 50 ? announcement.text.slice(0, 50) + "..." : announcement.text}</span>
              </span>
            )
          )}
        </div>
        {/* Navbar */}
        <div className="relative flex items-center justify-between px-5" style={{ height: "64px", background: "#ffffff", borderBottom: "1px solid rgba(1,45,116,0.08)" }}>
          <button onClick={() => setMobileOpen(v => !v)}
            className="flex items-center justify-center h-11 w-11 rounded-full hover:bg-[#051937]/5 transition-colors"
            aria-label="Menu" aria-expanded={mobileOpen}>
            <svg className="h-6 w-6 text-[#051937]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 shrink-0">
            <Image src="/images/logo-szph.webp" alt="SZPH" height={56} width={190} className="h-14 w-auto object-contain" priority />
          </Link>
          <Link href="/nastavenia" className="flex items-center justify-center h-11 w-11 rounded-full hover:bg-[#051937]/5 transition-colors" aria-label="Nastavenia">
            <svg className="h-6 w-6 text-[#051937]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </Link>
        </div>
      </div>

      <header
        className={cn(
          "fixed inset-x-0 z-[55] hidden md:flex flex-col transition-all duration-300",
          "top-[36px]"
        )}
        style={{
          background: (hasHero && !scrolled)
            ? "linear-gradient(135deg, rgba(0,33,93,0.92) 0%, rgba(0,33,93,0.88) 100%)"
            : (hasHero && scrolled)
              ? "rgba(255,255,255,0.97)"
              : "linear-gradient(135deg, #001a4a 0%, #00215d 100%)",
          backdropFilter: (hasHero && !scrolled) ? "blur(20px)" : (hasHero && scrolled) ? "blur(12px)" : "none",
          WebkitBackdropFilter: (hasHero && !scrolled) ? "blur(20px)" : (hasHero && scrolled) ? "blur(12px)" : "none",
          boxShadow: (hasHero && !scrolled) ? "0 1px 0 rgba(255,255,255,0.06) inset" : (hasHero && scrolled) ? "0 2px 16px rgba(0,0,0,0.08)" : "0 2px 12px rgba(0,0,0,0.15)",
          borderBottom: (hasHero && !scrolled) ? "1px solid rgba(255,255,255,0.06)" : (hasHero && scrolled) ? "1px solid rgba(1,45,116,0.08)" : "1px solid rgba(0,33,93,0.3)",
        }}
      >

        {/* ── NAVBAR — logo, nav, quick links as pills, actions ── */}
        <div className="hidden md:flex items-center gap-2 px-6 h-20">
          <Link href="/" className="shrink-0 mr-8 relative" style={{ height: "76px", width: "234px" }}>
            <Image
              src={(hasHero && scrolled) ? "/images/logo-szph.webp" : "/images/logo-szph-white.webp"}
              alt="SZPH"
              fill
              className="object-contain object-left transition-opacity duration-300"
              priority
              sizes="234px"
            />
          </Link>

          <nav className="flex-1" onMouseLeave={handleLeave}>
            <ul className="flex items-center">
              {MAIN_NAV.map(item => (
                <li key={item.href} onMouseEnter={() => item.mega ? handleEnter(item.href) : setActiveMega(null)}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1 px-3 py-2 text-[11px] font-extrabold uppercase tracking-wide transition-colors duration-300 rounded-lg whitespace-nowrap",
                      (hasHero && scrolled)
                        ? (activeMega === item.href ? "text-[#051937] bg-[#051937]/8" : "text-[#051937]/80 hover:text-[#051937]/50")
                        : (activeMega === item.href ? "text-white bg-white/10" : "text-white/90 hover:text-white/65")
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

          {/* Quick links — dropdown */}
          <div className="relative shrink-0 mr-1" data-quick-links>
            <button
              onClick={() => setQuickLinksOpen(v => !v)}
              className={cn(
                "flex items-center justify-center h-8 w-8 rounded-full transition-all duration-300",
                "hover:bg-white/10"
              )}
              style={{ color: (hasHero && scrolled) ? "rgba(5,25,55,0.5)" : "rgba(255,255,255,0.6)" }}
              aria-label="Rýchle odkazy"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="5" cy="12" r="2" />
                <circle cx="12" cy="12" r="2" />
                <circle cx="19" cy="12" r="2" />
              </svg>
            </button>
            <AnimatePresence>
              {quickLinksOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 py-2 overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.95)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    boxShadow: "0 8px 32px rgba(1,45,116,0.15), 0 1px 4px rgba(1,45,116,0.08)",
                    minWidth: "200px",
                    border: "1px solid rgba(1,45,116,0.08)",
                    borderRadius: "3px",
                  }}
                >
                  {QUICK_LINKS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setQuickLinksOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-[#051937] hover:bg-[#051937]/[0.04] transition-colors"
                      style={{ fontSize: "12px", fontWeight: 600 }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Divider */}
          <div className="shrink-0 transition-colors duration-300" style={{ width: "1px", height: "24px", background: "rgba(255,255,255,0.15)" }} />

          <div className="flex items-center gap-3 ml-3 shrink-0">
            {/* Language selector */}
            <LangSelector scrolled={scrolled} />
            <button
              onClick={() => setSearchOpen(true)}
              className={cn("flex items-center justify-center h-8 w-8 rounded-full transition-all duration-300", (hasHero && scrolled) ? "hover:bg-[#051937]/8" : "hover:bg-white/10")}
              style={{ color: (hasHero && scrolled) ? "rgba(5,25,55,0.5)" : "rgba(255,255,255,0.6)" }} aria-label="Vyhľadať">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <Link href="/admin/prihlasenie" className={cn("flex items-center justify-center h-8 w-8 rounded-full transition-all duration-300", (hasHero && scrolled) ? "hover:bg-[#051937]/8" : "hover:bg-white/10")}
              style={{ color: (hasHero && scrolled) ? "rgba(5,25,55,0.5)" : "rgba(255,255,255,0.6)" }} aria-label="Prihlásenie">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </Link>
            <a href="/zapasy"
              className={cn("flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold transition-all hover:brightness-110", (hasHero && scrolled) ? "text-white" : "text-white")}
              style={{ background: (hasHero && scrolled) ? "#051937" : "#012d74" }}>
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                <circle cx="12" cy="12" r="9" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 8.5l5 3.5-5 3.5V8.5z" />
              </svg>
              Zápasové centrum
            </a>
          </div>
        </div>

        {/* Mobile header is rendered separately above as a fixed block */}
      </header>

      {/* ── MOBILNE MENU — fullscreen slide-in from right (OUTSIDE header so it's visible on mobile) ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed left-0 right-0 bottom-0 md:hidden bg-white overflow-y-auto"
            style={{ top: 0, zIndex: 90, paddingTop: "env(safe-area-inset-top, 50px)" }}
          >
            {/* Header: logo + close */}
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid rgba(1,45,116,0.06)" }}>
              <Image src="/images/logo-szph.webp" alt="SZPH" height={44} width={150} className="h-11 w-auto object-contain" />
              <button onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center h-10 w-10 rounded-full bg-[#051937]/5">
                <svg className="h-5 w-5 text-[#051937]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col min-h-full px-5 pt-4 pb-8">
              {/* Nav items */}
              <div className="flex-1 space-y-1">
                {MAIN_NAV.map(item => (
                  <div key={item.href}>
                    {item.mega ? (
                      <button onClick={() => setMobileExpanded(mobileExpanded === item.href ? null : item.href)}
                        className="flex w-full items-center justify-between py-3 text-[15px] font-bold text-[#051937] transition-colors"
                        style={{ borderBottom: "1px solid rgba(1,45,116,0.06)" }}>
                        {item.label}
                        <svg className={cn("h-4 w-4 transition-transform duration-200 text-[#94a3b8]", mobileExpanded === item.href && "rotate-180")}
                          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    ) : (
                      <Link href={item.href} onClick={() => setMobileOpen(false)}
                        className="flex w-full items-center py-3 text-[15px] font-bold text-[#051937] transition-colors"
                        style={{ borderBottom: "1px solid rgba(1,45,116,0.06)" }}>
                        {item.label}
                      </Link>
                    )}
                    <AnimatePresence>
                      {item.mega && mobileExpanded === item.href && (
                        <motion.div initial={{ height: 0 }} animate={{ height: "auto" }}
                          exit={{ height: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                          <div className="py-2 space-y-3">
                            {item.mega.columns.map(col => (
                              <div key={col.title}>
                                <p className="font-bold uppercase text-[#94a3b8] mb-1.5" style={{ fontSize: "10px", letterSpacing: "0.08em" }}>{col.title}</p>
                                <div className="space-y-0.5">
                                  {col.links.map(link => (
                                    <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                                      className="flex items-center gap-2.5 py-2 pl-1 text-[14px] text-[#051937]/70 hover:text-[#051937] transition-colors">
                                      <span className="shrink-0 h-1 w-1 rounded-full bg-[#051937]/20" />
                                      {link.label}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* Bottom CTAs */}
              <div className="pt-6 mt-4 space-y-3" style={{ borderTop: "1px solid rgba(1,45,116,0.08)" }}>
                <Link href="/projekty/hokejova-akademia" onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full rounded-lg px-4 py-3 text-sm font-bold text-white transition-all hover:brightness-110"
                  style={{ background: "#012d74" }}>
                  <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                  </svg>
                  Vzdelávacia platforma
                </Link>
                <Link href="/zapasy" onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full rounded-lg px-4 py-3 text-sm font-bold text-white transition-all hover:brightness-110"
                  style={{ background: "#d00027" }}>
                  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                    <circle cx="12" cy="12" r="9" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 8.5l5 3.5-5 3.5V8.5z" />
                  </svg>
                  Zápasové centrum
                </Link>
                <Link href="/nastavenia" onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full rounded-lg px-4 py-3 text-sm font-bold text-[#051937] transition-all"
                  style={{ border: "1.5px solid rgba(1,45,116,0.15)" }}>
                  <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Nastavenia
                </Link>
                <Link href="/admin/prihlasenie" onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full rounded-lg px-4 py-3 text-sm font-bold text-[#94a3b8] transition-all">
                  <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                  Admin prihlásenie
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MEGA MENU (mimo header aby neprekrýval) ── */}
      <AnimatePresence>
        {activeMega && activeItem?.mega && (
          <MegaMenu item={activeItem} onLeave={handleLeave} onEnter={() => { if (leaveTimer.current) clearTimeout(leaveTimer.current); }} topOffset={116} />
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {activeMega && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30"
            style={{ background: "rgba(5,25,55,0.25)", backdropFilter: "blur(2px)", top: "116px" }}
            onClick={() => setActiveMega(null)}
          />
        )}
      </AnimatePresence>

      {/* ── SEARCH OVERLAY ── */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] flex flex-col"
            style={{ background: "rgba(5,25,55,0.6)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
            onClick={(e) => { if (e.target === e.currentTarget) setSearchOpen(false); }}
          >
            <div className="w-full max-w-2xl mx-auto mt-[120px] px-4">
              {/* Search input */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.05 }}
              >
                <div
                  className="flex items-center gap-3 bg-white px-5"
                  style={{ borderRadius: "14px", height: "56px", boxShadow: "0 8px 40px rgba(0,0,0,0.2)" }}
                >
                  <svg className="h-5 w-5 text-[#94a3b8] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Hľadať články, zápasy, tímy..."
                    className="flex-1 bg-transparent text-[#051937] placeholder-[#94a3b8] outline-none font-semibold"
                    style={{ fontSize: "15px" }}
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")} className="text-[#94a3b8] hover:text-[#051937] transition-colors">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                  <button onClick={() => setSearchOpen(false)} className="text-[#94a3b8] hover:text-[#051937] transition-colors ml-1">
                    <kbd className="px-2 py-0.5 rounded text-[10px] font-bold" style={{ background: "rgba(1,45,116,0.06)", color: "#94a3b8" }}>ESC</kbd>
                  </button>
                </div>
              </motion.div>

              {/* Results */}
              {searchQuery.trim().length >= 2 && (
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.15, delay: 0.1 }}
                  className="mt-3 bg-white overflow-hidden overflow-y-auto"
                  style={{ borderRadius: "14px", maxHeight: "60vh", boxShadow: "0 8px 40px rgba(0,0,0,0.15)" }}
                >
                  {searchLoading ? (
                    <div className="px-5 py-8 text-center text-[#94a3b8] font-semibold" style={{ fontSize: "13px" }}>
                      Hľadám...
                    </div>
                  ) : searchResults.articles.length === 0 && searchResults.matches.length === 0 ? (
                    <div className="px-5 py-8 text-center text-[#94a3b8] font-semibold" style={{ fontSize: "13px" }}>
                      Žiadne výsledky pre &quot;{searchQuery}&quot;
                    </div>
                  ) : (
                    <div>
                      {/* Articles */}
                      {searchResults.articles.length > 0 && (
                        <div>
                          <p className="px-5 pt-4 pb-2 font-bold uppercase text-[#94a3b8]" style={{ fontSize: "10px", letterSpacing: "0.1em" }}>
                            Články
                          </p>
                          {searchResults.articles.map((a: any) => (
                            <Link
                              key={a.id}
                              href={`/novinky/${a.slug}`}
                              onClick={() => setSearchOpen(false)}
                              className="flex items-center gap-3 px-5 py-3 hover:bg-[#f5f7fb] transition-colors"
                            >
                              {a.cover_image_url && (
                                <div className="shrink-0 overflow-hidden" style={{ width: 48, height: 32, borderRadius: "4px" }}>
                                  <Image src={a.cover_image_url} alt="" width={48} height={32} className="w-full h-full object-cover" />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-[#051937] truncate" style={{ fontSize: "13px" }}>{a.title}</p>
                                {a.category && (
                                  <span className="font-bold uppercase text-[#012d74]" style={{ fontSize: "9px", letterSpacing: "0.08em" }}>
                                    / {a.category}
                                  </span>
                                )}
                              </div>
                              <svg className="h-3.5 w-3.5 text-[#94a3b8] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                              </svg>
                            </Link>
                          ))}
                        </div>
                      )}

                      {/* Matches */}
                      {searchResults.matches.length > 0 && (
                        <div>
                          <p className="px-5 pt-4 pb-2 font-bold uppercase text-[#94a3b8]" style={{ fontSize: "10px", letterSpacing: "0.1em", borderTop: searchResults.articles.length > 0 ? "1px solid rgba(1,45,116,0.06)" : "none" }}>
                            Zápasy
                          </p>
                          {searchResults.matches.map((m: any) => {
                            const d = m.date ? new Date(m.date) : null;
                            return (
                              <Link
                                key={m.id}
                                href="/zapasy"
                                onClick={() => setSearchOpen(false)}
                                className="flex items-center gap-3 px-5 py-3 hover:bg-[#f5f7fb] transition-colors"
                              >
                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                  {m.home_logo?.startsWith("flag:") ? (
                                    <div className="shrink-0 overflow-hidden rounded-full" style={{ width: 20, height: 20 }}>
                                      {/* eslint-disable-next-line @next/next/no-img-element */}
                                      <img src={`https://flagcdn.com/w40/${m.home_logo.replace("flag:", "")}.png`} alt="" width={20} height={20} style={{ width: 20, height: 20, objectFit: "cover" }} />
                                    </div>
                                  ) : null}
                                  <span className="font-semibold text-[#051937] truncate" style={{ fontSize: "13px" }}>
                                    {m.home_short || m.home_team}
                                  </span>
                                  {m.status === "finished" && (
                                    <span className="font-bold text-[#051937] shrink-0" style={{ fontSize: "14px" }}>
                                      {m.home_score} – {m.away_score}
                                    </span>
                                  )}
                                  {m.status === "scheduled" && (
                                    <span className="font-bold text-[#94a3b8] shrink-0" style={{ fontSize: "11px" }}>vs</span>
                                  )}
                                  <span className="font-semibold text-[#051937] truncate" style={{ fontSize: "13px" }}>
                                    {m.away_short || m.away_team}
                                  </span>
                                  {m.away_logo?.startsWith("flag:") ? (
                                    <div className="shrink-0 overflow-hidden rounded-full" style={{ width: 20, height: 20 }}>
                                      {/* eslint-disable-next-line @next/next/no-img-element */}
                                      <img src={`https://flagcdn.com/w40/${m.away_logo.replace("flag:", "")}.png`} alt="" width={20} height={20} style={{ width: 20, height: 20, objectFit: "cover" }} />
                                    </div>
                                  ) : null}
                                </div>
                                <div className="text-right shrink-0">
                                  {d && <p className="text-[#94a3b8] font-bold" style={{ fontSize: "10px" }}>{d.toLocaleDateString("sk-SK", { day: "numeric", month: "short", year: "numeric" })}</p>}
                                  {m.league && <p className="text-[#94a3b8] truncate" style={{ fontSize: "9px", maxWidth: "120px" }}>{m.league}</p>}
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
