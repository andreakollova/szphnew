import type { Metadata } from "next";
import Link from "next/link";
import ContactFormSection from "@/app/components/ContactFormSection";

export const metadata: Metadata = {
  title: "Trénerské vzdelávanie | SZPH",
  description:
    "Vzdelávanie trénerov pozemného hokeja na Slovensku - FIH coaching úrovne, licencie a kurzy.",
};

export default function TreneriPage() {
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
            Trénerské vzdelávanie
          </h1>
          <p
            className="text-white mt-3 max-w-xl"
            style={{ fontSize: "15px" }}
          >
            Systém vzdelávania a licencovania trénerov pozemného hokeja v súlade s
            medzinárodnou metodikou FIH.
          </p>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 pt-12">
        <section className="mb-12">
          <h2
            className="font-garet font-bold text-[#051937] mb-4"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
          >
            FIH Coaching úrovne
          </h2>
          <p className="text-[#333] leading-relaxed mb-6" style={{ fontSize: "15px" }}>
            Medzinárodná hokejová federácia (FIH) definuje jednotný systém
            trénerských úrovní, ktorý SZPH implementuje na Slovensku. Každá
            úroveň pripravuje trénerov na prácu s inou cieľovou skupinou a na
            inej úrovni súťaženia.
          </p>

          <div className="space-y-4 mb-8">
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                Level 1 - Community Coach
              </h3>
              <p className="text-sm text-[#666]">
                Základná úroveň pre trénerov pracujúcich s deťmi a začiatočníkmi.
                Zameranie na základy techniky, herných zručností a bezpečnosti.
                Vhodné pre trénerov v školských krúžkoch a rekreačných kluboch.
              </p>
            </div>
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                Level 2 - Development Coach
              </h3>
              <p className="text-sm text-[#666]">
                Stredná úroveň pre trénerov mládežníckeho a juniorského hokeja.
                Rozšírené vedomosti o taktike, plánovaní tréningových cyklov a
                individuálnom rozvoji hráčov.
              </p>
            </div>
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                Level 3 - Performance Coach
              </h3>
              <p className="text-sm text-[#666]">
                Pokročilá úroveň pre trénerov súťažných družstiev. Hlboká analýza
                hry, periodizácia tréningu, príprava na medzinárodné súťaže a
                vedenie tímov na vysokej úrovni.
              </p>
            </div>
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                Level 4 - High Performance Coach
              </h3>
              <p className="text-sm text-[#666]">
                Najvyššia úroveň pre trénerov národných tímov a elitných
                klubových družstiev. Špecializácia na strategické vedenie,
                športovú vedu a medzinárodné štandardy.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2
            className="font-garet font-bold text-[#051937] mb-4"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
          >
            Ako sa stať trénerom
          </h2>
          <p className="text-[#333] leading-relaxed mb-4" style={{ fontSize: "15px" }}>
            Ak máte záujem o trénerskú kariéru v pozemnom hokeji, SZPH vám ponúka
            jasnú cestu od základných kurzov až po medzinárodné certifikácie.
            Prvý krok je absolvovanie základného trénerského kurzu Level 1.
          </p>
          <p className="text-[#333] leading-relaxed mb-6" style={{ fontSize: "15px" }}>
            Pre viac informácií o tom, ako začať, navštívte stránku pre
            záujemcov o trénerovanie alebo nás kontaktujte priamo.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/zacni-hrat/trener"
              className="inline-block px-5 py-2.5 border border-[#051937] text-[#051937] text-sm font-semibold hover:bg-[#051937] hover:text-white transition-colors"
              style={{ borderRadius: "50px" }}
            >
              Chcem byť tréner
            </Link>
            <Link
              href="/vzdelavanie/trenerske-kurzy"
              className="inline-block px-5 py-2.5 border border-[#051937] text-[#051937] text-sm font-semibold hover:bg-[#051937] hover:text-white transition-colors"
              style={{ borderRadius: "50px" }}
            >
              Prehľad kurzov
            </Link>
            <Link
              href="/vzdelavanie/fih-licencie"
              className="inline-block px-5 py-2.5 border border-[#051937] text-[#051937] text-sm font-semibold hover:bg-[#051937] hover:text-white transition-colors"
              style={{ borderRadius: "50px" }}
            >
              FIH licencie
            </Link>
          </div>
        </section>

        <ContactFormSection
          title="Máte záujem o trénerské vzdelávanie?"
          subtitle="Napíšte nám a radi vám poradíme s výberom kurzu."
          formType="treneri-vzdelavanie"
        />
      </div>
    </article>
  );
}
