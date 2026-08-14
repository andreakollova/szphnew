import Image from "next/image";
import Link from "next/link";

/*
  Hero banner — Figma frame 19:1157 "Banner Web test"
  Design: 3022 × 1578
*/

export function SzphHero() {
  return (
    <div className="-mt-16 md:-mt-[112px]">
      <section
        data-hero
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "3022 / 1578" }}
      >
        {/* ═══ Background photo ═══ */}
        <Image
          src="/images/hero-banner.png"
          alt="SZPH"
          fill
          className="object-cover"
          style={{ objectPosition: "center 55%" }}
          priority
          quality={90}
          sizes="100vw"
        />

        {/* ═══ Top vignette ═══ */}
        <div
          className="absolute top-0 left-0 right-0 pointer-events-none"
          style={{
            height: "19.33%",
            opacity: 0.5,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)",
          }}
        />

        {/* ═══ Bottom dark gradient ═══ */}
        <div
          className="absolute left-0 right-0 bottom-0 pointer-events-none"
          style={{
            height: "47.34%",
            opacity: 0.5,
            background: "linear-gradient(to top, rgba(0,5,20,1) 0%, rgba(0,5,20,0.8) 30%, transparent 100%)",
          }}
        />

        {/* ═══ Decorative SVG shapes ═══ */}

        {/* Shape 1 — right sweep (node 1160) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-shape1.svg"
          alt=""
          className="absolute pointer-events-none"
          style={{
            top: "54.15%",
            left: "20.61%",
            width: "100%",
            height: "43.71%",
            transform: "rotate(-20.82deg) skewX(46.46deg)",
            transformOrigin: "center center",
          }}
        />

        {/* Shape 2 — left sweep (node 1161) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-shape2.svg"
          alt=""
          className="absolute pointer-events-none"
          style={{
            top: "29.91%",
            left: "-28.79%",
            width: "54.69%",
            height: "93.17%",
            opacity: 0.8,
          }}
        />

        {/* Shape 3 — left sweep lower (node 1162) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-shape3.svg"
          alt=""
          className="absolute pointer-events-none"
          style={{
            top: "37.12%",
            left: "-32.33%",
            width: "66.89%",
            height: "109.33%",
          }}
        />

        {/* ═══ Blue diagonal stripes at bottom ═══ */}

        {/* Stripe 1 — gentlest (node 1163) */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: "-15%",
            right: "-15%",
            height: "55%",
            bottom: "-30%",
            transform: "rotate(-3.5deg)",
            transformOrigin: "center center",
            opacity: 0.8,
            backgroundImage: "linear-gradient(-1deg, rgb(38, 86, 171) 5%, rgb(7, 35, 87) 98%)",
          }}
        />

        {/* Stripe 2 (node 1164) */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: "-10%",
            right: "-20%",
            height: "55%",
            bottom: "-33%",
            transform: "rotate(-4.5deg)",
            transformOrigin: "center center",
            opacity: 0.8,
            backgroundImage: "linear-gradient(-1.3deg, rgb(38, 86, 171) 5%, rgb(7, 35, 87) 98%)",
          }}
        />

        {/* Stripe 3 (node 1165) */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: "0%",
            right: "-30%",
            height: "55%",
            bottom: "-35%",
            transform: "rotate(-5.5deg)",
            transformOrigin: "center center",
            opacity: 0.7,
            backgroundImage: "linear-gradient(-1.5deg, rgb(38, 86, 171) 5%, rgb(7, 35, 87) 98%)",
          }}
        />

        {/* Stripe 4 — steepest (node 1166) */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: "20%",
            right: "-50%",
            height: "55%",
            bottom: "-37%",
            transform: "rotate(-7deg)",
            transformOrigin: "center center",
            opacity: 0.8,
            backgroundImage: "linear-gradient(-1.9deg, rgb(38, 86, 171) 5%, rgb(7, 35, 87) 98%)",
          }}
        />

        {/* ═══ Headline ═══ */}
        <div
          className="absolute"
          style={{
            left: "9.73%",
            top: "41.19%",
            width: "51.82%",
          }}
        >
          <h1
            className="font-garet font-bold italic text-white uppercase"
            style={{
              fontSize: "clamp(1.4rem, 4.2vw, 128px)",
              lineHeight: 1.22,
              letterSpacing: "0.03em",
              textShadow: "0 4px 40px rgba(0,0,0,0.3)",
            }}
          >
            Jeden tím,
            <br />
            spoločný cieľ
          </h1>
        </div>

        {/* ═══ CTA Button ═══ */}
        <div
          className="absolute"
          style={{
            left: "9.73%",
            top: "73%",
          }}
        >
          <Link
            href="/o-nas"
            className="relative inline-flex items-center justify-center font-garet font-bold text-white transition-transform hover:scale-[1.03] active:scale-[0.98]"
            style={{
              background: "#d80027",
              borderRadius: "clamp(18px, 1.4vw, 42px)",
              padding: "clamp(10px, 1.1vw, 18px) clamp(20px, 2vw, 40px)",
              fontSize: "clamp(12px, 1.1vw, 32px)",
            }}
          >
            Zistiť viac
          </Link>
        </div>

        {/* ═══ Ticket card ═══ */}
        <div
          className="absolute hidden lg:block"
          style={{
            left: "77.04%",
            top: "36.67%",
            width: "16.88%",
            height: "45.15%",
          }}
        >
          {/* Ticket SVG shape */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero-card-shape.svg"
            alt=""
            className="absolute inset-0 w-full h-full"
            style={{ filter: "drop-shadow(0 8px 30px rgba(0,0,0,0.18))" }}
          />

          {/* Card content */}

          {/* NAJBLIŽŠÍ ZÁPAS */}
          <p
            className="absolute font-garet font-bold"
            style={{
              left: "7.42%",
              top: "8.25%",
              fontSize: "clamp(6px, 0.82vw, 25px)",
              letterSpacing: "0.08em",
              color: "#2a2a72",
            }}
          >
            NAJBLIŽŠÍ ZÁPAS
          </p>

          {/* 15 — day */}
          <p
            className="absolute font-garet font-bold"
            style={{
              left: "7.62%",
              top: "18.03%",
              fontSize: "clamp(18px, 2.27vw, 69px)",
              lineHeight: 0.88,
              color: "#072357",
            }}
          >
            15
          </p>

          {/* JÚN */}
          <p
            className="absolute font-garet font-bold"
            style={{
              left: "25.88%",
              top: "23.13%",
              fontSize: "clamp(6px, 0.82vw, 25px)",
              color: "#2a2a72",
            }}
          >
            JÚN
          </p>

          {/* 15:00 */}
          <p
            className="absolute font-garet font-bold"
            style={{
              left: "25.88%",
              top: "28.10%",
              fontSize: "clamp(10px, 1.27vw, 38px)",
              lineHeight: 1,
              color: "rgba(0,82,255,0.8)",
            }}
          >
            15:00
          </p>

          {/* QR code */}
          <div
            className="absolute overflow-hidden bg-white"
            style={{
              left: "56.15%",
              top: "11.95%",
              width: "31.25%",
              height: "22.37%",
              borderRadius: "clamp(4px, 0.66vw, 20px)",
            }}
          >
            <Image
              src="/images/qr-eurohockey.png"
              alt="QR kód eurohockey.org"
              width={160}
              height={160}
              className="w-full h-full object-cover"
              style={{ borderRadius: "clamp(4px, 0.66vw, 20px)" }}
            />
          </div>

          {/* Divider top */}
          <div className="absolute" style={{ left: "7.42%", top: "38.10%", width: "84.08%", height: "1px", background: "rgba(0,0,0,0.1)" }} />

          {/* SK flag */}
          <div className="absolute overflow-hidden rounded-full" style={{ left: "8.30%", top: "44.74%", width: "13.96%", height: "9.99%" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://flagcdn.com/w80/sk.png" alt="SK" className="w-full h-full object-cover" />
          </div>

          {/* Slovensko */}
          <p className="absolute font-garet font-bold" style={{ left: "27.25%", top: "45.15%", fontSize: "clamp(8px, 0.98vw, 30px)", color: "#20204d" }}>
            Slovensko
          </p>
          <p className="absolute font-garet font-bold" style={{ left: "27.25%", top: "50.60%", fontSize: "clamp(6px, 0.74vw, 22px)", color: "#9a9a9f" }}>
            MUŽI
          </p>

          {/* VS lines + text */}
          <div className="absolute" style={{ left: "8.30%", top: "60.39%", width: "30.66%", height: "1px", background: "rgba(0,0,0,0.08)" }} />
          <p className="absolute font-garet font-bold" style={{ left: "44.53%", top: "58.51%", fontSize: "clamp(6px, 0.74vw, 22px)", color: "#9a9a9f" }}>VS</p>
          <div className="absolute" style={{ left: "56.64%", top: "60.39%", width: "30.66%", height: "1px", background: "rgba(0,0,0,0.08)" }} />

          {/* HR flag */}
          <div className="absolute overflow-hidden rounded-full" style={{ left: "8.98%", top: "66.46%", width: "13.96%", height: "9.99%" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://flagcdn.com/w80/hr.png" alt="HR" className="w-full h-full object-cover" />
          </div>

          {/* Chorvátsko */}
          <p className="absolute font-garet font-bold" style={{ left: "27.83%", top: "67.81%", fontSize: "clamp(8px, 0.98vw, 30px)", color: "#20204d" }}>
            Chorvátsko
          </p>
          <p className="absolute font-garet font-bold" style={{ left: "27.25%", top: "72.63%", fontSize: "clamp(6px, 0.74vw, 22px)", color: "#9a9a9f" }}>
            MUŽI
          </p>

          {/* Bottom divider */}
          <div className="absolute" style={{ left: "7.42%", top: "80%", width: "84.08%", height: "1px", background: "rgba(0,0,0,0.1)" }} />

          {/* Eurohockey 5s + arrow */}
          <p className="absolute font-garet font-bold" style={{ left: "7.42%", top: "87.45%", fontSize: "clamp(8px, 0.98vw, 30px)", color: "#9a9a9f" }}>
            Eurohockey 5s
          </p>
          <svg className="absolute" style={{ left: "83.69%", top: "89.33%", width: "clamp(8px, 0.6vw, 18px)", height: "clamp(8px, 0.6vw, 18px)" }} fill="none" viewBox="0 0 24 24" stroke="#9a9a9f" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </section>
    </div>
  );
}
