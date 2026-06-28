import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createServerSupabaseClient } from "@szph/db/client";
import { getArticleBySlug, getPublishedArticles, getRecentMatches } from "@szph/db";
import { formatDate } from "@szph/ui";
import type { Metadata } from "next";
import type { Match } from "@szph/db/types";

const CATEGORY_LABELS: Record<string, string> = {
  novinky: "Novinky",
  reprezentacia: "Reprezentácia",
  kluby: "Kluby",
  oznamy: "Oznamy",
};

const CATEGORY_COLORS: Record<string, string> = {
  novinky: "bg-[#e8f4fd] text-[#016fb4]",
  reprezentacia: "bg-[#012d74]/10 text-[#012d74]",
  kluby: "bg-[#f0f4fa] text-[#012d74]/70",
  oznamy: "bg-amber-50 text-amber-700",
};

interface Props {
  params: Promise<{ slug: string }>;
}

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
      images: article.cover_image_url ? [article.cover_image_url] : undefined,
    },
  };
}

function SidebarMatchCard({ match }: { match: Match }) {
  const { home_team, away_team, home_score, away_score, match_date, competition } = match;
  const homeWin = (home_score ?? 0) > (away_score ?? 0);
  const awayWin = (away_score ?? 0) > (home_score ?? 0);

  return (
    <div className="py-3" style={{ borderBottom: "1px solid rgba(1,45,116,0.06)" }}>
      <div className="flex items-center justify-between mb-1.5">
        <span className="font-bold uppercase text-[#94a3b8]" style={{ fontSize: "8px", letterSpacing: "0.12em" }}>
          {competition?.name ?? "Súťaž"}
        </span>
        <span className="font-bold uppercase text-[#94a3b8]" style={{ fontSize: "8px", letterSpacing: "0.1em" }}>
          {formatDate(match_date)}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className={`font-bold text-[#051937] flex-1 truncate ${awayWin ? "opacity-40" : ""}`} style={{ fontSize: "11px" }}>
          {home_team?.short_name ?? home_team?.name ?? "Domáci"}
        </span>
        <div className="flex items-center gap-1 shrink-0 px-1">
          <span className={`font-garet font-black ${homeWin ? "text-[#051937]" : "text-[#94a3b8]"}`} style={{ fontSize: "16px" }}>
            {home_score}
          </span>
          <span className="text-[#94a3b8] font-bold" style={{ fontSize: "10px" }}>:</span>
          <span className={`font-garet font-black ${awayWin ? "text-[#051937]" : "text-[#94a3b8]"}`} style={{ fontSize: "16px" }}>
            {away_score}
          </span>
        </div>
        <span className={`font-bold text-[#051937] flex-1 truncate text-right ${homeWin ? "opacity-40" : ""}`} style={{ fontSize: "11px" }}>
          {away_team?.short_name ?? away_team?.name ?? "Hosťujúci"}
        </span>
      </div>
    </div>
  );
}

function renderContent(content: string) {
  // Parse markdown-like content into HTML
  const blocks = content.split("\n\n").filter(Boolean);

  return blocks.map((block, i) => {
    // Headings
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

    // Blockquote
    if (block.startsWith("> ")) {
      return (
        <blockquote
          key={i}
          className="my-6 pl-5 text-[#64748b] italic"
          style={{ borderLeft: "3px solid #C8102E", fontSize: "15px", lineHeight: 1.7 }}
        >
          {block.replace(/^> /gm, "")}
        </blockquote>
      );
    }

    // List items
    if (block.startsWith("- ")) {
      const items = block.split("\n").filter(l => l.startsWith("- "));
      return (
        <ul key={i} className="my-4 space-y-2 pl-5" style={{ listStyleType: "disc" }}>
          {items.map((item, j) => (
            <li key={j} className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.7 }}>
              {item.replace("- ", "")}
            </li>
          ))}
        </ul>
      );
    }

    // Regular paragraph
    return (
      <p key={i} className="text-[#334155] my-4" style={{ fontSize: "15px", lineHeight: 1.8 }}>
        {block}
      </p>
    );
  });
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const supabase = createServerSupabaseClient(cookieStore);

  const [article, recentArticles, recentMatches] = await Promise.all([
    getArticleBySlug(supabase, slug),
    getPublishedArticles(supabase, { site: "szph", limit: 5 }).catch(() => []),
    getRecentMatches(supabase, { site: "szph", limit: 5 }).catch(() => []),
  ]);

  if (!article) notFound();

  // Filter out current article from related
  const relatedArticles = recentArticles.filter((a) => a.id !== article.id).slice(0, 4);

  return (
    <article className="pb-20" style={{ background: "#f8f9fa" }}>
      {/* ── Hero cover image ── */}
      {article.cover_image_url && (
        <div className="relative w-full" style={{ height: "clamp(280px, 40vw, 520px)" }}>
          <Image
            src={article.cover_image_url}
            alt={article.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(5,25,55,0.85) 0%, rgba(5,25,55,0.2) 50%, transparent 100%)" }}
          />
          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 px-6 lg:px-10 xl:px-16 pb-10 max-w-[1600px] mx-auto">
            <span
              className={`inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider mb-4 ${CATEGORY_COLORS[article.category] ?? CATEGORY_COLORS.novinky}`}
            >
              {CATEGORY_LABELS[article.category] ?? article.category}
            </span>
            <h1
              className="font-garet font-black text-white leading-tight max-w-3xl"
              style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)" }}
            >
              {article.title}
            </h1>
            <div className="flex items-center gap-4 mt-4">
              {article.published_at && (
                <span className="font-bold uppercase text-white/50" style={{ fontSize: "10px", letterSpacing: "0.1em" }}>
                  {formatDate(article.published_at)}
                </span>
              )}
              {article.author?.full_name && (
                <>
                  <span className="text-white/20">·</span>
                  <span className="font-bold uppercase text-white/50" style={{ fontSize: "10px", letterSpacing: "0.1em" }}>
                    {article.author.full_name}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Content + Sidebar ── */}
      <div className="px-6 lg:px-10 xl:px-16 max-w-[1600px] mx-auto pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-0 items-start">

          {/* ── Main content ── */}
          <div className="pr-0 lg:pr-10 xl:pr-14">
            {/* No cover? Show title inline */}
            {!article.cover_image_url && (
              <div className="mb-8">
                <span
                  className={`inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider mb-4 ${CATEGORY_COLORS[article.category] ?? CATEGORY_COLORS.novinky}`}
                >
                  {CATEGORY_LABELS[article.category] ?? article.category}
                </span>
                <h1 className="font-garet font-black text-[#051937] leading-tight" style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)" }}>
                  {article.title}
                </h1>
                {article.published_at && (
                  <p className="font-bold uppercase text-[#94a3b8] mt-3" style={{ fontSize: "10px", letterSpacing: "0.1em" }}>
                    {formatDate(article.published_at)}
                  </p>
                )}
              </div>
            )}

            {/* Excerpt */}
            {article.excerpt && (
              <p className="text-[#051937] font-semibold mb-8" style={{ fontSize: "17px", lineHeight: 1.7 }}>
                {article.excerpt}
              </p>
            )}

            {/* Article body */}
            <div className="max-w-none article-content">
              {article.content ? (
                article.content.startsWith("<") ? (
                  <div dangerouslySetInnerHTML={{ __html: article.content }} />
                ) : (
                  renderContent(article.content)
                )
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
              .article-content blockquote { border-left: 3px solid #C8102E; padding-left: 16px; margin: 20px 0; color: #64748b; font-style: italic; font-size: 15px; line-height: 1.7; }
              .article-content a { color: #016fb4; text-decoration: underline; }
              .article-content img { max-width: 100%; height: auto; border-radius: 8px; margin: 20px 0; }
              .article-content hr { border: none; border-top: 1px solid rgba(1,45,116,0.08); margin: 32px 0; }
              .article-content iframe { max-width: 100%; border-radius: 8px; margin: 20px 0; }
            `}</style>

            {/* Tags / share */}
            <div className="mt-12 pt-6 flex items-center justify-between flex-wrap gap-4" style={{ borderTop: "1px solid rgba(1,45,116,0.08)" }}>
              <span
                className={`inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${CATEGORY_COLORS[article.category] ?? CATEGORY_COLORS.novinky}`}
              >
                {CATEGORY_LABELS[article.category] ?? article.category}
              </span>
              <Link
                href="/novinky"
                className="flex items-center gap-2 font-bold text-[#051937] hover:text-[#C8102E] transition-colors"
                style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase" }}
              >
                <svg className="h-3.5 w-3.5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                Späť na novinky
              </Link>
            </div>
          </div>

          {/* ── Sidebar ── */}
          <aside
            className="pl-0 lg:pl-8 pt-8 lg:pt-0 self-start sticky top-[120px] flex flex-col gap-6"
            style={{ borderLeft: "none" }}
          >
            <div className="hidden lg:block" style={{ borderLeft: "1px solid rgba(1,45,116,0.08)", paddingLeft: "2rem" }}>
              {/* Posledné výsledky */}
              {recentMatches.length > 0 && (
                <div className="mb-8">
                  <p
                    className="font-garet font-bold italic text-[#051937] mb-2"
                    style={{ fontSize: "13px", letterSpacing: "0.05em", textTransform: "uppercase" }}
                  >
                    Posledné výsledky
                  </p>
                  <div className="mb-4" style={{ width: "28px", height: "2px", background: "#C8102E" }} />

                  <div>
                    {recentMatches.map((match) => (
                      <SidebarMatchCard key={match.id} match={match} />
                    ))}
                  </div>

                  <Link
                    href="/zapasy"
                    className="mt-3 flex items-center justify-between px-4 py-3 font-bold text-white w-full"
                    style={{ background: "#051937", fontSize: "10px", letterSpacing: "0.06em" }}
                  >
                    Všetky výsledky
                    <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              )}

              {/* Ďalšie články */}
              {relatedArticles.length > 0 && (
                <div>
                  <p
                    className="font-garet font-bold italic text-[#051937] mb-2"
                    style={{ fontSize: "13px", letterSpacing: "0.05em", textTransform: "uppercase" }}
                  >
                    Ďalšie články
                  </p>
                  <div className="mb-4" style={{ width: "28px", height: "2px", background: "#C8102E" }} />

                  <div className="flex flex-col gap-4">
                    {relatedArticles.map((a) => (
                      <Link key={a.id} href={`/novinky/${a.slug}`} className="group flex gap-3">
                        {a.cover_image_url && (
                          <div className="relative shrink-0 overflow-hidden" style={{ width: "80px", height: "56px", borderRadius: "4px" }}>
                            <Image
                              src={a.cover_image_url}
                              alt={a.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              sizes="80px"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h4
                            className="font-bold text-[#051937] leading-snug line-clamp-2 group-hover:text-[#016fb4] transition-colors"
                            style={{ fontSize: "12px" }}
                          >
                            {a.title}
                          </h4>
                          {a.published_at && (
                            <p className="text-[#94a3b8] mt-1 font-bold uppercase" style={{ fontSize: "8px", letterSpacing: "0.1em" }}>
                              {formatDate(a.published_at)}
                            </p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
