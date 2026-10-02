import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@szph/db/client";
import { notFound } from "next/navigation";
import { PageForm } from "../PageForm";
import type { Metadata } from "next";

interface Props { params: Promise<{ id: string }> }

export const metadata: Metadata = { title: "Upravit stranku" };

export default async function UpravitStrankuPage({ params }: Props) {
  const { id } = await params;
  const cookieStore = await cookies();
  const supabase = createServerSupabaseClient(cookieStore);

  const { data: page } = await supabase.from("pages").select("*").eq("id", id).single();
  if (!page) notFound();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#051937]">Upravit stranku</h1>
      <PageForm page={page as any} />
    </div>
  );
}
