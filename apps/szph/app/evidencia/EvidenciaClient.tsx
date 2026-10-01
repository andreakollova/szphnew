"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { MapPin, Users, UserCheck, UserX, Filter, X } from "lucide-react";

const MapComponent = dynamic(() => import("./MapComponent"), { ssr: false });

type Member = {
  club: string;
  meno: string;
  priezvisko: string;
  rokNarodenia: number | null;
  pohlavie: string;
  stav: string;
};

type ClubData = {
  sheetName: string;
  name: string;
  city: string;
  lat: number;
  lng: number;
  members: Member[];
};

export function EvidenciaClient({ clubs }: { clubs: ClubData[] }) {
  const [selectedClubs, setSelectedClubs] = useState<string[]>([]);
  const [pohlavie, setPohlavie] = useState<string>("all");
  const [stav, setStav] = useState<string>("all");
  const [search, setSearch] = useState("");

  const allMembers = useMemo(() => clubs.flatMap((c) => c.members), [clubs]);

  const filteredMembers = useMemo(() => {
    return allMembers.filter((m) => {
      if (selectedClubs.length > 0 && !selectedClubs.includes(m.club))
        return false;
      if (pohlavie !== "all" && m.pohlavie !== pohlavie) return false;
      if (stav !== "all" && m.stav !== stav) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !m.meno.toLowerCase().includes(q) &&
          !m.priezvisko.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [allMembers, selectedClubs, pohlavie, stav, search]);

  const clubStats = useMemo(() => {
    return clubs.map((c) => ({
      ...c,
      total: c.members.length,
      active: c.members.filter((m) => m.stav === "Aktívny").length,
      inactive: c.members.filter((m) => m.stav === "Neaktívny").length,
      boys: c.members.filter((m) => m.pohlavie === "Chlapec").length,
      girls: c.members.filter((m) => m.pohlavie === "Dievča").length,
    }));
  }, [clubs]);

  const toggleClub = (name: string) => {
    setSelectedClubs((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );
  };

  const hasFilters =
    selectedClubs.length > 0 || pohlavie !== "all" || stav !== "all" || search;

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Header */}
      <section className="section-navy text-white py-16 md:py-20">
        <div className="container-szph">
          <p className="label-wide text-[var(--sky-light)] mb-3">Evidencia</p>
          <h1 className="text-display text-white mb-4">Kluby a ich členovia</h1>
          <p className="text-white/60 max-w-2xl">
            Prehľad registrovaných klubov pozemného hokeja na Slovensku.
            Data sa aktualizujú automaticky z centrálnej evidencie.
          </p>
        </div>
      </section>

      <div className="container-szph py-10 space-y-8">
        {/* Map */}
        <div className="card overflow-hidden p-0">
          <div className="h-[400px] md:h-[480px] w-full">
            <MapComponent
              clubs={clubStats}
              selectedClubs={selectedClubs}
              onToggleClub={toggleClub}
            />
          </div>
        </div>

        {/* Club cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {clubStats.map((club) => {
            const isActive =
              selectedClubs.length === 0 || selectedClubs.includes(club.name);
            const isSelected = selectedClubs.includes(club.name);
            return (
              <button
                key={club.name}
                onClick={() => toggleClub(club.name)}
                className={`card text-left transition-all cursor-pointer ${
                  isSelected ? "ring-2 ring-[var(--sky)]" : ""
                } ${!isActive ? "opacity-40" : ""}`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={14} className="text-[var(--sky)] shrink-0" />
                  <span className="font-semibold text-xs leading-tight">
                    {club.name}
                  </span>
                </div>
                <div className="text-3xl font-bold text-[var(--navy)]">
                  {club.total}
                </div>
                <p className="text-[10px] text-[var(--text-muted)] mt-0.5 uppercase tracking-wider">
                  členov
                </p>
                <div className="mt-3 pt-3 border-t border-gray-100 space-y-1 text-xs text-[var(--text-muted)]">
                  <div className="flex justify-between">
                    <span>Aktívni</span>
                    <span className="font-semibold text-green-600">
                      {club.active}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ch / D</span>
                    <span className="font-semibold">
                      {club.boys} / {club.girls}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Filters */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-[var(--sky)]" />
              <span className="font-semibold text-sm">Filtre</span>
            </div>
            {hasFilters && (
              <button
                onClick={() => {
                  setSelectedClubs([]);
                  setPohlavie("all");
                  setStav("all");
                  setSearch("");
                }}
                className="flex items-center gap-1 text-xs text-[var(--sky)] hover:underline"
              >
                <X size={12} />
                Zrušiť filtre
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            <input
              type="text"
              placeholder="Hľadať meno..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[var(--sky)] focus:border-transparent flex-1 min-w-[180px]"
            />
            <select
              value={pohlavie}
              onChange={(e) => setPohlavie(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[var(--sky)]"
            >
              <option value="all">Pohlavie</option>
              <option value="Chlapec">Chlapci</option>
              <option value="Dievča">Dievčatá</option>
            </select>
            <select
              value={stav}
              onChange={(e) => setStav(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[var(--sky)]"
            >
              <option value="all">Stav</option>
              <option value="Aktívny">Aktívni</option>
              <option value="Neaktívny">Neaktívni</option>
            </select>
          </div>
        </div>

        {/* Summary */}
        <div className="flex flex-wrap gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-[var(--sky)]" />
            <span className="text-[var(--text-muted)]">Zobrazených:</span>
            <span className="font-bold">{filteredMembers.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <UserCheck size={16} className="text-green-600" />
            <span className="text-[var(--text-muted)]">Aktívnych:</span>
            <span className="font-bold">
              {filteredMembers.filter((m) => m.stav === "Aktívny").length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <UserX size={16} className="text-gray-400" />
            <span className="text-[var(--text-muted)]">Neaktívnych:</span>
            <span className="font-bold">
              {filteredMembers.filter((m) => m.stav === "Neaktívny").length}
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="card overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--bg-alt)] border-b border-gray-100">
                  <th className="text-left px-4 py-3 font-semibold text-[var(--text-muted)] text-xs">
                    Meno
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-[var(--text-muted)] text-xs">
                    Klub
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-[var(--text-muted)] text-xs">
                    Rok nar.
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-[var(--text-muted)] text-xs">
                    Vek
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-[var(--text-muted)] text-xs">
                    Pohlavie
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-[var(--text-muted)] text-xs">
                    Stav
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-16 text-[var(--text-muted)]"
                    >
                      Žiadni členovia nezodpovedajú filtrom.
                    </td>
                  </tr>
                ) : (
                  filteredMembers.map((m, i) => (
                    <tr
                      key={`${m.club}-${m.meno}-${m.priezvisko}-${i}`}
                      className="border-b border-gray-50 hover:bg-[var(--bg-alt)] transition-colors"
                    >
                      <td className="px-4 py-3 font-medium">
                        {m.meno} {m.priezvisko}
                      </td>
                      <td className="px-4 py-3 text-[var(--text-muted)]">
                        {m.club}
                      </td>
                      <td className="px-4 py-3 text-[var(--text-muted)]">
                        {m.rokNarodenia || "-"}
                      </td>
                      <td className="px-4 py-3 text-[var(--text-muted)]">
                        {m.rokNarodenia ? currentYear - m.rokNarodenia : "-"}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                            m.pohlavie === "Dievča"
                              ? "bg-pink-50 text-pink-600"
                              : "bg-blue-50 text-blue-600"
                          }`}
                        >
                          {m.pohlavie}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                            m.stav === "Aktívny"
                              ? "bg-green-50 text-green-600"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {m.stav}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
