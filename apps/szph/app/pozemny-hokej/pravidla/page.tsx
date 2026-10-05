import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pravidlá pozemného hokeja — kompletný prehľad",
  description:
    "Kompletné pravidlá pozemného hokeja podľa FIH — ihrisko, hráči, karty, trestný roh, nájazdy, halový hokej a ďalšie.",
};

export default function PravidlaPage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      {/* Hero */}
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/pozemny-hokej" className="font-bold uppercase text-white/60 hover:text-white transition-colors" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>
              O športe
            </Link>
            <span className="text-white/40" style={{ fontSize: "10px" }}>/</span>
            <span className="font-bold uppercase text-white" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>
              Pravidlá
            </span>
          </div>
          <h1 className="font-bold text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Pravidlá pozemného hokeja
          </h1>
          <p className="text-white/70 mt-4" style={{ fontSize: "16px", lineHeight: 1.7, maxWidth: "700px" }}>
            Kompletný prehľad pravidiel podľa Medzinárodnej hokejovej federácie (FIH), ktorá riadi pozemný hokej na celom svete.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1100px] mx-auto px-6 pt-12">

        {/* ───────────── 1. Základné pravidlá ───────────── */}
        <h2 className="font-bold text-[#051937] mt-0 mb-6" style={{ fontSize: "24px" }}>
          Základné pravidlá
        </h2>
        <p className="text-[#334155] mb-6" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Pozemný hokej je rýchly, dynamický a technicky náročný tímový šport. Pravidlá sú jednoduché, no hra vyžaduje výnimočnú fyzickú kondíciu, techniku a tímovú spoluprácu.
        </p>
        <div className="space-y-4 mb-12">
          {[
            "Na ihrisku stojí 11 hráčov za každý tím — 1 brankár a 10 hráčov v poli. Pri mládežníckych kategóriách sa hrá 4 na 4 alebo 5 na 5 s upravenými pravidlami.",
            "Zápas trvá 60 minút, rozdelených do 4 štvrtín po 15 minút. Medzi štvrtinami sú prestávky.",
            "Gól je platný iba vtedy, ak útočiaci hráč zasiahne loptu z vnútra útočného kruhu (polkruh pred bránkou) a lopta úplne prejde za bránkovú čiaru.",
            "Lopta sa smie hrať výhradne plochou stranou hokejky. Používanie opačnej strany je priestupok (faul).",
            "Brankár je jediný hráč, ktorý smie použiť celé telo na zastavenie lopty — má špeciálnu výstroj vrátane helmy, chráničov a rukavíc.",
            "Chránič na zuby a chrániče holení sú povinné pre všetkých hráčov počas zápasov.",
          ].map((text, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="text-[#012d74] font-bold shrink-0">➜</span>
              <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>{text}</p>
            </div>
          ))}
        </div>

        {/* ───────────── 2. Ihrisko ───────────── */}
        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Ihrisko
        </h2>
        <p className="text-[#334155] mb-6" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Pozemný hokej sa hrá výhradne na umelej tráve (tzv. astroturf), ktorá zabezpečuje rovnomerný a rýchly pohyb lopty. Pred zápasmi sa ihrisko poleje vodou, čo ešte viac zrýchľuje hru.
        </p>
        <div className="space-y-4 mb-6">
          {[
            { label: "Rozmery", text: "91,4 metra na dĺžku a 55 metrov na šírku — podobné futbalovému ihrisku." },
            { label: "Bránka", text: "Má rovnaké rozmery ako hádzanárska bránka — šírka 3,66 m a výška 2,14 m." },
            { label: "Útočný kruh", text: "Polkruhová oblasť pred každou bránkou s polomerom 14,63 m. Góly sa môžu strieľať iba z tejto zóny." },
            { label: "Značky", text: "Na ihrisku sú vyznačené stredová čiara, štvrtinové čiary (na 22,9 m od každej zadnej čiary) a trestné body." },
            { label: "Trestný bod", text: "Nachádza sa 6,4 m od stredu bránky — z neho sa vykonáva trestné strieľanie." },
          ].map((item) => (
            <div key={item.label} className="flex gap-3 items-start">
              <span className="text-[#012d74] font-bold shrink-0">➜</span>
              <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
                <strong>{item.label}:</strong> {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* Foto — vonkajší hokej */}
        <div className="grid grid-cols-2 gap-3 my-10">
          <div className="relative overflow-hidden" style={{ aspectRatio: "16/10", borderRadius: "6px" }}>
            <Image src="/images/vonku-1.jpg" alt="Vonkajší pozemný hokej — ihrisko" fill className="object-cover" sizes="(max-width: 900px) 50vw, 500px" />
          </div>
          <div className="relative overflow-hidden" style={{ aspectRatio: "16/10", borderRadius: "6px" }}>
            <Image src="/images/vonku-2.jpg" alt="Vonkajší pozemný hokej — zápas" fill className="object-cover" sizes="(max-width: 900px) 50vw, 500px" />
          </div>
        </div>

        {/* ───────────── 3. Hráči a pozície ───────────── */}
        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Hráči a pozície
        </h2>
        <p className="text-[#334155] mb-6" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Každý tím má na ihrisku 11 hráčov. Pozície sú podobné ako vo futbale a každá má svoju špecifickú úlohu.
        </p>
        <div className="space-y-4 mb-6">
          {[
            { label: "Brankár (goalkeeper)", text: "Stráži bránku a je jediný hráč, ktorý môže použiť celé telo na zastavenie lopty. Nosí špeciálnu výstroj — helmu, chrániče nôh, tela a veľké rukavice." },
            { label: "Obrancovia (defenders)", text: "Zvyčajne 3–4 hráči, ktorí bránia vlastný kruh a zabraňujú súperovi v streleckých pozíciách. Sú kľúčoví pri rozohrávaní malých rohov." },
            { label: "Záložníci (midfielders)", text: "Spájajú obranu s útokom, pokrývajú najväčšiu plochu ihriska. Musia mať vynikajúcu kondíciu a prehľad v hre." },
            { label: "Útočníci (forwards)", text: "Ich hlavnou úlohou je skórovať. Pohybujú sa prevažne v útočnej štvrtine a hľadajú príležitosti na streľbu z kruhu." },
          ].map((item) => (
            <div key={item.label} className="flex gap-3 items-start">
              <span className="text-[#012d74] font-bold shrink-0">➜</span>
              <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
                <strong>{item.label}</strong> — {item.text}
              </p>
            </div>
          ))}
        </div>
        <div className="rounded-lg p-6 mb-12" style={{ background: "#051937" }}>
          <h3 className="font-bold text-white mb-3" style={{ fontSize: "16px" }}>Striedania</h3>
          <p className="text-white/90" style={{ fontSize: "14px", lineHeight: 1.8 }}>
            V pozemnom hokeji je počet striedaní neobmedzený. Hráči sa môžu striedať kedykoľvek počas hry, ale musia dodržať pravidlo — hráč vstupujúci na ihrisko nesmie vstúpiť, kým striedaný hráč neopustí ihrisko. Striedania prebiehajú pri stredovej čiare.
          </p>
        </div>

        {/* ───────────── 4. Priebeh zápasu ───────────── */}
        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Priebeh zápasu
        </h2>
        <div className="space-y-4 mb-12">
          {[
            "Zápas sa skladá zo 4 štvrtín, každá trvá 15 minút — spolu 60 minút čistého hracieho času.",
            "Po 1. a 3. štvrtine nasleduje 2-minútová prestávka. Polčasová prestávka (po 2. štvrtine) trvá 5 minút.",
            "Pozemný hokej sa hrá na čistý čas — rozhodca zastavuje hodiny pri prerušení hry (zranenie, karty, trestný roh a pod.).",
            "Neexistuje žiadne nadstavovanie ani predlžovanie. Čas je presný a po uplynutí sa hra končí.",
            "Každý polčas začína výhodzom zo stredu ihriska. Po góle sa hra takisto obnovuje výhodzom zo stredu.",
            "Ak sa v play-off zápase musí určiť víťaz a zápas skončil nerozhodne, nasledujú nájazdy (shootout).",
          ].map((text, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="text-[#012d74] font-bold shrink-0">➜</span>
              <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>{text}</p>
            </div>
          ))}
        </div>

        {/* ───────────── 5. Karty a tresty ───────────── */}
        <h2 className="font-bold text-[#051937] mt-12 mb-4" style={{ fontSize: "24px" }}>
          Karty a tresty
        </h2>
        <p className="text-[#334155] mb-6" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Rozhodcovia môžu počas zápasu udeliť hráčom kartu za porušenie pravidiel. Pozemný hokej pozná tri typy kariet:
        </p>
        <div className="space-y-4 mb-6">
          <div className="rounded-lg p-6 flex gap-4 items-start" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
            <div className="shrink-0 rounded-lg flex items-center justify-center" style={{ width: "36px", height: "48px", background: "#22c55e" }} />
            <div>
              <p className="font-bold text-[#051937] mb-1" style={{ fontSize: "15px" }}>Zelená karta — 2 minúty</p>
              <p className="text-[#334155]" style={{ fontSize: "14px", lineHeight: 1.8 }}>
                Udeľuje sa za menšie priestupky alebo ako varovanie. Hráč musí na 2 minúty opustiť ihrisko a jeho tím hrá počas tohto času s jedným hráčom menej. Dve zelené karty pre toho istého hráča sa rovnajú žltej karte (okrem situácie, keď hráč dostal kartu v pozícii kapitána).
              </p>
            </div>
          </div>
          <div className="rounded-lg p-6 flex gap-4 items-start" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
            <div className="shrink-0 rounded-lg flex items-center justify-center" style={{ width: "36px", height: "48px", background: "#eab308" }} />
            <div>
              <p className="font-bold text-[#051937] mb-1" style={{ fontSize: "15px" }}>Žltá karta — 5 až 10 minút</p>
              <p className="text-[#334155]" style={{ fontSize: "14px", lineHeight: 1.8 }}>
                Udeľuje sa za závažnejšie priestupky. Hráč musí opustiť ihrisko minimálne na 5 minút, pri hrubších fauloch až na 10 minút. Dve žlté karty pre toho istého hráča znamenajú automatickú červenú kartu (s výnimkou karty v pozícii kapitána).
              </p>
            </div>
          </div>
          <div className="rounded-lg p-6 flex gap-4 items-start" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
            <div className="shrink-0 rounded-lg flex items-center justify-center" style={{ width: "36px", height: "48px", background: "#ef4444" }} />
            <div>
              <p className="font-bold text-[#051937] mb-1" style={{ fontSize: "15px" }}>Červená karta — trvalé vylúčenie</p>
              <p className="text-[#334155]" style={{ fontSize: "14px", lineHeight: 1.8 }}>
                Udeľuje sa za veľmi vážne priestupky, nebezpečnú hru alebo opakované porušovanie pravidiel. Hráč musí natrvalo opustiť ihrisko a nemôže byť nahradený. Tím dohrá zápas s menším počtom hráčov. V pozemnom hokeji sa červené karty udeľujú výnimočne.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg p-6 mb-12" style={{ background: "#051937" }}>
          <h3 className="font-bold text-white mb-3" style={{ fontSize: "16px" }}>Ako karty eskalujú</h3>
          <p className="text-white/90" style={{ fontSize: "14px", lineHeight: 1.8 }}>
            2 zelené karty = automatická žltá karta. 2 žlté karty = automatická červená karta. Pri červenej karte hráč už nemôže pokračovať v zápase a jeho tím hrá do konca oslabený. Kartový systém je navrhnutý tak, aby postupne sprísňoval tresty za opakované porušovanie pravidiel.
          </p>
        </div>

        {/* ───────────── 6. Trestný roh (penalty corner) ───────────── */}
        <h2 className="font-bold text-[#051937] mt-12 mb-4" style={{ fontSize: "24px" }}>
          Trestný roh (penalty corner)
        </h2>
        <p className="text-[#334155] mb-6" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Trestný roh, v hokeji často nazývaný „malý roh", je jednou z najdôležitejších štandardných situácií. Je to veľká príležitosť na skórovanie pre útočiaci tím.
        </p>

        <h3 className="font-bold text-[#051937] mt-8 mb-4" style={{ fontSize: "18px" }}>
          Kedy sa udeľuje trestný roh?
        </h3>
        <div className="space-y-4 mb-6">
          {[
            "Neúmyselný faul obrancu vo vlastnom kruhu, ktorý priamo nezabránil gólu.",
            "Úmyselný faul obrancu vo vlastnej štvrtine ihriska.",
            "Zámerné hranie lopty cez vlastnú zadnú čiaru obrancami.",
          ].map((text, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="text-[#012d74] font-bold shrink-0">➜</span>
              <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>{text}</p>
            </div>
          ))}
        </div>

        <h3 className="font-bold text-[#051937] mt-8 mb-4" style={{ fontSize: "18px" }}>
          Ako prebieha trestný roh?
        </h3>
        <div className="space-y-4 mb-6">
          <ul className="space-y-3">
            {[
              "Útočiaci hráč prihrá loptu od zadnej čiary na okraj kruhu, kde stojí spoluhráč.",
              "Lopta musí byť najskôr prihrávkou vyvedená z kruhu — priamo strieľať nie je možné.",
              "Po zastavení lopty na okraji kruhu môže nasledovať strela na bránku.",
              "Maximálne 5 obrancov (vrátane brankára) stojí za bránkovou čiarou a po prihrávke vybehne brániť.",
              "Ostatní útočníci čakajú mimo kruh a po prvom dotyku sa môžu zapojiť do akcie.",
            ].map((text, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="text-[#051937]/30 font-bold shrink-0">–</span>
                <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>{text}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg p-6 mb-12" style={{ background: "#051937" }}>
          <h3 className="font-bold text-white mb-3" style={{ fontSize: "16px" }}>Pravidlá prvej strely</h3>
          <p className="text-white/90" style={{ fontSize: "14px", lineHeight: 1.8 }}>
            Prvý výstrel úderom alebo šrúberom nesmie skončiť vyššie ako doska v bráne (460 mm od zeme). Ak sa hráč rozhodne vystreliť pushom (tlačný pohyb), táto strela môže ísť aj vyššie nad dosku. Toto pravidlo chráni obrancov, ktorí vybehávajú proti strele.
          </p>
        </div>

        {/* ───────────── 7. Nájazdy (shootout) ───────────── */}
        <h2 className="font-bold text-[#051937] mt-12 mb-4" style={{ fontSize: "24px" }}>
          Nájazdy (shootout)
        </h2>
        <p className="text-[#334155] mb-6" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Nájazdy sa používajú na určenie víťaza, ak zápas v play-off skončil nerozhodne. Nikdy sa nekonajú počas riadneho hracieho času — sú výhradne súčasťou rozstrelu po zápase.
        </p>
        <div className="space-y-4 mb-12">
          {[
            "Každý tím nominuje 5 hráčov na nájazdy. Hráči sa striedajú — jeden z každého tímu.",
            "Útočník začína so loptou na štvrtinvej čiare (22,9 m od bránky) a rozbehne sa smerom k bránke.",
            "Na skórovanie má útočník iba 8 sekúnd. Počas tohto času môže urobiť niekoľko pokusov o gól, pokiaľ lopta zostáva v hre.",
            "Brankár začína v bránke a vybehne proti útočníkovi.",
            "Ak je po 5 nájazdoch skóre stále vyrovnané, nasleduje náhly rozstrel (sudden death) — po jednom nájazde, kým jeden tím neskóruje a druhý nie.",
          ].map((text, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="text-[#012d74] font-bold shrink-0">➜</span>
              <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>{text}</p>
            </div>
          ))}
        </div>

        {/* ───────────── 8. Ako sa hrá s loptou ───────────── */}
        <h2 className="font-bold text-[#051937] mt-12 mb-4" style={{ fontSize: "24px" }}>
          Ako sa hrá s loptou
        </h2>
        <p className="text-[#334155] mb-6" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          V pozemnom hokeji sa lopta smie hrať výhradne plochou (vnútornou) stranou hokejky. Používanie opačnej strany hokejky alebo akejkoľvek časti tela (okrem brankára) je priestupok. Existujú 4 základné spôsoby hry s loptou:
        </p>
        <div className="space-y-4 mb-6">
          {[
            { name: "Push (tlačenie)", desc: "Tlačný pohyb hokejky po zemi — najčastejší spôsob prihrávania. Lopta zostáva na zemi a pohyb je kontrolovaný a presný." },
            { name: "Úder (hit)", desc: "Švihový pohyb hokejky proti lopte — používa sa na dlhé prihrávky a silné strely. Vytvára najväčšiu rýchlosť lopty." },
            { name: "Šrúber (flick)", desc: "Kombinácia pushu a zdvihu — lopta sa nadvihne nad zem. Používa sa pri streľbe na bránku, najmä pri trestných rohoch." },
            { name: "Vysoký push / naberanie (scoop)", desc: "Naberací pohyb, pri ktorom lopta stúpa vysoko do vzduchu. Používa sa na dlhé vzdušné prihrávky cez celé ihrisko." },
          ].map((item) => (
            <div key={item.name} className="flex gap-3 items-start">
              <span className="text-[#012d74] font-bold shrink-0">➜</span>
              <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
                <strong>{item.name}</strong> — {item.desc}
              </p>
            </div>
          ))}
        </div>
        <p className="text-[#334155] mb-12" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Okrem týchto techník je dôležitý aj dribling — vedenie lopty po ihrisku pomocou krátkych dotykov hokejkou. Skúsení hráči dokážu driblovaním prejsť aj cez niekoľkých obrancov.
        </p>

        {/* ───────────── 9. Rozhodcovia ───────────── */}
        <h2 className="font-bold text-[#051937] mt-12 mb-4" style={{ fontSize: "24px" }}>
          Rozhodcovia
        </h2>
        <p className="text-[#334155] mb-6" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Zápas riadia 2 rozhodcovia, každý na jednej strane ihriska. Každý rozhodca je zodpovedný primárne za priestupky na svojej polovici ihriska, ale obaja spolupracujú pri rozhodovaní sporných situácií.
        </p>
        <div className="space-y-4 mb-12">
          <ul className="space-y-3">
            {[
              "Rozhodcovia signalizujú prerušenie hry píšťalkou a rozhodnutia ukazujú rukou.",
              "Na medzinárodných zápasoch je k dispozícii aj video rozhodca, ktorý posudzuje sporné góly a trestné rohy.",
              "Rozhodcovia kontrolujú čas zápasu — zastavujú hodiny pri prerušeniach (zranenie, karty, trestné rohy).",
              "Kapitáni oboch tímov sú jediní hráči, ktorí smú hovoriť s rozhodcom o rozhodnutiach.",
            ].map((text, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="text-[#051937]/30 font-bold shrink-0">–</span>
                <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>{text}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* ───────────── 10. Halový hokej ───────────── */}
        <h2 className="font-bold text-[#051937] mt-16 mb-6" style={{ fontSize: "24px" }}>
          Halový hokej
        </h2>
        <p className="text-[#334155] mb-6" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Halový hokej je samostatná disciplína pozemného hokeja, ktorá sa hrá v uzavretej hale. Oproti vonkajšiemu hokeju je hra rýchlejšia, technickejšia a odohráva sa na menšom priestore.
        </p>
        <div className="space-y-4 mb-6">
          {[
            { label: "Počet hráčov", text: "6 proti 6 (vrátane brankára) — teda 5 hráčov v poli na každú stranu." },
            { label: "Ihrisko", text: "40 x 20 metrov, ohraničené nízkymi mantinelmi (doskami). Lopta sa môže odrážať od mantinelov." },
            { label: "Zdvíhanie lopty", text: "Nie je povolené zdvíhať loptu nad úroveň mantinelov (okrem streľby v kruhu). To vyžaduje od hráčov výbornú techniku." },
            { label: "Tempo", text: "Hra je veľmi rýchla s väčším dôrazom na presné prihrávky a kontrolu lopty v obmedzenom priestore." },
            { label: "Sezóna", text: "Halová sezóna prebieha počas zimných mesiacov (október — marec), kedy nie je možné hrať na vonkajších ihriskách." },
          ].map((item) => (
            <div key={item.label} className="flex gap-3 items-start">
              <span className="text-[#012d74] font-bold shrink-0">➜</span>
              <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
                <strong>{item.label}:</strong> {item.text}
              </p>
            </div>
          ))}
        </div>
        <p className="text-[#334155] mb-6" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Halový hokej má vlastné medzinárodné súťaže vrátane Majstrovstiev Európy a Svetového pohára. Na Slovensku sa halová liga hrá od októbra do marca a zahŕňa mužskú aj ženskú súťaž. Slovenské reprezentácie sa pravidelne zúčastňujú európskych šampionátov v rámci divízneho systému EuroHockey.
        </p>

        {/* Foto — halový hokej */}
        <div className="grid grid-cols-2 gap-3 my-10">
          <div className="relative overflow-hidden col-span-2" style={{ aspectRatio: "21/9", borderRadius: "6px" }}>
            <Image src="/images/hala-repre-1.jpg" alt="Halový hokej — reprezentácia Slovenska" fill className="object-cover" sizes="(max-width: 900px) 100vw, 1100px" />
          </div>
        </div>

        {/* ───────────── 11. Užitočné odkazy ───────────── */}
        <h2 className="font-bold text-[#051937] mt-16 mb-6" style={{ fontSize: "24px" }}>
          Užitočné odkazy
        </h2>
        <p className="text-[#334155] mb-6" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Pre podrobnejšie informácie o pravidlách pozemného hokeja odporúčame nasledujúce zdroje:
        </p>
        <div className="space-y-4 mb-12">
          <a
            href="https://www.fih.hockey/about-fih/official-documents/rules-of-hockey"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-6 flex gap-4 items-center hover:shadow-md transition-shadow"
            style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}
          >
            <div className="shrink-0 rounded-lg flex items-center justify-center text-white font-bold" style={{ width: "48px", height: "48px", background: "#012d74", fontSize: "12px" }}>
              FIH
            </div>
            <div>
              <p className="font-bold text-[#051937]" style={{ fontSize: "15px" }}>Oficiálne pravidlá FIH (Rules of Hockey)</p>
              <p className="text-[#334155]" style={{ fontSize: "13px" }}>fih.hockey — kompletný dokument pravidiel v angličtine</p>
            </div>
          </a>
          <a
            href="https://www.eurohockey.org"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-6 flex gap-4 items-center hover:shadow-md transition-shadow"
            style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}
          >
            <div className="shrink-0 rounded-lg flex items-center justify-center text-white font-bold" style={{ width: "48px", height: "48px", background: "#012d74", fontSize: "10px" }}>
              EHF
            </div>
            <div>
              <p className="font-bold text-[#051937]" style={{ fontSize: "15px" }}>EuroHockey</p>
              <p className="text-[#334155]" style={{ fontSize: "13px" }}>eurohockey.org — Európska hokejová federácia, súťaže a pravidlá</p>
            </div>
          </a>
        </div>

        {/* Späť na pozemný hokej */}
        <div className="mt-16 pt-8" style={{ borderTop: "1px solid rgba(1,45,116,0.08)" }}>
          <Link href="/pozemny-hokej" className="inline-flex items-center gap-2 text-[#012d74] font-bold hover:underline" style={{ fontSize: "14px" }}>
            <span>←</span> Späť na prehľad pozemného hokeja
          </Link>
        </div>
      </div>
    </article>
  );
}
