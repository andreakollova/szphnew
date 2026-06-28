import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chcem začať s pozemným hokejom",
  description: "Ako začať s pozemným hokejom — pravidlá, výstroj, techniky, tréningy a tipy pre začiatočníkov.",
};

export default function ZacniHratPage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span className="font-bold uppercase text-white/40 mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>
            Začni hrať
          </span>
          <h1 className="font-bold text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Chcem začať
          </h1>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <h2 className="font-bold text-[#051937] mt-0 mb-4" style={{ fontSize: "24px" }}>
          Ako začať s pozemným hokejom
        </h2>
        <p className="text-[#334155] mb-4" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Ak vás zaujal pozemný hokej a chcete sa naučiť základy tohto krásneho, dynamického, olympijského športu, je tu výborná príležitosť nahliadnuť do zákutia pozemného hokeja. Pozemný hokej je síce fyzicky náročný a technicky zameraný šport, ale so správnym prístupom sa ho môže naučiť každý, kto má chuť na športovú výzvu a rád pracuje v tíme.
        </p>
        <p className="text-[#334155] mb-10" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Začať s pozemným hokejom je skvelá príležitosť pre ľudí všetkých vekových kategórií pre mužov a ženy. Tento šport podporuje tímovú prácu, rozvíja kondíciu a techniku a poskytuje skvelé spoločenské zážitky. S pomocou tréningov, základného výstroja a odhodlania sa môžete rýchlo zlepšovať a užívať si všetky výhody, ktoré pozemný hokej ponúka.
        </p>

        {[
          {
            num: "1",
            title: "Zoznámte sa so športom a pravidlami",
            text: "Prvým krokom je pochopiť, ako sa hra hrá, aké sú jej základné pravidlá a aká je dynamika na ihrisku. Pozemný hokej má síce jednoduchý cieľ (streliť viac gólov ako súper), ale existuje niekoľko pravidiel, ktoré sú špecifické a môžu sa líšiť od iných športov, napríklad:",
            bullets: [
              "Používa sa iba plochá strana hokejky.",
              "Gól môže byť strelený iba z vnútra útočného kruhu.",
              "Dotyk lopty nohou alebo inou časťou tela (okrem brankára) je zakázaný.",
            ],
            footer: "Pozrite si online videá, zápasy alebo pravidlá z oficiálnych zdrojov, aby ste získali základný prehľad o tom, ako sa hrá.",
          },
          {
            num: "2",
            title: "Nájdite si miestny klub alebo tréningovú skupinu",
            text: "Najlepší spôsob, ako začať, je pripojiť sa k miestnemu hokejovému klubu alebo tréningovej skupine pre začiatočníkov, prípadne ak sa jedná o dieťa vyhľadať si krúžok na miestnej základnej škole. Väčšina klubov má programy pre nováčikov a ponúka tréningy pre rôzne vekové a výkonnostné skupiny. Hľadajte tieto možnosti vo vašom meste alebo regióne a prihláste sa do klubu alebo na úvodný tréning. Mnohé kluby tiež umožňujú požičiavanie vybavenia, čo vám umožní začať bez toho, aby ste museli okamžite kupovať všetok potrebný výstroj.",
          },
          {
            num: "3",
            title: "Základná výstroj pre začiatočníkov",
            text: "Aj keď mnohé kluby požičiavajú hokejky a základnú výstroj, je dobré vedieť, čo budete potrebovať, ak sa rozhodnete investovať do vlastného vybavenia:",
            items: [
              { name: "Hokejka", desc: "Hokejky sú kľúčovým nástrojom hráča. Pre začiatočníkov je dôležité vybrať si správnu dĺžku a váhu hokejky. Hokejka by vám mala siahať približne po pupok. Začnite s hokejkou, ktorá je pohodlná a ľahká na ovládanie." },
              { name: "Chrániče holení", desc: "Keďže lopta je tvrdá a pohybuje sa vysokou rýchlosťou, chrániče holení sú nevyhnutné na ochranu pred zraneniami." },
              { name: "Chránič zubov", desc: "Aj keď sa fauly v pozemnom hokeji prísne trestajú, riziko zraneniu tu je. Chránič zubov ochráni váš chrup. Chránič chrupu je bežne dostupný v športových obchodoch." },
              { name: "Vhodná obuv", desc: 'Na pozemný hokej sa používa športová obuv so stupeľmi. Na umelej tráve sú potrebné topánky, ktoré zabránia pošmyknutiu a zabezpečia rýchle zmeny smeru — tzv. "tarfy".' },
            ],
          },
          {
            num: "4",
            title: "Zamerajte sa na základy techniky",
            text: "Keď začínate s pozemným hokejom, zamerajte sa na osvojenie si základných techník:",
            items: [
              { name: "Dribling", desc: "Dribling je spôsob, ako kontrolovať loptu pri pohybe po ihrisku. Naučte sa jemne viesť loptu pomocou plochej strany hokejky, pričom udržujte stabilnú kontrolu nad loptou." },
              { name: "Prihrávanie", desc: "Prihrávka je kľúčová pre úspešnú tímovú hru. Naučte sa rôzne typy prihrávok, ako sú krátke, rýchle prihrávky a dlhé údery, ktoré pomáhajú preniesť hru na inú stranu ihriska." },
              { name: "Streľba", desc: "Naučte sa, ako efektívne strieľať na bránku z rôznych pozícií. Cvičenie streľby z útočného kruhu vám pomôže zlepšiť presnosť a rýchlosť." },
              { name: "Obrana", desc: "Dobrý obranca musí vedieť, ako efektívne brániť protihráča bez toho, aby spáchal faul. Trénujte správne umiestnenie tela a hokejky na blokovanie prihrávok a streľby." },
            ],
          },
          {
            num: "5",
            title: "Trénujte kondičnú prípravu a koordináciu",
            text: "Pozemný hokej je fyzicky náročný šport, ktorý si vyžaduje vytrvalosť, rýchlosť a dobrú koordináciu. Aby ste boli na ihrisku úspešní, je dôležité venovať sa aj kondičnému tréningu:",
            items: [
              { name: "Vytrvalosť", desc: "Behanie, intervalový tréning a kardiovaskulárne cvičenia vám pomôžu zlepšiť vytrvalosť, aby ste vydržali celé zápasy." },
              { name: "Sila a stabilita", desc: "Silový tréning zlepší vašu schopnosť tlačiť sa proti súperom a udržať stabilitu pri obranných a útočných manévroch." },
              { name: "Rýchlosť a reakcie", desc: "Rýchle štarty, zmeny smeru a schopnosť reagovať na hru sú nevyhnutné. Cvičte rýchlostné cvičenia a zlepšujte svoju reakčnú dobu." },
            ],
          },
          {
            num: "6",
            title: "Zúčastnite sa tréningov a zápasov",
            text: "Keď máte za sebou niekoľko tréningov, skúste sa zapojiť do priateľských zápasov. Ak navštevujete miestny klub, ten vám pomôže a zaradí vás do skupiny, kde by ste mohli hrávať zápasy. Týmto spôsobom získate skúsenosti a lepšie pochopíte dynamiku hry. Zúčastnením sa na zápasoch sa tiež naučíte, ako efektívne komunikovať so spoluhráčmi a reagovať na rôzne herné situácie.",
          },
          {
            num: "7",
            title: "Buďte trpezliví a učte sa z chýb",
            text: "Ako pri každom športe, aj pri pozemnom hokeji je dôležitá trpezlivosť. Učenie sa správnych techník a získavanie kondície si vyžaduje čas. Nebojte sa robiť chyby a poučte sa z nich. Čím viac budete trénovať a hrať, tým rýchlejšie budete napredovať.",
          },
        ].map((section) => (
          <div key={section.num} className="mb-10">
            <div className="flex items-start gap-4 mb-4">
              <div className="shrink-0 flex items-center justify-center rounded-full font-black text-white" style={{ width: "36px", height: "36px", background: "#C8102E", fontSize: "14px" }}>
                {section.num}
              </div>
              <h3 className="font-bold text-[#051937] pt-1.5" style={{ fontSize: "18px" }}>
                {section.title}
              </h3>
            </div>
            <div className="pl-[52px]">
              <p className="text-[#334155] mb-4" style={{ fontSize: "15px", lineHeight: 1.8 }}>{section.text}</p>
              {section.bullets && (
                <ul className="space-y-2 mb-4">
                  {section.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span className="text-[#051937]/30 font-bold shrink-0">–</span>
                      <p className="text-[#334155]" style={{ fontSize: "14px", lineHeight: 1.7 }}>{b}</p>
                    </li>
                  ))}
                </ul>
              )}
              {section.footer && (
                <p className="text-[#334155]" style={{ fontSize: "14px", lineHeight: 1.7 }}>{section.footer}</p>
              )}
              {section.items && (
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <div key={item.name} className="rounded-2xl p-5" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
                      <h4 className="font-bold text-[#051937] mb-1" style={{ fontSize: "14px" }}>{item.name}</h4>
                      <p className="text-[#334155]" style={{ fontSize: "13px", lineHeight: 1.7 }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
