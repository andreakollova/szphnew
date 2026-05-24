"use client";

import Image from "next/image";
import Link from "next/link";
import { GlassCard } from "./GlassCard";
import { cn, formatDate } from "../lib/utils";
import type { Article } from "@szph/db/types";

const CATEGORY_LABELS: Record<string, string> = {
  novinky: "Novinky",
  reprezentacia: "Reprezentácia",
  kluby: "Kluby",
  oznamy: "Oznamy",
};

const CATEGORY_COLORS: Record<string, string> = {
  novinky:      "bg-[var(--sky)]/20 text-[var(--sky)]",
  reprezentacia: "bg-[var(--red)]/20 text-[#ff4d55]",
  kluby:        "bg-[var(--navy-light)]/30 text-white/80",
  oznamy:       "bg-amber-500/20 text-amber-400",
};

interface ArticleCardProps {
  article: Article;
  href?: string;
  className?: string;
  delay?: number;
  featured?: boolean;
}

export function ArticleCard({
  article,
  href,
  className,
  delay = 0,
  featured = false,
}: ArticleCardProps) {
  const link = href ?? `/novinky/${article.slug}`;

  return (
    <GlassCard
      delay={delay}
      className={cn("group cursor-pointer", featured && "md:col-span-2", className)}
      hover
    >
      <Link href={link} className="block">
        {/* Cover image */}
        {article.cover_image_url && (
          <div className={cn("relative overflow-hidden", featured ? "h-64 md:h-80" : "h-48")}>
            <Image
              src={article.cover_image_url}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes={featured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}

        <div className="p-4 md:p-5">
          {/* Kategória */}
          <span
            className={cn(
              "label-wide mb-2 inline-block rounded-full px-2.5 py-0.5 text-[10px]",
              CATEGORY_COLORS[article.category] ?? CATEGORY_COLORS.novinky
            )}
          >
            {CATEGORY_LABELS[article.category] ?? article.category}
          </span>

          {/* Nadpis */}
          <h3
            className={cn(
              "font-garet font-bold text-white transition-colors group-hover:text-[var(--sky)]",
              featured ? "text-xl md:text-2xl" : "text-base md:text-lg"
            )}
          >
            {article.title}
          </h3>

          {/* Excerpt */}
          {article.excerpt && (
            <p className="mt-2 line-clamp-2 text-sm text-white/60">
              {article.excerpt}
            </p>
          )}

          {/* Dátum */}
          {article.published_at && (
            <p className="mt-3 text-xs text-white/40">
              {formatDate(article.published_at)}
            </p>
          )}
        </div>
      </Link>
    </GlassCard>
  );
}
