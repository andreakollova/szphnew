import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { formatDate } from "@szph/ui";
import type { Metadata } from "next";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

const CATEGORY_LABELS: Record<string, string> = {
  novinky: "Novinky",
  reprezentacia: "Reprezentácia",
  kluby: "Kluby",
  oznamy: "Oznamy",
};

const CATEGORY_COLORS: Record<string, string> = {
  novinky: "bg-[#0078fe]/10 text-[#0078fe]",
  reprezentacia: "bg-[#0078fe]/10 text-[#0078fe]",
  kluby: "bg-[#0078fe]/10 text-[#0078fe]",
  oznamy: "bg-[#0078fe]/10 text-[#0078fe]",
  svet: "bg-[#0078fe]/10 text-[#0078fe]",
};

interface Props {
  params: Promise<{ slug: string }>;
}

const PINNED_ARTICLES: Record<string, any> = {
  "pozemny-hokej-vo-svete": {
    id: "pinned-1",
    slug: "pozemny-hokej-vo-svete",
    title: "Pozemný hokej vo svete",
    excerpt: "30 miliónov hráčov a miliardový trh. Pozemný hokej je tretím najhranejším športom na svete, s viac ako 30 miliónov aktívnych hráčov na globálnej úrovni.",
    cover_image_url: "/images/pinned-hokej-vo-svete.webp",
    category: "novinky",
    published_at: "2026-10-01T09:00:00Z",
    status: "published",
    galleries: [
      {
        title: "Fotogaléria",
        images: [
          "/images/articles/hokej-vo-svete/1.png",
          "/images/articles/hokej-vo-svete/2.webp",
          "/images/articles/hokej-vo-svete/3.png",
          "/images/articles/hokej-vo-svete/4.png",
        ],
      },
    ],
    content: `## DÔLEŽITOSŤ POZEMNÉHO HOKEJA

Pozemný hokej je tretím najhranejším športom na svete, s viac ako 30 miliónov aktívnych hráčov na globálnej úrovni. Tento šport má významné zastúpenie v Európe, Indii a Austrálii, kde pôsobí tisíce klubov a profesionálne ligy ako FIH Pro League a Euro Hockey League.

## História pozemného hokeja

Pozemný hokej v Európe má bohatú a dlhú históriu, ktorá siaha až do konca 19. storočia, kedy sa stal obľúbeným športom britskej aristokracie. V roku 1908 debutoval na olympijských hrách, čo výrazne zvýšilo jeho globálnu prestíž.

Európske krajiny, najmä Holandsko, Belgicko a Nemecko, začali formovať silné národné tímy, ktoré dnes dominujú svetovej scéne. Nielen história, ale aj neustále inovácie v tréningových metódach a technológiách prispeli k tomu, že pozemný hokej si v Európe drží vysokú úroveň a prestíž.

## Aktuálny trh a súťaže

Pozemný hokej dnes zahŕňa niekoľko významných líg, ktoré formujú globálnu športovú scénu.

- FIH Pro League, založená v roku 2019, je elitnou medzinárodnou súťažou, kde súťažia najlepšie národné tímy (reprezentácie).
- Euro Hockey League (EHL) je naopak najprestížnejšou klubovou súťažou v Európe, ktorá pritiahne špičkové tímy a hráčov.
- Hockey India League (HIL) bola obnovená v roku 2024 s hráčskou aukciou, v ktorej tímy investovali viac ako 2 milióny USD do nákupu hráčov z celého sveta.`,
  },
  "program-olympiada-2036": {
    id: "pinned-2",
    slug: "program-olympiada-2036",
    title: "Program Olympiáda 2036",
    excerpt: "Akčný plán pre rozvoj slovenského pozemného hokeja. SZPH predkladá tento akčný plán ako súčasť iniciatívy Program Olympiáda 2036.",
    cover_image_url: "/images/pinned-olympiada-2036.webp",
    category: "novinky",
    published_at: "2026-09-15T09:00:00Z",
    status: "published",
    galleries: [
      {
        title: "Fotogaléria",
        images: [
          "/images/articles/olympiada-2036/g1-1.webp",
          "/images/articles/olympiada-2036/g1-2.webp",
          "/images/articles/olympiada-2036/g1-3.webp",
          "/images/articles/olympiada-2036/g1-4.webp",
        ],
      },
      {
        title: "Fotogaléria",
        images: [
          "/images/articles/olympiada-2036/g2-1.webp",
          "/images/articles/olympiada-2036/g2-2.webp",
          "/images/articles/olympiada-2036/g2-3.webp",
          "/images/articles/olympiada-2036/g2-4.webp",
        ],
      },
    ],
    content: `## Akčný plán pre rozvoj slovenského pozemného hokeja

Slovenský zväz pozemného hokeja (SZPH) predkladá tento akčný plán ako súčasť iniciatívy Program Olympiáda 2036, ktorej cieľom je systematická príprava slovenských športovcov na účasť na Olympijských hrách v roku 2036. Tento dokument identifikuje kľúčové strategické oblasti, v ktorých je potrebné sústrediť zdroje a úsilie s cieľom zvýšiť konkurencieschopnosť našich športovcov na medzinárodnej úrovni.

## Dlhodobý rozvoj hráčskej základne

Zvýšenie záujmu o pozemný hokej na všetkých úrovniach, so zameraním na mládež, amatérske a profesionálne tímy. Cieľom je vytvoriť širokú základňu talentovaných športovcov, ktorí budú pripravení na vrcholové medzinárodné súťaže.

## Zlepšenie infraštruktúry a podmienok na prípravu

Vybudovanie nových moderných tréningových a súťažných zariadení v súlade s normami FIH (Medzinárodná federácia pozemného hokeja), ktoré umožnia efektívnu prípravu a organizáciu medzinárodných podujatí.

## Finančná udržateľnosť a získavanie zdrojov

Zabezpečenie dlhodobej finančnej stability zväzu prostredníctvom spolupráce so sponzormi, grantmi a štátnou podporou, čím sa zabezpečia dostatočné zdroje pre prípravu športovcov a modernizáciu infraštruktúry.

## Kvalitné vzdelávanie a rozvoj trénerov a rozhodcov

Zameranie sa na ďalšie vzdelávanie a profesionalizáciu trénerov a rozhodcov prostredníctvom medzinárodných školení a výmenných programov. Zabezpečenie svetovej úrovne prípravy našich športovcov.

## Medzinárodná spolupráca a partnerstvá

Rozšírenie spolupráce s medzinárodnými organizáciami, federáciami a významnými klubmi v Európe a vo svete. Získanie cenných skúseností, výmeny know-how a príležitostí pre slovenských hráčov súťažiť na najvyššej úrovni.

## Popularizácia športu a marketingová stratégia

Zvýšenie viditeľnosti a prestíže pozemného hokeja na Slovensku prostredníctvom intenzívnej marketingovej kampane, zameranej na zapojenie širokej verejnosti, mládeže a médií.

{{GALLERY:0}}

## Fyzická príprava

Fyzická príprava bude rozdelená do makrocyklov a mezocyklov, ktoré postupne zvýšia silu, vytrvalosť, rýchlosť a agilitu hráčov. Počas roka sa tréningy zamerajú na rozvoj maximálnej sily, explozívnej sily, ako aj na zlepšenie aeróbnej kapacity prostredníctvom intervalových tréningov. Okrem toho budú zavedené špecifické cvičenia na zlepšenie rýchlosti reakcií a agility.

## Technická a taktická príprava

Technická príprava bude zahŕňať nácvik driblingu v obmedzených priestoroch, prihrávky a prijímanie loptičky pod tlakom, ako aj streľbu na bránu za prítomnosti obrany. V rámci taktickej prípravy sa hráči budú venovať nácviku obranných a útočných formácií, simulácii herných situácií a špecifickým taktickým scenárom, ako je zónové bránenie a prechod do protiútoku. Štandardné situácie, vrátane krátkych rohov, budú systematicky trénované.

## Mentálna príprava

Mentálna príprava bude kľúčovou súčasťou tréningového procesu, pričom bude zahŕňať vedenie športového psychológa zamerané na zvládanie stresu a zlepšenie sebavedomia hráčov. Tímová komunikácia bude posilnená interaktívnymi cvičeniami, ktoré simulujú herné situácie pod tlakom. Hráči budú využívať vizualizačné techniky na mentálnu prípravu na dôležité herné momenty.

## Regenerácia a prevencia zranení

Regenerácia a prevencia zranení budú integrované do každého tréningového cyklu. Zahŕňajú aktívny oddych, ľahké tréningy, fyzioterapiu a monitorovanie regenerácie hráčov prostredníctvom moderných technológií, čím sa zníži riziko zranení a pretrénovania. Každý hráč bude mať individuálny regeneračný plán.

{{GALLERY:1}}`,
  },
  "reportaz-alena-kyselicova": {
    id: "pinned-3",
    slug: "reportaz-alena-kyselicova",
    title: "Reportáž s Olympioničkou – Alena Kyselicová",
    excerpt: "Alena Kyselicová Mejzlíková je dnes uznávaná ako jedna z najvýznamnejších športových osobností v oblasti pozemného hokeja v bývalom Československu.",
    cover_image_url: "/images/pinned-kyselicova.webp",
    category: "reprezentacia",
    published_at: "2026-09-01T09:00:00Z",
    status: "published",
    galleries: [
      {
        title: "Fotogaléria",
        images: [
          "/images/articles/kyselicova/1.png",
          "/images/articles/kyselicova/2.png",
          "/images/articles/kyselicova/3.png",
          "/images/articles/kyselicova/4.png",
        ],
      },
    ],
    content: `## Alena Kyselicová Mejzlíková

### Strieborná medailistka z olympiády 1980

Alena Kyselicová Mejzlíková je dnes uznávaná ako jedna z najvýznamnejších športových osobností v oblasti pozemného hokeja v bývalom Československu.

Alena Kyselicová Mejzlíková, spolu s Vierou Podhányiovou a Ivetou Hritzovou Šrankovou, patrí medzi významné osobnosti slovenského a československého pozemného hokeja, pričom všetky tri hráčky boli súčasťou tímu, ktorý získal striebornú medailu na Letných olympijských hrách v Moskve v roku 1980.

## Spoluhráčky z olympiády

Viera Podhányiová, narodená 19. septembra 1960 v Zlatých Moravciach, pôsobila ako brankárka a bola kľúčovou členkou tímu TJ Calex Moravce. Iveta Hritzová Šranková, najmladšia členka tímu, mala počas olympiády len 16 rokov. Aj ona pochádzala zo Zlatých Moraviec a počas svojej kariéry bola stabilnou súčasťou reprezentácie, kde sa zúčastnila viacerých medzinárodných turnajov.

## Reportáž – Alena Kyselicová Mejzlíková

Narodila sa 14. novembra 1957 v Trenčianskych Tepliciach a preslávila sa ako hráčka československého ženského tímu, ktorý podal vynikajúci výkon počas Letných olympijských hier 1980. Tento úspech je jedným z vrcholov jej športovej kariéry.

Počas svojej kariéry bola Kyselicová súčasťou klubu Slavia Praha, s ktorým päťkrát získala titul majstra Československa. V rokoch 1985 a 1989 bola vyhlásená za najlepšiu pozemnú hokejistku Československa.

Po ukončení aktívnej hráčskej kariéry sa stala trénerkou a pracovala s rôznymi vekovými kategóriami vrátane úspešného A-tímu Slavie Praha. Jej dcéry, Tereza a Adéla Mejzlíkové, nasledovali jej kroky a reprezentovali Českú republiku v pozemnom hokeji.

{{GALLERY:0}}`,
  },
};

async function getArticle(slug: string) {
  if (PINNED_ARTICLES[slug]) return PINNED_ARTICLES[slug];
  const sb = getSupabase();
  const { data } = await sb.from("articles").select("*").eq("slug", slug).eq("status", "published").single();
  return data;
}

async function getRecentArticles() {
  const sb = getSupabase();
  const { data } = await sb.from("articles").select("*").eq("status", "published").in("visible_on", ["szph", "both"]).order("published_at", { ascending: false }).limit(20);
  return data ?? [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

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

function SidebarMatchCard({ match }: { match: any }) {
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

function GalleryGrid({ gallery }: { gallery: { title: string; images: string[] } }) {
  return (
    <div className="my-10">
      <h3 className="font-garet font-bold text-[#051937] mb-4" style={{ fontSize: "18px" }}>{gallery.title || "Fotogaléria"}</h3>
      <div className="grid grid-cols-2 gap-3">
        {gallery.images.map((img, i) => (
          <div key={i} className="relative overflow-hidden" style={{ aspectRatio: "16/10", borderRadius: "3px" }}>
            <Image src={img} alt={`Foto ${i + 1}`} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 35vw" />
          </div>
        ))}
      </div>
    </div>
  );
}

function renderContent(content: string, galleries?: any[]) {
  // Parse markdown-like content into HTML
  const blocks = content.split("\n\n").filter(Boolean);

  return blocks.map((block, i) => {
    // Gallery placeholder
    const galleryMatch = block.match(/^\{\{GALLERY:(\d+)\}\}$/);
    if (galleryMatch && galleries) {
      const idx = parseInt(galleryMatch[1]);
      if (galleries[idx]) return <GalleryGrid key={i} gallery={galleries[idx]} />;
      return null;
    }

    // Headings
    if (block.startsWith("### ")) {
      return (
        <h3 key={i} className="font-garet font-bold text-[#051937] mt-6 sm:mt-8 mb-2 sm:mb-3 text-base sm:text-lg">
          {block.replace("### ", "")}
        </h3>
      );
    }
    if (block.startsWith("## ")) {
      return (
        <h2 key={i} className="font-garet font-bold text-[#051937] mt-8 sm:mt-10 mb-3 sm:mb-4 text-lg sm:text-[22px]">
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
          style={{ borderLeft: "3px solid #012d74", fontSize: "15px", lineHeight: 1.7 }}
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

  const [article, recentArticles] = await Promise.all([
    getArticle(slug),
    getRecentArticles(),
  ]);

  if (!article) notFound();

  const relatedArticles = recentArticles.filter((a: any) => a.id !== article.id);
  const recentMatches: any[] = [];

  return (
    <article className="pb-20 overflow-x-hidden" style={{ background: "#f8f9fa" }}>
      <div className="px-4 sm:px-6 lg:px-10 xl:px-16 max-w-[1600px] mx-auto pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-0 items-start">

          {/* ── Main content ── */}
          <div className="pr-0 lg:pr-10 xl:pr-14">
            {/* Banner image */}
            {article.cover_image_url && (
              <div className="relative w-full overflow-hidden rounded-none sm:rounded-lg" style={{ height: "clamp(200px, 35vw, 450px)" }}>
                <Image
                  src={article.cover_image_url}
                  alt={article.title}
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
                / {CATEGORY_LABELS[article.category] ?? article.category}
              </span>
              <h1
                className="font-garet font-bold italic text-[#051937] leading-tight"
                style={{ fontSize: "clamp(1.3rem, 3.5vw, 2.4rem)" }}
              >
                {article.title}
              </h1>
              <div className="flex items-center gap-4 mt-3">
                {article.published_at && (
                  <span className="font-bold uppercase text-[#94a3b8]" style={{ fontSize: "10px", letterSpacing: "0.1em" }}>
                    {formatDate(article.published_at)}
                  </span>
                )}
              </div>
            </div>

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
                  renderContent(article.content, article.galleries)
                )
              ) : (
                <p className="text-[#64748b]">Obsah článku nie je dostupný.</p>
              )}
            </div>

            {/* Photo galleries */}
            {article.galleries && article.galleries.length > 0 && article.galleries.map((g: any, gi: number) => {
              const inContent = article.content?.includes(`{{GALLERY:${gi}}}`);
              if (inContent) return null;
              return (
                <div key={gi} className="mt-10">
                  <h3 className="font-garet font-bold text-[#051937] mb-4" style={{ fontSize: "18px" }}>{g.title || "Fotogaléria"}</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {g.images.map((img: string, i: number) => (
                      <div key={i} className="relative overflow-hidden" style={{ aspectRatio: "16/10", borderRadius: "3px" }}>
                        <Image src={img} alt={`Foto ${i + 1}`} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 35vw" />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

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
              .article-content iframe { max-width: 100%; border-radius: 8px; margin: 20px 0; }
              @media (max-width: 639px) {
                .article-content h2 { font-size: 18px; margin: 24px 0 10px; }
                .article-content h3 { font-size: 16px; margin: 18px 0 6px; }
                .article-content p { font-size: 14px; }
                .article-content li { font-size: 14px; }
                .article-content blockquote { font-size: 14px; }
              }
            `}</style>

            {/* Tags / share */}
            <div className="mt-12 pt-6 flex items-center justify-between flex-wrap gap-4" style={{ borderTop: "1px solid rgba(1,45,116,0.08)" }}>
              <span
                className={`inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${CATEGORY_COLORS[article.category] ?? CATEGORY_COLORS.novinky}`}
                style={{ borderRadius: "3px" }}
              >
                {CATEGORY_LABELS[article.category] ?? article.category}
              </span>
              <Link
                href="/novinky"
                className="flex items-center gap-2 font-bold text-[#051937] hover:text-[#012d74] transition-colors py-2"
                style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", minHeight: "44px" }}
              >
                <svg className="h-3.5 w-3.5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                Späť na novinky
              </Link>
            </div>
          </div>

          {/* ── Sidebar ── */}
          <aside className="hidden lg:block self-start sticky top-[120px]">
            {/* Hockey banner */}
            <Link
              href="/zacni-hrat"
              className="group block relative overflow-hidden mb-4"
              style={{ borderRadius: "3px", height: "140px" }}
            >
              <Image
                src="/images/hockey-field-bg.jpg"
                alt="Staň sa súčasťou hry"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="320px"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(135deg, rgba(1,26,74,0.7) 0%, rgba(1,45,116,0.45) 100%)" }}
              />
              <div className="absolute inset-0 flex flex-col justify-center px-5">
                <p className="font-garet font-bold text-white leading-tight" style={{ fontSize: "15px" }}>
                  Začni s pozemným hokejom!
                </p>
                <p className="text-white mt-1" style={{ fontSize: "11px" }}>
                  Nájdi svoj tím a pridaj sa.
                </p>
                <div
                  className="mt-3 inline-flex items-center gap-2 self-start px-3.5 py-1.5 font-bold text-white"
                  style={{ fontSize: "10px", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "20px", letterSpacing: "0.04em" }}
                >
                  Chcem sa stať hráčom
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
              </div>
            </Link>

            {/* Eshop banner */}
            <Link
              href="/eshop"
              className="group block relative overflow-hidden mb-4"
              style={{ borderRadius: "3px", height: "140px" }}
            >
              <Image
                src="/images/eshop-banner.jpg"
                alt="Oficiálny eshop"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="320px"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to right, rgba(216,0,39,0.85) 0%, rgba(216,0,39,0.4) 50%, transparent 100%)" }}
              />
              <div className="absolute inset-0 flex flex-col justify-center px-5">
                <p className="font-garet font-bold text-white leading-tight" style={{ fontSize: "15px" }}>
                  Oficiálny eshop
                </p>
                <p className="text-white mt-1" style={{ fontSize: "11px" }}>
                  Dresy, merch a vybavenie.
                </p>
                <div
                  className="mt-2.5 inline-flex items-center gap-2 self-start px-3.5 py-1.5 font-bold text-white"
                  style={{ fontSize: "10px", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "20px", letterSpacing: "0.04em" }}
                >
                  Zobraziť obchod
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
              </div>
            </Link>

            <div className="flex flex-col gap-0" style={{ background: "#fff", borderRadius: "8px", overflow: "hidden", boxShadow: "0 1px 3px rgba(1,45,116,0.06)" }}>
              {/* Header */}
              <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(1,45,116,0.06)" }}>
                <p className="font-garet font-bold italic text-[#051937] uppercase" style={{ fontSize: "13px", letterSpacing: "0.03em" }}>
                  Ďalšie články
                </p>
              </div>

              {/* Article list */}
              {relatedArticles.map((a: any, i: number) => (
                <Link
                  key={a.id}
                  href={`/novinky/${a.slug}`}
                  className="group flex gap-3.5 px-5 py-4 transition-colors hover:bg-[#f8f9fa]"
                  style={{ borderBottom: i < relatedArticles.length - 1 ? "1px solid rgba(1,45,116,0.05)" : "none" }}
                >
                  {a.cover_image_url && (
                    <div className="relative shrink-0 overflow-hidden" style={{ width: "72px", height: "50px", borderRadius: "4px" }}>
                      <Image
                        src={a.cover_image_url}
                        alt={a.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="72px"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-[#051937] leading-snug line-clamp-2 group-hover:text-[#012d74] transition-colors" style={{ fontSize: "11px" }}>
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

              {/* View all */}
              <Link
                href="/novinky"
                className="flex items-center justify-between px-5 py-3.5 font-bold text-[#012d74] hover:bg-[#f0f4fa] transition-colors"
                style={{ fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase", borderTop: "1px solid rgba(1,45,116,0.06)" }}
              >
                Všetky články
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
