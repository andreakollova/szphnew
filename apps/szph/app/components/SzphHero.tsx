"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const BAR_H = 88;

const BOTTOM_LINKS = [
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    label: "Komunita",
    desc: "Nájdi klub vo svojom meste",
    href: "/kluby",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
      </svg>
    ),
    label: "Súťaže",
    desc: "Výsledky a tabuľky ligy",
    href: "/sutaze",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
    label: "Vzdelávanie",
    desc: "Kurzy a trénerské licencie",
    href: "/vzdelavanie",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
    label: "Podujatia",
    desc: "Kalendár akcií a turnajov",
    href: "/kalendar",
  },
];

export function SzphHero() {
  return (
    <>
      <section
        className="relative overflow-hidden w-full -mt-16 md:-mt-[112px] h-[calc(75vh+64px)] md:h-[calc(72vh+112px)] min-h-[560px] max-h-[860px]"
        style={{ background: "#051937" }}
      >
        {/* ── Banner fotka — zmenšená, vycentrovaná, bočné medzery zakryje gradient ── */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 1, background: "#051937" }}>
          <div className="relative" style={{ width: "70%", height: "100%" }}>
            <Image
              src="/images/hlavnybanner.png"
              alt=""
              fill
              className="object-cover object-center"
              priority
              quality={90}
              sizes="70vw"
            />
          </div>
        </div>

        {/* ── Tmavomodrý gradient z ĽAVEJ strany — plná farba → fade ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 2,
            background: "linear-gradient(to right, #051937 0%, #051937 8%, rgba(5,25,55,0.95) 18%, rgba(5,25,55,0.7) 32%, rgba(5,25,55,0.25) 50%, transparent 65%)",
          }}
        />

        {/* ── Tmavomodrý gradient z PRAVEJ strany — plná farba → fade ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 2,
            background: "linear-gradient(to left, #051937 0%, #051937 5%, rgba(5,25,55,0.9) 15%, rgba(5,25,55,0.5) 30%, transparent 50%)",
          }}
        />

        {/* ── Spodný gradient ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 2,
            background: "linear-gradient(to top, #051937 0%, rgba(5,25,55,0.7) 15%, transparent 35%)",
          }}
        />

        {/* ── Vrchný gradient ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 2,
            background: "linear-gradient(to bottom, rgba(5,25,55,0.6) 0%, transparent 20%)",
          }}
        />

        {/* ── Mobilný gradient pre čitateľnosť ── */}
        <div
          className="md:hidden absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to right, rgba(5,25,55,0.95) 0%, rgba(5,25,55,0.7) 55%, transparent 100%)",
            zIndex: 4,
          }}
        />

        {/* ── Ľavý textový obsah ── */}
        <div
          className="absolute inset-0 left-0 flex items-center pt-16 md:pt-[112px]"
          style={{ zIndex: 5, width: "52%" }}
        >
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="pl-14 md:pl-20 xl:pl-28"
          >
            {/* Hlavný nadpis — veľký */}
            <h1
              className="font-garet font-bold italic leading-[0.88] text-white"
              style={{ fontSize: "clamp(2.8rem, 5.2vw, 5.6rem)", letterSpacing: "-0.03em" }}
            >
              JEDEN TÍM.
            </h1>
            <h2
              className="font-garet font-bold italic leading-[0.88]"
              style={{
                fontSize: "clamp(2.8rem, 5.2vw, 5.6rem)",
                letterSpacing: "-0.03em",
                color: "#C8102E",
              }}
            >
              JEDNA VÍZIA.
            </h2>

            {/* Label POD nadpismi */}
            <p
              className="mt-4 font-semibold uppercase tracking-[0.18em] text-white/40"
              style={{ fontSize: "0.6rem" }}
            >
              K rozvoju pozemného hokeja na Slovensku
            </p>

            {/* Červená čiara */}
            <div
              className="rounded-full mt-4 mb-5"
              style={{ width: "40px", height: "3px", background: "#C8102E" }}
            />

            {/* CTA tlačidlá */}
            <div className="flex items-center gap-3">
              <Link
                href="/o-szph"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all hover:opacity-80"
                style={{ background: "rgba(255,255,255,0.12)", color: "#ffffff" }}
              >
                O SZPH
              </Link>
              <Link
                href="/novinky"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white transition-all hover:opacity-90"
                style={{ background: "#C8102E" }}
              >
                Aktuality
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

          </motion.div>
        </div>

        {/* ── #wearehockey + Scroll — jeden kontajner, jedna os ── */}
        <div
          className="hidden md:flex absolute left-4 inset-y-0 flex-col items-center justify-between py-8 pointer-events-none"
          style={{ zIndex: 6, color: "rgba(255,255,255,0.4)" }}
        >
          <div />
          <span
            className="font-bold uppercase tracking-[0.25em]"
            style={{
              fontSize: "0.48rem",
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
            }}
          >
            #wearehockey
          </span>
          {/* Red line */}
          <div style={{ width: "1px", flex: 1, background: "linear-gradient(to bottom, transparent, #C8102E 40%, #C8102E 60%, transparent)", maxHeight: "60px", marginTop: "8px", marginBottom: "8px" }} />
          <div className="flex flex-col items-center gap-1">
            <motion.svg
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              width="12" height="18" viewBox="0 0 14 20" fill="none"
            >
              <line x1="7" y1="0" x2="7" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M1 9 L7 16 L13 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </motion.svg>
            <span className="font-bold uppercase tracking-[0.2em]" style={{ fontSize: "0.42rem" }}>
              Scroll
            </span>
          </div>
        </div>

        {/* ── Plávajúca karta najbližšieho zápasu ── */}
        <motion.div
          initial={{ opacity: 0, y: -12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="hidden md:block absolute bg-white"
          style={{
            boxShadow: "0 4px 24px rgba(1,45,116,0.14), 0 1px 8px rgba(1,45,116,0.06)",
            width: "148px",
            right: "80px",
            bottom: "32px",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Label */}
          <div className="px-5 pt-6 pb-4">
            <p className="font-extrabold uppercase tracking-widest text-[#051937]" style={{ fontSize: "10px", letterSpacing: "0.16em" }}>
              Najbližší<br />zápas
            </p>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "rgba(1,45,116,0.1)", margin: "0 20px" }} />

          {/* Dátum + čas */}
          <div className="px-5 pt-5 pb-5 flex items-start gap-3">
            <p className="font-garet font-bold text-[#051937] leading-none shrink-0" style={{ fontSize: "34px", lineHeight: 1 }}>
              15
            </p>
            <div className="pt-0.5">
              <p className="font-bold uppercase tracking-wide text-[#051937]/40 leading-none" style={{ fontSize: "8px" }}>
                Jún
              </p>
              <p className="font-black leading-none mt-1.5" style={{ fontSize: "13px", color: "#C8102E" }}>
                15:00
              </p>
            </div>
          </div>

          {/* Tím 1 */}
          <div className="px-5 py-3 flex items-center gap-3">
            <div className="relative shrink-0 overflow-hidden" style={{ width: "28px", height: "20px" }}>
              <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Flag_of_Slovakia.svg/500px-Flag_of_Slovakia.svg.png" alt="SVK" fill className="object-cover" sizes="28px" />
            </div>
            <div>
              <p className="font-extrabold text-[#051937] leading-none" style={{ fontSize: "11px" }}>SVK</p>
              <p className="text-[#94a3b8] leading-none mt-1" style={{ fontSize: "8.5px" }}>MUŽI</p>
            </div>
          </div>

          {/* Malý divider */}
          <div style={{ height: "1px", background: "rgba(1,45,116,0.07)", margin: "0 20px" }} />

          {/* Tím 2 */}
          <div className="px-5 py-3 flex items-center gap-3">
            <div className="relative shrink-0 overflow-hidden" style={{ width: "28px", height: "20px" }}>
              <Image src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Flag_of_Croatia.svg" alt="CRO" fill className="object-cover" sizes="28px" />
            </div>
            <div>
              <p className="font-extrabold text-[#051937] leading-none" style={{ fontSize: "11px" }}>CRO</p>
              <p className="text-[#94a3b8] leading-none mt-1" style={{ fontSize: "8.5px" }}>MUŽI</p>
            </div>
          </div>

          {/* Dlhší divider */}
          <div style={{ height: "1px", background: "rgba(1,45,116,0.12)", margin: "0 20px" }} />

          {/* Súťaž */}
          <div className="px-5 pt-3 pb-3">
            <p className="font-bold uppercase tracking-widest text-[#94a3b8]" style={{ fontSize: "7.5px", letterSpacing: "0.14em" }}>
              EuroHockey 5s
            </p>
          </div>

          {/* Button */}
          <a
            href="/zapasy"
            className="flex items-center justify-between px-5 py-4 font-bold text-white transition-all hover:brightness-110"
            style={{ background: "#051937", fontSize: "10px", letterSpacing: "0.06em" }}
          >
            Zobraziť
            <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </section>

      {/* ── Spodná lišta — biela, 6 sekcií, malé sivé divídery ── */}
      <div
        className="w-full border-t border-[rgba(1,45,116,0.07)]"
        style={{ background: "#ffffff", height: "108px" }}
      >
        <div className="h-full grid pl-8 xl:pl-14" style={{ gridTemplateColumns: "repeat(4, 1fr) 400px" }}>
          {BOTTOM_LINKS.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3.5 px-10 xl:px-12 h-full group relative"
            >
              {/* Malý sivý divider — nie na poslednej položke */}
              {i < BOTTOM_LINKS.length - 1 && (
                <span
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-px"
                  style={{ height: "36px", background: "rgba(1,45,116,0.09)" }}
                />
              )}
              {/* Ikona — priamo modrá, bez krúžku */}
              <div className="shrink-0" style={{ color: "#012D74" }}>
                <div className="[&_svg]:h-6 [&_svg]:w-6">{item.icon}</div>
              </div>
              <div className="min-w-0 hidden sm:block">
                <p className="text-[11px] font-black uppercase tracking-widest text-[#051937] leading-none">
                  {item.label}
                </p>
                <p className="text-[11px] text-[#94a3b8] mt-1.5 leading-tight truncate">{item.desc}</p>
              </div>
              <p className="sm:hidden text-[10px] font-black uppercase tracking-widest text-[#051937]">
                {item.label}
              </p>
            </Link>
          ))}

          {/* Staň sa súčasťou — tmavomodrá so šikmým ľavým okrajom, 2 stĺpce */}
          <Link
            href="/zacni-hrat"
            className="relative flex items-center justify-between pl-14 pr-9 xl:pl-16 xl:pr-12 h-full overflow-hidden"
          >
            {/* Šikmé tmavomodré pozadie */}
            <div
              className="absolute inset-0"
              style={{
                background: "#051937",
                clipPath: "polygon(52px 0%, 100% 0%, 100% 100%, 0% 100%)",
              }}
            />
            <div className="relative z-10" style={{ marginTop: "12px" }}>
              <p className="font-garet font-black italic text-white leading-none" style={{ fontSize: "18px" }}>
                Staň sa súčasťou
              </p>
              <img
                src="/images/pozemnehohokeja.png"
                alt="pozemného hokeja"
                className="mt-1 block"
                style={{ height: "50px", width: "auto", marginTop: "-4px", marginLeft: "-6px" }}
              />
            </div>
            {/* Biela šípka v červenom krúžku */}
            <div
              className="relative z-10 shrink-0 flex items-center justify-center rounded-full"
              style={{ width: "36px", height: "36px", background: "#C8102E" }}
            >
              <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
