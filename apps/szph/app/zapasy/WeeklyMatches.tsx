"use client";

import { useState } from "react";
import Link from "next/link";

interface Match {
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
}

function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function getWeekLabel(weekStart: Date, now: Date): string {
  const thisWeek = getWeekStart(now);
  const nextWeek = new Date(thisWeek);
  nextWeek.setDate(nextWeek.getDate() + 7);
  const lastWeek = new Date(thisWeek);
  lastWeek.setDate(lastWeek.getDate() - 7);

  if (weekStart.getTime() === thisWeek.getTime()) return "Tento týždeň";
  if (weekStart.getTime() === nextWeek.getTime()) return "Budúci týždeň";
  if (weekStart.getTime() === lastWeek.getTime()) return "Minulý týždeň";

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);
  const opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short" };
  return `${weekStart.toLocaleDateString("sk-SK", opts)} – ${weekEnd.toLocaleDateString("sk-SK", opts)}`;
}

function TeamLogo({ logo, name }: { logo?: string; name: string }) {
  if (logo?.startsWith("flag:")) {
    const code = logo.replace("flag:", "");
    return (
      <div className="shrink-0 overflow-hidden rounded-full" style={{ width: 30, height: 30 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`https://flagcdn.com/w80/${code}.png`} alt={name} width={30} height={30} style={{ width: 30, height: 30, objectFit: "cover" }} />
      </div>
    );
  }
  if (logo?.startsWith("/") || logo?.startsWith("https://")) {
    return (
      <div className="shrink-0" style={{ width: 30, height: 30 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} alt={name} width={30} height={30} style={{ width: 30, height: 30, objectFit: "contain" }} />
      </div>
    );
  }
  return (
    <div className="shrink-0 flex items-center justify-center rounded-full" style={{ width: 30, height: 30, background: "#e2e8f0" }}>
      <span className="font-black text-[#64748b]" style={{ fontSize: "9px" }}>{name.split(" ").map(w => w[0]).join("").slice(0, 3)}</span>
    </div>
  );
}

function MatchCard({ m }: { m: Match }) {
  const d = new Date(m.date);
  const time = m.match_time || d.toLocaleTimeString("sk-SK", { hour: "2-digit", minute: "2-digit" });
  const dayStr = d.toLocaleDateString("sk-SK", { weekday: "short", day: "numeric", month: "short" });
  const finished = m.status === "finished";
  const homeWin = finished && (m.home_score ?? 0) > (m.away_score ?? 0);
  const awayWin = finished && (m.away_score ?? 0) > (m.home_score ?? 0);

  return (
    <Link href={`/zapasy/${m.id}`} className="block bg-white px-4 py-3 transition-colors active:bg-gray-50" style={{ borderRadius: "12px", border: "1px solid rgba(1,45,116,0.06)" }}>
      {/* Top: date, time, league, venue */}
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold text-[#051937]" style={{ fontSize: "11px" }}>{dayStr} · {time}</span>
        {m.league && <span className="font-bold uppercase text-[#012d74] truncate ml-2 text-right" style={{ fontSize: "8px", letterSpacing: "0.06em", maxWidth: "50%" }}>{m.league}</span>}
      </div>
      {/* Teams */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <TeamLogo logo={m.home_logo} name={m.home_team} />
          <span className={`font-bold truncate ${homeWin ? "text-[#16a34a]" : "text-[#051937]"}`} style={{ fontSize: "14px" }}>{m.home_short || m.home_team}</span>
        </div>
        <div className="shrink-0 flex items-center justify-center" style={{ minWidth: 48 }}>
          {finished ? (
            <span className="font-black text-[#051937]" style={{ fontSize: "18px" }}>
              <span style={{ color: homeWin ? "#16a34a" : "#051937" }}>{m.home_score}</span>
              <span className="text-[#012d74] mx-0.5" style={{ fontSize: "12px" }}>:</span>
              <span style={{ color: awayWin ? "#16a34a" : "#051937" }}>{m.away_score}</span>
            </span>
          ) : (
            <span className="font-bold text-[#012d74]" style={{ fontSize: "11px" }}>vs</span>
          )}
        </div>
        <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
          <span className={`font-bold truncate text-right ${awayWin ? "text-[#16a34a]" : "text-[#051937]"}`} style={{ fontSize: "14px" }}>{m.away_short || m.away_team}</span>
          <TeamLogo logo={m.away_logo} name={m.away_team} />
        </div>
      </div>
      {m.venue && <p className="text-[#94a3b8] font-semibold mt-1.5 text-center" style={{ fontSize: "9px" }}>{m.venue}</p>}
    </Link>
  );
}

export function WeeklyMatches({ matches }: { matches: Match[] }) {
  const [mode, setMode] = useState<"program" | "vysledky">("program");
  const [filter, setFilter] = useState("all");
  const now = new Date();

  const getCategory = (m: Match) => {
    const l = (m.league || "").toLowerCase();
    if (l.includes("ženy") || l.includes("women") || l.includes("girls")) return "zeny";
    if (l.includes("u18") || l.includes("u16") || l.includes("u14") || l.includes("u12")) return "mladez";
    return "muzi";
  };

  let filtered = matches;
  if (filter !== "all") filtered = filtered.filter(m => getCategory(m) === filter);

  const upcoming = filtered.filter(m => new Date(m.date).getTime() >= now.getTime()).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const past = filtered.filter(m => new Date(m.date).getTime() < now.getTime()).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const list = mode === "program" ? upcoming : past;

  // Group by week
  const weeks: { label: string; matches: Match[] }[] = [];
  const weekMap = new Map<number, Match[]>();

  for (const m of list) {
    const ws = getWeekStart(new Date(m.date)).getTime();
    if (!weekMap.has(ws)) weekMap.set(ws, []);
    weekMap.get(ws)!.push(m);
  }

  for (const [wsTime, wMatches] of weekMap) {
    weeks.push({ label: getWeekLabel(new Date(wsTime), now), matches: wMatches });
  }

  return (
    <div className="sm:hidden">
      {/* Controls */}
      <div className="flex items-center gap-2 mb-5">
        <div className="flex items-center overflow-hidden flex-1" style={{ border: "1px solid rgba(1,45,116,0.12)", borderRadius: "20px" }}>
          {(["program", "vysledky"] as const).map((tab, i) => (
            <button key={tab} onClick={() => setMode(tab)}
              className={`flex-1 py-2 font-bold uppercase transition-all ${i > 0 ? "border-l border-[rgba(1,45,116,0.12)]" : ""}`}
              style={{ fontSize: "10px", letterSpacing: "0.08em", background: mode === tab ? "#012d74" : "transparent", color: mode === tab ? "#fff" : "#64748b" }}>
              {tab === "program" ? "Program" : "Výsledky"}
            </button>
          ))}
        </div>
        <select value={filter} onChange={e => setFilter(e.target.value)}
          className="font-bold uppercase text-[#051937] bg-white px-3 py-2 cursor-pointer outline-none shrink-0"
          style={{ fontSize: "9px", letterSpacing: "0.08em", border: "1px solid rgba(1,45,116,0.12)", borderRadius: "20px", appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2.5'%3E%3Cpath d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 8px center", paddingRight: "24px" }}>
          <option value="all">Všetci</option>
          <option value="muzi">Muži</option>
          <option value="zeny">Ženy</option>
          <option value="mladez">Mládež</option>
        </select>
      </div>

      {/* Weeks */}
      {weeks.length === 0 ? (
        <div className="py-12 text-center text-[#64748b] font-bold" style={{ fontSize: "13px" }}>
          {mode === "program" ? "Žiadne plánované zápasy" : "Žiadne výsledky"}
        </div>
      ) : (
        <div className="space-y-6">
          {weeks.map((week, wi) => (
            <div key={wi}>
              <h3 className="font-garet font-bold italic text-[#051937] mb-3" style={{ fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                {week.label}
              </h3>
              <div className="space-y-2">
                {week.matches.map(m => <MatchCard key={m.id} m={m} />)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
