"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const BAR_H = 88;


export function SzphHero() {
  return (
    <>
      <div style={{ background: "#051937" }} className="-mt-16 md:-mt-[112px] pt-16 md:pt-[112px]">
      <section
        className="relative overflow-hidden w-[calc(100%-24px)] md:w-[calc(100%-48px)] mx-auto h-[calc(82vh)] md:h-[calc(80vh)] min-h-[520px] max-h-[800px]"
        style={{ background: "#051937", borderRadius: "20px" }}
      >
        {/* ── Banner fotka ── */}
        <div className="absolute inset-0" style={{ zIndex: 1 }}>
          <Image
            src="/images/hlavnybanner.png"
            alt=""
            fill
            className="object-cover object-center"
            priority
            quality={90}
            sizes="100vw"
          />
        </div>

        {/* ── Tmavomodrý gradient z ĽAVEJ strany — silnejší ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 2,
            background: "linear-gradient(to right, #051937 0%, #051937 14%, rgba(5,25,55,0.95) 17%, rgba(5,25,55,0.6) 22%, rgba(5,25,55,0.2) 27%, transparent 33%)",
          }}
        />

        {/* ── Tmavomodrý gradient z PRAVEJ strany — silnejší ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 2,
            background: "linear-gradient(to left, #051937 0%, #051937 20%, rgba(5,25,55,0.9) 23%, rgba(5,25,55,0.3) 28%, transparent 34%)",
          }}
        />

        {/* ── Spodný gradient ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 2,
            background: "linear-gradient(to top, #051937 0%, rgba(5,25,55,0.5) 12%, transparent 28%)",
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
      </div>

    </>
  );
}
