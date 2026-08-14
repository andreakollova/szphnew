"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";
import { createClient } from "@supabase/supabase-js";

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
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-[320px_1fr] gap-8">

        {/* Featured karta */}
        <Link href={featured.href} className="group relative overflow-hidden rounded-lg block" style={{ minHeight: "240px" }}>
          <Image src={featured.image} alt={featured.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 rounded-lg" style={{ background: "linear-gradient(to top, rgba(5,25,55,0.92) 0%, rgba(5,25,55,0.3) 60%, transparent 100%)" }} />
          <div className="absolute bottom-0 p-5">
            <h3 className="font-garet font-black italic text-white text-lg leading-tight mb-1">{featured.title}</h3>
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
              <p className="font-bold uppercase tracking-widest text-[#94a3b8] mb-4" style={{ fontSize: "11.5px" }}>
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

interface NavbarSzphProps {
  announcement?: { text: string; href?: string } | null;
}

export function NavbarSzph({ announcement }: NavbarSzphProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [scrolled, setScrolled] = useState(true);
  const [quickLinksOpen, setQuickLinksOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<{ articles: any[]; matches: any[] }>({ articles: [], matches: [] });
  const [searchLoading, setSearchLoading] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Re-check on every route change
    const check = () => {
      const hasHero = !!document.querySelector("[data-hero]");
      if (!hasHero) {
        setScrolled(true);
        return;
      }
      const onScroll = () => setScrolled(window.scrollY > 80);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    };
    const cleanup = check();
    // MutationObserver to detect route changes (data-hero added/removed)
    const observer = new MutationObserver(() => {
      const hasHero = !!document.querySelector("[data-hero]");
      if (!hasHero) setScrolled(true);
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => { cleanup?.(); observer.disconnect(); };
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
          background: scrolled ? "rgba(5,25,55,0.85)" : "rgba(5,25,55,0.6)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
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

      {/* Mobilný announcement bar */}
      {announcement && (
        <div className="fixed inset-x-0 top-0 z-[60] flex md:hidden items-center justify-center px-4" style={{ background: "#051937", height: "32px" }}>
          {announcement.href ? (
            <Link href={announcement.href} className="flex items-center gap-2 text-white font-bold truncate" style={{ fontSize: "10px", letterSpacing: "0.03em" }}>
              <span className="shrink-0 h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
              {announcement.text}
            </Link>
          ) : (
            <span className="flex items-center gap-2 text-white font-bold truncate" style={{ fontSize: "10px" }}>
              <span className="shrink-0 h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
              {announcement.text}
            </span>
          )}
        </div>
      )}

      <header
        className="fixed inset-x-0 z-[55] flex flex-col transition-all duration-300"
        style={{
          top: "36px",
          background: scrolled ? "#ffffff" : "rgba(255,255,255,0.08)",
          backdropFilter: scrolled ? "none" : "blur(12px)",
          WebkitBackdropFilter: scrolled ? "none" : "blur(12px)",
          boxShadow: scrolled ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
          borderBottom: scrolled ? "1px solid rgba(1,45,116,0.15)" : "1px solid rgba(255,255,255,0.1)",
        }}
      >

        {/* ── NAVBAR — logo, nav, quick links as pills, actions ── */}
        <div className="hidden md:flex items-center gap-2 px-6 h-20">
          <Link href="/" className="shrink-0 mr-8 relative" style={{ height: "76px", width: "234px" }}>
            <Image
              src={scrolled ? "/images/logo-szph-dark.png" : "/images/logo-szph-white.png"}
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
                      activeMega === item.href
                        ? scrolled
                          ? "text-[#012d74] bg-[rgba(1,45,116,0.06)]"
                          : "text-white"
                        : scrolled
                          ? "text-[#061b3a] hover:text-[#061b3a]/80 hover:bg-[#f0f4fa]"
                          : "text-white/90 hover:text-white/65"
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
          <div className="relative shrink-0 mr-1">
            <button
              onClick={() => setQuickLinksOpen(v => !v)}
              className={cn(
                "flex items-center justify-center h-8 w-8 rounded-full transition-all duration-300",
                scrolled ? "hover:bg-[#051937]/[0.05]" : "hover:bg-white/10"
              )}
              style={{ color: scrolled ? "rgba(1,45,116,0.45)" : "rgba(255,255,255,0.6)" }}
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
                  className="absolute right-0 top-full mt-2 py-2 rounded-xl overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.95)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    boxShadow: "0 8px 32px rgba(1,45,116,0.15), 0 1px 4px rgba(1,45,116,0.08)",
                    minWidth: "200px",
                    border: "1px solid rgba(1,45,116,0.08)",
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
          <div className="shrink-0 transition-colors duration-300" style={{ width: "1px", height: "24px", background: scrolled ? "rgba(1,45,116,0.1)" : "rgba(255,255,255,0.15)" }} />

          <div className="flex items-center gap-3 ml-3 shrink-0">
            <button
              onClick={() => setSearchOpen(true)}
              className={cn("flex items-center justify-center h-8 w-8 rounded-full transition-all duration-300", scrolled ? "hover:bg-[#051937]/[0.05]" : "hover:bg-white/10")}
              style={{ color: scrolled ? "rgba(1,45,116,0.45)" : "rgba(255,255,255,0.6)" }} aria-label="Vyhľadať">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <Link href="/admin/prihlasenie" className={cn("flex items-center justify-center h-8 w-8 rounded-full transition-all duration-300", scrolled ? "hover:bg-[#051937]/[0.05]" : "hover:bg-white/10")}
              style={{ color: scrolled ? "rgba(1,45,116,0.45)" : "rgba(255,255,255,0.6)" }} aria-label="Prihlásenie">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </Link>
            <a href="/zapasy"
              className="flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold text-white transition-all hover:brightness-110"
              style={{ background: "#012d74" }}>
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                <circle cx="12" cy="12" r="9" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 8.5l5 3.5-5 3.5V8.5z" />
              </svg>
              Zápasové centrum
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
              style={{ background: "#012d74" }}>
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
                    style={{ background: "#012d74" }}>
                    <span className="h-2 w-2 rounded-full bg-white/70 animate-pulse" />
                    Zápasové centrum a archív
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
