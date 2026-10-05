import type { Metadata } from "next";
import Link from "next/link";
import ContactFormSection from "@/app/components/ContactFormSection";

export const metadata: Metadata = {
  title: "Licencie | SZPH",
  description:
    "Licenčné požiadavky a podmienky pre trénerov a rozhodcov pozemného hokeja na Slovensku.",
};

export default function LicenciePage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[1100px] mx-auto">
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
            Licencie
          </h1>
          <p
            className="text-white mt-3 max-w-xl"
            style={{ fontSize: "15px" }}
          >
            Požiadavky a podmienky pre získanie a udržanie licencií v pozemnom
            hokeji.
          </p>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 pt-12">
        <section className="mb-12">
          <h2
            className="font-garet font-bold text-[#051937] mb-4"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
          >
            Systém licencií SZPH
          </h2>
          <p className="text-[#333] leading-relaxed mb-4" style={{ fontSize: "15px" }}>
            Slovenský zväz pozemného hokeja spravuje systém licencií pre trénerov
            a rozhodcov v súlade s medzinárodnou metodikou FIH. Licencia je
            podmienkou pre oficiálnu činnosť na súťažiach organizovaných SZPH.
          </p>
          <p className="text-[#333] leading-relaxed mb-6" style={{ fontSize: "15px" }}>
            Každá licencia má definovanú dobu platnosti a podmienky pre jej
            obnovenie, vrátane povinnej účasti na vzdelávacích seminároch.
          </p>
        </section>

        <section className="mb-12">
          <h2
            className="font-garet font-bold text-[#051937] mb-4"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
          >
            Trénerské licencie
          </h2>
          <div className="space-y-4 mb-6">
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                Licencia C - základná
              </h3>
              <p className="text-sm text-[#666]">
                Oprávňuje k vedeniu tréningov a zápasov na rekreačnej a
                základnej súťažnej úrovni. Podmienka: absolvovanie kurzu Level 1
                a zloženie skúšky.
              </p>
            </div>
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                Licencia B - pokročilá
              </h3>
              <p className="text-sm text-[#666]">
                Oprávňuje k vedeniu družstiev na vyššej súťažnej úrovni.
                Podmienka: platná licencia C, minimálne 2 roky praxe a
                absolvovanie kurzu Level 2.
              </p>
            </div>
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                Licencia A - najvyššia
              </h3>
              <p className="text-sm text-[#666]">
                Oprávňuje k vedeniu reprezentačných družstiev a elitných
                klubových tímov. Podmienka: platná licencia B, minimálne 4 roky
                praxe a absolvovanie kurzu Level 3 alebo vyššia.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2
            className="font-garet font-bold text-[#051937] mb-4"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
          >
            Rozhodcovské licencie
          </h2>
          <div className="space-y-4 mb-6">
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                Národná licencia
              </h3>
              <p className="text-sm text-[#666]">
                Oprávňuje k rozhodovaniu zápasov na úrovni slovenskej ligy.
                Podmienka: absolvovanie základného kurzu rozhodcov a zloženie
                písomnej a praktickej skúšky.
              </p>
            </div>
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                Medzinárodná licencia
              </h3>
              <p className="text-sm text-[#666]">
                Oprávňuje k rozhodovaniu medzinárodných zápasov a turnajov.
                Podmienka: platná národná licencia, absolvovanie medzinárodných
                skúšok a splnenie fyzických testov FIH.
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
            Licencie majú obmedzenú platnosť a vyžadujú pravidelné obnovenie.
            Podmienkou obnovenia je:
          </p>
          <ul className="space-y-2 text-[#333] mb-6" style={{ fontSize: "15px" }}>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-[#051937] shrink-0" />
              <span>Účasť na povinných vzdelávacích seminároch počas platnosti licencie</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-[#051937] shrink-0" />
              <span>Aktívna činnosť v danej pozícii (rozhodovanie/trénerovanie)</span>
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
              Podmienky certifikácie
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
              Kontaktovať nás
            </Link>
          </div>
        </section>

        <ContactFormSection
          title="Otázky k licenciám"
          subtitle="Potrebujete informácie o licenciách? Napíšte nám."
          formType="licencie"
        />
      </div>
    </article>
  );
}
