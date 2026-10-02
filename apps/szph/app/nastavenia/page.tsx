"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const CLUBS = [
  { id: "none", name: "Žiadny klub" },
  { id: "HAŠ", name: "HA Šenkvice", logo: "/images/timy/HAS.webp" },
  { id: "ŠK", name: "ŠK 1952 Šenkvice", logo: "/images/timy/SEN.webp" },
  { id: "RAČ", name: "KPH Rača", logo: "/images/timy/Raca-logo-70x58-1-32x27.webp" },
  { id: "HOKO", name: "HOKO Zlaté Moravce", logo: "/images/timy/logo-KPH-HOKO-1-Photoroom-32x18.webp" },
  { id: "HKM", name: "HKM Nová Dubnica", logo: "/images/timy/nova-dubnica-32x32.webp" },
];

interface UserPrefs {
  name: string;
  club: string;
  kategoria: string;
  mesto: string;
  notifReprezentacia: boolean;
  notifMojKlub: boolean;
  notifDospeli: boolean;
  notifMladez: boolean;
  notifVsetky: boolean;
}

const MESTA = ["Bratislava", "Šenkvice", "Zlaté Moravce", "Nová Dubnica", "Košice", "Banská Bystrica", "Žilina", "Trnava", "Nitra", "Prešov"];

const DEFAULT_PREFS: UserPrefs = {
  name: "",
  club: "none",
  kategoria: "none",
  mesto: "",
  notifReprezentacia: true,
  notifMojKlub: true,
  notifDospeli: true,
  notifMladez: false,
  notifVsetky: false,
};

const CATEGORIES = [
  { id: "none", name: "Žiadna (zobrazí program na týždeň)" },
  { id: "muzi", name: "Muži" },
  { id: "zeny", name: "Ženy" },
  { id: "U18", name: "U18" },
  { id: "U14", name: "U14" },
  { id: "U12", name: "U12" },
];

function Toggle({ enabled, onChange, label, desc }: { enabled: boolean; onChange: () => void; label: string; desc?: string }) {
  return (
    <button onClick={onChange} className="flex items-center justify-between w-full py-3 text-left" style={{ borderBottom: "1px solid rgba(1,45,116,0.06)" }}>
      <div>
        <p className="font-bold text-[#051937]" style={{ fontSize: "14px" }}>{label}</p>
        {desc && <p className="text-[#94a3b8]" style={{ fontSize: "11px" }}>{desc}</p>}
      </div>
      <div className={`shrink-0 w-11 h-6 rounded-full flex items-center px-0.5 transition-colors ${enabled ? "bg-[#012d74] justify-end" : "bg-[#e2e8f0] justify-start"}`}>
        <div className="w-5 h-5 rounded-full bg-white shadow transition-all" />
      </div>
    </button>
  );
}

export default function NastaveniaPage() {
  const [prefs, setPrefs] = useState<UserPrefs>(DEFAULT_PREFS);
  const [saved, setSaved] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const raw = localStorage.getItem("szph_user_prefs");
    if (raw) {
      try { setPrefs({ ...DEFAULT_PREFS, ...JSON.parse(raw) }); } catch {}
    }
  }, []);

  const update = (key: keyof UserPrefs, value: any) => {
    const next = { ...prefs, [key]: value };
    // If "vsetky" is toggled on, enable all
    if (key === "notifVsetky" && value) {
      next.notifReprezentacia = true;
      next.notifMojKlub = true;
      next.notifDospeli = true;
      next.notifMladez = true;
    }
    setPrefs(next);
    localStorage.setItem("szph_user_prefs", JSON.stringify(next));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const selectedClub = CLUBS.find(c => c.id === prefs.club);

  if (!mounted) return <div className="min-h-screen" style={{ background: "#f8f9fa" }} />;

  return (
    <div style={{ background: "#f8f9fa", minHeight: "100vh" }}>
      <div className="px-5 pt-6 pb-24 max-w-lg mx-auto">
        {/* Back */}
        <Link href="/" className="flex items-center gap-1 text-[#94a3b8] hover:text-[#051937] mb-6 transition-colors">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          <span className="text-sm font-semibold">Späť</span>
        </Link>

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-[#051937] flex items-center justify-center">
              {selectedClub && selectedClub.id !== "none" ? (
                <span className="font-black text-white" style={{ fontSize: "15px" }}>{selectedClub.id}</span>
              ) : prefs.name ? (
                <span className="font-black text-white text-xl">{prefs.name.charAt(0).toUpperCase()}</span>
              ) : (
                <svg className="h-7 w-7 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
              )}
            </div>
            {selectedClub && selectedClub.id !== "none" && "logo" in selectedClub && (
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-md" style={{ border: "2px solid white" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={(selectedClub as any).logo} alt="" className="w-4 h-4 object-contain" />
              </div>
            )}
          </div>
          <div>
            <h1 className="font-garet font-bold italic text-[#051937]" style={{ fontSize: "22px" }}>
              {prefs.name || "Nastavenia"}
            </h1>
            <p className="text-[#94a3b8]" style={{ fontSize: "12px" }}>
              {selectedClub && selectedClub.id !== "none" ? selectedClub.name : "Personalizuj si app"}
            </p>
          </div>
        </div>

        {/* Profil */}
        <div className="bg-white rounded-2xl p-5 mb-5" style={{ border: "1px solid rgba(1,45,116,0.06)" }}>
          <h2 className="font-bold text-[#051937] mb-4" style={{ fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Profil</h2>

          <div className="mb-4">
            <label className="block text-[#94a3b8] font-semibold mb-1.5" style={{ fontSize: "11px" }}>Meno</label>
            <input
              type="text"
              value={prefs.name}
              onChange={e => update("name", e.target.value)}
              placeholder="Tvoje meno"
              className="w-full rounded-xl bg-[#f8f9fa] px-4 py-3 text-[#051937] font-semibold outline-none focus:ring-2 focus:ring-[#012d74]/20 transition-all"
              style={{ fontSize: "15px", border: "1px solid rgba(1,45,116,0.08)" }}
            />
          </div>

          <div>
            <label className="block text-[#94a3b8] font-semibold mb-2" style={{ fontSize: "11px" }}>Môj klub</label>
            <div className="grid grid-cols-2 gap-2">
              {CLUBS.map(club => (
                <button
                  key={club.id}
                  onClick={() => update("club", club.id)}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all text-left"
                  style={{
                    background: prefs.club === club.id ? "rgba(1,45,116,0.06)" : "transparent",
                    border: prefs.club === club.id ? "2px solid #012d74" : "1px solid rgba(1,45,116,0.06)",
                  }}
                >
                  {club.id !== "none" && "logo" in club && (
                    <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shrink-0 overflow-hidden" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={(club as any).logo} alt="" className="w-4 h-4 object-contain" />
                    </div>
                  )}
                  <span className="font-bold text-[#051937] truncate" style={{ fontSize: club.id === "none" ? "12px" : "11px" }}>
                    {club.id === "none" ? "Žiadny" : club.name.split(" ").slice(-1)[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-[#94a3b8] font-semibold mb-2" style={{ fontSize: "11px" }}>Moja kategória</label>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => update("kategoria", cat.id)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl transition-all text-left"
                  style={{
                    background: prefs.kategoria === cat.id ? "rgba(1,45,116,0.06)" : "transparent",
                    border: prefs.kategoria === cat.id ? "2px solid #012d74" : "1px solid rgba(1,45,116,0.06)",
                  }}
                >
                  <span className="font-bold text-[#051937] truncate" style={{ fontSize: "12px" }}>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-[#94a3b8] font-semibold mb-1.5" style={{ fontSize: "11px" }}>Moje mesto (počasie)</label>
            <select
              value={prefs.mesto || ""}
              onChange={e => update("mesto", e.target.value)}
              className="w-full rounded-xl bg-[#f8f9fa] px-4 py-3 text-[#051937] font-semibold outline-none focus:ring-2 focus:ring-[#012d74]/20 transition-all"
              style={{ fontSize: "14px", border: "1px solid rgba(1,45,116,0.08)", appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", paddingRight: "36px" }}
            >
              <option value="">Vyber mesto</option>
              {MESTA.map(mesto => (
                <option key={mesto} value={mesto}>{mesto}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Notifikácie */}
        <div className="bg-white rounded-2xl p-5 mb-5" style={{ border: "1px solid rgba(1,45,116,0.06)" }}>
          <h2 className="font-bold text-[#051937] mb-2" style={{ fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Notifikácie</h2>
          <p className="text-[#94a3b8] mb-4" style={{ fontSize: "11px" }}>Vyber si o čom chceš dostávať upozornenia</p>

          <Toggle
            enabled={prefs.notifVsetky}
            onChange={() => update("notifVsetky", !prefs.notifVsetky)}
            label="Všetky zápasy"
            desc="Notifikácie o všetkých zápasoch"
          />
          <Toggle
            enabled={prefs.notifReprezentacia}
            onChange={() => update("notifReprezentacia", !prefs.notifReprezentacia)}
            label="Reprezentácia"
            desc="Zápasy slovenských národných tímov"
          />
          <Toggle
            enabled={prefs.notifMojKlub}
            onChange={() => update("notifMojKlub", !prefs.notifMojKlub)}
            label="Môj klub"
            desc={selectedClub && selectedClub.id !== "none" ? `Zápasy ${selectedClub.name}` : "Vyber si klub vyššie"}
          />
          <Toggle
            enabled={prefs.notifDospeli}
            onChange={() => update("notifDospeli", !prefs.notifDospeli)}
            label="Dospelí"
            desc="Extraliga muži a ženy"
          />
          <Toggle
            enabled={prefs.notifMladez}
            onChange={() => update("notifMladez", !prefs.notifMladez)}
            label="Mládež"
            desc="U18, U14, U12"
          />
        </div>

        {/* Saved toast */}
        {saved && (
          <div className="fixed bottom-36 left-1/2 -translate-x-1/2 bg-[#051937] text-white px-5 py-2.5 rounded-full font-bold shadow-lg z-50" style={{ fontSize: "12px" }}>
            Uložené
          </div>
        )}
      </div>
    </div>
  );
}
