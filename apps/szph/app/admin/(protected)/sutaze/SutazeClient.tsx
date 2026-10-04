"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { CompetitionActions } from "./CompetitionActions";

interface Competition {
  id: string;
  name: string;
  season: string;
  type: string;
  category: string;
  created_at: string;
}

const TYPE_LABELS: Record<string, string> = {
  liga: "Liga",
  turnaj: "Turnaj",
};

export function SutazeClient({ competitions }: { competitions: Competition[] }) {
  const seasons = useMemo(() => {
    const set = new Set(competitions.map((c) => c.season));
    return Array.from(set).sort().reverse();
  }, [competitions]);

  const [selectedSeason, setSelectedSeason] = useState<string>("all");

  const filtered = useMemo(() => {
    if (selectedSeason === "all") return competitions;
    return competitions.filter((c) => c.season === selectedSeason);
  }, [competitions, selectedSeason]);

  const liga = filtered.filter((c) => c.type === "liga");
  const turnaje = filtered.filter((c) => c.type === "turnaj");

  return (
    <>
      {/* Filter sezóna */}
      {seasons.length > 1 && (
        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-[#64748b] uppercase tracking-wider">Sezóna:</label>
          <select
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(e.target.value)}
            className="rounded bg-white px-3 py-2 text-sm text-[#051937] outline-none"
            style={{ border: "1px solid rgba(1,45,116,0.12)" }}
          >
            <option value="all">Všetky sezóny</option>
            {seasons.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      )}

      {/* Liga */}
      <Section title="Liga" competitions={liga} />

      {/* Turnaje / Reprezentácia */}
      <Section title="Turnaje" competitions={turnaje} />
    </>
  );
}

function Section({ title, competitions }: { title: string; competitions: Competition[] }) {
  return (
    <div>
      <h2 className="text-lg font-bold text-[#051937] mb-3">{title}</h2>
      <div className="rounded overflow-hidden" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
        {competitions.length === 0 ? (
          <div className="py-10 text-center text-[#64748b] text-sm">Žiadne súťaže v tejto kategórii</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[rgba(1,45,116,0.08)]">
                <th className="px-5 py-3 text-left text-[10px] uppercase tracking-wider text-[#64748b]">Názov</th>
                <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-[#64748b]">Sezóna</th>
                <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-[#64748b]">Typ</th>
                <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-[#64748b]">Kategória</th>
                <th className="px-4 py-3 text-right text-[10px] uppercase tracking-wider text-[#64748b]">Akcie</th>
              </tr>
            </thead>
            <tbody>
              {competitions.map((comp) => (
                <tr key={comp.id} className="border-b border-[rgba(1,45,116,0.08)] hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4 font-semibold text-[#051937]">{comp.name}</td>
                  <td className="px-4 py-4 text-[#64748b]">{comp.season}</td>
                  <td className="px-4 py-4">
                    <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-[#64748b] capitalize">
                      {TYPE_LABELS[comp.type] || comp.type}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-[#64748b]">{comp.category}</td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/sutaze/${comp.id}`} className="rounded bg-gray-100 px-3 py-1.5 text-xs font-semibold text-[#051937] hover:bg-gray-200 transition-colors">Upraviť</Link>
                      <CompetitionActions id={comp.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
