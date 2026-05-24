"use client";

import Image from "next/image";
import { GlassCard } from "./GlassCard";
import { cn } from "../lib/utils";
import { getYoutubeThumbnail, getYoutubeId } from "@szph/db";
import type { Video } from "@szph/db/types";

interface VideoCardProps {
  video: Video;
  className?: string;
  delay?: number;
  onClick?: () => void;
}

export function VideoCard({ video, className, delay = 0, onClick }: VideoCardProps) {
  const thumbnail =
    video.thumbnail_url ??
    (video.youtube_url ? getYoutubeThumbnail(video.youtube_url) : null);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (video.youtube_url) {
      const id = getYoutubeId(video.youtube_url);
      if (id) window.open(`https://www.youtube.com/watch?v=${id}`, "_blank");
    }
  };

  return (
    <GlassCard
      delay={delay}
      className={cn("group cursor-pointer shrink-0 w-64 md:w-72", className)}
      onClick={handleClick}
    >
      {/* Thumbnail */}
      <div className="relative h-40 overflow-hidden">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={video.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="288px"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-white/5">
            <PlayIcon className="h-12 w-12 text-white/20" />
          </div>
        )}
        {/* Overlay pri hover */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/40">
          <div className="scale-75 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <PlayIcon className="ml-1 h-5 w-5 text-white" />
            </div>
          </div>
        </div>
        {/* Duration badge */}
        {video.duration && (
          <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-xs text-white backdrop-blur-sm">
            {video.duration}
          </span>
        )}
      </div>

      <div className="p-3">
        <h4 className="font-garet text-sm font-bold text-white line-clamp-2 group-hover:text-[var(--sky)] transition-colors">
          {video.title}
        </h4>
      </div>
    </GlassCard>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
