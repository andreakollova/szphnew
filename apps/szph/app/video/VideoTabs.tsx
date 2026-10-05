"use client";

import { useState } from "react";
import Image from "next/image";
import { YouTubeInline } from "../components/YouTubeInline";

const ZAPASY_VIDEOS = [
  { id: "W8Umeplx-8o", title: "Extraliga muži — kolo 1", url: "https://www.youtube.com/watch?v=W8Umeplx-8o&t=1604s" },
  { id: "QDL6rHpqd_c", title: "Extraliga muži — kolo 2", url: "https://www.youtube.com/watch?v=QDL6rHpqd_c&t=4977s" },
  { id: "9HxmftfEa0A", title: "Extraliga muži — kolo 3", url: "https://www.youtube.com/watch?v=9HxmftfEa0A&t=817s" },
  { id: "R2xOukt5BgE", title: "Extraliga muži — kolo 4", url: "https://www.youtube.com/watch?v=R2xOukt5BgE" },
  { id: "WoHqCQIVHm4", title: "Rozhovor o infraštruktúre a výstavbe nového štadióna", url: "https://www.youtube.com/watch?v=WoHqCQIVHm4" },
];

const SHORTS_VIDEOS = [
  { id: "QGsvNAgpFuw", title: "Gól týždňa" },
  { id: "AFiMGDHFfrQ", title: "Top momenty" },
  { id: "jwDGy4oCevE", title: "Najlepší zákrok" },
  { id: "4P99iVz3e_k", title: "Reprezentácia" },
  { id: "ywGDsIWSPDw", title: "Záber týždňa" },
  { id: "4rgr9GDsQQk", title: "Short" },
];

function ShortPlayer({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="bg-black overflow-hidden" style={{ borderRadius: "12px", aspectRatio: "9/16" }}>
        <iframe
          src={`https://www.youtube.com/embed/${id}?autoplay=1&loop=1&playlist=${id}&controls=1&modestbranding=1`}
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="w-full h-full"
          style={{ border: 0 }}
        />
      </div>
    );
  }

  return (
    <button onClick={() => setPlaying(true)} className="group block overflow-hidden bg-white w-full text-left" style={{ borderRadius: "12px", border: "1px solid rgba(1,45,116,0.06)" }}>
      <div className="relative overflow-hidden" style={{ aspectRatio: "9/16" }}>
        <Image src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="200px" unoptimized />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center justify-center rounded-full bg-white/90 shadow-lg" style={{ width: 44, height: 44 }}>
            <svg className="h-5 w-5 text-[#051937] ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="font-bold text-white leading-snug line-clamp-2" style={{ fontSize: "12px" }}>
            {title}
          </h3>
        </div>
      </div>
    </button>
  );
}

export function VideoTabs() {
  const [tab, setTab] = useState<"zapasy" | "shorts">("zapasy");

  return (
    <div style={{ background: "#f8f9fa", minHeight: "100vh" }}>
      <div className="px-4 sm:px-6 lg:px-10 xl:px-16 max-w-[1920px] mx-auto pt-6 pb-20">
        <h1 className="font-garet font-bold italic text-[#051937] mb-5" style={{ fontSize: "clamp(1.4rem, 2.2vw, 2rem)", textTransform: "uppercase" }}>
          Video
        </h1>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => setTab("zapasy")}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full font-bold uppercase transition-all"
            style={{
              fontSize: "10px",
              letterSpacing: "0.06em",
              background: tab === "zapasy" ? "#012d74" : "transparent",
              color: tab === "zapasy" ? "#fff" : "#64748b",
              border: tab === "zapasy" ? "1px solid #012d74" : "1px solid rgba(1,45,116,0.12)",
            }}
          >
            <svg className="h-5 w-5" fill={tab === "zapasy" ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={tab === "zapasy" ? 0 : 1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
            Zápasy
          </button>
          <button
            onClick={() => setTab("shorts")}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full font-bold uppercase transition-all"
            style={{
              fontSize: "10px",
              letterSpacing: "0.06em",
              background: tab === "shorts" ? "#012d74" : "transparent",
              color: tab === "shorts" ? "#fff" : "#64748b",
              border: tab === "shorts" ? "1px solid #012d74" : "1px solid rgba(1,45,116,0.12)",
            }}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={tab === "shorts" ? 2 : 1.5}>
              <rect x="6" y="3" width="12" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10 10l4 2-4 2V10z" fill={tab === "shorts" ? "currentColor" : "none"} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Shorts
          </button>
        </div>

        {/* Zápasy - landscape */}
        {tab === "zapasy" && (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {ZAPASY_VIDEOS.map((v) => (
              <div key={v.id} className="overflow-hidden bg-white" style={{ borderRadius: "12px", border: "1px solid rgba(1,45,116,0.06)" }}>
                <YouTubeInline url={v.url} title={v.title} style={{ borderRadius: "12px 12px 0 0" }} />
                <div className="px-4 py-3">
                  <h3 className="font-bold text-[#051937] leading-snug line-clamp-2" style={{ fontSize: "13px" }}>
                    {v.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Shorts - vertical, inline playback */}
        {tab === "shorts" && (
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {SHORTS_VIDEOS.map((v) => (
              <ShortPlayer key={v.id} id={v.id} title={v.title} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
