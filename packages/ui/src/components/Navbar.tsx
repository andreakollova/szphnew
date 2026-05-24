"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";

interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  brand: "fieldhockey" | "szph";
  items?: NavItem[];
  logoSrc?: string;
  logoAlt?: string;
  crossSiteUrl?: string;
  crossSiteLabel?: string;
}

const DEFAULT_ITEMS_FIELDHOCKEY: NavItem[] = [
  { label: "Novinky",       href: "/novinky" },
  { label: "Zápasy",        href: "/zapasy" },
  { label: "Video",         href: "/video" },
  { label: "O pozemnom hokeji", href: "/o-pozemnom-hokeji" },
];

const DEFAULT_ITEMS_SZPH: NavItem[] = [
  { label: "Novinky",       href: "/novinky" },
  { label: "Zápasy",        href: "/zapasy" },
  { label: "Dokumenty",     href: "/dokumenty" },
  { label: "Pre kluby",     href: "/pre-kluby" },
  { label: "Kontakt",       href: "/kontakt" },
];

export function Navbar({
  brand,
  items,
  logoSrc = "/images/logo-szph.png",
  logoAlt = "SZPH",
  crossSiteUrl,
  crossSiteLabel,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  const navItems = items ?? (brand === "fieldhockey" ? DEFAULT_ITEMS_FIELDHOCKEY : DEFAULT_ITEMS_SZPH);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "glass border-b border-white/10"
          : "bg-transparent"
      )}
    >
      <nav className="container-szph flex h-16 items-center justify-between md:h-18">
        {/* Logo */}
        <Link href="/" className="relative flex items-center gap-3 shrink-0">
          {logoSrc && (
            <div className="relative h-9 w-auto">
              <Image
                src={logoSrc}
                alt={logoAlt}
                height={36}
                width={100}
                className="h-9 w-auto object-contain"
                priority
              />
            </div>
          )}
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Cross-site prepínač + hamburger */}
        <div className="flex items-center gap-2">
          {crossSiteUrl && crossSiteLabel && (
            <a
              href={crossSiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 rounded-lg border border-white/20 px-3 py-1.5 text-xs font-semibold text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              {crossSiteLabel}
            </a>
          )}

          {/* Hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-lg md:hidden"
            aria-label="Menu"
            aria-expanded={open}
          >
            <span className={cn("h-0.5 w-5 bg-white transition-all duration-300", open && "translate-y-2 rotate-45")} />
            <span className={cn("h-0.5 w-5 bg-white transition-all duration-300", open && "opacity-0")} />
            <span className={cn("h-0.5 w-5 bg-white transition-all duration-300", open && "-translate-y-2 -rotate-45")} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden glass border-t border-white/10 md:hidden"
          >
            <ul className="container-szph flex flex-col py-4 gap-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-base font-semibold text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {crossSiteUrl && crossSiteLabel && (
                <li className="mt-2 border-t border-white/10 pt-2">
                  <a
                    href={crossSiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-lg px-3 py-2.5 text-sm text-white/50 hover:text-white"
                  >
                    Prejsť na {crossSiteLabel} →
                  </a>
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
