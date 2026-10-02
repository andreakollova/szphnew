"use client";

import { useState } from "react";
import Image from "next/image";

function extractYouTubeId(url: string): string | null {
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]+)/);
  return m ? m[1] : null;
}

interface YouTubeInlineProps {
  url: string;
  title?: string;
  aspect?: "video" | "short";
  thumbnailSize?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export function YouTubeInline({
  url,
  title = "",
  aspect = "video",
  thumbnailSize = "400px",
  className = "",
  style,
  children,
}: YouTubeInlineProps) {
  const [playing, setPlaying] = useState(false);
  const id = extractYouTubeId(url);

  if (!id) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className={className} style={style}>
        {children}
      </a>
    );
  }

  if (playing) {
    return (
      <div
        className={className}
        style={{ ...style, aspectRatio: aspect === "short" ? "9/16" : "16/9", background: "#000", overflow: "hidden" }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
          className="w-full h-full"
          style={{ border: 0 }}
          title={title}
        />
      </div>
    );
  }

  return (
    <button
      onClick={() => setPlaying(true)}
      className={`group block w-full text-left ${className}`}
      style={style}
    >
      {children || (
        <div className="relative overflow-hidden" style={{ aspectRatio: aspect === "short" ? "9/16" : "16/9" }}>
          <Image
            src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes={thumbnailSize}
            unoptimized
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
            <div
              className="flex items-center justify-center rounded-full bg-white/90 shadow-lg opacity-80 group-hover:opacity-100 transition-opacity"
              style={{ width: 48, height: 48 }}
            >
              <svg className="h-5 w-5 text-[#051937] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </button>
  );
}
