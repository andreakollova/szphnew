"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "../lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "dark" | "sm" | "accent";
  hover?: boolean;
  accentColor?: "sky" | "red" | "navy";
  delay?: number;
}

export function GlassCard({
  children,
  className,
  variant = "default",
  hover = true,
  accentColor,
  delay = 0,
  ...props
}: GlassCardProps) {
  const base =
    "rounded-2xl overflow-hidden relative transition-all duration-300";

  const variants = {
    default: "glass",
    dark:    "glass-dark",
    sm:      "glass-sm rounded-xl",
    accent:  "glass",
  };

  const accentBorder = {
    sky:   "border-l-4 border-l-[var(--sky)]",
    red:   "border-l-4 border-l-[var(--red)]",
    navy:  "border-l-4 border-l-[var(--navy)]",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      className={cn(
        base,
        variants[variant],
        accentColor && accentBorder[accentColor],
        className
      )}
      {...props}
    >
      {/* Vnútorný highlight efekt */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%)",
        }}
        aria-hidden
      />
      {children}
    </motion.div>
  );
}
