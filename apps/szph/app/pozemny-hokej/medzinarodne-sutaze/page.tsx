import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { getDbPageContent } from "@/app/lib/getDbPageContent";
import { PageContentRenderer } from "@/app/components/PageContentRenderer";

export const metadata: Metadata = {
  title: "Medzinárodné súťaže",
  description: "Olympijské hry, majstrovstvá sveta a majstrovstvá Európy. Spoznajte hlavné reprezentačné súťaže v pozemnom hokeji.",
};

export default async function MedzinarodneSubazePage() {
  const dbPage = await getDbPageContent("pozemny-hokej/medzinarodne-sutaze");
  if (dbPage && dbPage.content.length > 0) {
    return <PageContentRenderer blocks={dbPage.content} breadcrumb="O sporte" title={dbPage.title} />;
  }

  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      {/* Hero */}
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[1100px] mx-auto">
          <Link href="/pozemny-hokej" className="inline-flex items-center gap-2 font-bold text-white hover:text-white transition-colors mb-6" style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}><svg className="h-3 w-3 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>Späť</Link>
          <span className="font-bold uppercase text-white mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>
            Pozemný hokej
          </span>
          <h1 className="font-bold text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Medzinárodné súťaže
          </h1>
          <p className="text-white mt-4 max-w-xl leading-relaxed" style={{ fontSize: "15px" }}>
            Olympijské hry, majstrovstvá sveta a majstrovstvá Európy. Spoznajte hlavné reprezentačné súťaže v pozemnom hokeji a sledujte ich program, výsledky a dianie.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1100px] mx-auto px-6 pt-12">

        {/* Olympijské hry */}
        <div className="flex items-center gap-4 mt-0 mb-4">
          <Image src="/images/logo-olympics.png" alt="Olympijské hry" width={56} height={28} className="object-contain shrink-0" />
          <h2 className="font-bold text-[#051937]" style={{ fontSize: "24px" }}>
            Olympijské hry
          </h2>
        </div>
        <div className="space-y-4 mb-12">
          <p className="text-[#334155] leading-relaxed" style={{ fontSize: "15px" }}>
            Pozemný hokej patrí do programu letných olympijských hier. Muži sa na olympiáde prvýkrát predstavili v Londýne v roku 1908, ženy v Moskve v roku 1980. Mužské a ženské reprezentácie súťažia v samostatných turnajoch o olympijské medaily.
          </p>
          <p className="text-[#334155] leading-relaxed" style={{ fontSize: "15px" }}>
            Účasť na turnaji sa riadi kvalifikačným systémom schváleným pre konkrétny ročník hier.
          </p>
          <a href="https://www.fih.hockey/events/olympic-games" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-bold text-[#012d74] hover:text-[#051937] transition-colors" style={{ fontSize: "13px" }}>
            Viac o olympijskom hokeji
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
        </div>

        {/* Majstrovstvá sveta */}
        <div className="flex items-center gap-4 mb-4">
          <Image src="/images/logo-fih.svg" alt="FIH" width={48} height={48} className="object-contain shrink-0" />
          <h2 className="font-bold text-[#051937]" style={{ fontSize: "24px" }}>
            Majstrovstvá sveta
          </h2>
        </div>
        <div className="space-y-4 mb-12">
          <p className="text-[#334155] leading-relaxed" style={{ fontSize: "15px" }}>
            Majstrovstvá sveta v pozemnom hokeji nesú názov <strong>FIH Hockey World Cup</strong>. Ide o reprezentačné turnaje mužov a žien pod hlavičkou Medzinárodnej hokejovej federácie FIH.
          </p>
          <p className="text-[#334155] leading-relaxed" style={{ fontSize: "15px" }}>
            Prvý mužský svetový šampionát sa uskutočnil v roku 1971, prvý ženský v roku 1974. Tímy z jednotlivých kontinentov na nich bojujú o titul majstrov sveta.
          </p>
          <a href="https://www.fih.hockey/events/world-cup" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-bold text-[#012d74] hover:text-[#051937] transition-colors" style={{ fontSize: "13px" }}>
            Viac o majstrovstvách sveta
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
        </div>

        {/* Majstrovstvá Európy */}
        <div className="flex items-center gap-4 mb-4">
          <Image src="/images/logo-eurohockey.png" alt="EuroHockey" width={48} height={48} className="object-contain shrink-0" />
          <h2 className="font-bold text-[#051937]" style={{ fontSize: "24px" }}>
            Majstrovstvá Európy
          </h2>
        </div>
        <div className="space-y-4 mb-12">
          <p className="text-[#334155] leading-relaxed" style={{ fontSize: "15px" }}>
            Európske reprezentačné súťaže zastrešuje <strong>EuroHockey</strong>. Najvyššou úrovňou sú EuroHockey Championships, na ktorých mužské a ženské tímy hrajú o titul majstrov Európy.
          </p>
          <p className="text-[#334155] leading-relaxed" style={{ fontSize: "15px" }}>
            Súčasťou európskeho systému sú aj súťaže <strong>EuroHockey Championship II a III</strong>. Účasť tímov v jednotlivých úrovniach sa riadi výsledkami a kvalifikačnými pravidlami príslušného ročníka.
          </p>
          <a href="https://www.eurohockey.org/competitions/competitions-formats" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-bold text-[#012d74] hover:text-[#051937] transition-colors" style={{ fontSize: "13px" }}>
            Prehľad európskych súťaží
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
        </div>

        {/* Program a výsledky */}
        <h2 className="font-bold text-[#051937] mb-4" style={{ fontSize: "24px" }}>
          Program a výsledky
        </h2>
        <div className="space-y-4 mb-8">
          <p className="text-[#334155] leading-relaxed" style={{ fontSize: "15px" }}>
            Hľadáte termín turnaja, rozpis zápasov alebo konečné poradie? Aktuálne informácie nájdete na oficiálnych stránkach organizátorov.
          </p>
          <ul className="space-y-2 pl-5" style={{ listStyleType: "disc" }}>
            <li className="text-[#334155]" style={{ fontSize: "15px" }}><strong>FIH</strong> - olympijské turnaje a majstrovstvá sveta.</li>
            <li className="text-[#334155]" style={{ fontSize: "15px" }}><strong>EuroHockey</strong> - majstrovstvá Európy a ďalšie európske súťaže.</li>
          </ul>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href="https://www.fih.hockey/events/olympic-games" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-bold text-white transition-all hover:brightness-110" style={{ background: "#012d74", borderRadius: "20px", padding: "10px 20px", fontSize: "12px" }}>
            Medzinárodné turnaje FIH
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
          <a href="https://eurohockey.org/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-bold text-white transition-all hover:brightness-110" style={{ background: "#012d74", borderRadius: "20px", padding: "10px 20px", fontSize: "12px" }}>
            Európske súťaže EuroHockey
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
        </div>
      </div>
    </article>
  );
}
