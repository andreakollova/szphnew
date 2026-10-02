"use client";

import { useState } from "react";

interface Tournament {
  league: string;
  team: string;
  flag?: string;
  logo?: string;
  venue: string;
  date: string;
}

function TournamentCard({ t }: { t: Tournament }) {
  return (
    <div className="bg-white px-4 py-3.5 flex flex-col gap-1.5 h-full" style={{ borderRadius: "10px", border: "1px solid rgba(1,45,116,0.06)", minWidth: 220 }}>
      <span className="font-bold uppercase text-[#012d74]" style={{ fontSize: "8px", letterSpacing: "0.1em", lineHeight: 1.4, minHeight: "22px", display: "block" }}>{t.league}</span>
      <div className="flex items-center gap-2">
        {t.flag ? (
          <div className="shrink-0 overflow-hidden rounded-full" style={{ width: 20, height: 20 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://flagcdn.com/w40/${t.flag}.png`} alt="" width={20} height={20} style={{ width: 20, height: 20, objectFit: "cover" }} />
          </div>
        ) : t.logo ? (
          <div className="shrink-0" style={{ width: 20, height: 20 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={t.logo} alt="" width={20} height={20} style={{ width: 20, height: 20, objectFit: "contain" }} />
          </div>
        ) : null}
        <span className="font-bold text-[#051937]" style={{ fontSize: "12px" }}>{t.team}</span>
      </div>
      <div className="flex items-center gap-1.5 text-[#64748b]">
        <svg className="h-3 w-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        <span className="font-bold" style={{ fontSize: "9px" }}>{t.venue}</span>
      </div>
      <span className="font-bold text-[#64748b]" style={{ fontSize: "9px" }}>{t.date}</span>
    </div>
  );
}

export function TournamentCarousel({ tournaments }: { tournaments: Tournament[] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-garet font-bold italic text-[#051937]" style={{ fontSize: "14px", letterSpacing: "0.05em", textTransform: "uppercase" }}>
          Najbližšie turnaje
        </h2>
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-[#012d74] font-bold hover:text-[#051937] transition-colors md:hidden"
          style={{ fontSize: "11px" }}
        >
          {expanded ? "Skryť" : "Všetky"}
          <svg className={`h-3.5 w-3.5 transition-transform ${expanded ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Mobile: horizontal scroll carousel */}
      {!expanded && (
        <div className="flex gap-3 overflow-x-auto pb-2 md:hidden snap-x snap-mandatory" style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" } as any}>
          <style>{`.tournament-scroll::-webkit-scrollbar { display: none; }`}</style>
          {tournaments.map((t, i) => (
            <div key={i} className="snap-start shrink-0 flex" style={{ width: "70%" }}>
              <TournamentCard t={t} />
            </div>
          ))}
        </div>
      )}

      {/* Mobile: expanded list */}
      {expanded && (
        <div className="flex flex-col gap-3 md:hidden">
          {tournaments.map((t, i) => (
            <TournamentCard key={i} t={t} />
          ))}
        </div>
      )}

      {/* Desktop: grid */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
        {tournaments.map((t, i) => (
          <TournamentCard key={i} t={t} />
        ))}
      </div>
    </div>
  );
}
