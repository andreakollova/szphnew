"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden" style={{ height: "clamp(360px, 55vw, 620px)" }}>
      <Image
        src="/images/banner1.jpg"
        alt="Pozemny hokej"
        fill
        className="object-cover object-center"
        priority
        quality={92}
      />

      {/* Multi-layer gradient for depth */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(to top, rgba(1,26,74,0.92) 0%, rgba(1,26,74,0.45) 45%, rgba(1,26,74,0.1) 100%)"
      }} />
      <div className="absolute inset-0" style={{
        background: "linear-gradient(to right, rgba(1,26,74,0.6) 0%, transparent 60%)"
      }} />

      {/* Top navbar spacer gradient */}
      <div className="absolute top-0 inset-x-0 h-24" style={{
        background: "linear-gradient(to bottom, rgba(1,26,74,0.7) 0%, transparent 100%)"
      }} />

      {/* Bottom accent bar */}
      <div className="absolute bottom-0 inset-x-0 h-1" style={{
        background: "linear-gradient(90deg, var(--sky) 0%, var(--navy) 50%, var(--red) 100%)"
      }} />

      {/* Content */}
      <div className="absolute bottom-0 inset-x-0 container-szph pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          <span className="label-wide text-[var(--sky)] block mb-2">Novinky</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-garet font-black text-white max-w-2xl leading-tight"
          style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", letterSpacing: "-0.02em" }}
        >
          Olympijský festival sme odštartovali s pozemným hokejom
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.35 }}
          className="mt-5 flex flex-wrap gap-3"
        >
          <Link
            href="/novinky"
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--sky)] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-[var(--sky-light)] hover:gap-3"
          >
            Čítať viac
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href="/zapasy"
            className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20"
          >
            Zápasy
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
