import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Certifikácia | SzPH",
  description:
    "Podmienky certifikácie a obnovenia licencií pre trénerov a rozhodcov pozemného hokeja.",
};

export default function CertifikaciaPage() {
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
            Certifikácia
          </h1>
          <p
            className="text-white mt-3 max-w-xl"
            style={{ fontSize: "15px" }}
          >
            Podmienky a postup certifikácie pre trénerov a rozhodcov pozemného
            hokeja.
          </p>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <section className="mb-12">
          <h2
            className="font-garet font-bold text-[#051937] mb-4"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
          >
            Certifikačný proces
          </h2>
          <p className="text-[#333] leading-relaxed mb-4" style={{ fontSize: "15px" }}>
            Certifikácia je formálny proces, ktorým SzPH potvrdzuje, že tréner
            alebo rozhodca spĺňa všetky požiadavky na výkon svojej funkcie.
            Certifikácia zahŕňa overenie vzdelania, praktických skúseností a
            úspešné zloženie predpísaných skúšok.
          </p>
          <p className="text-[#333] leading-relaxed mb-6" style={{ fontSize: "15px" }}>
            Každá certifikácia má definovanú dobu platnosti. Po jej uplynutí je
            potrebné absolvovať proces recertifikácie.
          </p>
        </section>

        <section className="mb-12">
          <h2
            className="font-garet font-bold text-[#051937] mb-4"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
          >
            Podmienky prvej certifikácie
          </h2>
          <div className="space-y-4">
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                Pre trénerov
              </h3>
              <ul className="space-y-1.5 text-sm text-[#666]">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-[#051937] shrink-0" />
                  <span>Absolvovanie príslušného trénerského kurzu (Level 1-4)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-[#051937] shrink-0" />
                  <span>Úspešné zloženie teoretickej a praktickej skúšky</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-[#051937] shrink-0" />
                  <span>Predloženie dokladu o bezúhonnosti</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-[#051937] shrink-0" />
                  <span>Uhradenie certifikačného poplatku</span>
                </li>
              </ul>
            </div>
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                Pre rozhodcov
              </h3>
              <ul className="space-y-1.5 text-sm text-[#666]">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-[#051937] shrink-0" />
                  <span>Absolvovanie kurzu rozhodcov</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-[#051937] shrink-0" />
                  <span>Úspešné zloženie písomného testu z pravidiel</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-[#051937] shrink-0" />
                  <span>Praktická skúška - rozhodovanie zápasu pod dohľadom</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-[#051937] shrink-0" />
                  <span>Splnenie fyzického testu (pre medzinárodnú certifikáciu)</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2
            className="font-garet font-bold text-[#051937] mb-4"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
          >
            Recertifikácia
          </h2>
          <p className="text-[#333] leading-relaxed mb-4" style={{ fontSize: "15px" }}>
            Platnosť certifikácie je obvykle 2-4 roky v závislosti od typu
            licencie. Pre obnovenie certifikácie je potrebné:
          </p>
          <ul className="space-y-2 text-[#333] mb-6" style={{ fontSize: "15px" }}>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-[#051937] shrink-0" />
              <span>
                Dokladovať aktívnu činnosť počas platnosti certifikácie
                (rozhodovanie/trénerovanie v danom období)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-[#051937] shrink-0" />
              <span>
                Preukázať účasť na povinných vzdelávacích seminároch a
                workshopoch organizovaných SzPH
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-[#051937] shrink-0" />
              <span>
                V prípade medzinárodných licencií absolvovať doplňujúce skúšky
                podľa požiadaviek FIH
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-[#051937] shrink-0" />
              <span>Uhradiť poplatok za obnovenie certifikácie</span>
            </li>
          </ul>
        </section>

        <section className="p-6 bg-white rounded-xl border border-gray-200">
          <h3 className="font-garet font-bold text-[#051937] mb-2">
            Máte otázky k certifikácii?
          </h3>
          <p className="text-sm text-[#666] mb-4">
            Kontaktujte nás pre individuálne poradenstvo ohľadom certifikačného
            procesu, požiadaviek a termínov.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/vzdelavanie/licencie"
              className="inline-block px-5 py-2.5 bg-[#051937] text-white text-sm font-semibold rounded-lg hover:bg-[#0a2a5c] transition-colors"
            >
              Prehľad licencií
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
