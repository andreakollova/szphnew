import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "U12 - Mladeznicke sutaze - Slovensky pozemnohokejovy zvaz",
  description: "Mladeznicka kategoria U12 v pozemnom hokeji na Slovensku. Informacie o sutaziach hracov do 12 rokov.",
};

export default function U12Page() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      {/* Hero */}
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span className="font-bold uppercase text-white mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>
            Sutaze
          </span>
          <h1 className="font-garet font-bold italic text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            U12
          </h1>
          <p className="text-white mt-3 max-w-xl" style={{ fontSize: "15px" }}>
            Mladeznicka kategoria hracov do 12 rokov.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <p className="text-[#334155] mb-8" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Kategoria U12 je najmladsou sutaznou vekovou skupinou v slovenskom pozemnom hokeji. Je urcena pre hracov a hracky do 12 rokov a zameriava sa predovsetkym na zakladne hokejove zrucnosti, radost z pohybu a budovanie lasky k sportu. V tomto veku je klucove, aby deti ziskali pozitivny vztah k pozemnemu hokeju.
        </p>

        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Format sutaze
        </h2>
        <div className="space-y-4 mb-8">
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10148;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Maly format:</strong> Zapasy sa hraju na vyrazne mensich ihriskach, typicky vo formate 4 na 4 alebo 5 na 5. Toto umoznuje detom mat viac kontaktu s loptou a aktivnejsie sa zapajat do hry.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10148;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Kratsi cas:</strong> Zapasy maju kratsi hraci cas prisposobeny veku a fyzickym moznostiam deti.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10148;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Turnajove dni:</strong> Sutaze prebiehaju formou turnajovych kol, kde timy odohraju niekolko kratkych zapasov pocas jedneho dna, co vytvara priatelsku a sutaznu atmosferu.
            </p>
          </div>
        </div>

        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Zameranie na rozvoj
        </h2>
        <p className="text-[#334155] mb-6" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          V kategorii U12 je doraz kladeny na rozvoj zakladnych motorickych zrucnosti, koordinacie, ovladania hokejky a lopty. Treneri sa zameriavaju na to, aby deti hrali s radostou a postupne sa ucili zakladne prvky hry - prihravaynie, driblovanie a strelibu. Sutazny vysledok je druhorady, prioritou je sportovy rozvoj a radost z hry.
        </p>

        <div className="rounded-2xl p-6 mb-8" style={{ background: "#051937" }}>
          <h3 className="font-bold text-white mb-3" style={{ fontSize: "16px" }}>Chcete zacat?</h3>
          <p className="text-white" style={{ fontSize: "14px", lineHeight: 1.8 }}>
            Pozemny hokej je idealny sport pre deti od 6 rokov. Kontaktujte pozemnohokejovy klub vo vasom meste alebo navstivte sekciu klubov na nasej stranke. Vaše dieta moze zacat trenovat a postupne sa zapojit do sutazi v kategorii U12.
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
