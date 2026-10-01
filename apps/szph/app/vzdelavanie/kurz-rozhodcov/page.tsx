import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kurz rozhodcov | SzPH",
  description:
    "Detailné informácie o kurze rozhodcov pozemného hokeja - obsah, podmienky a prihlásenie.",
};

export default function KurzRozhodcovPage() {
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
            Kurz rozhodcov
          </h1>
          <p
            className="text-white mt-3 max-w-xl"
            style={{ fontSize: "15px" }}
          >
            Vsetko, co potrebujete vediet o kurze rozhodcov polneho hokeja.
          </p>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <section className="mb-12">
          <h2
            className="font-garet font-bold text-[#051937] mb-4"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
          >
            O kurze
          </h2>
          <p className="text-[#333] leading-relaxed mb-4" style={{ fontSize: "15px" }}>
            Kurz rozhodcov polneho hokeja je urceny pre vsetkych zaujemcov o
            rozhodovanie, bez ohladu na predchadzajuce skusenosti s polnym
            hokejom. Kurz poskytuje komplexne vzdelanie potrebne na ziskanie
            rozhodcovskej licencie SzPH.
          </p>
          <p className="text-[#333] leading-relaxed mb-6" style={{ fontSize: "15px" }}>
            Absolventi kurzu ziskavaju opravnenie rozhodovat zapasy slovenskej
            ligy polneho hokeja a dalsich sutazi organizovanych SzPH.
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
                Teoreticka cast
              </h3>
              <p className="text-sm text-[#666]">
                Pravidla polneho hokeja podla FIH, signalizacia rozhodcov,
                disciplinarne postihy, organizacia zapasu a administrativne
                povinnosti rozhodcu.
              </p>
            </div>
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                Prakticka cast
              </h3>
              <p className="text-sm text-[#666]">
                Pozicovanie na ihrisku, rozhodovanie modelovych situacii,
                spoluprace s dalsim rozhodcom, komunikacia s hracmi a trenermi.
              </p>
            </div>
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                Video analyza
              </h3>
              <p className="text-sm text-[#666]">
                Rozbor realnych zapasovych situacii, identifikacia prestupkov,
                spravne rozhodnutia a rozbor chyb.
              </p>
            </div>
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                Skuska
              </h3>
              <p className="text-sm text-[#666]">
                Pisomny test z pravidiel a prakticka skuska rozhodovanie
                zapasu pod dohladom skusenych rozhodcov.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2
            className="font-garet font-bold text-[#051937] mb-4"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
          >
            Podmienky ucasti
          </h2>
          <ul className="space-y-2 text-[#333] mb-6" style={{ fontSize: "15px" }}>
            <li className="flex items-start gap-2">
              <span className="text-[#051937] mt-1.5 block w-1.5 h-1.5 rounded-full bg-[#051937] shrink-0" />
              <span>Minimalne 16 rokov veku</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#051937] mt-1.5 block w-1.5 h-1.5 rounded-full bg-[#051937] shrink-0" />
              <span>Zaujem o polny hokej a rozhodovanie</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#051937] mt-1.5 block w-1.5 h-1.5 rounded-full bg-[#051937] shrink-0" />
              <span>Dobra fyzicka kondicia</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#051937] mt-1.5 block w-1.5 h-1.5 rounded-full bg-[#051937] shrink-0" />
              <span>Predchadzajuce skusenosti s polnym hokejom su vyhodou, nie podmienkou</span>
            </li>
          </ul>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/zacni-hrat/rozhodca"
              className="inline-block px-5 py-2.5 bg-[#051937] text-white text-sm font-semibold rounded-lg hover:bg-[#0a2a5c] transition-colors"
            >
              Chcem byt rozhodca
            </Link>
            <Link
              href="/kontakt"
              className="inline-block px-5 py-2.5 border border-[#051937] text-[#051937] text-sm font-semibold rounded-lg hover:bg-[#051937] hover:text-white transition-colors"
            >
              Prihlasit sa na kurz
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}
