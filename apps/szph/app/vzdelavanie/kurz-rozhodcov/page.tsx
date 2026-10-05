import type { Metadata } from "next";
import Link from "next/link";
import ContactFormSection from "@/app/components/ContactFormSection";

export const metadata: Metadata = {
  title: "Kurz rozhodcov | SZPH",
  description:
    "Detailné informácie o kurze rozhodcov pozemného hokeja - obsah, podmienky a prihlásenie.",
};

export default function KurzRozhodcovPage() {
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
            Kurz rozhodcov
          </h1>
          <p
            className="text-white mt-3 max-w-xl"
            style={{ fontSize: "15px" }}
          >
            Všetko, čo potrebujete vedieť o kurze rozhodcov pozemného hokeja.
          </p>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 pt-12">
        <section className="mb-12">
          <h2
            className="font-garet font-bold text-[#051937] mb-4"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
          >
            O kurze
          </h2>
          <p className="text-[#333] leading-relaxed mb-4" style={{ fontSize: "15px" }}>
            Kurz rozhodcov pozemného hokeja je určený pre všetkých záujemcov o
            rozhodovanie, bez ohľadu na predchádzajúce skúsenosti s pozemným
            hokejom. Kurz poskytuje komplexné vzdelanie potrebné na získanie
            rozhodcovskej licencie SZPH.
          </p>
          <p className="text-[#333] leading-relaxed mb-6" style={{ fontSize: "15px" }}>
            Absolventi kurzu získavajú oprávnenie rozhodovať zápasy slovenskej
            ligy pozemného hokeja a ďalších súťaží organizovaných SZPH.
          </p>
        </section>

        <section className="mb-12">
          <h2
            className="font-garet font-bold text-[#051937] mb-4"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
          >
            Obsah kurzu
          </h2>
          <div className="space-y-4">
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                Teoretická časť
              </h3>
              <p className="text-sm text-[#666]">
                Pravidlá pozemného hokeja podľa FIH, signalizácia rozhodcov,
                disciplinárne postihy, organizácia zápasu a administratívne
                povinnosti rozhodcu.
              </p>
            </div>
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                Praktická časť
              </h3>
              <p className="text-sm text-[#666]">
                Pozicovanie na ihrisku, rozhodovanie modelových situácií,
                spolupráca s ďalším rozhodcom, komunikácia s hráčmi a trénermi.
              </p>
            </div>
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                Video analýza
              </h3>
              <p className="text-sm text-[#666]">
                Rozbor reálnych zápasových situácií, identifikácia priestupkov,
                správne rozhodnutia a rozbor chýb.
              </p>
            </div>
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                Skúška
              </h3>
              <p className="text-sm text-[#666]">
                Písomný test z pravidiel a praktická skúška rozhodovanie
                zápasu pod dohľadom skúsených rozhodcov.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2
            className="font-garet font-bold text-[#051937] mb-4"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
          >
            Podmienky účasti
          </h2>
          <ul className="space-y-2 text-[#333] mb-6" style={{ fontSize: "15px" }}>
            <li className="flex items-start gap-2">
              <span className="text-[#051937] mt-1.5 block w-1.5 h-1.5 rounded-full bg-[#051937] shrink-0" />
              <span>Minimálne 16 rokov veku</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#051937] mt-1.5 block w-1.5 h-1.5 rounded-full bg-[#051937] shrink-0" />
              <span>Záujem o pozemný hokej a rozhodovanie</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#051937] mt-1.5 block w-1.5 h-1.5 rounded-full bg-[#051937] shrink-0" />
              <span>Dobrá fyzická kondícia</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#051937] mt-1.5 block w-1.5 h-1.5 rounded-full bg-[#051937] shrink-0" />
              <span>Predchádzajúce skúsenosti s pozemným hokejom sú výhodou, nie podmienkou</span>
            </li>
          </ul>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/zacni-hrat/rozhodca"
              className="inline-block px-5 py-2.5 bg-[#051937] text-white text-sm font-semibold rounded-lg hover:bg-[#0a2a5c] transition-colors"
            >
              Chcem byť rozhodca
            </Link>
            <Link
              href="/kontakt"
              className="inline-block px-5 py-2.5 border border-[#051937] text-[#051937] text-sm font-semibold rounded-lg hover:bg-[#051937] hover:text-white transition-colors"
            >
              Prihlásiť sa na kurz
            </Link>
          </div>
        </section>

        <ContactFormSection
          title="Záujem o kurz rozhodcov"
          subtitle="Prihláste sa a my vás budeme kontaktovať."
          formType="kurz-rozhodcov"
        />
      </div>
    </article>
  );
}
