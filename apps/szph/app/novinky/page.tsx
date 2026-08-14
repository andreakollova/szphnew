import { unstable_cache } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@szph/ui";
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
      .limit(30);
    return data ?? [];
  },
  ["novinky-all"],
  { revalidate: 300 }
);

export default async function SzphNovinkyPage() {
  const articles = await getArticles();

  return (
    <div style={{ background: "#f8f9fa", minHeight: "100vh" }}>
      <div className="px-6 lg:px-10 xl:px-16 max-w-[1600px] mx-auto pt-8 pb-20">
        <div className="mb-8">
          <h1 className="font-garet font-bold italic text-[#051937]" style={{ fontSize: "clamp(1.4rem, 2.2vw, 2rem)", textTransform: "uppercase" }}>
            Novinky a oznamy
          </h1>
        </div>
        {articles.length === 0 ? (
          <div className="py-20 text-center text-[#94a3b8]">Žiadne novinky</div>
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article: any) => (
              <Link key={article.id} href={`/novinky/${article.slug}`} className="group block overflow-hidden">
                <div className="relative overflow-hidden" style={{ height: "180px", borderRadius: "3px" }}>
                  {article.cover_image_url ? (
                    <Image src={article.cover_image_url} alt={article.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full bg-[#e2e8f0]" />
                  )}
                </div>
                <div className="pt-3">
                  <span className="inline-block font-extrabold uppercase text-[#012d74] mb-1.5" style={{ fontSize: "9px", letterSpacing: "0.1em" }}>
                    / {article.category}
                  </span>
                  <h3 className="font-bold text-[#051937] leading-snug group-hover:text-[#012d74] transition-colors line-clamp-2" style={{ fontSize: "13px" }}>
                    {article.title}
                  </h3>
                  {article.published_at && (
                    <p className="text-[#94a3b8] mt-1.5 font-bold uppercase" style={{ fontSize: "9px", letterSpacing: "0.08em" }}>
                      {formatDate(article.published_at)}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
