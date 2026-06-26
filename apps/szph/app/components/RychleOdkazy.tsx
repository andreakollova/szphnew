"use client";

import Link from "next/link";
import { useState } from "react";

const QUICK_LINKS = [
  {
    label: "Chcem sa stať hráčom",
    href: "/zacni-hrat/hrac",
    sub: [
      { label: "Kde hrať — nájdi klub", href: "/kluby" },
      { label: "Registrácia hráča", href: "/pre-kluby/registracia" },
      { label: "Potrebné vybavenie", href: "/o-pozemnom-hokeji/vybavenie" },
    ],
  },
  {
    label: "Chcem sa stať rozhodcom",
    href: "/zacni-hrat/rozhodca",
    sub: [
      { label: "Kurz rozhodcov", href: "/vzdelavanie/kurz-rozhodcov" },
      { label: "Licencie a podmienky", href: "/vzdelavanie/licencie" },
      { label: "Kontakt na komisiu", href: "/kontakt" },
    ],
  },
  {
    label: "Chcem sa stať trénerom",
    href: "/zacni-hrat/trener",
    sub: [
      { label: "Trénerské kurzy SZPH", href: "/vzdelavanie/trenerske-kurzy" },
      { label: "FIH licencie", href: "/vzdelavanie/fih-licencie" },
      { label: "Podmienky certifikácie", href: "/vzdelavanie/certifikacia" },
    ],
  },
  {
    label: "Chcem si založiť klub",
    href: "/pre-kluby/zalozenie",
    sub: [
      { label: "Podmienky registrácie", href: "/pre-kluby/podmienky" },
      { label: "Potrebné dokumenty", href: "/dokumenty" },
      { label: "Kontakt SZPH", href: "/kontakt" },
    ],
  },
  {
    label: "Spoznaj pozemný hokej",
    href: "/o-pozemnom-hokeji",
    sub: [
      { label: "História pozemného hokeja", href: "/o-pozemnom-hokeji/historia" },
      { label: "Pravidlá hry", href: "/o-pozemnom-hokeji/pravidla" },
      { label: "Medzinárodné súťaže", href: "/o-pozemnom-hokeji/medzinarodne" },
    ],
  },
];

export function RychleOdkazy() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div>
      <p className="font-garet font-bold italic text-[#051937] mb-6" style={{ fontSize: "13px", letterSpacing: "0.05em", textTransform: "uppercase" }}>
        Rýchle odkazy
      </p>
      <div className="flex flex-col">
        {QUICK_LINKS.map((item, i) => (
          <div key={i} style={{ borderTop: "1px solid rgba(1,45,116,0.08)" }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between py-3.5 text-left group"
            >
              <span
                className="font-bold text-[#051937] group-hover:text-[#012D74] transition-colors"
                style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" }}
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
              <div className="pb-3 flex flex-col gap-1.5 pl-2">
                {item.sub.map((s, j) => (
                  <Link
                    key={j}
                    href={s.href}
                    className="flex items-center gap-2 text-[#64748b] hover:text-[#012D74] transition-colors"
                    style={{ fontSize: "11px" }}
                  >
                    <span className="h-1 w-1 rounded-full bg-[#C8102E] shrink-0" />
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
