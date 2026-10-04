import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import type { Metadata } from "next";
import { SutazeClient } from "./SutazeClient";

export const metadata: Metadata = { title: "Súťaže" };

function getSupabase() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
}

interface Competition {
  id: string;
  name: string;
  season: string;
  type: string;
  category: string;
  created_at: string;
}

export default async function AdminSutazePage() {
  let competitions: Competition[] = [];

  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("competitions")
      .select("*")
      .order("name", { ascending: true });
    if (error) throw error;
    competitions = (data ?? []) as Competition[];
  } catch {
    competitions = [];
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#051937]">Súťaže</h1>
          <p className="text-sm text-[#64748b] mt-1">{competitions.length} súťaží</p>
        </div>
        <Link
          href="/admin/sutaze/nova"
          className="inline-flex items-center gap-2 rounded bg-[#012d74] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#012d74]/90 transition-all"
        >
          + Nová súťaž
        </Link>
      </div>

      <SutazeClient competitions={competitions} />
    </div>
  );
}
