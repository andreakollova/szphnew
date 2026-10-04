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

  // Upsert - create if not exists, then redirect to the ID-based editor
  const page = await upsertPageBySlug(supabase, fullSlug, pageTitle, "szph");

  redirect(`/admin/stranky/${page.id}`);
}
