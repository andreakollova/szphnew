import type { Metadata } from "next";
import { SnakeGame } from "./SnakeGame";

export const metadata: Metadata = {
  title: "Hra - SZPH",
};

export default function HraPage() {
  return <SnakeGame />;
}
