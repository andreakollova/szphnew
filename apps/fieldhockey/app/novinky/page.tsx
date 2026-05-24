import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@szph/db/client";
import { getPublishedArticles } from "@szph/db";
import { ArticleCard } from "@szph/ui";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Novinky",
  description: "Všetky správy zo slovenského pozemného hokeja.",
};

export default async function NovinkyPage() {
  const cookieStore = await cookies();
  const supabase = createServerSupabaseClient(cookieStore);
  const articles = await getPublishedArticles(supabase, {
    site: "fieldhockey",
    limit: 24,
  }).catch(() => []);

  return (
    <div className="container-szph pt-28 pb-20">
      <div className="mb-12">
        <span className="label-wide text-[var(--sky)]">Správy</span>
        <h1 className="text-display text-white mt-2">Novinky</h1>
      </div>

      {articles.length === 0 ? (
        <div className="py-20 text-center text-white/40">Žiadne novinky</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, i) => (
            <ArticleCard key={article.id} article={article} delay={i * 0.04} />
          ))}
        </div>
      )}
    </div>
  );
}
