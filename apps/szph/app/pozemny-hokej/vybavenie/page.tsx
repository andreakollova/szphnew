import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vybavenie pre pozemný hokej",
  description: "Kompletný prehľad vybavenia pre pozemný hokej - hokejka, loptička, chrániče, rukavice a brankárska výstroj.",
};

const EQUIPMENT = [
  {
    name: "Hokejka",
    image: "/images/vybavenie-hokejka.webp",
    description: "Základný nástroj každého hráča. Hokejka sa skladá z rukoväte a čepele a je vyrobená z kompozitných materiálov, dreva alebo ich kombinácie. Dĺžka sa volí podľa výšky hráča. V pozemnom hokeji sa hrá výlučne plochou stranou čepele.",
  },
  {
    name: "Loptička",
    image: "/images/vybavenie-lopticka.webp",
    description: "Oficiálna loptička je tvrdá, plastová, s hmotnosťou 156 - 163 gramov a priemerom 7,1 - 7,5 cm. Pre halový hokej sa používa ľahšia loptička. Farba je zvyčajne biela, no používajú sa aj žlté alebo oranžové varianty.",
  },
  {
    name: "Chrániče holení",
    image: "/images/vybavenie-holene.webp",
    description: "Povinná súčasť výstroja. Chrániče chránia predkolenie pred údermi hokejkou a loptičkou. Kvalitné chrániče pokrývajú oblasť od členku po koleno a sú vyrobené z tvrdeného plastu s vnútornou penou.",
  },
  {
    name: "Rukavice",
    image: "/images/vybavenie-rukavica.webp",
    description: "Chránia ruky hráča a zlepšujú úchop hokejky. Pre hráčov v poli sa používajú ľahké rukavice s výstužou na chrbtovej strane ruky. Niektorí hráči používajú len rukavicu na ľavú ruku.",
  },
  {
    name: "Chránič zubov",
    image: "/images/vybavenie-zuby.webp",
    description: "Povinná súčasť výstroja počas zápasov. Chránič zubov výrazne znižuje riziko zranení tváre a zubov. V mnohých súťažiach je povinný pre všetky kategórie.",
  },
  {
    name: "Brankárska výstroj",
    image: "/images/vybavenie-brankar.webp",
    description: "Brankár má najkomplexnejšiu výstroj. Zahŕňa helmu s mriežkou, chrániče hrude, vyrážačku a lapačku, nohavice s výstužou, betóny a špeciálne topánky. Výstroj musí spĺňať bezpečnostné štandardy FIH.",
  },
];

export default function VybaveniePage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span className="font-bold uppercase text-white mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>
            Pozemný hokej
          </span>
          <h1 className="font-garet font-bold italic text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Vybavenie pre pozemný hokej
          </h1>
          <p className="text-white mt-3 max-w-xl" style={{ fontSize: "15px" }}>
            Prehľad základného a doplnkového vybavenia, ktoré potrebujete na ihrisko.
          </p>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 pt-10">
        {/* Info box */}
        <div className="flex gap-4 p-6 mb-10" style={{ background: "rgba(0,120,253,0.04)", borderRadius: "8px", border: "1px solid rgba(0,120,253,0.12)" }}>
          <div className="shrink-0 flex items-start pt-0.5">
            <svg className="h-5 w-5 text-[#0078fd]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-[#051937] mb-1" style={{ fontSize: "14px" }}>Nemusíte si nič kupovať na začiatok</p>
            <p className="text-[#334155] leading-relaxed" style={{ fontSize: "13px" }}>
              Ak s pozemným hokejom začínate, nemusíte si hneď zaobstarávať vlastné vybavenie. V každom klube na Slovensku vám hokejku aj chrániče na prvé tréningy požičajú. Stačí prísť v športovom oblečení a s vodou. O nákupe vlastného vybavenia sa poraďte s trénerom, keď sa rozhodnete pokračovať.
            </p>
            <Link href="/zacni-hrat/hrac" className="inline-flex items-center gap-1.5 mt-3 font-bold text-[#012d74] hover:text-[#051937] transition-colors" style={{ fontSize: "12px" }}>
              Chcem začať hrať
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>

        {/* Equipment grid */}
        <div className="space-y-6">
          {EQUIPMENT.map((item, i) => (
            <div key={i} className="flex gap-6 bg-white p-6 items-center" style={{ borderRadius: "6px", border: "1px solid rgba(1,45,116,0.06)" }}>
              <div className="shrink-0 flex items-center justify-center" style={{ width: 120, height: 120 }}>
                <Image src={item.image} alt={item.name} width={120} height={120} className="object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-[#051937] mb-2" style={{ fontSize: "20px" }}>{item.name}</h2>
                <p className="text-[#334155] leading-relaxed" style={{ fontSize: "14px" }}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Kde kúpiť */}
        <div className="mt-10 p-6 bg-white" style={{ borderRadius: "6px", border: "1px solid rgba(1,45,116,0.06)" }}>
          <h2 className="font-bold text-[#051937] mb-2" style={{ fontSize: "20px" }}>Kde kúpiť vybavenie?</h2>
          <p className="text-[#334155] leading-relaxed" style={{ fontSize: "14px" }}>
            Vybavenie pre pozemný hokej je možné zakúpiť v špecializovaných predajniach alebo cez online obchody. Pre odporúčania ohľadom značiek a predajcov sa obráťte na svoj klub alebo nás kontaktujte na{" "}
            <a href="mailto:szph@szph.sk" className="font-bold text-[#012d74] hover:underline">szph@szph.sk</a>.
          </p>
        </div>
      </div>
    </article>
  );
}
