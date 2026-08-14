import { unstable_cache } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("sk-SK", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function SvetArticleDetail({ params }: Props) {
  const { id } = await params;
  const article = await getArticle(id);
  if (!article) notFound();

  const paragraphs = (article.text_sk || "").split("\n\n").filter(Boolean);

  return (
    <div style={{ background: "#f8f9fa", minHeight: "100vh" }}>
      {/* Hero image */}
      {article.image_url && (
        <div className="relative w-full overflow-hidden" style={{ height: "clamp(200px, 40vw, 420px)" }}>
          <Image
            src={article.image_url}
            alt={article.title_sk}
            fill
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, rgba(5,25,55,0.7) 0%, transparent 60%)",
            }}
          />
        </div>
      )}

      <div className="px-6 lg:px-10 xl:px-16 max-w-[900px] mx-auto pt-8 pb-20">
        {/* Back link */}
        <Link
          href="/novinky/svet"
          className="inline-flex items-center gap-2 font-bold text-[#012d74] hover:text-[#051937] transition-colors mb-6"
          style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase" }}
        >
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Späť na novinky zo sveta
        </Link>

        {/* Category + date */}
        <div className="flex items-center gap-3 mb-4">
          <span
            className="inline-block font-extrabold uppercase text-[#012d74]"
            style={{ fontSize: "9px", letterSpacing: "0.1em" }}
          >
            / svet
          </span>
          {article.scraped_at && (
            <span
              className="text-[#64748b] font-bold uppercase"
              style={{ fontSize: "9px", letterSpacing: "0.08em" }}
            >
              {formatDate(article.scraped_at)}
            </span>
          )}
        </div>

        {/* Title */}
        <h1
          className="font-garet font-bold text-[#051937] mb-8"
          style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)", lineHeight: 1.25 }}
        >
          {article.title_sk}
        </h1>

        {/* Body */}
        <div className="space-y-4">
          {paragraphs.map((para: string, i: number) => (
            <p
              key={i}
              className="text-[#334155] leading-relaxed"
              style={{ fontSize: "15px" }}
            >
              {para}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
