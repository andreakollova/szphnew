"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";

interface DbMatch {
  id: string;
  home_team: string;
  away_team: string;
  home_short?: string;
  away_short?: string;
  home_logo?: string;
  away_logo?: string;
  home_score?: number | null;
  away_score?: number | null;
  date: string;
  match_time?: string;
  league?: string;
  venue?: string;
  status?: string;
  video_url?: string | null;
  site?: string;
}

interface MatchCenterProps {
  competitions?: any[];
  matches: DbMatch[];
  className?: string;
}

const CATEGORY_TABS: { key: string; label: string }[] = [
  { key: "all",  label: "Všetky" },
  { key: "muzi", label: "Muži" },
  { key: "zeny", label: "Ženy" },
  { key: "U18",  label: "U18" },
  { key: "U14",  label: "U14" },
  { key: "U12",  label: "U12" },
];

const COUNTRY_CODES: Record<string, string> = {
  "Slovensko": "sk", "Chorvátsko": "hr", "Poľsko": "pl", "Česko": "cz",
  "Rakúsko": "at", "Maďarsko": "hu", "Nemecko": "de", "Švajčiarsko": "ch",
  "Francúzsko": "fr", "Španielsko": "es", "Taliansko": "it", "Belgicko": "be",
  "Holandsko": "nl", "Anglicko": "gb-eng", "Veľká Británia": "gb", "Írsko": "ie",
  "Škótsko": "gb-sct", "Wales": "gb-wls", "Dánsko": "dk", "Švédsko": "se",
  "Nórsko": "no", "Fínsko": "fi", "Rusko": "ru", "Ukrajina": "ua",
  "Bielorusko": "by", "Litva": "lt", "Lotyšsko": "lv", "Estónsko": "ee",
  "Rumunsko": "ro", "Bulharsko": "bg", "Srbsko": "rs", "Čierna Hora": "me",
  "Slovinsko": "si", "Bosna a Hercegovina": "ba", "Severné Macedónsko": "mk",
  "Albánsko": "al", "Grécko": "gr", "Turecko": "tr", "Cyprus": "cy",
  "Malta": "mt", "Luxembursko": "lu", "Lichtenštajnsko": "li", "Island": "is",
  "Portugalsko": "pt", "India": "in", "Pakistan": "pk", "Argentína": "ar",
  "Austrália": "au", "Nový Zéland": "nz", "Japonsko": "jp", "Južná Kórea": "kr",
  "Čína": "cn", "Malajzia": "my", "USA": "us", "Kanada": "ca",
  "Juhoafrická republika": "za", "Egypt": "eg", "Ghana": "gh", "Keňa": "ke",
  "Singapur": "sg", "Thajsko": "th", "Indonézia": "id", "Filipíny": "ph",
};

function flagUrl(name: string): string | null {
  const code = COUNTRY_CODES[name];
  return code ? `https://flagcdn.com/w40/${code}.png` : null;
}

const TEAM_LOGOS: Record<string, string> = {
  "KPH Rača":              "/images/timy/Raca-logo-70x58-1-32x27.png",
  "HKM Nová Dubnica":      "/images/timy/nova-dubnica-32x32.png",
  "HOKO Zlaté Moravce":    "/images/timy/logo-KPH-HOKO-1-Photoroom-32x18.png",
  "TJ Slavia Holíč":       "/images/timy/SK-slavia-logo-300x300-1-32x32.png",
  "TJ Slavia Šamorín":     "/images/timy/SK-slavia-logo-300x300-1-32x32.png",
  "HA Senkvice":           "/images/timy/Logo-SK-Senkvice-59x70-1-27x32.png",
  "HK Senkvice":           "/images/timy/Logo-SK-Senkvice-59x70-1-27x32.png",
  "SK Senec":              "/images/timy/Zumi-32x32.png",
};

interface MockMatch {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  competition: string;
  venue: string;
  status: "scheduled" | "finished" | "live";
  homeScore?: number;
  awayScore?: number;
}

const MOCK_REP_UPCOMING: MockMatch[] = [
  { id: "ru1", homeTeam: "Slovensko", awayTeam: "Chorvátsko",  date: "2025-06-20T14:00:00Z", competition: "EuroHockey Ch.",  venue: "Bratislava",  status: "scheduled" },
  { id: "ru2", homeTeam: "Slovensko", awayTeam: "Poľsko",      date: "2025-06-22T16:00:00Z", competition: "EuroHockey Ch.",  venue: "Bratislava",  status: "scheduled" },
  { id: "ru3", homeTeam: "Česko",     awayTeam: "Slovensko",   date: "2025-06-25T11:00:00Z", competition: "EuroHockey Ch.",  venue: "Praha",       status: "scheduled" },
];

const MOCK_REP_PAST: MockMatch[] = [
  { id: "rp1", homeTeam: "Slovensko", awayTeam: "Chorvátsko",  date: "2025-06-12T13:00:00Z", competition: "EuroHockey Ch.",  venue: "Bratislava",  status: "finished", homeScore: 3, awayScore: 1 },
  { id: "rp2", homeTeam: "Slovensko", awayTeam: "Poľsko",      date: "2025-06-10T15:00:00Z", competition: "EuroHockey Ch.",  venue: "Bratislava",  status: "finished", homeScore: 1, awayScore: 2 },
  { id: "rp3", homeTeam: "Rakúsko",   awayTeam: "Slovensko",   date: "2025-06-08T10:00:00Z", competition: "EuroHockey Ch.",  venue: "Viedeň",      status: "finished", homeScore: 0, awayScore: 4 },
];

const MOCK_UPCOMING: MockMatch[] = [
  { id: "u1", homeTeam: "KPH Rača",         awayTeam: "HA Senkvice",      date: "2025-06-15T13:00:00Z", competition: "Extraliga muži",  venue: "Bratislava",    status: "scheduled" },
  { id: "u2", homeTeam: "TJ Slavia Holíč",  awayTeam: "HKM Nová Dubnica", date: "2025-06-15T15:00:00Z", competition: "Extraliga muži",  venue: "Holíč",         status: "scheduled" },
  { id: "u3", homeTeam: "HOKO Zlaté Moravce", awayTeam: "SK Senec",        date: "2025-06-16T10:00:00Z", competition: "Extraliga muži",  venue: "Zlaté Moravce", status: "scheduled" },
  { id: "u4", homeTeam: "HA Senkvice",       awayTeam: "KPH Rača",         date: "2025-06-22T11:00:00Z", competition: "Extraliga ženy",  venue: "Senkvice",      status: "scheduled" },
  { id: "u5", homeTeam: "HK Senkvice",       awayTeam: "TJ Slavia Šamorín",date: "2025-06-22T13:00:00Z", competition: "Extraliga ženy",  venue: "Senkvice",      status: "scheduled" },
  { id: "u6", homeTeam: "SK Senec",          awayTeam: "HOKO Zlaté Moravce",date: "2025-06-23T10:00:00Z", competition: "U18 liga",        venue: "Senec",         status: "scheduled" },
  { id: "u7", homeTeam: "KPH Rača",          awayTeam: "TJ Slavia Holíč",  date: "2025-06-29T13:00:00Z", competition: "Extraliga muži",  venue: "Bratislava",    status: "scheduled" },
  { id: "u8", homeTeam: "HKM Nová Dubnica",  awayTeam: "HOKO Zlaté Moravce",date: "2025-06-29T15:00:00Z", competition: "Extraliga muži", venue: "Nová Dubnica",  status: "scheduled" },
  { id: "u9", homeTeam: "TJ Slavia Šamorín", awayTeam: "SK Senec",         date: "2025-06-30T10:00:00Z", competition: "Extraliga ženy",  venue: "Šamorín",       status: "scheduled" },
];

const MOCK_PAST: MockMatch[] = [
  { id: "p1", homeTeam: "KPH Rača",          awayTeam: "HOKO Zlaté Moravce", date: "2025-06-08T13:00:00Z", competition: "Extraliga muži",  venue: "Bratislava",    status: "finished", homeScore: 4, awayScore: 1 },
  { id: "p2", homeTeam: "HA Senkvice",        awayTeam: "TJ Slavia Holíč",    date: "2025-06-08T15:00:00Z", competition: "Extraliga muži",  venue: "Senkvice",      status: "finished", homeScore: 2, awayScore: 2 },
  { id: "p3", homeTeam: "HKM Nová Dubnica",   awayTeam: "SK Senec",           date: "2025-06-09T10:00:00Z", competition: "Extraliga muži",  venue: "Nová Dubnica",  status: "finished", homeScore: 3, awayScore: 0 },
  { id: "p4", homeTeam: "TJ Slavia Šamorín",  awayTeam: "HA Senkvice",        date: "2025-06-01T11:00:00Z", competition: "Extraliga ženy",  venue: "Šamorín",       status: "finished", homeScore: 1, awayScore: 3 },
  { id: "p5", homeTeam: "HOKO Zlaté Moravce", awayTeam: "KPH Rača",           date: "2025-06-01T13:00:00Z", competition: "Extraliga muži",  venue: "Zlaté Moravce", status: "finished", homeScore: 0, awayScore: 2 },
  { id: "p6", homeTeam: "SK Senec",           awayTeam: "HK Senkvice",        date: "2025-06-02T10:00:00Z", competition: "U18 liga",        venue: "Senec",         status: "finished", homeScore: 5, awayScore: 2 },
  { id: "p7", homeTeam: "TJ Slavia Holíč",    awayTeam: "KPH Rača",           date: "2025-05-25T13:00:00Z", competition: "Extraliga muži",  venue: "Holíč",         status: "finished", homeScore: 1, awayScore: 1 },
  { id: "p8", homeTeam: "KPH Rača",           awayTeam: "HKM Nová Dubnica",   date: "2025-05-25T15:00:00Z", competition: "Extraliga muži",  venue: "Bratislava",    status: "finished", homeScore: 6, awayScore: 0 },
  { id: "p9", homeTeam: "HK Senkvice",        awayTeam: "TJ Slavia Šamorín",  date: "2025-05-26T10:00:00Z", competition: "Extraliga ženy",  venue: "Senkvice",      status: "finished", homeScore: 2, awayScore: 1 },
];

function TeamLogoFromDb({ logo, name, size = 28 }: { logo?: string; name: string; size?: number }) {
  if (logo?.startsWith("flag:")) {
    const code = logo.replace("flag:", "");
    return (
      <div className="shrink-0 overflow-hidden rounded-full" style={{ width: size, height: size }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`https://flagcdn.com/w80/${code}.png`} alt={name} width={size} height={size} style={{ width: size, height: size, objectFit: "cover" }} />
      </div>
    );
  }
  if (logo?.startsWith("circle:")) {
    const [, letter, color] = logo.split(":");
    return (
      <div className="shrink-0 flex items-center justify-center rounded-full text-white font-black" style={{ width: size, height: size, background: color, fontSize: size * 0.4 }}>
        {letter}
      </div>
    );
  }
  if (logo?.startsWith("/") || logo?.startsWith("https://")) {
    return (
      <div className="shrink-0" style={{ width: size, height: size }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} alt={name} width={size} height={size} style={{ width: size, height: size, objectFit: "contain" }} />
      </div>
    );
  }
  // Fallback — try country flag
  const flag = flagUrl(name);
  if (flag) {
    return (
      <div className="shrink-0 overflow-hidden rounded-full" style={{ width: size, height: size }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={flag} alt={name} width={size} height={size} style={{ width: size, height: size, objectFit: "cover" }} />
      </div>
    );
  }
  return (
    <div className="shrink-0 flex items-center justify-center rounded-full" style={{ width: size, height: size, background: "#e2e8f0" }}>
      <span className="font-black text-[#64748b]" style={{ fontSize: size * 0.3 }}>
        {name.split(" ").map(w => w[0]).join("").slice(0, 3).toUpperCase()}
      </span>
    </div>
  );
}

// Keep old TeamLogo for backward compat
function TeamLogo({ name }: { name: string }) {
  const logo = TEAM_LOGOS[name];
  const flag = flagUrl(name);
  if (logo) return <div className="relative shrink-0" style={{ width: 28, height: 28 }}><Image src={logo} alt={name} fill className="object-contain" sizes="28px" /></div>;
  if (flag) return <div className="relative shrink-0 overflow-hidden rounded-full" style={{ width: 28, height: 28 }}><Image src={flag} alt={name} fill className="object-cover" sizes="28px" /></div>;
  return <div className="shrink-0 flex items-center justify-center rounded-full" style={{ width: 28, height: 28, background: "#e2e8f0" }}><span className="font-black text-[#64748b]" style={{ fontSize: "8px" }}>{name.split(" ").map(w => w[0]).join("").slice(0, 3).toUpperCase()}</span></div>;
}

function MatchRow({ m, index }: { m: DbMatch; index: number }) {
  const finished = m.status === "finished";
  const hs = m.home_score ?? 0;
  const as = m.away_score ?? 0;
  const homeWin = finished && hs > as;
  const awayWin = finished && as > hs;
  const d = new Date(m.date);
  const time = m.match_time || d.toLocaleTimeString("sk-SK", { hour: "2-digit", minute: "2-digit" });

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay: index * 0.04 }}
      className="flex flex-col bg-white"
      style={{ borderBottom: "1px solid rgba(1,45,116,0.07)", borderLeft: "3px solid transparent" }}
    >
      {/* Liga + dátum + video */}
      <div className="px-4 pt-4 flex items-center justify-between">
        <span className="font-bold uppercase text-[#64748b]" style={{ fontSize: "8px", letterSpacing: "0.12em" }}>
          {(m.league || "Zápas").replace(/\s*\(.*miesto\)/, "").replace(/\s*\(finále\)/, "")}
        </span>
        <div className="flex items-center gap-2">
          {m.video_url && (
            <a href={m.video_url} target="_blank" rel="noopener noreferrer" className="text-[#012d74] hover:text-[#051937]">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </a>
          )}
          <span className="font-bold uppercase text-[#64748b]" style={{ fontSize: "8px", letterSpacing: "0.1em" }}>
            {d.toLocaleDateString("sk-SK", { day: "numeric", month: "short", year: "numeric" })} · {time}
          </span>
        </div>
      </div>

      {/* Tímy + skóre */}
      <div className="px-4 py-3 flex items-center gap-3">
        {/* Domáci */}
        <div className={cn("flex items-center gap-2.5 flex-1 min-w-0", "")}>
          <TeamLogoFromDb logo={m.home_logo} name={m.home_team} size={32} />
          <span className="font-bold text-[#051937] truncate" style={{ fontSize: "12px" }}>
            {m.home_short || m.home_team}
          </span>
        </div>

        {/* Skóre */}
        <div className="shrink-0 flex flex-col items-center px-3" style={{ minWidth: "80px" }}>
          {/* Finále / O bronz — alebo prázdny placeholder pre rovnakú výšku */}
          <div style={{ height: "16px" }} className="flex items-center justify-center">
            {(m.league?.includes("finále") || m.league?.includes("miesto") || m.league?.includes("Final")) && (
              <div className="flex items-center gap-1">
                <svg className="h-3 w-3" fill={m.league?.includes("finále") || m.league?.includes("Final") ? "#d4a017" : "#b87333"} viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                <span className="font-bold uppercase" style={{ fontSize: "7px", letterSpacing: "0.06em", color: m.league?.includes("finále") || m.league?.includes("Final") ? "#d4a017" : "#b87333" }}>
                  {m.league?.includes("finále") || m.league?.includes("Final") ? "FINÁLE" : "O BRONZ"}
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            {finished ? (
              <>
                <span style={{ fontSize: "20px", fontWeight: 700, lineHeight: 1, color: "#051937" }}>{m.home_score ?? 0}</span>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#64748b" }}>:</span>
                <span style={{ fontSize: "20px", fontWeight: 700, lineHeight: 1, color: "#051937" }}>{m.away_score ?? 0}</span>
              </>
            ) : (
              <span style={{ fontSize: "13px", fontWeight: 700, color: "#012d74" }}>{time}</span>
            )}
          </div>
          {m.venue && (
            <span className="font-bold uppercase text-[#64748b] mt-1.5" style={{ fontSize: "7px", letterSpacing: "0.08em" }}>
              {m.venue}
            </span>
          )}
        </div>

        {/* Hostia */}
        <div className={cn("flex items-center gap-2.5 flex-1 min-w-0 justify-end", "")}>
          <span className="font-bold text-[#051937] truncate text-right" style={{ fontSize: "12px" }}>
            {m.away_short || m.away_team}
          </span>
          <TeamLogoFromDb logo={m.away_logo} name={m.away_team} size={32} />
        </div>
      </div>
    </motion.div>
  );
}

export function MatchCenter({ matches, className }: MatchCenterProps) {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("past");
  const [activeSection, setActiveSection] = useState<"liga" | "reprezentacia">("liga");
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 12;

  // Split by liga vs reprezentácia
  // Reprezentácia = SVK matches that are NOT Czech league
  const isRep = (m: DbMatch) => (m.home_short === "SVK" || m.away_short === "SVK") && !m.league?.includes("ČESKÁ");
  const ligaMatches = matches.filter(m => !isRep(m));
  const repMatches = matches.filter(m => isRep(m));

  const currentMatches = activeSection === "liga" ? ligaMatches : repMatches;
  const now = new Date().getTime();

  const allPast = currentMatches
    .filter(m => new Date(m.date).getTime() < now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const allUpcoming = currentMatches
    .filter(m => new Date(m.date).getTime() >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const allList = activeTab === "past" ? allPast : allUpcoming;
  const totalPages = Math.ceil(allList.length / PAGE_SIZE);
  const list = allList.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <div className={cn("", className)}>
      {/* Controls — dva riadky */}
      <div className="flex flex-col gap-3 mb-6">
        {/* Riadok 1: Liga / Reprezentácia + Nasledujúce/Minulé */}
        <div className="flex items-center justify-between gap-4">
          {/* Liga / Reprezentácia */}
          <div className="flex items-center overflow-hidden" style={{ border: "1px solid rgba(1,45,116,0.12)", borderRadius: "8px" }}>
            {([
              { key: "liga" as const, label: "Liga", logo: "/images/logo-liga.png" },
              { key: "reprezentacia" as const, label: "Reprezentácia", logo: "/images/logo-reprezentacia.png" },
            ]).map((tab, i) => (
              <button
                key={tab.key}
                onClick={() => { setActiveSection(tab.key); setPage(0); }}
                className={cn(
                  "flex items-center gap-2.5 px-5 py-2.5 font-bold uppercase transition-all",
                  i > 0 && "border-l border-[rgba(1,45,116,0.12)]",
                  activeSection === tab.key ? "text-white" : "text-[#64748b] hover:text-[#051937]"
                )}
                style={{
                  fontSize: "10px", letterSpacing: "0.1em",
                  background: activeSection === tab.key ? "#012d74" : "transparent",
                }}
              >
                <div className="relative shrink-0" style={{ width: 22, height: 22 }}>
                  <Image src={tab.logo} alt="" fill className="object-contain" sizes="22px" style={activeSection === tab.key ? { filter: "brightness(0) invert(1)" } : undefined} />
                </div>
                <div style={{ width: "1px", height: "16px", background: activeSection === tab.key ? "rgba(255,255,255,0.3)" : "rgba(1,45,116,0.12)" }} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Nasledujúce / Minulé + šípky */}
          <div className="flex items-center gap-3">
          {/* Šípky */}
          {totalPages > 1 && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(p => Math.max(0, p - 1))}
                disabled={page === 0}
                className="flex items-center justify-center rounded-full transition-colors disabled:opacity-30"
                style={{ width: 32, height: 32, border: "1px solid rgba(1,45,116,0.12)" }}
              >
                <svg className="h-3.5 w-3.5 text-[#051937]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="font-bold text-[#64748b] px-1" style={{ fontSize: "10px" }}>{page + 1}/{totalPages}</span>
              <button
                onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                className="flex items-center justify-center rounded-full transition-colors disabled:opacity-30"
                style={{ width: 32, height: 32, border: "1px solid rgba(1,45,116,0.12)" }}
              >
                <svg className="h-3.5 w-3.5 text-[#051937]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
          <div className="flex items-center shrink-0 overflow-hidden" style={{ border: "1px solid rgba(1,45,116,0.12)", borderRadius: "10px" }}>
            {([{ key: "upcoming", label: "Nasledujúce" }, { key: "past", label: "Minulé" }] as const).map((tab, i) => (
              <button
                key={tab.key}
                onClick={() => { setActiveTab(tab.key); setPage(0); }}
                className={cn(
                  "px-5 py-2.5 font-bold uppercase transition-all",
                  i > 0 && "border-l border-[rgba(1,45,116,0.12)]",
                  activeTab === tab.key ? "bg-[#012d74] text-white" : "text-[#64748b] hover:text-[#051937]"
                )}
                style={{ fontSize: "10px", letterSpacing: "0.1em" }}
              >
                {tab.label}
              </button>
            ))}
          </div>
          </div>
        </div>

      </div>

      {/* Zápasy grid s paginovaním */}
      {list.length === 0 ? (
        <div className="py-12 text-center text-[#64748b] font-bold" style={{ fontSize: "13px" }}>
          {activeTab === "upcoming" ? "Žiadne nasledujúce zápasy" : "Žiadne minulé zápasy"}
        </div>
      ) : (
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab + activeSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 overflow-hidden"
          style={{ border: "1px solid rgba(1,45,116,0.08)", borderRadius: "8px" }}
        >
          {list.map((m, i) => (
            <div
              key={m.id + '-' + i}
              style={{
                borderRight: (i + 1) % 3 !== 0 ? "1px solid rgba(1,45,116,0.07)" : undefined,
              }}
            >
              <MatchRow m={m} index={i} />
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
      )}
    </div>
  );
}
