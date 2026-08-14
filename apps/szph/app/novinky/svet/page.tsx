import { unstable_cache } from "next/cache";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Novinky zo sveta",
  description: "Najnovšie správy zo sveta pozemného hokeja.",
};

const getWorldNews = unstable_cache(
  async () => {
    try {
      const { createClient } = await import("@supabase/supabase-js");
      const hr = createClient(
        "https://oivzvihdhidpbrjpygfl.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pdnp2aWhkaGlkcGJyanB5Z2ZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2MzI3MTgsImV4cCI6MjA5MDIwODcxOH0.7d917agBywM3D1RlFJ27oHTRvjBaE_pyDxCzLKaKaIE"
      );
      const { data } = await hr
        .from("articles")
        .select("id, title_sk, image_url, url, scraped_at")
        .eq("published", true)
        .order("scraped_at", { ascending: false })
        .limit(30);
      return (data ?? []).map((a: any) => ({
        id: String(a.id),
        title: a.title_sk ?? "",
        cover_image_url: a.image_url,
        published_at: a.scraped_at,
      }));
    } catch {
      return [];
    }
  },
  ["world-news-all"],
  { revalidate: 300 }
);

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("sk-SK", { day: "numeric", month: "long", year: "numeric" });
}

export default async function SvetNovinkyPage() {
  const articles = await getWorldNews();

  return (
    <div style={{ background: "#f8f9fa", minHeight: "100vh" }}>
      <div className="px-6 lg:px-10 xl:px-16 max-w-[1600px] mx-auto pt-8 pb-20">
        <div className="mb-8">
          <h1
            className="font-garet font-bold italic text-[#051937]"
            style={{ fontSize: "clamp(1.4rem, 2.2vw, 2rem)", textTransform: "uppercase" }}
          >
            Novinky zo sveta
          </h1>
        </div>
        {articles.length === 0 ? (
          <div className="py-20 text-center text-[#64748b]">Žiadne novinky zo sveta</div>
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {articles.map((article: any) => (
              <a
                key={article.id}
                href={`/novinky/svet/${article.id}`}
                className="group block overflow-hidden"
              >
                <div
                  className="relative overflow-hidden"
                  style={{ height: "180px", borderRadius: "3px" }}
                >
                  {article.cover_image_url ? (
                    <Image
                      src={article.cover_image_url}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#e2e8f0]" />
                  )}
                </div>
                <div className="pt-3">
                  <span
                    className="inline-block font-extrabold uppercase text-[#012d74] mb-1.5"
                    style={{ fontSize: "9px", letterSpacing: "0.1em" }}
                  >
                    / svet
                  </span>
                  <h3
                    className="font-bold text-[#051937] leading-snug group-hover:text-[#012d74] transition-colors line-clamp-2"
                    style={{ fontSize: "14px" }}
                  >
                    {article.title}
                  </h3>
                  {article.published_at && (
                    <p
                      className="text-[#64748b] mt-1.5 font-bold uppercase"
                      style={{ fontSize: "9px", letterSpacing: "0.08em" }}
                    >
                      {formatDate(article.published_at)}
                    </p>
                  )}
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
