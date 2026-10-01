import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FIH licencie | SzPH",
  description:
    "Medzinárodné licencie FIH pre trénerov a rozhodcov pozemného hokeja na Slovensku.",
};

export default function FihLicenciePage() {
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
            FIH licencie
          </h1>
          <p
            className="text-white mt-3 max-w-xl"
            style={{ fontSize: "15px" }}
          >
            Medzinárodné licencie a certifikácie vydávané Medzinárodnou
            hokejovou federáciou.
          </p>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <section className="mb-12">
          <h2
            className="font-garet font-bold text-[#051937] mb-4"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
          >
            Čo sú FIH licencie?
          </h2>
          <p className="text-[#333] leading-relaxed mb-4" style={{ fontSize: "15px" }}>
            Medzinárodná hokejová federácia (FIH - Federation Internationale de
            Hockey) definuje globálny štandard vzdelávania a licencovania pre
            trénerov aj rozhodcov pozemného hokeja. FIH licencie sú uznávané po
            celom svete a oprávňujú ich držiteľov pôsobiť na medzinárodných
            súťažiach.
          </p>
          <p className="text-[#333] leading-relaxed mb-6" style={{ fontSize: "15px" }}>
            SzPH ako člen FIH zabezpečuje prístup k medzinárodným licenčným
            programom pre slovenských trénerov a rozhodcov.
          </p>
        </section>

        <section className="mb-12">
          <h2
            className="font-garet font-bold text-[#051937] mb-4"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
          >
            FIH trénerské licencie
          </h2>
          <div className="space-y-4 mb-6">
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                FIH Level 1 - Community Coach
              </h3>
              <p className="text-sm text-[#666]">
                Medzinárodne uznávaná základná trénerská kvalifikácia.
                Ekvivalent slovenskej licencie C. Kurz je možné absolvovať na
                Slovensku v organizácii SzPH.
              </p>
            </div>
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                FIH Level 2 - Development Coach
              </h3>
              <p className="text-sm text-[#666]">
                Stredná úroveň medzinárodnej kvalifikácie. Ekvivalent slovenskej
                licencie B. Organizovaný na regionálnej úrovni v spolupráci s
                EHF.
              </p>
            </div>
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                FIH Level 3 a 4 - Performance / High Performance
              </h3>
              <p className="text-sm text-[#666]">
                Najvyššie medzinárodné kvalifikácie organizované priamo FIH.
                Určené pre trénerov národných tímov a elitných programov.
                Kandidáti sú nominovaní cez národné zväzy.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2
            className="font-garet font-bold text-[#051937] mb-4"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
          >
            FIH rozhodcovské licencie
          </h2>
          <div className="space-y-4 mb-6">
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                FIH Indoor/Outdoor Umpire
              </h3>
              <p className="text-sm text-[#666]">
                Medzinárodná rozhodcovská licencia oprávňujúca k rozhodovaniu na
                medzinárodných zápasoch a turnajoch. Kandidáti musia splniť
                fyzické testy, teoretické skúšky a mať odporúčanie národného
                zväzu.
              </p>
            </div>
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                FIH Technical Official
              </h3>
              <p className="text-sm text-[#666]">
                Licencia pre technických delegátov a ďalších oficiálov na
                medzinárodných súťažiach. Zahŕňa pozície ako Technical
                Delegate, Judge a Recorder.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2
            className="font-garet font-bold text-[#051937] mb-4"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
          >
            Ako získať FIH licenciu
          </h2>
          <p className="text-[#333] leading-relaxed mb-6" style={{ fontSize: "15px" }}>
            Cesta k medzinárodnej licencii vedie cez národný vzdelávací systém.
            Najprv je potrebné absolvovať príslušné kurzy na národnej úrovni a
            následne sa uchádzať o medzinárodnú certifikáciu prostredníctvom
            SzPH. Kontaktujte nás pre viac informácií o aktuálnych možnostiach.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/vzdelavanie/licencie"
              className="inline-block px-5 py-2.5 bg-[#051937] text-white text-sm font-semibold rounded-lg hover:bg-[#0a2a5c] transition-colors"
            >
              Národné licencie
            </Link>
            <Link
              href="/vzdelavanie/certifikacia"
              className="inline-block px-5 py-2.5 border border-[#051937] text-[#051937] text-sm font-semibold rounded-lg hover:bg-[#051937] hover:text-white transition-colors"
            >
              Podmienky certifikácie
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
