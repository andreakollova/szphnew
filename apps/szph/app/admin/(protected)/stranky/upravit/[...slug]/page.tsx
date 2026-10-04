import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@szph/db/client";
import { upsertPageBySlug } from "@szph/db";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ title?: string }>;
}

export const metadata: Metadata = { title: "Upravit stranku" };

export default async function UpravitStrankuBySlugPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { title } = await searchParams;
  const fullSlug = slug.join("/");
  const pageTitle = title ?? fullSlug;

  const cookieStore = await cookies();
  const supabase = createServerSupabaseClient(cookieStore);

  // Upsert - create if not exists, then redirect to the ID-based editor
  const page = await upsertPageBySlug(supabase, fullSlug, pageTitle, "szph");

  redirect(`/admin/stranky/${page.id}`);
}
