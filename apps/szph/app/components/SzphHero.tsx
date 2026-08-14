import Image from "next/image";
import Link from "next/link";

export function SzphHero() {
  return (
    <div className="-mt-16 md:-mt-[112px]">
      <section data-hero className="relative w-full overflow-hidden" style={{ minHeight: "clamp(500px, 52vw, 820px)" }}>
        {/* Background image */}
        <Image
          src="/images/hero-banner.png"
          alt="SZPH"
          fill
          className="object-cover object-[center_25%]"
          priority
          quality={90}
          sizes="100vw"
        />

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(5,15,35,0.55) 0%, rgba(5,15,35,0.3) 50%, rgba(5,15,35,0.15) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,15,35,0.6) 0%, transparent 40%)" }} />

        {/* Content */}
        <div className="relative z-10 flex items-end h-full px-6 lg:px-10 xl:px-16 max-w-[1600px] mx-auto" style={{ minHeight: "clamp(500px, 52vw, 820px)", paddingBottom: "clamp(80px, 8vw, 140px)", paddingTop: "160px" }}>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between w-full gap-8 lg:gap-12">

            {/* Left — headline + CTA */}
            <div className="flex-1 max-w-[820px]">
              <h1
                className="font-garet font-bold italic text-white leading-[1.15]"
                style={{ fontSize: "clamp(2.2rem, 6vw, 5.5rem)" }}
              >
                Jeden tím,<br />
                spoločný cieľ
              </h1>
              <Link
                href="/o-nas"
                className="inline-flex items-center justify-center font-garet font-bold text-white mt-8 transition-transform hover:scale-[1.04]"
                style={{
                  background: "#d80027",
                  borderRadius: "52px",
                  padding: "clamp(14px, 1.8vw, 22px) clamp(28px, 3vw, 48px)",
                  fontSize: "clamp(16px, 1.5vw, 24px)",
                }}
              >
                Zistiť viac
              </Link>
            </div>

            {/* Right — match card */}
            <div
              className="hidden lg:flex flex-col bg-white shrink-0"
              style={{
                width: "clamp(320px, 22vw, 400px)",
                borderRadius: "16px",
                padding: "clamp(24px, 2vw, 32px)",
                boxShadow: "0 8px 40px rgba(0,0,0,0.15)",
              }}
            >
              {/* Header row */}
              <div className="flex items-start justify-between mb-1">
                <div>
                  <p className="font-garet font-bold text-[#2a2a72] uppercase" style={{ fontSize: "11px", letterSpacing: "0.08em" }}>
                    Najbližší zápas
                  </p>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-garet font-bold text-[#072357]" style={{ fontSize: "clamp(36px, 2.5vw, 48px)", lineHeight: 1 }}>
                      15
                    </span>
                    <div>
                      <p className="font-garet font-bold text-[#2a2a72]" style={{ fontSize: "13px" }}>JÚN</p>
                      <p className="font-garet font-bold" style={{ fontSize: "clamp(20px, 1.4vw, 26px)", color: "rgba(0,82,255,0.8)", lineHeight: 1.1 }}>
                        15:00
                      </p>
                    </div>
                  </div>
                </div>
                {/* QR code */}
                <div className="shrink-0 overflow-hidden" style={{ width: "clamp(72px, 5.5vw, 100px)", height: "clamp(72px, 5.5vw, 100px)", borderRadius: "12px" }}>
                  <Image
                    src="/images/qr-eurohockey.png"
                    alt="QR kód eurohockey.org"
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="my-4" style={{ height: "1px", background: "rgba(0,0,0,0.08)" }} />

              {/* Slovakia */}
              <div className="flex items-center gap-3">
                <div className="shrink-0 overflow-hidden rounded-full" style={{ width: 40, height: 40 }}>
                  <img src="https://flagcdn.com/w80/sk.png" alt="Slovensko" width={40} height={40} style={{ width: 40, height: 40, objectFit: "cover" }} />
                </div>
                <div>
                  <p className="font-garet font-bold text-[#20204d]" style={{ fontSize: "clamp(15px, 1.1vw, 19px)" }}>Slovensko</p>
                  <p className="font-garet font-bold text-[#9a9a9f] uppercase" style={{ fontSize: "11px" }}>Muži</p>
                </div>
              </div>

              {/* VS separator */}
              <div className="flex items-center gap-3 my-2">
                <div style={{ flex: 1, height: "1px", background: "rgba(0,0,0,0.06)" }} />
                <span className="font-garet font-bold text-[#9a9a9f]" style={{ fontSize: "14px" }}>VS</span>
                <div style={{ flex: 1, height: "1px", background: "rgba(0,0,0,0.06)" }} />
              </div>

              {/* Croatia */}
              <div className="flex items-center gap-3">
                <div className="shrink-0 overflow-hidden rounded-full" style={{ width: 40, height: 40 }}>
                  <img src="https://flagcdn.com/w80/hr.png" alt="Chorvátsko" width={40} height={40} style={{ width: 40, height: 40, objectFit: "cover" }} />
                </div>
                <div>
                  <p className="font-garet font-bold text-[#20204d]" style={{ fontSize: "clamp(15px, 1.1vw, 19px)" }}>Chorvátsko</p>
                  <p className="font-garet font-bold text-[#9a9a9f] uppercase" style={{ fontSize: "11px" }}>Muži</p>
                </div>
              </div>

              {/* Divider */}
              <div className="my-4" style={{ height: "1px", background: "rgba(0,0,0,0.08)" }} />

              {/* Competition link */}
              <div className="flex items-center justify-between">
                <span className="font-garet font-bold text-[#9a9a9f]" style={{ fontSize: "clamp(14px, 1vw, 18px)" }}>
                  Eurohockey 5s
                </span>
                <svg className="h-4 w-4 text-[#9a9a9f]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>

          </div>
        </div>

        {/* Blue diagonal stripes at bottom */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: "clamp(80px, 10vw, 160px)" }}>
          <div
            className="absolute w-[120%] -left-[10%]"
            style={{
              bottom: "-40%",
              height: "100%",
              background: "linear-gradient(to right, rgb(7, 35, 87), rgb(38, 86, 171))",
              transform: "rotate(-3deg)",
              opacity: 0.8,
            }}
          />
          <div
            className="absolute w-[120%] -left-[10%]"
            style={{
              bottom: "-55%",
              height: "100%",
              background: "linear-gradient(to right, rgb(7, 35, 87), rgb(38, 86, 171))",
              transform: "rotate(-2.5deg)",
              opacity: 0.8,
            }}
          />
          <div
            className="absolute w-[120%] -left-[10%]"
            style={{
              bottom: "-70%",
              height: "100%",
              background: "linear-gradient(to right, rgb(7, 35, 87), rgb(38, 86, 171))",
              transform: "rotate(-2deg)",
              opacity: 0.7,
            }}
          />
          <div
            className="absolute w-[120%] -left-[10%]"
            style={{
              bottom: "-90%",
              height: "100%",
              background: "linear-gradient(to right, rgb(7, 35, 87), rgb(38, 86, 171))",
              transform: "rotate(-1.5deg)",
              opacity: 0.8,
            }}
          />
        </div>

      </section>
    </div>
  );
}
