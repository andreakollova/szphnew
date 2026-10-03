import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "História pozemného hokeja",
  description: "História pozemného hokeja vo svete a na Slovensku — od staroveku po moderné olympijské hry.",
};

export default function HistoriaPage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span className="font-bold uppercase text-white mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>
            O športe
          </span>
          <h1 className="font-bold text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            História pozemného hokeja
          </h1>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <h2 className="font-bold text-[#051937] mt-0 mb-6" style={{ fontSize: "24px" }}>
          História pozemného hokeja vo svete
        </h2>
        <div className="space-y-4 mb-12">
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">➜</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              História pozemného hokeja siaha tisíce rokov do minulosti. Rôzne formy hokeja sa hrali už v staroveku v rôznych častiach sveta. Prvé dôkazy o hrách podobných hokeju pochádzajú z Egypta, Grécka či Perzie, kde sa používali palice a guľaté predmety v hrách, ktoré by sme mohli prirovnať k modernému pozemnému hokeju.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">➜</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              Moderná história pozemného hokeja začína v Anglicku v 19. storočí, keď sa hra zorganizovala do pravidiel a štruktúr, ktoré dnes poznáme. V roku 1849 vznikol prvý oficiálny hokejový klub v Londýne a od tej doby sa hra rýchlo rozšírila po celom svete. V roku 1886 bola založená Asociácia pozemného hokeja, ktorá stanovila pravidlá a začala organizovať prvé oficiálne súťaže.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">➜</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              Pozemný hokej sa prvýkrát objavil na olympijských hrách v roku 1908 v Londýne, no od tej doby prešiel šport rôznymi zmenami, vrátane zavedenia umelej trávy na olympijských hrách v Mníchove v roku 1972, čo výrazne zmenilo dynamiku hry. Medzinárodná hokejová federácia (FIH) vznikla v roku 1924 a dnes riadi svetový pozemný hokej, vrátane Majstrovstiev sveta vonku a v hale a Olympijské hry či ďalšie prestížne turnaje.
            </p>
          </div>
        </div>

        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Pozemný hokej na Slovensku
        </h2>
        <div className="space-y-4 mb-12">
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">➜</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              Prvé stretnutie v pozemnom hokeji odohrané na Slovensku malo propagačný charakter. V Liptovskom Mikuláši sa v roku 1947 stretli dve vybrané pražské družstvá. V roku 1949 sa na Slovensku v Piešťanoch hral prvý medzinárodný turnaj a v tom istom roku bol založený klub Sokol Žilina a Spartak Kovosmalt Petržalka.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">➜</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              Za petržalský klub a majstrom ČSR sa stal v roku 1959 v kategórii družstiev starších dorastencov aj jeden z najlepších svetových brankárov všetkých čias v ľadovom hokeji Vlado Dzurilla.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-12">
          <div className="relative overflow-hidden" style={{ aspectRatio: "16/10", borderRadius: "6px" }}>
            <Image src="/images/historia-1.webp" alt="Vladimír Dzurilla" fill className="object-cover" sizes="(max-width: 900px) 50vw, 420px" />
          </div>
          <div className="relative overflow-hidden" style={{ aspectRatio: "16/10", borderRadius: "6px" }}>
            <Image src="/images/historia-2.webp" alt="Pozemný hokej v minulosti" fill className="object-cover" sizes="(max-width: 900px) 50vw, 420px" />
          </div>
        </div>

        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Začiatky pozemného hokeja
        </h2>
        <div className="space-y-4 mb-8">
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">➜</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              Československo hralo svoj prvý medzištátny zápas s Rakúskom v roku 1923 s výsledkom 1:3. K historickej chvíli došlo v roku 1925, keď sa pozemní hokejisti a ľadoví hokejisti dohodli, že vytvoria dva samostatné zväzy. Pred druhou svetovou vojnou sa hrali popri iných aj medzištátne zápasy s takými súpermi ako sú Afganistan (výsledok 2:2) alebo Japonsko (výsledok 0:2).
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">➜</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              Najväčšiu návštevu na medzištátnom zápase zažila v roku 1949 Praha, keď sa na Strahovský štadión 4. septembra 1949 prišlo pozrieť na stretnutie s Poľskom rekordných 40 tisíc divákov. Prvý medzištátny zápas na Slovensku sa hral v roku 1953 v Nitre. ČSR porazila Juhosláviu 2:1.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-8 mb-4">
          <div className="relative overflow-hidden" style={{ aspectRatio: "16/10", borderRadius: "6px" }}>
            <Image src="/images/historia-3.webp" alt="Ženský pozemný hokej" fill className="object-cover" sizes="(max-width: 900px) 50vw, 420px" />
          </div>
          <div className="relative overflow-hidden" style={{ aspectRatio: "16/10", borderRadius: "6px" }}>
            <Image src="/images/historia-4.webp" alt="Historický zápas" fill className="object-cover" sizes="(max-width: 900px) 50vw, 420px" />
          </div>
        </div>

        {/* PEM link */}
        <div className="mt-12 p-6" style={{ background: "linear-gradient(135deg, #051937 0%, #012d74 100%)", borderRadius: "8px" }}>
          <h3 className="font-bold text-white mb-2" style={{ fontSize: "16px" }}>Pohár európskych majstrov</h3>
          <p className="text-white/70 mb-4" style={{ fontSize: "13px", lineHeight: 1.7 }}>
            Slovenské kluby majú na európskej scéne dlhú tradíciu. Lokomotíva Rača, Šenkvice aj KPH Rača sa pravidelne zúčastňujú EuroHockey Club Championships od roku 1992. Ženy Lokomotívy Rača hrali dokonca najvyššiu úroveň — Club Cup.
          </p>
          <Link href="/sutaze/pem" className="inline-flex items-center gap-2 font-bold text-white transition-all hover:brightness-110" style={{ background: "#d80027", borderRadius: "20px", padding: "10px 20px", fontSize: "12px" }}>
            Kompletné výsledky PEM
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
