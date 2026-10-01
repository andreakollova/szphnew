"use client";

import { useState, useEffect } from "react";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("szph-cookies-accepted");
    if (!accepted) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("szph-cookies-accepted", "true");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("szph-cookies-accepted", "essential");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-[480px]">
      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(1,45,116,0.12), 0 1px 4px rgba(1,45,116,0.06)",
          border: "1px solid rgba(1,45,116,0.08)",
          padding: "20px 24px",
        }}
      >
        <div className="flex items-start gap-3">
          <svg className="h-5 w-5 text-[#012d74] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <div className="flex-1">
            <p className="font-garet font-bold text-[#051937]" style={{ fontSize: "15px" }}>
              Súbory cookies
            </p>
            <p className="text-[#64748b] mt-1 leading-relaxed" style={{ fontSize: "12px" }}>
              Používame cookies na zlepšenie vašej skúsenosti, analýzu návštevnosti a personalizáciu obsahu.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 mt-4">
          <button
            onClick={accept}
            className="flex-1 font-garet font-bold text-white transition-all hover:brightness-110"
            style={{
              background: "#012d74",
              borderRadius: "20px",
              padding: "10px 0",
              fontSize: "12px",
            }}
          >
            Prijať všetky
          </button>
          <button
            onClick={decline}
            className="flex-1 font-garet font-bold text-[#051937] hover:text-[#012d74] transition-colors"
            style={{
              background: "transparent",
              border: "1px solid rgba(1,45,116,0.15)",
              borderRadius: "20px",
              padding: "10px 0",
              fontSize: "12px",
            }}
          >
            Iba nevyhnutné
          </button>
        </div>
      </div>
    </div>
  );
}
