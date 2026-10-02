import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Nový tím" };

export default function NovyTimPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#051937]">Nový tím</h1>
        <p className="text-sm text-[#64748b] mt-1">Tímy sa pridávajú automaticky pri vytvorení nového zápasu</p>
      </div>

      <div className="rounded p-6" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
        <p className="text-[#334155] mb-4" style={{ fontSize: "14px" }}>
          Keď vytvoríte nový zápas a zadáte názov domáceho alebo hosťujúceho tímu, tím sa automaticky zobrazí v zozname tímov.
        </p>
        <Link href="/admin/zapasy/novy" className="inline-flex items-center gap-2 rounded bg-[#012d74] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#012d74]/90 transition-colors">
          + Nový zápas
        </Link>
      </div>
    </div>
  );
}
