import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Súťaže - Slovenský pozemnohokejový zväz",
  description: "Prehľad súťaží v pozemnom hokeji na Slovensku. Extraliga mužov, Extraliga žien, mládežnícke kategórie U18, U14, U12, halový a pozemný hokej.",
};

export default function SutazePage() {
  const competitions = [
    {
      title: "Extraliga mužov",
      description: "Najvyššia mužská súťaž v pozemnom hokeji na Slovensku.",
      href: "/sutaze/muzska-liga",
    },
    {
      title: "Extraliga žien",
      description: "Najvyššia ženská súťaž v pozemnom hokeji na Slovensku.",
      href: "/sutaze/zenska-liga",
    },
    {
      title: "Pozemný hokej",
      description: "Sezóna - pozemný hokej na umelej tráve.",
      href: "/sutaze/pozemny-hokej",
    },
    {
      title: "Halový hokej",
      description: "Sezóna - halový hokej v zimných mesiacoch.",
      href: "/sutaze/halovy-hokej",
    },
    {
      title: "U18",
      description: "Mládežnícka kategória do 18 rokov.",
      href: "/sutaze/u18",
    },
    {
      title: "U14",
      description: "Mládežnícka kategória do 14 rokov.",
      href: "/sutaze/u14",
    },
    {
      title: "U12",
      description: "Mládežnícka kategória do 12 rokov.",
      href: "/sutaze/u12",
    },
  ];

  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      {/* Hero */}
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span className="font-bold uppercase text-white mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>
            Súťaže
          </span>
          <h1 className="font-garet font-bold italic text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Súťaže v pozemnom hokeji
          </h1>
          <p className="text-white mt-3 max-w-xl" style={{ fontSize: "15px" }}>
            Kompletný prehľad súťaží organizovaných Slovenským pozemnohokejovým zväzom.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <p className="text-[#334155] mb-8" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Slovenský pozemnohokejový zväz organizuje súťaže v pozemnom aj halovom hokeji pre mužov, ženy a mládež. Súťažná sezóna sa delí na dve hlavné časti: vonkajšiu sezónu na umelej tráve (jar a jeseň) a halovú sezónu (zimné mesiace). V každej z týchto disciplín prebiehajú samostatné ligy a turnaje.
        </p>

        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Seniorské súťaže
        </h2>
        <p className="text-[#334155] mb-6" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Najvyššou súťažou v slovenskom pozemnom hokeji je Extraliga, ktorá sa hrá oddelene pre mužov a ženy. Extraliga je hlavnou celoštátnou ligou, v ktorej sa stretávajú najlepšie kluby zo všetkých regiónov Slovenska. Víťaz Extraligy získava titul Majstra Slovenska.
        </p>

        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Mládežnícke kategórie
        </h2>
        <p className="text-[#334155] mb-6" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Mládežnícke súťaže sú rozdelené podľa vekových kategórií: U18 (do 18 rokov), U14 (do 14 rokov) a U12 (do 12 rokov). Tieto kategórie sú základom pre rozvoj pozemnohokejových talentov na Slovensku. V mladších kategóriách sa hráva na menších ihriskách s upraveným počtom hráčov, aby sa deti mohli postupne adaptovať na plnoformátovú hru.
        </p>

        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Disciplíny
        </h2>
        <p className="text-[#334155] mb-8" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Pozemný hokej sa na Slovensku hrá v dvoch základných disciplínach. Pozemný (outdoor) hokej sa hrá na umelej tráve v letných mesiacoch a halový (indoor) hokej prebieha v športových halách počas zimy. Každá disciplína má vlastné pravidlá a formát súťaží.
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
            Výsledky a tabuľky
            <span>&#8594;</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
