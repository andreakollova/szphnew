import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { PageForm } from "../PageForm";
import type { Metadata } from "next";

interface Props { params: Promise<{ id: string }> }

export const metadata: Metadata = { title: "Upraviť stránku" };

function getSupabase() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
}

export default async function UpravitStrankuPage({ params }: Props) {
  const { id } = await params;
  const supabase = getSupabase();

  const { data: page } = await supabase.from("pages").select("*").eq("id", id).single();
  if (!page) notFound();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#051937]">Upraviť stránku</h1>
      <PageForm page={page as any} />
    </div>
  );
}
