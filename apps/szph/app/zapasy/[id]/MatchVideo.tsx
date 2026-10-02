"use client";

import { YouTubeInline } from "../../components/YouTubeInline";

export function MatchVideo({ url }: { url: string }) {
  const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");

  if (!isYouTube) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white p-5 hover:bg-[#f8fafd] transition-colors" style={{ borderRadius: "3px", border: "1px solid rgba(1,45,116,0.06)" }}>
        <div className="shrink-0 flex items-center justify-center rounded-full" style={{ width: 40, height: 40, background: "#d80027" }}>
          <svg className="h-4 w-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
        </div>
        <div>
          <p className="font-bold text-[#051937]" style={{ fontSize: "14px" }}>Sledovať záznam zápasu</p>
          <p className="text-[#94a3b8]" style={{ fontSize: "11px" }}>Otvoriť video</p>
        </div>
      </a>
    );
  }

  return (
    <div className="overflow-hidden bg-white" style={{ borderRadius: "3px", border: "1px solid rgba(1,45,116,0.06)" }}>
      <YouTubeInline url={url} title="Záznam zápasu" />
      <div className="px-5 py-3">
        <p className="font-bold text-[#051937]" style={{ fontSize: "13px" }}>Záznam zápasu</p>
      </div>
    </div>
  );
}
