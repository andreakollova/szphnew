"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const CATEGORIES = [
  { key: "all", label: "Všetky" },
  { key: "novinky", label: "Novinky" },
  { key: "reprezentacia", label: "Reprezentácia" },
  { key: "kluby", label: "Kluby" },
  { key: "oznamy", label: "Oznamy" },
];

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("sk-SK", { day: "numeric", month: "long", year: "numeric" });
}

export function ArticlesFilter({ articles }: { articles: any[] }) {
  const [active, setActive] = useState("all");

  const filtered = active === "all" ? articles : articles.filter(a => a.category === active);

  return (
    <>
      {/* Filter pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6" style={{ scrollbarWidth: "none" }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat.key}
            onClick={() => setActive(cat.key)}
            className="shrink-0 px-4 py-2 rounded-full font-bold uppercase transition-all"
            style={{
              fontSize: "10px",
              letterSpacing: "0.06em",
              background: active === cat.key ? "#012d74" : "transparent",
              color: active === cat.key ? "#fff" : "#64748b",
              border: active === cat.key ? "1px solid #012d74" : "1px solid rgba(1,45,116,0.12)",
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Articles grid */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center text-[#94a3b8] font-bold" style={{ fontSize: "13px" }}>
          Žiadne články v tejto kategórii
        </div>
      ) : (
        <div className="grid gap-6 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article: any) => (
            <Link key={article.id} href={`/novinky/${article.slug}`} className="group block overflow-hidden">
              <div className="relative overflow-hidden" style={{ height: "180px", borderRadius: "10px" }}>
                {article.cover_image_url ? (
                  <Image src={article.cover_image_url} alt={article.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <div className="w-full h-full bg-[#e2e8f0]" />
                )}
                {article.video_url && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex items-center justify-center rounded-full bg-white/90 shadow-lg" style={{ width: 40, height: 40 }}>
                      <svg className="h-4 w-4 text-[#d00027] ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    </div>
                  </div>
                )}
              </div>
              <div className="pt-3">
                <span className="inline-block font-extrabold uppercase text-[#012d74] mb-1.5" style={{ fontSize: "9px", letterSpacing: "0.1em" }}>
                  / {article.category}
                </span>
                <h3 className="font-bold text-[#051937] leading-snug group-hover:text-[#012d74] transition-colors line-clamp-2" style={{ fontSize: "13px" }}>
                  {article.title}
                </h3>
                {article.published_at && (
                  <p className="text-[#94a3b8] mt-1.5 font-bold uppercase" style={{ fontSize: "9px", letterSpacing: "0.08em" }}>
                    {formatDate(article.published_at)}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
