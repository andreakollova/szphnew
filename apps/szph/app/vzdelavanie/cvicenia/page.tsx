import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@szph/db/client";
import { getPublishedExercises } from "@szph/db";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cvičenia - Slovenský pozemnohokejový zväz",
  description: "Tréningové cvičenia pre pozemný hokej. Cvičenia na útok, obranu, nahrávky a techniku pre rôzne vekové kategórie.",
};

const CATEGORIES = [
  { id: "zaklady", title: "Základy a technika", desc: "Vedenie loptičky, prihrávky, spracovanie", color: "#012d74" },
  { id: "utok", title: "Útočné cvičenia", desc: "Príprava útoku, zakončenie, spolupráca", color: "#d80027" },
  { id: "obrana", title: "Obranné cvičenia", desc: "Press, bránenie, prechod do protiútoku", color: "#016fb4" },
  { id: "mladez", title: "Pre mládež", desc: "Cvičenia pre kategórie U12 - U18", color: "#051937" },
];

export default async function CviceniaPage() {
  const cookieStore = await cookies();
  const supabase = createServerSupabaseClient(cookieStore);
  const exercises = await getPublishedExercises(supabase, { limit: 50 }).catch(() => []);

  // Group exercises by category
  const attackExercises = exercises.filter((e: any) => e.category === "utok");
  const defenseExercises = exercises.filter((e: any) => e.category === "obrana");

  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      {/* Hero */}
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span className="font-bold uppercase text-white mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>
            Vzdelávanie
          </span>
          <h1 className="font-garet font-bold italic text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Tréningové cvičenia
          </h1>
          <p className="text-white mt-3 max-w-xl" style={{ fontSize: "15px" }}>
            Databáza cvičení pre trénerov pozemného hokeja. Cvičenia na útok, obranu, nahrávky a techniku pre rôzne vekové kategórie.
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-[900px] mx-auto px-6 pt-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
          {CATEGORIES.map((cat) => (
            <a key={cat.id} href={`#${cat.id}`} className="p-4 text-center transition-all hover:brightness-110" style={{ background: cat.color, borderRadius: "6px" }}>
              <h3 className="font-bold text-white" style={{ fontSize: "13px" }}>{cat.title}</h3>
              <p className="text-white/60 mt-1" style={{ fontSize: "10px" }}>{cat.desc}</p>
            </a>
          ))}
        </div>

        {/* Útočné cvičenia */}
        <section id="utok" className="mb-12 scroll-mt-32">
          <h2 className="font-bold text-[#051937] mb-6" style={{ fontSize: "24px" }}>Útočné cvičenia</h2>
          {attackExercises.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {attackExercises.map((ex: any) => (
                <Link
                  key={ex.id}
                  href={`/vzdelavanie/cvicenia/${ex.slug}`}
                  className="group rounded-lg overflow-hidden transition-shadow hover:shadow-lg"
                  style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}
                >
                  {ex.diagram_url && (
                    <div className="relative w-full aspect-[4/3] bg-[#2d8a3e] overflow-hidden">
                      <Image src={ex.diagram_url} alt={ex.title} fill className="object-contain group-hover:scale-105 transition-transform duration-300" />
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="font-bold text-[#051937] mb-2" style={{ fontSize: "17px" }}>{ex.title}</h3>
                    <p className="text-[#334155] text-sm mb-3 line-clamp-2">{ex.goal}</p>
                    <div className="flex flex-wrap gap-2">
                      {ex.players && <span className="inline-flex items-center gap-1 rounded-full bg-[#051937]/5 px-2.5 py-1 text-xs font-medium text-[#051937]">{ex.players} hráčov</span>}
                      {ex.age_group && <span className="inline-flex items-center gap-1 rounded-full bg-[#016fb4]/10 px-2.5 py-1 text-xs font-medium text-[#016fb4]">{ex.age_group}</span>}
                      {ex.duration && <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600">{ex.duration}</span>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-[#64748b]" style={{ fontSize: "14px" }}>Cvičenia sa pripravujú.</p>
          )}
        </section>

        {/* Obranné cvičenia */}
        <section id="obrana" className="mb-12 scroll-mt-32">
          <h2 className="font-bold text-[#051937] mb-6" style={{ fontSize: "24px" }}>Obranné cvičenia</h2>
          {defenseExercises.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {defenseExercises.map((ex: any) => (
                <Link
                  key={ex.id}
                  href={`/vzdelavanie/cvicenia/${ex.slug}`}
                  className="group rounded-lg overflow-hidden transition-shadow hover:shadow-lg"
                  style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}
                >
                  {ex.diagram_url && (
                    <div className="relative w-full aspect-[4/3] bg-[#2d8a3e] overflow-hidden">
                      <Image src={ex.diagram_url} alt={ex.title} fill className="object-contain group-hover:scale-105 transition-transform duration-300" />
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="font-bold text-[#051937] mb-2" style={{ fontSize: "17px" }}>{ex.title}</h3>
                    <p className="text-[#334155] text-sm mb-3 line-clamp-2">{ex.goal}</p>
                    <div className="flex flex-wrap gap-2">
                      {ex.players && <span className="inline-flex items-center gap-1 rounded-full bg-[#051937]/5 px-2.5 py-1 text-xs font-medium text-[#051937]">{ex.players} hráčov</span>}
                      {ex.age_group && <span className="inline-flex items-center gap-1 rounded-full bg-[#016fb4]/10 px-2.5 py-1 text-xs font-medium text-[#016fb4]">{ex.age_group}</span>}
                      {ex.duration && <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600">{ex.duration}</span>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-[#64748b]" style={{ fontSize: "14px" }}>Cvičenia sa pripravujú.</p>
          )}
        </section>

        {/* Základy */}
        <section id="zaklady" className="mb-12 scroll-mt-32">
          <h2 className="font-bold text-[#051937] mb-4" style={{ fontSize: "24px" }}>Základy a technika</h2>
          <p className="text-[#64748b] mb-6" style={{ fontSize: "14px" }}>Cvičenia zamerané na základné zručnosti — vedenie loptičky, prihrávky, spracovanie a streľbu.</p>
          <div className="p-6 text-center" style={{ background: "#fff", borderRadius: "6px", border: "1px solid rgba(1,45,116,0.06)" }}>
            <p className="text-[#64748b]" style={{ fontSize: "14px" }}>Ďalšie cvičenia budú pridané priebežne. Sledujte sekciu vzdelávania.</p>
          </div>
        </section>

        {/* Mládež */}
        <section id="mladez" className="mb-12 scroll-mt-32">
          <h2 className="font-bold text-[#051937] mb-4" style={{ fontSize: "24px" }}>Pre mládež</h2>
          <p className="text-[#64748b] mb-6" style={{ fontSize: "14px" }}>Cvičenia prispôsobené pre kategórie U12 - U18, s dôrazom na hru a rozvoj základných zručností.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {exercises.filter((e: any) => e.age_group && (e.age_group.includes("9") || e.age_group.includes("12") || e.age_group.includes("13"))).map((ex: any) => (
              <Link
                key={ex.id}
                href={`/vzdelavanie/cvicenia/${ex.slug}`}
                className="group rounded-lg overflow-hidden transition-shadow hover:shadow-lg"
                style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}
              >
                {ex.diagram_url && (
                  <div className="relative w-full aspect-[4/3] bg-[#2d8a3e] overflow-hidden">
                    <Image src={ex.diagram_url} alt={ex.title} fill className="object-contain group-hover:scale-105 transition-transform duration-300" />
                  </div>
                )}
                <div className="p-5">
                  <h3 className="font-bold text-[#051937] mb-2" style={{ fontSize: "17px" }}>{ex.title}</h3>
                  <p className="text-[#334155] text-sm mb-3 line-clamp-2">{ex.goal}</p>
                  <div className="flex flex-wrap gap-2">
                    {ex.age_group && <span className="inline-flex items-center gap-1 rounded-full bg-[#016fb4]/10 px-2.5 py-1 text-xs font-medium text-[#016fb4]">{ex.age_group}</span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="p-6 text-center" style={{ background: "#fff", borderRadius: "6px", border: "1px solid rgba(1,45,116,0.06)" }}>
          <p className="font-bold text-[#051937] mb-2" style={{ fontSize: "16px" }}>Máte návrh na cvičenie?</p>
          <p className="text-[#64748b] mb-4" style={{ fontSize: "13px" }}>Pošlite nám ho a radi ho pridáme do databázy.</p>
          <Link href="/kontakt" className="inline-flex items-center gap-2 font-bold text-white transition-all hover:brightness-110" style={{ background: "#012d74", borderRadius: "20px", padding: "10px 24px", fontSize: "12px" }}>
            Kontaktovať SZPH
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
