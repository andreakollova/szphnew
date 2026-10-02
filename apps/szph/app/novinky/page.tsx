import { unstable_cache } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { ArticlesFilter } from "./ArticlesFilter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Novinky",
  description: "Novinky a oznamy Slovenského zväzu pozemného hokeja.",
};

const getArticles = unstable_cache(
  async () => {
    const sb = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data } = await sb
      .from("articles")
      .select("*")
      .eq("status", "published")
      .in("visible_on", ["szph", "both"])
      .order("published_at", { ascending: false })
      .limit(50);
    return (data ?? []).map((a: any) => ({
      ...a,
      cover_image_url: a.cover_image_url?.startsWith("/images/") && /\.(png|jpe?g)$/i.test(a.cover_image_url)
        ? a.cover_image_url.replace(/\.(png|jpe?g)$/i, ".webp")
        : a.cover_image_url,
    }));
  },
  ["novinky-all"],
  { revalidate: 300 }
);

export default async function SzphNovinkyPage() {
  const articles = await getArticles();

  return (
    <div style={{ background: "#f8f9fa", minHeight: "100vh" }}>
      <div className="px-4 sm:px-6 lg:px-10 xl:px-16 max-w-[1600px] mx-auto pt-8 pb-20">
        <div className="mb-6">
          <h1 className="font-garet font-bold italic text-[#051937]" style={{ fontSize: "clamp(1.4rem, 2.2vw, 2rem)", textTransform: "uppercase" }}>
            Novinky a oznamy
          </h1>
        </div>
        <ArticlesFilter articles={articles} />
      </div>
    </div>
  );
}
