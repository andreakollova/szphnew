import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Extraliga muzov - Slovensky pozemnohokejovy zvaz",
  description: "Extraliga muzov je najvyssia sutaz v pozemnom hokeji na Slovensku. Informacie o formate, kluboch a priebehu sutaze.",
};

export default function MuskaLigaPage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      {/* Hero */}
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span className="font-bold uppercase text-white/40 mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>
            Sutaze
          </span>
          <h1 className="font-garet font-bold italic text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Extraliga muzov
          </h1>
          <p className="text-white/50 mt-3 max-w-xl" style={{ fontSize: "15px" }}>
            Najvyssia muzska sutaz v pozemnom hokeji na Slovensku.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <p className="text-[#334155] mb-8" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Extraliga muzov je najvyssia a najprestiznejsia sutaz v slovenskom pozemnom hokeji. Kazdu sezonu sa v nej stretavaju najlepsie muzske kluby zo Slovenska, ktore suria o titul Majstra Slovenska. Sutaz organizuje Slovensky pozemnohokejovy zvaz (SZPH) a prebieha v pozemnej (outdoor) aj halovej (indoor) forme.
        </p>

        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Format sutaze
        </h2>
        <p className="text-[#334155] mb-6" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Extraliga muzov sa hra systemom kazdy s kazdym, pricom timy odohraju zapasy doma aj vonku. Na konci zakladnej casti nasleduje play-off, v ktorom najlepsie umiestnene timy bojuju o celkove vitazstvo. Format sa moze menit v zavislosti od poctu prihlasenych klubov v danej sezone.
        </p>

        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Pozemna a halova sezona
        </h2>
        <div className="space-y-4 mb-8">
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10148;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Pozemna sezona:</strong> Prebieha na jar a na jesen na ihriskach s umelou travou. Zapasy sa hraju v plnom formate 11 na 11 na ihrisku s rozmermi 91,4 x 55 metrov.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10148;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Halova sezona:</strong> Prebieha v zimnych mesiacoch v sportovych halach. Halovy hokej sa hra v formate 6 na 6 (vratane brankara) na mensej hracej ploche s odlisnymi pravidlami.
            </p>
          </div>
        </div>

        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Kluby a historia
        </h2>
        <p className="text-[#334155] mb-8" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          V Extralige muzov posobili a posobiu kluby z roznych miest Slovenska, pretoze pozemny hokej ma na Slovensku dlhu tradiciu. Medzi najuspesnejsie kluby patria timy z Bratislavy, Nitry, Trnavy ci Trencina. Mnozi hraci Extraligy su sucasne clenmi narodneho timu Slovenska.
        </p>

        <div className="rounded-2xl p-6 mb-8" style={{ background: "#051937" }}>
          <h3 className="font-bold text-white mb-3" style={{ fontSize: "16px" }}>Reprezentacia</h3>
          <p className="text-white/70" style={{ fontSize: "14px", lineHeight: 1.8 }}>
            Extraliga sluzi aj ako zaklad pre vyber hracov do muzskej reprezentacie Slovenska, ktora sa zucastnuje medzinarodnych turnajov a kvalifikacii pod hlavickou FIH (Medzinarodna hokejova federacia) a EHF (Europska hokejova federacia).
          </p>
        </div>

        {/* Link to results */}
        <div className="mt-12 flex gap-6">
          <Link href="/zapasy" className="inline-flex items-center gap-2 font-bold text-[#012d74] hover:underline" style={{ fontSize: "15px" }}>
            Vysledky a tabulky
            <span>&#8594;</span>
          </Link>
          <Link href="/sutaze" className="inline-flex items-center gap-2 font-bold text-[#334155] hover:underline" style={{ fontSize: "15px" }}>
            Vsetky sutaze
          </Link>
        </div>
      </div>
    </article>
  );
}
