"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const BAR_H = 88;


export function SzphHero() {
  return (
    <>
      <div style={{ background: "#051937" }} className="-mt-16 md:-mt-[112px]">
      <section
        className="relative overflow-hidden w-full h-[calc(90vh)] md:h-[calc(88vh)] min-h-[600px] max-h-[920px]"
        style={{ background: "#051937" }}
      >
        {/* ── Banner fotka — contain, celá viditeľná ── */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 1 }}>
          <div className="relative" style={{ width: "115%", height: "115%", left: "5%", top: "8%" }}>
            <Image
              src="/images/hlavnybanner3.png"
              alt=""
              fill
              className="object-contain object-center"
              priority
              quality={90}
              sizes="110vw"
            />
          </div>
        </div>

        {/* ── Tmavomodrý gradient z ĽAVEJ strany — silnejší ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 2,
            background: "linear-gradient(to right, #051937 0%, #051937 18%, rgba(5,25,55,0.95) 22%, rgba(5,25,55,0.6) 28%, rgba(5,25,55,0.2) 34%, transparent 40%)",
          }}
        />

        {/* ── Tmavomodrý gradient z PRAVEJ strany — silnejší ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 2,
            background: "linear-gradient(to left, #051937 0%, #051937 12%, rgba(5,25,55,0.9) 15%, rgba(5,25,55,0.3) 20%, transparent 26%)",
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

        {/* ── Zaoblené spodné rohy — svetlý overlay ── */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            zIndex: 4,
            height: "40px",
            background: "#f8f9fa",
            borderRadius: "40px 40px 0 0",
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
          className="absolute inset-0 left-0 flex items-end pt-16 md:pb-[120px]"
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

            {/* Popis pod nadpisom */}
            <p
              className="mt-5 text-white max-w-md leading-relaxed"
              style={{ fontSize: "14px" }}
            >
              Spájame kluby, hráčov a fanúšikov pozemného hokeja po celom Slovensku. Rozvíjame mládež a posúvame náš šport na medzinárodnú úroveň.
            </p>

            {/* Červená čiara */}
            <div
              className="rounded-full mt-5 mb-5"
              style={{ width: "40px", height: "3px", background: "#C8102E" }}
            />

            {/* CTA tlačidlá */}
            <div className="flex items-center gap-3">
              <Link
                href="/o-szph"
                className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:bg-white hover:text-[#051937]"
                style={{ border: "1.5px solid rgba(255,255,255,0.5)" }}
              >
                O SZPH
              </Link>
              <Link
                href="/novinky"
                className="group flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background: "#C8102E",
                  boxShadow: "0 0 20px rgba(200,16,46,0.3)",
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-white/50 animate-pulse" />
                Aktuality
              </Link>
            </div>

          </motion.div>
        </div>

        {/* ── Ľavá sidebar — socials · line · #wearehockey · line · scroll ── */}
        <div
          className="hidden md:flex absolute left-5 flex-col items-center pointer-events-none"
          style={{ zIndex: 12, color: "rgba(255,255,255,0.85)", top: "160px", bottom: "80px" }}
        >
          {/* Social icons */}
          <div className="flex flex-col items-center gap-2.5 pointer-events-auto mb-4">
            <a href="https://www.instagram.com/szph_sk/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center h-7 w-7 rounded-full transition-all hover:bg-white/15 hover:scale-110" style={{ border: "1px solid rgba(255,255,255,0.2)" }}>
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            <a href="https://www.facebook.com/szph.sk" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center h-7 w-7 rounded-full transition-all hover:bg-white/15 hover:scale-110" style={{ border: "1px solid rgba(255,255,255,0.2)" }}>
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>

          {/* Gradient glow line */}
          <div className="flex-1" style={{ width: "1px", background: "linear-gradient(to bottom, rgba(255,255,255,0.3), rgba(200,16,46,0.8) 30%, rgba(200,16,46,0.8) 70%, rgba(255,255,255,0.3))" }} />

          {/* #wearehockey vertical */}
          <span
            className="font-bold uppercase tracking-[0.25em] my-4"
            style={{
              fontSize: "0.44rem",
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
            }}
          >
            #wearehockey
          </span>

          {/* Gradient glow line */}
          <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, rgba(255,255,255,0.3), rgba(200,16,46,0.6), transparent)" }} />

        </div>

        {/* ── Annotation: bodka na hráčovi + čiara k video karte — animované po videu ── */}
        <motion.svg
          className="hidden md:block absolute pointer-events-none"
          style={{ zIndex: 13, top: "0", left: "0", width: "100%", height: "100%" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {/* Čiara od hráča k video karte */}
          <motion.line
            x1="66%" y1="28%"
            x2="calc(100% - 60px - 100px)" y2="28%"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
          />
          {/* Bodka na hráčovi — pulzujúca */}
          <motion.circle
            cx="66%" cy="28%" r="5" fill="white"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.9 }}
            transition={{ duration: 0.3, delay: 0.8 }}
          >
            <animate attributeName="r" values="5;8;5" dur="2s" repeatCount="indefinite" begin="1.2s" />
            <animate attributeName="opacity" values="0.9;0.4;0.9" dur="2s" repeatCount="indefinite" begin="1.2s" />
          </motion.circle>
          <motion.circle
            cx="66%" cy="28%" r="4" fill="white"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.8 }}
          />
        </motion.svg>

        {/* ── Video card — Gól mesiaca ── */}
        <motion.div
          initial={{ opacity: 0, y: -12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="hidden md:block absolute"
          style={{ right: "60px", top: "150px", zIndex: 14 }}
        >
          <div
            className="group/vid relative cursor-pointer"
            style={{ width: "200px" }}
          >
            {/* Malá karta */}
            <div
              className="relative overflow-hidden"
              style={{
                borderRadius: "16px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <video
                className="w-full h-auto block"
                src="/images/roh.mov"
                muted
                playsInline
                autoPlay
              />
              {/* Badge — top left */}
              <div
                className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2 py-1"
                style={{ borderRadius: "8px", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)" }}
              >
                <span style={{ fontSize: "9px" }}>⚡</span>
                <span className="font-bold text-white uppercase" style={{ fontSize: "7px", letterSpacing: "0.1em" }}>Gol mesiaca</span>
              </div>
              {/* Expand icon — top right */}
              <div
                className="absolute top-2.5 right-2.5 flex items-center justify-center"
                style={{ width: "22px", height: "22px", borderRadius: "7px", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)" }}
              >
                <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                </svg>
              </div>
            </div>

            {/* Expanded view on hover */}
            <div
              className="hidden group-hover/vid:block fixed"
              style={{
                bottom: "195px",
                right: "40px",
                width: "50vw",
                zIndex: 60,
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 16px 60px rgba(0,0,0,0.4)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <video
                className="w-full h-auto block"
                src="/images/roh.mov"
                muted
                loop
                playsInline
                autoPlay
              />
              {/* Glass bottom bar */}
              <div
                className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-6 py-4"
                style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(16px)" }}
              >
                <div>
                  <p className="font-bold text-white leading-none" style={{ fontSize: "14px" }}>Gol: Tomas Romanec</p>
                  <p className="text-white/50 font-semibold leading-none mt-1" style={{ fontSize: "10px" }}>Asistencia: Daniel Petras, Matus Parajka</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="font-bold text-white/60 uppercase" style={{ fontSize: "9px", letterSpacing: "0.1em" }}>Video</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Ticket — najbližší zápas ── */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="hidden md:flex absolute flex-col overflow-hidden"
          style={{
            width: "200px",
            right: "60px",
            bottom: "100px",
            zIndex: 11,
            borderRadius: "20px",
            background: "#ffffff",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          }}
        >
          {/* Header */}
          <div className="px-5 pt-5 pb-3 flex items-center justify-between">
            <p className="font-bold uppercase tracking-widest text-[#051937]/40" style={{ fontSize: "8px", letterSpacing: "0.14em" }}>
              Najbližší zápas
            </p>
          </div>

          {/* Dátum */}
          <div className="px-5 pb-4 flex items-baseline gap-2">
            <p className="font-garet font-bold text-[#051937] leading-none" style={{ fontSize: "28px" }}>
              15
            </p>
            <div>
              <p className="font-bold uppercase text-[#051937]/40 leading-none" style={{ fontSize: "9px" }}>Jún</p>
              <p className="font-black text-[#C8102E] leading-none mt-1" style={{ fontSize: "14px" }}>15:00</p>
            </div>
          </div>

          {/* Perforácia */}
          <div className="relative flex items-center" style={{ height: "1px" }}>
            <div className="absolute -left-[8px] h-4 w-4 rounded-full" style={{ background: "#051937", boxShadow: "0 0 0 4px #ffffff" }} />
            <div className="flex-1 mx-4" style={{ borderTop: "2px dashed rgba(1,45,116,0.12)" }} />
            <div className="absolute -right-[8px] h-4 w-4 rounded-full" style={{ background: "#051937", boxShadow: "0 0 0 4px #ffffff" }} />
          </div>

          {/* Tímy */}
          <div className="px-5 py-4 flex flex-col gap-3">
            {/* SVK */}
            <div className="flex items-center gap-3">
              <div className="relative shrink-0 overflow-hidden rounded-sm" style={{ width: "28px", height: "20px" }}>
                <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Flag_of_Slovakia.svg/500px-Flag_of_Slovakia.svg.png" alt="SVK" fill className="object-cover" sizes="28px" />
              </div>
              <div>
                <p className="font-extrabold text-[#051937] leading-none" style={{ fontSize: "12px" }}>Slovensko</p>
                <p className="text-[#94a3b8] font-bold uppercase leading-none mt-1" style={{ fontSize: "8px", letterSpacing: "0.1em" }}>Muži</p>
              </div>
            </div>

            {/* VS */}
            <div className="flex items-center gap-2">
              <div style={{ flex: 1, height: "1px", background: "rgba(1,45,116,0.08)" }} />
              <span className="font-black text-[#051937]/20" style={{ fontSize: "9px" }}>VS</span>
              <div style={{ flex: 1, height: "1px", background: "rgba(1,45,116,0.08)" }} />
            </div>

            {/* CRO */}
            <div className="flex items-center gap-3">
              <div className="relative shrink-0 overflow-hidden rounded-sm" style={{ width: "28px", height: "20px" }}>
                <Image src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Flag_of_Croatia.svg" alt="CRO" fill className="object-cover" sizes="28px" />
              </div>
              <div>
                <p className="font-extrabold text-[#051937] leading-none" style={{ fontSize: "12px" }}>Chorvátsko</p>
                <p className="text-[#94a3b8] font-bold uppercase leading-none mt-1" style={{ fontSize: "8px", letterSpacing: "0.1em" }}>Muži</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <Link
            href="/zapasy"
            className="flex items-center justify-between px-5 py-3.5 transition-all hover:bg-[#f5f7fb]"
            style={{ borderTop: "1px solid rgba(1,45,116,0.06)" }}
          >
            <span className="font-bold uppercase text-[#94a3b8]" style={{ fontSize: "8px", letterSpacing: "0.1em" }}>EuroHockey 5s</span>
            <svg className="h-3.5 w-3.5 text-[#051937]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </section>
      </div>
      {/* Spacer pod bannerom */}
      <div style={{ height: "0px", background: "#f8f9fa" }} />
    </>
  );
}
