"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { GlassCard } from "@szph/ui";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-end pb-16 pt-24 overflow-hidden">
      {/* Background image s parallax */}
      <div className="absolute inset-0">
        <Image
          src="/images/banner1.jpg"
          alt="Pozemný hokej hero"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        {/* Viacvrstvový gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-bg)] via-[var(--brand-bg)]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-bg)]/70 via-transparent to-transparent" />
        {/* Subtle vignette */}
        <div className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)"
          }}
        />
      </div>

      {/* Diagonálny akcentný pás */}
      <div
        className="absolute bottom-0 inset-x-0 h-2 opacity-80"
        style={{
          background: "linear-gradient(90deg, var(--sky) 0%, var(--navy) 50%, var(--red) 100%)"
        }}
      />

      <div className="container-szph relative z-10">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="label-wide inline-flex items-center gap-2 text-[var(--sky)]">
              <span className="h-px w-8 bg-[var(--sky)]" />
              Slovenský pozemný hokej
            </span>
          </motion.div>

          {/* Hlavný nadpis */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-hero font-garet font-black italic mt-4 text-white leading-none"
          >
            Pozemný hokej je{" "}
            <span
              className="block"
              style={{
                WebkitTextStroke: "2px rgba(255,255,255,0.3)",
                color: "transparent",
                WebkitTextFillColor: "transparent",
                backgroundImage: "linear-gradient(135deg, var(--sky) 0%, #a0c4ff 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              viac ako šport.
            </span>
          </motion.h1>

          {/* Popis */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-6 text-lg text-white/70 max-w-xl"
          >
            Príbehy, emócie a komunita slovenského pozemného hokeja na jednom mieste.
          </motion.p>

          {/* CTA tlačidlá */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              href="/zapasy"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--sky)] px-6 py-3.5 font-garet text-sm font-bold text-white shadow-lg shadow-sky-500/20 transition-all hover:bg-[var(--sky-light)] hover:gap-3 hover:shadow-sky-500/30"
            >
              Najbližšie zápasy
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/novinky"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 font-garet text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              Novinky
            </Link>
          </motion.div>

          {/* Quick stats glass panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="mt-12 grid grid-cols-3 gap-3 max-w-sm"
          >
            {[
              { value: "5", label: "súťaží" },
              { value: "20+", label: "klubov" },
              { value: "500+", label: "hráčov" },
            ].map((stat, i) => (
              <GlassCard
                key={stat.label}
                className="p-3 text-center"
                delay={0.7 + i * 0.1}
                hover={false}
              >
                <p className="font-garet text-2xl font-black text-[var(--sky)]">{stat.value}</p>
                <p className="text-xs text-white/50 mt-0.5">{stat.label}</p>
              </GlassCard>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indikátor */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1 text-white/30"
        >
          <span className="label-wide text-[10px]">Scroll</span>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
