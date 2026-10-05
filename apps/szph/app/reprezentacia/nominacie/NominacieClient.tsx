"use client";

import { useState } from "react";

interface NominationPlayer {
  number: number;
  name: string;
  club: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  nominations: NominationPlayer[];
}

export function NominacieClient({ categories }: { categories: Category[] }) {
  const [activeTab, setActiveTab] = useState(0);
  const active = categories[activeTab];

  return (
    <div>
      {/* Tabs */}
      <div className="flex items-center gap-2 mb-8 flex-wrap">
        {categories.map((cat, i) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(i)}
            className="px-5 py-2.5 font-bold uppercase transition-all"
            style={{
              fontSize: "11px",
              letterSpacing: "0.08em",
              background: activeTab === i ? "#012d74" : "transparent",
              color: activeTab === i ? "#fff" : "#64748b",
              border: activeTab === i ? "1px solid #012d74" : "1px solid rgba(1,45,116,0.12)",
              borderRadius: "24px",
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Nomination table */}
      {active && active.nominations.length > 0 && (
        <div className="overflow-x-auto notranslate">
          <table className="w-full text-sm" style={{ background: "#fff", borderRadius: "6px", border: "1px solid rgba(1,45,116,0.06)" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid rgba(1,45,116,0.08)" }}>
                <th className="px-4 py-3 text-left font-bold text-[#051937]" style={{ fontSize: "11px" }}>#</th>
                <th className="px-4 py-3 text-left font-bold text-[#051937]" style={{ fontSize: "11px" }}>Hráč</th>
                <th className="px-4 py-3 text-left font-bold text-[#051937]" style={{ fontSize: "11px" }}>Klub</th>
              </tr>
            </thead>
            <tbody>
              {active.nominations.map((p: NominationPlayer, i: number) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(1,45,116,0.05)" }}>
                  <td className="px-4 py-2.5 font-bold text-[#012d74]" style={{ fontSize: "13px" }}>{p.number}</td>
                  <td className="px-4 py-2.5 text-[#051937] font-semibold" style={{ fontSize: "13px" }}>{p.name}</td>
                  <td className="px-4 py-2.5 text-[#64748b]" style={{ fontSize: "12px" }}>{p.club}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 text-[#94a3b8]" style={{ fontSize: "12px" }}>
            {active.nominations.length} hráčov v nominácii · {active.name}
          </p>
        </div>
      )}
    </div>
  );
}
