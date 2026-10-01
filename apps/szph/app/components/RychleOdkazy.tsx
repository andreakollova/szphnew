"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const QUICK_LINKS = [
  {
    label: "Chcem sa stať rozhodcom",
    href: "/zacni-hrat/rozhodca",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    sub: [
      { label: "Kurz rozhodcov", href: "/vzdelavanie/kurz-rozhodcov" },
      { label: "Licencie a podmienky", href: "/vzdelavanie/licencie" },
      { label: "Kontakt na komisiu", href: "/kontakt" },
    ],
  },
  {
    label: "Chcem sa stať trénerom",
    href: "/zacni-hrat/trener",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
    sub: [
      { label: "Trénerské kurzy SZPH", href: "/vzdelavanie/trenerske-kurzy" },
      { label: "FIH licencie", href: "/vzdelavanie/fih-licencie" },
      { label: "Podmienky certifikácie", href: "/vzdelavanie/certifikacia" },
    ],
  },
  {
    label: "Chcem si založiť klub",
    href: "/pre-kluby/zalozenie",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    sub: [
      { label: "Podmienky registrácie", href: "/pre-kluby/podmienky" },
      { label: "Potrebné dokumenty", href: "/dokumenty" },
      { label: "Kontakt SZPH", href: "/kontakt" },
    ],
  },
  {
    label: "Chcem sa stať hráčom",
    href: "/zacni-hrat/hrac",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    sub: [
      { label: "Kde hrať — nájdi klub", href: "/kluby" },
      { label: "Registrácia hráča", href: "/pre-kluby/registracia" },
      { label: "Potrebné vybavenie", href: "/o-pozemnom-hokeji/vybavenie" },
    ],
  },
];

export function RychleOdkazy() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div>
      {/* Banner */}
      <Link
        href="/zacni-hrat"
        className="group block relative overflow-hidden mb-5"
        style={{ borderRadius: "3px", height: "140px" }}
      >
        <Image
          src="/images/hockey-field-bg.webp"
          alt="Staň sa súčasťou hry"
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="300px"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(1,26,74,0.7) 0%, rgba(1,45,116,0.45) 100%)" }}
        />
        <div className="absolute inset-0 flex flex-col justify-center px-5">
          <p className="font-garet font-bold text-white leading-tight" style={{ fontSize: "15px" }}>
            Začni hrať pozemný hokej!
          </p>
          <p className="text-white mt-1" style={{ fontSize: "11px" }}>
            Nájdi svoj tím a pridaj sa.
          </p>
          <div
            className="mt-3 inline-flex items-center gap-2 self-start px-3.5 py-1.5 font-bold text-white"
            style={{
              fontSize: "10px",
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "20px",
              letterSpacing: "0.04em",
            }}
          >
            Chcem sa stať hráčom
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </Link>

      {/* Eshop banner */}
      <Link
        href="/eshop"
        className="group block relative overflow-hidden mb-5"
        style={{ borderRadius: "3px", height: "140px" }}
      >
        <Image
          src="/images/eshop-banner.webp"
          alt="Oficiálny eshop"
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="300px"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(216,0,39,0.85) 0%, rgba(216,0,39,0.4) 50%, transparent 100%)" }}
        />
        <div className="absolute inset-0 flex flex-col justify-center px-5">
          <p className="font-garet font-bold text-white leading-tight" style={{ fontSize: "15px" }}>
            Oficiálny e-shop
          </p>
          <p className="text-white mt-1" style={{ fontSize: "11px" }}>
            Dresy, merch a vybavenie.
          </p>
          <div
            className="mt-2.5 inline-flex items-center gap-2 self-start px-3.5 py-1.5 font-bold text-white"
            style={{
              fontSize: "10px",
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.25)",
              borderRadius: "20px",
              letterSpacing: "0.04em",
            }}
          >
            Zobraziť obchod
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </Link>

      {/* Links */}
      <div className="flex flex-col">
        {QUICK_LINKS.map((item, i) => (
          <div key={i} style={{ borderTop: "1px solid rgba(1,45,116,0.08)" }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center gap-3 py-3.5 text-left group"
            >
              <span className="shrink-0 text-[#012d74]">{item.icon}</span>
              <span
                className="flex-1 font-bold text-[#051937] group-hover:text-[#012D74] transition-colors"
                style={{ fontSize: "13px" }}
              >
                {item.label}
              </span>
              <svg
                className="h-4 w-4 shrink-0 text-[#94a3b8] transition-transform"
                style={{ transform: open === i ? "rotate(90deg)" : "rotate(0deg)" }}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            {open === i && (
              <div className="pb-3 flex flex-col gap-1.5 pl-9">
                {item.sub.map((s, j) => (
                  <Link
                    key={j}
                    href={s.href}
                    className="flex items-center gap-2 text-[#64748b] hover:text-[#012D74] transition-colors"
                    style={{ fontSize: "11px" }}
                  >
                    <span className="h-1 w-1 rounded-full bg-[#012d74] shrink-0" />
                    {s.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
        <div style={{ borderTop: "1px solid rgba(1,45,116,0.08)" }} />
      </div>
    </div>
  );
}
