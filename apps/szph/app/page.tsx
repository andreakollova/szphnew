import Image from "next/image";
import Link from "next/link";
import { unstable_cache } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { MatchCenter } from "@szph/ui";
import { SzphHero } from "./components/SzphHero";
import { RychleOdkazy } from "./components/RychleOdkazy";
import { PersonalizedSection } from "./components/PersonalizedSection";

const MOCK_ARTICLES = [
  {
    id: "a1", slug: "bronz-eurohockey-5s-u16-championship-gruzinsko-2026",
    title: "Bronz pre slovenské reprezentantky na EuroHockey 5s U16 Championship II v Gruzínsku",
    excerpt: "Slovenská dievčenská reprezentácia do 16 rokov si na turnaji EuroHockey 5s U16 Championship II Girls 2026 v gruzínskom Kutaisi vybojovala výborné 3. miesto.",
    cover_image_url: "/images/bronz-eurohockey-banner.webp", category: "novinky", published_at: "2026-07-08T09:00:00Z", site: "szph", status: "published",
  },
  {
    id: "a2", slug: "slovenky-u16-turnaj-kutaisi-2026",
    title: "Vyvrcholenie programu prípravy je tu. Slovenky U16 čaká turnaj v Kutaisi",
    excerpt: "Slovenská dievčenská reprezentácia do 16 rokov vstupuje do dôležitého medzinárodného turnaja EuroHockey 5s U16 Championship II Girls 2026 v gruzínskom Kutaisi.",
    cover_image_url: "/images/kutaisi-banner.webp", category: "novinky", published_at: "2026-07-01T09:00:00Z", site: "szph", status: "published",
  },
  {
    id: "a3", slug: "sarlota-medvikova-youth-leadership-committee-eurohockey",
    title: "Šarlota Medviková sa zúčastnila prvého stretnutia novej Youth Leadership Committee EuroHockey",
    excerpt: "Začiatkom mája sa v Bruseli uskutočnilo prvé osobné stretnutie nového Youth Leadership Committee EuroHockey. Medzi členmi komisie nechýbala ani slovenská zástupkyňa Šarlota Medviková.",
    cover_image_url: "/images/sarlota-youth-leadership-banner.webp", category: "novinky", published_at: "2026-06-01T09:00:00Z", site: "szph", status: "published",
  },
  {
    id: "a4", slug: "eurohockey-development-committee-brusel-natalia-fondrkova",
    title: "EuroHockey Development Committee v Bruseli aj s účasťou členky Natálie Fondrkovej",
    excerpt: "Koncom marca sa uskutočnilo stretnutie EuroHockey Development Committee, ktorého sa zúčastnila aj zástupkyňa Slovenska Natália Fondrková.",
    cover_image_url: "/images/natalia-dev-committee-banner.webp", category: "novinky", published_at: "2026-04-30T09:00:00Z", site: "szph", status: "published",
  },
  {
    id: "a5", slug: "rozhodca-michal-korim-u4e-seminar-eurohockey-nemecko",
    title: "Rozhodca Michal Korim absolvoval medzinárodný U4E seminár EuroHockey v Nemecku (Russelsheim)",
    excerpt: "Slovenský rozhodca Michal Korim sa začiatkom apríla zúčastnil medzinárodného rozhodcovského seminára U4E (Umpires for Europe), ktorý organizuje EuroHockey.",
    cover_image_url: "/images/korim-u4e-banner.webp", category: "novinky", published_at: "2026-04-30T09:00:00Z", site: "szph", status: "published",
  },
  {
    id: "a6", slug: "pozemny-hokej-pod-novou-strechou-expo-dom-stan",
    title: "Pozemný hokej pod novou strechou: Ďakujeme spoločnosti EXPO DOM za sponzorský stan!",
    excerpt: "Vďaka štedrosti spoločnosti EXPO DOM sme zaradili do nášho vybavenia nový, profesionálny rýchlorozkladací stan.",
    cover_image_url: "/images/expodom-banner.webp", category: "novinky", published_at: "2026-04-09T09:00:00Z", site: "szph", status: "published",
  },
  {
    id: "a7", slug: "slovensko-hostit-eurohockey-u18-championship-2027",
    title: "Slovensko bude hostiť EuroHockey U18 Championship III chlapcov v roku 2027!",
    excerpt: "EuroHockey zverejnil detaily mládežníckych majstrovstiev Európy do 18 rokov pre rok 2027. Slovensko sa zaradí medzi organizátorské krajiny a v Bratislave privíta turnaj.",
    cover_image_url: "/images/u18-championship-banner.webp", category: "novinky", published_at: "2026-03-27T09:00:00Z", site: "szph", status: "published",
  },
  {
    id: "a8", slug: "verejna-obchodna-sutaz-ihrisko-zlate-moravce",
    title: "VEREJNÁ OBCHODNÁ SÚŤAŽ – Ihrisko Zlaté Moravce",
    excerpt: "Klub pozemného hokeja HOKO Zlaté Moravce vyhlasuje obchodnú verejnú súťaž na výber zhotoviteľa stavebných prác na projekt rekonštrukcie ihriska pre pozemný hokej.",
    cover_image_url: "/images/vos-ihrisko-zlate-moravce-banner.webp", category: "oznamy", published_at: "2026-03-17T09:00:00Z", site: "szph", status: "published",
  },
  {
    id: "a9", slug: "rozhodcovsky-seminar-szph-jar-2026",
    title: "Rozhodcovský seminár SZPH Jar 2026: Príďte si prehĺbiť svoje znalosti pravidiel a rozhodovania",
    excerpt: "Slovenský zväz pozemného hokeja pozýva všetkých záujemcov na Rozhodcovský seminár SZPH Jar 2026 v Šenkviciach.",
    cover_image_url: "/images/rozhodcovsky-seminar-jar-2026-banner.webp", category: "oznamy", published_at: "2026-03-10T09:00:00Z", site: "szph", status: "published",
  },
  {
    id: "a10", slug: "finalne-poradie-eurohockey-indoor-club-championships-2026",
    title: "Finálne poradie – EuroHockey Indoor Club Championships 2026 (muži a ženy)",
    excerpt: "Európska federácia pozemného hokeja potvrdila konečné výsledky klubových halových majstrovstiev Európy 2026.",
    cover_image_url: "/images/indoor-club-championships-banner.webp", category: "novinky", published_at: "2026-03-03T09:00:00Z", site: "szph", status: "published",
  },
  {
    id: "s1", slug: "vyrocna-konferencia-szph-2025",
    title: "Výročná konferencia SZPH 2025 — prijaté rozhodnutia",
    excerpt: "Delegáti výročnej konferencie SZPH schválili nový rozpočet, plán rozvoja mládeže a aktualizáciu stanov zväzu. Prinášame kompletný prehľad prijatých uznesení.",
    cover_image_url: "/images/banner2.webp", category: "oznamy", published_at: "2025-06-12T09:00:00Z", site: "szph", status: "published",
  },
  {
    id: "s2", slug: "novy-sutazny-poriadok-2025",
    title: "Nový súťažný poriadok pre sezónu 2025/2026 je schválený",
    excerpt: "Riadiaci zbor SZPH schválil aktualizovaný súťažný poriadok. Hlavné zmeny sa týkajú disciplinárnych konaní, registrácie hráčov a organizácie mládežníckych turnajov.",
    cover_image_url: "/images/banner1.webp", category: "oznamy", published_at: "2025-06-08T11:00:00Z", site: "szph", status: "published",
  },
  {
    id: "s3", slug: "dotacie-msv-2025",
    title: "SZPH získal dotácie MŠVVaŠ SR na rozvoj mládeže 2025",
    excerpt: "Ministerstvo školstva, vedy, výskumu a športu SR pridelilo SZPH dotácie na rozvoj mládežníckeho pozemného hokeja. Finančné prostriedky budú smerovať do klubov.",
    cover_image_url: "/images/banner3.webp", category: "novinky", published_at: "2025-06-03T14:00:00Z", site: "szph", status: "published",
  },
] as any[];

const getWorldNews = unstable_cache(
  async () => {
    try {
      const { createClient } = await import("@supabase/supabase-js");
      const hr = createClient(
        "https://oivzvihdhidpbrjpygfl.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pdnp2aWhkaGlkcGJyanB5Z2ZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2MzI3MTgsImV4cCI6MjA5MDIwODcxOH0.7d917agBywM3D1RlFJ27oHTRvjBaE_pyDxCzLKaKaIE"
      );
      const { data } = await hr.from("articles").select("id, title_sk, image_url, url, scraped_at").eq("published", true).order("scraped_at", { ascending: false }).limit(4);
      return (data ?? []).map((a: any) => ({
        id: String(a.id),
        slug: `svet/${a.id}`,
        title: a.title_sk ?? "",
        cover_image_url: a.image_url,
        category: "svet",
        published_at: a.scraped_at,
        status: "published",
      }));
    } catch { return []; }
  },
  ["world-news"],
  { revalidate: 60 }
);

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

const getData = unstable_cache(
  async () => {
    const supabase = getSupabase();
    const [aktuality, reprezentacia, oznamy, matches, competitions, worldNews] = await Promise.allSettled([
      supabase.from("articles").select("*").eq("site", "szph").eq("status", "published").eq("category", "novinky").order("published_at", { ascending: false }).limit(6).then(r => r.data ?? []),
      supabase.from("articles").select("*").eq("site", "szph").eq("status", "published").eq("category", "reprezentacia").order("published_at", { ascending: false }).limit(6).then(r => r.data ?? []),
      supabase.from("articles").select("*").eq("site", "szph").eq("status", "published").eq("category", "oznamy").order("published_at", { ascending: false }).limit(6).then(r => r.data ?? []),
      supabase.from("matches").select("*").eq("site", "szph").order("date", { ascending: false }).limit(250).then(r => r.data ?? []),
      supabase.from("competitions").select("*").then(r => r.data ?? []),
      getWorldNews(),
    ]);
    const allArticles = [
      ...(aktuality.status === "fulfilled" ? aktuality.value : []),
      ...(reprezentacia.status === "fulfilled" ? reprezentacia.value : []),
      ...(oznamy.status === "fulfilled" ? oznamy.value : []),
    ];
    return {
      articles:       allArticles.length > 0 ? allArticles : MOCK_ARTICLES,
      aktuality:      aktuality.status === "fulfilled" && aktuality.value.length > 0 ? aktuality.value : MOCK_ARTICLES.filter(a => a.category === "novinky").slice(0, 3),
      reprezentacia:  reprezentacia.status === "fulfilled" && reprezentacia.value.length > 0 ? reprezentacia.value : MOCK_ARTICLES.filter(a => a.category === "reprezentacia").slice(0, 3),
      oznamy:         oznamy.status === "fulfilled" ? oznamy.value : MOCK_ARTICLES.filter(a => a.category === "oznamy").slice(0, 3),
      matches:        matches.status === "fulfilled"  ? matches.value  : [],
      competitions:   competitions.status === "fulfilled" ? competitions.value : [],
      worldNews:      worldNews.status === "fulfilled" ? worldNews.value : [],
    };
  },
  ["szph-home-data"],
  { revalidate: 300 }
);

function ArticleCard({ article }: { article: any }) {
  return (
    <Link href={`/novinky/${article.slug}`} className="group block overflow-hidden bg-white shrink-0" style={{ borderRadius: "10px", border: "1px solid rgba(1,45,116,0.06)" }}>
      <div className="relative overflow-hidden" style={{ height: "160px" }}>
        {article.cover_image_url ? (
          <Image src={article.cover_image_url} alt={article.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="w-full h-full bg-[#e2e8f0]" />
        )}
        {article.video_url && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center justify-center rounded-full bg-white/90 shadow-lg" style={{ width: 36, height: 36 }}>
              <svg className="h-3.5 w-3.5 text-[#d00027] ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            </div>
          </div>
        )}
      </div>
      <div className="px-4 py-3">
        <span className="inline-block font-extrabold uppercase text-[#0078fe] mb-1" style={{ fontSize: "9px", letterSpacing: "0.1em" }}>
          / {article.category}
        </span>
        <h3 className="font-bold text-[#051937] leading-snug group-hover:text-[#012d74] transition-colors line-clamp-2" style={{ fontSize: "13px" }}>
          {article.title}
        </h3>
      </div>
    </Link>
  );
}

function CardSection({ title, href, articles, cols = 3 }: { title: string; href: string; articles: any[]; cols?: number }) {
  const colsClass = cols === 4
    ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
    : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";
  return (
    <div>
      <div className="flex items-center justify-between mb-4 md:mb-5">
        <h2 className="font-garet font-bold italic text-[#051937]" style={{ fontSize: "clamp(16px, 4vw, 20px)", letterSpacing: "0.05em", textTransform: "uppercase" }}>
          {title}
        </h2>
        <Link
          href={href}
          className="flex items-center gap-1.5 font-garet font-bold text-[#051937] hover:text-[#012d74] transition-colors shrink-0"
          style={{ fontSize: "clamp(11px, 2.5vw, 13px)" }}
        >
          Zobraziť všetky
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>

      {/* Mobile: horizontal carousel */}
      <div className="flex gap-3 overflow-x-auto pb-2 sm:hidden snap-x snap-mandatory" style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" } as any}>
        {articles.map((article) => (
          <div key={article.id} className="snap-start shrink-0" style={{ width: "75%" }}>
            <ArticleCard article={article} />
          </div>
        ))}
      </div>

      {/* Desktop: grid */}
      <div className={`hidden sm:grid gap-4 ${colsClass}`}>
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
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
        {label && <span className={`label-wide block mb-1.5 ${light ? "text-white" : "text-[var(--sky)]"}`}>{label}</span>}
        <h2 className="font-garet font-black text-[var(--sky)] leading-tight"
          style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontStyle: "italic" }}>
          {title}
        </h2>
      </div>
      {href && (
        <Link href={href} className={`hidden sm:flex items-center gap-1 text-sm font-semibold transition-colors ${light ? "text-white hover:text-white" : "text-[var(--sky)] hover:text-[var(--navy)]"}`}>
          {hrefLabel || "Viac"}
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      )}
    </div>
  );
}

function NextMatchTicket({ matches }: { matches: any[] }) {
  const now = Date.now();
  const upcoming = matches
    .filter((m: any) => m.status === "scheduled" && new Date(m.date).getTime() > now)
    .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const m = upcoming[0];
  if (!m) return null;

  const d = new Date(m.date);
  const dateStr = d.toLocaleDateString("sk-SK", { day: "numeric", month: "long" });
  const time = m.match_time || d.toLocaleTimeString("sk-SK", { hour: "2-digit", minute: "2-digit" });

  const TeamLogo = ({ logo, name }: { logo?: string; name: string }) => {
    if (logo?.startsWith("flag:")) {
      const code = logo.replace("flag:", "");
      return (
        <div className="shrink-0 overflow-hidden rounded-full" style={{ width: 36, height: 36 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://flagcdn.com/w80/${code}.png`} alt={name} width={36} height={36} style={{ width: 36, height: 36, objectFit: "cover" }} />
        </div>
      );
    }
    if (logo?.startsWith("/") || logo?.startsWith("https://")) {
      return (
        <div className="shrink-0" style={{ width: 36, height: 36 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} alt={name} width={36} height={36} style={{ width: 36, height: 36, objectFit: "contain" }} />
        </div>
      );
    }
    return (
      <div className="shrink-0 flex items-center justify-center rounded-full" style={{ width: 36, height: 36, background: "#e2e8f0" }}>
        <span className="font-black text-[#64748b]" style={{ fontSize: "10px" }}>{name.split(" ").map(w => w[0]).join("").slice(0, 3)}</span>
      </div>
    );
  };

  return (
    <div className="md:hidden px-4 mt-3 relative z-10" style={{ marginBottom: "-8px" }}>
      <Link
        href={`/zapasy/${m.id}`}
        className="flex items-center gap-3 px-4 py-3 bg-white"
        style={{
          borderRadius: "14px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)",
        }}
      >
        {/* Home */}
        <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
          <span className="font-bold text-[#051937] truncate text-right" style={{ fontSize: "13px" }}>{m.home_short || m.home_team}</span>
          <TeamLogo logo={m.home_logo} name={m.home_team} />
        </div>

        {/* Center info */}
        <div className="flex flex-col items-center shrink-0 px-1">
          <span className="font-black text-[#d00027] uppercase" style={{ fontSize: "8px", letterSpacing: "0.1em" }}>Najbližší zápas</span>
          {m.league && <span className="font-semibold text-[#051937] text-center" style={{ fontSize: "9px" }}>{m.league}</span>}
          <span className="font-bold text-[#051937]" style={{ fontSize: "11px" }}>{time}</span>
          <span className="text-[#94a3b8] font-semibold" style={{ fontSize: "9px" }}>{dateStr}</span>
          {m.venue && <span className="text-[#94a3b8]" style={{ fontSize: "8px" }}>{m.venue}</span>}
        </div>

        {/* Away */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <TeamLogo logo={m.away_logo} name={m.away_team} />
          <span className="font-bold text-[#051937] truncate" style={{ fontSize: "13px" }}>{m.away_short || m.away_team}</span>
        </div>
      </Link>
    </div>
  );
}

export default async function SzphHome() {
  const { articles, aktuality, reprezentacia, oznamy, matches, competitions, worldNews } = await getData();

  return (
    <div>
      <SzphHero nextMatch={(() => {
        const now = Date.now();
        const upcoming = (matches as any[]).filter((m: any) => m.status === "scheduled" && new Date(m.date).getTime() > now).sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
        const isRep = (m: any) => (m.home_short === "SVK" || m.away_short === "SVK") && !m.league?.includes("ČESKÁ");
        const repMatch = upcoming.find(isRep);
        const ligaMatch = upcoming.find((m: any) => !isRep(m));
        const m = repMatch || ligaMatch;
        if (!m) return null;
        return { id: m.id, home_team: m.home_team, away_team: m.away_team, home_short: m.home_short, away_short: m.away_short, home_logo: m.home_logo, away_logo: m.away_logo, date: m.date, league: m.league, venue: m.venue, video_url: m.video_url, isRep: isRep(m) };
      })()} />

      {/* ═══ PERSONALIZED (mobile only) ═══ */}
      <PersonalizedSection matches={matches as any[]} />

      {/* ═══════════════════════════════════════════════════════
          AKTUALITY + RÝCHLE ODKAZY
          ═══════════════════════════════════════════════════ */}
      <section id="aktuality" className="scroll-mt-32" style={{ background: "#f8f9fa" }}>
      <div className="relative pt-10 pb-12">
        <div className="relative px-6 lg:px-10 xl:px-16 max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-0 items-start">

            {/* ── Ľavý stĺpec: Aktuality + Reprezentácia + Organizácia ── */}
            <div className="lg:pr-5 xl:pr-8 flex flex-col gap-8 md:gap-10">

              {/* Aktuality (vrátane oznamy) */}
              <CardSection
                title="Aktuality"
                href="/novinky"
                articles={[...aktuality, ...oznamy].sort((a: any, b: any) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()).slice(0, 3)}
              />

              {/* Reprezentácia */}
              <CardSection
                title="Reprezentácia"
                href="/novinky"
                articles={reprezentacia.slice(0, 3)}
              />

              {/* Pripnuté články */}
              <div
                className="relative overflow-hidden -mx-6 px-0 sm:mx-0 sm:px-0"
                style={{
                  background: "linear-gradient(135deg, #051937 0%, #012d74 100%)",
                  borderRadius: "3px",
                  padding: "clamp(20px, 2vw, 32px)",
                }}
              >
                {/* Decorative glow */}
                <div className="absolute top-0 right-0 w-64 h-64 opacity-10 blur-3xl rounded-full" style={{ background: "#0078fd" }} />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-[#0078fd]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                      <h2 className="font-garet font-bold italic text-white" style={{ fontSize: "clamp(16px, 4vw, 20px)", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                        Neprehliadnite
                      </h2>
                    </div>
                  </div>
                  {/* Mobile: carousel */}
                  <div className="flex gap-3 overflow-x-auto pb-2 sm:hidden snap-x snap-mandatory" style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" } as any}>
                    {[
                      { title: "Pozemný hokej vo svete", image: "/images/pinned-hokej-vo-svete.webp", slug: "pozemny-hokej-vo-svete" },
                      { title: "Program Olympiáda 2036", image: "/images/pinned-kyselicova.webp", slug: "program-olympiada-2036" },
                      { title: "Reportáž s Olympioničkou – Alena Kyselicová", image: "/images/pinned-olympiada-2036.webp", slug: "reportaz-alena-kyselicova" },
                    ].map((article) => (
                      <Link key={article.slug} href={`/novinky/${article.slug}`} className="group block overflow-hidden snap-start shrink-0" style={{ borderRadius: "10px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", width: "75%" }}>
                        <div className="relative overflow-hidden" style={{ height: "150px" }}>
                          <Image src={article.image} alt={article.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                        </div>
                        <div className="px-4 py-3">
                          <h3 className="font-bold text-white leading-snug line-clamp-2" style={{ fontSize: "13px" }}>
                            {article.title}
                          </h3>
                        </div>
                      </Link>
                    ))}
                  </div>
                  {/* Desktop: grid */}
                  <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { title: "Pozemný hokej vo svete", image: "/images/pinned-hokej-vo-svete.webp", slug: "pozemny-hokej-vo-svete" },
                      { title: "Program Olympiáda 2036", image: "/images/pinned-kyselicova.webp", slug: "program-olympiada-2036" },
                      { title: "Reportáž s Olympioničkou – Alena Kyselicová", image: "/images/pinned-olympiada-2036.webp", slug: "reportaz-alena-kyselicova" },
                    ].map((article) => (
                      <Link key={article.slug} href={`/novinky/${article.slug}`} className="group block overflow-hidden" style={{ borderRadius: "3px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
                        <div className="relative overflow-hidden" style={{ height: "180px" }}>
                          <Image src={article.image} alt={article.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                        </div>
                        <div className="px-4 py-3.5">
                          <span className="inline-block font-extrabold uppercase text-[#0078fd] mb-1.5" style={{ fontSize: "9px", letterSpacing: "0.1em" }}>
                            / neprehliadnite
                          </span>
                          <h3 className="font-bold text-white leading-snug group-hover:text-white/90 transition-colors line-clamp-2" style={{ fontSize: "14px" }}>
                            {article.title}
                          </h3>
                          <span className="inline-block mt-2 font-bold text-white/60 group-hover:text-white transition-colors underline underline-offset-2" style={{ fontSize: "11px" }}>
                            Zobraziť
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* ── Rýchle Odkazy + Posledné zápasy rep. — sticky (hidden on mobile) ── */}
            <div
              className="hidden lg:flex pl-5 xl:pl-8 pt-1 self-start sticky top-[120px] flex-col gap-5"
              style={{ borderLeft: "1px solid rgba(1,45,116,0.08)" }}
            >
              <RychleOdkazy />

              {/* Posledné zápasy — reálne dáta z DB */}
              <div className="pt-6">
                <p className="font-garet font-bold italic text-[#051937] mb-2" style={{ fontSize: "20px", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                  Posledné zápasy SVK
                </p>
                <div className="mb-4" style={{ width: "28px", height: "2px", background: "#012d74" }} />

                <div className="flex flex-col gap-1.5 overflow-hidden" style={{ borderRadius: "14px" }}>
                  {(matches as any[])
                    .filter((m: any) => m.status === "finished" && (m.home_short === "SVK" || m.away_short === "SVK") && !m.league?.includes("ČESKÁ"))
                    .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .slice(0, 4)
                    .map((m: any, i: number) => {
                      const d = new Date(m.date);
                      const isSvkHome = m.home_short === "SVK";
                      const svkScore = isSvkHome ? m.home_score : m.away_score;
                      const oppScore = isSvkHome ? m.away_score : m.home_score;
                      const win = svkScore > oppScore;
                      const draw = svkScore === oppScore;
                      return (
                        <div key={m.id || i} className="bg-white" style={{ padding: "12px 14px" }}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-bold uppercase text-[#64748b]" style={{ fontSize: "9px", letterSpacing: "0.1em" }}>
                              {d.toLocaleDateString("sk-SK", { day: "numeric", month: "short" })} · {m.league?.split(" ").slice(0,3).join(" ") || "Zápas"}
                            </span>
                            <span className="font-bold uppercase" style={{ fontSize: "9px", letterSpacing: "0.1em", color: win ? "#16a34a" : draw ? "#64748b" : "#012d74" }}>
                              {win ? "Výhra" : draw ? "Remíza" : "Prehra"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5 flex-1 min-w-0">
                              {m.home_logo?.startsWith("flag:") ? (
                                <div className="shrink-0 overflow-hidden rounded-full" style={{ width: 22, height: 22 }}>
                                  <img src={`https://flagcdn.com/w40/${m.home_logo.replace("flag:","")}.png`} alt="" width={22} height={22} style={{ width: 22, height: 22, objectFit: "cover" }} />
                                </div>
                              ) : m.home_logo ? (
                                <div className="shrink-0" style={{ width: 22, height: 22 }}>
                                  <img src={m.home_logo} alt="" width={22} height={22} style={{ width: 22, height: 22, objectFit: "contain" }} />
                                </div>
                              ) : null}
                              <span className="font-bold text-[#051937] truncate" style={{ fontSize: "11px" }}>{m.home_short}</span>
                            </div>
                            <div className="shrink-0 flex items-center gap-1.5 px-2">
                              <span style={{ fontSize: "18px", fontWeight: 800, lineHeight: 1, color: "#051937" }}>{m.home_score}</span>
                              <span style={{ fontSize: "11px", fontWeight: 700, color: "#012d74" }}>:</span>
                              <span style={{ fontSize: "18px", fontWeight: 800, lineHeight: 1, color: "#051937" }}>{m.away_score}</span>
                            </div>
                            <div className="flex items-center gap-1.5 flex-1 min-w-0 justify-end">
                              <span className="font-bold text-[#051937] truncate" style={{ fontSize: "11px" }}>{m.away_short}</span>
                              {m.away_logo?.startsWith("flag:") ? (
                                <div className="shrink-0 overflow-hidden rounded-full" style={{ width: 22, height: 22 }}>
                                  <img src={`https://flagcdn.com/w40/${m.away_logo.replace("flag:","")}.png`} alt="" width={22} height={22} style={{ width: 22, height: 22, objectFit: "cover" }} />
                                </div>
                              ) : m.away_logo ? (
                                <div className="shrink-0" style={{ width: 22, height: 22 }}>
                                  <img src={m.away_logo} alt="" width={22} height={22} style={{ width: 22, height: 22, objectFit: "contain" }} />
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>

              </div>

            </div>

          </div>
        </div>
      </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          ZAPASOVE CENTRUM
          ═══════════════════════════════════════════════════ */}
      <section style={{ background: "#f8f9fa" }} className="relative pt-3 pb-6 md:py-14">
        <div className="relative px-6 lg:px-10 xl:px-16 max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between mb-5 md:mb-7">
            <h2
              className="font-garet font-bold italic text-[#051937]"
              style={{ fontSize: "clamp(1.1rem, 4vw, 2rem)", textTransform: "uppercase" }}
            >
              Zápasové centrum
            </h2>
            <Link href="/zapasy" className="flex items-center gap-1.5 font-garet font-bold text-[#051937] hover:text-[#012d74] transition-colors shrink-0" style={{ fontSize: "clamp(11px, 2.5vw, 13px)" }}>
              Zobraziť všetky
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          <MatchCenter matches={matches as any} pageSize={7} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          PODCAST
          ═══════════════════════════════════════════════════ */}
      <section
        className="relative py-10 md:py-16 mx-2 sm:mx-4 md:mx-8 overflow-hidden"
        style={{
          borderRadius: "20px 20px 20px 20px",
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


          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-8 md:gap-12 xl:gap-20 items-center">

            {/* Ľavý — text */}
            <div>
              {/* Logo */}
              <div className="mb-7" style={{ width: "180px", height: "60px", position: "relative" }}>
                <Image src="/images/podcastlogo2.webp" alt="SZPH Podcast" fill className="object-contain object-left" sizes="180px" />
              </div>

              <h3 className="font-garet font-bold italic text-white leading-tight mb-3" style={{ fontSize: "clamp(1.3rem, 2vw, 1.7rem)" }}>
                Rozhovor o infraštruktúre a výstavbe nového štadióna
              </h3>
              <p className="text-white/50 font-bold uppercase mb-1" style={{ fontSize: "10px", letterSpacing: "0.1em" }}>
                Richard Garaj / Matej Boho
              </p>
              <p className="text-white mb-6" style={{ fontSize: "13px", fontWeight: 500 }}>
                Rozhovory s hráčmi, trénermi a funkcionármi slovenského pozemného hokeja.
              </p>

              {/* Platformy */}
              <div className="flex items-center gap-3 mb-6">
                <a href="https://www.youtube.com/@zvaz_pozemneho_hokeja" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all hover:bg-white/10"
                  style={{ border: "1px solid rgba(255,255,255,0.12)" }}>
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path fill="#FF0000" d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8z"/>
                    <path fill="#fff" d="M9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
                  </svg>
                  <span className="font-bold text-white" style={{ fontSize: "10px" }}>YouTube</span>
                </a>
                <a href="https://open.spotify.com/show/5ZVmsgOAe7W7SQkTfrkkrc?si=e96b6415fd8040b4" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all hover:bg-white/10"
                  style={{ border: "1px solid rgba(255,255,255,0.12)" }}>
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path fill="#1DB954" d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                  <span className="font-bold text-white" style={{ fontSize: "10px" }}>Spotify</span>
                </a>
              </div>

              {/* Zobraziť všetky */}
              <a
                href="https://www.youtube.com/@zvaz_pozemneho_hokeja"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 font-bold text-white hover:text-white transition-all"
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  borderRadius: "20px",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                Zobraziť všetky epizódy
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Pravý — TV style thumbnail */}
            <div className="flex flex-col items-center">
              <a
                href="https://www.youtube.com/watch?v=WoHqCQIVHm4"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden block w-full"
                style={{ borderRadius: "16px 16px 0 0", border: "3px solid rgba(255,255,255,0.12)", borderBottom: "none" }}
              >
                <Image
                  src="/images/podcast.webp"
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
                    style={{ width: "64px", height: "64px", background: "#d80027", boxShadow: "0 0 0 12px rgba(216,0,39,0.2)" }}
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
              {/* TV stand */}
              <div className="flex flex-col items-center">
                <div style={{ width: "60%", height: "6px", background: "rgba(255,255,255,0.12)", borderRadius: "0 0 4px 4px" }} />
                <div style={{ width: "4px", height: "16px", background: "rgba(255,255,255,0.1)" }} />
                <div style={{ width: "80px", height: "4px", background: "rgba(255,255,255,0.08)", borderRadius: "2px" }} />
              </div>
            </div>

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
            articles={worldNews.length > 0 ? worldNews.slice(0, 4) : articles.slice(0, 4)}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          ESHOP BANNER — mobile app only
          ═══════════════════════════════════════════════════ */}
      <section style={{ background: "#f8f9fa" }} className="px-4 pb-4 md:hidden">
        <Link
          href="/eshop"
          className="group flex items-center justify-between bg-white px-4 py-3.5 active:bg-gray-50 transition-colors max-w-[1600px] mx-auto"
          style={{ borderRadius: "14px", border: "1px solid rgba(1,45,116,0.06)" }}
        >
          <div>
            <p className="font-bold text-[#051937]" style={{ fontSize: "14px" }}>Oficiálny e-shop</p>
            <p className="text-[#94a3b8]" style={{ fontSize: "11px" }}>Dresy, merch a vybavenie</p>
          </div>
          <svg className="h-4 w-4 text-[#94a3b8] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </section>

      {/* ═══════════════════════════════════════════════════════
          PROJEKTY
          ═══════════════════════════════════════════════════ */}
      <section style={{ background: "#f8f9fa" }} className="relative pt-2 pb-6 md:pt-4 md:pb-14">
        <div className="relative px-6 lg:px-10 xl:px-16 max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h2 className="font-garet font-bold italic text-[#051937]" style={{ fontSize: "clamp(1.1rem, 4vw, 2rem)", textTransform: "uppercase" }}>
              Projekty
            </h2>
            <Link
              href="/projekty"
              className="flex items-center gap-1.5 font-garet font-bold text-[#051937] hover:text-[#012d74] transition-colors shrink-0"
              style={{ fontSize: "clamp(11px, 2.5vw, 13px)" }}
            >
              Zobraziť všetky
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          <div className="flex md:grid md:grid-cols-5 gap-3 md:gap-4 overflow-x-auto pb-2 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0" style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" } as any}>
            {[
              { name: "SZPH Podcast", logo: "/images/podcastlogo.webp", bg: "#051937", href: "/podcast" },
              { name: "Hokej na školách", logo: "/images/hokej-na-skolach-logo.webp", bg: "#012d74", href: "/projekty/hokej-na-skolach" },
              { name: "Rozhodcovia", logo: "/images/rozhodcovia-logo.webp", bg: "#d80027", href: "/projekty/vzdelavanie-rozhodcov" },
              { name: "Hokejová akadémia", logo: "/images/hokejova-akademia-logo.webp", bg: "#4a5568", href: "/projekty/hokejova-akademia" },
              { name: "Hockey TV", logo: "/images/hockey-tv-logo.webp", bg: "#0078fe", href: "/projekty/hockey-tv" },
            ].map((p, i) => (
              <Link
                key={i}
                href={p.href}
                className="group flex flex-col overflow-hidden shrink-0 w-[140px] md:w-auto"
                style={{ borderRadius: "10px", overflow: "hidden" }}
              >
                {/* Thumbnail */}
                <div
                  className="relative flex items-center justify-center"
                  style={{ background: p.bg, aspectRatio: "1/1" }}
                >
                  <div className="relative transition-transform duration-500 group-hover:scale-[1.06]" style={{ width: "75%", height: "75%" }}>
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
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h2 className="font-garet font-bold italic text-white" style={{ fontSize: "clamp(1.1rem, 4vw, 2rem)", textTransform: "uppercase" }}>
              Videozóna
            </h2>
            <Link
              href="/video"
              className="flex items-center gap-1.5 font-garet font-bold text-white hover:text-white transition-colors shrink-0"
              style={{ fontSize: "clamp(11px, 2.5vw, 13px)" }}
            >
              Zobraziť všetky
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* ── STREAMY — 4 landscape videá ── */}
          <div className="flex gap-3 md:gap-4 overflow-x-auto pb-2 mb-10 -mx-6 px-6 lg:mx-0 lg:px-0" style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
            {[
              { id: "W8Umeplx-8o", url: "https://www.youtube.com/watch?v=W8Umeplx-8o&t=1604s", title: "Extraliga muži — kolo 1" },
              { id: "QDL6rHpqd_c", url: "https://www.youtube.com/watch?v=QDL6rHpqd_c&t=4977s", title: "Extraliga muži — kolo 2" },
              { id: "9HxmftfEa0A", url: "https://www.youtube.com/watch?v=9HxmftfEa0A&t=817s", title: "Extraliga muži — kolo 3" },
              { id: "R2xOukt5BgE", url: "https://www.youtube.com/watch?v=R2xOukt5BgE", title: "Extraliga muži — kolo 4" },
            ].map((v) => (
              <a key={v.id} href={v.url} target="_blank" rel="noopener noreferrer"
                className="group relative overflow-hidden shrink-0 block w-[280px] md:w-[340px]"
                style={{ aspectRatio: "16/9", borderRadius: "8px" }}>
                <Image src={`https://img.youtube.com/vi/${v.id}/maxresdefault.jpg`} alt={v.title} fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" sizes="340px" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="flex items-center justify-center rounded-full"
                    style={{ width: "48px", height: "48px", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.25)" }}>
                    <svg className="h-5 w-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* ── SHORTS — accordion ── */}
          <details className="group/shorts mt-8">
            <summary className="flex items-center justify-center gap-2 cursor-pointer py-3 rounded-lg transition-all hover:bg-white/[0.04] list-none [&::-webkit-details-marker]:hidden">
              <span className="font-bold text-white uppercase" style={{ fontSize: "11px", letterSpacing: "0.1em" }}>Zobraziť shorts</span>
              <svg className="h-4 w-4 text-white/30 transition-transform duration-300 group-open/shorts:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="flex gap-3 overflow-x-auto pb-2 pt-4 -mx-6 px-6 lg:mx-0 lg:px-0" style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
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
                  className="group relative overflow-hidden block shrink-0" style={{ width: "150px", aspectRatio: "9/16", borderRadius: "8px" }}>
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
                    style={{ background: "rgba(0,0,0,0.4)", fontSize: "7px", letterSpacing: "0.08em", backdropFilter: "blur(4px)", borderRadius: "4px" }}>
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
      <section style={{ background: "#ffffff", borderTop: "1px solid rgba(1,45,116,0.06)" }} className="pt-8 pb-4 md:pt-14 md:pb-6">
        <div className="px-6 lg:px-10 xl:px-16 max-w-[1600px] mx-auto">

          {/* Oficiálni sponzori */}
          <div className="mb-12">
            <p className="font-garet font-bold italic text-[#051937] text-center mb-6 md:mb-10" style={{ fontSize: "clamp(16px, 4vw, 20px)", letterSpacing: "0.05em", textTransform: "uppercase" }}>
              Oficiálni sponzori a partneri
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 lg:gap-20">
              {[
                { name: "Union poisťovňa", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdKWEarVJSFkw7eFSCO0vvAC9xtBTP1pn2kA&s", w: 100 },
                { name: "ING", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/ING_logo.jpg/1280px-ING_logo.jpg", w: 80 },
                { name: "NN", src: "https://upload.wikimedia.org/wikipedia/commons/b/b3/NN-LOGO.png", w: 70 },
                { name: "Heineken", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Heineken_Logo.svg/3840px-Heineken_Logo.svg.png", w: 110 },
              ].map((s) => (
                <div key={s.name} className="flex items-center justify-center h-8 sm:h-10 md:h-12">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.src} alt={s.name} className="h-full w-auto object-contain" style={{ maxWidth: `${s.w}px` }} />
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "rgba(1,45,116,0.06)" }} className="mb-12" />

          {/* Inštitucionálni partneri */}
          <div>
            <p className="font-garet font-bold italic text-[#051937] text-center mb-6 md:mb-10" style={{ fontSize: "clamp(16px, 4vw, 20px)", letterSpacing: "0.05em", textTransform: "uppercase" }}>
              Inštitucionálni partneri
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 lg:gap-20">
              {[
                { name: "FIH", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Fih_hockey_logo.svg/1280px-Fih_hockey_logo.svg.png", w: 90 },
                { name: "EuroHockey", src: "https://eurohockey-u21.athc.cat/wp-content/uploads/2024/05/logo-eurohockey-negre.webp", w: 120 },
                { name: "MŠVVaŠ SR", src: "https://mincrs.sk/brand/mincrs-logo.png", w: 110 },
                { name: "SOŠV", src: "https://www.olympic.sk/sites/default/files/logo_sosv_share.png", w: 90 },
              ].map((s) => (
                <div key={s.name} className="flex items-center justify-center h-8 sm:h-10 md:h-12">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.src} alt={s.name} className="h-full w-auto object-contain" style={{ maxWidth: `${s.w}px` }} />
                </div>
              ))}
            </div>
          </div>

          {/* Partner CTA */}
          <div className="mt-12 flex items-center justify-between" style={{ borderTop: "1px solid rgba(1,45,116,0.06)", paddingTop: "18px" }}>
            <div>
              <p className="font-bold text-[#051937]" style={{ fontSize: "14px" }}>
                Máte záujem stať sa partnerom SZPH?
              </p>
              <p className="text-[#94a3b8]" style={{ fontSize: "11px" }}>
                Kontaktujte nás pre viac informácií o partnerstve
              </p>
            </div>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 font-bold text-[#051937] hover:text-[#012d74] transition-colors shrink-0"
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
    </div>
  );
}
