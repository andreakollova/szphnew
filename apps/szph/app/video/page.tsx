import type { Metadata } from "next";
import { VideoTabs } from "./VideoTabs";

export const metadata: Metadata = { title: "Video" };

export default function SzphVideoPage() {
  return <VideoTabs />;
}
