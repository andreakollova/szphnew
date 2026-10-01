import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Licencie | SzPH",
  description:
    "Licencne poziadavky a podmienky pre trenerov a rozhodcov polneho hokeja na Slovensku.",
};

export default function LicenciePage() {
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
            Licencie
          </h1>
          <p
            className="text-white mt-3 max-w-xl"
            style={{ fontSize: "15px" }}
          >
            Poziadavky a podmienky pre ziskanie a udrzanie licencii v polnom
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
            System licencii SzPH
          </h2>
          <p className="text-[#333] leading-relaxed mb-4" style={{ fontSize: "15px" }}>
            Slovensky zvaz polneho hokeja spravuje system licencii pre trenerov
            a rozhodcov v sulade s medzinarodnou metodikou FIH. Licencia je
            podmienkou pre oficialnu cinnost na sutaziach organizovanych SzPH.
          </p>
          <p className="text-[#333] leading-relaxed mb-6" style={{ fontSize: "15px" }}>
            Kazda licencia ma definovanu dobu platnosti a podmienky pre jej
            obnovenie, vratane povinnej ucasti na vzdelavacich seminaroch.
          </p>
        </section>

        <section className="mb-12">
          <h2
            className="font-garet font-bold text-[#051937] mb-4"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
          >
            Trenerske licencie
          </h2>
          <div className="space-y-4 mb-6">
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                Licencia C - zakladna
              </h3>
              <p className="text-sm text-[#666]">
                Opravnuje k vedeniu treningov a zapasov na rekreacnej a
                zakladnej sutaznej urovni. Podmienka: absolvovanie kurzu Level 1
                a zlozenie skusky.
              </p>
            </div>
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                Licencia B - pokrocila
              </h3>
              <p className="text-sm text-[#666]">
                Opravnuje k vedeniu druzstiev na vyssej sutaznej urovni.
                Podmienka: platna licencia C, minimalne 2 roky praxe a
                absolvovanie kurzu Level 2.
              </p>
            </div>
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                Licencia A - najvyssia
              </h3>
              <p className="text-sm text-[#666]">
                Opravnuje k vedeniu reprezentacnych druzstiev a elitnych
                klubovych timov. Podmienka: platna licencia B, minimalne 4 roky
                praxe a absolvovanie kurzu Level 3 alebo vyssia.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2
            className="font-garet font-bold text-[#051937] mb-4"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
          >
            Rozhodcovske licencie
          </h2>
          <div className="space-y-4 mb-6">
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                Narodna licencia
              </h3>
              <p className="text-sm text-[#666]">
                Opravnuje k rozhodovaniu zapasov na urovni slovenskej ligy.
                Podmienka: absolvovanie zakladneho kurzu rozhodcov a zlozenie
                pisomnej a praktickej skusky.
              </p>
            </div>
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                Medzinarodna licencia
              </h3>
              <p className="text-sm text-[#666]">
                Opravnuje k rozhodovaniu medzinarodnych zapasov a turnajov.
                Podmienka: platna narodna licencia, absolvovanie medzinarodnych
                skusok a splnenie fyzickych testov FIH.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2
            className="font-garet font-bold text-[#051937] mb-4"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
          >
            Obnovenie licencie
          </h2>
          <p className="text-[#333] leading-relaxed mb-4" style={{ fontSize: "15px" }}>
            Licencie maju obmedenu platnost a vyzaduju pravidelne obnovenie.
            Podmienkou obnovenia je:
          </p>
          <ul className="space-y-2 text-[#333] mb-6" style={{ fontSize: "15px" }}>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-[#051937] shrink-0" />
              <span>Ucast na povinnych vzdelavacich seminaroch pocas platnosti licencie</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-[#051937] shrink-0" />
              <span>Aktivna cinnost v danej pozicii (rozhodovanie/trenerovanie)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-[#051937] shrink-0" />
              <span>Uhradenie poplatku za obnovenie licencie</span>
            </li>
          </ul>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/vzdelavanie/certifikacia"
              className="inline-block px-5 py-2.5 bg-[#051937] text-white text-sm font-semibold rounded-lg hover:bg-[#0a2a5c] transition-colors"
            >
              Podmienky certifikacie
            </Link>
            <Link
              href="/vzdelavanie/fih-licencie"
              className="inline-block px-5 py-2.5 border border-[#051937] text-[#051937] text-sm font-semibold rounded-lg hover:bg-[#051937] hover:text-white transition-colors"
            >
              FIH licencie
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
