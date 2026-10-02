"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const CITIES: Record<string, { lat: number; lon: number }> = {
  "Bratislava": { lat: 48.148, lon: 17.107 },
  "Šenkvice": { lat: 48.296, lon: 17.337 },
  "Zlaté Moravce": { lat: 48.388, lon: 18.398 },
  "Nová Dubnica": { lat: 48.943, lon: 18.148 },
  "Košice": { lat: 48.716, lon: 21.261 },
  "Banská Bystrica": { lat: 48.736, lon: 19.146 },
  "Žilina": { lat: 49.223, lon: 18.739 },
  "Trnava": { lat: 48.377, lon: 17.587 },
  "Nitra": { lat: 48.308, lon: 18.087 },
  "Prešov": { lat: 48.997, lon: 21.239 },
};

const WEATHER_ICONS: Record<number, string> = {
  0: "☀️", 1: "🌤️", 2: "⛅", 3: "☁️",
  45: "🌫️", 48: "🌫️",
  51: "🌦️", 53: "🌦️", 55: "🌧️",
  61: "🌧️", 63: "🌧️", 65: "🌧️",
  71: "🌨️", 73: "🌨️", 75: "🌨️",
  80: "🌦️", 81: "🌧️", 82: "🌧️",
  95: "⛈️", 96: "⛈️", 99: "⛈️",
};

// Slovak name days calendar
const MENINY: Record<string, string> = {
  "1-1":"Nový rok","1-2":"Alexandra","1-3":"Daniela","1-4":"Drahoslav","1-5":"Andrea","1-6":"Antónia","1-7":"Bohuslava","1-8":"Severín","1-9":"Alexej","1-10":"Dáša",
  "1-11":"Malvína","1-12":"Ernest","1-13":"Rastislav","1-14":"Radovan","1-15":"Dobroslav","1-16":"Kristína","1-17":"Nataša","1-18":"Bohdana","1-19":"Drahomíra","1-20":"Dalibor",
  "1-21":"Vincent","1-22":"Zora","1-23":"Miloš","1-24":"Timotej","1-25":"Gejza","1-26":"Tamara","1-27":"Bohuš","1-28":"Alfonz","1-29":"Gašpar","1-30":"Ema","1-31":"Emil",
  "2-1":"Tatiana","2-2":"Erik","2-3":"Blažej","2-4":"Veronika","2-5":"Agáta","2-6":"Dorota","2-7":"Vanda","2-8":"Zoja","2-9":"Zdenko","2-10":"Gabriela",
  "2-11":"Dezider","2-12":"Perla","2-13":"Arpád","2-14":"Valentín","2-15":"Pravoslav","2-16":"Ida","2-17":"Miloslava","2-18":"Jaromír","2-19":"Vlasta","2-20":"Lívia",
  "2-21":"Eleonóra","2-22":"Etela","2-23":"Roman","2-24":"Matej","2-25":"Frederik","2-26":"Viktor","2-27":"Alexander","2-28":"Zlatica","2-29":"Radomír",
  "3-1":"Albín","3-2":"Anežka","3-3":"Bohumil","3-4":"Kazimír","3-5":"Fridrich","3-6":"Radoslav","3-7":"Tomáš","3-8":"Alan","3-9":"Františka","3-10":"Branislav",
  "3-11":"Angela","3-12":"Gregor","3-13":"Vlastimil","3-14":"Matilda","3-15":"Svetlana","3-16":"Boleslav","3-17":"Ľubica","3-18":"Eduard","3-19":"Jozef","3-20":"Víťazoslav",
  "3-21":"Blahoslav","3-22":"Beňadik","3-23":"Adrián","3-24":"Gabriel","3-25":"Marián","3-26":"Emanuel","3-27":"Alena","3-28":"Soňa","3-29":"Miroslav","3-30":"Vieroslav","3-31":"Benjamín",
  "4-1":"Hugo","4-2":"Zita","4-3":"Richard","4-4":"Izidor","4-5":"Miroslava","4-6":"Irena","4-7":"Zoltán","4-8":"Albert","4-9":"Milena","4-10":"Igor",
  "4-11":"Július","4-12":"Estera","4-13":"Aleš","4-14":"Justína","4-15":"Fedor","4-16":"Dana","4-17":"Rudolf","4-18":"Valér","4-19":"Jela","4-20":"Marcel",
  "4-21":"Ervín","4-22":"Slavomír","4-23":"Vojtech","4-24":"Juraj","4-25":"Marek","4-26":"Jaroslava","4-27":"Jaroslav","4-28":"Jarmila","4-29":"Lea","4-30":"Anastázia",
  "5-1":"Sviatok práce","5-2":"Žigmund","5-3":"Galina","5-4":"Florián","5-5":"Lesana","5-6":"Hermína","5-7":"Monika","5-8":"Ingrida","5-9":"Roland","5-10":"Viktória",
  "5-11":"Blažena","5-12":"Pankrác","5-13":"Servác","5-14":"Bonifác","5-15":"Žofia","5-16":"Svetozár","5-17":"Gizela","5-18":"Viola","5-19":"Gertrúda","5-20":"Bernard",
  "5-21":"Zina","5-22":"Júlia","5-23":"Želmíra","5-24":"Ela","5-25":"Urban","5-26":"Dušan","5-27":"Iveta","5-28":"Viliam","5-29":"Vilma","5-30":"Ferdinand","5-31":"Petronela",
  "6-1":"Žaneta","6-2":"Oxana","6-3":"Karolína","6-4":"Lenka","6-5":"Laura","6-6":"Norbert","6-7":"Róbert","6-8":"Medard","6-9":"Stanislava","6-10":"Margareta",
  "6-11":"Dobroslava","6-12":"Zlatko","6-13":"Anton","6-14":"Vasil","6-15":"Vít","6-16":"Blanka","6-17":"Adolf","6-18":"Vratislav","6-19":"Alfréd","6-20":"Valéria",
  "6-21":"Alojz","6-22":"Paulína","6-23":"Sidónia","6-24":"Ján","6-25":"Olívia","6-26":"Adriána","6-27":"Ladislav","6-28":"Beáta","6-29":"Peter","6-30":"Melánia",
  "7-1":"Diana","7-2":"Berta","7-3":"Miloslav","7-4":"Prokop","7-5":"Cyril","7-6":"Patrícia","7-7":"Oliver","7-8":"Ivan","7-9":"Lujza","7-10":"Amália",
  "7-11":"Milota","7-12":"Nina","7-13":"Margita","7-14":"Kamil","7-15":"Henrich","7-16":"Drahomír","7-17":"Bohuslav","7-18":"Kamila","7-19":"Dušana","7-20":"Iľja",
  "7-21":"Daniel","7-22":"Magdaléna","7-23":"Oľga","7-24":"Vladimír","7-25":"Jakub","7-26":"Anna","7-27":"Božena","7-28":"Krištof","7-29":"Marta","7-30":"Libuša","7-31":"Ignác",
  "8-1":"Božidara","8-2":"Gustáv","8-3":"Jerguš","8-4":"Dominik","8-5":"Hortenzia","8-6":"Jozefína","8-7":"Štefánia","8-8":"Oskar","8-9":"Ľubomíra","8-10":"Vavrinec",
  "8-11":"Zuzana","8-12":"Darina","8-13":"Ľubomír","8-14":"Mojmír","8-15":"Marcela","8-16":"Leonard","8-17":"Milica","8-18":"Elena","8-19":"Lýdia","8-20":"Anabela",
  "8-21":"Jana","8-22":"Tichomír","8-23":"Filip","8-24":"Bartolomej","8-25":"Ľudovít","8-26":"Samuel","8-27":"Silvia","8-28":"Augustín","8-29":"Nikola","8-30":"Ružena","8-31":"Nora",
  "9-1":"Drahoslava","9-2":"Linda","9-3":"Belo","9-4":"Rozália","9-5":"Regina","9-6":"Alica","9-7":"Marianna","9-8":"Miriama","9-9":"Martina","9-10":"Oleg",
  "9-11":"Bystrík","9-12":"Mária","9-13":"Ctibor","9-14":"Ľudomil","9-15":"Jolana","9-16":"Ľudmila","9-17":"Olympia","9-18":"Eugénia","9-19":"Konštantín","9-20":"Ľuboslav",
  "9-21":"Matúš","9-22":"Móric","9-23":"Zdenka","9-24":"Ľuboš","9-25":"Vladislav","9-26":"Edita","9-27":"Cyprián","9-28":"Václav","9-29":"Michal","9-30":"Jarolím",
  "10-1":"Arnold","10-2":"Levoslav","10-3":"Stela","10-4":"František","10-5":"Viera","10-6":"Natália","10-7":"Eliška","10-8":"Brigita","10-9":"Dionýz","10-10":"Slavomíra",
  "10-11":"Valentína","10-12":"Maximilian","10-13":"Koloman","10-14":"Boris","10-15":"Terézia","10-16":"Vladimíra","10-17":"Hedviga","10-18":"Lukáš","10-19":"Kristián","10-20":"Vendelín",
  "10-21":"Uršuľa","10-22":"Sergej","10-23":"Alojzia","10-24":"Kvetoslava","10-25":"Aurel","10-26":"Demeter","10-27":"Sabína","10-28":"Dobromila","10-29":"Klára","10-30":"Šimon","10-31":"Aurélia",
  "11-1":"Denis","11-2":"Pamätný deň","11-3":"Hubert","11-4":"Karol","11-5":"Imrich","11-6":"Renáta","11-7":"René","11-8":"Bohumír","11-9":"Teodor","11-10":"Tibor",
  "11-11":"Maroš","11-12":"Svätopluk","11-13":"Stanislav","11-14":"Irma","11-15":"Leopold","11-16":"Agnesa","11-17":"Klaudia","11-18":"Eugen","11-19":"Alžbeta","11-20":"Félix",
  "11-21":"Elvíra","11-22":"Cecília","11-23":"Klement","11-24":"Emília","11-25":"Katarína","11-26":"Kornel","11-27":"Milan","11-28":"Henrieta","11-29":"Vratko","11-30":"Ondrej",
  "12-1":"Edmund","12-2":"Bibiána","12-3":"Oldrich","12-4":"Barbora","12-5":"Oto","12-6":"Mikuláš","12-7":"Ambróz","12-8":"Marína","12-9":"Izabela","12-10":"Radúz",
  "12-11":"Hilda","12-12":"Otília","12-13":"Lucia","12-14":"Branislava","12-15":"Ivica","12-16":"Albína","12-17":"Kornélia","12-18":"Sláva","12-19":"Judita","12-20":"Dagmara",
  "12-21":"Bohdan","12-22":"Adela","12-23":"Nadežda","12-24":"Adam","12-25":"1. sviatok vianočný","12-26":"Štefan","12-27":"Filoména","12-28":"Ivana","12-29":"Milada","12-30":"Dávid","12-31":"Silvester",
};

function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function getTodayMeniny(): string {
  const d = new Date();
  const key = `${d.getMonth() + 1}-${d.getDate()}`;
  return MENINY[key] || "";
}

const CLUB_LOGOS: Record<string, string> = {
  "HAŠ": "/images/timy/HAS.webp",
  "ŠK": "/images/timy/SEN.webp",
  "RAČ": "/images/timy/Raca-logo-70x58-1-32x27.webp",
  HOKO: "/images/timy/logo-KPH-HOKO-1-Photoroom-32x18.webp",
  HKM: "/images/timy/nova-dubnica-32x32.webp",
};

const CLUB_NAMES: Record<string, string> = {
  "HAŠ": "HA Šenkvice", "ŠK": "ŠK 1952 Šenkvice", "RAČ": "KPH Rača",
  HOKO: "HOKO Zlaté Moravce", HKM: "HKM Nová Dubnica",
};

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
}

function TeamLogo({ logo, name, size = 28 }: { logo?: string; name: string; size?: number }) {
  if (logo?.startsWith("flag:")) {
    return (
      <div className="shrink-0 overflow-hidden rounded-full" style={{ width: size, height: size }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`https://flagcdn.com/w80/${logo.replace("flag:", "")}.png`} alt={name} width={size} height={size} style={{ width: size, height: size, objectFit: "cover" }} />
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
      <span className="font-black text-[#64748b]" style={{ fontSize: size * 0.3 }}>{name.split(" ").map(w => w[0]).join("").slice(0, 3)}</span>
    </div>
  );
}

function isThisWeekend(date: Date): boolean {
  const now = new Date();
  const day = now.getDay();
  const satStart = new Date(now);
  satStart.setDate(now.getDate() + (6 - day));
  satStart.setHours(0, 0, 0, 0);
  const sunEnd = new Date(satStart);
  sunEnd.setDate(satStart.getDate() + 1);
  sunEnd.setHours(23, 59, 59, 999);
  // If today is Sat or Sun, include today
  if (day === 6 || day === 0) {
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);
    return date >= todayStart && date <= sunEnd;
  }
  return date >= satStart && date <= sunEnd;
}

function matchesClub(m: Match, clubId: string): boolean {
  const clubName = CLUB_NAMES[clubId] || "";
  if (!clubName) return false;
  return m.home_team.includes(clubName) || m.away_team.includes(clubName) ||
    (m.home_short || "").includes(clubId) || (m.away_short || "").includes(clubId);
}

function matchesCategory(m: Match, prefs: any): boolean {
  const l = (m.league || "").toLowerCase();
  const isRep = (m.home_short === "SVK" || m.away_short === "SVK");
  const isMladez = l.includes("u18") || l.includes("u16") || l.includes("u14") || l.includes("u12");
  const isDospeli = !isMladez;

  if (prefs.notifVsetky) return true;
  if (prefs.notifReprezentacia && isRep) return true;
  if (prefs.notifMojKlub && prefs.club && prefs.club !== "none" && matchesClub(m, prefs.club)) return true;
  if (prefs.notifDospeli && isDospeli && !isRep) return true;
  if (prefs.notifMladez && isMladez) return true;
  return false;
}

export function PersonalizedSection({ matches }: { matches: Match[] }) {
  const [prefs, setPrefs] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const [weather, setWeather] = useState<{ temp: number; code: number } | null>(null);

  const fetchWeather = useCallback(async (city: string) => {
    const coords = CITIES[city];
    if (!coords) return;
    try {
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true`);
      const data = await res.json();
      if (data.current_weather) {
        setWeather({ temp: Math.round(data.current_weather.temperature), code: data.current_weather.weathercode });
      }
    } catch {}
  }, []);

  useEffect(() => {
    setMounted(true);
    const raw = localStorage.getItem("szph_user_prefs");
    if (raw) {
      try {
        const p = JSON.parse(raw);
        setPrefs(p);
        if (p.mesto) fetchWeather(p.mesto);
      } catch {}
    }
  }, [fetchWeather]);

  if (!mounted || !prefs || !prefs.name) return null;

  const meniny = getTodayMeniny();

  const clubLogo = prefs.club && prefs.club !== "none" ? CLUB_LOGOS[prefs.club] : null;
  const clubName = prefs.club && prefs.club !== "none" ? CLUB_NAMES[prefs.club] : null;

  const now = Date.now();
  const upcoming = matches
    .filter((m: any) => m.status === "scheduled" && new Date(m.date).getTime() > now)
    .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const hasKategoria = prefs.kategoria && prefs.kategoria !== "none";

  // Filter by kategoria
  const getMatchCategory = (m: Match) => {
    const l = (m.league || "").toLowerCase();
    if (l.includes("u18") || l.includes("u16")) return "U18";
    if (l.includes("u14")) return "U14";
    if (l.includes("u12")) return "U12";
    if (l.includes("ženy") || l.includes("women") || l.includes("girls")) return "zeny";
    return "muzi";
  };

  // This week matches (Mon-Sun)
  const thisWeekStart = getWeekStart(new Date());
  const thisWeekEnd = new Date(thisWeekStart);
  thisWeekEnd.setDate(thisWeekEnd.getDate() + 7);
  const thisWeekMatches = upcoming.filter(m => {
    const d = new Date(m.date);
    return d >= thisWeekStart && d < thisWeekEnd;
  });

  let showMatches: Match[] = [];
  let sectionTitle = "";

  if (hasKategoria) {
    // Show matches for selected kategoria + club
    const filtered = upcoming.filter(m => {
      const cat = getMatchCategory(m);
      if (cat !== prefs.kategoria) return false;
      if (prefs.club && prefs.club !== "none") {
        return matchesClub(m, prefs.club) || true; // show all in category, club matches first
      }
      return true;
    });
    // Sort club matches first
    if (prefs.club && prefs.club !== "none") {
      filtered.sort((a, b) => {
        const aClub = matchesClub(a, prefs.club) ? 0 : 1;
        const bClub = matchesClub(b, prefs.club) ? 0 : 1;
        return aClub - bClub;
      });
    }
    showMatches = filtered.slice(0, 5);
    const katLabel = prefs.kategoria === "muzi" ? "muži" : prefs.kategoria === "zeny" ? "ženy" : prefs.kategoria;
    sectionTitle = `Najbližšie zápasy - ${katLabel}`;
  } else {
    // No kategoria selected - show this week program
    showMatches = thisWeekMatches.slice(0, 5);
    sectionTitle = "Program na tento týždeň";
    if (showMatches.length === 0) {
      showMatches = upcoming.slice(0, 3);
      sectionTitle = "Najbližšie zápasy";
    }
  }

  return (
    <div className="md:hidden px-4 mb-4">
      {/* Greeting */}
      <div className="flex items-center gap-3 mb-4 mt-4">
        {clubLogo && (
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)", border: "1px solid rgba(1,45,116,0.06)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={clubLogo} alt="" className="w-6 h-6 object-contain" />
          </div>
        )}
        <div>
          <p className="text-[#051937]" style={{ fontSize: "16px" }}>Ahoj, <strong>{prefs.name}</strong>!</p>
          <p className="text-[#94a3b8]" style={{ fontSize: "11px" }}>
            {clubName && <span>{clubName}</span>}
            {clubName && meniny && <span> · </span>}
            {meniny && <span>Meniny má {meniny}</span>}
          </p>
        </div>
        {/* Weather + Meniny */}
        <div className="ml-auto flex items-center gap-3 mr-2">
          {weather && (
            <div className="flex items-center gap-1">
              <span style={{ fontSize: "16px" }}>{WEATHER_ICONS[weather.code] || "🌡️"}</span>
              <span className="font-bold text-[#051937]" style={{ fontSize: "13px" }}>{weather.temp}°</span>
            </div>
          )}
          {meniny && (
            <span className="text-[#94a3b8] hidden" style={{ fontSize: "10px" }}>
              {meniny}
            </span>
          )}
        </div>
        <Link href="/nastavenia" className="text-[#94a3b8] hover:text-[#051937] transition-colors shrink-0">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </Link>
      </div>

      {/* Matches */}
      {showMatches.length > 0 && (
        <div>
          <h3 className="font-garet font-bold italic text-[#051937] mb-3" style={{ fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.04em" }}>
            {sectionTitle}
          </h3>
          <div className="space-y-2">
            {showMatches.map((m, idx) => {
              const d = new Date(m.date);
              const time = m.match_time || d.toLocaleTimeString("sk-SK", { hour: "2-digit", minute: "2-digit" });
              const dayStr = d.toLocaleDateString("sk-SK", { day: "numeric", month: "long" });
              const isFirst = idx === 0;

              return (
                <Link key={m.id} href={`/zapasy/${m.id}`} className="flex items-center gap-3 bg-white px-4 py-3 active:bg-gray-50 transition-colors" style={{ borderRadius: "14px", border: "1px solid rgba(1,45,116,0.06)" }}>
                  {/* Home */}
                  <div className="flex flex-col items-center gap-1 flex-1 min-w-0">
                    <TeamLogo logo={m.home_logo} name={m.home_team} size={30} />
                    <span className="font-bold text-[#051937] truncate text-center w-full" style={{ fontSize: "11px" }}>{m.home_short || m.home_team}</span>
                  </div>

                  {/* Center info */}
                  <div className="flex flex-col items-center shrink-0 px-1">
                    {isFirst && <span className="font-black text-[#d00027] uppercase" style={{ fontSize: "7px", letterSpacing: "0.1em" }}>Najbližší zápas</span>}
                    {m.league && <span className="font-semibold text-[#012d74] text-center uppercase" style={{ fontSize: "7px", letterSpacing: "0.06em", maxWidth: 120 }}>{m.league}</span>}
                    <span className="font-bold text-[#051937]" style={{ fontSize: "13px" }}>{time}</span>
                    <span className="text-[#94a3b8] font-semibold" style={{ fontSize: "9px" }}>{dayStr}</span>
                    {m.venue && <span className="text-[#94a3b8] text-center" style={{ fontSize: "8px" }}>{m.venue}</span>}
                  </div>

                  {/* Away */}
                  <div className="flex flex-col items-center gap-1 flex-1 min-w-0">
                    <TeamLogo logo={m.away_logo} name={m.away_team} size={30} />
                    <span className="font-bold text-[#051937] truncate text-center w-full" style={{ fontSize: "11px" }}>{m.away_short || m.away_team}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
