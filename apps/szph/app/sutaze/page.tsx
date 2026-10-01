import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sutaze - Slovensky pozemnohokejovy zvaz",
  description: "Prehlad sutazi v pozemnom hokeji na Slovensku. Extraliga muzov, Extraliga zien, mladeznicke kategorie U18, U14, U12, halovy a pozemny hokej.",
};

export default function SutazePage() {
  const competitions = [
    {
      title: "Extraliga muzov",
      description: "Najvyssia muzska sutaz v pozemnom hokeji na Slovensku.",
      href: "/sutaze/muzska-liga",
    },
    {
      title: "Extraliga zien",
      description: "Najvyssia zienska sutaz v pozemnom hokeji na Slovensku.",
      href: "/sutaze/zenska-liga",
    },
    {
      title: "Pozemny hokej",
      description: "Outdoorova sezona na umelej trave.",
      href: "/sutaze/pozemny-hokej",
    },
    {
      title: "Halovy hokej",
      description: "Halova sezona v zimnych mesiacoch.",
      href: "/sutaze/halovy-hokej",
    },
    {
      title: "U18",
      description: "Mladeznicka kategoria do 18 rokov.",
      href: "/sutaze/u18",
    },
    {
      title: "U14",
      description: "Mladeznicka kategoria do 14 rokov.",
      href: "/sutaze/u14",
    },
    {
      title: "U12",
      description: "Mladeznicka kategoria do 12 rokov.",
      href: "/sutaze/u12",
    },
  ];

  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      {/* Hero */}
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span className="font-bold uppercase text-white mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>
            Sutaze
          </span>
          <h1 className="font-garet font-bold italic text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Sutaze v pozemnom hokeji
          </h1>
          <p className="text-white mt-3 max-w-xl" style={{ fontSize: "15px" }}>
            Kompletny prehlad sutazi organizovanych Slovenskym pozemnohokejovym zvazom.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <p className="text-[#334155] mb-8" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Slovensky pozemnohokejovy zvaz organizuje sutaze v pozemnom aj halovom hokeji pre muzov, zeny a mladez. Sutazna sezona sa deli na dve hlavne casti: outdoorovu sezonu na umelej trave (jar a jesen) a halovu sezonu (zimne mesiace). V kazdej z tychto disciplin prebiehaju samostatne ligy a turnaje.
        </p>

        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Seniorske sutaze
        </h2>
        <p className="text-[#334155] mb-6" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Najvyssou sutazou v slovenskom pozemnom hokeji je Extraliga, ktora sa hra oddelene pre muzov a zeny. Extraliga je hlavnou celostatnou ligou, v ktorej sa stretavaju najlepsie kluby zo vsetkych regionov Slovenska. Vitaz Extraligy ziskava titul Majstra Slovenska.
        </p>

        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Mladeznicke kategorie
        </h2>
        <p className="text-[#334155] mb-6" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Mladeznicke sutaze su rozdelene podla vekovych kategorii: U18 (do 18 rokov), U14 (do 14 rokov) a U12 (do 12 rokov). Tieto kategorie su zakladom pre rozvoj pozemnohokejovych talentov na Slovensku. V mladsich kategoriach sa hrava na mensich ihriskach s upravenym poctom hracov, aby sa deti mohli postupne adaptovat na plnoformatovu hru.
        </p>

        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Discipliny
        </h2>
        <p className="text-[#334155] mb-8" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Pozemny hokej sa na Slovensku hra v dvoch zakladnych disciplinach. Pozemny (outdoor) hokej sa hra na umelej trave v letnych mesiacoch a halovy (indoor) hokej prebieha v sportovych halach pocas zimy. Kazda disciplina ma vlastne pravidla a format sutazi.
        </p>

        {/* Grid of competitions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          {competitions.map((comp) => (
            <Link
              key={comp.href}
              href={comp.href}
              className="rounded-2xl p-6 transition-colors hover:bg-white"
              style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}
            >
              <h3 className="font-bold text-[#051937] mb-2" style={{ fontSize: "16px" }}>{comp.title}</h3>
              <p className="text-[#334155]" style={{ fontSize: "14px", lineHeight: 1.6 }}>{comp.description}</p>
            </Link>
          ))}
        </div>

        {/* Link to results */}
        <div className="mt-12">
          <Link href="/zapasy" className="inline-flex items-center gap-2 font-bold text-[#012d74] hover:underline" style={{ fontSize: "15px" }}>
            Vysledky a tabulky
            <span>&#8594;</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
