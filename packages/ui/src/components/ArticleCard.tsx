"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn, formatDate } from "../lib/utils";
import type { Article } from "@szph/db/types";

const CATEGORY_LABELS: Record<string, string> = {
  novinky:       "Novinky",
  reprezentacia: "Reprezentácia",
  kluby:         "Kluby",
  oznamy:        "Oznamy",
};

const CATEGORY_COLORS: Record<string, string> = {
  novinky:       "bg-[#e8f4fd] text-[#016fb4]",
  reprezentacia: "bg-[#012d74]/10 text-[#012d74]",
  kluby:         "bg-[#f0f4fa] text-[#012d74]/70",
  oznamy:        "bg-amber-50 text-amber-700",
};

interface ArticleCardProps {
  article: Article;
  href?: string;
  className?: string;
  delay?: number;
  featured?: boolean;
}

export function ArticleCard({ article, href, className, delay = 0, featured = false }: ArticleCardProps) {
  const link = href ?? `/novinky/${article.slug}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn("card group cursor-pointer overflow-hidden", featured && "md:col-span-2", className)}
    >
      <Link href={link} className="block">
        {article.cover_image_url && (
          <div className={cn("relative overflow-hidden", featured ? "h-64 md:h-80" : "h-48")}>
            <Image
              src={article.cover_image_url}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes={featured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        )}

        <div className="p-4 md:p-5">
          <span className={cn(
            "label-wide mb-2 inline-block rounded-full px-2.5 py-0.5 text-[10px]",
            CATEGORY_COLORS[article.category] ?? CATEGORY_COLORS.novinky
          )}>
            {CATEGORY_LABELS[article.category] ?? article.category}
          </span>

          <h3 className={cn(
            "font-garet font-bold text-[#012d74] transition-colors group-hover:text-[#016fb4] leading-snug",
            featured ? "text-xl md:text-2xl" : "text-base"
          )}>
            {article.title}
          </h3>

          {article.excerpt && (
            <p className="mt-2 line-clamp-2 text-sm text-[#64748b]">{article.excerpt}</p>
          )}

          {article.published_at && (
            <p className="mt-3 text-xs text-[#64748b]/70">{formatDate(article.published_at)}</p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
