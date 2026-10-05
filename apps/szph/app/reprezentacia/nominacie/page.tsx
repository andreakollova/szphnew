import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { NominacieClient } from "./NominacieClient";

export const metadata: Metadata = {
  title: "Nominácie - Reprezentácia",
  description: "Aktuálne nominácie slovenských reprezentácií v pozemnom hokeji.",
};

function getSupabase() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
}

export default async function NominaciePage() {
  const supabase = getSupabase();
  const { data: categories } = await supabase
    .from("categories")
    .select("id, name, slug, type, nominations")
    .eq("type", "reprezentacia")
    .eq("status", "published")
    .order("sort_order", { ascending: true });

  const cats = (categories ?? []).filter((c: any) => c.nominations && c.nominations.length > 0);

  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[1100px] mx-auto">
          <Link href="/reprezentacia" className="inline-flex items-center gap-2 font-bold text-white hover:text-white transition-colors mb-6" style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            <svg className="h-3 w-3 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            Späť
          </Link>
          <span className="font-bold uppercase text-white mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>
            Reprezentácia
          </span>
          <h1 className="font-garet font-bold italic text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Nominácie
          </h1>
          <p className="text-white mt-3 max-w-xl" style={{ fontSize: "15px" }}>
            Aktuálne nominácie hráčov a hráčok do slovenských reprezentácií v pozemnom hokeji.
          </p>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 pt-12">
        {cats.length === 0 ? (
          <div className="rounded-lg p-8 text-center" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
            <p className="text-[#64748b] mb-2" style={{ fontSize: "15px" }}>
              V súčasnosti nie sú zverejnené žiadne aktuálne nominácie.
            </p>
            <p className="text-[#94a3b8]" style={{ fontSize: "13px" }}>
              Nominácie budú zverejnené pred najbližším turnajom alebo medzinárodným stretnutím.
            </p>
          </div>
        ) : (
          <NominacieClient categories={cats} />
        )}
      </div>
    </article>
  );
}
