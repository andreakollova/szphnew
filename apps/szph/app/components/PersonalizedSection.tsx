"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const CLUB_LOGOS: Record<string, string> = {
  HAS: "/images/timy/HAS.webp",
  SEN: "/images/timy/SEN.webp",
  RAC: "/images/timy/Raca-logo-70x58-1-32x27.webp",
  HOKO: "/images/timy/logo-KPH-HOKO-1-Photoroom-32x18.webp",
  HKM: "/images/timy/nova-dubnica-32x32.webp",
  KAP: "/images/timy/KAP.webp",
};

const CLUB_NAMES: Record<string, string> = {
  HAS: "HA Senkvice", SEN: "HC 1952 Senkvice", RAC: "KPH Rača",
  HOKO: "HOKO Zlaté Moravce", HKM: "HKM Nová Dubnica", KAP: "Kaptar SE",
};

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

function TeamLogo({ logo, name, size = 28 }: { logo?: string; name: string; size?: number }) {
  if (logo?.startsWith("flag:")) {
    return (
      <div className="shrink-0 overflow-hidden rounded-full" style={{ width: size, height: size }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`https://flagcdn.com/w80/${logo.replace("flag:", "")}.png`} alt={name} width={size} height={size} style={{ width: size, height: size, objectFit: "cover" }} />
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
  return (
    <div className="shrink-0 flex items-center justify-center rounded-full" style={{ width: size, height: size, background: "#e2e8f0" }}>
      <span className="font-black text-[#64748b]" style={{ fontSize: size * 0.3 }}>{name.split(" ").map(w => w[0]).join("").slice(0, 3)}</span>
    </div>
  );
}

function isThisWeekend(date: Date): boolean {
  const now = new Date();
  const day = now.getDay();
  const satStart = new Date(now);
  satStart.setDate(now.getDate() + (6 - day));
  satStart.setHours(0, 0, 0, 0);
  const sunEnd = new Date(satStart);
  sunEnd.setDate(satStart.getDate() + 1);
  sunEnd.setHours(23, 59, 59, 999);
  // If today is Sat or Sun, include today
  if (day === 6 || day === 0) {
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);
    return date >= todayStart && date <= sunEnd;
  }
  return date >= satStart && date <= sunEnd;
}

function matchesClub(m: Match, clubId: string): boolean {
  const clubName = CLUB_NAMES[clubId] || "";
  if (!clubName) return false;
  return m.home_team.includes(clubName) || m.away_team.includes(clubName) ||
    (m.home_short || "").includes(clubId) || (m.away_short || "").includes(clubId);
}

function matchesCategory(m: Match, prefs: any): boolean {
  const l = (m.league || "").toLowerCase();
  const isRep = (m.home_short === "SVK" || m.away_short === "SVK");
  const isMladez = l.includes("u18") || l.includes("u16") || l.includes("u14") || l.includes("u12");
  const isDospeli = !isMladez;

  if (prefs.notifVsetky) return true;
  if (prefs.notifReprezentacia && isRep) return true;
  if (prefs.notifMojKlub && prefs.club && prefs.club !== "none" && matchesClub(m, prefs.club)) return true;
  if (prefs.notifDospeli && isDospeli && !isRep) return true;
  if (prefs.notifMladez && isMladez) return true;
  return false;
}

export function PersonalizedSection({ matches }: { matches: Match[] }) {
  const [prefs, setPrefs] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const raw = localStorage.getItem("szph_user_prefs");
    if (raw) {
      try { setPrefs(JSON.parse(raw)); } catch {}
    }
  }, []);

  if (!mounted || !prefs || !prefs.name) return null;

  const clubLogo = prefs.club && prefs.club !== "none" ? CLUB_LOGOS[prefs.club] : null;
  const clubName = prefs.club && prefs.club !== "none" ? CLUB_NAMES[prefs.club] : null;

  const now = Date.now();
  const upcoming = matches
    .filter((m: any) => m.status === "scheduled" && new Date(m.date).getTime() > now)
    .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Weekend matches
  const weekendMatches = upcoming.filter(m => isThisWeekend(new Date(m.date)));

  // My matches (filtered by preferences)
  const myMatches = upcoming.filter(m => matchesCategory(m, prefs)).slice(0, 5);

  // If no personalized matches, show weekend
  const showMatches = myMatches.length > 0 ? myMatches : weekendMatches.slice(0, 5);
  const sectionTitle = myMatches.length > 0 ? "Tvoje najbližšie zápasy" : (weekendMatches.length > 0 ? "Program na tento víkend" : "Najbližšie zápasy");

  if (showMatches.length === 0 && upcoming.length > 0) {
    showMatches.push(...upcoming.slice(0, 3));
  }

  return (
    <div className="md:hidden px-4 mb-4">
      {/* Greeting */}
      <div className="flex items-center gap-3 mb-4 mt-2">
        {clubLogo ? (
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)", border: "1px solid rgba(1,45,116,0.06)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={clubLogo} alt="" className="w-6 h-6 object-contain" />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-[#051937] flex items-center justify-center">
            <span className="font-black text-white text-lg">{prefs.name.charAt(0).toUpperCase()}</span>
          </div>
        )}
        <div>
          <p className="font-bold text-[#051937]" style={{ fontSize: "16px" }}>Ahoj, {prefs.name}!</p>
          {clubName && <p className="text-[#94a3b8]" style={{ fontSize: "11px" }}>{clubName}</p>}
        </div>
        <Link href="/nastavenia" className="ml-auto text-[#94a3b8] hover:text-[#051937] transition-colors">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </Link>
      </div>

      {/* Matches */}
      {showMatches.length > 0 && (
        <div>
          <h3 className="font-garet font-bold italic text-[#051937] mb-3" style={{ fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.04em" }}>
            {sectionTitle}
          </h3>
          <div className="space-y-2">
            {showMatches.map(m => {
              const d = new Date(m.date);
              const time = m.match_time || d.toLocaleTimeString("sk-SK", { hour: "2-digit", minute: "2-digit" });
              const dayStr = d.toLocaleDateString("sk-SK", { weekday: "short", day: "numeric", month: "short" });

              return (
                <Link key={m.id} href={`/zapasy/${m.id}`} className="flex items-center bg-white px-3 py-2.5 active:bg-gray-50 transition-colors" style={{ borderRadius: "12px", border: "1px solid rgba(1,45,116,0.06)" }}>
                  <div className="shrink-0 mr-3">
                    <p className="font-bold text-[#051937]" style={{ fontSize: "11px" }}>{dayStr}</p>
                    <p className="text-[#94a3b8] font-semibold" style={{ fontSize: "10px" }}>{time}</p>
                  </div>
                  <div className="flex items-center gap-1.5 flex-1 min-w-0">
                    <TeamLogo logo={m.home_logo} name={m.home_team} size={24} />
                    <span className="font-bold text-[#051937] truncate" style={{ fontSize: "12px" }}>{m.home_short || m.home_team}</span>
                  </div>
                  <span className="text-[#012d74] font-bold mx-2" style={{ fontSize: "10px" }}>vs</span>
                  <div className="flex items-center gap-1.5 flex-1 min-w-0 justify-end">
                    <span className="font-bold text-[#051937] truncate text-right" style={{ fontSize: "12px" }}>{m.away_short || m.away_team}</span>
                    <TeamLogo logo={m.away_logo} name={m.away_team} size={24} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
