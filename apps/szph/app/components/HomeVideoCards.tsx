"use client";

import Image from "next/image";
import { YouTubeInline } from "./YouTubeInline";

interface VideoItem {
  id: string;
  url: string;
  title: string;
}

export function HomeStreamCard({ video }: { video: VideoItem }) {
  return (
    <div className="group relative overflow-hidden shrink-0 w-[280px] md:w-[340px]" style={{ borderRadius: "8px" }}>
      <YouTubeInline
        url={video.url}
        title={video.title}
        style={{ borderRadius: "8px" }}
      />
    </div>
  );
}

export function HomeShortCard({ id, title }: { id: string; title: string }) {
  return (
    <div className="relative overflow-hidden shrink-0" style={{ width: "150px", borderRadius: "8px" }}>
      <YouTubeInline
        url={`https://www.youtube.com/shorts/${id}`}
        title={title}
        aspect="short"
        thumbnailSize="150px"
        style={{ borderRadius: "8px" }}
      >
        <div className="relative overflow-hidden" style={{ aspectRatio: "9/16" }}>
          <Image
            src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
            sizes="150px"
            unoptimized
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 40%)" }} />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div
              className="flex items-center justify-center rounded-full"
              style={{ width: "32px", height: "32px", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.2)" }}
            >
              <svg className="h-3 w-3 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <p className="font-bold text-white leading-tight" style={{ fontSize: "10px" }}>{title}</p>
          </div>
          <div
            className="absolute top-2 left-2 px-1.5 py-0.5 font-bold text-white flex items-center gap-1"
            style={{ background: "rgba(0,0,0,0.4)", fontSize: "7px", letterSpacing: "0.08em", backdropFilter: "blur(4px)", borderRadius: "4px" }}
          >
            <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="currentColor"><path d="M4 2h9l7 10-7 10H4l7-10z" /></svg>
            SHORT
          </div>
        </div>
      </YouTubeInline>
    </div>
  );
}

export function HomePodcastVideo({ id, url }: { id: string; url: string }) {
  return (
    <YouTubeInline
      url={url}
      title="SZPH Podcast"
      className="w-full"
      style={{ borderRadius: "12px 12px 0 0", border: "4px solid #0e264a", borderBottom: "4px solid #0e264a" }}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <Image
          src="/images/podcast.webp"
          alt="SZPH Podcast"
          width={686}
          height={386}
          className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, 55vw"
        />
        <div
          className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-60"
          style={{ background: "rgba(3,15,34,0.45)" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="flex items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110"
            style={{ width: "64px", height: "64px", background: "#d80027", boxShadow: "0 0 0 12px rgba(216,0,39,0.2)" }}
          >
            <svg className="h-6 w-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        <div
          className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded"
          style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
        >
          <svg className="h-3.5 w-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8z" />
            <path fill="#051937" d="M9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
          </svg>
          <span className="font-bold text-white" style={{ fontSize: "9px", letterSpacing: "0.1em" }}>YOUTUBE</span>
        </div>
      </div>
    </YouTubeInline>
  );
}
