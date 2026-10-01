import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Seminare | SzPH",
  description:
    "Vzdelavacie seminare pre trenerov a rozhodcov polneho hokeja na Slovensku.",
};

export default function SeminarePage() {
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
            Seminare
          </h1>
          <p
            className="text-white/50 mt-3 max-w-xl"
            style={{ fontSize: "15px" }}
          >
            Pravidelne vzdelavacie seminare pre odbornu verejnost v polnom
            hokeji.
          </p>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <section className="mb-12">
          <h2
            className="font-garet font-bold text-[#051937] mb-4"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
          >
            Vzdelavacie seminare SzPH
          </h2>
          <p className="text-[#333] leading-relaxed mb-4" style={{ fontSize: "15px" }}>
            Slovensky zvaz polneho hokeja organizuje pravidelne vzdelavacie
            seminare pre trenerov a rozhodcov. Seminare su nedielnou sucastou
            kontinualneho vzdelavania a podmienkou pre udrzanie platnosti
            trenerských a rozhodcovskych licencii.
          </p>
          <p className="text-[#333] leading-relaxed mb-6" style={{ fontSize: "15px" }}>
            Seminare sa konaju niekolkokrat do roka a su vedene skusenymi
            lektormi, casto aj zahranicnymi expertmi v oblasti polneho hokeja.
          </p>
        </section>

        <section className="mb-12">
          <h2
            className="font-garet font-bold text-[#051937] mb-4"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
          >
            Tematicke zameranie
          </h2>
          <div className="space-y-4">
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                Seminare pre trenerov
              </h3>
              <p className="text-sm text-[#666]">
                Nove trenerske metodiky, treningove plany, taktika hry, praca s
                mladezou, sportova psychologia a fyzicka priprava hracov polneho
                hokeja.
              </p>
            </div>
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                Seminare pre rozhodcov
              </h3>
              <p className="text-sm text-[#666]">
                Aktualizacie pravidiel, video analyzy spornych situacii,
                pozicovanie na ihrisku, komunikacia pocas zapasu a zvladanie
                tlakových situacii.
              </p>
            </div>
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                Kombinovane seminare
              </h3>
              <p className="text-sm text-[#666]">
                Spolocne seminare pre trenerov a rozhodcov zamerane na zlepsenie
                vzajomnej komunikacie a porozumenia pravidiel z oboch perspektiv.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2
            className="font-garet font-bold text-[#051937] mb-4"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
          >
            Kde sledovat terminy
          </h2>
          <p className="text-[#333] leading-relaxed mb-6" style={{ fontSize: "15px" }}>
            Terminy a miesta konania seminarov su zverejnovane na webovej stranke
            SzPH a na nasich profiloch na socialnych sietach. Ucast na
            seminaroch je obvykle podmienena predchadzajucou registraciou.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/vzdelavanie/kurzy"
              className="inline-block px-5 py-2.5 bg-[#051937] text-white text-sm font-semibold rounded-lg hover:bg-[#0a2a5c] transition-colors"
            >
              Prehlad kurzov
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
