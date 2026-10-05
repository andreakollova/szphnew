import type { Metadata } from "next";
import Link from "next/link";
import ContactFormSection from "@/app/components/ContactFormSection";

export const metadata: Metadata = {
  title: "Zdroje pre trénerov | SZPH",
  description:
    "Materiály, vzdelávanie a podpora pre trénerov pozemného hokeja v kluboch SZPH.",
};

export default function TreneriPage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[1100px] mx-auto">
          <Link href="/kluby" className="inline-flex items-center gap-2 font-bold text-white hover:text-white transition-colors mb-6" style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}><svg className="h-3 w-3 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>Späť</Link>
          <span
            className="font-bold uppercase text-white mb-4 block"
            style={{ fontSize: "10px", letterSpacing: "0.14em" }}
          >
            Kluby
          </span>
          <h1
            className="font-garet font-bold italic text-white leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Zdroje pre trénerov
          </h1>
          <p
            className="text-white mt-3 max-w-xl"
            style={{ fontSize: "15px" }}
          >
            Materiály, metodiky a vzdelávacie programy pre klubových trénerov.
          </p>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 pt-12">
        <p
          className="text-[#334155] leading-relaxed mb-8"
          style={{ fontSize: "15px" }}
        >
          Slovenský zväz pozemného hokeja podporuje rozvoj trénerov na všetkých
          úrovniach. Kvalitní tréneri sú základom úspechu slovenského pozemného
          hokeja - od mládežníckych kategórií až po seniorskú reprezentáciu.
        </p>

        <div
          className="rounded-lg border border-[#e2e8f0] bg-white p-8 mb-8"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
        >
          <h2
            className="font-bold text-[#051937] mb-4"
            style={{ fontSize: "24px" }}
          >
            Vzdelávanie trénerov
          </h2>
          <p
            className="text-[#334155] leading-relaxed mb-4"
            style={{ fontSize: "15px" }}
          >
            SZPH organizuje pravidelné vzdelávacie programy pre trénerov
            pozemného hokeja. Školenia pokrývajú všetky úrovne trénerskej
            kvalifikácie a sú uznávané Medzinárodnou hokejovou federáciou (FIH).
          </p>
          <div className="space-y-3">
            {[
              "Základný trénerský kurz (Level 1) - pre začínajúcich trénerov",
              "Pokročilý trénerský kurz (Level 2) - pre skúsených trénerov",
              "Špecializované semináre - brankári, kondičná príprava, taktika",
              "Medzinárodné trénerské workshopy v spolupráci s FIH a EHF",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-[#012d74] shrink-0" />
                <p className="text-[#334155]" style={{ fontSize: "15px" }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link
              href="/vzdelavanie/treneri"
              className="inline-flex items-center gap-1.5 font-bold text-[#012d74]"
              style={{ fontSize: "14px" }}
            >
              Kompletné informácie o vzdelávaní trénerov
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        <div
          className="rounded-lg border border-[#e2e8f0] bg-white p-8 mb-8"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
        >
          <h2
            className="font-bold text-[#051937] mb-4"
            style={{ fontSize: "24px" }}
          >
            Metodické materiály
          </h2>
          <p
            className="text-[#334155] leading-relaxed mb-4"
            style={{ fontSize: "15px" }}
          >
            Pre registrovaných trénerov poskytujeme metodické materiály,
            tréningové plány a odborné publikácie. Materiály sú pravidelne
            aktualizované v súlade s najnovšími trendmi v pozemnom hokejí.
          </p>
          <div className="space-y-3">
            {[
              "Tréningové jednotky pre jednotlivé vekové kategórie",
              "Metodiky nácviku základných a pokročilých zručností",
              "Video analýzy a taktické materiály",
              "Pravidlá a ich interpretácia pre trénerov",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-[#012d74] shrink-0" />
                <p className="text-[#334155]" style={{ fontSize: "15px" }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          className="rounded-lg border border-[#012d74]/20 p-8"
          style={{ background: "#f0f4ff" }}
        >
          <h2
            className="font-bold text-[#051937] mb-3"
            style={{ fontSize: "24px" }}
          >
            Kontakt pre trénerov
          </h2>
          <p
            className="text-[#334155] leading-relaxed"
            style={{ fontSize: "15px" }}
          >
            Pre otázky ohľadom vzdelávania a podpory trénerov kontaktujte
            metodickú komisiu SZPH na{" "}
            <a
              href="mailto:szph@szph.sk"
              className="font-bold text-[#012d74] hover:underline"
            >
              szph@szph.sk
            </a>
            .
          </p>
        </div>

        <ContactFormSection
          title="Informácie pre trénerov"
          subtitle="Máte otázky? Radi vám pomôžeme."
          formType="treneri-kluby"
        />
      </div>
    </article>
  );
}
