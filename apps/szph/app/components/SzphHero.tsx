import Image from "next/image";
import Link from "next/link";

/*
  Pixel-perfect hero based on Figma frame 19:1157 "Banner Web test"
  Design dimensions: 3022 × 1590
  All positions converted to percentages of the container.
*/

export function SzphHero() {
  return (
    <div className="-mt-16 md:-mt-[112px]">
      <section
        data-hero
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "3022 / 1590" }}
      >
        {/* ═══ Background image (bannernew 1) ═══ */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: 0,
            top: "-37.3%",       /* -593/1590 */
            width: "100%",
            height: "138.43%",   /* 2201/1590 */
          }}
        >
          <Image
            src="/images/hero-banner.png"
            alt="SZPH"
            fill
            className="object-cover"
            priority
            quality={90}
            sizes="100vw"
          />
        </div>

        {/* ═══ Bottom dark gradient overlay ═══ */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: 0,
            top: "53.02%",     /* 843/1590 */
            width: "100%",
            height: "46.98%",  /* 747/1590 */
            opacity: 0.5,
          }}
        >
          <Image
            src="/images/hero-banner.png"
            alt=""
            fill
            className="object-cover"
            style={{ filter: "brightness(0)" }}
            sizes="1px"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,10,30,0.95) 0%, transparent 100%)" }} />
        </div>

        {/* ═══ Top vignette gradient (Rectangle4 rotated 180°) ═══ */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: 0,
            top: 0,
            width: "100%",
            height: "19.18%",  /* 305/1590 */
            opacity: 0.5,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%)",
          }}
        />

        {/* ═══ Decorative angular shapes (subtle blue) ═══ */}

        {/* Shape — right sweep (node 1160) */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "54.15%",
            left: "20.61%",
            right: "-21.07%",
            bottom: "-29.06%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "80%",
              height: "25%",
              transform: "rotate(-20.82deg) skewX(46.46deg)",
              background: "linear-gradient(135deg, rgba(38,86,171,0.12) 0%, rgba(7,35,87,0.06) 100%)",
            }}
          />
        </div>

        {/* Shape — left sweep 1 (node 1161) */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "29.91%",
            left: "-28.79%",
            right: "2.95%",
            bottom: "-23.86%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "40%",
              height: "55%",
              transform: "rotate(25.83deg) skewX(-45.96deg)",
              background: "linear-gradient(135deg, rgba(38,86,171,0.1) 0%, rgba(7,35,87,0.05) 100%)",
            }}
          />
        </div>

        {/* Shape — left sweep 2 (node 1162) */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "37.12%",
            left: "-32.33%",
            right: "5.46%",
            bottom: "-36.2%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "50%",
              height: "45%",
              transform: "rotate(17.9deg) skewX(-45.86deg)",
              background: "linear-gradient(135deg, rgba(38,86,171,0.08) 0%, rgba(7,35,87,0.04) 100%)",
            }}
          />
        </div>

        {/* ═══ Blue diagonal stripes at bottom ═══ */}

        {/* Stripe 1 (node 1163) — gentlest angle */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "74.47%",       /* 1184/1590 */
            right: "-14.51%",    /* -438.47/3022 */
            bottom: "-34.13%",   /* -542.71/1590 */
            left: "-9.81%",      /* -296.51/3022 */
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              transform: "rotate(-8.39deg) skewX(34.41deg)",
              opacity: 0.8,
              backgroundImage: "linear-gradient(-1.08deg, rgb(38, 86, 171) 4.72%, rgb(7, 35, 87) 97.72%)",
            }}
          />
        </div>

        {/* Stripe 2 (node 1164) */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "72.64%",
            right: "-21.01%",
            bottom: "-40.71%",
            left: "2.55%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              transform: "rotate(-12.51deg) skewX(41.82deg)",
              opacity: 0.8,
              backgroundImage: "linear-gradient(-1.34deg, rgb(38, 86, 171) 4.72%, rgb(7, 35, 87) 97.72%)",
            }}
          />
        </div>

        {/* Stripe 3 (node 1165) */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "73.24%",
            right: "-31.33%",
            bottom: "-43.72%",
            left: "16.89%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              transform: "rotate(-14.15deg) skewX(43.57deg)",
              opacity: 0.7,
              backgroundImage: "linear-gradient(-1.53deg, rgb(38, 86, 171) 4.72%, rgb(7, 35, 87) 97.72%)",
            }}
          />
        </div>

        {/* Stripe 4 (node 1166) — steepest angle */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "71.50%",
            right: "-51.03%",
            bottom: "-49.11%",
            left: "41.47%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              transform: "rotate(-18.75deg) skewX(46.12deg)",
              opacity: 0.8,
              backgroundImage: "linear-gradient(-1.88deg, rgb(38, 86, 171) 4.72%, rgb(7, 35, 87) 97.72%)",
            }}
          />
        </div>

        {/* ═══ Ellipse decoration (node 1200) ═══ */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: "73.19%",
            top: "97.72%",
            width: "35.65%",
            height: "24.01%",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              border: "2px solid rgba(255,255,255,0.08)",
              transform: "rotate(-15.15deg)",
            }}
          />
        </div>

        {/* ═══ Ticket card (Subtract — node 1169) ═══ */}
        <div
          className="absolute hidden lg:block"
          style={{
            left: "77.04%",    /* 2328/3022 */
            top: "36.67%",     /* 583/1590 */
            width: "16.88%",   /* 510/3022 */
            height: "44.82%",  /* 712.608/1590 */
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

          {/* ── Card content overlay ── */}

          {/* NAJBLIŽŠÍ ZÁPAS */}
          <p
            className="absolute font-garet font-bold"
            style={{
              left: "7.42%",     /* 37.85/510 */
              top: "8.25%",      /* 58.77/712.608 */
              fontSize: "clamp(6px, 0.82vw, 25px)",
              letterSpacing: "0.08em",
              color: "#2a2a72",
            }}
          >
            NAJBLIŽŠÍ ZÁPAS
          </p>

          {/* 15 — big day number */}
          <p
            className="absolute font-garet font-bold"
            style={{
              left: "7.62%",     /* 38.85/510 */
              top: "18.03%",     /* 128.5/712.608 */
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
              left: "25.88%",    /* 131.98/510 */
              top: "23.13%",     /* 164.85/712.608 */
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
              top: "28.10%",     /* 200.21/712.608 */
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
              left: "56.15%",    /* 286.38/510 */
              top: "11.95%",     /* 85.17/712.608 */
              width: "31.25%",   /* 159.375/510 */
              height: "22.37%",  /* 159.375/712.608 */
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

          {/* Horizontal divider (node 1189) */}
          <div
            className="absolute"
            style={{
              left: "7.42%",
              top: "38.10%",     /* 271.44/712.608 */
              width: "84.08%",   /* 428.818/510 */
              height: "1px",
              background: "rgba(0,0,0,0.1)",
            }}
          />

          {/* SK flag */}
          <div
            className="absolute overflow-hidden rounded-full"
            style={{
              left: "8.30%",     /* 42.33/510 */
              top: "44.74%",     /* 318.75/712.608 */
              width: "13.96%",   /* 71.221/510 */
              height: "9.99%",   /* 71.221/712.608 */
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://flagcdn.com/w80/sk.png"
              alt="SK"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Slovensko */}
          <p
            className="absolute font-garet font-bold"
            style={{
              left: "27.25%",    /* 138.96/510 */
              top: "45.15%",     /* 321.74/712.608 */
              fontSize: "clamp(8px, 0.98vw, 30px)",
              color: "#20204d",
            }}
          >
            Slovensko
          </p>

          {/* MUŽI (after SK) */}
          <p
            className="absolute font-garet font-bold"
            style={{
              left: "27.25%",
              top: "50.60%",     /* 360.59/712.608 */
              fontSize: "clamp(6px, 0.74vw, 22px)",
              color: "#9a9a9f",
            }}
          >
            MUŽI
          </p>

          {/* VS line left (node 1187) */}
          <div
            className="absolute"
            style={{
              left: "8.30%",
              top: "60.39%",     /* 430.31/712.608 */
              width: "30.66%",   /* 156.387/510 */
              height: "1px",
              background: "rgba(0,0,0,0.08)",
            }}
          />

          {/* VS text (node 1182) */}
          <p
            className="absolute font-garet font-bold"
            style={{
              left: "44.53%",    /* 227.11/510 */
              top: "58.51%",     /* 416.87/712.608 */
              fontSize: "clamp(6px, 0.74vw, 22px)",
              color: "#9a9a9f",
            }}
          >
            VS
          </p>

          {/* VS line right (node 1188) */}
          <div
            className="absolute"
            style={{
              left: "56.64%",    /* 288.87/510 */
              top: "60.39%",
              width: "30.66%",
              height: "1px",
              background: "rgba(0,0,0,0.08)",
            }}
          />

          {/* Decorative line (node 1168) — small angled line near VS */}
          <div
            className="absolute"
            style={{
              left: "43.80%",    /* (2551.36-2328)/510 */
              top: "59.89%",     /* (1009.71-583)/712.608 */
              width: "27.06%",   /* 137.996/510 */
              height: "1px",
              background: "rgba(0,0,0,0.06)",
            }}
          />

          {/* HR flag */}
          <div
            className="absolute overflow-hidden rounded-full"
            style={{
              left: "8.98%",     /* 45.82/510 */
              top: "66.46%",     /* 473.64/712.608 */
              width: "13.96%",
              height: "9.99%",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://flagcdn.com/w80/hr.png"
              alt="HR"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Chorvátsko */}
          <p
            className="absolute font-garet font-bold"
            style={{
              left: "27.83%",    /* 141.94/510 */
              top: "67.81%",     /* 483.11/712.608 */
              fontSize: "clamp(8px, 0.98vw, 30px)",
              color: "#20204d",
            }}
          >
            Chorvátsko
          </p>

          {/* MUŽI (after HR) */}
          <p
            className="absolute font-garet font-bold"
            style={{
              left: "27.25%",
              top: "72.63%",     /* 517.47/712.608 */
              fontSize: "clamp(6px, 0.74vw, 22px)",
              color: "#9a9a9f",
            }}
          >
            MUŽI
          </p>

          {/* Bottom divider (implicit — between MUŽI and Eurohockey) */}
          <div
            className="absolute"
            style={{
              left: "7.42%",
              top: "80%",
              width: "84.08%",
              height: "1px",
              background: "rgba(0,0,0,0.1)",
            }}
          />

          {/* Eurohockey 5s */}
          <p
            className="absolute font-garet font-bold"
            style={{
              left: "7.42%",
              top: "87.45%",     /* 623.06/712.608 */
              fontSize: "clamp(8px, 0.98vw, 30px)",
              color: "#9a9a9f",
            }}
          >
            Eurohockey 5s
          </p>

          {/* Arrow icon (node 1194) */}
          <svg
            className="absolute"
            style={{
              left: "83.69%",    /* 426.83/510 */
              top: "89.33%",     /* 636.5/712.608 */
              width: "clamp(8px, 0.6vw, 18px)",
              height: "clamp(8px, 0.6vw, 18px)",
            }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="#9a9a9f"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>

        {/* ═══ Headline text (node 1196) ═══ */}
        <div
          className="absolute"
          style={{
            left: "9.73%",     /* 294/3022 */
            top: "41.19%",     /* 655/1590 */
            width: "51.82%",   /* 1566/3022 */
          }}
        >
          <h1
            className="font-garet font-bold italic text-white"
            style={{
              fontSize: "clamp(1.6rem, 5.96vw, 180px)",
              lineHeight: 1.228,  /* 221/180 */
              textShadow: "0 4px 40px rgba(0,0,0,0.3)",
            }}
          >
            Jeden tím,
            <br />
            spoločný cieľ
          </h1>
        </div>

        {/* ═══ CTA Button (nodes 1197-1199) ═══ */}
        <div
          className="absolute"
          style={{
            left: "9.73%",     /* 294/3022 */
            top: "71.13%",     /* 1131/1590 */
          }}
        >
          <Link
            href="/o-nas"
            className="relative inline-flex items-center justify-center font-garet font-bold text-white transition-transform hover:scale-[1.03] active:scale-[0.98]"
            style={{
              background: "#d80027",
              borderRadius: "clamp(22px, 1.72vw, 52px)",
              width: "clamp(180px, 14.43vw, 436px)",
              height: "clamp(44px, 3.53vw, 106.6px)",
              fontSize: "clamp(14px, 1.49vw, 45px)",
            }}
          >
            Zistiť viac
          </Link>
        </div>
      </section>
    </div>
  );
}
