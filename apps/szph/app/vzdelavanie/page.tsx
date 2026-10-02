import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Vzdelávanie | SZPH",
  description:
    "Vzdelávanie v pozemnom hokeji na Slovensku - trénerské licencie, rozhodcovské kurzy, semináre a certifikácie.",
};

export default function VzdelavaniePage() {
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
          <div className="grid sm:grid-cols-3 gap-3 mb-6">
            {[
              { title: "Herné cvičenia", desc: "Cvičenia zamerané na hernú prípravu", image: "/images/hero-banner3.webp" },
              { title: "Technické cvičenia", desc: "Dribling, nahrávky, streľba", image: "/images/hero-banner7.webp" },
              { title: "Kondičná príprava", desc: "Rýchlosť, koordinácia, výdrž", image: "/images/hero-banner2.webp" },
            ].map((c) => (
              <Link key={c.title} href="/vzdelavanie/cvicenia" className="group block bg-white rounded-xl overflow-hidden" style={{ border: "1px solid rgba(1,45,116,0.06)" }}>
                <div className="relative h-32 overflow-hidden">
                  <img src={c.image} alt={c.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-[#051937]" style={{ fontSize: "13px" }}>{c.title}</h3>
                  <p className="text-[#94a3b8] mt-0.5" style={{ fontSize: "11px" }}>{c.desc}</p>
                </div>
              </Link>
            ))}
          </div>
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
