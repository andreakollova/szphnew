"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface CookieConsent {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

function getConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("szph-cookies-consent");
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

function setConsent(consent: CookieConsent) {
  localStorage.setItem("szph-cookies-consent", JSON.stringify(consent));
  localStorage.setItem("szph-cookies-accepted", "true");
  // Block/unblock analytics
  if (consent.analytics) {
    document.dispatchEvent(new CustomEvent("cookies:analytics", { detail: true }));
  }
  if (consent.marketing) {
    document.dispatchEvent(new CustomEvent("cookies:marketing", { detail: true }));
  }
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    // Hide cookie banner in native Capacitor app
    if (typeof window !== "undefined" && (window as any).Capacitor) return;
    const existing = getConsent();
    if (!existing) {
      setVisible(true);
    }
  }, []);

  const acceptAll = () => {
    setConsent({ essential: true, analytics: true, marketing: true });
    setVisible(false);
  };

  const acceptSelected = () => {
    setConsent({ essential: true, analytics, marketing });
    setVisible(false);
  };

  const rejectAll = () => {
    setConsent({ essential: true, analytics: false, marketing: false });
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-[100] w-[94%] max-w-[580px]">
      <div
        className="px-6 py-5"
        style={{
          background: "#fff",
          borderRadius: "16px 16px 0 0",
          boxShadow: "0 -4px 32px rgba(1,45,116,0.1), 0 1px 4px rgba(1,45,116,0.06)",
          border: "1px solid rgba(1,45,116,0.08)",
          borderBottom: "none",
        }}
      >
        <div className="flex items-start gap-4">
          <Image src="/images/cookie-icon.webp" alt="Cookie" width={36} height={36} className="shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="font-garet font-bold text-[#051937]" style={{ fontSize: "15px" }}>
              Súbory cookies
            </p>
            <p className="text-[#64748b] mt-1 leading-snug" style={{ fontSize: "11px" }}>
              Používame cookies na zabezpečenie funkčnosti stránky, analýzu návštevnosti a marketingové účely.{" "}
              <Link href="/cookies" className="text-[#012d74] underline">Viac informácií</Link>
            </p>
          </div>
        </div>

        {/* Settings panel */}
        {showSettings && (
          <div className="mt-4 space-y-2.5">
            {/* Essential — always on */}
            <div className="flex items-center justify-between py-2 px-3 bg-[#f8f9fa]" style={{ borderRadius: "8px" }}>
              <div>
                <p className="font-bold text-[#051937]" style={{ fontSize: "12px" }}>Nevyhnutné</p>
                <p className="text-[#94a3b8]" style={{ fontSize: "10px" }}>Základné fungovanie stránky</p>
              </div>
              <div className="shrink-0 w-10 h-5 rounded-full bg-[#16a34a] flex items-center justify-end px-0.5">
                <div className="w-4 h-4 rounded-full bg-white" />
              </div>
            </div>

            {/* Analytics */}
            <button
              onClick={() => setAnalytics(!analytics)}
              className="flex items-center justify-between w-full py-2 px-3 bg-[#f8f9fa] text-left transition-colors hover:bg-[#f0f4fa]"
              style={{ borderRadius: "8px" }}
            >
              <div>
                <p className="font-bold text-[#051937]" style={{ fontSize: "12px" }}>Analytické</p>
                <p className="text-[#94a3b8]" style={{ fontSize: "10px" }}>Google Analytics — anonymná návštevnosť</p>
              </div>
              <div className={`shrink-0 w-10 h-5 rounded-full flex items-center px-0.5 transition-colors ${analytics ? "bg-[#012d74] justify-end" : "bg-[#e2e8f0] justify-start"}`}>
                <div className="w-4 h-4 rounded-full bg-white transition-all" />
              </div>
            </button>

            {/* Marketing */}
            <button
              onClick={() => setMarketing(!marketing)}
              className="flex items-center justify-between w-full py-2 px-3 bg-[#f8f9fa] text-left transition-colors hover:bg-[#f0f4fa]"
              style={{ borderRadius: "8px" }}
            >
              <div>
                <p className="font-bold text-[#051937]" style={{ fontSize: "12px" }}>Marketingové</p>
                <p className="text-[#94a3b8]" style={{ fontSize: "10px" }}>Personalizácia obsahu a reklám</p>
              </div>
              <div className={`shrink-0 w-10 h-5 rounded-full flex items-center px-0.5 transition-colors ${marketing ? "bg-[#012d74] justify-end" : "bg-[#e2e8f0] justify-start"}`}>
                <div className="w-4 h-4 rounded-full bg-white transition-all" />
              </div>
            </button>
          </div>
        )}

        {/* Buttons */}
        <div className="flex items-center gap-2 mt-4">
          <button
            onClick={acceptAll}
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
            onClick={showSettings ? acceptSelected : rejectAll}
            className="flex-1 font-garet font-bold text-[#051937] hover:text-[#012d74] transition-colors"
            style={{
              background: "transparent",
              border: "1px solid rgba(1,45,116,0.15)",
              borderRadius: "20px",
              padding: "10px 0",
              fontSize: "12px",
            }}
          >
            {showSettings ? "Uložiť výber" : "Odmietnuť"}
          </button>
          {!showSettings && (
            <button
              onClick={() => setShowSettings(true)}
              className="font-garet font-bold text-[#64748b] hover:text-[#051937] transition-colors"
              style={{
                fontSize: "11px",
                padding: "10px 12px",
              }}
            >
              Nastavenia
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
