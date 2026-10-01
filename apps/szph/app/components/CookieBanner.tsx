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
    <div
      className="fixed bottom-0 left-0 right-0 z-[100]"
      style={{
        background: "rgba(5,25,55,0.95)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRadius: "0",
        boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="p-5">
        <p className="font-garet font-bold text-white mb-1" style={{ fontSize: "15px" }}>
          Súbory cookies
        </p>
        <p className="text-white/50 leading-relaxed" style={{ fontSize: "12px" }}>
          Používame cookies na zlepšenie vašej skúsenosti, analýzu návštevnosti a personalizáciu obsahu.
        </p>
        <div className="flex items-center gap-2.5 mt-4">
          <button
            onClick={accept}
            className="flex-1 font-garet font-bold text-white transition-all hover:brightness-110"
            style={{
              background: "#0078fd",
              borderRadius: "20px",
              padding: "10px 0",
              fontSize: "12px",
            }}
          >
            Prijať všetky
          </button>
          <button
            onClick={decline}
            className="flex-1 font-garet font-bold text-white/60 hover:text-white transition-colors"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
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
