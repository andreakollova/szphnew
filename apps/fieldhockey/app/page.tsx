import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@szph/db/client";
import { getPublishedArticles, getPublishedVideos, getUpcomingMatches, getAllCompetitions, getPartners } from "@szph/db";
import { ArticleCard, VideoCard, MatchCenter } from "@szph/ui";
import { HeroSection } from "./components/HeroSection";
import type { Partner } from "@szph/db/types";

/* ── Mock data pre prípad prázdnej DB ── */
const MOCK_ARTICLES = [
  {
    id: "m1", slug: "olympijsky-festival-pozemny-hokej", title: "Olympijský festival sme odštartovali s pozemným hokejom",
    excerpt: "Slovenský pozemný hokej sa predstavil na Olympijskom festivale mládeže v Bratislave. Stovky detí si vyskúšali šport pod vedením slovenských reprezentantov.",
    cover_image_url: "/images/banner1.jpg", category: "novinky", published_at: "2025-06-15T10:00:00Z", site: "fieldhockey", status: "published",
  },
  {
    id: "m2", slug: "reprezentacia-fih-nations-cup", title: "Reprezentácia odcestovala na FIH Nations Cup do Maďarska",
    excerpt: "Slovenská mužská reprezentácia odcestovala na medzinárodný turnaj FIH Nations Cup, kde ich čakajú súboje s Maďarskom, Rakúskom a Českou republikou.",
    cover_image_url: "/images/banner2.jpg", category: "reprezentacia", published_at: "2025-06-10T08:00:00Z", site: "fieldhockey", status: "published",
  },
  {
    id: "m3", slug: "nova-sezona-2025-2026", title: "Nová sezóna pozemného hokeja 2025/2026 je tu — čo nás čaká?",
    excerpt: "Nový ročník Mužskej ligy a Ženskej ligy štartuje v septembri. Zistite, kto sú favoriti a aké zmeny prináša nová sezóna.",
    cover_image_url: "/images/banner3.jpg", category: "novinky", published_at: "2025-06-05T12:00:00Z", site: "fieldhockey", status: "published",
  },
  {
    id: "m4", slug: "mladeznicke-turnaje-vysledky", title: "Mládežnícke turnaje: Výsledky z víkendových kôl U14 a U18",
    excerpt: "Víkend bol plný akcie na trávnikoch po celom Slovensku. Prinášame prehľad výsledkov z mládežníckych kôl kategórií U14 a U18.",
    cover_image_url: "/images/banner4.jpg", category: "kluby", published_at: "2025-06-02T16:00:00Z", site: "fieldhockey", status: "published",
  },
] as any[];

const MOCK_VIDEOS = [
  { id: "v1", title: "Zápas KPH Rača vs. HOKO ZM — najlepšie momenty", youtube_url: null, thumbnail_url: "/images/banner1.jpg", duration: "4:32" },
  { id: "v2", title: "Tréningový záber — slovenská reprezentácia", youtube_url: null, thumbnail_url: "/images/banner2.jpg", duration: "2:15" },
  { id: "v3", title: "Olympijský festival mládeže 2025", youtube_url: null, thumbnail_url: "/images/banner3.jpg", duration: "6:48" },
  { id: "v4", title: "Rozhovor s trénerom Petrom Novákom", youtube_url: null, thumbnail_url: "/images/banner4.jpg", duration: "8:12" },
  { id: "v5", title: "Projekt Začni hrať hokej — školy 2025", youtube_url: null, thumbnail_url: "/images/banner1.jpg", duration: "3:27" },
] as any[];

async function getData() {
  const cookieStore = await cookies();
  const supabase = createServerSupabaseClient(cookieStore);
  const [articles, videos, matches, competitions, partners] = await Promise.allSettled([
    getPublishedArticles(supabase, { site: "fieldhockey", limit: 8 }),
    getPublishedVideos(supabase, { site: "fieldhockey", limit: 6 }),
    getUpcomingMatches(supabase, { site: "fieldhockey", limit: 20 }),
    getAllCompetitions(supabase),
    getPartners(supabase),
  ]);
  return {
    articles:     articles.status === "fulfilled" && articles.value.length > 0     ? articles.value     : MOCK_ARTICLES,
    videos:       videos.status === "fulfilled"   && videos.value.length > 0       ? videos.value       : MOCK_VIDEOS,
    matches:      matches.status === "fulfilled"      ? matches.value      : [],
    competitions: competitions.status === "fulfilled" ? competitions.value : [],
    partners:     partners.status === "fulfilled"     ? partners.value     : [],
  };
}

/* ── Section heading ──────────────────────────────────── */
function SectionHeading({ label, title, light = false, href, hrefLabel }: {
  label?: string; title: string; light?: boolean; href?: string; hrefLabel?: string;
}) {
  return (
    <div className="flex items-end justify-between mb-8">
      <div>
        {label && <span className={`label-wide block mb-1.5 ${light ? "text-white/50" : "text-[var(--sky)]"}`}>{label}</span>}
        <h2 className={`font-garet font-black text-[var(--sky)] leading-tight`}
          style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontStyle: "italic" }}>
          {title}
        </h2>
      </div>
      {href && (
        <Link href={href} className={`hidden sm:flex items-center gap-1 text-sm font-semibold transition-colors ${light ? "text-white/50 hover:text-white" : "text-[var(--sky)] hover:text-[var(--navy)]"}`}>
          {hrefLabel || "Viac"}
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      )}
    </div>
  );
}

export default async function FieldhockeyHome() {
  const { articles, videos, matches, competitions, partners } = await getData();
  const featuredArticle = articles[0];
  const newsArticles    = articles.slice(1, 5);
  const officialPartners      = partners.filter(p => p.tier === "oficialny");
  const institucionalPartners = partners.filter(p => p.tier === "institucionalny");

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          HERO — full-width photo
          ═══════════════════════════════════════════════════ */}
      <HeroSection />

      {/* ═══════════════════════════════════════════════════════
          QUICK NAV
          ═══════════════════════════════════════════════════ */}
      <section className="bg-white border-b border-[var(--border)]">
        <div className="container-szph">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
            {[
              {
                title: "VŠETKO O POZEMNOM HOKEJI",
                links: ["História", "Pravidlá", "Súťaže", "Reprezentácia"],
                href: "/o-pozemnom-hokeji",
              },
              {
                title: "SPOZNAJ POZEMNÝ HOKEJ",
                links: ["Čo je to?", "Chcem začať hrať", "Kluby na Slovensku", "Kde trénovať"],
                href: "/o-pozemnom-hokeji/chcem-zacat",
              },
              {
                title: "PRE KLUBY",
                links: ["Registrácia hráča", "Súťažný poriadok", "Hospodárenie", "Kontakt SZPH"],
                href: "/pre-kluby",
              },
            ].map((col) => (
              <Link key={col.href} href={col.href} className="group block px-6 py-7 hover:bg-[var(--bg-blue)] transition-colors">
                <span className="label-wide text-[var(--navy)] block mb-3">{col.title}</span>
                <ul className="space-y-1.5">
                  {col.links.map((l) => (
                    <li key={l} className="text-sm text-[var(--text-muted)] group-hover:text-[var(--navy)] transition-colors flex items-center gap-1.5">
                      <span className="h-1 w-1 rounded-full bg-[var(--sky)] shrink-0" />
                      {l}
                    </li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          NOVINKY REPREZENTACIE + LISTKY
          ═══════════════════════════════════════════════════ */}
      <section className="bg-white py-16">
        <div className="container-szph">
          <SectionHeading title="Novinky reprezentácie" href="/reprezentacia" hrefLabel="Všetky novinky" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Featured article */}
            <div className="lg:col-span-2">
              {featuredArticle ? (
                <Link href={`/novinky/${featuredArticle.slug}`} className="card group block overflow-hidden h-full">
                  <div className="relative h-56 md:h-72 overflow-hidden">
                    {featuredArticle.cover_image_url ? (
                      <Image src={featuredArticle.cover_image_url} alt={featuredArticle.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="w-full h-full bg-[var(--bg-blue)]" />
                    )}
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,14,26,0.85) 0%, transparent 60%)" }} />
                    <div className="absolute bottom-0 p-5">
                      <span className="label-wide text-[var(--sky)] block mb-1.5">{featuredArticle.category}</span>
                      <h3 className="font-garet font-bold text-white text-lg leading-tight">{featuredArticle.title}</h3>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-[var(--text-muted)] line-clamp-2">{featuredArticle.excerpt}</p>
                  </div>
                </Link>
              ) : (
                <div className="card h-72 flex items-center justify-center bg-[var(--bg-blue)]">
                  <span className="text-[var(--text-muted)] text-sm">Ziadne novinky</span>
                </div>
              )}
            </div>

            {/* Side: small articles + ticket CTA */}
            <div className="flex flex-col gap-4">
              {newsArticles.slice(0, 2).map((article) => (
                <Link key={article.id} href={`/novinky/${article.slug}`} className="card group flex gap-4 p-4 overflow-hidden">
                  <div className="relative h-20 w-24 shrink-0 rounded-lg overflow-hidden">
                    {article.cover_image_url ? (
                      <Image src={article.cover_image_url} alt={article.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="w-full h-full bg-[var(--bg-blue)]" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <span className="label-wide text-[var(--sky)] block mb-1">{article.category}</span>
                    <h4 className="font-semibold text-[var(--text)] text-sm leading-snug line-clamp-3 group-hover:text-[var(--sky)] transition-colors">
                      {article.title}
                    </h4>
                  </div>
                </Link>
              ))}

              {/* Listky CTA card */}
              <div
                className="rounded-2xl p-6 flex flex-col justify-between gap-4 flex-1"
                style={{ background: "linear-gradient(135deg, var(--navy-deep) 0%, var(--navy) 100%)" }}
              >
                <div>
                  <span className="label-wide text-[var(--sky)] block mb-2">Najbližšia akcia</span>
                  <p className="font-garet font-black italic text-white text-xl leading-tight">
                    Kúpte si svoje lístky tu!
                  </p>
                </div>
                <Link
                  href="/zapasy"
                  className="self-start inline-flex items-center gap-2 rounded-xl bg-[var(--red)] px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-[var(--red-dark)] hover:gap-3"
                >
                  Lístky
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          ZAPASOVE CENTRUM
          ═══════════════════════════════════════════════════ */}
      <section className="bg-[var(--bg-alt)] py-16">
        <div className="container-szph">
          <SectionHeading title="Zápasové centrum" href="/zapasy" hrefLabel="Všetky zápasy" />
          <MatchCenter competitions={competitions} matches={matches} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          PODCAST CTA — tmava navy sekcia s liquid glass
          ═══════════════════════════════════════════════════ */}
      <section className="section-dark py-14 relative overflow-hidden">
        {/* Decorative glow */}
        <div className="absolute top-0 left-1/4 w-96 h-96 opacity-20 blur-3xl rounded-full"
          style={{ background: "var(--sky)" }} />

        <div className="container-szph relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="label-wide text-[var(--sky)] block mb-3">Podcast</span>
              <p className="text-white/70 leading-relaxed max-w-sm">
                Vypočujte si najnovšie príbehy zo sveta pozemného hokeja. Rozhovory, analýzy a zákulisie slovenskej ligy.
              </p>
              <Link
                href="/podcast"
                className="mt-6 inline-flex items-center gap-2 glass px-5 py-2.5 text-sm font-bold text-white hover:bg-white/12 transition-all"
              >
                Počúvať podcast
              </Link>
            </div>
            <div className="glass p-8">
              <p className="font-garet font-black italic text-white text-3xl md:text-4xl leading-tight">
                "Budeme stavať nový štadión"
              </p>
              <div className="mt-4 flex gap-1.5">
                {[1,2,3].map(i => (
                  <span key={i} className={`h-1.5 rounded-full ${i === 1 ? "w-6 bg-[var(--sky)]" : "w-1.5 bg-white/25"}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          HOKEJOVE NOVINKY
          ═══════════════════════════════════════════════════ */}
      <section className="bg-white py-16">
        <div className="container-szph">
          <SectionHeading title="Hokejové novinky" href="/novinky" hrefLabel="Všetky novinky" />

          {articles.length === 0 ? (
            <div className="card py-16 text-center">
              <p className="text-[var(--text-muted)]">Ziadne novinky</p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {articles.slice(0, 4).map((article, i) => (
                <ArticleCard key={article.id} article={article} delay={i * 0.08} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          PROJEKTY — tmava navy s liquid glass kartami
          ═══════════════════════════════════════════════════ */}
      <section className="section-navy py-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />

        <div className="container-szph relative z-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-garet font-black italic text-white text-2xl md:text-3xl">Projekty</h2>
            <Link href="/projekty" className="label-wide text-white/40 hover:text-white transition-colors flex items-center gap-1">
              Viac
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                name: "Olympijská akadémia",
                desc: "Rozvoj mladých talentov v spolupráci s SOV a FIH.",
                img: "/images/banner1.jpg",
                href: "/projekty/olympijska-akademia",
              },
              {
                name: "Mládežnícke súťaže",
                desc: "Komplexný systém súťaží od U12 až po U18.",
                img: "/images/banner3.jpg",
                href: "/projekty/mladeznicke-sutaze",
              },
              {
                name: "Začni hrať hokej",
                desc: "Program na popularizáciu pozemného hokeja na školách.",
                img: "/images/banner4.jpg",
                href: "/projekty/zacni-hrat",
              },
              {
                name: "FIH Nations League",
                desc: "Slovensko v medzinárodných súťažiach FIH Nations League.",
                img: "/images/banner2.jpg",
                href: "/projekty/fih-nations-league",
              },
            ].map((proj) => (
              <Link key={proj.name} href={proj.href} className="glass group relative overflow-hidden aspect-video flex items-end p-4 hover:bg-white/10 transition-all">
                <Image src={proj.img} alt={proj.name} fill className="object-cover opacity-20 group-hover:opacity-30 transition-opacity" />
                <div className="relative z-10">
                  <p className="font-garet font-bold text-white text-sm leading-tight">{proj.name}</p>
                  <p className="text-white/55 text-xs mt-0.5 line-clamp-1">{proj.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          VIDEO ZONA
          ═══════════════════════════════════════════════════ */}
      <section className="bg-white py-16">
        <div className="container-szph">
          <SectionHeading title="Video zóna" href="/video" hrefLabel="Všetky videá" />

          {videos.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {videos.slice(0, 5).map((video, i) => (
                <VideoCard key={video.id} video={video} delay={i * 0.06} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="card aspect-video bg-[var(--bg-blue)]" />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SPONZORI A PARTNERI
          ═══════════════════════════════════════════════════ */}
      {partners.length > 0 && (
        <section className="bg-[var(--bg-alt)] py-14 border-t border-[var(--border)]">
          <div className="container-szph">
            {officialPartners.length > 0 && (
              <div className="mb-10">
                <p className="label-wide text-[var(--text-muted)] text-center mb-6">Oficiálni sponzori a partneri</p>
                <div className="flex flex-wrap items-center justify-center gap-10">
                  {officialPartners.map(p => <PartnerLogo key={p.id} partner={p} large />)}
                </div>
              </div>
            )}
            {institucionalPartners.length > 0 && (
              <div>
                <p className="label-wide text-[var(--text-muted)] text-center mb-6">Inštitucionálni partneri</p>
                <div className="flex flex-wrap items-center justify-center gap-8">
                  {institucionalPartners.map(p => <PartnerLogo key={p.id} partner={p} />)}
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}

function PartnerLogo({ partner, large = false }: { partner: Partner; large?: boolean }) {
  const img = partner.logo_url ? (
    <Image
      src={partner.logo_url}
      alt={partner.name}
      width={large ? 130 : 90}
      height={large ? 52 : 36}
      className="object-contain opacity-60 hover:opacity-100 transition-opacity"
    />
  ) : (
    <span className="text-sm font-bold text-[var(--text-muted)]">{partner.name}</span>
  );
  if (partner.url) return <a href={partner.url} target="_blank" rel="noopener noreferrer">{img}</a>;
  return <div>{img}</div>;
}
