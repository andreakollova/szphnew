"use client";

import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import type { HTMLAttributes } from "react";

interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  fullBleed?: boolean;
  animate?: boolean;
}

export function GlassPanel({
  children,
  className,
  fullBleed = false,
  animate = true,
  ...props
}: GlassPanelProps) {
  const innerContent = (
    <>
      {/* Noise texture overlay pre realizmus */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
        aria-hidden
      />
      {/* Top highlight linka */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
        }}
        aria-hidden
      />
      {children}
    </>
  );

  const baseClass = cn(
    "glass relative overflow-hidden",
    !fullBleed && "rounded-2xl",
    className
  );

  if (!animate) {
    return (
      <div className={baseClass} {...props}>
        {innerContent}
      </div>
    );
  }

  return (
    <motion.div
      className={baseClass}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {innerContent}
    </motion.div>
  );
}
