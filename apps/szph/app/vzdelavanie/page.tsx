import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@szph/db/client";
import { getPublishedExercises } from "@szph/db";

export const metadata: Metadata = {
  title: "Vzdelávanie | SZPH",
  description:
    "Vzdelávanie v pozemnom hokeji na Slovensku - trénerské licencie, rozhodcovské kurzy, semináre a certifikácie.",
};

export default async function VzdelavaniePage() {
  const cookieStore = await cookies();
  const supabase = createServerSupabaseClient(cookieStore);
  const exercises = await getPublishedExercises(supabase, { limit: 6 }).catch(() => []);
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span
            className="font-bold uppercase text-white mb-4 block"
            style={{ fontSize: "10px", letterSpacing: "0.14em" }}
          >
            Vzdelávanie
          </span>
          <h1
            className="font-garet font-bold italic text-white leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Vzdelávanie v pozemnom hokeji
          </h1>
          <p
            className="text-white mt-3 max-w-xl"
            style={{ fontSize: "15px" }}
          >
            Komplexný systém vzdelávania pre trénerov, rozhodcov a funkcionárov
            pozemného hokeja na Slovensku.
          </p>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 pt-12">
        {/* Pre trénerov */}
        <section className="mb-14">
          <h2
            className="font-garet font-bold text-[#051937] mb-4"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
          >
            Pre trénerov
          </h2>
          <p className="text-[#333] leading-relaxed mb-4" style={{ fontSize: "15px" }}>
            Slovenský zväz pozemného hokeja ponúka komplexný systém trénerských
            licencií v súlade s metodikou Medzinárodnej hokejovej federácie
            (FIH). Tréneri majú možnosť absolvovať kurzy od základnej úrovne až
            po najvyššie medzinárodné certifikácie.
          </p>
          <p className="text-[#333] leading-relaxed mb-6" style={{ fontSize: "15px" }}>
            Vzdelávací program zahŕňa teoretickú prípravu, praktické
            workshopy, mentoringové programy a kontinuálne vzdelávanie formou
            seminárov a konferencií.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/vzdelavanie/treneri"
              className="inline-block px-5 py-2.5 bg-[#051937] text-white text-sm font-semibold rounded-lg hover:bg-[#0a2a5c] transition-colors"
            >
              Trénerské vzdelávanie
            </Link>
            <Link
              href="/vzdelavanie/trenerske-kurzy"
              className="inline-block px-5 py-2.5 bg-[#051937] text-white text-sm font-semibold rounded-lg hover:bg-[#0a2a5c] transition-colors"
            >
              Trénerské kurzy
            </Link>
            <Link
              href="/vzdelavanie/licencie"
              className="inline-block px-5 py-2.5 border border-[#051937] text-[#051937] text-sm font-semibold rounded-lg hover:bg-[#051937] hover:text-white transition-colors"
            >
              Licenčné podmienky
            </Link>
          </div>
        </section>

        {/* Pre rozhodcov */}
        <section className="mb-14">
          <h2
            className="font-garet font-bold text-[#051937] mb-4"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
          >
            Pre rozhodcov
          </h2>
          <p className="text-[#333] leading-relaxed mb-4" style={{ fontSize: "15px" }}>
            Rozhodcovské vzdelávanie je kľúčovou súčasťou rozvoja pozemného hokeja
            na Slovensku. Ponúkame pravidelné kurzy pre nových záujemcov o
            rozhodovanie, ako aj pokročilé semináre pre aktívnych rozhodcov.
          </p>
          <p className="text-[#333] leading-relaxed mb-6" style={{ fontSize: "15px" }}>
            Naši rozhodcovia majú možnosť získať medzinárodné certifikácie a
            pôsobiť na turnajoch organizovaných FIH a EHF.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/vzdelavanie/rozhodcovia"
              className="inline-block px-5 py-2.5 bg-[#051937] text-white text-sm font-semibold rounded-lg hover:bg-[#0a2a5c] transition-colors"
            >
              Rozhodcovské vzdelávanie
            </Link>
            <Link
              href="/vzdelavanie/kurz-rozhodcov"
              className="inline-block px-5 py-2.5 bg-[#051937] text-white text-sm font-semibold rounded-lg hover:bg-[#0a2a5c] transition-colors"
            >
              Kurz rozhodcov
            </Link>
            <Link
              href="/zacni-hrat/rozhodca"
              className="inline-block px-5 py-2.5 border border-[#051937] text-[#051937] text-sm font-semibold rounded-lg hover:bg-[#051937] hover:text-white transition-colors"
            >
              Chcem byť rozhodca
            </Link>
          </div>
        </section>

        {/* Ďalšie možnosti */}
        <section className="mb-14">
          <h2
            className="font-garet font-bold text-[#051937] mb-4"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
          >
            Ďalšie možnosti vzdelávania
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href="/vzdelavanie/kurzy"
              className="block p-5 bg-white rounded-xl border border-gray-200 hover:border-[#051937]/30 transition-colors"
            >
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                Kurzy
              </h3>
              <p className="text-sm text-[#666]">
                Prehľad aktuálnych kurzov a školení.
              </p>
            </Link>
            <Link
              href="/vzdelavanie/seminare"
              className="block p-5 bg-white rounded-xl border border-gray-200 hover:border-[#051937]/30 transition-colors"
            >
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                Semináre
              </h3>
              <p className="text-sm text-[#666]">
                Pravidelné vzdelávacie semináre a workshopy.
              </p>
            </Link>
            <Link
              href="/vzdelavanie/fih-licencie"
              className="block p-5 bg-white rounded-xl border border-gray-200 hover:border-[#051937]/30 transition-colors"
            >
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                FIH licencie
              </h3>
              <p className="text-sm text-[#666]">
                Medzinárodné licencie a certifikácie FIH.
              </p>
            </Link>
            <Link
              href="/vzdelavanie/certifikacia"
              className="block p-5 bg-white rounded-xl border border-gray-200 hover:border-[#051937]/30 transition-colors"
            >
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                Certifikácia
              </h3>
              <p className="text-sm text-[#666]">
                Podmienky certifikácie a obnovenia licencií.
              </p>
            </Link>
          </div>
        </section>

        {/* Cvičenia */}
        <section className="mb-14">
          <h2
            className="font-garet font-bold text-[#051937] mb-4"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
          >
            Cvičenia a tréningové materiály
          </h2>
          <p className="text-[#333] leading-relaxed mb-6" style={{ fontSize: "15px" }}>
            Databáza cvičení pre trénerov s podrobnými popismi, obrázkami a video ukážkami. Filtrujte podľa veku, počtu hráčov alebo zamerania tréningu.
          </p>
          {exercises.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {exercises.slice(0, 6).map((ex: any) => (
                <Link
                  key={ex.id}
                  href={`/vzdelavanie/cvicenia/${ex.slug}`}
                  className="group block bg-white rounded-xl overflow-hidden transition-shadow hover:shadow-md"
                  style={{ border: "1px solid rgba(1,45,116,0.06)" }}
                >
                  {ex.diagram_url ? (
                    <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3", background: "#2d8a3e" }}>
                      <Image src={ex.diagram_url} alt={ex.title} fill className="object-contain transition-transform duration-300 group-hover:scale-105" sizes="300px" />
                    </div>
                  ) : (
                    <div className="w-full flex items-center justify-center" style={{ aspectRatio: "4/3", background: "#051937" }}>
                      <svg className="h-10 w-10 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
                      </svg>
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-bold text-[#051937] line-clamp-1" style={{ fontSize: "13px" }}>{ex.title}</h3>
                    {ex.goal && <p className="text-[#94a3b8] mt-0.5 line-clamp-1" style={{ fontSize: "11px" }}>{ex.goal}</p>}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {ex.players && (
                        <span className="rounded-full bg-[#051937]/5 px-2 py-0.5 text-[9px] font-semibold text-[#051937]">{ex.players} hracov</span>
                      )}
                      {ex.duration && (
                        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] font-semibold text-emerald-600">{ex.duration}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-3 gap-3 mb-6">
              {[
                { title: "Herne cvicenia", desc: "Cvicenia zamerane na hernu pripravu" },
                { title: "Technicke cvicenia", desc: "Dribling, nahravky, strelba" },
                { title: "Kondicna priprava", desc: "Rychlost, koordinacia, vydrz" },
              ].map((c) => (
                <Link key={c.title} href="/vzdelavanie/cvicenia" className="group block bg-white rounded-xl overflow-hidden p-5" style={{ border: "1px solid rgba(1,45,116,0.06)" }}>
                  <h3 className="font-bold text-[#051937]" style={{ fontSize: "13px" }}>{c.title}</h3>
                  <p className="text-[#94a3b8] mt-0.5" style={{ fontSize: "11px" }}>{c.desc}</p>
                </Link>
              ))}
            </div>
          )}
          <Link
            href="/vzdelavanie/cvicenia"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#051937] text-white text-sm font-semibold rounded-lg hover:bg-[#0a2a5c] transition-colors"
          >
            Zobraziť všetky cvičenia
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </section>

        {/* Hokejová akadémia */}
        <section className="p-6 bg-[#051937] rounded-xl text-white">
          <h2
            className="font-garet font-bold mb-3"
            style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)" }}
          >
            Hokejová akadémia
          </h2>
          <p className="text-white mb-4" style={{ fontSize: "15px" }}>
            Pozrite si náš projekt Hokejovej akadémie, ktorý prepája vzdelávanie
            s praktickým rozvojom hráčov a trénerov na Slovensku.
          </p>
          <Link
            href="/projekty/hokejova-akademia"
            className="inline-block px-5 py-2.5 bg-white text-[#051937] text-sm font-semibold rounded-lg hover:bg-white/90 transition-colors"
          >
            Viac o akadémii
          </Link>
        </section>
      </div>
    </article>
  );
}
