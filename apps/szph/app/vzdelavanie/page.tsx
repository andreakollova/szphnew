import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Vzdelavanie | SzPH",
  description:
    "Vzdelavanie v polnom hokeji na Slovensku - trenerske licencie, rozhodcovske kurzy, seminare a certifikacie.",
};

export default function VzdelavaniePage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span
            className="font-bold uppercase text-white/40 mb-4 block"
            style={{ fontSize: "10px", letterSpacing: "0.14em" }}
          >
            Vzdelavanie
          </span>
          <h1
            className="font-garet font-bold italic text-white leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Vzdelavanie v polnom hokeji
          </h1>
          <p
            className="text-white/50 mt-3 max-w-xl"
            style={{ fontSize: "15px" }}
          >
            Komplexny system vzdelavania pre trenerov, rozhodcov a funkcionarov
            polneho hokeja na Slovensku.
          </p>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 pt-12">
        {/* Pre trenerov */}
        <section className="mb-14">
          <h2
            className="font-garet font-bold text-[#051937] mb-4"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
          >
            Pre trenerov
          </h2>
          <p className="text-[#333] leading-relaxed mb-4" style={{ fontSize: "15px" }}>
            Slovensky zvaz polneho hokeja ponuka komplexny system trenerských
            licencii v sulade s metodikou Medzinarodnej hokejovej federacie
            (FIH). Treneri maju moznost absolvovat kurzy od zakladnej urovne az
            po najvyssie medzinarodne certifikacie.
          </p>
          <p className="text-[#333] leading-relaxed mb-6" style={{ fontSize: "15px" }}>
            Vzdelavaci program zahrnuje teoreticku pripravu, prakticke
            workshopy, mentoringove programy a kontinualne vzdelavanie formou
            seminarov a konferencii.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/vzdelavanie/treneri"
              className="inline-block px-5 py-2.5 bg-[#051937] text-white text-sm font-semibold rounded-lg hover:bg-[#0a2a5c] transition-colors"
            >
              Trenerske vzdelavanie
            </Link>
            <Link
              href="/vzdelavanie/trenerske-kurzy"
              className="inline-block px-5 py-2.5 bg-[#051937] text-white text-sm font-semibold rounded-lg hover:bg-[#0a2a5c] transition-colors"
            >
              Trenerske kurzy
            </Link>
            <Link
              href="/vzdelavanie/licencie"
              className="inline-block px-5 py-2.5 border border-[#051937] text-[#051937] text-sm font-semibold rounded-lg hover:bg-[#051937] hover:text-white transition-colors"
            >
              Licencne podmienky
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
            Rozhodcovske vzdelavanie je klucovou sucastou rozvoja polneho hokeja
            na Slovensku. Ponukame pravidelne kurzy pre novych zaujemcov o
            rozhodovanie, ako aj pokrocile seminare pre aktivnych rozhodcov.
          </p>
          <p className="text-[#333] leading-relaxed mb-6" style={{ fontSize: "15px" }}>
            Nasi rozhodcovia maju moznost ziskat medzinarodne certifikacie a
            posobit na turnajoch organizovanych FIH a EHF.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/vzdelavanie/rozhodcovia"
              className="inline-block px-5 py-2.5 bg-[#051937] text-white text-sm font-semibold rounded-lg hover:bg-[#0a2a5c] transition-colors"
            >
              Rozhodcovske vzdelavanie
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
              Chcem byt rozhodca
            </Link>
          </div>
        </section>

        {/* Dalsie moznosti */}
        <section className="mb-14">
          <h2
            className="font-garet font-bold text-[#051937] mb-4"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
          >
            Dalsie moznosti vzdelavania
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
                Prehlad aktualnych kurzov a skoleni.
              </p>
            </Link>
            <Link
              href="/vzdelavanie/seminare"
              className="block p-5 bg-white rounded-xl border border-gray-200 hover:border-[#051937]/30 transition-colors"
            >
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                Seminare
              </h3>
              <p className="text-sm text-[#666]">
                Pravidelne vzdelavacie seminare a workshopy.
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
                Medzinarodne licencie a certifikacie FIH.
              </p>
            </Link>
            <Link
              href="/vzdelavanie/certifikacia"
              className="block p-5 bg-white rounded-xl border border-gray-200 hover:border-[#051937]/30 transition-colors"
            >
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                Certifikacia
              </h3>
              <p className="text-sm text-[#666]">
                Podmienky certifikacie a obnovenia licencii.
              </p>
            </Link>
          </div>
        </section>

        {/* Hokejova akademia */}
        <section className="p-6 bg-[#051937] rounded-xl text-white">
          <h2
            className="font-garet font-bold mb-3"
            style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)" }}
          >
            Hokejova akademia
          </h2>
          <p className="text-white/70 mb-4" style={{ fontSize: "15px" }}>
            Pozrite si nas projekt Hokejovej akademie, ktory prepaja vzdelavanie
            s praktickym rozvojom hracov a trenerov na Slovensku.
          </p>
          <Link
            href="/projekty/hokejova-akademia"
            className="inline-block px-5 py-2.5 bg-white text-[#051937] text-sm font-semibold rounded-lg hover:bg-white/90 transition-colors"
          >
            Viac o akademii
          </Link>
        </section>
      </div>
    </article>
  );
}
