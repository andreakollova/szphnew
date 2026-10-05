import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kurzy | SZPH",
  description:
    "Prehľad kurzov a školení v pozemnom hokeji na Slovensku - trénerské, rozhodcovské a špecializované kurzy.",
};

export default function KurzyPage() {
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
            Kurzy
          </h1>
          <p
            className="text-white mt-3 max-w-xl"
            style={{ fontSize: "15px" }}
          >
            Aktuálne kurzy a školenia organizované Slovenským zväzom pozemného
            hokeja.
          </p>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 pt-12">
        <section className="mb-12">
          <h2
            className="font-garet font-bold text-[#051937] mb-4"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
          >
            Ponuka kurzov
          </h2>
          <p className="text-[#333] leading-relaxed mb-4" style={{ fontSize: "15px" }}>
            SZPH pravidelne organizuje vzdelávacie kurzy pre všetky zainteresované
            skupiny v pozemnom hokeji. Kurzy sú určené pre trénerov, rozhodcov,
            funkcionárov aj ďalších záujemcov o rozvoj tohto športu na Slovensku.
          </p>
          <p className="text-[#333] leading-relaxed mb-6" style={{ fontSize: "15px" }}>
            Aktuálne termíny kurzov sú zverejňované na webovej stránke SZPH a na
            našich profiloch na sociálnych sieťach. Sledujte nás, aby vám
            neunikli žiadne novinky a prihláste sa včas - kapacita kurzov je
            obmedzená.
          </p>
        </section>

        <section className="mb-12">
          <h2
            className="font-garet font-bold text-[#051937] mb-4"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
          >
            Typy kurzov
          </h2>
          <div className="space-y-4">
            <Link
              href="/vzdelavanie/trenerske-kurzy"
              className="block p-5 bg-white rounded-xl border border-gray-200 hover:border-[#051937]/30 transition-colors"
            >
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                Trénerské kurzy
              </h3>
              <p className="text-sm text-[#666]">
                Kurzy pre záujemcov o trénerovanie pozemného hokeja na rôznych
                úrovniach - od základných po pokročilé FIH licencie.
              </p>
            </Link>
            <Link
              href="/vzdelavanie/kurz-rozhodcov"
              className="block p-5 bg-white rounded-xl border border-gray-200 hover:border-[#051937]/30 transition-colors"
            >
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                Rozhodcovské kurzy
              </h3>
              <p className="text-sm text-[#666]">
                Základné a pokročilé kurzy pre rozhodcov. Teoretická a praktická
                príprava na rozhodovanie zápasov pozemného hokeja.
              </p>
            </Link>
            <Link
              href="/vzdelavanie/seminare"
              className="block p-5 bg-white rounded-xl border border-gray-200 hover:border-[#051937]/30 transition-colors"
            >
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                Semináre a workshopy
              </h3>
              <p className="text-sm text-[#666]">
                Krátkodobá forma vzdelávania zameraná na špecifické témy, novinky
                v pravidlách a metodické trendy.
              </p>
            </Link>
          </div>
        </section>

        <section className="p-6 bg-white rounded-xl border border-gray-200">
          <h3 className="font-garet font-bold text-[#051937] mb-2">
            Prihlásenie na kurzy
          </h3>
          <p className="text-sm text-[#666] mb-4">
            Informácie o prihlasovaní, termínoch a podmienkach účasti na
            kurzoch získate na našej kontaktnej stránke alebo sledovaním našich
            sociálnych sietí.
          </p>
          <Link
            href="/kontakt"
            className="inline-block px-5 py-2.5 bg-[#051937] text-white text-sm font-semibold rounded-lg hover:bg-[#0a2a5c] transition-colors"
          >
            Kontaktovať nás
          </Link>
        </section>
      </div>
    </article>
  );
}
