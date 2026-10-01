import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Trenerske kurzy | SzPH",
  description:
    "Trenerske kurzy polneho hokeja na Slovensku - od zakladnych po pokrocile FIH urovne.",
};

export default function TrenerskeKurzyPage() {
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
            Trenerske kurzy
          </h1>
          <p
            className="text-white/50 mt-3 max-w-xl"
            style={{ fontSize: "15px" }}
          >
            Komplexna ponuka trenerských kurzov od zakladnej urovne po
            medzinarodne certifikacie.
          </p>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <section className="mb-12">
          <h2
            className="font-garet font-bold text-[#051937] mb-4"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
          >
            Ponuka trenerských kurzov
          </h2>
          <p className="text-[#333] leading-relaxed mb-6" style={{ fontSize: "15px" }}>
            SzPH organizuje trenerske kurzy v sulade s metodikou Medzinarodnej
            hokejovej federacie (FIH). Kurzy su rozdelene do viacerych urovni,
            pricom kazda uroven pripravuje trenerov na pracu s inou cielovou
            skupinou a na roznej urovni sutazenia.
          </p>
        </section>

        <section className="mb-12">
          <h2
            className="font-garet font-bold text-[#051937] mb-4"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
          >
            Kurzy podla urovne
          </h2>
          <div className="space-y-4">
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2.5 py-0.5 bg-[#051937]/10 text-[#051937] text-xs font-bold rounded">
                  Level 1
                </span>
                <h3 className="font-garet font-bold text-[#051937]">
                  Zakladny trenersky kurz
                </h3>
              </div>
              <p className="text-sm text-[#666] mb-2">
                Urceny pre zacinajucich trenerov bez predchadzajuceho
                trenerskeho vzdelania. Zameranie na zaklady techniky, treningove
                metodiky pre deti a bezpecnost na ihrisku.
              </p>
              <p className="text-xs text-[#999]">
                Trvanie: 2 dni | Podmienka: ziadne
              </p>
            </div>
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2.5 py-0.5 bg-[#051937]/10 text-[#051937] text-xs font-bold rounded">
                  Level 2
                </span>
                <h3 className="font-garet font-bold text-[#051937]">
                  Rozvojovy trenersky kurz
                </h3>
              </div>
              <p className="text-sm text-[#666] mb-2">
                Pre trenerov s praxou, ktori chcu prehlobit svoje vedomosti.
                Taktika hry, planovanie treningovych cyklov, individualny rozvoj
                hracov a zaklady sportovej analyzy.
              </p>
              <p className="text-xs text-[#999]">
                Trvanie: 3 dni | Podmienka: Level 1 + min. 1 rok praxe
              </p>
            </div>
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2.5 py-0.5 bg-[#051937]/10 text-[#051937] text-xs font-bold rounded">
                  Level 3
                </span>
                <h3 className="font-garet font-bold text-[#051937]">
                  Vykonnostny trenersky kurz
                </h3>
              </div>
              <p className="text-sm text-[#666] mb-2">
                Pokrocily kurz pre trenerov sutaznych druzstiev. Pokrocila
                taktika, analyza hry, periodizacia treningu, psychologicka
                priprava a vedenie timu na vysokej urovni.
              </p>
              <p className="text-xs text-[#999]">
                Trvanie: 4-5 dni | Podmienka: Level 2 + min. 2 roky praxe
              </p>
            </div>
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2.5 py-0.5 bg-[#051937]/10 text-[#051937] text-xs font-bold rounded">
                  Level 4
                </span>
                <h3 className="font-garet font-bold text-[#051937]">
                  Elitny trenersky kurz
                </h3>
              </div>
              <p className="text-sm text-[#666] mb-2">
                Najvyssia uroven pre trenerov narodnych timov. Strategicke
                vedenie, sportova veda, medzinarodne standardy a priprava na
                vrcholove sutaze. Realizovany v spolupraci s FIH.
              </p>
              <p className="text-xs text-[#999]">
                Trvanie: individualne | Podmienka: Level 3 + nomninacia SzPH
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2
            className="font-garet font-bold text-[#051937] mb-4"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
          >
            Prihlasenie a terminy
          </h2>
          <p className="text-[#333] leading-relaxed mb-6" style={{ fontSize: "15px" }}>
            Terminy trenerských kurzov su zverejnovane na webovej stranke SzPH a
            na nasich socialnych sietach. Pre prihlasenie na kurz alebo
            doplnujuce informacie nas kontaktujte.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/zacni-hrat/trener"
              className="inline-block px-5 py-2.5 bg-[#051937] text-white text-sm font-semibold rounded-lg hover:bg-[#0a2a5c] transition-colors"
            >
              Chcem byt trener
            </Link>
            <Link
              href="/vzdelavanie/licencie"
              className="inline-block px-5 py-2.5 border border-[#051937] text-[#051937] text-sm font-semibold rounded-lg hover:bg-[#051937] hover:text-white transition-colors"
            >
              Licencne podmienky
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
