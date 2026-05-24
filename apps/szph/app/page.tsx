import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@szph/db/client";
import { getPublishedArticles, getPublishedVideos, getUpcomingMatches, getAllCompetitions, getPartners } from "@szph/db";
import { ArticleCard, VideoCard, MatchCenter, GlassCard, GlassPanel } from "@szph/ui";

async function getData() {
  const cookieStore = await cookies();
  const supabase = createServerSupabaseClient(cookieStore);

  const [articles, videos, matches, competitions, partners] = await Promise.allSettled([
    getPublishedArticles(supabase, { site: "szph", limit: 6 }),
    getPublishedVideos(supabase, { site: "szph", limit: 6 }),
    getUpcomingMatches(supabase, { site: "szph", limit: 20 }),
    getAllCompetitions(supabase),
    getPartners(supabase),
  ]);

  return {
    articles:     articles.status === "fulfilled"     ? articles.value     : [],
    videos:       videos.status === "fulfilled"       ? videos.value       : [],
    matches:      matches.status === "fulfilled"      ? matches.value      : [],
    competitions: competitions.status === "fulfilled" ? competitions.value : [],
    partners:     partners.status === "fulfilled"     ? partners.value     : [],
  };
}

export default async function SzphHome() {
  const { articles, videos, matches, competitions, partners } = await getData();

  return (
    <>
      {/* ======================================================
          HERO — striedmejší, inštitucionálny
          ====================================================== */}
      <section className="relative min-h-[70vh] flex items-end pb-16 pt-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/banner2.jpg"
            alt="SZPH hero"
            fill
            className="object-cover object-center"
            priority
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-bg)] via-[var(--brand-bg)]/60 to-[var(--brand-bg)]/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-bg)]/80 to-transparent" />
        </div>

        {/* Bottom accent */}
        <div
          className="absolute bottom-0 inset-x-0 h-1"
          style={{ background: "linear-gradient(90deg, var(--navy) 0%, var(--red) 100%)" }}
        />

        <div className="container-szph relative z-10">
          <span className="label-wide text-[var(--sky)]">Slovenský zväz pozemného hokeja</span>
          <h1 className="text-display font-garet font-black text-white mt-3 max-w-2xl">
            Riadime slovenský<br />
            <span className="text-[var(--sky)]">pozemný hokej</span>
          </h1>
          <p className="mt-4 text-white/60 max-w-lg">
            Oficiálna stránka Slovenského zväzu pozemného hokeja. Informácie pre kluby, funkcionárov, médiá a partnerov.
          </p>

          {/* Quick links */}
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              { label: "Dokumenty", href: "/dokumenty", icon: "📄" },
              { label: "Pre kluby", href: "/pre-kluby", icon: "🏒" },
              { label: "Kontakt",   href: "/kontakt",   icon: "✉️" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                {link.icon} {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================
          RÝCHLE SEKCIE
          ====================================================== */}
      <section className="container-szph py-16">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              title: "Všetko o pozemnom hokeji",
              desc:  "História, pravidlá, slovenská liga a medzinárodné súťaže.",
              href:  "/o-pozemnom-hokeji",
              icon:  "🏑",
              color: "var(--sky)",
            },
            {
              title: "Pre kluby",
              desc:  "Registrácia, pravidlá, formuláre a všetko pre členské kluby.",
              href:  "/pre-kluby",
              icon:  "🏛️",
              color: "var(--navy-light)",
            },
            {
              title: "Dokumenty a smernice",
              desc:  "Stanovy, predpisy, smernice a oficiálne dokumenty SZPH.",
              href:  "/dokumenty",
              icon:  "📋",
              color: "var(--red)",
            },
          ].map((item, i) => (
            <GlassCard key={item.href} delay={i * 0.1} hover className="p-6 group cursor-pointer">
              <Link href={item.href} className="block h-full">
                <span className="text-3xl">{item.icon}</span>
                <h3
                  className="font-garet text-lg font-bold text-white mt-4 transition-colors group-hover:text-[var(--sky)]"
                >
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-white/50">{item.desc}</p>
                <div
                  className="mt-4 flex items-center gap-1 text-sm font-semibold transition-all group-hover:gap-2"
                  style={{ color: item.color }}
                >
                  Viac info
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* ======================================================
          NOVINKY
          ====================================================== */}
      <section className="container-szph py-16 border-t border-white/5">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <span className="label-wide text-[var(--sky)]">Aktuálne</span>
            <h2 className="text-headline text-white mt-1">Novinky a oznamy</h2>
          </div>
          <Link href="/novinky" className="hidden sm:flex items-center gap-1 text-sm text-white/50 hover:text-white">
            Všetky novinky →
          </Link>
        </div>

        {articles.length === 0 ? (
          <GlassPanel className="py-12 text-center"><p className="text-white/40">Žiadne novinky</p></GlassPanel>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {articles.slice(0, 6).map((article, i) => (
              <ArticleCard key={article.id} article={article} delay={i * 0.06} />
            ))}
          </div>
        )}
      </section>

      {/* ======================================================
          MATCH CENTER
          ====================================================== */}
      <section className="container-szph py-16 border-t border-white/5">
        <MatchCenter competitions={competitions} matches={matches} />
      </section>

      {/* ======================================================
          VIDEO
          ====================================================== */}
      {videos.length > 0 && (
        <section className="py-16 border-t border-white/5">
          <div className="container-szph mb-6 flex items-end justify-between">
            <div>
              <span className="label-wide text-[var(--sky)]">Multimedia</span>
              <h2 className="text-headline text-white mt-1">Video</h2>
            </div>
            <Link href="/video" className="hidden sm:flex items-center gap-1 text-sm text-white/50 hover:text-white">
              Všetky videá →
            </Link>
          </div>
          <div className="container-szph">
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x scrollbar-none -mx-4 px-4">
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
        <section className="container-szph py-16 border-t border-white/5">
          <div className="mb-8 text-center">
            <span className="label-wide text-white/40">Partneri SZPH</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-10">
            {partners.map((p) => (
              <div key={p.id} className="text-sm font-semibold text-white/40">
                {p.name}
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
