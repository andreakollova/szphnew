import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Trenerske vzdelavanie | SzPH",
  description:
    "Vzdelavanie trenerov polneho hokeja na Slovensku - FIH coaching urovne, licencie a kurzy.",
};

export default function TreneriPage() {
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
            Trenerske vzdelavanie
          </h1>
          <p
            className="text-white mt-3 max-w-xl"
            style={{ fontSize: "15px" }}
          >
            System vzdelavania a licencovania trenerov polneho hokeja v sulade s
            medzinarodnou metodikou FIH.
          </p>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <section className="mb-12">
          <h2
            className="font-garet font-bold text-[#051937] mb-4"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
          >
            FIH Coaching urovne
          </h2>
          <p className="text-[#333] leading-relaxed mb-6" style={{ fontSize: "15px" }}>
            Medzinarodna hokejova federacia (FIH) definuje jednotny system
            trenerských urovni, ktory SzPH implementuje na Slovensku. Kazda
            uroven pripravuje trenerov na pracu s inou cielovou skupinou a na
            inej urovni sutazenia.
          </p>

          <div className="space-y-4 mb-8">
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                Level 1 - Community Coach
              </h3>
              <p className="text-sm text-[#666]">
                Zakladna uroven pre trenerov pracujucich s detmi a zaciatocnikmi.
                Zameranie na zaklady techniky, hernych zrucnosti a bezpecnosti.
                Vhodne pre trenerov v skolskych kruzkoch a rekreacnych kluboch.
              </p>
            </div>
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                Level 2 - Development Coach
              </h3>
              <p className="text-sm text-[#666]">
                Stredna uroven pre trenerov mladeznickeho a juniorského hokeja.
                Rozsirene vedomosti o taktike, planovani treningovych cyklov a
                individualnom rozvoji hracov.
              </p>
            </div>
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                Level 3 - Performance Coach
              </h3>
              <p className="text-sm text-[#666]">
                Pokrocila uroven pre trenerov sutaznych druzstiev. Hlboka analyza
                hry, periodizacia treningu, priprava na medzinarodne sutaze a
                vedenie timov na vysokej urovni.
              </p>
            </div>
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                Level 4 - High Performance Coach
              </h3>
              <p className="text-sm text-[#666]">
                Najvyssia uroven pre trenerov narodnych timov a elitnych
                klubových druzstiev. Specializacia na strategicke vedenie,
                sportovu vedu a medzinarodne standardy.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2
            className="font-garet font-bold text-[#051937] mb-4"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
          >
            Ako sa stat trenerom
          </h2>
          <p className="text-[#333] leading-relaxed mb-4" style={{ fontSize: "15px" }}>
            Ak mate zaujem o trenersku karieru v polnom hokeji, SzPH vam ponuka
            jasnu cestu od zakladnych kurzov az po medzinarodne certifikacie.
            Prvy krok je absolvovanie zakladneho trenerskeho kurzu Level 1.
          </p>
          <p className="text-[#333] leading-relaxed mb-6" style={{ fontSize: "15px" }}>
            Pre viac informacii o tom, ako zacat, navstivte stranku pre
            zaujemcov o trenerovanie alebo nas kontaktujte priamo.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/zacni-hrat/trener"
              className="inline-block px-5 py-2.5 bg-[#051937] text-white text-sm font-semibold rounded-lg hover:bg-[#0a2a5c] transition-colors"
            >
              Chcem byt trener
            </Link>
            <Link
              href="/vzdelavanie/trenerske-kurzy"
              className="inline-block px-5 py-2.5 border border-[#051937] text-[#051937] text-sm font-semibold rounded-lg hover:bg-[#051937] hover:text-white transition-colors"
            >
              Prehlad kurzov
            </Link>
            <Link
              href="/vzdelavanie/fih-licencie"
              className="inline-block px-5 py-2.5 border border-[#051937] text-[#051937] text-sm font-semibold rounded-lg hover:bg-[#051937] hover:text-white transition-colors"
            >
              FIH licencie
            </Link>
          </div>
        </section>

        <section className="p-6 bg-white rounded-xl border border-gray-200">
          <h3 className="font-garet font-bold text-[#051937] mb-2">
            Potrebujete viac informacii?
          </h3>
          <p className="text-sm text-[#666] mb-4">
            Kontaktujte nas pre individualne poradenstvo ohladom trenerskeho
            vzdelavania a licencii.
          </p>
          <Link
            href="/kontakt"
            className="inline-block px-5 py-2.5 bg-[#051937] text-white text-sm font-semibold rounded-lg hover:bg-[#0a2a5c] transition-colors"
          >
            Kontaktovat nas
          </Link>
        </section>
      </div>
    </article>
  );
}
