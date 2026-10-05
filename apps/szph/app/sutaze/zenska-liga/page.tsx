import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Liga žien - Slovenský pozemnohokejový zväz",
  description: "Liga žien je najvyššia ženská súťaž v pozemnom hokeji na Slovensku. Informácie o formáte, kluboch a priebehu súťaže.",
};

export default function ZenskaLigaPage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      {/* Hero */}
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[1100px] mx-auto">
          <Link href="/sutaze" className="inline-flex items-center gap-2 font-bold text-white hover:text-white transition-colors mb-6" style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}><svg className="h-3 w-3 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>Späť</Link>
          <span className="font-bold uppercase text-white mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>
            Súťaže
          </span>
          <h1 className="font-garet font-bold italic text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Liga žien
          </h1>
          <p className="text-white mt-3 max-w-xl" style={{ fontSize: "15px" }}>
            Najvyššia ženská súťaž v pozemnom hokeji na Slovensku.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1100px] mx-auto px-6 pt-12">
        <p className="text-[#334155] mb-8" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Liga žien je hlavná súťaž ženského pozemného hokeja na Slovensku. Reprezentuje najvyššiu úroveň ženského hokeja v krajine a každú sezónu v nej súťažia najlepšie ženské tímy o titul Majsteriek Slovenska. Súťaž organizuje Slovenský pozemnohokejový zväz.
        </p>

        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Formát a priebeh
        </h2>
        <p className="text-[#334155] mb-6" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Liga žien prebieha v pozemnej aj halovej forme. Tímy hrajú systémom každá s každou, s domácimi aj vonkajšími zápasmi. Na základe výsledkov základnej časti sa určuje poradie a príp. play-off. Formát sa prispôsobuje počtu prihlásených tímov v danej sezóne.
        </p>

        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Pozemná a halová sezóna
        </h2>
        <div className="space-y-4 mb-8">
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10148;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Sezóna - pozemný hokej:</strong> Hrá sa na jar a na jeseň na ihriskách s umelou trávou. Zápasy prebiehajú v plnom formáte 11 na 11.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10148;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Sezóna - halový hokej:</strong> Zimná časť súťaže prebieha v športových halách vo formáte 6 na 6 s odlišnými pravidlami.
            </p>
          </div>
        </div>

        {/* Fotogaléria */}
        <div className="grid grid-cols-3 gap-3 my-10">
          <div className="relative overflow-hidden" style={{ aspectRatio: "16/10", borderRadius: "6px" }}>
            <img src="/images/hala-zeny-1.jpg" alt="Liga žien" className="w-full h-full object-cover" />
          </div>
          <div className="relative overflow-hidden" style={{ aspectRatio: "16/10", borderRadius: "6px" }}>
            <img src="/images/hala-zeny-2.jpg" alt="Liga žien" className="w-full h-full object-cover" />
          </div>
          <div className="relative overflow-hidden" style={{ aspectRatio: "16/10", borderRadius: "6px" }}>
            <img src="/images/hala-zeny-3.jpg" alt="Liga žien" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Majstri ligy */}
        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>Majstri ligy</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-5" style={{ borderRadius: "6px", border: "1px solid rgba(1,45,116,0.06)" }}>
            <p className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider mb-3">Pozemný hokej</p>
            <div className="space-y-2">
              {[{ year: "2026", team: "KPH HOKO Zlaté Moravce" },{ year: "2025", team: "KPH Rača" },{ year: "2024", team: "KPH Rača" },{ year: "2023", team: "KPH Rača" },{ year: "2022", team: "KPH Rača" }].map((r) => (
                <div key={r.year} className="flex items-center justify-between py-1.5" style={{ borderBottom: "1px solid rgba(1,45,116,0.05)" }}>
                  <span className="font-bold text-[#012d74]" style={{ fontSize: "14px" }}>{r.year}</span>
                  <span className="font-semibold text-[#051937]" style={{ fontSize: "14px" }}>{r.team}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-5" style={{ borderRadius: "6px", border: "1px solid rgba(1,45,116,0.06)" }}>
            <p className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider mb-3">Halový hokej</p>
            <div className="space-y-2">
              {[{ year: "2026", team: "KPH Rača" },{ year: "2025", team: "KPH HOKO Zlaté Moravce" },{ year: "2024", team: "KPH Rača" },{ year: "2023", team: "KPH Rača" },{ year: "2022", team: "KPH Rača" }].map((r) => (
                <div key={r.year} className="flex items-center justify-between py-1.5" style={{ borderBottom: "1px solid rgba(1,45,116,0.05)" }}>
                  <span className="font-bold text-[#012d74]" style={{ fontSize: "14px" }}>{r.year}</span>
                  <span className="font-semibold text-[#051937]" style={{ fontSize: "14px" }}>{r.team}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Rozvoj ženského hokeja
        </h2>
        <p className="text-[#334155] mb-8" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Ženský pozemný hokej má na Slovensku rastúce zastúpenie. Slovenský pozemnohokejový zväz aktívne podporuje rozvoj ženského hokeja prostredníctvom súťaží, tréningových programov a zapojenia hráčok do medzinárodných turnajov. Hráčky z Extraligy tvoria jadro ženskej reprezentácie Slovenska.
        </p>

        <div className="rounded-lg p-6 mb-8" style={{ background: "#051937" }}>
          <h3 className="font-bold text-white mb-3" style={{ fontSize: "16px" }}>Reprezentácia žien</h3>
          <p className="text-white" style={{ fontSize: "14px", lineHeight: 1.8 }}>
            Ženská reprezentácia Slovenska sa zúčastňuje medzinárodných podujatí pod záštitou FIH a EHF. Extraliga je základom pre selekciu a prípravu reprezentantiek na medzinárodné súťaže.
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
