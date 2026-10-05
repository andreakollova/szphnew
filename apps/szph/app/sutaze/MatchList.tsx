import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

export function getCurrentSeason(): string {
  const now = new Date();
  const month = now.getMonth() + 1; // 1-12
  const year = now.getFullYear();
  if (month >= 8) {
    return `${year}/${year + 1}`;
  }
  return `${year - 1}/${year}`;
}

interface Match {
  id: string;
  home_team: string;
  away_team: string;
  home_short?: string;
  away_short?: string;
  home_logo?: string;
  away_logo?: string;
  home_score?: number | null;
  away_score?: number | null;
  date: string;
  match_time?: string;
  league?: string;
  venue?: string;
  status?: string;
  site?: string;
}

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

const getMatches = unstable_cache(
  async () => {
    const sb = getSupabase();
    const { data } = await sb
      .from("matches")
      .select("*")
      .eq("site", "szph")
      .order("date", { ascending: false })
      .limit(200);
    return (data ?? []) as Match[];
  },
  ["sutaze-matches"],
  { revalidate: 60 }
);

const INDOOR_KEYWORDS = ["hala", "halov", "indoor", "halová", "halový", "halovej"];

function isIndoorMatch(match: Match): boolean {
  const league = (match.league ?? "").toLowerCase();
  return INDOOR_KEYWORDS.some((kw) => league.includes(kw));
}

function formatMatchDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("sk-SK", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatMatchTime(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString("sk-SK", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function TeamLogo({ logo, name, size = 28 }: { logo?: string; name: string; size?: number }) {
  if (logo?.startsWith("flag:")) {
    const code = logo.replace("flag:", "");
    return (
      <div className="shrink-0 overflow-hidden rounded-full" style={{ width: size, height: size }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`https://flagcdn.com/w80/${code}.png`} alt={name} width={size} height={size} style={{ width: size, height: size, objectFit: "cover" }} />
      </div>
    );
  }
  if (logo?.startsWith("/") || logo?.startsWith("https://")) {
    return (
      <div className="shrink-0" style={{ width: size, height: size }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} alt={name} width={size} height={size} style={{ width: size, height: size, objectFit: "contain" }} />
      </div>
    );
  }
  return (
    <div className="shrink-0 flex items-center justify-center rounded-full" style={{ width: size, height: size, background: "#e2e8f0" }}>
      <span className="font-bold text-[#334155]" style={{ fontSize: size * 0.35 }}>
        {name.split(" ").map((w) => w[0]).join("").slice(0, 3).toUpperCase()}
      </span>
    </div>
  );
}

function MatchRow({ match }: { match: Match }) {
  const finished = match.status === "finished";
  const homeWin = finished && (match.home_score ?? 0) > (match.away_score ?? 0);
  const awayWin = finished && (match.away_score ?? 0) > (match.home_score ?? 0);

  return (
    <Link
      href={`/zapasy/${match.id}`}
      className="flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3.5 border-b border-[rgba(1,45,116,0.06)] hover:bg-[#f1f5f9] transition-colors"
    >
      {/* Date */}
      <div className="shrink-0 text-right" style={{ width: 70 }}>
        <p className="text-[#334155] font-medium" style={{ fontSize: "12px" }}>
          {formatMatchDate(match.date)}
        </p>
        <p className="text-[#94a3b8]" style={{ fontSize: "11px" }}>
          {formatMatchTime(match.date)}
        </p>
      </div>

      {/* Teams */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <TeamLogo logo={match.home_logo} name={match.home_team || "Domaci"} size={20} />
          <span
            className={`notranslate truncate ${homeWin ? "font-bold text-[#051937]" : "text-[#334155]"}`}
            style={{ fontSize: "13px" }}
          >
            {match.home_short || match.home_team}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <TeamLogo logo={match.away_logo} name={match.away_team || "Hostia"} size={20} />
          <span
            className={`notranslate truncate ${awayWin ? "font-bold text-[#051937]" : "text-[#334155]"}`}
            style={{ fontSize: "13px" }}
          >
            {match.away_short || match.away_team}
          </span>
        </div>
      </div>

      {/* Score */}
      <div className="shrink-0 text-center" style={{ width: 44 }}>
        {finished ? (
          <div>
            <p className={`font-bold ${homeWin ? "text-[#16a34a]" : "text-[#051937]"}`} style={{ fontSize: "14px", lineHeight: 1.4 }}>
              {match.home_score ?? 0}
            </p>
            <p className={`font-bold ${awayWin ? "text-[#16a34a]" : "text-[#051937]"}`} style={{ fontSize: "14px", lineHeight: 1.4 }}>
              {match.away_score ?? 0}
            </p>
          </div>
        ) : (
          <span className="text-[#94a3b8] font-medium" style={{ fontSize: "11px" }}>vs</span>
        )}
      </div>

      {/* League badge */}
      <div className="shrink-0 hidden sm:block" style={{ width: 140 }}>
        {match.league && (
          <span className="text-[#64748b] truncate block" style={{ fontSize: "11px" }}>
            {match.league}
          </span>
        )}
      </div>

      {/* Arrow */}
      <svg className="h-3.5 w-3.5 text-[#94a3b8] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
}

export async function MatchList({ type }: { type: "outdoor" | "indoor" }) {
  const allMatches = await getMatches();

  const filtered = allMatches.filter((m) =>
    type === "indoor" ? isIndoorMatch(m) : !isIndoorMatch(m)
  );

  const now = new Date().toISOString();
  const upcoming = filtered
    .filter((m) => m.status !== "finished" && m.date >= now)
    .sort((a, b) => a.date.localeCompare(b.date));
  const past = filtered
    .filter((m) => m.status === "finished" || m.date < now)
    .sort((a, b) => b.date.localeCompare(a.date));

  if (filtered.length === 0) {
    return (
      <div className="rounded-lg p-8 text-center mb-12" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
        <p className="text-[#64748b]" style={{ fontSize: "14px" }}>
          Zatiaľ nie sú naplánované žiadne zápasy pre túto sezónu.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 mb-12">
      {/* Program - upcoming */}
      {upcoming.length > 0 && (
        <div>
          <h2 className="font-bold text-[#051937] mb-3 flex items-center gap-2" style={{ fontSize: "18px" }}>
            <svg className="h-5 w-5 text-[#012d74]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Program zápasov
          </h2>
          <div className="rounded-lg overflow-hidden" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
            {upcoming.map((m) => (
              <MatchRow key={m.id} match={m} />
            ))}
          </div>
        </div>
      )}

      {/* Vysledky - past */}
      {past.length > 0 && (
        <div>
          <h2 className="font-bold text-[#051937] mb-3 flex items-center gap-2" style={{ fontSize: "18px" }}>
            <svg className="h-5 w-5 text-[#012d74]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Výsledky
          </h2>
          <div className="rounded-lg overflow-hidden" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
            {past.slice(0, 30).map((m) => (
              <MatchRow key={m.id} match={m} />
            ))}
          </div>
          {past.length > 30 && (
            <div className="text-center mt-4">
              <Link
                href="/zapasy"
                className="inline-flex items-center gap-2 font-bold text-[#012d74] hover:underline"
                style={{ fontSize: "14px" }}
              >
                Zobraziť všetky zápasy
                <span>&#8594;</span>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
