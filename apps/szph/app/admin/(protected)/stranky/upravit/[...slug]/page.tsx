import { createClient } from "@supabase/supabase-js";
import { upsertPageBySlug } from "@szph/db";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ title?: string }>;
}

export const metadata: Metadata = { title: "Upraviť stránku" };

function getSupabase() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
}

export default async function UpravitStrankuBySlugPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { title } = await searchParams;
  const fullSlug = slug.join("/");
  const pageTitle = title ?? fullSlug;

  const supabase = getSupabase();

  try {
    const page = await upsertPageBySlug(supabase, fullSlug, pageTitle, "szph");
    redirect(`/admin/stranky/${page.id}`);
  } catch (err: any) {
    // redirect() throws a special error — rethrow it
    if (err?.digest?.startsWith("NEXT_REDIRECT")) throw err;
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-[#051937] mb-4">Chyba</h1>
        <p className="text-red-500 font-semibold mb-2">Nepodarilo sa vytvoriť stránku v databáze.</p>
        <p className="text-[#64748b] text-sm mb-4">Chyba: {err?.message || "Neznáma chyba"}</p>
        <p className="text-[#94a3b8] text-xs">Skontrolujte či tabuľka &quot;pages&quot; existuje v Supabase a má správne stĺpce (slug, title, site, status, content).</p>
      </div>
    );
  }
}
