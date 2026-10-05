import type { Metadata } from "next";
import Link from "next/link";
import ContactFormSection from "@/app/components/ContactFormSection";

export const metadata: Metadata = {
  title: "Registrácia hráčov | SZPH",
  description:
    "Informácie o registrácii hráčov pozemného hokeja v Slovenskom zväze pozemného hokeja.",
};

export default function RegistraciaHracovPage() {
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
            Registrácia hráčov
          </h1>
          <p
            className="text-white mt-3 max-w-xl"
            style={{ fontSize: "15px" }}
          >
            Ako sa stať registrovaným hráčom pozemného hokeja na Slovensku.
          </p>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 pt-12">
        <h2
          className="font-bold text-[#051937] mb-3"
          style={{ fontSize: "24px" }}
        >
          Postup registrácie
        </h2>
        <p
          className="text-[#334155] leading-relaxed mb-6"
          style={{ fontSize: "15px" }}
        >
          Registrácia hráča v Slovenskom zväze pozemného hokeja prebieha
          výlučne prostredníctvom klubu. Každý hráč, ktorý chce štartovať
          v oficiálnych súťažiach SZPH, musí byť riadne zaregistrovaný.
        </p>

        <div
          className="rounded-lg border border-[#e2e8f0] bg-white p-8 mb-8"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
        >
          <h2
            className="font-bold text-[#051937] mb-4"
            style={{ fontSize: "24px" }}
          >
            Ako postupovať
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-bold text-white"
                style={{ background: "#051937", fontSize: "13px" }}
              >
                1
              </span>
              <p
                className="text-[#334155] leading-relaxed"
                style={{ fontSize: "15px" }}
              >
                <strong className="text-[#051937]">Výber klubu</strong> -
                Vyberte si klub pozemného hokeja vo vašom okolí. Zoznam
                registrovaných klubov nájdete v sekcii{" "}
                <Link
                  href="/kluby"
                  className="inline-flex items-center gap-1.5 font-bold text-[#012d74] hover:underline"
                >
                  Kluby
                </Link>
                .
              </p>
            </div>
            <div className="flex items-start gap-4">
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-bold text-white"
                style={{ background: "#051937", fontSize: "13px" }}
              >
                2
              </span>
              <p
                className="text-[#334155] leading-relaxed"
                style={{ fontSize: "15px" }}
              >
                <strong className="text-[#051937]">Kontakt s klubom</strong> -
                Oslovte vybraný klub a vyjadrte záujem o registráciu. Klub vám
                poskytne potrebné formuláre a informácie.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-bold text-white"
                style={{ background: "#051937", fontSize: "13px" }}
              >
                3
              </span>
              <p
                className="text-[#334155] leading-relaxed"
                style={{ fontSize: "15px" }}
              >
                <strong className="text-[#051937]">
                  Vyplnenie registračného formulára
                </strong>{" "}
                - Vyplňte registračný formulár a priložte požadované doklady
                (potvrdenie o zdravotnej spôsobilosti, fotografia). Pri
                maloletých hráčoch je potrebný súhlas zákonného zástupcu.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-bold text-white"
                style={{ background: "#051937", fontSize: "13px" }}
              >
                4
              </span>
              <p
                className="text-[#334155] leading-relaxed"
                style={{ fontSize: "15px" }}
              >
                <strong className="text-[#051937]">
                  Podanie žiadosti klubom
                </strong>{" "}
                - Klub podá registračnú žiadosť na SZPH. Po schválení obdržíte
                registračný preukaz.
              </p>
            </div>
          </div>
        </div>

        <div
          className="rounded-lg border border-[#e2e8f0] bg-white p-8 mb-8"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
        >
          <h2
            className="font-bold text-[#051937] mb-3"
            style={{ fontSize: "24px" }}
          >
            Potrebné dokumenty
          </h2>
          <ul className="space-y-2">
            {[
              "Vyplnený registračný formulár",
              "Potvrdenie o zdravotnej spôsobilosti od lekára",
              "Fotografia hráča (pasový formát)",
              "Súhlas zákonného zástupcu (pri maloletých)",
              "Kópia občianskeho preukazu alebo rodného listu",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-[#012d74] shrink-0" />
                <p className="text-[#334155]" style={{ fontSize: "15px" }}>
                  {item}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="rounded-lg border border-[#012d74]/20 p-8"
          style={{ background: "#f0f4ff" }}
        >
          <h2
            className="font-bold text-[#051937] mb-3"
            style={{ fontSize: "24px" }}
          >
            Potrebujete pomoc?
          </h2>
          <p
            className="text-[#334155] leading-relaxed"
            style={{ fontSize: "15px" }}
          >
            Pre bližšie informácie o registrácii hráčov kontaktujte sekretariát
            SZPH na{" "}
            <a
              href="mailto:szph@szph.sk"
              className="font-bold text-[#012d74] hover:underline"
            >
              szph@szph.sk
            </a>{" "}
            alebo sa obráťte priamo na váš klub.
          </p>
        </div>

        <ContactFormSection
          title="Registrácia hráča"
          subtitle="Chcete sa zaregistrovať ako hráč? Napíšte nám."
          formType="registracia-hraca"
        />
      </div>
    </article>
  );
}
