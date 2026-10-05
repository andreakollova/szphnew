import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Úspechy a ocenenia - Reprezentácia",
  description: "Kompletný prehľad medailí a výsledkov slovenských reprezentácií v pozemnom hokeji.",
};

function rc(r: string) { return r.includes("1.") ? "#D4A017" : r.includes("2.") ? "#8a8a8a" : r.includes("3.") ? "#CD7F32" : "#334155"; }

function Table({ data }: { data: { year: string; form: string; event: string; result: string }[] }) {
  return (
    <div className="overflow-x-auto mb-8">
      <table className="w-full text-sm" style={{ background: "#fff", borderRadius: "6px", border: "1px solid rgba(1,45,116,0.06)" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid rgba(1,45,116,0.08)" }}>
            <th className="px-4 py-3 text-left font-bold text-[#051937]" style={{ fontSize: "11px" }}>Rok</th>
            <th className="px-4 py-3 text-left font-bold text-[#051937]" style={{ fontSize: "11px" }}>Forma</th>
            <th className="px-4 py-3 text-left font-bold text-[#051937]" style={{ fontSize: "11px" }}>Súťaž a miesto</th>
            <th className="px-4 py-3 text-left font-bold text-[#051937]" style={{ fontSize: "11px" }}>Výsledok</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r, i) => (
            <tr key={i} style={{ borderBottom: "1px solid rgba(1,45,116,0.05)" }}>
              <td className="px-4 py-3 font-bold text-[#051937]" style={{ fontSize: "13px" }}>{r.year}</td>
              <td className="px-4 py-3 text-[#64748b]" style={{ fontSize: "13px" }}>{r.form}</td>
              <td className="px-4 py-3 text-[#334155]" style={{ fontSize: "13px" }}>{r.event}</td>
              <td className="px-4 py-3 font-bold" style={{ fontSize: "13px", color: rc(r.result) }}>{r.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function UspechyPage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[1100px] mx-auto">
          <span className="font-bold uppercase text-white mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>Reprezentácia</span>
          <h1 className="font-garet font-bold italic text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Úspechy a ocenenia</h1>
          <p className="text-white mt-3 max-w-xl" style={{ fontSize: "15px" }}>
            Kompletný prehľad medailí a výsledkov slovenských reprezentácií na medzinárodných súťažiach v pozemnom a halovom hokeji.
          </p>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 pt-12">

        {/* Olympijské striebro */}
        <div className="flex gap-4 p-6 mb-12" style={{ background: "linear-gradient(135deg, #051937 0%, #012d74 100%)", borderRadius: "8px" }}>
          <div className="shrink-0 pt-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo-olympics.png" alt="Olympijské hry" width={56} height={28} style={{ objectFit: "contain" }} />
          </div>
          <div>
            <h3 className="font-bold text-white mb-1" style={{ fontSize: "17px" }}>Olympijské striebro 1980 - Moskva</h3>
            <p className="text-white/80 leading-relaxed" style={{ fontSize: "13px" }}>
              Na Letných olympijských hrách v Moskve získali striebornú medailu tri Slovenky: Alena Kyselicová, Viera Podhányiová a Iveta Šranková. Asistentom trénerky bol Slovák Pavol Rosa. Medaila patrí reprezentácii Československa, no ide o významný úspech slovenských osobností pozemného hokeja.
            </p>
            <Link href="/novinky/reportaz-alena-kyselicova" className="inline-flex items-center gap-1.5 mt-3 font-bold text-white/70 hover:text-white transition-colors" style={{ fontSize: "11px" }}>
              Reportáž s Alenou Kyselicovou
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>

        {/* Muži - hala */}
        <h2 className="font-bold text-[#051937] mb-6" style={{ fontSize: "24px" }}>Muži - hala</h2>
        <Table data={[
          { year: "2026", form: "Championship II-A", event: "Sv. Ivan Zelina", result: "3. miesto" },
          { year: "2024", form: "Championship II-B", event: "Budapešť", result: "3. miesto" },
          { year: "2018", form: "Championship III", event: "Nikózia", result: "2. miesto" },
          { year: "2008", form: "Nations Trophy", event: "Kodaň", result: "3. miesto" },
        ]} />

        {/* Muži - vonku */}
        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>Muži - vonku</h2>
        <Table data={[
          { year: "2015", form: "Championship IV", event: "Vilnius", result: "1. miesto, postup" },
          { year: "2009", form: "Challenge II", event: "Bratislava", result: "2. miesto, postup" },
        ]} />

        {/* Ženy - hala */}
        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>Ženy - hala</h2>
        <Table data={[
          { year: "2022", form: "Championship III", event: "Bratislava", result: "2. miesto" },
          { year: "2018", form: "Championship III", event: "Apače", result: "2. miesto" },
          { year: "2010", form: "Nations Trophy", event: "Nymburk", result: "3. miesto" },
        ]} />

        {/* Ženy - vonku */}
        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>Ženy - vonku</h2>
        <Table data={[
          { year: "2022", form: "Kvalifikácia na ME", event: "Durham", result: "3. miesto, postup do Championship II" },
          { year: "2005", form: "Challenge", event: "Praha", result: "3. miesto" },
        ]} />

        {/* Juniori U21 - hala */}
        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>Juniori U21 - hala</h2>
        <Table data={[
          { year: "2025", form: "Championship II", event: "Lousada", result: "2. miesto" },
          { year: "2019", form: "Championship II", event: "Paredes", result: "2. miesto" },
          { year: "2017", form: "Championship II", event: "Puconci", result: "3. miesto" },
          { year: "2015", form: "Championship II", event: "Sv. Ivan Zelina", result: "3. miesto" },
          { year: "2013", form: "Championship II", event: "Bratislava", result: "3. miesto" },
          { year: "2007", form: "Trophy", event: "Miláno", result: "3. miesto" },
          { year: "2002", form: "Trophy", event: "Sopron", result: "3. miesto" },
          { year: "1998", form: "Trophy", event: "Bratislava", result: "2. miesto" },
        ]} />

        {/* Juniorky U21 - hala */}
        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>Juniorky U21 - hala</h2>
        <Table data={[
          { year: "2019", form: "Championship II", event: "Sv. Ivan Zelina", result: "2. miesto" },
          { year: "2011", form: "Championship II", event: "Lignano", result: "3. miesto" },
          { year: "2005", form: "Trophy", event: "Bratislava", result: "1. miesto" },
          { year: "2001", form: "Trophy", event: "Bratislava", result: "3. miesto" },
          { year: "1994", form: "ME", event: "Llodio", result: "3. miesto v Európe" },
        ]} />

        {/* Juniorky/Juniori - vonku */}
        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>Mládež - vonku</h2>
        <Table data={[
          { year: "2026", form: "Dievčatá U16, 5s Championship II", event: "Kutaisi", result: "3. miesto" },
          { year: "2022", form: "Chlapci U16, 5s Championship II", event: "Alanya", result: "2. miesto" },
          { year: "2014", form: "Muži U21, Championship III", event: "Hradec Králové", result: "3. miesto" },
          { year: "2012", form: "Muži U21, Championship III-B", event: "Bratislava", result: "2. miesto" },
          { year: "2010", form: "Muži U21, Championship III", event: "Atény", result: "3. miesto" },
          { year: "2008", form: "Ženy U21, Challenge", event: "Viedeň", result: "3. miesto" },
          { year: "2006", form: "Ženy U21, Challenge", event: "Albena", result: "3. miesto" },
        ]} />

        {/* Pannonia Cup */}
        <div className="rounded-lg p-5 mb-8" style={{ background: "rgba(0,120,253,0.04)", border: "1px solid rgba(0,120,253,0.1)" }}>
          <p className="text-[#334155]" style={{ fontSize: "13px", lineHeight: 1.7 }}>
            Z menších podujatí archív eviduje aj prvenstvá v halovom <strong>Pannonia Cupe</strong>: muži 2009, ženy 2002 a 2009.
          </p>
        </div>

        {/* Klubové */}
        <div className="mt-8 p-6 bg-white" style={{ borderRadius: "6px", border: "1px solid rgba(1,45,116,0.06)" }}>
          <h3 className="font-bold text-[#051937] mb-2" style={{ fontSize: "16px" }}>Klubové výsledky na európskej scéne</h3>
          <p className="text-[#334155] mb-4" style={{ fontSize: "14px", lineHeight: 1.7 }}>
            Slovenské kluby sa pravidelne zúčastňujú EuroHockey Club Championships od roku 1992. Kompletné výsledky nájdete na stránke PEM.
          </p>
          <Link href="/sutaze/pem" className="inline-flex items-center gap-2 font-bold text-[#012d74] hover:text-[#051937] transition-colors" style={{ fontSize: "13px" }}>
            PEM - Klubové ME
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>

        <div className="mt-8">
          <Link href="/reprezentacia" className="text-[#012d74] hover:underline" style={{ fontSize: "14px" }}>&#8592; Späť na prehľad reprezentácií</Link>
        </div>
      </div>
    </article>
  );
}
