import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import type { Metadata } from "next";

function getSupabase() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
}

interface Props { params: Promise<{ id: string }> }

export const metadata: Metadata = { title: "Detail zápasu" };

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
    <div className="shrink-0 flex items-center justify-center rounded-full" style={{ width: size, height: size, background: "#e2e8f0" }}>
      <span className="font-black text-[#64748b]" style={{ fontSize: size * 0.3 }}>
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

  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      {/* Hero */}
      <div className="py-10 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <Link href="/zapasy" className="inline-flex items-center gap-2 font-bold text-white/40 hover:text-white/70 transition-colors mb-5" style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            <svg className="h-3 w-3 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            Zápasové centrum
          </Link>

          {/* Liga */}
          <span className="font-bold uppercase text-white/50 block mb-3" style={{ fontSize: "10px", letterSpacing: "0.12em" }}>
            {m.league || "Zápas"}
          </span>

          {/* Tímy a skóre */}
          <div className="flex items-center gap-6 md:gap-10">
            {/* Domáci */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <TeamLogo logo={m.home_logo} name={m.home_team || "Domáci"} size={64} />
              <p className={`font-garet font-bold text-center leading-tight ${homeWin ? "text-[#4ade80]" : "text-white"}`} style={{ fontSize: "16px" }}>
                {m.home_team || m.home_short || "Domáci"}
              </p>
            </div>

            {/* Skóre */}
            <div className="shrink-0 text-center">
              {finished ? (
                <div className="flex items-center gap-3">
                  <span className="font-garet font-black" style={{ fontSize: "48px", lineHeight: 1, color: homeWin ? "#4ade80" : "#fff" }}>{m.home_score ?? 0}</span>
                  <span className="font-bold text-white/30" style={{ fontSize: "20px" }}>:</span>
                  <span className="font-garet font-black" style={{ fontSize: "48px", lineHeight: 1, color: awayWin ? "#4ade80" : "#fff" }}>{m.away_score ?? 0}</span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="font-bold text-white/30" style={{ fontSize: "16px" }}>vs</span>
                </div>
              )}
              <p className="text-white/30 font-bold mt-2" style={{ fontSize: "10px" }}>
                {finished ? "KONEČNÝ VÝSLEDOK" : "PLÁNOVANÝ"}
              </p>
            </div>

            {/* Hostia */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <TeamLogo logo={m.away_logo} name={m.away_team || "Hostia"} size={64} />
              <p className={`font-garet font-bold text-center leading-tight ${awayWin ? "text-[#4ade80]" : "text-white"}`} style={{ fontSize: "16px" }}>
                {m.away_team || m.away_short || "Hostia"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-6">

          {/* Ľavá — info */}
          <div className="space-y-5">

            {/* Info karty */}
            <div className="bg-white p-5" style={{ borderRadius: "3px", border: "1px solid rgba(1,45,116,0.06)" }}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-bold uppercase text-[#94a3b8] mb-1" style={{ fontSize: "9px", letterSpacing: "0.1em" }}>Dátum</p>
                  <p className="font-semibold text-[#051937]" style={{ fontSize: "13px" }}>{fullDate}</p>
                </div>
                <div>
                  <p className="font-bold uppercase text-[#94a3b8] mb-1" style={{ fontSize: "9px", letterSpacing: "0.1em" }}>Čas</p>
                  <p className="font-semibold text-[#051937]" style={{ fontSize: "13px" }}>{time}</p>
                </div>
                {m.league && (
                  <div>
                    <p className="font-bold uppercase text-[#94a3b8] mb-1" style={{ fontSize: "9px", letterSpacing: "0.1em" }}>Súťaž</p>
                    <p className="font-semibold text-[#051937]" style={{ fontSize: "13px" }}>{m.league}</p>
                  </div>
                )}
                {m.venue && (
                  <div>
                    <p className="font-bold uppercase text-[#94a3b8] mb-1" style={{ fontSize: "9px", letterSpacing: "0.1em" }}>Miesto</p>
                    <p className="font-semibold text-[#051937]" style={{ fontSize: "13px" }}>{m.venue}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Strelci gólov */}
            {goals.length > 0 && (
              <div className="bg-white p-5" style={{ borderRadius: "3px", border: "1px solid rgba(1,45,116,0.06)" }}>
                <p className="font-bold uppercase text-[#94a3b8] mb-4" style={{ fontSize: "9px", letterSpacing: "0.1em" }}>Strelci gólov</p>
                <div className="grid grid-cols-2 gap-x-6">
                  {/* Domáci */}
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
                  {/* Hostia */}
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

          {/* Pravá — mapa */}
          <div>
            {m.venue && (
              <div>
                <div className="overflow-hidden" style={{ borderRadius: "3px", border: "1px solid rgba(1,45,116,0.06)", height: "220px" }}>
                  <iframe
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=17.0%2C48.0%2C17.3%2C48.3&layer=mapnik`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                  />
                </div>
                <p className="font-bold text-[#94a3b8] mt-2" style={{ fontSize: "11px" }}>{m.venue}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
