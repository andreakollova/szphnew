"use client";

import { useState, useEffect } from "react";

const CLUBS = [
  { id: "HAŠ", name: "HA Šenkvice", short: "HAŠ", logo: "/images/timy/HAS.webp" },
  { id: "ŠK", name: "ŠK 1952 Šenkvice", short: "ŠEN", logo: "/images/timy/SEN.webp" },
  { id: "RAČ", name: "KPH Rača", short: "RAČ", logo: "/images/timy/Raca-logo-70x58-1-32x27.webp" },
  { id: "HOKO", name: "HOKO Zlaté Moravce", short: "ZLM", logo: "/images/timy/logo-KPH-HOKO-1-Photoroom-32x18.webp" },
  { id: "HKM", name: "HKM Nová Dubnica", short: "DUB", logo: "/images/timy/nova-dubnica-32x32.webp" },
];

const CATEGORIES = [
  { id: "muzi", name: "Muži" },
  { id: "zeny", name: "Ženy" },
  { id: "U18", name: "U18" },
  { id: "U14", name: "U14" },
  { id: "U12", name: "U12" },
];

export function AppOnboarding() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [selectedClubs, setSelectedClubs] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [wantRep, setWantRep] = useState(true);

  useEffect(() => {
    // Only show in native app, and only if not yet completed
    const isNative = typeof window !== "undefined" && (window as any).Capacitor;
    if (!isNative) return;
    const done = localStorage.getItem("szph_onboarding_done");
    const prefs = localStorage.getItem("szph_user_prefs");
    if (done || (prefs && JSON.parse(prefs).name)) return;
    // Small delay so the app loads first
    const t = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(t);
  }, []);

  function finish() {
    const prefs = {
      name,
      club: selectedClubs[0] || "none",
      clubs: selectedClubs,
      kategoria: selectedCategories[0] || "none",
      kategorie: selectedCategories,
      mesto: "",
      notifReprezentacia: wantRep,
      notifMojKlub: selectedClubs.length > 0,
      notifDospeli: true,
      notifMladez: selectedCategories.some(c => ["U18", "U14", "U12"].includes(c)),
      notifVsetky: false,
    };
    localStorage.setItem("szph_user_prefs", JSON.stringify(prefs));
    localStorage.setItem("szph_onboarding_done", "true");
    setVisible(false);
  }

  function skip() {
    localStorage.setItem("szph_onboarding_done", "true");
    setVisible(false);
  }

  function toggleClub(id: string) {
    setSelectedClubs(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
  }

  function toggleCategory(id: string) {
    setSelectedCategories(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
  }

  if (!visible) return null;

  const STEPS = [
    // Step 0: Welcome + Name
    <div key="name">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center rounded-full" style={{ width: 40, height: 40, background: "rgba(1,45,116,0.06)" }}>
          <svg className="h-5 w-5 text-[#012d74]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        </div>
        <div>
          <p className="font-garet font-bold text-[#051937]" style={{ fontSize: "16px" }}>
            Vitaj v SZPH!
          </p>
          <p className="text-[#64748b]" style={{ fontSize: "11px" }}>
            Personalizuj si appku za 30 sekund
          </p>
        </div>
      </div>
      <div>
        <label className="block text-[#94a3b8] font-semibold mb-1.5" style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Ako sa volas?
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tvoje meno"
          autoFocus
          className="w-full rounded-xl bg-[#f8f9fa] px-4 py-3 text-[#051937] font-semibold outline-none focus:ring-2 focus:ring-[#012d74]/20"
          style={{ fontSize: "15px", border: "1px solid rgba(1,45,116,0.08)" }}
        />
      </div>
    </div>,

    // Step 1: Clubs
    <div key="clubs">
      <p className="font-garet font-bold text-[#051937] mb-1" style={{ fontSize: "15px" }}>
        Tvoje kluby
      </p>
      <p className="text-[#64748b] mb-4" style={{ fontSize: "11px" }}>
        Vyber kluby, ktore ta zaujimaju. Mozes vybrat viac.
      </p>
      <div className="grid grid-cols-2 gap-2">
        {CLUBS.map(club => {
          const sel = selectedClubs.includes(club.id);
          return (
            <button
              key={club.id}
              onClick={() => toggleClub(club.id)}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all text-left"
              style={{
                background: sel ? "rgba(1,45,116,0.06)" : "transparent",
                border: sel ? "2px solid #012d74" : "1px solid rgba(1,45,116,0.06)",
              }}
            >
              <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shrink-0 overflow-hidden" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={club.logo} alt="" className="w-4 h-4 object-contain" />
              </div>
              <span className="font-bold text-[#051937] truncate" style={{ fontSize: "11px" }}>{club.short}</span>
              {sel && (
                <svg className="h-4 w-4 text-[#012d74] shrink-0 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              )}
            </button>
          );
        })}
      </div>
    </div>,

    // Step 2: Categories + Rep
    <div key="categories">
      <p className="font-garet font-bold text-[#051937] mb-1" style={{ fontSize: "15px" }}>
        Co ta zaujima?
      </p>
      <p className="text-[#64748b] mb-4" style={{ fontSize: "11px" }}>
        Vyber kategorie a uvidis iba relevantne zapasy.
      </p>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {CATEGORIES.map(cat => {
          const sel = selectedCategories.includes(cat.id);
          return (
            <button
              key={cat.id}
              onClick={() => toggleCategory(cat.id)}
              className="px-3 py-2.5 rounded-xl font-bold transition-all text-center"
              style={{
                fontSize: "12px",
                background: sel ? "#012d74" : "transparent",
                color: sel ? "#fff" : "#051937",
                border: sel ? "2px solid #012d74" : "1px solid rgba(1,45,116,0.06)",
              }}
            >
              {cat.name}
            </button>
          );
        })}
      </div>
      <button
        onClick={() => setWantRep(!wantRep)}
        className="flex items-center justify-between w-full py-3 px-3 rounded-xl text-left transition-colors"
        style={{ background: wantRep ? "rgba(1,45,116,0.04)" : "transparent", border: "1px solid rgba(1,45,116,0.06)" }}
      >
        <div>
          <p className="font-bold text-[#051937]" style={{ fontSize: "13px" }}>Reprezentacia</p>
          <p className="text-[#94a3b8]" style={{ fontSize: "10px" }}>Zapasy slovenskych narodnych timov</p>
        </div>
        <div className={`shrink-0 w-11 h-6 rounded-full flex items-center px-0.5 transition-colors ${wantRep ? "bg-[#012d74] justify-end" : "bg-[#e2e8f0] justify-start"}`}>
          <div className="w-5 h-5 rounded-full bg-white shadow transition-all" />
        </div>
      </button>
    </div>,
  ];

  const isLast = step === STEPS.length - 1;
  const canNext = step === 0 ? name.trim().length > 0 : true;

  return (
    <div className="fixed inset-0 z-[200]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={skip} />

      {/* Bottom sheet */}
      <div
        className="absolute bottom-0 left-0 right-0 px-5 pt-6 pb-8"
        style={{
          background: "#fff",
          borderRadius: "24px 24px 0 0",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.15)",
          paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 24px)",
        }}
      >
        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mb-5">
          {STEPS.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === step ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background: i === step ? "#012d74" : i < step ? "#012d74" : "#e2e8f0",
                transition: "all 0.3s",
              }}
            />
          ))}
        </div>

        {/* Step content */}
        {STEPS[step]}

        {/* Buttons */}
        <div className="flex items-center gap-2 mt-5">
          <button
            onClick={() => {
              if (isLast) { finish(); }
              else { setStep(s => s + 1); }
            }}
            disabled={!canNext}
            className="flex-1 font-garet font-bold text-white transition-all disabled:opacity-40"
            style={{ background: "#012d74", borderRadius: "20px", padding: "12px 0", fontSize: "13px" }}
          >
            {isLast ? "Hotovo" : "Dalej"}
          </button>
          {step > 0 && (
            <button
              onClick={() => setStep(s => s - 1)}
              className="font-garet font-bold text-[#64748b] hover:text-[#051937] transition-colors"
              style={{ padding: "12px 16px", fontSize: "12px" }}
            >
              Spat
            </button>
          )}
          {step === 0 && (
            <button
              onClick={skip}
              className="font-garet font-bold text-[#94a3b8] hover:text-[#051937] transition-colors"
              style={{ padding: "12px 16px", fontSize: "11px" }}
            >
              Preskocit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
