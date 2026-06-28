import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@szph/db/client";
import { getPublishedArticles, getUpcomingMatches, getAllCompetitions } from "@szph/db";
import { MatchCenter } from "@szph/ui";
import { SzphHero } from "./components/SzphHero";
import { RychleOdkazy } from "./components/RychleOdkazy";
import { SzphDecoElements, SzphDecoDots } from "./components/SzphDecoElements";

const MOCK_ARTICLES = [
  {
    id: "s1", slug: "vyrocna-konferencia-szph-2025", title: "Výročná konferencia SZPH 2025 — prijaté rozhodnutia",
    excerpt: "Delegáti výročnej konferencie SZPH schválili nový rozpočet, plán rozvoja mládeže a aktualizáciu stanov zväzu. Prinášame kompletný prehľad prijatých uznesení.",
    cover_image_url: "/images/banner2.jpg", category: "oznamy", published_at: "2025-06-12T09:00:00Z", site: "szph", status: "published",
  },
  {
    id: "s2", slug: "novy-sutazny-poriadok-2025", title: "Nový súťažný poriadok pre sezónu 2025/2026 je schválený",
    excerpt: "Riadiaci zbor SZPH schválil aktualizovaný súťažný poriadok. Hlavné zmeny sa týkajú disciplinárnych konaní, registrácie hráčov a organizácie mládežníckych turnajov.",
    cover_image_url: "/images/banner1.jpg", category: "oznamy", published_at: "2025-06-08T11:00:00Z", site: "szph", status: "published",
  },
  {
    id: "s3", slug: "dotacie-msv-2025", title: "SZPH získal dotácie MŠVVaŠ SR na rozvoj mládeže 2025",
    excerpt: "Ministerstvo školstva, vedy, výskumu a športu SR pridelilo SZPH dotácie na rozvoj mládežníckeho pozemného hokeja. Finančné prostriedky budú smerovať do klubov.",
    cover_image_url: "/images/banner3.jpg", category: "novinky", published_at: "2025-06-03T14:00:00Z", site: "szph", status: "published",
  },
] as any[];

async function getWorldNews() {
  try {
    const { createClient } = await import("@supabase/supabase-js");
    const hr = createClient(
      "https://oivzvihdhidpbrjpygfl.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pdnp2aWhkaGlkcGJyanB5Z2ZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2MzI3MTgsImV4cCI6MjA5MDIwODcxOH0.7d917agBywM3D1RlFJ27oHTRvjBaE_pyDxCzLKaKaIE"
    );
    const { data } = await hr.from("articles").select("title_sk, image_url, url, scraped_at").eq("published", true).order("scraped_at", { ascending: false }).limit(4);
    return (data ?? []).map((a: any) => ({
      id: a.url,
      slug: a.url,
      title: a.title_sk ?? "",
      cover_image_url: a.image_url,
      category: "svet",
      published_at: a.scraped_at,
      status: "published",
      href: a.url,
    }));
  } catch { return []; }
}

async function getData() {
  const cookieStore = await cookies();
  const supabase = createServerSupabaseClient(cookieStore);
  const [articles, matches, competitions, worldNews] = await Promise.allSettled([
    getPublishedArticles(supabase, { site: "szph", limit: 12 }),
    getUpcomingMatches(supabase, { site: "szph", limit: 20 }),
    getAllCompetitions(supabase),
    getWorldNews(),
  ]);
  return {
    articles:     articles.status === "fulfilled" && articles.value.length > 0 ? articles.value : MOCK_ARTICLES,
    matches:      matches.status === "fulfilled"  ? matches.value  : [],
    competitions: competitions.status === "fulfilled" ? competitions.value : [],
    worldNews:    worldNews.status === "fulfilled" ? worldNews.value : [],
  };
}

function CardSection({ title, href, articles, cols = 3 }: { title: string; href: string; articles: any[]; cols?: number }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div style={{ width: "40px", height: "10px", borderRadius: "999px", background: "linear-gradient(90deg, transparent 0%, #C8102E 100%)" }} />
          <h2 className="font-garet font-bold italic text-[#051937]" style={{ fontSize: "13px", letterSpacing: "0.05em", textTransform: "uppercase" }}>
            {title}
          </h2>
        </div>
        <Link
          href={href}
          className="flex items-center gap-2 font-bold text-[#051937] hover:text-[#C8102E] transition-colors"
          style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase" }}
        >
          Zobraziť všetky
          <div className="flex items-center justify-center rounded-full border border-[#051937]" style={{ width: "26px", height: "26px" }}>
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </Link>
      </div>
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
        {articles.map((article) => (
          <Link key={article.id} href={`/novinky/${article.slug}`} className="group block overflow-hidden">
            <div className="relative overflow-hidden" style={{ height: "180px", borderRadius: "12px" }}>
              {article.cover_image_url ? (
                <Image src={article.cover_image_url} alt={article.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              ) : (
                <div className="w-full h-full bg-[#e2e8f0]" />
              )}
            </div>
            <div className="pt-3">
              <span className="inline-block font-bold uppercase text-white mb-1.5 rounded-full px-2.5 py-0.5" style={{ fontSize: "8px", letterSpacing: "0.12em", background: "#C8102E" }}>
                {article.category}
              </span>
              <h3 className="font-bold text-[#051937] leading-snug group-hover:text-[#012D74] transition-colors line-clamp-2" style={{ fontSize: "13px" }}>
                {article.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function SectionHeading({ label, title, href, hrefLabel, light = false }: {
  label?: string; title: string; href?: string; hrefLabel?: string; light?: boolean;
}) {
  return (
    <div className="flex items-end justify-between mb-8">
      <div>
        {label && <span className={`label-wide block mb-1.5 ${light ? "text-white/50" : "text-[var(--sky)]"}`}>{label}</span>}
        <h2 className="font-garet font-black text-[var(--sky)] leading-tight"
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

export default async function SzphHome() {
  const { articles, matches, competitions, worldNews } = await getData();

  return (
    <>
      <SzphHero />

      {/* ═══════════════════════════════════════════════════════
          AKTUALITY + RÝCHLE ODKAZY
          ═══════════════════════════════════════════════════ */}
      <section style={{ background: "#f8f9fa" }} className="relative pt-0 pb-12">
        <SzphDecoDots variant="light" />
        <div className="relative px-6 lg:px-10 xl:px-16 max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-0 items-start">

            {/* ── Ľavý stĺpec: Aktuality + Novinky + Reprezentácia ── */}
            <div className="pr-5 xl:pr-8 flex flex-col gap-10">

              {/* Aktuality */}
              <CardSection
                title="Aktuality"
                href="/novinky"
                articles={articles.slice(0, 3)}
              />

              {/* Novinky */}
              <CardSection
                title="Novinky"
                href="/novinky"
                articles={articles.slice(3, 6).length > 0 ? articles.slice(3, 6) : articles.slice(0, 3).map((a, i) => ({ ...a, id: a.id + "_n", cover_image_url: ["/images/banner3.jpg", "/images/banner4.jpg", "/images/banner1.jpg"][i] }))}
              />


            </div>

            {/* ── Rýchle Odkazy + Posledné zápasy rep. — sticky ── */}
            <div
              className="pl-5 xl:pl-8 pt-1 self-start sticky top-[120px] flex flex-col gap-5"
              style={{ borderLeft: "1px solid rgba(1,45,116,0.08)" }}
            >
              <RychleOdkazy />

              {/* Posledné zápasy reprezentácie */}
              <div className="pt-6">
                <p className="font-garet font-bold italic text-[#051937] mb-2" style={{ fontSize: "13px", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                  Posledné zápasy
                </p>
                <div className="mb-4" style={{ width: "28px", height: "2px", background: "#C8102E" }} />

                <div className="flex flex-col gap-1.5 overflow-hidden" style={{ borderRadius: "12px" }}>
                  {[
                    { home: "SVK", homeFull: "Slovensko", homeFlag: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Flag_of_Slovakia.svg/500px-Flag_of_Slovakia.svg.png", away: "CRO", awayFull: "Chorvátsko", awayFlag: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Flag_of_Croatia.svg", homeScore: 3, awayScore: 1, date: "12. 6.", competition: "EHC" },
                    { home: "SVK", homeFull: "Slovensko", homeFlag: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Flag_of_Slovakia.svg/500px-Flag_of_Slovakia.svg.png", away: "POL", awayFull: "Poľsko", awayFlag: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Flag_of_Poland.svg/500px-Flag_of_Poland.svg.png", homeScore: 1, awayScore: 2, date: "10. 6.", competition: "EHC" },
                    { home: "AUT", homeFull: "Rakúsko", homeFlag: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_Austria.svg/500px-Flag_of_Austria.svg.png", away: "SVK", awayFull: "Slovensko", awayFlag: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Flag_of_Slovakia.svg/500px-Flag_of_Slovakia.svg.png", homeScore: 0, awayScore: 4, date: "8. 6.", competition: "EHC" },
                  ].map((m, i) => {
                    const win = m.homeScore > m.awayScore;
                    const draw = m.homeScore === m.awayScore;
                    return (
                      <div key={i} className="bg-white" style={{ padding: "12px 14px" }}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold uppercase text-[#94a3b8]" style={{ fontSize: "8px", letterSpacing: "0.14em" }}>
                            {m.date} · {m.competition}
                          </span>
                          <span
                            className="font-bold uppercase"
                            style={{
                              fontSize: "8px",
                              letterSpacing: "0.1em",
                              color: win ? "#16a34a" : draw ? "#94a3b8" : "#C8102E",
                            }}
                          >
                            {win ? "Výhra" : draw ? "Remíza" : "Prehra"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {/* Home */}
                          <div className="flex items-center gap-1.5 flex-1 min-w-0">
                            <div className="relative shrink-0 overflow-hidden" style={{ width: "22px", height: "15px" }}>
                              <Image src={m.homeFlag} alt={m.homeFull} fill className="object-cover" sizes="22px" />
                            </div>
                            <span className="font-extrabold text-[#051937] truncate" style={{ fontSize: "10px" }}>{m.homeFull}</span>
                          </div>
                          {/* Score */}
                          <div className="shrink-0 flex items-center gap-1.5 px-2">
                            <span className="font-garet font-black text-[#051937]" style={{ fontSize: "18px", lineHeight: 1 }}>{m.homeScore}</span>
                            <span className="text-[#94a3b8]" style={{ fontSize: "11px" }}>–</span>
                            <span className="font-garet font-black text-[#051937]" style={{ fontSize: "18px", lineHeight: 1 }}>{m.awayScore}</span>
                          </div>
                          {/* Away */}
                          <div className="flex items-center gap-1.5 flex-1 min-w-0 justify-end">
                            <span className="font-extrabold text-[#051937] truncate" style={{ fontSize: "10px" }}>{m.awayFull}</span>
                            <div className="relative shrink-0 overflow-hidden" style={{ width: "22px", height: "15px" }}>
                              <Image src={m.awayFlag} alt={m.awayFull} fill className="object-cover" sizes="22px" />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Link
                  href="/reprezentacia"
                  className="mt-3 flex items-center justify-between px-4 py-3 font-bold text-white w-full"
                  style={{ background: "#051937", fontSize: "10px", letterSpacing: "0.06em", borderRadius: "10px" }}
                >
                  Všetky zápasy reprezentácie
                  <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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
      <section style={{ background: "#f8f9fa" }} className="relative py-14">
        <SzphDecoElements variant="light" />
        <div className="relative px-6 lg:px-10 xl:px-16 max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between mb-7">
            <div className="flex items-center gap-4">
              <div style={{ width: "50px", height: "12px", borderRadius: "999px", background: "linear-gradient(90deg, transparent 0%, #0A2472 100%)" }} />
              <h2
                className="font-bold text-[#051937]"
                style={{ fontSize: "clamp(1.4rem, 2.2vw, 2rem)" }}
              >
                Zápasové centrum
              </h2>
            </div>
            <Link href="/zapasy" className="hidden sm:flex items-center gap-1.5 font-bold text-[#94a3b8] hover:text-[#051937] transition-colors" style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Všetky zápasy
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <MatchCenter competitions={competitions} matches={matches} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          PODCAST
          ═══════════════════════════════════════════════════ */}
      <section
        className="relative py-16 mx-4 md:mx-8 overflow-hidden"
        style={{
          borderRadius: "24px",
          background: "linear-gradient(135deg, #020e1f 0%, #051937 25%, #071e42 50%, #020e1f 75%, #041530 100%)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 8px 40px rgba(5,25,55,0.4)",
        }}
      >
        {/* Glass shimmer overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.04) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(255,255,255,0.03) 0%, transparent 50%)",
          }}
        />
        <div className="relative px-6 lg:px-10 xl:px-16 max-w-[1600px] mx-auto">


          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-8 xl:gap-16 items-center">

            {/* Ľavý — text */}
            <div>
              {/* Logo */}
              <div className="mb-7" style={{ width: "180px", height: "60px", position: "relative" }}>
                <Image src="/images/podcastlogo2.png" alt="SZPH Podcast" fill className="object-contain object-left" sizes="180px" />
              </div>

              <h3 className="font-bold text-white leading-tight mb-3" style={{ fontSize: "clamp(1.3rem, 2vw, 1.7rem)" }}>
                Pozemný hokej — viac ako šport
              </h3>
              <p className="text-white mb-5" style={{ fontSize: "13px", fontWeight: 400 }}>
                Rozhovory s hráčmi, trénermi a funkcionármi slovenského pozemného hokeja.
              </p>

              {/* Platformy — farebné logá */}
              <div className="flex items-center gap-3 mb-8">
                <a href="https://www.youtube.com/@szph" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full transition-all hover:bg-white/10"
                  style={{ border: "1px solid rgba(255,255,255,0.12)" }}>
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path fill="#FF0000" d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8z"/>
                    <path fill="#fff" d="M9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
                  </svg>
                  <span className="font-bold text-white/70" style={{ fontSize: "10px" }}>YouTube</span>
                </a>
                <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full transition-all hover:bg-white/10"
                  style={{ border: "1px solid rgba(255,255,255,0.12)" }}>
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path fill="#1DB954" d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                  <span className="font-bold text-white/70" style={{ fontSize: "10px" }}>Spotify</span>
                </a>
              </div>

              {/* Playlist — glass card */}
              <div
                style={{
                  borderRadius: "16px",
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
                  padding: "4px",
                }}
              >
                {[
                  { title: "Budeme stavať nový štadión", guest: "Marián Kováč", ep: "EP 03", href: "https://www.youtube.com/watch?v=WoHqCQIVHm4" },
                  { title: "Ako sa stať profesionálnym hráčom", guest: "Jana Novotná", ep: "EP 02", href: "https://www.youtube.com/watch?v=WoHqCQIVHm4" },
                  { title: "Pozemný hokej na Slovensku — minulosť a budúcnosť", guest: "Peter Sloboda", ep: "EP 01", href: "https://www.youtube.com/watch?v=WoHqCQIVHm4" },
                ].map((ep, i) => (
                  <a
                    key={i}
                    href={ep.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3.5 px-4 py-3 transition-all"
                    style={{
                      borderRadius: "12px",
                      borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.05)" : "none",
                    }}
                  >
                    {/* Play button — glass */}
                    <div
                      className="shrink-0 flex items-center justify-center rounded-full transition-all group-hover:border-white/30"
                      style={{
                        width: "30px",
                        height: "30px",
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.12)",
                      }}
                    >
                      <svg className="h-2.5 w-2.5 text-white/70 group-hover:text-white ml-0.5 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-white/90 truncate group-hover:text-white transition-colors" style={{ fontSize: "11px" }}>{ep.title}</p>
                      <p className="text-white/30 font-semibold uppercase mt-0.5" style={{ fontSize: "8px", letterSpacing: "0.1em" }}>{ep.ep} · {ep.guest}</p>
                    </div>
                    <svg className="h-3 w-3 text-white/15 shrink-0 group-hover:text-white/50 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                ))}
              </div>

              {/* Zobraziť všetky — glass pill */}
              <a
                href="https://www.youtube.com/@szph"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 font-bold text-white/50 hover:text-white transition-all"
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                Zobraziť všetky epizódy
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Pravý — thumbnail s play overlay */}
            <a
              href="https://www.youtube.com/watch?v=WoHqCQIVHm4"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden block"
              style={{ borderRadius: "16px" }}
            >
              <Image
                src="/images/podcast.jpg"
                alt="SZPH Podcast"
                width={686}
                height={386}
                className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 100vw, 55vw"
              />
              {/* Tmavý overlay */}
              <div className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-60"
                style={{ background: "rgba(3,15,34,0.45)" }} />
              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="flex items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110"
                  style={{ width: "64px", height: "64px", background: "#C8102E", boxShadow: "0 0 0 12px rgba(200,16,46,0.15)" }}
                >
                  <svg className="h-6 w-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              {/* YouTube badge */}
              <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded"
                style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}>
                <svg className="h-3.5 w-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8z"/>
                  <path fill="#051937" d="M9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
                </svg>
                <span className="font-bold text-white" style={{ fontSize: "9px", letterSpacing: "0.1em" }}>YOUTUBE</span>
              </div>
            </a>

          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          NOVINKY Z EURÓPY
          ═══════════════════════════════════════════════════ */}
      <section style={{ background: "#f8f9fa" }} className="py-12">
        <div className="px-6 lg:px-10 xl:px-16 max-w-[1600px] mx-auto">
          <CardSection
            title="Novinky zo sveta"
            href="/novinky/svet"
            cols={4}
            articles={worldNews.length >= 4 ? worldNews : articles.slice(0, 4)}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          PROJEKTY
          ═══════════════════════════════════════════════════ */}
      <section style={{ background: "#f8f9fa" }} className="relative pt-4 pb-14">
        <SzphDecoDots variant="light" />
        <div className="relative px-6 lg:px-10 xl:px-16 max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div style={{ width: "50px", height: "12px", borderRadius: "999px", background: "linear-gradient(90deg, transparent 0%, #C8102E 100%)" }} />
              <h2 className="font-garet font-bold italic text-[#051937]" style={{ fontSize: "clamp(1.4rem, 2.2vw, 2rem)", textTransform: "uppercase" }}>
                Projekty
              </h2>
            </div>
            <Link
              href="/projekty"
              className="flex items-center gap-2 font-bold text-[#051937] hover:text-[#C8102E] transition-colors"
              style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase" }}
            >
              Zobraziť všetky
              <div className="flex items-center justify-center rounded-full border border-[#051937]" style={{ width: "26px", height: "26px" }}>
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: "SZPH Podcast", logo: "/images/podcastlogo.png", bg: "#051937" },
              { name: "SZPH Podcast", logo: "/images/podcastlogo.png", bg: "#012D74" },
              { name: "SZPH Podcast", logo: "/images/podcastlogo.png", bg: "#C8102E" },
              { name: "SZPH Podcast", logo: "/images/podcastlogo.png", bg: "#0a0a0a" },
              { name: "SZPH Podcast", logo: "/images/podcastlogo.png", bg: "#1a3a5c" },
            ].map((p, i) => (
              <Link
                key={i}
                href="/projekty"
                className="group flex flex-col overflow-hidden"
                style={{ borderRadius: "8px", overflow: "hidden" }}
              >
                {/* Thumbnail */}
                <div
                  className="relative flex items-center justify-center"
                  style={{ background: p.bg, aspectRatio: "1/1" }}
                >
                  <div className="relative transition-transform duration-500 group-hover:scale-[1.06]" style={{ width: "60%", height: "60%" }}>
                    <Image src={p.logo} alt={p.name} fill className="object-contain" sizes="200px" />
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "rgba(255,255,255,0.06)" }} />
                </div>
                {/* Tag */}
                <div className="px-3 py-2.5 flex items-center gap-2" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                  <span className="px-2 py-0.5 font-bold uppercase text-white rounded" style={{ fontSize: "8px", letterSpacing: "0.1em", background: "rgba(255,255,255,0.12)" }}>{p.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          VIDEO ZÓNA
          ═══════════════════════════════════════════════════ */}
      <section
        className="relative py-14 overflow-hidden"
        style={{
          background: "#051937",
        }}
      >
        {/* Glass shimmer overlays */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 20% 30%, rgba(255,255,255,0.03) 0%, transparent 50%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 80% 70%, rgba(255,255,255,0.02) 0%, transparent 45%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.02) 0%, transparent 40%)" }} />

        {/* ── #wearehockey — vodorovná čiara za nadpisom ── */}

        <div className="px-6 lg:px-10 xl:px-16 max-w-[1600px] mx-auto">

          {/* Header — rovnaký štýl ako Aktuality/Projekty */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div style={{ width: "50px", height: "12px", borderRadius: "999px", background: "linear-gradient(90deg, transparent 0%, #C8102E 100%)" }} />
              <h2 className="font-garet font-bold italic text-white" style={{ fontSize: "clamp(1.4rem, 2.2vw, 2rem)", textTransform: "uppercase" }}>
                Videozóna
              </h2>
            </div>
            <Link
              href="/video"
              className="flex items-center gap-2 font-bold text-white hover:text-white/70 transition-colors"
              style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase" }}
            >
              Zobraziť všetky
              <div className="flex items-center justify-center rounded-full border border-white/40" style={{ width: "26px", height: "26px" }}>
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          </div>

          {/* ── STREAMY — 4 landscape videá ── */}
          <div className="flex gap-4 overflow-x-auto pb-2 mb-10" style={{ scrollbarWidth: "none" }}>
            {[
              { id: "W8Umeplx-8o", url: "https://www.youtube.com/watch?v=W8Umeplx-8o&t=1604s", title: "Extraliga muži — kolo 1" },
              { id: "QDL6rHpqd_c", url: "https://www.youtube.com/watch?v=QDL6rHpqd_c&t=4977s", title: "Extraliga muži — kolo 2" },
              { id: "9HxmftfEa0A", url: "https://www.youtube.com/watch?v=9HxmftfEa0A&t=817s", title: "Extraliga muži — kolo 3" },
              { id: "R2xOukt5BgE", url: "https://www.youtube.com/watch?v=R2xOukt5BgE", title: "Extraliga muži — kolo 4" },
            ].map((v) => (
              <a key={v.id} href={v.url} target="_blank" rel="noopener noreferrer"
                className="group relative overflow-hidden shrink-0 block"
                style={{ width: "340px", aspectRatio: "16/9", borderRadius: "14px" }}>
                <Image src={`https://img.youtube.com/vi/${v.id}/maxresdefault.jpg`} alt={v.title} fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" sizes="340px" />
              </a>
            ))}
          </div>

          {/* ── SHORTS — accordion ── */}
          <details className="group/shorts mt-8">
            <summary className="flex items-center justify-center gap-2 cursor-pointer py-3 rounded-xl transition-all hover:bg-white/[0.04] list-none [&::-webkit-details-marker]:hidden">
              <span className="font-bold text-white/50 uppercase" style={{ fontSize: "11px", letterSpacing: "0.1em" }}>Shorts</span>
              <svg className="h-4 w-4 text-white/30 transition-transform duration-300 group-open/shorts:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="flex gap-3 overflow-x-auto pb-2 pt-4" style={{ scrollbarWidth: "none" }}>
              {[
                { id: "QGsvNAgpFuw", title: "Gól týždňa" },
                { id: "AFiMGDHFfrQ", title: "Top momenty" },
                { id: "jwDGy4oCevE", title: "Najlepší zákrok" },
                { id: "4P99iVz3e_k", title: "Reprezentácia" },
                { id: "ywGDsIWSPDw", title: "Záber týždňa" },
                { id: "4rgr9GDsQQk", title: "Short" },
                { id: "QGsvNAgpFuw", title: "Gól týždňa 2" },
                { id: "AFiMGDHFfrQ", title: "Top momenty 2" },
                { id: "jwDGy4oCevE", title: "Najlepší zákrok 2" },
                { id: "4P99iVz3e_k", title: "Reprezentácia 2" },
                { id: "ywGDsIWSPDw", title: "Záber týždňa 2" },
                { id: "4rgr9GDsQQk", title: "Short 2" },
              ].map((v, i) => (
                <a key={`${v.id}-${i}`} href={`https://www.youtube.com/shorts/${v.id}`} target="_blank" rel="noopener noreferrer"
                  className="group relative overflow-hidden block shrink-0" style={{ width: "150px", aspectRatio: "9/16", borderRadius: "12px" }}>
                  <Image src={`https://img.youtube.com/vi/${v.id}/maxresdefault.jpg`} alt={v.title} fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.05]" sizes="150px" unoptimized />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 40%)" }} />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="flex items-center justify-center rounded-full"
                      style={{ width: "32px", height: "32px", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.2)" }}>
                      <svg className="h-3 w-3 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="font-bold text-white leading-tight" style={{ fontSize: "10px" }}>{v.title}</p>
                  </div>
                  <div className="absolute top-2 left-2 px-1.5 py-0.5 font-bold text-white flex items-center gap-1"
                    style={{ background: "rgba(0,0,0,0.4)", fontSize: "7px", letterSpacing: "0.08em", backdropFilter: "blur(4px)", borderRadius: "6px" }}>
                    <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="currentColor"><path d="M4 2h9l7 10-7 10H4l7-10z"/></svg>
                    SHORT
                  </div>
                </a>
              ))}
            </div>
          </details>
        </div>

      </section>

      {/* ═══════════════════════════════════════════════════════
          SPONZORI A PARTNERI
          ═══════════════════════════════════════════════════ */}
      <section style={{ background: "#ffffff", borderTop: "1px solid rgba(1,45,116,0.06)" }} className="py-14">
        <div className="px-6 lg:px-10 xl:px-16 max-w-[1600px] mx-auto">

          {/* Oficiálni sponzori */}
          <div className="mb-12">
            <p className="font-garet font-bold italic text-[#051937] text-center mb-10" style={{ fontSize: "13px", letterSpacing: "0.05em", textTransform: "uppercase" }}>
              Oficiálni sponzori a partneri
            </p>
            <div className="flex flex-wrap items-center justify-center gap-12 lg:gap-20">
              {[
                { name: "Union poisťovňa", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdKWEarVJSFkw7eFSCO0vvAC9xtBTP1pn2kA&s", w: 100 },
                { name: "ING", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/ING_logo.jpg/1280px-ING_logo.jpg", w: 80 },
                { name: "NN", src: "https://upload.wikimedia.org/wikipedia/commons/b/b3/NN-LOGO.png", w: 70 },
                { name: "Heineken", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Heineken_Logo.svg/3840px-Heineken_Logo.svg.png", w: 110 },
              ].map((s) => (
                <div key={s.name} className="flex items-center justify-center" style={{ height: "48px" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.src} alt={s.name} style={{ height: "100%", width: "auto", maxWidth: `${s.w}px`, objectFit: "contain" }} />
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "rgba(1,45,116,0.06)" }} className="mb-12" />

          {/* Inštitucionálni partneri */}
          <div>
            <p className="font-garet font-bold italic text-[#051937] text-center mb-10" style={{ fontSize: "13px", letterSpacing: "0.05em", textTransform: "uppercase" }}>
              Inštitucionálni partneri
            </p>
            <div className="flex flex-wrap items-center justify-center gap-12 lg:gap-20">
              {[
                { name: "FIH", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Fih_hockey_logo.svg/1280px-Fih_hockey_logo.svg.png", w: 90 },
                { name: "EuroHockey", src: "https://eurohockey-u21.athc.cat/wp-content/uploads/2024/05/logo-eurohockey-negre.webp", w: 120 },
                { name: "MŠVVaŠ SR", src: "https://mincrs.sk/brand/mincrs-logo.png", w: 110 },
                { name: "SOŠV", src: "https://www.olympic.sk/sites/default/files/logo_sosv_share.png", w: 90 },
              ].map((s) => (
                <div key={s.name} className="flex items-center justify-center" style={{ height: "48px" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.src} alt={s.name} style={{ height: "100%", width: "auto", maxWidth: `${s.w}px`, objectFit: "contain" }} />
                </div>
              ))}
            </div>
          </div>

          {/* Partner CTA */}
          <div className="mt-8 flex items-center justify-between flex-wrap gap-4" style={{ borderTop: "1px solid rgba(1,45,116,0.06)", paddingTop: "16px" }}>
            <p className="text-[#64748b]" style={{ fontSize: "13px" }}>
              Máte záujem stať sa partnerom SZPH?
            </p>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 font-bold text-[#051937] hover:text-[#C8102E] transition-colors"
              style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" }}
            >
              Viac informácií
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
