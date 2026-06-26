"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";

/* ============================================================
   Typy
   ============================================================ */
interface DropdownItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  dropdown?: DropdownItem[];
}

/* ============================================================
   fieldhockey.sk navigačná štruktúra
   ============================================================ */
const FIELDHOCKEY_NAV: NavItem[] = [
  {
    label: "Pozemny hokej",
    href: "/o-pozemnom-hokeji",
    dropdown: [
      { label: "Co je to pozemny hokej?", href: "/o-pozemnom-hokeji/co-je-to" },
      { label: "Pravidla",                href: "/o-pozemnom-hokeji/pravidla" },
      { label: "Historia",                href: "/o-pozemnom-hokeji/historia" },
      { label: "Chcem zacat",             href: "/o-pozemnom-hokeji/chcem-zacat" },
    ],
  },
  {
    label: "Reprezentacia",
    href: "/reprezentacia",
  },
  {
    label: "Sutaze",
    href: "/sutaze",
    dropdown: [
      { label: "Pozemny hokej",  href: "/sutaze/pozemny-hokej" },
      { label: "Halovy hokej",   href: "/sutaze/halovy-hokej" },
      { label: "Archiv sutazi",  href: "/sutaze/archiv" },
    ],
  },
  {
    label: "Kluby",
    href: "/kluby",
    dropdown: [
      { label: "KPH Raca",                       href: "/kluby/kph-raca" },
      { label: "Hokejovy klub 1952 Senkvice",    href: "/kluby/hk-senkvice" },
      { label: "Hokejova akademia Senkvice",     href: "/kluby/ha-senkvice" },
      { label: "HKM Nova Dubnica",               href: "/kluby/hkm-nova-dubnica" },
      { label: "KPH HOKO Zlate Moravce",         href: "/kluby/kph-hoko-zm" },
      { label: "TJ Slavia Holic",                href: "/kluby/tj-slavia-holic" },
    ],
  },
];

/* ============================================================
   Dropdown komponent
   ============================================================ */
function NavDropdown({ item, light = false }: { item: NavItem; light?: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  if (!item.dropdown) {
    return (
      <li>
        <Link
          href={item.href}
          className="flex items-center px-3 py-2 text-sm font-semibold text-[#012d74]/70 hover:text-[#012d74] transition-colors rounded-lg hover:bg-[#e8f0fb]"
        >
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center gap-1 px-3 py-2 text-sm font-semibold transition-colors rounded-lg hover:bg-[#e8f0fb]",
          open ? "text-[#012d74] bg-[#e8f0fb]" : "text-[#012d74]/70 hover:text-[#012d74]"
        )}
      >
        <span className="whitespace-nowrap">{item.label}</span>
        <svg
          className={cn("h-3.5 w-3.5 shrink-0 transition-transform duration-200", open && "rotate-180")}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full mt-1.5 z-50 min-w-[220px] overflow-hidden rounded-xl border border-[#012d74]/8 shadow-lg"
            style={{ background: "#ffffff" }}
          >
            {item.dropdown.map((sub) => (
              <li key={sub.href}>
                <Link
                  href={sub.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2.5 text-sm text-[#012d74]/70 hover:text-[#012d74] hover:bg-[#e8f0fb] transition-colors"
                >
                  {sub.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
}

/* ============================================================
   Language Selector
   ============================================================ */
function LangSelector() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<"SK" | "EN">("SK");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 rounded-lg border border-[#012d74]/20 px-2.5 py-1.5 text-xs font-bold text-[#012d74]/70 hover:text-[#012d74] hover:border-[#012d74]/40 transition-colors"
      >
        {lang}
        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.12 }}
            className="absolute right-0 top-full mt-1.5 z-50 overflow-hidden rounded-xl border border-[#012d74]/8 shadow-lg"
            style={{ background: "#ffffff" }}
          >
            {(["SK", "EN"] as const).map((l) => (
              <button
                key={l}
                onClick={() => { setLang(l); setOpen(false); }}
                className={cn(
                  "block w-full px-4 py-2 text-left text-sm font-semibold transition-colors hover:bg-[#e8f0fb]",
                  lang === l ? "text-[#016fb4]" : "text-[#012d74]/70 hover:text-[#012d74]"
                )}
              >
                {l === "SK" ? "Slovensky" : "English"}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ============================================================
   Hlavná Navbar (fieldhockey.sk)
   ============================================================ */
interface NavbarProps {
  brand?: "fieldhockey" | "szph";
  logoSrc?: string;
  logoAlt?: string;
  crossSiteUrl?: string;
  crossSiteLabel?: string;
}

export function Navbar({
  brand = "fieldhockey",
  logoSrc = "/images/logo-szph.png",
  logoAlt = "fieldhockey.sk",
  crossSiteUrl,
  crossSiteLabel,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen]         = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  return (
    <header className="fixed inset-x-0 top-0 z-50 shadow-sm" style={{ background: "#ffffff" }}>

      {/* ── Modrá announcement bar ───────────────────────── */}
      <div className="hidden md:flex items-center justify-between px-6 py-1.5 text-xs" style={{ background: "#016fb4" }}>
        <span className="text-white/80 font-medium">Slovensky zvaz pozemneho hokeja — oficialna stranka</span>
        <div className="flex items-center gap-4">
          {crossSiteUrl && crossSiteLabel && (
            <a href={crossSiteUrl} target="_blank" rel="noopener noreferrer"
              className="text-white/80 hover:text-white font-semibold transition-colors flex items-center gap-1">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              {crossSiteLabel}
            </a>
          )}
          <span className="text-white/60">|</span>
          <a href="mailto:info@fieldhockey.sk" className="text-white/80 hover:text-white transition-colors">info@fieldhockey.sk</a>
        </div>
      </div>

      {/* ── Biela hlavná navigácia ───────────────────────── */}
      <nav className="container-szph flex h-16 items-center justify-between border-b border-gray-100">

        {/* Logo */}
        <Link href="/" className="shrink-0 flex items-center gap-2">
          <Image src={logoSrc} alt={logoAlt} height={40} width={120}
            className="h-10 w-auto object-contain" priority />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-0 md:flex">
          {FIELDHOCKEY_NAV.map((item) => (
            <NavDropdown key={item.href} item={item} />
          ))}
        </ul>

        {/* Prava strana */}
        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <LangSelector />
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-lg md:hidden"
            aria-label="Menu"
            aria-expanded={mobileOpen}
          >
            <span className={cn("h-0.5 w-5 bg-[#012d74] transition-all duration-300", mobileOpen && "translate-y-2 rotate-45")} />
            <span className={cn("h-0.5 w-5 bg-[#012d74] transition-all duration-300", mobileOpen && "opacity-0")} />
            <span className={cn("h-0.5 w-5 bg-[#012d74] transition-all duration-300", mobileOpen && "-translate-y-2 -rotate-45")} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden border-t border-gray-100 md:hidden bg-white"
          >
            <div className="container-szph py-4 space-y-1">
              {FIELDHOCKEY_NAV.map((item) => (
                <div key={item.href}>
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === item.href ? null : item.href)}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-[#012d74] hover:bg-[#e8f0fb] transition-colors"
                  >
                    {item.label}
                    {item.dropdown && (
                      <svg
                        className={cn("h-4 w-4 transition-transform", mobileExpanded === item.href && "rotate-180")}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </button>
                  <AnimatePresence>
                    {item.dropdown && mobileExpanded === item.href && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.15 }}
                        className="overflow-hidden"
                      >
                        <div className="ml-3 mt-1 space-y-0.5 border-l border-[#012d74]/10 pl-3 pb-1">
                          {item.dropdown.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={() => setMobileOpen(false)}
                              className="block rounded px-2 py-1.5 text-sm text-[#012d74]/60 hover:text-[#012d74] transition-colors"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* Language + cross-site */}
              <div className="pt-3 border-t border-[#012d74]/8 flex items-center justify-between">
                <div className="flex gap-2">
                  {(["SK", "EN"] as const).map((l) => (
                    <span key={l} className="rounded px-2.5 py-1 text-xs font-bold text-[#012d74]/60 border border-[#012d74]/15">
                      {l}
                    </span>
                  ))}
                </div>
                {crossSiteUrl && crossSiteLabel && (
                  <a href={crossSiteUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-[#012d74]/50 hover:text-[#012d74]">
                    {crossSiteLabel} →
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
