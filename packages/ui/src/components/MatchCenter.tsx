"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MatchCard } from "./MatchCard";
import { GlassPanel } from "./GlassPanel";
import { cn } from "../lib/utils";
import type { Match, Competition, TeamCategory, StandingsRow } from "@szph/db/types";
import { calculateStandings } from "@szph/db";

interface MatchCenterProps {
  competitions: Competition[];
  matches: Match[];
  className?: string;
}

const CATEGORY_TABS: { key: TeamCategory | "all"; label: string }[] = [
  { key: "all",   label: "Všetky" },
  { key: "muzi",  label: "Liga M" },
  { key: "zeny",  label: "Liga Ž" },
  { key: "U18",   label: "U18" },
  { key: "U14",   label: "U14" },
  { key: "U12",   label: "U12" },
];

const VIEW_TABS = [
  { key: "zapasy",  label: "Zápasy" },
  { key: "tabulka", label: "Tabuľka" },
];

export function MatchCenter({ competitions, matches, className }: MatchCenterProps) {
  const [activeCategory, setActiveCategory] = useState<TeamCategory | "all">("all");
  const [activeView, setActiveView]         = useState<"zapasy" | "tabulka">("zapasy");

  const filteredCompetitions =
    activeCategory === "all"
      ? competitions
      : competitions.filter((c) => c.category === activeCategory);

  const filteredMatches =
    activeCategory === "all"
      ? matches
      : matches.filter(
          (m) => m.competition?.category === activeCategory
        );

  const upcomingMatches = filteredMatches
    .filter((m) => m.status === "scheduled" || m.status === "live")
    .sort((a, b) => new Date(a.match_date).getTime() - new Date(b.match_date).getTime())
    .slice(0, 10);

  const recentMatches = filteredMatches
    .filter((m) => m.status === "finished")
    .sort((a, b) => new Date(b.match_date).getTime() - new Date(a.match_date).getTime())
    .slice(0, 6);

  const standings = activeCategory !== "all"
    ? calculateStandings(filteredMatches.filter((m) => m.status === "finished"))
    : [];

  return (
    <div className={cn("space-y-6", className)}>
      {/* Záhlavie */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="label-wide text-[var(--sky)]">Match Center</span>
          <h2 className="text-display text-white mt-1">Zápasové centrum</h2>
        </div>

        {/* View tabs */}
        <div className="flex gap-1 rounded-xl bg-white/5 p-1">
          {VIEW_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveView(tab.key as "zapasy" | "tabulka")}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-semibold transition-all",
                activeView === tab.key
                  ? "bg-[var(--brand-primary)] text-white shadow-sm"
                  : "text-white/60 hover:text-white"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Kategória tabs */}
      <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none rounded-xl bg-white/5 p-1 w-fit">
        {CATEGORY_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveCategory(tab.key)}
            className={cn(
              "shrink-0 rounded-lg px-3 py-1.5 text-sm font-semibold transition-all",
              activeCategory === tab.key
                ? "bg-[var(--brand-primary)] text-white"
                : "text-white/60 hover:text-white"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeView === "zapasy" ? (
          <motion.div
            key="zapasy"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Najbližšie zápasy */}
            {upcomingMatches.length > 0 && (
              <div>
                <h3 className="mb-3 label-wide text-white/50">Najbližšie zápasy</h3>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {upcomingMatches.map((match, i) => (
                    <MatchCard key={match.id} match={match} delay={i * 0.05} />
                  ))}
                </div>
              </div>
            )}

            {/* Posledné výsledky */}
            {recentMatches.length > 0 && (
              <div>
                <h3 className="mb-3 label-wide text-white/50">Posledné výsledky</h3>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {recentMatches.map((match, i) => (
                    <MatchCard key={match.id} match={match} delay={i * 0.05} />
                  ))}
                </div>
              </div>
            )}

            {upcomingMatches.length === 0 && recentMatches.length === 0 && (
              <GlassPanel className="py-12 text-center">
                <p className="text-white/40">Žiadne zápasy pre túto kategóriu</p>
              </GlassPanel>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="tabulka"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <StandingsTable standings={standings} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StandingsTable({ standings }: { standings: StandingsRow[] }) {
  if (standings.length === 0) {
    return (
      <GlassPanel className="py-12 text-center">
        <p className="text-white/40">
          Vyberte konkrétnu kategóriu pre zobrazenie tabuľky
        </p>
      </GlassPanel>
    );
  }

  return (
    <GlassPanel className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10">
            <th className="px-4 py-3 text-left label-wide text-white/40 text-[10px] w-8">#</th>
            <th className="px-4 py-3 text-left label-wide text-white/40 text-[10px]">Tím</th>
            <th className="px-3 py-3 text-center label-wide text-white/40 text-[10px]">Z</th>
            <th className="px-3 py-3 text-center label-wide text-white/40 text-[10px]">V</th>
            <th className="px-3 py-3 text-center label-wide text-white/40 text-[10px]">R</th>
            <th className="px-3 py-3 text-center label-wide text-white/40 text-[10px]">P</th>
            <th className="px-3 py-3 text-center label-wide text-white/40 text-[10px]">GR</th>
            <th className="px-4 py-3 text-center label-wide text-white/40 text-[10px] font-black text-white">B</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((row, i) => (
            <motion.tr
              key={row.team.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className={cn(
                "border-b border-white/5 transition-colors hover:bg-white/5",
                i === 0 && "bg-[var(--sky)]/5"
              )}
            >
              <td className="px-4 py-3 text-white/40 text-center font-mono">{i + 1}</td>
              <td className="px-4 py-3">
                <span className="font-garet font-bold text-white">{row.team.name}</span>
              </td>
              <td className="px-3 py-3 text-center text-white/60">{row.played}</td>
              <td className="px-3 py-3 text-center text-white/60">{row.won}</td>
              <td className="px-3 py-3 text-center text-white/60">{row.drawn}</td>
              <td className="px-3 py-3 text-center text-white/60">{row.lost}</td>
              <td className="px-3 py-3 text-center text-white/60">
                {row.goals_for}:{row.goals_against}
              </td>
              <td className="px-4 py-3 text-center font-garet font-black text-white text-base">
                {row.points}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </GlassPanel>
  );
}
