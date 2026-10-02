import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "U12 - Mládežnícke súťaže - Slovenský pozemnohokejový zväz",
  description: "Mládežnícka kategória U12 v pozemnom hokeji na Slovensku. Informácie o súťažiach hráčov do 12 rokov.",
};

export default function U12Page() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      {/* Hero */}
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span className="font-bold uppercase text-white mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>
            Súťaže
          </span>
          <h1 className="font-garet font-bold italic text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            U12
          </h1>
          <p className="text-white mt-3 max-w-xl" style={{ fontSize: "15px" }}>
            Mládežnícka kategória hráčov do 12 rokov.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <p className="text-[#334155] mb-8" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Kategória U12 je najmladšou súťažnou vekovou skupinou v slovenskom pozemnom hokeji. Je určená pre hráčov a hráčky do 12 rokov a zameriava sa predovšetkým na základné hokejové zručnosti, radosť z pohybu a budovanie lásky k športu. V tomto veku je kľúčové, aby deti získali pozitívny vzťah k pozemnému hokeju.
        </p>

        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Formát súťaže
        </h2>
        <div className="space-y-4 mb-8">
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10148;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Malý formát:</strong> Zápasy sa hrajú na výrazne menších ihriskách, typicky vo formáte 4 na 4 alebo 5 na 5. Toto umožňuje deťom mať viac kontaktu s loptou a aktívnejšie sa zapájať do hry.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10148;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Kratší čas:</strong> Zápasy majú kratší hrací čas prispôsobený veku a fyzickým možnostiam detí.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10148;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Turnajové dni:</strong> Súťaže prebiehajú formou turnajových kôl, kde tímy odohrajú niekoľko krátkych zápasov počas jedného dňa, čo vytvára priateľskú a súťažnú atmosféru.
            </p>
          </div>
        </div>

        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Zameranie na rozvoj
        </h2>
        <p className="text-[#334155] mb-6" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          V kategórii U12 je dôraz kladený na rozvoj základných motorických zručností, koordinácie, ovládania hokejky a lopty. Tréneri sa zameriavajú na to, aby deti hrali s radosťou a postupne sa učili základné prvky hry - prihrávanie, driblovanie a strieľanie. Súťažný výsledok je druhoradý, prioritou je športový rozvoj a radosť z hry.
        </p>

        <div className="rounded-lg p-6 mb-8" style={{ background: "#051937" }}>
          <h3 className="font-bold text-white mb-3" style={{ fontSize: "16px" }}>Chcete začať?</h3>
          <p className="text-white" style={{ fontSize: "14px", lineHeight: 1.8 }}>
            Pozemný hokej je ideálny šport pre deti od 6 rokov. Kontaktujte pozemnohokejový klub vo vašom meste alebo navštívte sekciu klubov na našej stránke. Vaše dieťa môže začať trénovať a postupne sa zapojiť do súťaží v kategórii U12.
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
