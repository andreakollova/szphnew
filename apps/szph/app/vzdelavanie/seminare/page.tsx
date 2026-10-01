import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Semináre | SzPH",
  description:
    "Vzdelávacie semináre pre trénerov a rozhodcov pozemného hokeja na Slovensku.",
};

export default function SeminarePage() {
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
            Semináre
          </h1>
          <p
            className="text-white mt-3 max-w-xl"
            style={{ fontSize: "15px" }}
          >
            Pravidelné vzdelávacie semináre pre odbornú verejnosť v pozemnom
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
            Vzdelávacie semináre SzPH
          </h2>
          <p className="text-[#333] leading-relaxed mb-4" style={{ fontSize: "15px" }}>
            Slovenský zväz pozemného hokeja organizuje pravidelné vzdelávacie
            semináre pre trénerov a rozhodcov. Semináre sú neoddeliteľnou súčasťou
            kontinuálneho vzdelávania a podmienkou pre udržanie platnosti
            trénerských a rozhodcovských licencií.
          </p>
          <p className="text-[#333] leading-relaxed mb-6" style={{ fontSize: "15px" }}>
            Semináre sa konajú niekoľkokrát do roka a sú vedené skúsenými
            lektormi, často aj zahraničnými expertmi v oblasti pozemného hokeja.
          </p>
        </section>

        <section className="mb-12">
          <h2
            className="font-garet font-bold text-[#051937] mb-4"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
          >
            Tematické zameranie
          </h2>
          <div className="space-y-4">
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                Semináre pre trénerov
              </h3>
              <p className="text-sm text-[#666]">
                Nové trénerské metodiky, tréningové plány, taktika hry, práca s
                mládežou, športová psychológia a fyzická príprava hráčov pozemného
                hokeja.
              </p>
            </div>
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                Semináre pre rozhodcov
              </h3>
              <p className="text-sm text-[#666]">
                Aktualizácie pravidiel, video analýzy sporných situácií,
                pozicovanie na ihrisku, komunikácia počas zápasu a zvládanie
                tlakových situácií.
              </p>
            </div>
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                Kombinované semináre
              </h3>
              <p className="text-sm text-[#666]">
                Spoločné semináre pre trénerov a rozhodcov zamerané na zlepšenie
                vzájomnej komunikácie a porozumenia pravidiel z oboch perspektív.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2
            className="font-garet font-bold text-[#051937] mb-4"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
          >
            Kde sledovať termíny
          </h2>
          <p className="text-[#333] leading-relaxed mb-6" style={{ fontSize: "15px" }}>
            Termíny a miesta konania seminárov sú zverejňované na webovej stránke
            SzPH a na našich profiloch na sociálnych sieťach. Účasť na
            seminároch je obvykle podmienená predchádzajúcou registráciou.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/vzdelavanie/kurzy"
              className="inline-block px-5 py-2.5 bg-[#051937] text-white text-sm font-semibold rounded-lg hover:bg-[#0a2a5c] transition-colors"
            >
              Prehľad kurzov
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
