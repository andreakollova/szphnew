"use client";

import Image from "next/image";
import { GlassCard } from "./GlassCard";
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
  scheduled: "badge-scheduled",
  live:      "badge-live animate-pulse",
  finished:  "badge-finished",
  postponed: "badge-postponed",
};

export function MatchCard({ match, className, delay = 0, compact = false }: MatchCardProps) {
  const { home_team, away_team, competition, match_date, venue, status, home_score, away_score } = match;

  const isFinished = status === "finished";
  const isLive     = status === "live";
  const hasScore   = home_score !== null && away_score !== null;

  return (
    <GlassCard delay={delay} className={cn("p-4 md:p-5", className)}>
      {/* Header — súťaž + dátum */}
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="label-wide text-white/50">
          {competition?.name ?? "Súťaž"}
        </span>
        <span
          className={cn(
            "label-wide rounded-full px-2 py-0.5 text-xs",
            STATUS_CLASSES[status] ?? "badge-scheduled"
          )}
        >
          {STATUS_LABELS[status] ?? status}
        </span>
      </div>

      {/* Tímy + skóre */}
      <div className="flex items-center gap-3">
        {/* Domáci */}
        <div className="flex flex-1 flex-col items-start gap-1.5 min-w-0">
          <TeamLogo team={home_team} />
          <span className="truncate font-garet text-sm font-bold text-white md:text-base">
            {home_team?.name ?? "Domáci"}
          </span>
        </div>

        {/* Skóre / čas */}
        <div className="flex flex-col items-center gap-1 px-2 shrink-0">
          {hasScore ? (
            <div className="flex items-center gap-1.5">
              <span
                className={cn(
                  "font-garet text-2xl font-black md:text-3xl",
                  isFinished ? "text-white" : "text-[var(--sky)]"
                )}
              >
                {home_score}
              </span>
              <span className="text-white/30 font-bold">:</span>
              <span
                className={cn(
                  "font-garet text-2xl font-black md:text-3xl",
                  isFinished ? "text-white" : "text-[var(--sky)]"
                )}
              >
                {away_score}
              </span>
            </div>
          ) : (
            <span className="font-garet text-xl font-bold text-white/70 md:text-2xl">
              {formatTime(match_date)}
            </span>
          )}
          {!compact && (
            <span className="label-wide text-white/40 text-[10px]">
              {formatDate(match_date)}
            </span>
          )}
        </div>

        {/* Hosťujúci */}
        <div className="flex flex-1 flex-col items-end gap-1.5 min-w-0">
          <TeamLogo team={away_team} right />
          <span className="truncate font-garet text-sm font-bold text-white md:text-base text-right">
            {away_team?.name ?? "Hosťujúci"}
          </span>
        </div>
      </div>

      {/* Miesto */}
      {venue && !compact && (
        <div className="mt-3 flex items-center gap-1.5 border-t border-white/10 pt-2.5">
          <svg className="h-3 w-3 text-white/40 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-xs text-white/40">{venue}</span>
        </div>
      )}
    </GlassCard>
  );
}

function TeamLogo({
  team,
  right = false,
}: {
  team: Match["home_team"];
  right?: boolean;
}) {
  if (!team?.logo_url) {
    return (
      <div
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/50",
          "text-xs font-bold"
        )}
      >
        {team?.short_name?.slice(0, 2) ?? "??"}
      </div>
    );
  }

  return (
    <div className={cn("relative h-10 w-10", right && "ml-auto")}>
      <Image
        src={team.logo_url}
        alt={team.name}
        fill
        className="object-contain drop-shadow-lg"
        sizes="40px"
      />
    </div>
  );
}
