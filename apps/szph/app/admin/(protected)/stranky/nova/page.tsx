import type { Metadata } from "next";
import { PageForm } from "../PageForm";

export const metadata: Metadata = { title: "Nova stranka" };

export default function NovaStrankaPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#051937]">Nova stranka</h1>
      <PageForm />
    </div>
  );
}
