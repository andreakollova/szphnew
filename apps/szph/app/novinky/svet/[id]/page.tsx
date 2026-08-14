import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@szph/ui";
import type { Metadata } from "next";

function getHrClient() {
  const { createClient } = require("@supabase/supabase-js");
  return createClient(
    "https://oivzvihdhidpbrjpygfl.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pdnp2aWhkaGlkcGJyanB5Z2ZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2MzI3MTgsImV4cCI6MjA5MDIwODcxOH0.7d917agBywM3D1RlFJ27oHTRvjBaE_pyDxCzLKaKaIE"
  );
}

const getArticle = unstable_cache(
  async (id: string) => {
    try {
      const hr = getHrClient();
      const { data } = await hr
        .from("articles")
        .select("id, title_sk, text_sk, image_url, url, scraped_at")
        .eq("id", id)
        .eq("published", true)
        .single();
      return data ?? null;
    } catch {
      return null;
    }
  },
  ["world-article"],
  { revalidate: 300 }
);

const getRecentWorldNews = unstable_cache(
  async () => {
    try {
      const hr = getHrClient();
      const { data } = await hr
        .from("articles")
        .select("id, title_sk, image_url, scraped_at")
        .eq("published", true)
        .order("scraped_at", { ascending: false })
        .limit(20);
      return data ?? [];
    } catch {
      return [];
    }
  },
  ["world-news-sidebar"],
  { revalidate: 300 }
);

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticle(id);
  if (!article) return { title: "Článok nenájdený" };
  return {
    title: article.title_sk,
    openGraph: {
      title: article.title_sk,
      images: article.image_url ? [article.image_url] : [],
    },
  };
}

function renderContent(content: string) {
  const blocks = content.split("\n\n").filter(Boolean);

  return blocks.map((block: string, i: number) => {
    if (block.startsWith("### ")) {
      return (
        <h3 key={i} className="font-garet font-bold text-[#051937] mt-8 mb-3" style={{ fontSize: "18px" }}>
          {block.replace("### ", "")}
        </h3>
      );
    }
    if (block.startsWith("## ")) {
      return (
        <h2 key={i} className="font-garet font-bold text-[#051937] mt-10 mb-4" style={{ fontSize: "22px" }}>
          {block.replace("## ", "")}
        </h2>
      );
    }
    if (block.startsWith("> ")) {
      return (
        <blockquote
          key={i}
          className="my-6 pl-5 text-[#64748b] italic"
          style={{ borderLeft: "3px solid #012d74", fontSize: "15px", lineHeight: 1.7 }}
        >
          {block.replace(/^> /gm, "")}
        </blockquote>
      );
    }
    if (block.startsWith("- ")) {
      const items = block.split("\n").filter((l: string) => l.startsWith("- "));
      return (
        <ul key={i} className="my-4 space-y-2 pl-5" style={{ listStyleType: "disc" }}>
          {items.map((item: string, j: number) => (
            <li key={j} className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.7 }}>
              {item.replace("- ", "")}
            </li>
          ))}
        </ul>
      );
    }
    return (
      <p key={i} className="text-[#334155] my-4" style={{ fontSize: "15px", lineHeight: 1.8 }}>
        {block}
      </p>
    );
  });
}

export default async function SvetArticleDetail({ params }: Props) {
  const { id } = await params;

  const [article, recentArticles] = await Promise.all([
    getArticle(id),
    getRecentWorldNews(),
  ]);

  if (!article) notFound();

  const relatedArticles = recentArticles.filter((a: any) => String(a.id) !== id);

  return (
    <article className="pb-20" style={{ background: "#f8f9fa" }}>
      <div className="px-6 lg:px-10 xl:px-16 max-w-[1600px] mx-auto pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-0 items-start">

          {/* Main content */}
          <div className="pr-0 lg:pr-10 xl:pr-14">
            {/* Banner image */}
            {article.image_url && (
              <div className="relative w-full overflow-hidden" style={{ height: "clamp(250px, 35vw, 450px)", borderRadius: "8px" }}>
                <Image
                  src={article.image_url}
                  alt={article.title_sk}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 70vw"
                />
              </div>
            )}

            {/* Title below banner */}
            <div className="mt-6 mb-8">
              <span
                className="inline-block font-extrabold uppercase text-[#012d74] mb-3"
                style={{ fontSize: "9px", letterSpacing: "0.1em" }}
              >
                / Svet
              </span>
              <h1
                className="font-garet font-bold italic text-[#051937] leading-tight"
                style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)" }}
              >
                {article.title_sk}
              </h1>
              <div className="flex items-center gap-4 mt-3">
                {article.scraped_at && (
                  <span className="font-bold uppercase text-[#94a3b8]" style={{ fontSize: "10px", letterSpacing: "0.1em" }}>
                    {formatDate(article.scraped_at)}
                  </span>
                )}
              </div>
            </div>

            {/* Article body */}
            <div className="max-w-none article-content">
              {article.text_sk ? (
                renderContent(article.text_sk)
              ) : (
                <p className="text-[#64748b]">Obsah článku nie je dostupný.</p>
              )}
            </div>

            <style>{`
              .article-content h2 { font-size: 22px; font-weight: 700; color: #051937; margin: 32px 0 12px; }
              .article-content h3 { font-size: 18px; font-weight: 700; color: #051937; margin: 24px 0 8px; }
              .article-content p { font-size: 15px; line-height: 1.8; color: #334155; margin: 12px 0; }
              .article-content ul, .article-content ol { padding-left: 24px; margin: 12px 0; }
              .article-content li { font-size: 15px; line-height: 1.7; color: #334155; margin: 6px 0; }
              .article-content blockquote { border-left: 3px solid #012d74; padding-left: 16px; margin: 20px 0; color: #64748b; font-style: italic; font-size: 15px; line-height: 1.7; }
              .article-content a { color: #016fb4; text-decoration: underline; }
              .article-content img { max-width: 100%; height: auto; border-radius: 8px; margin: 20px 0; }
              .article-content hr { border: none; border-top: 1px solid rgba(1,45,116,0.08); margin: 32px 0; }
            `}</style>

            {/* Tags / back link */}
            <div className="mt-12 pt-6 flex items-center justify-between flex-wrap gap-4" style={{ borderTop: "1px solid rgba(1,45,116,0.08)" }}>
              <span className="inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-[#e8f4fd] text-[#016fb4]">
                Svet
              </span>
              <Link
                href="/novinky/svet"
                className="flex items-center gap-2 font-bold text-[#051937] hover:text-[#012d74] transition-colors"
                style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase" }}
              >
                <svg className="h-3.5 w-3.5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                Späť na novinky zo sveta
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block self-start sticky top-[120px]">
            <div className="flex flex-col gap-0" style={{ background: "#fff", borderRadius: "8px", overflow: "hidden", boxShadow: "0 1px 3px rgba(1,45,116,0.06)" }}>
              <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(1,45,116,0.06)" }}>
                <p className="font-garet font-bold italic text-[#051937]" style={{ fontSize: "13px", letterSpacing: "0.03em" }}>
                  Ďalšie články zo sveta
                </p>
              </div>

              {relatedArticles.slice(0, 10).map((a: any, i: number) => (
                <Link
                  key={a.id}
                  href={`/novinky/svet/${a.id}`}
                  className="group flex gap-3.5 px-5 py-4 transition-colors hover:bg-[#f8f9fa]"
                  style={{ borderBottom: i < Math.min(relatedArticles.length, 10) - 1 ? "1px solid rgba(1,45,116,0.05)" : "none" }}
                >
                  {a.image_url && (
                    <div className="relative shrink-0 overflow-hidden" style={{ width: "72px", height: "50px", borderRadius: "4px" }}>
                      <Image
                        src={a.image_url}
                        alt={a.title_sk ?? ""}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="72px"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-[#051937] leading-snug line-clamp-2 group-hover:text-[#012d74] transition-colors" style={{ fontSize: "11px" }}>
                      {a.title_sk}
                    </h4>
                    {a.scraped_at && (
                      <p className="text-[#94a3b8] mt-1 font-bold uppercase" style={{ fontSize: "8px", letterSpacing: "0.1em" }}>
                        {formatDate(a.scraped_at)}
                      </p>
                    )}
                  </div>
                </Link>
              ))}

              <Link
                href="/novinky/svet"
                className="flex items-center justify-between px-5 py-3.5 font-bold text-[#012d74] hover:bg-[#f0f4fa] transition-colors"
                style={{ fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase", borderTop: "1px solid rgba(1,45,116,0.06)" }}
              >
                Všetky články zo sveta
                <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
