"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";

interface MatchGoal {
  minute?: number | string;
  player: string;
  team: "home" | "away";
}

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
  goals?: MatchGoal[] | null;
  site?: string;
}

interface MatchCenterProps {
  competitions?: any[];
  matches: DbMatch[];
  className?: string;
  pageSize?: number;
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
  "KPH Rača":              "/images/timy/Raca-logo-70x58-1-32x27.webp",
  "HKM Nová Dubnica":      "/images/timy/nova-dubnica-32x32.webp",
  "HOKO Zlaté Moravce":    "/images/timy/logo-KPH-HOKO-1-Photoroom-32x18.webp",
  "TJ Slavia Holíč":       "/images/timy/SK-slavia-logo-300x300-1-32x32.webp",
  "TJ Slavia Šamorín":     "/images/timy/SK-slavia-logo-300x300-1-32x32.webp",
  "HA Senkvice":           "/images/timy/Logo-SK-Senkvice-59x70-1-27x32.webp",
  "HK Senkvice":           "/images/timy/Logo-SK-Senkvice-59x70-1-27x32.webp",
  "SK Senec":              "/images/timy/Zumi-32x32.webp",
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
  const d = new Date(m.date);
  const time = m.match_time || d.toLocaleTimeString("sk-SK", { hour: "2-digit", minute: "2-digit" });
  const dateStr = `${d.getDate()}. ${d.getMonth() + 1}.${String(d.getFullYear()).slice(2)}`;
  const isFinal = m.league?.includes("finále") || m.league?.includes("Final");
  const isBronze = m.league?.includes("miesto");
  const isIndoor = (m.league || "").toLowerCase().includes("indoor") || (m.league || "").toLowerCase().includes("halov");
  const homeWin = finished && (m.home_score ?? 0) > (m.away_score ?? 0);
  const awayWin = finished && (m.away_score ?? 0) > (m.home_score ?? 0);

  return (
    <a href={`/zapasy/${m.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: index * 0.03 }}
        className="bg-white px-3 sm:px-5 py-3 hover:bg-[#f8fafd] transition-colors cursor-pointer"
      >
        {/* Mobile layout — stacked */}
        <div className="sm:hidden">
          {/* Date + venue + league row */}
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="font-bold text-[#051937] block" style={{ fontSize: "12px" }}>{dateStr} · {time}</span>
              {m.venue && <span className="font-semibold text-[#94a3b8] block" style={{ fontSize: "10px" }}>{m.venue}</span>}
            </div>
            {m.league && (
              <span className="font-bold uppercase text-[#012d74] text-right" style={{ fontSize: "8px", letterSpacing: "0.08em" }}>
                {(m.league || "").replace(/\s*\(.*miesto\)/, "").replace(/\s*\(finále\)/, "")}
              </span>
            )}
          </div>
          {/* Teams row */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <TeamLogoFromDb logo={m.home_logo} name={m.home_team} size={34} />
              <span className={cn("font-bold truncate", homeWin ? "text-[#16a34a]" : "text-[#051937]")} style={{ fontSize: "15px" }}>
                {m.home_short || m.home_team}
              </span>
            </div>
            <div className="shrink-0 flex items-center justify-center" style={{ minWidth: 56 }}>
              {finished ? (
                <div className="flex items-center gap-1.5">
                  <span style={{ fontSize: "20px", fontWeight: 800, color: homeWin ? "#16a34a" : "#051937" }}>{m.home_score ?? 0}</span>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "#012d74" }}>:</span>
                  <span style={{ fontSize: "20px", fontWeight: 800, color: awayWin ? "#16a34a" : "#051937" }}>{m.away_score ?? 0}</span>
                </div>
              ) : (
                <span className="font-bold text-[#012d74]" style={{ fontSize: "12px" }}>vs</span>
              )}
            </div>
            <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
              <span className={cn("font-bold truncate text-right", awayWin ? "text-[#16a34a]" : "text-[#051937]")} style={{ fontSize: "15px" }}>
                {m.away_short || m.away_team}
              </span>
              <TeamLogoFromDb logo={m.away_logo} name={m.away_team} size={34} />
            </div>
          </div>
        </div>

        {/* Desktop layout — single row */}
        <div className="hidden sm:flex items-center gap-4">
          <div className="shrink-0 w-[110px]">
            <span className="font-bold text-[#051937] whitespace-nowrap block" style={{ fontSize: "11px" }}>{dateStr} · {time}</span>
            {m.venue && <span className="font-bold text-[#94a3b8] block truncate" style={{ fontSize: "9px" }}>{m.venue}</span>}
          </div>
          <div className="shrink-0" style={{ width: "160px" }}>
            <div className="flex items-center gap-1.5">
              <span className="font-bold uppercase text-[#012d74] truncate" style={{ fontSize: "9px", letterSpacing: "0.08em" }}>
                {(m.league || "Zápas").replace(/\s*\(.*miesto\)/, "").replace(/\s*\(finále\)/, "")}
              </span>
              {m.video_url && (
                <a href={m.video_url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="shrink-0 hover:scale-110 transition-transform" title="Sledovať záznam">
                  <svg className="h-3.5 w-3.5 text-[#d80027]" fill="currentColor" viewBox="0 0 24 24"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                </a>
              )}
            </div>
            {(isFinal || isBronze) && (
              <div className="flex items-center gap-0.5 mt-0.5">
                <svg className="h-2.5 w-2.5" fill={isFinal ? "#d4a017" : "#b87333"} viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                <span className="font-bold uppercase" style={{ fontSize: "7px", color: isFinal ? "#d4a017" : "#b87333" }}>{isFinal ? "FINÁLE" : "O BRONZ"}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2.5 flex-1 min-w-0 justify-end">
            <span className={cn("font-bold truncate text-right", homeWin ? "text-[#16a34a]" : "text-[#051937]")} style={{ fontSize: "13px" }}>{m.home_short || m.home_team}</span>
            <TeamLogoFromDb logo={m.home_logo} name={m.home_team} size={28} />
          </div>
          <div className="shrink-0 flex items-center justify-center" style={{ minWidth: "60px" }}>
            {finished ? (
              <div className="flex items-center gap-2">
                <span style={{ fontSize: "18px", fontWeight: 800, color: homeWin ? "#16a34a" : "#051937" }}>{m.home_score ?? 0}</span>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#012d74" }}>:</span>
                <span style={{ fontSize: "18px", fontWeight: 800, color: awayWin ? "#16a34a" : "#051937" }}>{m.away_score ?? 0}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div style={{ width: "16px", height: "2px", background: "#012d74", opacity: 0.5 }} />
                <span className="font-bold text-[#012d74]" style={{ fontSize: "11px" }}>vs</span>
                <div style={{ width: "16px", height: "2px", background: "#012d74", opacity: 0.5 }} />
              </div>
            )}
          </div>
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <TeamLogoFromDb logo={m.away_logo} name={m.away_team} size={28} />
            <span className={cn("font-bold truncate", awayWin ? "text-[#16a34a]" : "text-[#051937]")} style={{ fontSize: "13px" }}>{m.away_short || m.away_team}</span>
          </div>
          <div className="shrink-0 hidden lg:flex items-center gap-2 justify-end" style={{ width: "140px" }}>
            {m.venue && <span className="font-bold text-[#012d74]/40 truncate" style={{ fontSize: "10px" }}>{m.venue}</span>}
            <svg className="h-3.5 w-3.5 text-[#94a3b8] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </div>
        </div>
      </motion.div>
    </a>
  );
}

export function MatchCenter({ matches, className, pageSize = 100 }: MatchCenterProps) {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [activeSections, setActiveSections] = useState<Set<string>>(new Set(["liga", "reprezentacia"]));
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [teamFilter, setTeamFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all"); // all | pozemny | halovy
  const [filterOpen, setFilterOpen] = useState(false);
  const [page, setPage] = useState(0);
  const PAGE_SIZE = pageSize;

  function toggleSection(key: string) {
    setActiveSections(prev => {
      const next = new Set(prev);
      if (next.has(key)) { next.delete(key); } else { next.add(key); }
      if (next.size === 0) { next.add("liga"); next.add("reprezentacia"); }
      return next;
    });
    setPage(0);
  }

  // Split by liga vs reprezentácia
  const isRep = (m: DbMatch) => (m.home_short === "SVK" || m.away_short === "SVK") && !m.league?.includes("ČESKÁ");

  // Category detection from league name
  const getCategory = (m: DbMatch) => {
    const l = (m.league || "").toLowerCase();
    if (l.includes("ženy") || l.includes("women") || l.includes("girls")) return "zeny";
    if (l.includes("u18") || l.includes("u16") || l.includes("u14") || l.includes("u12")) return "mladez";
    if (l.includes("muž") || l.includes("men") || l.includes("boys")) return "muzi";
    return "muzi";
  };

  const bothActive = activeSections.has("liga") && activeSections.has("reprezentacia");
  let currentMatches = bothActive ? matches
    : activeSections.has("liga") ? matches.filter(m => !isRep(m))
    : activeSections.has("reprezentacia") ? matches.filter(m => isRep(m))
    : matches;

  if (categoryFilter !== "all") {
    currentMatches = currentMatches.filter(m => getCategory(m) === categoryFilter);
  }
  if (teamFilter !== "all") {
    currentMatches = currentMatches.filter(m =>
      m.home_team.includes(teamFilter) || m.away_team.includes(teamFilter) ||
      (m.home_short || "").includes(teamFilter) || (m.away_short || "").includes(teamFilter)
    );
  }
  if (typeFilter !== "all") {
    currentMatches = currentMatches.filter(m => {
      const l = (m.league || "").toLowerCase();
      const indoor = l.includes("indoor") || l.includes("halov");
      return typeFilter === "halovy" ? indoor : !indoor;
    });
  }

  // Collect unique teams for filter
  const teamNames = new Map<string, string>();
  matches.forEach(m => {
    const hKey = m.home_short || m.home_team;
    const aKey = m.away_short || m.away_team;
    if (hKey && !teamNames.has(hKey)) teamNames.set(hKey, m.home_team);
    if (aKey && !teamNames.has(aKey)) teamNames.set(aKey, m.away_team);
  });
  const sortedTeams = Array.from(teamNames.entries()).sort((a, b) => a[1].localeCompare(b[1], "sk"));

  const hasActiveFilters = categoryFilter !== "all" || teamFilter !== "all" || typeFilter !== "all";

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
      {/* Controls */}
      <div className="flex flex-col gap-3 mb-6">
        {/* Row 1: Liga / Rep toggle buttons */}
        <div className="flex items-center gap-2">
          {([
            { key: "liga", label: "Liga", logo: "/images/logo-liga.webp" },
            { key: "reprezentacia", label: "Reprezentácia", logo: "/images/logo-reprezentacia.webp", logoInactive: "/images/logo-reprezentacia-color.webp" },
          ]).map((tab) => {
            const active = activeSections.has(tab.key);
            return (
              <button
                key={tab.key}
                onClick={() => toggleSection(tab.key)}
                className={cn(
                  "flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 font-bold uppercase transition-all",
                  active ? "text-white" : "text-[#64748b] hover:text-[#051937]"
                )}
                style={{
                  fontSize: "10px", letterSpacing: "0.08em",
                  background: active ? "#012d74" : "transparent",
                  border: active ? "1px solid #012d74" : "1px solid rgba(1,45,116,0.12)",
                  borderRadius: "20px",
                }}
              >
                <div className="relative shrink-0" style={{ width: 18, height: 18 }}>
                  <Image src={active ? tab.logo : (tab.logoInactive || tab.logo)} alt="" fill className="object-contain" sizes="18px" style={active ? { filter: "brightness(0) invert(1)" } : undefined} />
                </div>
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Row 2: Program/Výsledky + Kategória + Šípky */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="flex items-center shrink-0 gap-0">
            {([{ key: "upcoming", label: "Program" }, { key: "past", label: "Výsledky" }] as const).map((tab) => (
              <button
                key={tab.key}
                onClick={() => { setActiveTab(tab.key); setPage(0); }}
                className={cn(
                  "px-3 sm:px-4 py-2 sm:py-2.5 font-bold uppercase transition-all",
                  activeTab === tab.key ? "text-[#012d74]" : "text-[#94a3b8] hover:text-[#051937]"
                )}
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.08em",
                  borderBottom: activeTab === tab.key ? "3px solid #012d74" : "3px solid transparent",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="relative shrink-0">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center justify-center gap-1.5 rounded-full transition-all"
              style={{
                width: 36, height: 36,
                border: hasActiveFilters ? "2px solid #012d74" : "1px solid rgba(1,45,116,0.12)",
                background: hasActiveFilters ? "rgba(1,45,116,0.06)" : "transparent",
              }}
            >
              <svg className="h-4 w-4" style={{ color: hasActiveFilters ? "#012d74" : "#64748b" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
              </svg>
            </button>
            {filterOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setFilterOpen(false)} />
                <div className="absolute right-0 top-full mt-2 z-20 p-4 rounded-xl" style={{ background: "#fff", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", border: "1px solid rgba(1,45,116,0.08)", width: "260px" }}>
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-bold text-[#051937]" style={{ fontSize: "12px" }}>Filtre</p>
                    {hasActiveFilters && (
                      <button
                        onClick={() => { setCategoryFilter("all"); setTeamFilter("all"); setTypeFilter("all"); setPage(0); }}
                        className="text-[#d00027] font-bold" style={{ fontSize: "10px" }}
                      >
                        Zrušiť filtre
                      </button>
                    )}
                  </div>

                  {/* Kategória */}
                  <div className="mb-3">
                    <p className="font-semibold text-[#94a3b8] mb-1.5" style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.1em" }}>Kategória</p>
                    <div className="flex flex-wrap gap-1.5">
                      {[{ v: "all", l: "Všetci" }, { v: "muzi", l: "Muži" }, { v: "zeny", l: "Ženy" }, { v: "mladez", l: "Mládež" }].map(o => (
                        <button
                          key={o.v}
                          onClick={() => { setCategoryFilter(o.v); setPage(0); }}
                          className="rounded-full px-2.5 py-1 font-bold transition-all"
                          style={{
                            fontSize: "9px",
                            background: categoryFilter === o.v ? "#012d74" : "#f3f4f6",
                            color: categoryFilter === o.v ? "#fff" : "#051937",
                          }}
                        >
                          {o.l}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Typ */}
                  <div className="mb-3">
                    <p className="font-semibold text-[#94a3b8] mb-1.5" style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.1em" }}>Typ</p>
                    <div className="flex flex-wrap gap-1.5">
                      {[{ v: "all", l: "Všetky" }, { v: "pozemny", l: "Pozemný" }, { v: "halovy", l: "Halový" }].map(o => (
                        <button
                          key={o.v}
                          onClick={() => { setTypeFilter(o.v); setPage(0); }}
                          className="rounded-full px-2.5 py-1 font-bold transition-all"
                          style={{
                            fontSize: "9px",
                            background: typeFilter === o.v ? "#012d74" : "#f3f4f6",
                            color: typeFilter === o.v ? "#fff" : "#051937",
                          }}
                        >
                          {o.l}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tím */}
                  <div>
                    <p className="font-semibold text-[#94a3b8] mb-1.5" style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.1em" }}>Tím</p>
                    <select
                      value={teamFilter}
                      onChange={(e) => { setTeamFilter(e.target.value); setPage(0); }}
                      className="w-full rounded-lg px-3 py-2 font-semibold text-[#051937] outline-none"
                      style={{ fontSize: "11px", border: "1px solid rgba(1,45,116,0.1)", background: "#f8f9fa", appearance: "auto" }}
                    >
                      <option value="all">Všetky tímy</option>
                      {sortedTeams.map(([key, name]) => (
                        <option key={key} value={key}>{name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            )}
          </div>
          {totalPages > 1 && (
            <div className="flex items-center gap-1 ml-auto">
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
        </div>
      </div>

      {/* Zápasy grid s paginovaním */}
      {list.length === 0 ? (
        <div className="py-12 text-center text-[#64748b] font-bold" style={{ fontSize: "13px" }}>
          {activeTab === "upcoming" ? "Žiadne plánované zápasy" : "Žiadne výsledky"}
        </div>
      ) : (
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab + Array.from(activeSections).join(",")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="flex flex-col overflow-x-auto"
          style={{ border: "1px solid rgba(1,45,116,0.08)", borderRadius: "20px", WebkitOverflowScrolling: "touch" } as any}
        >
          {list.map((m, i) => (
            <div
              key={m.id + '-' + i}
              style={{
                borderBottom: i < list.length - 1 ? "1px solid rgba(1,45,116,0.07)" : undefined,
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
