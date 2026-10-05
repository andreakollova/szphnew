import type { Metadata } from "next";
import Link from "next/link";
import ContactFormSection from "@/app/components/ContactFormSection";

export const metadata: Metadata = {
  title: "Trénerské kurzy | SZPH",
  description:
    "Trénerské kurzy pozemného hokeja na Slovensku - od základných po pokročilé FIH úrovne.",
};

export default function TrenerskeKurzyPage() {
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
            Trénerské kurzy
          </h1>
          <p
            className="text-white mt-3 max-w-xl"
            style={{ fontSize: "15px" }}
          >
            Komplexná ponuka trénerských kurzov od základnej úrovne po
            medzinárodné certifikácie.
          </p>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 pt-12">
        <section className="mb-12">
          <h2
            className="font-garet font-bold text-[#051937] mb-4"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
          >
            Ponuka trénerských kurzov
          </h2>
          <p className="text-[#333] leading-relaxed mb-6" style={{ fontSize: "15px" }}>
            SZPH organizuje trénerské kurzy v súlade s metodikou Medzinárodnej
            hokejovej federácie (FIH). Kurzy sú rozdelené do viacerých úrovní,
            pričom každá úroveň pripravuje trénerov na prácu s inou cieľovou
            skupinou a na rôznej úrovni súťaženia.
          </p>
        </section>

        <section className="mb-12">
          <h2
            className="font-garet font-bold text-[#051937] mb-4"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
          >
            Kurzy podľa úrovne
          </h2>
          <div className="space-y-4">
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2.5 py-0.5 bg-[#051937]/10 text-[#051937] text-xs font-bold rounded">
                  Level 1
                </span>
                <h3 className="font-garet font-bold text-[#051937]">
                  Základný trénerský kurz
                </h3>
              </div>
              <p className="text-sm text-[#666] mb-2">
                Určený pre začínajúcich trénerov bez predchádzajúceho
                trénerského vzdelania. Zameranie na základy techniky, tréningové
                metodiky pre deti a bezpečnosť na ihrisku.
              </p>
              <p className="text-xs text-[#999]">
                Trvanie: 2 dni | Podmienka: žiadne
              </p>
            </div>
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2.5 py-0.5 bg-[#051937]/10 text-[#051937] text-xs font-bold rounded">
                  Level 2
                </span>
                <h3 className="font-garet font-bold text-[#051937]">
                  Rozvojový trénerský kurz
                </h3>
              </div>
              <p className="text-sm text-[#666] mb-2">
                Pre trénerov s praxou, ktorí chcú prehĺbiť svoje vedomosti.
                Taktika hry, plánovanie tréningových cyklov, individuálny rozvoj
                hráčov a základy športovej analýzy.
              </p>
              <p className="text-xs text-[#999]">
                Trvanie: 3 dni | Podmienka: Level 1 + min. 1 rok praxe
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2
            className="font-garet font-bold text-[#051937] mb-4"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
          >
            Prihlásenie a termíny
          </h2>
          <p className="text-[#333] leading-relaxed mb-6" style={{ fontSize: "15px" }}>
            Termíny trénerských kurzov sú zverejňované na webovej stránke SZPH a
            na našich sociálnych sieťach. Pre prihlásenie na kurz alebo
            doplňujúce informácie nás kontaktujte.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/zacni-hrat/trener"
              className="inline-block px-5 py-2.5 bg-[#051937] text-white text-sm font-semibold rounded-lg hover:bg-[#0a2a5c] transition-colors"
            >
              Chcem byť tréner
            </Link>
            <Link
              href="/vzdelavanie/licencie"
              className="inline-block px-5 py-2.5 border border-[#051937] text-[#051937] text-sm font-semibold rounded-lg hover:bg-[#051937] hover:text-white transition-colors"
            >
              Licenčné podmienky
            </Link>
            <Link
              href="/kontakt"
              className="inline-block px-5 py-2.5 border border-[#051937] text-[#051937] text-sm font-semibold rounded-lg hover:bg-[#051937] hover:text-white transition-colors"
            >
              Kontaktovať nás
            </Link>
          </div>
        </section>

        <ContactFormSection
          title="Záujem o trénerský kurz"
          subtitle="Vyplňte formulár a dáme vám vedieť termíny."
          formType="trenersky-kurz"
        />
      </div>
    </article>
  );
}
