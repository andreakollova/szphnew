import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import type { Metadata } from "next";

function getSupabase() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
}

interface Props { params: Promise<{ id: string }> }

export const metadata: Metadata = { title: "Detail zápasu" };

const VENUE_COORDS: Record<string, { lat: number; lng: number }> = {
  "Šenkvice": { lat: 48.2919, lng: 17.3419 },
  "HC 1952 Šenkvice": { lat: 48.2919, lng: 17.3419 },
  "HA Senkvice": { lat: 48.2919, lng: 17.3419 },
  "Bratislava": { lat: 48.2070, lng: 17.1530 },
  "Bratislava - Rača": { lat: 48.2070, lng: 17.1530 },
  "KPH Rača": { lat: 48.2070, lng: 17.1530 },
  "Rača": { lat: 48.2070, lng: 17.1530 },
  "Zlaté Moravce": { lat: 48.3873, lng: 18.3968 },
  "Nové Zámky": { lat: 47.9857, lng: 18.1623 },
  "Holíč": { lat: 48.8095, lng: 17.1614 },
  "Nová Dubnica": { lat: 48.9348, lng: 18.1475 },
  "Senec": { lat: 48.2193, lng: 17.3990 },
  "Trnava": { lat: 48.3774, lng: 17.5862 },
  "Prešov": { lat: 48.9986, lng: 21.2395 },
  "Považská Bystrica": { lat: 49.1215, lng: 18.4216 },
  "Nitra": { lat: 48.3060, lng: 18.0855 },
  "Lučenec": { lat: 48.3309, lng: 19.6653 },
  "Banská Bystrica": { lat: 48.7358, lng: 19.1461 },
  "Košice": { lat: 48.7164, lng: 21.2611 },
  "Partizánske": { lat: 48.6288, lng: 18.3754 },
  "Budmerice": { lat: 48.3575, lng: 17.4089 },
  "Šamorín": { lat: 48.0286, lng: 17.3117 },
};

function getVenueCoords(venue: string): { lat: number; lng: number } | null {
  if (VENUE_COORDS[venue]) return VENUE_COORDS[venue];
  for (const [key, coords] of Object.entries(VENUE_COORDS)) {
    if (venue.toLowerCase().includes(key.toLowerCase())) return coords;
  }
  return null;
}

function TeamLogo({ logo, name, size = 48 }: { logo?: string; name: string; size?: number }) {
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
    <div className="shrink-0 flex items-center justify-center rounded-full" style={{ width: size, height: size, background: "rgba(255,255,255,0.1)" }}>
      <span className="font-black text-white" style={{ fontSize: size * 0.3 }}>
        {name.split(" ").map(w => w[0]).join("").slice(0, 3).toUpperCase()}
      </span>
    </div>
  );
}

export default async function MatchDetailPage({ params }: Props) {
  const { id } = await params;
  const sb = getSupabase();
  const { data: m } = await sb.from("matches").select("*").eq("id", id).single();

  if (!m) notFound();

  const d = new Date(m.date);
  const fullDate = d.toLocaleDateString("sk-SK", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const time = m.match_time || d.toLocaleTimeString("sk-SK", { hour: "2-digit", minute: "2-digit" });
  const finished = m.status === "finished";
  const homeWin = finished && (m.home_score ?? 0) > (m.away_score ?? 0);
  const awayWin = finished && (m.away_score ?? 0) > (m.home_score ?? 0);
  const goals: { team: string; player: string; minute?: string }[] = m.goals ?? [];
  const homeGoals = goals.filter(g => g.team === "home");
  const awayGoals = goals.filter(g => g.team === "away");
  const coords = m.venue ? getVenueCoords(m.venue) : null;

  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20 overflow-x-hidden">
      {/* Hero */}
      <div className="py-6 sm:py-8 px-4 sm:px-6" style={{ background: "#f0f2f5", borderBottom: "1px solid rgba(1,45,116,0.06)" }}>
        <div className="max-w-[900px] mx-auto">
          <Link href="/zapasy" className="inline-flex items-center gap-2 font-bold text-[#94a3b8] hover:text-[#051937] transition-colors mb-4" style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            <svg className="h-3 w-3 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            Zápasové centrum
          </Link>

          {/* Liga + info */}
          {m.league && (
            <p className="font-bold uppercase text-[#012d74] mb-1" style={{ fontSize: "10px", letterSpacing: "0.12em" }}>
              {m.league}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[#64748b] mb-5" style={{ fontSize: "12px" }}>
            <span>{fullDate}</span>
            <span>·</span>
            <span>{time}</span>
            {m.venue && <>
              <span>·</span>
              <span>{m.venue}</span>
            </>}
          </div>

          {/* Tímy a skóre */}
          <div className="flex items-center gap-4 sm:gap-6 md:gap-10">
            {/* Domáci */}
            <div className="flex flex-col items-center gap-1.5 sm:gap-2 flex-1">
              <div className="hidden sm:block"><TeamLogo logo={m.home_logo} name={m.home_team || "Domáci"} size={64} /></div>
              <div className="sm:hidden"><TeamLogo logo={m.home_logo} name={m.home_team || "Domáci"} size={44} /></div>
              <p className={`font-garet font-bold text-center leading-tight text-sm sm:text-base ${homeWin ? "text-[#16a34a]" : "text-[#051937]"}`}>
                {m.home_team || m.home_short || "Domáci"}
              </p>
            </div>

            {/* Skóre */}
            <div className="shrink-0 flex flex-col items-center">
              {finished ? (
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="font-garet font-black text-[28px] sm:text-[44px] leading-none" style={{ color: homeWin ? "#16a34a" : "#051937" }}>{m.home_score ?? 0}</span>
                  <span className="font-bold text-[#012d74] text-base sm:text-xl">:</span>
                  <span className="font-garet font-black text-[28px] sm:text-[44px] leading-none" style={{ color: awayWin ? "#16a34a" : "#051937" }}>{m.away_score ?? 0}</span>
                </div>
              ) : (
                <span className="font-garet font-bold text-[#012d74]" style={{ fontSize: "18px" }}>vs</span>
              )}
              <p className="text-[#94a3b8] font-bold mt-1.5 uppercase" style={{ fontSize: "8px", letterSpacing: "0.1em" }}>
                {finished ? "Konečný výsledok" : "Plánovaný"}
              </p>
            </div>

            {/* Hostia */}
            <div className="flex flex-col items-center gap-1.5 sm:gap-2 flex-1">
              <div className="hidden sm:block"><TeamLogo logo={m.away_logo} name={m.away_team || "Hostia"} size={64} /></div>
              <div className="sm:hidden"><TeamLogo logo={m.away_logo} name={m.away_team || "Hostia"} size={44} /></div>
              <p className={`font-garet font-bold text-center leading-tight text-sm sm:text-base ${awayWin ? "text-[#16a34a]" : "text-[#051937]"}`}>
                {m.away_team || m.away_short || "Hostia"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-4 sm:px-6 pt-8">

        {/* Mapa na šírku */}
        {coords && (
          <div className="mb-6">
            <div className="overflow-hidden" style={{ borderRadius: "3px", border: "1px solid rgba(1,45,116,0.06)", height: "240px" }}>
              <iframe
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${coords.lng - 0.015}%2C${coords.lat - 0.008}%2C${coords.lng + 0.015}%2C${coords.lat + 0.008}&layer=mapnik&marker=${coords.lat}%2C${coords.lng}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
            <p className="font-bold text-[#94a3b8] mt-2" style={{ fontSize: "11px" }}>{m.venue}</p>
          </div>
        )}

        {/* Info + góly */}
        <div className="space-y-5">

          {/* Strelci gólov */}
          {goals.length > 0 && (
            <div className="bg-white p-5" style={{ borderRadius: "3px", border: "1px solid rgba(1,45,116,0.06)" }}>
              <p className="font-bold uppercase text-[#94a3b8] mb-4" style={{ fontSize: "9px", letterSpacing: "0.1em" }}>Strelci gólov</p>
              <div className="grid grid-cols-2 gap-x-6">
                <div>
                  <p className="font-bold text-[#051937] mb-2" style={{ fontSize: "11px" }}>{m.home_short || m.home_team}</p>
                  <div className="space-y-2">
                    {homeGoals.length === 0 && <p className="text-[#94a3b8]" style={{ fontSize: "12px" }}>-</p>}
                    {homeGoals.map((g, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <svg className="h-3 w-3 text-[#012d74] shrink-0" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>
                        <span className="font-semibold text-[#051937]" style={{ fontSize: "13px" }}>{g.player}</span>
                        {g.minute && <span className="text-[#94a3b8] font-bold" style={{ fontSize: "11px" }}>{g.minute}&apos;</span>}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-bold text-[#051937] mb-2" style={{ fontSize: "11px" }}>{m.away_short || m.away_team}</p>
                  <div className="space-y-2">
                    {awayGoals.length === 0 && <p className="text-[#94a3b8]" style={{ fontSize: "12px" }}>-</p>}
                    {awayGoals.map((g, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <svg className="h-3 w-3 text-[#012d74] shrink-0" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>
                        <span className="font-semibold text-[#051937]" style={{ fontSize: "13px" }}>{g.player}</span>
                        {g.minute && <span className="text-[#94a3b8] font-bold" style={{ fontSize: "11px" }}>{g.minute}&apos;</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Video */}
          {m.video_url && (
            <a href={m.video_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white p-5 hover:bg-[#f8fafd] transition-colors" style={{ borderRadius: "3px", border: "1px solid rgba(1,45,116,0.06)" }}>
              <div className="shrink-0 flex items-center justify-center rounded-full" style={{ width: 40, height: 40, background: "#d80027" }}>
                <svg className="h-4 w-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              </div>
              <div>
                <p className="font-bold text-[#051937]" style={{ fontSize: "14px" }}>Sledovať záznam zápasu</p>
                <p className="text-[#94a3b8]" style={{ fontSize: "11px" }}>Otvoriť video v novom okne</p>
              </div>
              <svg className="h-4 w-4 text-[#94a3b8] ml-auto shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
