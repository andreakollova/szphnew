import Image from "next/image";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { ClubGrid } from "./ClubGrid";

function getSupabase() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
}

interface Club {
  id: string;
  name: string;
  short_name: string;
  city: string;
  phone: string | null;
  email: string | null;
  web: string | null;
  facebook: string | null;
  logo_url: string | null;
  address: string | null;
  ico: string | null;
  chairman: string | null;
  account: string | null;
}

async function getClubs(): Promise<Club[]> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("clubs")
      .select("*")
      .eq("status", "published")
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return (data ?? []) as Club[];
  } catch {
    return [];
  }
}

export default async function KlubyPage() {
  const clubs = await getClubs();

  return (
    <div style={{ background: "#f8f9fa", minHeight: "100vh" }}>
      <div className="px-4 sm:px-6 lg:px-10 xl:px-16 max-w-[1920px] mx-auto pt-8 pb-20">
        <div className="mb-8">
          <h1 className="font-garet font-bold italic text-[#051937]" style={{ fontSize: "clamp(1.4rem, 2.2vw, 2rem)", textTransform: "uppercase" }}>
            Kluby pozemného hokeja
          </h1>
          <p className="text-[#64748b] mt-2" style={{ fontSize: "14px" }}>
            Nájdite klub vo svojom meste a začnite hrať pozemný hokej.
          </p>
        </div>

        {/* Club grid — 5 columns on desktop */}
        <ClubGrid clubs={clubs} />

        {/* CTA */}
        <div className="mt-10 p-6 text-center" style={{ background: "#fff", borderRadius: "3px", border: "1px solid rgba(1,45,116,0.06)" }}>
          <p className="font-garet font-bold text-[#051937] mb-2" style={{ fontSize: "18px" }}>Nenašli ste svoj klub?</p>
          <p className="text-[#64748b] mb-4" style={{ fontSize: "13px" }}>Založte si vlastný klub pozemného hokeja vo vašom meste.</p>
          <Link href="/pre-kluby/zalozenie" className="inline-flex items-center gap-2 font-bold text-white transition-all hover:brightness-110" style={{ background: "#012d74", borderRadius: "20px", padding: "10px 24px", fontSize: "12px" }}>
            Chcem si založiť klub
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
