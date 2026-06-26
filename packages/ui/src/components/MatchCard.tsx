"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn, formatDate, formatTime } from "../lib/utils";
import type { Match } from "@szph/db/types";

interface MatchCardProps {
  match: Match;
  className?: string;
  delay?: number;
  compact?: boolean;
}

const STATUS_LABELS: Record<string, string> = {
  scheduled: "Plánovaný",
  live:      "NAŽIVO",
  finished:  "Odohraný",
  postponed: "PRELOŽENÉ",
};

const STATUS_CLASSES: Record<string, string> = {
  scheduled: "bg-[#e8f4fd] text-[#016fb4] border border-[#016fb4]/20",
  live:      "bg-red-50 text-red-600 border border-red-200 animate-pulse",
  finished:  "bg-[#f4f7fc] text-[#64748b] border border-[rgba(1,45,116,0.1)]",
  postponed: "bg-amber-50 text-amber-600 border border-amber-200",
};

// Fallback logo mapping by team name
const TEAM_LOGOS: Record<string, string> = {
  "KPH Raca":                     "/images/timy/Raca-logo-70x58-1-32x27.png",
  "HKM Nova Dubnica":              "/images/timy/nova-dubnica-32x32.png",
  "KPH HOKO Zlaté Moravce":        "/images/timy/logo-KPH-HOKO-1-Photoroom-32x18.png",
  "HOKO ZM":                       "/images/timy/logo-KPH-HOKO-1-Photoroom-32x18.png",
  "TJ Slavia Holic":               "/images/timy/SK-slavia-logo-300x300-1-32x32.png",
  "TJ Slavia Samorín":             "/images/timy/SK-slavia-logo-300x300-1-32x32.png",
  "HA Senkvice":                   "/images/timy/Logo-SK-Senkvice-59x70-1-27x32.png",
  "HK Senkvice":                   "/images/timy/Logo-SK-Senkvice-59x70-1-27x32.png",
  "Hokejovy klub 1952 Senkvice":   "/images/timy/Logo-SK-Senkvice-59x70-1-27x32.png",
  "Hokejova akademia Senkvice":    "/images/timy/Logo-SK-Senkvice-59x70-1-27x32.png",
  "SK Senec":                      "/images/timy/Zumi-32x32.png",
  "Kaptar SE":                     "/images/timy/3949307b-0db4-45ed-a37a-e87dc843fbd7-32x30.jpg",
};

export function MatchCard({ match, className, delay = 0, compact = false }: MatchCardProps) {
  const { home_team, away_team, competition, match_date, venue, status, home_score, away_score } = match;
  const hasScore = home_score !== null && away_score !== null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn("card p-4 md:p-5", className)}
    >
      {/* Header */}
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="label-wide text-[#016fb4] truncate max-w-[60%]">
          {competition?.name ?? "Súťaž"}
        </span>
        <span className={cn("label-wide rounded-full px-2 py-0.5 text-[10px] shrink-0", STATUS_CLASSES[status] ?? STATUS_CLASSES.scheduled)}>
          {STATUS_LABELS[status] ?? status}
        </span>
      </div>

      {/* Teams + score */}
      <div className="flex items-center gap-3">
        <div className="flex flex-1 flex-col items-start gap-1.5 min-w-0">
          <TeamLogo team={home_team} />
          <span className="truncate text-sm font-bold text-[#012d74]">{home_team?.name ?? "Domáci"}</span>
        </div>

        <div className="flex flex-col items-center gap-0.5 px-2 shrink-0">
          {hasScore ? (
            <div className="flex items-baseline gap-1">
              <span className="font-garet text-2xl font-black text-[#012d74]">{home_score}</span>
              <span className="text-[#012d74]/25 font-bold text-xl">:</span>
              <span className="font-garet text-2xl font-black text-[#012d74]">{away_score}</span>
            </div>
          ) : (
            <span className="font-garet text-xl font-bold text-[#016fb4]">{formatTime(match_date)}</span>
          )}
          {!compact && (
            <span className="label-wide text-[#64748b] text-[10px]">{formatDate(match_date)}</span>
          )}
        </div>

        <div className="flex flex-1 flex-col items-end gap-1.5 min-w-0">
          <TeamLogo team={away_team} right />
          <span className="truncate text-sm font-bold text-[#012d74] text-right">{away_team?.name ?? "Hosťujúci"}</span>
        </div>
      </div>

      {venue && !compact && (
        <div className="mt-3 flex items-center gap-1.5 border-t border-[rgba(1,45,116,0.06)] pt-2.5">
          <svg className="h-3 w-3 text-[#64748b] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-xs text-[#64748b]">{venue}</span>
        </div>
      )}
    </motion.div>
  );
}

function TeamLogo({ team, right = false }: { team: Match["home_team"]; right?: boolean }) {
  const logoSrc = team?.logo_url ?? (team?.name ? TEAM_LOGOS[team.name] : undefined);

  if (!logoSrc) {
    return (
      <div className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full bg-[#e8f0fb] text-[#012d74]/60 text-xs font-bold shrink-0",
        right && "ml-auto"
      )}>
        {team?.short_name?.slice(0, 2) ?? "??"}
      </div>
    );
  }

  return (
    <div className={cn("relative h-10 w-10 shrink-0", right && "ml-auto")}>
      <Image src={logoSrc} alt={team?.name ?? ""} fill className="object-contain" sizes="40px" />
    </div>
  );
}
