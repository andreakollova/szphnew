import Image from "next/image";
import Link from "next/link";

/*
  Hero banner — Figma frame 19:1157
  Design: 3022 × 1578
  Blue decorative SVGs positioned from Figma insets.
  Bottom stripes use CSS gradients with transforms.
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
            height: "47%",
            opacity: 0.5,
            background: "linear-gradient(to top, rgba(0,5,20,1) 0%, rgba(0,5,20,0.8) 30%, transparent 100%)",
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

        {/* ═══ Headline ═══ */}
        <div
          className="absolute"
          style={{
            left: "9.73%",
            top: "41.51%",
            width: "51.82%",
          }}
        >
          <h1
            className="font-garet italic text-white"
            style={{
              fontSize: "clamp(1.4rem, 5.96vw, 180px)",
              lineHeight: 1.22,
              fontWeight: 400,
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
            top: "71.67%",
          }}
        >
          <Link
            href="/o-nas"
            className="relative inline-flex items-center justify-center font-garet font-bold text-white transition-transform hover:scale-[1.03] active:scale-[0.98]"
            style={{
              background: "#d80027",
              borderRadius: "clamp(22px, 1.72vw, 52px)",
              width: "clamp(160px, 14.43vw, 436px)",
              height: "clamp(40px, 3.53vw, 106.6px)",
              fontSize: "clamp(14px, 1.49vw, 45px)",
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
            top: "36.95%",
            width: "16.88%",
            height: "45.15%",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero-card-shape.svg"
            alt=""
            className="absolute inset-0 w-full h-full"
            style={{ filter: "drop-shadow(0 8px 30px rgba(0,0,0,0.18))" }}
          />

          {/* NAJBLIŽŠÍ ZÁPAS */}
          <p className="absolute font-garet font-bold" style={{ left: "7.42%", top: "8.25%", fontSize: "clamp(6px, 0.82vw, 25px)", letterSpacing: "0.08em", color: "#2a2a72" }}>
            NAJBLIŽŠÍ ZÁPAS
          </p>

          {/* 15 */}
          <p className="absolute font-garet font-bold" style={{ left: "7.62%", top: "18.03%", fontSize: "clamp(18px, 2.27vw, 69px)", lineHeight: 0.88, color: "#072357" }}>
            15
          </p>

          {/* JÚN */}
          <p className="absolute font-garet font-bold" style={{ left: "25.88%", top: "23.13%", fontSize: "clamp(6px, 0.82vw, 25px)", color: "#2a2a72" }}>
            JÚN
          </p>

          {/* 15:00 */}
          <p className="absolute font-garet font-bold" style={{ left: "25.88%", top: "28.10%", fontSize: "clamp(10px, 1.27vw, 38px)", lineHeight: 1, color: "rgba(0,82,255,0.8)" }}>
            15:00
          </p>

          {/* QR */}
          <div className="absolute overflow-hidden bg-white" style={{ left: "56.15%", top: "11.95%", width: "31.25%", height: "22.37%", borderRadius: "clamp(4px, 0.66vw, 20px)" }}>
            <Image src="/images/qr-eurohockey.png" alt="QR" width={160} height={160} className="w-full h-full object-cover" style={{ borderRadius: "clamp(4px, 0.66vw, 20px)" }} />
          </div>

          {/* Top divider */}
          <div className="absolute" style={{ left: "7.42%", top: "38.10%", width: "84.08%", height: "1px", background: "rgba(0,0,0,0.1)" }} />

          {/* SK */}
          <div className="absolute overflow-hidden rounded-full" style={{ left: "8.30%", top: "44.74%", width: "13.96%", height: "9.99%" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://flagcdn.com/w80/sk.png" alt="SK" className="w-full h-full object-cover" />
          </div>
          <p className="absolute font-garet font-bold" style={{ left: "27.25%", top: "45.15%", fontSize: "clamp(8px, 0.98vw, 30px)", color: "#20204d" }}>Slovensko</p>
          <p className="absolute font-garet font-bold" style={{ left: "27.25%", top: "50.60%", fontSize: "clamp(6px, 0.74vw, 22px)", color: "#9a9a9f" }}>MUŽI</p>

          {/* VS */}
          <div className="absolute" style={{ left: "8.30%", top: "60.39%", width: "30.66%", height: "1px", background: "rgba(0,0,0,0.08)" }} />
          <p className="absolute font-garet font-bold" style={{ left: "44.53%", top: "58.51%", fontSize: "clamp(6px, 0.74vw, 22px)", color: "#9a9a9f" }}>VS</p>
          <div className="absolute" style={{ left: "56.64%", top: "60.39%", width: "30.66%", height: "1px", background: "rgba(0,0,0,0.08)" }} />

          {/* HR */}
          <div className="absolute overflow-hidden rounded-full" style={{ left: "8.98%", top: "66.46%", width: "13.96%", height: "9.99%" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://flagcdn.com/w80/hr.png" alt="HR" className="w-full h-full object-cover" />
          </div>
          <p className="absolute font-garet font-bold" style={{ left: "27.83%", top: "67.81%", fontSize: "clamp(8px, 0.98vw, 30px)", color: "#20204d" }}>Chorvátsko</p>
          <p className="absolute font-garet font-bold" style={{ left: "27.25%", top: "72.63%", fontSize: "clamp(6px, 0.74vw, 22px)", color: "#9a9a9f" }}>MUŽI</p>

          {/* Bottom divider */}
          <div className="absolute" style={{ left: "7.42%", top: "80%", width: "84.08%", height: "1px", background: "rgba(0,0,0,0.1)" }} />

          {/* Eurohockey 5s */}
          <p className="absolute font-garet font-bold" style={{ left: "7.42%", top: "87.45%", fontSize: "clamp(8px, 0.98vw, 30px)", color: "#9a9a9f" }}>Eurohockey 5s</p>
          <svg className="absolute" style={{ left: "83.69%", top: "89.33%", width: "clamp(8px, 0.6vw, 18px)", height: "clamp(8px, 0.6vw, 18px)" }} fill="none" viewBox="0 0 24 24" stroke="#9a9a9f" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </section>
    </div>
  );
}
