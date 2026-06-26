"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";
import type { Match, Competition, TeamCategory } from "@szph/db/types";

interface MatchCenterProps {
  competitions: Competition[];
  matches: Match[];
  className?: string;
}

const CATEGORY_TABS: { key: TeamCategory | "all"; label: string }[] = [
  { key: "all",  label: "Všetky" },
  { key: "muzi", label: "Muži" },
  { key: "zeny", label: "Ženy" },
  { key: "U18",  label: "U18" },
  { key: "U14",  label: "U14" },
  { key: "U12",  label: "U12" },
];

const COUNTRY_FLAGS: Record<string, string> = {
  "Slovensko":   "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Flag_of_Slovakia.svg/500px-Flag_of_Slovakia.svg.png",
  "Chorvátsko":  "https://upload.wikimedia.org/wikipedia/commons/1/1b/Flag_of_Croatia.svg",
  "Poľsko":      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Flag_of_Poland.svg/500px-Flag_of_Poland.svg.png",
  "Česko":       "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flag_of_the_Czech_Republic.svg/500px-Flag_of_the_Czech_Republic.svg.png",
  "Rakúsko":     "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_Austria.svg/500px-Flag_of_Austria.svg.png",
  "Maďarsko":    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Flag_of_Hungary.svg/500px-Flag_of_Hungary.svg.png",
  "Nemecko":     "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Flag_of_Germany.svg/500px-Flag_of_Germany.svg.png",
};

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

function TeamLogo({ name }: { name: string }) {
  const logo = TEAM_LOGOS[name];
  const flag = COUNTRY_FLAGS[name];

  if (logo) {
    return (
      <div className="relative shrink-0" style={{ width: 28, height: 28 }}>
        <Image src={logo} alt={name} fill className="object-contain" sizes="28px" />
      </div>
    );
  }
  if (flag) {
    return (
      <div className="relative shrink-0 overflow-hidden" style={{ width: 32, height: 22, borderRadius: 2 }}>
        <Image src={flag} alt={name} fill className="object-cover" sizes="32px" />
      </div>
    );
  }
  return (
    <div
      className="shrink-0 flex items-center justify-center"
      style={{ width: 28, height: 28, background: "rgba(255,255,255,0.07)", borderRadius: 4 }}
    >
      <span className="font-black text-white/50" style={{ fontSize: "7px" }}>
        {name.split(" ").map(w => w[0]).join("").slice(0, 3).toUpperCase()}
      </span>
    </div>
  );
}

function MatchRow({ m, index }: { m: MockMatch; index: number }) {
  const finished = m.status === "finished";
  const homeWin = finished && (m.homeScore ?? 0) > (m.awayScore ?? 0);
  const awayWin = finished && (m.awayScore ?? 0) > (m.homeScore ?? 0);
  const d = new Date(m.date);
  const time = d.toLocaleTimeString("sk-SK", { hour: "2-digit", minute: "2-digit" });

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay: index * 0.04 }}
      className="flex flex-col bg-white"
      style={{ borderBottom: "1px solid rgba(1,45,116,0.07)", borderLeft: "3px solid transparent" }}
    >
      {/* Súťaž + dátum */}
      <div className="px-4 pt-4 flex items-center justify-between">
        <span className="font-bold uppercase text-[#94a3b8]" style={{ fontSize: "8px", letterSpacing: "0.14em" }}>
          {m.competition}
        </span>
        <span className="font-bold uppercase text-[#94a3b8]" style={{ fontSize: "8px", letterSpacing: "0.1em" }}>
          {d.toLocaleDateString("sk-SK", { day: "numeric", month: "short" })}
        </span>
      </div>

      {/* Tímy + skóre */}
      <div className="px-4 py-3 flex items-center gap-3">
        {/* Domáci */}
        <div className={cn("flex items-center gap-2 flex-1 min-w-0", awayWin && "opacity-35")}>
          <TeamLogo name={m.homeTeam} />
          <span className="font-bold text-[#051937] truncate" style={{ fontSize: "11px", letterSpacing: "0.02em" }}>
            {m.homeTeam}
          </span>
        </div>

        {/* Skóre / čas */}
        <div className="shrink-0 flex items-center gap-2 px-2">
          {finished ? (
            <>
              <span className={cn("font-garet font-black leading-none", homeWin ? "text-[#051937]" : "text-[#94a3b8]")} style={{ fontSize: "22px" }}>
                {m.homeScore}
              </span>
              <span className="text-[#94a3b8] font-bold" style={{ fontSize: "13px" }}>:</span>
              <span className={cn("font-garet font-black leading-none", awayWin ? "text-[#051937]" : "text-[#94a3b8]")} style={{ fontSize: "22px" }}>
                {m.awayScore}
              </span>
            </>
          ) : (
            <span className="font-black" style={{ fontSize: "13px", color: "#C8102E" }}>{time}</span>
          )}
        </div>

        {/* Hosť */}
        <div className={cn("flex items-center gap-2 flex-1 min-w-0 justify-end", homeWin && "opacity-35")}>
          <span className="font-bold text-[#051937] truncate text-right" style={{ fontSize: "11px", letterSpacing: "0.02em" }}>
            {m.awayTeam}
          </span>
          <TeamLogo name={m.awayTeam} />
        </div>
      </div>

      {/* Miesto */}
      <div className="px-4 pb-4">
        <span className="font-bold uppercase text-[#94a3b8]" style={{ fontSize: "8px", letterSpacing: "0.1em" }}>
          {m.venue}
        </span>
      </div>
    </motion.div>
  );
}

export function MatchCenter({ competitions, matches, className }: MatchCenterProps) {
  const [activeCategory, setActiveCategory] = useState<TeamCategory | "all">("all");
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [activeSection, setActiveSection] = useState<"liga" | "reprezentacia">("liga");

  const hasRealMatches = matches.length > 0;

  const toMock = (m: Match, finished: boolean): MockMatch => ({
    id: m.id,
    homeTeam: m.home_team?.name ?? "Domáci",
    awayTeam: m.away_team?.name ?? "Hosťujúci",
    date: m.match_date,
    competition: m.competition?.name ?? "Súťaž",
    venue: m.venue ?? "",
    status: finished ? "finished" : (m.status as "scheduled" | "live"),
    homeScore: m.home_score ?? undefined,
    awayScore: m.away_score ?? undefined,
  });

  const displayUpcoming: MockMatch[] = hasRealMatches
    ? matches.filter(m => m.status === "scheduled" || m.status === "live")
        .sort((a, b) => new Date(a.match_date).getTime() - new Date(b.match_date).getTime())
        .slice(0, 9).map(m => toMock(m, false))
    : MOCK_UPCOMING;

  const displayPast: MockMatch[] = hasRealMatches
    ? matches.filter(m => m.status === "finished")
        .sort((a, b) => new Date(b.match_date).getTime() - new Date(a.match_date).getTime())
        .slice(0, 9).map(m => toMock(m, true))
    : MOCK_PAST;

  const repUpcoming = MOCK_REP_UPCOMING;
  const repPast = MOCK_REP_PAST;

  const list = activeSection === "liga"
    ? (activeTab === "upcoming" ? displayUpcoming : displayPast)
    : (activeTab === "upcoming" ? repUpcoming : repPast);

  return (
    <div className={cn("", className)}>
      {/* Controls — dva riadky */}
      <div className="flex flex-col gap-3 mb-6">
        {/* Riadok 1: Liga / Reprezentácia + Nasledujúce/Minulé */}
        <div className="flex items-center justify-between gap-4">
          {/* Liga / Reprezentácia */}
          <div className="flex items-center overflow-hidden" style={{ border: "1px solid rgba(1,45,116,0.12)", borderRadius: "10px" }}>
            {([{ key: "liga", label: "Liga" }, { key: "reprezentacia", label: "Reprezentácia" }] as const).map((tab, i) => (
              <button
                key={tab.key}
                onClick={() => setActiveSection(tab.key)}
                className={cn(
                  "px-5 py-2.5 font-bold uppercase transition-all",
                  i > 0 && "border-l border-[rgba(1,45,116,0.12)]",
                  activeSection === tab.key ? "text-white" : "text-[#94a3b8] hover:text-[#051937]"
                )}
                style={{
                  fontSize: "10px", letterSpacing: "0.1em",
                  background: activeSection === tab.key ? "#C8102E" : "transparent",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Nasledujúce / Minulé */}
          <div className="flex items-center shrink-0 overflow-hidden" style={{ border: "1px solid rgba(1,45,116,0.12)", borderRadius: "10px" }}>
            {([{ key: "upcoming", label: "Nasledujúce" }, { key: "past", label: "Minulé" }] as const).map((tab, i) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "px-5 py-2.5 font-bold uppercase transition-all",
                  i > 0 && "border-l border-[rgba(1,45,116,0.12)]",
                  activeTab === tab.key ? "bg-[#051937] text-white" : "text-[#94a3b8] hover:text-[#051937]"
                )}
                style={{ fontSize: "10px", letterSpacing: "0.1em" }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Riadok 2: Kategórie — len pre Ligu */}
        {activeSection === "liga" && (
          <div className="flex items-center overflow-x-auto gap-0 overflow-hidden" style={{ border: "1px solid rgba(1,45,116,0.12)", borderRadius: "10px" }}>
            {CATEGORY_TABS.map((tab, i) => (
              <button
                key={tab.key}
                onClick={() => setActiveCategory(tab.key)}
                className={cn(
                  "shrink-0 px-4 py-2 font-bold uppercase transition-all",
                  i > 0 && "border-l border-[rgba(1,45,116,0.08)]",
                  activeCategory === tab.key ? "bg-[#051937] text-white" : "text-[#94a3b8] hover:text-[#051937]"
                )}
                style={{ fontSize: "10px", letterSpacing: "0.1em" }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Zápasy grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 overflow-hidden"
          style={{ border: "1px solid rgba(1,45,116,0.08)", borderRadius: "16px" }}
        >
          {list.map((m, i) => (
            <div
              key={m.id}
              style={{
                borderRight: (i + 1) % 3 !== 0 ? "1px solid rgba(1,45,116,0.07)" : undefined,
              }}
            >
              <MatchRow m={m} index={i} />
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
