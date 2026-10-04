import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import type { Metadata } from "next";
import { MatchVideo } from "./MatchVideo";

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
      <div className="py-8 sm:py-10 px-4 sm:px-6" style={{ background: "#ffffff", borderBottom: "1px solid rgba(1,45,116,0.06)" }}>
        <div className="max-w-[900px] mx-auto">
          <Link href="/zapasy" className="inline-flex items-center gap-2 font-bold text-[#94a3b8] hover:text-[#051937] transition-colors mb-6" style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            <svg className="h-3 w-3 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            <span className="notranslate" data-en="Match Center">Zápasové centrum</span>
          </Link>

          {/* Liga */}
          {m.league && (
            <p className="font-bold uppercase text-[#012d74] mb-3 text-center" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>
              {m.league}
            </p>
          )}

          {/* Tímy a skóre */}
          <div className="flex items-center gap-4 sm:gap-8 md:gap-12">
            {/* Domáci */}
            <div className="flex flex-col items-center gap-2 sm:gap-3 flex-1">
              <div className="hidden sm:block"><TeamLogo logo={m.home_logo} name={m.home_team || "Domáci"} size={72} /></div>
              <div className="sm:hidden"><TeamLogo logo={m.home_logo} name={m.home_team || "Domáci"} size={52} /></div>
              <p className={`font-garet font-bold italic text-center leading-tight ${homeWin ? "text-[#16a34a]" : "text-[#051937]"}`} style={{ fontSize: "clamp(16px, 3vw, 22px)" }}>
                {m.home_team || m.home_short || "Domáci"}
              </p>
            </div>

            {/* Skóre */}
            <div className="shrink-0 flex flex-col items-center">
              {finished ? (
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="font-garet font-black italic leading-none" style={{ fontSize: "clamp(32px, 6vw, 52px)", color: homeWin ? "#16a34a" : "#051937" }}>{m.home_score ?? 0}</span>
                  <span className="font-bold text-[#012d74]" style={{ fontSize: "clamp(14px, 2vw, 22px)" }}>:</span>
                  <span className="font-garet font-black italic leading-none" style={{ fontSize: "clamp(32px, 6vw, 52px)", color: awayWin ? "#16a34a" : "#051937" }}>{m.away_score ?? 0}</span>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-2 mb-1">
                    <div style={{ width: "20px", height: "1px", background: "#012d74", opacity: 0.3 }} />
                    <span className="font-garet font-bold italic text-[#012d74]" style={{ fontSize: "16px" }}>VS</span>
                    <div style={{ width: "20px", height: "1px", background: "#012d74", opacity: 0.3 }} />
                  </div>
                </div>
              )}
              <p className="text-[#94a3b8] font-bold mt-2 uppercase" style={{ fontSize: "8px", letterSpacing: "0.1em" }}>
                {finished ? "Konečný výsledok" : "Plánovaný zápas"}
              </p>
            </div>

            {/* Hostia */}
            <div className="flex flex-col items-center gap-2 sm:gap-3 flex-1">
              <div className="hidden sm:block"><TeamLogo logo={m.away_logo} name={m.away_team || "Hostia"} size={72} /></div>
              <div className="sm:hidden"><TeamLogo logo={m.away_logo} name={m.away_team || "Hostia"} size={52} /></div>
              <p className={`font-garet font-bold italic text-center leading-tight ${awayWin ? "text-[#16a34a]" : "text-[#051937]"}`} style={{ fontSize: "clamp(16px, 3vw, 22px)" }}>
                {m.away_team || m.away_short || "Hostia"}
              </p>
            </div>
          </div>
          {/* Dátum, čas, miesto */}
          <div className="flex items-center justify-center gap-3 mt-6 text-[#012d74]" style={{ fontSize: "13px" }}>
            <span className="font-semibold">{fullDate}</span>
            <span className="text-[#012d74]/30">·</span>
            <span className="font-bold">{time}</span>
            {m.venue && <>
              <span className="text-[#012d74]/30">·</span>
              <span className="font-semibold flex items-center gap-1">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" /></svg>
                {m.venue}
              </span>
            </>}
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
          {m.video_url && <MatchVideo url={m.video_url} />}
        </div>
      </div>
    </article>
  );
}
