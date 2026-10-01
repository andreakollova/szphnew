"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const HERO_IMAGES = [
  "/images/hero-banner3.png",
  "/images/hero-banner3b.png",
  "/images/hero-banner2.png",
  "/images/hero-banner4.png",
  "/images/hero-banner7.png",
  "/images/hero-banner.png",
];

export function SzphHero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="-mt-16 md:-mt-[112px]">
      <section
        data-hero
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "3022 / 1578" }}
      >
        {/* ═══ Background photos — fade rotation ═══ */}
        {HERO_IMAGES.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt="SZPH"
            fill
            className="object-cover"
            style={{
              objectPosition: "center 55%",
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
            backgroundImage: "url(/images/hero-overlay.png)",
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
              href="/o-nas"
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
        <div
          className="absolute hidden lg:flex flex-col"
          style={{
            right: "4%",
            top: "35%",
            width: "clamp(240px, 18vw, 340px)",
            background: "rgba(255,255,255,0.97)",
            borderRadius: "clamp(12px, 1vw, 20px)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
            overflow: "visible",
            WebkitMaskImage: "radial-gradient(circle 10px at 0px 26%, transparent 9px, black 10px), radial-gradient(circle 10px at 100% 26%, transparent 9px, black 10px)",
            WebkitMaskComposite: "destination-in",
            maskImage: "radial-gradient(circle 10px at 0px 26%, transparent 9px, black 10px), radial-gradient(circle 10px at 100% 26%, transparent 9px, black 10px)",
            maskComposite: "intersect",
          }}
        >
          {/* Dashed line between notches */}
          <div className="absolute pointer-events-none" style={{
            left: "8px", right: "8px", top: "calc(26% - 1px)",
            height: "1px",
            backgroundImage: "repeating-linear-gradient(to right, rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.08) 4px, transparent 4px, transparent 8px)",
          }} />
          {/* Header */}
          <div style={{ padding: "clamp(12px, 1.2vw, 24px) clamp(14px, 1.4vw, 28px) clamp(8px, 0.8vw, 16px)" }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-[#0078fd] animate-pulse shrink-0" />
              <span className="font-garet font-bold uppercase text-[#051937]" style={{ fontSize: "clamp(7px, 0.65vw, 13px)", letterSpacing: "0.12em" }}>
                Najbližší zápas
              </span>
            </div>
            <p className="font-garet font-bold uppercase text-[#051937]" style={{ fontSize: "clamp(12px, 1.1vw, 22px)", letterSpacing: "0.06em" }}>
              Reprezentácia <span className="text-[#94a3b8] mx-0.5">&#x2502;</span> M
            </p>
            <p className="text-[#64748b] mt-0.5" style={{ fontSize: "clamp(7px, 0.6vw, 12px)", lineHeight: 1.3, fontWeight: 600 }}>
              EuroHockey 5s Championship Men 2026
            </p>
          </div>

          {/* Teams */}
          <div className="flex items-center justify-center gap-4" style={{ padding: "clamp(10px, 1vw, 20px) clamp(14px, 1.4vw, 28px)" }}>
            {/* SK */}
            <div className="flex flex-col items-center gap-1.5 flex-1">
              <div className="overflow-hidden rounded-full border-2 border-[#e2e8f0]" style={{ width: "clamp(40px, 3.5vw, 70px)", height: "clamp(40px, 3.5vw, 70px)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://flagcdn.com/w160/sk.png" alt="SK" className="w-full h-full object-cover" />
              </div>
              <p className="font-garet font-bold text-[#051937] text-center" style={{ fontSize: "clamp(8px, 0.75vw, 15px)" }}>Slovensko</p>
              <p className="font-bold uppercase text-[#94a3b8]" style={{ fontSize: "clamp(5px, 0.5vw, 10px)", letterSpacing: "0.1em" }}>Muži</p>
            </div>

            {/* VS */}
            <div className="flex items-center gap-2 shrink-0">
              <div style={{ width: "clamp(16px, 1.2vw, 28px)", height: "1px", background: "rgba(0,0,0,0.1)" }} />
              <span className="font-bold text-[#94a3b8]" style={{ fontSize: "clamp(7px, 0.6vw, 12px)" }}>VS</span>
              <div style={{ width: "clamp(16px, 1.2vw, 28px)", height: "1px", background: "rgba(0,0,0,0.1)" }} />
            </div>

            {/* HR */}
            <div className="flex flex-col items-center gap-1.5 flex-1">
              <div className="overflow-hidden rounded-full border-2 border-[#e2e8f0]" style={{ width: "clamp(40px, 3.5vw, 70px)", height: "clamp(40px, 3.5vw, 70px)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://flagcdn.com/w160/hr.png" alt="HR" className="w-full h-full object-cover" />
              </div>
              <p className="font-garet font-bold text-[#051937] text-center" style={{ fontSize: "clamp(8px, 0.75vw, 15px)" }}>Chorvátsko</p>
              <p className="font-bold uppercase text-[#94a3b8]" style={{ fontSize: "clamp(5px, 0.5vw, 10px)", letterSpacing: "0.1em" }}>Muži</p>
            </div>
          </div>

          {/* Date/Time */}
          <div className="flex items-center" style={{ margin: "0 clamp(14px, 1.4vw, 28px)", padding: "clamp(8px, 0.8vw, 16px) 0", background: "#f0f4fa", borderRadius: "clamp(6px, 0.5vw, 10px)" }}>
            <div className="flex-1 text-center" style={{ borderRight: "1px solid rgba(1,45,116,0.1)" }}>
              <p className="font-garet font-bold text-[#051937]" style={{ fontSize: "clamp(18px, 1.8vw, 36px)", lineHeight: 0.9 }}>15.</p>
              <p className="font-garet font-bold uppercase text-[#051937]" style={{ fontSize: "clamp(7px, 0.6vw, 13px)" }}>Jún</p>
            </div>
            <div className="flex-1 text-center">
              <p className="font-garet font-bold text-[#051937]" style={{ fontSize: "clamp(18px, 1.8vw, 36px)", lineHeight: 1 }}>15:00</p>
            </div>
          </div>

          {/* Footer — QR + Detail */}
          <div style={{ padding: "clamp(10px, 1vw, 20px) clamp(14px, 1.4vw, 28px)", borderTop: "1px solid rgba(0,0,0,0.06)", marginTop: "clamp(8px, 0.8vw, 16px)" }}>
            <div className="flex items-center gap-3">
              <div style={{ width: "clamp(36px, 3vw, 56px)", height: "clamp(36px, 3vw, 56px)" }}>
                <Image src="/images/qr-eurohockey.png" alt="QR" width={56} height={56} className="w-full h-full object-contain" />
              </div>
              <div className="flex items-center gap-2 flex-1" style={{ borderLeft: "1px solid rgba(0,0,0,0.08)", paddingLeft: "clamp(8px, 0.8vw, 16px)" }}>
                <p className="font-garet font-bold text-[#051937]" style={{ fontSize: "clamp(8px, 0.75vw, 15px)" }}>Detail zápasu</p>
                <svg className="shrink-0 text-[#0078fd]" style={{ width: "clamp(10px, 0.8vw, 16px)", height: "clamp(10px, 0.8vw, 16px)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
