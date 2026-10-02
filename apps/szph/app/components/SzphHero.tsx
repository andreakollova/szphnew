"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const HERO_IMAGES = [
  { src: "/images/hero-banner3.webp", mobilePos: "center 25%", desktopPos: "center 25%" },
  { src: "/images/hero-banner3b.webp", mobilePos: "30% 40%", desktopPos: "center 55%" },
  { src: "/images/hero-banner7.webp", mobilePos: "30% 40%", desktopPos: "center 55%" },
  { src: "/images/hero-banner-blue-player.webp", mobilePos: "center 10%", desktopPos: "center top" },
  { src: "/images/hero-banner2.webp", mobilePos: "center 25%", desktopPos: "center 25%" },
];

interface NextMatch {
  id: string;
  home_team: string;
  away_team: string;
  home_short?: string;
  away_short?: string;
  home_logo?: string;
  away_logo?: string;
  date: string;
  league?: string;
  venue?: string;
  video_url?: string | null;
  isRep?: boolean;
}

export function SzphHero({ nextMatch }: { nextMatch?: NextMatch | null }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((p) => (p + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mobile-hero-pull" style={{ background: "#051937" }}>
      {/* ═══ MOBILE HERO (below md) ═══ */}
      <section
        data-hero
        className="relative w-full overflow-hidden md:hidden"
        style={{ minHeight: "82vh" }}
      >
        {/* Mobile rotating background photos */}
        {HERO_IMAGES.map((img, i) => (
          <Image
            key={img.src}
            src={img.src}
            alt="SZPH"
            fill
            className="object-cover"
            style={{
              objectPosition: img.mobilePos,
              opacity: current === i ? 1 : 0,
              transition: "opacity 1s ease-in-out",
            }}
            priority={i === 0}
            quality={100}
            sizes="100vw"
            unoptimized
          />
        ))}
        {/* Mobile overlay pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url(/images/hero-mobile-bg.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            mixBlendMode: "multiply",
          }}
        />
        {/* Dark gradient at bottom for text readability */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(5,25,55,0.95) 0%, rgba(5,25,55,0.6) 35%, transparent 65%)",
          }}
        />

        {/* Headline + CTA — positioned at bottom-left */}
        <div className="absolute bottom-24 left-5 right-5">
          <p
            className="font-garet"
            style={{
              fontSize: "0.7rem",
              fontStyle: "italic",
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase" as const,
              marginBottom: "6px",
              textShadow: "0 2px 20px rgba(0,0,0,0.3)",
              background: "linear-gradient(90deg, rgba(255,255,255,0.9) 0%, rgba(200,210,225,0.6) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Nová generácia, veľké ambície
          </p>
          <h1
            className="font-garet text-white"
            style={{
              fontSize: "2.4rem",
              lineHeight: 1.05,
              fontWeight: 500,
              WebkitTextStroke: "1px white",
              fontStyle: "italic",
              textShadow: "0 4px 40px rgba(0,0,0,0.3)",
            }}
          >
            JEDEN TÝM,
            <br />
            SPOLOČNÝ
            <br />
            <span style={{ color: "#0078fd", WebkitTextStroke: "1px #0078fd" }}>CIEĽ.</span>
          </h1>
          <div style={{ marginTop: "16px" }}>
            <Link
              href="#aktuality"
              className="relative flex items-center justify-center font-garet font-bold text-white transition-transform hover:scale-[1.03] active:scale-[0.98] w-full"
              style={{
                background: "#d80027",
                borderRadius: "20px",
                height: "44px",
                fontSize: "14px",
              }}
            >
              Zistiť viac
              <svg className="ml-2" style={{ width: "14px", height: "14px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ DESKTOP HERO (md and above) ═══ */}
      <section
        data-hero
        className="relative w-full overflow-hidden hidden md:block"
        style={{ aspectRatio: "3022 / 1578", marginTop: "-116px", paddingTop: "116px" }}
      >
        {/* ═══ Background photos — fade rotation ═══ */}
        {HERO_IMAGES.map((img, i) => (
          <Image
            key={img.src}
            src={img.src}
            alt="SZPH"
            fill
            className="object-cover"
            style={{
              objectPosition: img.desktopPos,
              opacity: current === i ? 1 : 0,
              transition: "opacity 1s ease-in-out",
            }}
            priority={i === 0}
            quality={90}
            sizes="100vw"
          />
        ))}

        {/* ═══ Overlay gradient image ═══ */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url(/images/hero-overlay.webp)",
            backgroundSize: "cover",
            backgroundPosition: "top left",
            mixBlendMode: "normal",
          }}
        />

        {/* ═══ Decorative SVG shape — right sweep (node 1160) ═══
             Container: inset(861, -636.7, -462, 622.67) on 3022×1578
             Inner: rotate(-20.82deg) skewX(46.46deg), ~2567×690
        */}
        <div
          className="absolute pointer-events-none flex items-center justify-center"
          style={{
            top: "54.56%",
            left: "20.61%",
            width: "100.46%",
            height: "74.71%",
          }}
        >
          <div
            className="shrink-0"
            style={{
              width: "84.94%",
              height: "58.5%",
              transform: "rotate(-20.82deg) skewX(46.46deg)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/hero-shape1.svg" alt="" className="w-full h-full block" style={{ maxWidth: "none" }} />
          </div>
        </div>

        {/* ═══ Decorative SVG shape — left sweep (node 1161) ═══
             Container: inset(475.66, 89, -379.31, -869.79) on 3022×1578
             Inner: rotate(25.83deg) skewX(-45.96deg), ~1652×2438
        */}
        <div
          className="absolute pointer-events-none flex items-center justify-center"
          style={{
            top: "30.14%",
            left: "-28.78%",
            width: "125.88%",
            height: "93.89%",
          }}
        >
          <div
            className="shrink-0"
            style={{
              width: "43.44%",
              height: "164.49%",
              transform: "rotate(25.83deg) skewX(-45.96deg)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/hero-shape2.svg" alt="" className="w-full h-full block" style={{ maxWidth: "none" }} />
          </div>
        </div>

        {/* ═══ Decorative SVG shape — left sweep lower (node 1162) ═══
             Container: inset(590.23, 164.82, -575.63, -977) on 3022×1578
             Inner: rotate(17.9deg) skewX(-45.86deg), ~2021×2131
        */}
        <div
          className="absolute pointer-events-none flex items-center justify-center"
          style={{
            top: "37.40%",
            left: "-32.33%",
            width: "126.96%",
            height: "99.05%",
          }}
        >
          <div
            className="shrink-0"
            style={{
              width: "52.71%",
              height: "136.37%",
              transform: "rotate(17.9deg) skewX(-45.86deg)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/hero-shape3.svg" alt="" className="w-full h-full block" style={{ maxWidth: "none" }} />
          </div>
        </div>

        {/* ═══ Blue diagonal stripes at bottom ═══ */}

        {/* Stripe 1 (node 1163) — gentlest
            Container: inset(1184, -438.47, -542.71, -296.51)
            Inner: rotate(-8.39deg) skewX(34.41deg), ~3384×604
        */}
        <div
          className="absolute pointer-events-none flex items-center justify-center"
          style={{
            top: "75.03%",
            left: "-9.81%",
            width: "124.32%",
            height: "59.35%",
          }}
        >
          <div
            className="shrink-0"
            style={{
              width: "90.07%",
              height: "64.46%",
              transform: "rotate(-8.39deg) skewX(34.41deg)",
              opacity: 0.8,
              backgroundImage: "linear-gradient(-1.08deg, rgb(38, 86, 171) 4.72%, rgb(7, 35, 87) 97.72%)",
            }}
          />
        </div>

        {/* Stripe 2 (node 1164)
            Container: inset(1155, -634.97, -647.25, 77)
            Inner: rotate(-12.51deg) skewX(41.82deg)
        */}
        <div
          className="absolute pointer-events-none flex items-center justify-center"
          style={{
            top: "73.19%",
            left: "2.55%",
            width: "118.52%",
            height: "67.68%",
          }}
        >
          <div
            className="shrink-0"
            style={{
              width: "85.60%",
              height: "55.26%",
              transform: "rotate(-12.51deg) skewX(41.82deg)",
              opacity: 0.8,
              backgroundImage: "linear-gradient(-1.34deg, rgb(38, 86, 171) 4.72%, rgb(7, 35, 87) 97.72%)",
            }}
          />
        </div>

        {/* Stripe 3 (node 1165)
            Container: inset(1164.54, -946.78, -695.16, 510.36)
            Inner: rotate(-14.15deg) skewX(43.57deg)
        */}
        <div
          className="absolute pointer-events-none flex items-center justify-center"
          style={{
            top: "73.80%",
            left: "16.89%",
            width: "114.44%",
            height: "70.70%",
          }}
        >
          <div
            className="shrink-0"
            style={{
              width: "82.93%",
              height: "50.91%",
              transform: "rotate(-14.15deg) skewX(43.57deg)",
              opacity: 0.7,
              backgroundImage: "linear-gradient(-1.53deg, rgb(38, 86, 171) 4.72%, rgb(7, 35, 87) 97.72%)",
            }}
          />
        </div>

        {/* Stripe 4 (node 1166) — steepest
            Container: inset(1136.91, -1542, -780.79, 1253.34)
            Inner: rotate(-18.75deg) skewX(46.12deg)
        */}
        <div
          className="absolute pointer-events-none flex items-center justify-center"
          style={{
            top: "72.05%",
            left: "41.47%",
            width: "109.69%",
            height: "78.43%",
          }}
        >
          <div
            className="shrink-0"
            style={{
              width: "78.09%",
              height: "41.97%",
              transform: "rotate(-18.75deg) skewX(46.12deg)",
              opacity: 0.8,
              backgroundImage: "linear-gradient(-1.88deg, rgb(38, 86, 171) 4.72%, rgb(7, 35, 87) 97.72%)",
            }}
          />
        </div>

        {/* ═══ Headline + CTA ═══ */}
        <div
          className="absolute"
          style={{
            left: "6.5%",
            top: "35%",
            width: "51.82%",
          }}
        >
          <p
            className="font-garet"
            style={{
              fontSize: "clamp(0.6rem, 0.85vw, 20px)",
              fontStyle: "italic",
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase" as const,
              marginBottom: "clamp(4px, 0.6vw, 14px)",
              textShadow: "0 2px 20px rgba(0,0,0,0.3)",
              background: "linear-gradient(90deg, rgba(255,255,255,0.9) 0%, rgba(200,210,225,0.6) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Nová generácia, veľké ambície
          </p>
          <h1
            className="font-garet text-white"
            style={{
              fontSize: "clamp(2rem, 5.8vw, 160px)",
              lineHeight: 1.05,
              fontWeight: 500,
              WebkitTextStroke: "1.5px white",
              fontStyle: "italic",
              textShadow: "0 4px 40px rgba(0,0,0,0.3)",
            }}
          >
            JEDEN TÝM,
            <br />
            SPOLOČNÝ
            <br />
            <span style={{ color: "#0078fd", WebkitTextStroke: "1.5px #0078fd" }}>CIEĽ.</span>
          </h1>
          <div style={{ marginTop: "clamp(12px, 1.5vw, 36px)" }}>
            <Link
              href="#aktuality"
              className="relative inline-flex items-center justify-center font-garet font-bold text-white transition-transform hover:scale-[1.03] active:scale-[0.98]"
              style={{
                background: "#d80027",
                borderRadius: "20px",
                width: "clamp(130px, 9.5vw, 280px)",
                height: "clamp(34px, 2.4vw, 68px)",
                fontSize: "clamp(11px, 1vw, 28px)",
              }}
            >
              Zistiť viac
              <svg className="ml-2" style={{ width: "clamp(12px, 0.9vw, 22px)", height: "clamp(12px, 0.9vw, 22px)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* ═══ Ticket card ═══ */}
        {nextMatch && (() => {
          const md = new Date(nextMatch.date);
          const day = md.getDate();
          const month = md.toLocaleDateString("sk-SK", { month: "long" });
          const time = md.toLocaleTimeString("sk-SK", { hour: "2-digit", minute: "2-digit" });
          const matchUrl = `/zapasy/${nextMatch.id}`;
          const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(`https://szph.sk${matchUrl}`)}`;
          const homeLogo = nextMatch.home_logo?.startsWith("flag:") ? `https://flagcdn.com/w160/${nextMatch.home_logo.replace("flag:", "")}.png` : nextMatch.home_logo;
          const awayLogo = nextMatch.away_logo?.startsWith("flag:") ? `https://flagcdn.com/w160/${nextMatch.away_logo.replace("flag:", "")}.png` : nextMatch.away_logo;
          const clean = (s: string) => s.replace(/\s*\([A-Z]{2}\)\s*$/, "").trim();

          return (
            <Link href={matchUrl} className="absolute hidden lg:flex flex-col" style={{
              right: "4%", top: "35%", width: "clamp(240px, 18vw, 340px)",
              background: "rgba(255,255,255,0.97)", borderRadius: "clamp(6px, 0.6vw, 10px)",
              boxShadow: "0 12px 40px rgba(0,0,0,0.2)", overflow: "visible",
              WebkitMaskImage: "radial-gradient(circle 10px at 0px 26%, transparent 9px, black 10px), radial-gradient(circle 10px at 100% 26%, transparent 9px, black 10px)",
              WebkitMaskComposite: "destination-in",
              maskImage: "radial-gradient(circle 10px at 0px 26%, transparent 9px, black 10px), radial-gradient(circle 10px at 100% 26%, transparent 9px, black 10px)",
              maskComposite: "intersect",
            }}>
              <div className="absolute pointer-events-none" style={{ left: "8px", right: "8px", top: "calc(26% - 1px)", height: "1px", backgroundImage: "repeating-linear-gradient(to right, rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.08) 4px, transparent 4px, transparent 8px)" }} />
              {/* Header */}
              <div style={{ padding: "clamp(12px, 1.2vw, 24px) clamp(14px, 1.4vw, 28px) clamp(8px, 0.8vw, 16px)" }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="h-2 w-2 rounded-full bg-[#0078fd] animate-pulse shrink-0" />
                  <span className="font-garet font-bold uppercase text-[#051937]" style={{ fontSize: "clamp(7px, 0.65vw, 13px)", letterSpacing: "0.12em" }}>
                    {clean(nextMatch.home_team || nextMatch.home_short || "")} vs. {clean(nextMatch.away_team || nextMatch.away_short || "")}
                  </span>
                  {nextMatch.video_url && (
                    <svg className="h-3.5 w-3.5 text-[#d80027] shrink-0 ml-auto" fill="currentColor" viewBox="0 0 24 24"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  )}
                </div>
                <p className="font-garet font-bold italic uppercase text-[#051937]" style={{ fontSize: "clamp(12px, 1.1vw, 22px)", letterSpacing: "0.06em" }}>
                  Najbližší zápas
                </p>
                <p className="text-[#012d74] mt-0.5" style={{ fontSize: "clamp(7px, 0.6vw, 12px)", lineHeight: 1.3, fontWeight: 600 }}>
                  {nextMatch.league || "Zápas"}
                </p>
              </div>

              {/* Teams */}
              <div className="flex items-center justify-center gap-4" style={{ padding: "clamp(10px, 1vw, 20px) clamp(14px, 1.4vw, 28px)" }}>
                <div className="flex flex-col items-center gap-0.5 flex-1">
                  <div className="overflow-hidden rounded-full border-2 border-[#e2e8f0]" style={{ width: "clamp(40px, 3.5vw, 70px)", height: "clamp(40px, 3.5vw, 70px)" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {homeLogo && <img src={homeLogo} alt="" className="w-full h-full object-cover" />}
                  </div>
                  <p className="font-garet font-bold text-[#051937] text-center" style={{ fontSize: "clamp(8px, 0.75vw, 15px)", marginTop: "clamp(2px, 0.3vw, 6px)" }}>{clean(nextMatch.home_short || nextMatch.home_team)}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <div style={{ width: "clamp(16px, 1.2vw, 28px)", height: "1px", background: "#012d74", opacity: 0.3 }} />
                  <span className="font-bold text-[#012d74]" style={{ fontSize: "clamp(7px, 0.6vw, 12px)" }}>VS</span>
                  <div style={{ width: "clamp(16px, 1.2vw, 28px)", height: "1px", background: "#012d74", opacity: 0.3 }} />
                </div>
                <div className="flex flex-col items-center gap-0.5 flex-1">
                  <div className="overflow-hidden rounded-full border-2 border-[#e2e8f0]" style={{ width: "clamp(40px, 3.5vw, 70px)", height: "clamp(40px, 3.5vw, 70px)" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {awayLogo && <img src={awayLogo} alt="" className="w-full h-full object-cover" />}
                  </div>
                  <p className="font-garet font-bold text-[#051937] text-center" style={{ fontSize: "clamp(8px, 0.75vw, 15px)", marginTop: "clamp(2px, 0.3vw, 6px)" }}>{clean(nextMatch.away_short || nextMatch.away_team)}</p>
                </div>
              </div>

              {/* Date/Time */}
              <div className="flex items-center" style={{ margin: "0 clamp(14px, 1.4vw, 28px)", padding: "clamp(8px, 0.8vw, 16px) 0", background: "#f8f9fa", borderRadius: "clamp(4px, 0.4vw, 6px)" }}>
                <div className="flex-1 text-center" style={{ borderRight: "1px solid rgba(1,45,116,0.1)" }}>
                  <p className="font-garet font-bold italic text-[#051937]" style={{ fontSize: "clamp(18px, 1.8vw, 36px)", lineHeight: 0.9 }}>{day}.</p>
                  <p className="font-garet font-bold italic uppercase text-[#051937]" style={{ fontSize: "clamp(7px, 0.6vw, 13px)" }}>{month}</p>
                </div>
                <div className="flex-1 text-center">
                  <p className="font-garet font-bold italic text-[#051937]" style={{ fontSize: "clamp(18px, 1.8vw, 36px)", lineHeight: 1 }}>{time}</p>
                </div>
              </div>

              {/* Venue with pin */}
              {nextMatch.venue && (
                <div className="flex items-center justify-center gap-1.5" style={{ margin: "clamp(6px, 0.6vw, 12px) clamp(14px, 1.4vw, 28px) 0" }}>
                  <svg className="shrink-0 text-[#94a3b8]" style={{ width: "clamp(10px, 0.8vw, 14px)", height: "clamp(10px, 0.8vw, 14px)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" />
                  </svg>
                  <span className="font-semibold text-[#64748b]" style={{ fontSize: "clamp(7px, 0.6vw, 11px)" }}>{nextMatch.venue}</span>
                </div>
              )}

              {/* Footer — QR + Detail */}
              <div style={{ padding: "clamp(10px, 1vw, 20px) clamp(14px, 1.4vw, 28px)", borderTop: "1px solid rgba(0,0,0,0.06)", marginTop: "clamp(8px, 0.8vw, 16px)" }}>
                <div className="flex items-center gap-3">
                  <div style={{ width: "clamp(36px, 3vw, 56px)", height: "clamp(36px, 3vw, 56px)" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={qrUrl} alt="QR" className="w-full h-full object-contain" style={{ borderRadius: "4px" }} />
                  </div>
                  <div className="flex items-center gap-2 flex-1" style={{ borderLeft: "1px solid rgba(0,0,0,0.08)", paddingLeft: "clamp(8px, 0.8vw, 16px)" }}>
                    <p className="font-garet font-bold text-[#051937]" style={{ fontSize: "clamp(8px, 0.75vw, 15px)" }}>Detail zápasu</p>
                    <svg className="shrink-0 text-[#0078fd]" style={{ width: "clamp(10px, 0.8vw, 16px)", height: "clamp(10px, 0.8vw, 16px)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          );
        })()}
      </section>{/* end desktop hero */}
    </div>
  );
}
