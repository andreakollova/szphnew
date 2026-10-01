"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

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
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-[560px]">
      <div
        className="flex items-center gap-5 px-6 py-4"
        style={{
          background: "#fff",
          borderRadius: "16px 16px 0 0",
          boxShadow: "0 8px 32px rgba(1,45,116,0.12), 0 1px 4px rgba(1,45,116,0.06)",
          border: "1px solid rgba(1,45,116,0.08)",
        }}
      >
        <Image src="/images/cookie-icon.png" alt="Cookie" width={40} height={40} className="shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="font-garet font-bold text-[#051937]" style={{ fontSize: "14px" }}>
            Súbory cookies
          </p>
          <p className="text-[#64748b] mt-0.5 leading-snug" style={{ fontSize: "11px" }}>
            Používame cookies na zlepšenie vašej skúsenosti a analýzu návštevnosti.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={accept}
            className="font-garet font-bold text-white transition-all hover:brightness-110"
            style={{
              background: "#012d74",
              borderRadius: "20px",
              padding: "8px 18px",
              fontSize: "11px",
            }}
          >
            Prijať všetky
          </button>
          <button
            onClick={decline}
            className="font-garet font-bold text-[#051937] hover:text-[#012d74] transition-colors"
            style={{
              background: "transparent",
              border: "1px solid rgba(1,45,116,0.15)",
              borderRadius: "20px",
              padding: "8px 14px",
              fontSize: "11px",
            }}
          >
            Odmietnuť
          </button>
        </div>
      </div>
    </div>
  );
}
