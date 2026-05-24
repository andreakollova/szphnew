import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { createBrowserSupabaseClient } from "@szph/db/client";
import { getPublishedArticles } from "@szph/db";
import { getPublishedVideos } from "@szph/db";
import { getUpcomingMatches } from "@szph/db";
import { getAllCompetitions } from "@szph/db";
import { getPartners } from "@szph/db";
import { ArticleCard, VideoCard, MatchCenter, GlassCard, GlassPanel } from "@szph/ui";
import { HeroSection } from "./components/HeroSection";
import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@szph/db/client";

async function getData() {
  const cookieStore = await cookies();
  const supabase = createServerSupabaseClient(cookieStore);

  const [articles, videos, matches, competitions, partners] = await Promise.allSettled([
    getPublishedArticles(supabase, { site: "fieldhockey", limit: 6 }),
    getPublishedVideos(supabase, { site: "fieldhockey", limit: 8 }),
    getUpcomingMatches(supabase, { site: "fieldhockey", limit: 20 }),
    getAllCompetitions(supabase),
    getPartners(supabase),
  ]);

  return {
    articles: articles.status === "fulfilled" ? articles.value : [],
    videos:   videos.status === "fulfilled"   ? videos.value   : [],
    matches:  matches.status === "fulfilled"  ? matches.value  : [],
    competitions: competitions.status === "fulfilled" ? competitions.value : [],
    partners: partners.status === "fulfilled" ? partners.value : [],
  };
}

export default async function FieldhockeyHome() {
  const { articles, videos, matches, competitions, partners } = await getData();

  const featuredArticle = articles[0];
  const restArticles    = articles.slice(1, 5);
  const officialPartners     = partners.filter((p) => p.tier === "oficialny");
  const institucionalPartners = partners.filter((p) => p.tier === "institucionalny");

  return (
    <>
      {/* ======================================================
          HERO
          ====================================================== */}
      <HeroSection />

      {/* ======================================================
          NOVINKY
          ====================================================== */}
      <section className="container-szph py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="label-wide text-[var(--sky)]">Čerstvé správy</span>
            <h2 className="text-display text-white mt-1">Novinky</h2>
          </div>
          <Link
            href="/novinky"
            className="hidden sm:flex items-center gap-1 text-sm font-semibold text-white/50 transition-colors hover:text-white"
          >
            Všetky novinky
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {articles.length === 0 ? (
          <GlassPanel className="py-16 text-center">
            <p className="text-white/40">Žiadne novinky</p>
          </GlassPanel>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            {featuredArticle && (
              <ArticleCard article={featuredArticle} featured className="md:col-span-2" />
            )}
            <div className="flex flex-col gap-4">
              {restArticles.map((article, i) => (
                <ArticleCard key={article.id} article={article} delay={i * 0.08} compact />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ======================================================
          MATCH CENTER
          ====================================================== */}
      <section className="container-szph py-20 border-t border-white/5">
        <MatchCenter competitions={competitions} matches={matches} />
      </section>

      {/* ======================================================
          CTA BANNER — Spoznaj pozemný hokej
          ====================================================== */}
      <section className="relative my-10 overflow-hidden clip-diagonal">
        <div className="relative h-72 md:h-96">
          <Image
            src="/images/banner2.jpg"
            alt="Pozemný hokej"
            fill
            className="object-cover"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--ink)]/90 via-[var(--ink)]/60 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="container-szph">
              <span className="label-wide text-[var(--sky)]">Spoznaj šport</span>
              <h2 className="text-display font-garet font-black italic text-white mt-2 max-w-lg">
                Pozemný hokej je<br />
                <span className="text-[var(--sky)]">viac ako šport</span>
              </h2>
              <Link
                href="/o-pozemnom-hokeji"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[var(--sky)] px-6 py-3 font-garet text-sm font-bold text-white transition-all hover:bg-[var(--sky-light)] hover:gap-3"
              >
                Zisti viac
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          VIDEO ZÓNA
          ====================================================== */}
      {videos.length > 0 && (
        <section className="py-20 border-t border-white/5">
          <div className="container-szph mb-8 flex items-end justify-between">
            <div>
              <span className="label-wide text-[var(--sky)]">Sleduj nás</span>
              <h2 className="text-display text-white mt-1">Video zóna</h2>
            </div>
            <Link href="/video" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-white/50 transition-colors hover:text-white">
              Všetky videá
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="container-szph">
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none -mx-4 px-4">
              {videos.map((video, i) => (
                <div key={video.id} className="snap-start">
                  <VideoCard video={video} delay={i * 0.06} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ======================================================
          PARTNERI
          ====================================================== */}
      {partners.length > 0 && (
        <section className="container-szph py-20 border-t border-white/5">
          <div className="mb-10 text-center">
            <span className="label-wide text-white/40">Podporujú nás</span>
            <h2 className="text-headline text-white mt-2">Partneri a sponzori</h2>
          </div>

          {officialPartners.length > 0 && (
            <div className="mb-8">
              <p className="label-wide text-white/30 mb-4 text-center">Oficiálni partneri</p>
              <div className="flex flex-wrap items-center justify-center gap-8">
                {officialPartners.map((partner) => (
                  <PartnerLogo key={partner.id} partner={partner} large />
                ))}
              </div>
            </div>
          )}

          {institucionalPartners.length > 0 && (
            <div>
              <p className="label-wide text-white/30 mb-4 text-center">Inštitucionálni partneri</p>
              <div className="flex flex-wrap items-center justify-center gap-6">
                {institucionalPartners.map((partner) => (
                  <PartnerLogo key={partner.id} partner={partner} />
                ))}
              </div>
            </div>
          )}
        </section>
      )}
    </>
  );
}

function PartnerLogo({
  partner,
  large = false,
}: {
  partner: { id: string; name: string; logo_url: string | null; url: string | null };
  large?: boolean;
}) {
  const content = partner.logo_url ? (
    <Image
      src={partner.logo_url}
      alt={partner.name}
      width={large ? 140 : 100}
      height={large ? 56 : 40}
      className="object-contain opacity-60 transition-opacity hover:opacity-100 filter brightness-0 invert"
    />
  ) : (
    <span className="text-sm font-bold text-white/50">{partner.name}</span>
  );

  if (partner.url) {
    return (
      <a href={partner.url} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return <div>{content}</div>;
}
