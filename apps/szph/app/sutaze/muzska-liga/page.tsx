import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Extraliga mužov - Slovenský pozemnohokejový zväz",
  description: "Extraliga mužov je najvyššia súťaž v pozemnom hokeji na Slovensku. Informácie o formáte, kluboch a priebehu súťaže.",
};

export default function MuskaLigaPage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      {/* Hero */}
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span className="font-bold uppercase text-white mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>
            Súťaže
          </span>
          <h1 className="font-garet font-bold italic text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Extraliga mužov
          </h1>
          <p className="text-white mt-3 max-w-xl" style={{ fontSize: "15px" }}>
            Najvyššia mužská súťaž v pozemnom hokeji na Slovensku.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <p className="text-[#334155] mb-8" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Extraliga mužov je najvyššia a najprestížnejšia súťaž v slovenskom pozemnom hokeji. Každú sezónu sa v nej stretávajú najlepšie mužské kluby zo Slovenska, ktoré súria o titul Majstra Slovenska. Súťaž organizuje Slovenský pozemnohokejový zväz (SZPH) a prebieha v pozemnej (outdoor) aj halovej (indoor) forme.
        </p>

        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Formát súťaže
        </h2>
        <p className="text-[#334155] mb-6" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Extraliga mužov sa hrá systémom každý s každým, pričom tímy odohrajú zápasy doma aj vonku. Na konci základnej časti nasleduje play-off, v ktorom najlepšie umiestnené tímy bojujú o celkové víťazstvo. Formát sa môže meniť v závislosti od počtu prihlásených klubov v danej sezóne.
        </p>

        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Pozemná a halová sezóna
        </h2>
        <div className="space-y-4 mb-8">
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10148;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Sezóna - pozemný hokej:</strong> Prebieha na jar a na jeseň na ihriskách s umelou trávou. Zápasy sa hrajú v plnom formáte 11 na 11 na ihrisku s rozmermi 91,4 x 55 metrov.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10148;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Sezóna - halový hokej:</strong> Prebieha v zimných mesiacoch v športových halách. Halový hokej sa hrá vo formáte 6 na 6 (vrátane brankára) na menšej hracej ploche s odlišnými pravidlami.
            </p>
          </div>
        </div>

        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Kluby a história
        </h2>
        <p className="text-[#334155] mb-8" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          V Extralige mužov pôsobili a pôsobia kluby z rôznych miest Slovenska, pretože pozemný hokej má na Slovensku dlhú tradíciu. Medzi najúspešnejšie kluby patria tímy z Bratislavy, Nitry, Trnavy či Trenčína. Mnohí hráči Extraligy sú súčasne členmi národného tímu Slovenska.
        </p>

        <div className="rounded-2xl p-6 mb-8" style={{ background: "#051937" }}>
          <h3 className="font-bold text-white mb-3" style={{ fontSize: "16px" }}>Reprezentácia</h3>
          <p className="text-white" style={{ fontSize: "14px", lineHeight: 1.8 }}>
            Extraliga slúži aj ako základ pre výber hráčov do mužskej reprezentácie Slovenska, ktorá sa zúčastňuje medzinárodných turnajov a kvalifikácií pod hlavičkou FIH (Medzinárodná hokejová federácia) a EHF (Európska hokejová federácia).
          </p>
        </div>

        {/* Link to results */}
        <div className="mt-12 flex gap-6">
          <Link href="/zapasy" className="inline-flex items-center gap-2 font-bold text-[#012d74] hover:underline" style={{ fontSize: "15px" }}>
            Výsledky a tabuľky
            <span>&#8594;</span>
          </Link>
          <Link href="/sutaze" className="inline-flex items-center gap-2 font-bold text-[#334155] hover:underline" style={{ fontSize: "15px" }}>
            Všetky súťaže
          </Link>
        </div>
      </div>
    </article>
  );
}
