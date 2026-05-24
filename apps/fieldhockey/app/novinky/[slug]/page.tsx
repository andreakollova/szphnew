import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@szph/db/client";
import { getArticleBySlug } from "@szph/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@szph/ui";
import type { Metadata } from "next";

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cookieStore = await cookies();
  const supabase = createServerSupabaseClient(cookieStore);
  const article = await getArticleBySlug(supabase, slug);
  if (!article) return { title: "Článok nenájdený" };
  return {
    title: article.title,
    description: article.excerpt ?? undefined,
    openGraph: {
      title: article.title,
      description: article.excerpt ?? undefined,
      images: article.cover_image_url ? [article.cover_image_url] : [],
    },
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const supabase = createServerSupabaseClient(cookieStore);
  const article = await getArticleBySlug(supabase, slug);
  if (!article) notFound();

  return (
    <article className="min-h-screen pt-20">
      {/* Hero */}
      {article.cover_image_url && (
        <div className="relative h-72 w-full overflow-hidden md:h-96">
          <Image
            src={article.cover_image_url}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-bg)] via-[var(--brand-bg)]/30 to-transparent" />
        </div>
      )}

      <div className="container-szph py-12 max-w-3xl">
        {/* Breadcrumb */}
        <Link href="/novinky" className="label-wide text-[var(--sky)] hover:underline mb-6 inline-block">
          ← Späť na novinky
        </Link>

        {/* Meta */}
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="label-wide rounded-full bg-[var(--sky)]/20 px-3 py-0.5 text-[var(--sky)] text-[10px]">
            {article.category}
          </span>
          {article.published_at && (
            <span className="text-xs text-white/40">{formatDate(article.published_at)}</span>
          )}
        </div>

        {/* Nadpis */}
        <h1 className="text-display font-garet font-black text-white mb-6">{article.title}</h1>

        {/* Excerpt */}
        {article.excerpt && (
          <p className="text-lg text-white/70 mb-8 border-l-4 border-[var(--sky)] pl-5">
            {article.excerpt}
          </p>
        )}

        {/* Content — TODO: render markdown */}
        {article.content && (
          <div
            className="prose prose-invert prose-lg max-w-none
              prose-headings:font-garet prose-headings:font-bold
              prose-a:text-[var(--sky)] prose-a:no-underline hover:prose-a:underline"
          >
            <pre className="whitespace-pre-wrap text-white/70 font-inter text-base leading-relaxed">
              {article.content}
            </pre>
          </div>
        )}
      </div>
    </article>
  );
}
