import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vybavenie pre pozemný hokej | SZPH",
  description:
    "Kompletný prehľad vybavenia pre pozemný hokej - hokejka, loptička, chrániče, rukavice a brankárska výstroj.",
};

const equipment = [
  {
    name: "Hokejka (stick)",
    description:
      "Základný nástroj každého hráča pozemného hokeja. Hokejka sa skladá z rukoväte a čepele a je vyrobená z kompozitných materiálov, dreva alebo ich kombinácie. Dĺžka hokejky sa volí podľa výšky hráča - čepeľ by mala siahať približne po bedrový kĺb. Na rozdiel od ľadového hokeja sa v pozemnom hokejí hrá výlučne plochou stranou čepele. Hokejky sa líšia podľa pozície hráča - útočníci preferujú ľahšie modely, obrancovia tvrdšie.",
  },
  {
    name: "Loptička (ball)",
    description:
      "Oficiálna loptička pre pozemný hokej je tvrdá, plastová, s hladkým povrchom a hmotnosťou 156 - 163 gramov. Priemer loptičky je približne 7,1 - 7,5 cm. Pre halový pozemný hokej (indoor) sa používa ľahšia loptička s odlišnými vlastnosťami. Farba loptičky je zvyčajne biela, no pre lepšiu viditeľnosť na rôznych povrchoch sa používajú aj žlté alebo oranžové varianty.",
  },
  {
    name: "Chrániče holení (shin guards)",
    description:
      "Povinná súčasť výstroja každého hráča. Chrániče holení chránia predkolenie pred údermi hokejkou a loptičkou. Kvalitné chrániče pokrývajú oblasť od členku po koleno a sú vyrobené z tvrdeného plastu s vnútornou penou pre tlmenie nárazov. Pri výbere je dôležitá správna veľkosť, pohodlnosť a dostatočná fixácia na nohe.",
  },
  {
    name: "Rukavice",
    description:
      "Rukavice chránia ruky hráča pred údermi hokejkou a loptičkou a zároveň zlepšujú úchop hokejky. Pre hráčov v poli sa používajú ľahké rukavice s výstužou na chrbtovej strane ruky. Brankári nosia špeciálne hrubšie rukavice, ktoré poskytujú vyššiu ochranu pri zákrokoch. Niektorí hráči používajú len rukavicu na ľavú ruku, ktorá je vystavená väčšiemu riziku kontaktu.",
  },
  {
    name: "Brankárska výstroj",
    description:
      "Brankár pozemného hokeja má najkomplexnejšiu výstroj na ihrisku. Zahŕňa helmu s celotvárovou mriežkou, chrániče hrude a ramien, vyrážačku a lapačku, nohavice s výstužou, betóny (legguards) na nohy a špeciálne topánky (kickers). Brankárska výstroj musí spĺňať bezpečnostné štandardy FIH (Medzinárodnej hokejovej federácie) a poskytovať ochranu pri strele, ktorá môže dosiahnuť rýchlosť aj nad 140 km/h.",
  },
  {
    name: "Ochranné okuliare a chránič zubov",
    description:
      "Ochranné okuliare sú povinné pri štandardných situáciách ako rohové údery (penalty corners) pre hráčov v obrannom postavení. Chránič zubov je odporúčaný pre všetkých hráčov a v mnohých súťažiach je povinný pre mládežnícke kategórie. Tieto doplnky výrazne znižujú riziko zranení tváre.",
  },
];

export default function VybaveniePage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span
            className="font-bold uppercase text-white mb-4 block"
            style={{ fontSize: "10px", letterSpacing: "0.14em" }}
          >
            Pozemný hokej
          </span>
          <h1
            className="font-garet font-bold italic text-white leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Vybavenie pre pozemný hokej
          </h1>
          <p
            className="text-white mt-3 max-w-xl"
            style={{ fontSize: "15px" }}
          >
            Prehľad základného a doplnkového vybavenia, ktoré potrebujete na
            ihrisko.
          </p>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <p
          className="text-[#334155] leading-relaxed mb-10"
          style={{ fontSize: "15px" }}
        >
          Pozemný hokej patrí medzi najrýchlejšie kolektívne športy na svete.
          Správne vybavenie je kľúčové nielen pre výkon, ale predovšetkým pre
          bezpečnosť hráčov na ihrisku. Nižšie nájdete prehľad základného
          vybavenia, ktoré potrebuje každý hráč pozemného hokeja.
        </p>

        <div className="space-y-8">
          {equipment.map((item, i) => (
            <div
              key={i}
              className="rounded-lg border border-[#e2e8f0] bg-white p-8"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
            >
              <h2
                className="font-bold text-[#051937] mb-3"
                style={{ fontSize: "24px" }}
              >
                {item.name}
              </h2>
              <p
                className="text-[#334155] leading-relaxed"
                style={{ fontSize: "15px" }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div
          className="mt-12 rounded-lg border border-[#e2e8f0] bg-white p-8"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
        >
          <h2
            className="font-bold text-[#051937] mb-3"
            style={{ fontSize: "24px" }}
          >
            Kde kúpiť vybavenie?
          </h2>
          <p
            className="text-[#334155] leading-relaxed"
            style={{ fontSize: "15px" }}
          >
            Vybavenie pre pozemný hokej je možné zakúpiť v špecializovaných
            predajniach alebo cez online obchody. Pre odporúčania ohľadom
            značiek a predajcov sa obráťte na svoj klub alebo nás kontaktujte na{" "}
            <a
              href="mailto:szph@szph.sk"
              className="font-bold text-[#012d74] hover:underline"
            >
              szph@szph.sk
            </a>
            .
          </p>
        </div>
      </div>
    </article>
  );
}
