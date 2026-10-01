import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Certifikacia | SzPH",
  description:
    "Podmienky certifikacie a obnovenia licencii pre trenerov a rozhodcov polneho hokeja.",
};

export default function CertifikaciaPage() {
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
            Certifikacia
          </h1>
          <p
            className="text-white/50 mt-3 max-w-xl"
            style={{ fontSize: "15px" }}
          >
            Podmienky a postup certifikacie pre trenerov a rozhodcov polneho
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
            Certifikacny proces
          </h2>
          <p className="text-[#333] leading-relaxed mb-4" style={{ fontSize: "15px" }}>
            Certifikacia je formalny proces, ktorym SzPH potvrdzuje, ze trener
            alebo rozhodca splna vsetky poziadavky na vykon svojej funkcie.
            Certifikacia zahrnuje overenie vzdelania, praktickych skusenosti a
            uspesne zlozenie predpisanych skusok.
          </p>
          <p className="text-[#333] leading-relaxed mb-6" style={{ fontSize: "15px" }}>
            Kazda certifikacia ma definovanu dobu platnosti. Po jej uplynuti je
            potrebne absolvovat proces recertifikacie.
          </p>
        </section>

        <section className="mb-12">
          <h2
            className="font-garet font-bold text-[#051937] mb-4"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
          >
            Podmienky prvej certifikacie
          </h2>
          <div className="space-y-4">
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                Pre trenerov
              </h3>
              <ul className="space-y-1.5 text-sm text-[#666]">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-[#051937] shrink-0" />
                  <span>Absolvovanie prislusneho trenerskeho kurzu (Level 1-4)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-[#051937] shrink-0" />
                  <span>Uspesne zlozenie teoretickej a praktickej skusky</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-[#051937] shrink-0" />
                  <span>Predlozenie dokladu o bezuhonnosti</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-[#051937] shrink-0" />
                  <span>Uhradenie certifikacneho poplatku</span>
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
                  <span>Uspesne zlozenie pisomneho testu z pravidiel</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-[#051937] shrink-0" />
                  <span>Prakticka skuska - rozhodovanie zapasu pod dohladom</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-[#051937] shrink-0" />
                  <span>Splnenie fyzickeho testu (pre medzinarodnu certifikaciu)</span>
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
            Recertifikacia
          </h2>
          <p className="text-[#333] leading-relaxed mb-4" style={{ fontSize: "15px" }}>
            Platnost certifikacie je obvykle 2-4 roky v zavislosti od typu
            licencie. Pre obnovenie certifikacie je potrebne:
          </p>
          <ul className="space-y-2 text-[#333] mb-6" style={{ fontSize: "15px" }}>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-[#051937] shrink-0" />
              <span>
                Dokladovat aktivnu cinnost pocas platnosti certifikacie
                (rozhodovanie/trenerovanie v danom obdobi)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-[#051937] shrink-0" />
              <span>
                Preukzat ucast na povinnych vzdelavacich seminaroch a
                workshopoch organizovanych SzPH
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-[#051937] shrink-0" />
              <span>
                V pripade medzinarodnych licencii absolvovat doplnujuce skusky
                podla poziadaviek FIH
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-[#051937] shrink-0" />
              <span>Uhradit poplatok za obnovenie certifikacie</span>
            </li>
          </ul>
        </section>

        <section className="p-6 bg-white rounded-xl border border-gray-200">
          <h3 className="font-garet font-bold text-[#051937] mb-2">
            Mate otazky k certifikacii?
          </h3>
          <p className="text-sm text-[#666] mb-4">
            Kontaktujte nas pre individualne poradenstvo ohladom certifikacneho
            procesu, poziadaviek a terminov.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/vzdelavanie/licencie"
              className="inline-block px-5 py-2.5 bg-[#051937] text-white text-sm font-semibold rounded-lg hover:bg-[#0a2a5c] transition-colors"
            >
              Prehlad licencii
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
