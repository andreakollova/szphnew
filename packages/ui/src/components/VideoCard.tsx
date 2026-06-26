"use client";

import Image from "next/image";
import { motion } from "framer-motion";
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
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay }}
      className={cn("card group cursor-pointer overflow-hidden", className)}
      onClick={handleClick}
    >
      <div className="relative aspect-video overflow-hidden">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={video.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="288px"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[#e8f0fb]">
            <PlayIcon className="h-10 w-10 text-[#016fb4]/40" />
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-[#012d74]/0 transition-colors duration-300 group-hover:bg-[#012d74]/40">
          <div className="scale-75 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg">
              <PlayIcon className="ml-0.5 h-5 w-5 text-[#016fb4]" />
            </div>
          </div>
        </div>
        {video.duration && (
          <span className="absolute bottom-2 right-2 rounded-md bg-[#012d74]/75 px-1.5 py-0.5 text-xs text-white backdrop-blur-sm">
            {video.duration}
          </span>
        )}
      </div>

      <div className="p-3">
        <h4 className="text-sm font-semibold text-[#012d74] line-clamp-2 group-hover:text-[#016fb4] transition-colors leading-snug">
          {video.title}
        </h4>
      </div>
    </motion.div>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
