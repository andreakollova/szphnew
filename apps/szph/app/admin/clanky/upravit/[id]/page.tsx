import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@szph/db/client";
import { notFound } from "next/navigation";
import { ArticleForm } from "../../ArticleForm";
import type { Metadata } from "next";
import type { Article } from "@szph/db/types";

interface Props {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = { title: "Upraviť článok" };

export default async function UpravitClanokPage({ params }: Props) {
  const { id } = await params;
  const cookieStore = await cookies();
  const supabase = createServerSupabaseClient(cookieStore);

  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .single();

  if (!article) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-garet text-2xl font-bold text-white">Upraviť článok</h1>
        <p className="text-sm text-white/40 mt-1">{article.title}</p>
      </div>
      <ArticleForm article={article as Article} />
    </div>
  );
}
