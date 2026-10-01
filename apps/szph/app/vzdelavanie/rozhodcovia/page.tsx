import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rozhodcovske vzdelavanie | SzPH",
  description:
    "Vzdelavanie rozhodcov polneho hokeja na Slovensku - kurzy, seminare a medzinarodne certifikacie.",
};

export default function RozhodcoviaPage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span
            className="font-bold uppercase text-white mb-4 block"
            style={{ fontSize: "10px", letterSpacing: "0.14em" }}
          >
            Vzdelavanie
          </span>
          <h1
            className="font-garet font-bold italic text-white leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Rozhodcovske vzdelavanie
          </h1>
          <p
            className="text-white mt-3 max-w-xl"
            style={{ fontSize: "15px" }}
          >
            Priprava a rozvoj rozhodcov polneho hokeja na vsetkych urovniach.
          </p>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <section className="mb-12">
          <h2
            className="font-garet font-bold text-[#051937] mb-4"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
          >
            Program rozhodcovskeho vzdelavania
          </h2>
          <p className="text-[#333] leading-relaxed mb-4" style={{ fontSize: "15px" }}>
            Slovensky zvaz polneho hokeja zabezpecuje komplexne vzdelavanie
            rozhodcov od zakladnej urovne az po medzinarodne certifikacie.
            Program je navrhnuti tak, aby rozhodcovia ziskali hlboke znalosti
            pravidiel, rozvinuli svoje rozhodovanie a pripravili sa na posobenie
            na domacich aj medzinarodnych sutaziach.
          </p>
          <p className="text-[#333] leading-relaxed mb-6" style={{ fontSize: "15px" }}>
            Vzdelavanie zahrnuje teoreticku pripravu, prakticke cvicenia na
            ihrisku, video analyzy zapasov a pravidelne preskusanie vedomosti.
          </p>
        </section>

        <section className="mb-12">
          <h2
            className="font-garet font-bold text-[#051937] mb-4"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
          >
            Stupne rozhodcovskeho vzdelavania
          </h2>
          <div className="space-y-4 mb-8">
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                Zakladny kurz rozhodcu
              </h3>
              <p className="text-sm text-[#666]">
                Urceny pre novych zaujemcov o rozhodovanie. Zahrnuje pravidla
                polneho hokeja, signalizaciu, pozicovanie na ihrisku a zaklady
                riadenia hry.
              </p>
            </div>
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                Pokrocily seminar
              </h3>
              <p className="text-sm text-[#666]">
                Pre aktivnych rozhodcov s cielom prehlobit vedomosti a zlepsit
                prakticky vykon. Zameranie na zlozitejsie herné situacie,
                komunikaciu a manazment zapasu.
              </p>
            </div>
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                Medzinarodna certifikacia
              </h3>
              <p className="text-sm text-[#666]">
                Pre rozhodcov aspirujucich na medzinarodne posobenie na
                turnajoch EHF a FIH. Vyzaduje absolvovanie medzinarodnych
                skusok a splnenie fyzickych testov.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2
            className="font-garet font-bold text-[#051937] mb-4"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
          >
            Zaujima vas rozhodovanie?
          </h2>
          <p className="text-[#333] leading-relaxed mb-6" style={{ fontSize: "15px" }}>
            Ak mate zaujem stat sa rozhodcom polneho hokeja, pozrite si
            podrobnejsie informacie o tom, co vsetko rozhodovanie obnasa a ako
            zacat.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/zacni-hrat/rozhodca"
              className="inline-block px-5 py-2.5 bg-[#051937] text-white text-sm font-semibold rounded-lg hover:bg-[#0a2a5c] transition-colors"
            >
              Chcem byt rozhodca
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
              Kontaktovat nas
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}
