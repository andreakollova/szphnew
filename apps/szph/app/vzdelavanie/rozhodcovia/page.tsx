import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rozhodcovské vzdelávanie | SZPH",
  description:
    "Vzdelávanie rozhodcov pozemného hokeja na Slovensku - kurzy, semináre a medzinárodné certifikácie.",
};

export default function RozhodcoviaPage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[1100px] mx-auto">
          <Link href="/vzdelavanie" className="inline-flex items-center gap-2 font-bold text-white hover:text-white transition-colors mb-6" style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}><svg className="h-3 w-3 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>Späť</Link>
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
            Rozhodcovské vzdelávanie
          </h1>
          <p
            className="text-white mt-3 max-w-xl"
            style={{ fontSize: "15px" }}
          >
            Príprava a rozvoj rozhodcov pozemného hokeja na všetkých úrovniach.
          </p>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 pt-12">
        <section className="mb-12">
          <h2
            className="font-garet font-bold text-[#051937] mb-4"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
          >
            Program rozhodcovského vzdelávania
          </h2>
          <p className="text-[#333] leading-relaxed mb-4" style={{ fontSize: "15px" }}>
            Slovenský zväz pozemného hokeja zabezpečuje komplexné vzdelávanie
            rozhodcov od základnej úrovne až po medzinárodné certifikácie.
            Program je navrhnutý tak, aby rozhodcovia získali hlboké znalosti
            pravidiel, rozvinuli svoje rozhodovanie a pripravili sa na pôsobenie
            na domácich aj medzinárodných súťažiach.
          </p>
          <p className="text-[#333] leading-relaxed mb-6" style={{ fontSize: "15px" }}>
            Vzdelávanie zahŕňa teoretickú prípravu, praktické cvičenia na
            ihrisku, video analýzy zápasov a pravidelné preskúšanie vedomostí.
          </p>
        </section>

        <section className="mb-12">
          <h2
            className="font-garet font-bold text-[#051937] mb-4"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
          >
            Stupne rozhodcovského vzdelávania
          </h2>
          <div className="space-y-4 mb-8">
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                Základný kurz rozhodcu
              </h3>
              <p className="text-sm text-[#666]">
                Určený pre nových záujemcov o rozhodovanie. Zahŕňa pravidlá
                pozemného hokeja, signalizáciu, pozicovanie na ihrisku a základy
                riadenia hry.
              </p>
            </div>
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                Pokročilý seminár
              </h3>
              <p className="text-sm text-[#666]">
                Pre aktívnych rozhodcov s cieľom prehĺbiť vedomosti a zlepšiť
                praktický výkon. Zameranie na zložitejšie herné situácie,
                komunikáciu a manažment zápasu.
              </p>
            </div>
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                Medzinárodná certifikácia
              </h3>
              <p className="text-sm text-[#666]">
                Pre rozhodcov aspirujúcich na medzinárodné pôsobenie na
                turnajoch EHF a FIH. Vyžaduje absolvovanie medzinárodných
                skúšok a splnenie fyzických testov.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2
            className="font-garet font-bold text-[#051937] mb-4"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
          >
            Zaujíma vás rozhodovanie?
          </h2>
          <p className="text-[#333] leading-relaxed mb-6" style={{ fontSize: "15px" }}>
            Ak máte záujem stať sa rozhodcom pozemného hokeja, pozrite si
            podrobnejšie informácie o tom, čo všetko rozhodovanie obnáša a ako
            začať.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/zacni-hrat/rozhodca"
              className="inline-block px-5 py-2.5 bg-[#051937] text-white text-sm font-semibold rounded-lg hover:bg-[#0a2a5c] transition-colors"
            >
              Chcem byť rozhodca
            </Link>
            <Link
              href="/vzdelavanie/kurz-rozhodcov"
              className="inline-block px-5 py-2.5 border border-[#051937] text-[#051937] text-sm font-semibold rounded-lg hover:bg-[#051937] hover:text-white transition-colors"
            >
              Detail kurzu rozhodcov
            </Link>
            <Link
              href="/kontakt"
              className="inline-block px-5 py-2.5 border border-[#051937] text-[#051937] text-sm font-semibold rounded-lg hover:bg-[#051937] hover:text-white transition-colors"
            >
              Kontaktovať nás
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}
