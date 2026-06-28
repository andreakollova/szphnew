import { ArticleForm } from "../ArticleForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Nový článok" };

export default function NovyClanokPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#051937]">Nový článok</h1>
        <p className="text-sm text-[#64748b] mt-1">Vytvorte nový článok pre fieldhockey.sk alebo szph.sk</p>
      </div>
      <ArticleForm />
    </div>
  );
}
