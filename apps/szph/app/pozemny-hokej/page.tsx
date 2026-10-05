import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pozemný hokej — základy a pravidlá",
  description: "Pozemný hokej je olympijský tímový šport rozšírený po celom svete. Základy hry, pravidlá, karty, striedania a štandardné situácie.",
};

export default function PozemnyHokejPage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      {/* Hero */}
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[1100px] mx-auto">
          <span className="font-bold uppercase text-white mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>
            O športe
          </span>
          <h1 className="font-bold text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Pozemný hokej / základy a pravidlá
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1100px] mx-auto px-6 pt-12">
        <p className="text-[#334155] mb-8" style={{ fontSize: "16px", lineHeight: 1.8 }}>
          Pozemný hokej je olympijský tímový šport, ktorý patrí medzi najrozšírenejšie športy na svete. Hrá sa vo viac ako 130 krajinách na všetkých kontinentoch a má vyše 30 miliónov aktívnych hráčov. V Európe dominujú krajiny ako Holandsko, Belgicko, Nemecko, Španielsko a Anglicko, kde pôsobia profesionálne ligy s vysokou sledovanosťou. Na svetovej úrovni riadi pozemný hokej Medzinárodná hokejová federácia (FIH), ktorá organizuje svetové šampionáty, FIH Pro League a ďalšie prestížne súťaže. Pozemný hokej je neoddeliteľnou súčasťou programu letných olympijských hier od roku 1908.
        </p>

        {/* Základné charakteristiky */}
        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Základné charakteristiky hry
        </h2>

        {/* Ihrisko a vybavenie */}
        <h3 className="font-bold text-[#051937] mt-8 mb-4" style={{ fontSize: "18px" }}>
          Ihrisko a vybavenie
        </h3>
        <div className="space-y-4 mb-8">
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">➜</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Ihrisko:</strong> Hra sa odohráva na umelej tráve. Rozmery ihriska sú 91,4 metra na dĺžku a 55 metrov na šírku. Na každom konci ihriska je bránka, ktorá je o rovnaká ako bránka na hádzanú.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">➜</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Lopta:</strong> Lopta používaná v pozemnom hokeji je tvrdá, malá a vyrobená z plastu. Jej veľkosť je podobná tenisovej loptičke, ale je oveľa ťažšia a pevnejšia. Pevnosť by sme mohli prirovnať ku golfovej loptičke.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">➜</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Hokejka:</strong> Hráči používajú špeciálnu hokejku, ktorá je zakrivená na jednom konci. Na rozdiel od hokeja na ľade, kde hráči môžu používať obe strany hokejky, v pozemnom hokeji môžu používať iba plochú stranu.
            </p>
          </div>
        </div>

        {/* Hráči a pozície */}
        <h3 className="font-bold text-[#051937] mt-8 mb-4" style={{ fontSize: "18px" }}>
          Hráči a pozície
        </h3>
        <ul className="space-y-3 mb-8">
          <li className="flex gap-3 items-start">
            <span className="text-[#051937]/30 font-bold shrink-0">–</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              Každý tím pozostáva z 11 hráčov: jeden brankár a 10 hráčov v poli. Pri detských kategóriách sa počet hráčov a aj ihrisko zmenšuje.
            </p>
          </li>
          <li className="flex gap-3 items-start">
            <span className="text-[#051937]/30 font-bold shrink-0">–</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              Pozície na ihrisku sú podobné ako vo futbale, kde máme útočníkov, záložníkov a obrancov.
            </p>
          </li>
          <li className="flex gap-3 items-start">
            <span className="text-[#051937]/30 font-bold shrink-0">–</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Brankár:</strong> Je jediným hráčom, ktorý môže použiť celé svoje telo na zastavenie lopty, a preto má špeciálnu výstroj vrátane helmy, chráničov a rukavíc.
            </p>
          </li>
        </ul>

        {/* Cieľ hry */}
        <h3 className="font-bold text-[#051937] mt-8 mb-4" style={{ fontSize: "18px" }}>
          Cieľ hry
        </h3>
        <ul className="space-y-3 mb-8">
          <li className="flex gap-3 items-start">
            <span className="text-[#051937]/30 font-bold shrink-0">–</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              Cieľom je streliť viac gólov ako súper. Gól je uznaný, ak hráč dostane loptu do súperovej bránky z vnútra kruhu pred bránkou (tzv. útočný kruh).
            </p>
          </li>
        </ul>

        {/* Ako sa hrá */}
        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Ako sa hrá
        </h2>
        <div className="space-y-4 mb-8">
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">➜</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Pohyb s loptou:</strong> Hráči môžu loptu posúvať po ihrisku buď krátkymi prihrávkami medzi spoluhráčmi, alebo tzv. driblingom, čo znamená, že hráč vedie loptu po ihrisku pomocou hokejky.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">➜</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Prihrávky a streľba:</strong> Prihrávky sú rýchle a presné a môžu byť buď krátke alebo dlhé. Lopta sa pri streľbe do bránky zasahuje pomocou plochej strany hokejky.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">➜</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Rýchlosť a technika:</strong> Hra sa odohráva rýchlym tempom, pričom hráči musia mať dobrú kondíciu, obratnosť a koordináciu. Technická zručnosť pri ovládaní lopty je nevyhnutná, pretože hráčom nie je dovolené používať zadnú stranu hokejky ani iné časti tela na kontrolu lopty.
            </p>
          </div>
        </div>

        {/* Pravidlá */}
        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Základné pravidlá pre hokejové zápasy
        </h2>
        <div className="space-y-4 mb-12">
          {[
            "Hokejové tímy dospelých hrajú 11 proti 11. Mládežnícke tímy hrajú zväčša 4 na 4 alebo 5 na 5 a niekedy platia aj iné pravidlá.",
            "Všetci hráči majú svoju hokejku. Lopta sa môže odohrať iba jej vnútornou časťou hokejky. Druhá strana sa nazýva opačná strana hokejky, ktorou sa nemôže hrať a je to považované za priestupok proti pravidlám tzv. faul.",
            "Chránič na zuby a chrániče holení sú povinné počas zápasov.",
            "Gól je platný, ak útočiace družstvo zasiahne loptu vo vnútri kruhu a lopta potom úplne prejde za bránkovú čiaru.",
            "Riadny hokejový zápas trvá 60 minút rozdelených do 15 minútových štvrtín. Po prvej a tretej štvrtine nasleduje 2-minútová prestávka. Cez polčas, po druhej štvrtine je 5-minútová prestávka.",
            "Neexistuje žiadny čas predlženia alebo nastavenia. Čas počas zápasu zastavuje rozhodca, napríklad pri zranení alebo pri vykartovaní hráča. Pozemný hokej má čistý čas zápasu.",
          ].map((text, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="text-[#012d74] font-bold shrink-0">➜</span>
              <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>{text}</p>
            </div>
          ))}
        </div>

        {/* Karty */}
        <h2 className="font-bold text-[#051937] mt-12 mb-4" style={{ fontSize: "24px" }}>
          Zelená karta, žltá karta a červená karta
        </h2>
        <p className="text-[#334155] mb-6" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Počas hokejových zápasov môže rozhodca potrestať priestupky kartou. Hokej má 3 karty:
        </p>
        <div className="space-y-4 mb-12">
          <div className="rounded-lg p-6 flex gap-4 items-start" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
            <div className="shrink-0 rounded-lg flex items-center justify-center" style={{ width: "36px", height: "48px", background: "#22c55e" }} />
            <p className="text-[#334155]" style={{ fontSize: "14px", lineHeight: 1.8 }}>
              Hráč, ktorý dostane <strong>zelenú kartu</strong>, musí na 2 minúty opustiť ihrisko. Jeho tím hrá tie 2 minúty s jedným mužom menej. 2 zelené karty tomu istému hráčovi sú žlté, pokiaľ hráč nedostane kartu v pozícii kapitána.
            </p>
          </div>
          <div className="rounded-lg p-6 flex gap-4 items-start" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
            <div className="shrink-0 rounded-lg flex items-center justify-center" style={{ width: "36px", height: "48px", background: "#eab308" }} />
            <p className="text-[#334155]" style={{ fontSize: "14px", lineHeight: 1.8 }}>
              V prípade <strong>žltej karty</strong> musí hráč tiež opustiť ihrisko. Aspoň na 5 minút, pri závažnejších priestupkoch 10 minút. 2 žlté karty tomu istému hráčovi znamená červená karta, pokiaľ hráč nedostane kartu v pozícii kapitána.
            </p>
          </div>
          <div className="rounded-lg p-6 flex gap-4 items-start" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
            <div className="shrink-0 rounded-lg flex items-center justify-center" style={{ width: "36px", height: "48px", background: "#ef4444" }} />
            <p className="text-[#334155]" style={{ fontSize: "14px", lineHeight: 1.8 }}>
              <strong>Červená karta</strong> je pre hráča, ktorý sa dopustí vážneho faulu. Po faule musí ihrisko natrvalo opustiť. To sa v hokeji takmer nestáva.
            </p>
          </div>
        </div>

        {/* Striedania a rozhodcovia */}
        <h2 className="font-bold text-[#051937] mt-12 mb-4" style={{ fontSize: "24px" }}>
          Počet striedaní
        </h2>
        <p className="text-[#334155] mb-8" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          V hokeji môžete počas zápasu neobmedzene striedať. Hráč, ktorý prichádza do poľa, nesmie vstúpiť na ihrisko, kým druhý hráč nie je mimo poľa. Striedania sa dejú pri stredovej čiare.
        </p>

        <h2 className="font-bold text-[#051937] mt-12 mb-4" style={{ fontSize: "24px" }}>
          Rozhodcovia
        </h2>
        <p className="text-[#334155] mb-8" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Zápas rozhodujú 2 rozhodcovia, obaja na jednej strane ihriska. Každý rozhodca rozhoduje na svojej polovici.
        </p>

        {/* Spôsoby hry */}
        <h2 className="font-bold text-[#051937] mt-12 mb-4" style={{ fontSize: "24px" }}>
          Ako môžete hrať s loptou?
        </h2>
        <p className="text-[#334155] mb-6" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          V hokeji môžete hrať s loptou 4 rôznymi spôsobmi:
        </p>
        <div className="space-y-4 mb-12">
          {[
            { name: "Úder", desc: "je švihový pohyb hokejky proti loptičke." },
            { name: "Push", desc: "je tlačný pohyb s hokejkou proti lopte." },
            { name: "Šrúber", desc: "je kombináciou techniky šrúberu a úderu." },
            { name: "Vysoký push", desc: "je naberací pohyb hokejky, ktorý spôsobuje, že loptička stúpa." },
          ].map((item) => (
            <div key={item.name} className="flex gap-3 items-start">
              <span className="text-[#012d74] font-bold shrink-0">➜</span>
              <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
                <strong>{item.name}</strong> {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Malý roh */}
        <h2 className="font-bold text-[#051937] mt-12 mb-4" style={{ fontSize: "24px" }}>
          Ako funguje malý roh?
        </h2>
        <p className="text-[#334155] mb-6" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Malý roh je trestom pre brániace sa družstvo ktoré spôsobilo priestupok proti pravidlám. Je to veľká šanca skórovať pre útočiaci tím. Malý roh sa udeľuje, keď:
        </p>
        <div className="space-y-4 mb-6">
          {[
            "Neúmyselný faul obrancu vo svojom kruhu, ktorý nezabráni gólu.",
            "Úmyselný faul obrancu v štvrtine.",
            "Zámerné hranie lopty cez vlastnú zadnú čiaru.",
          ].map((text, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="text-[#012d74] font-bold shrink-0">➜</span>
              <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>{text}</p>
            </div>
          ))}
        </div>

        <div className="rounded-lg p-6 mb-12" style={{ background: "#051937" }}>
          <h3 className="font-bold text-white mb-3" style={{ fontSize: "16px" }}>Takto funguje malý roh</h3>
          <p className="text-white" style={{ fontSize: "14px", lineHeight: 1.8 }}>
            Útočiace družstvo hrá loptu od zadnej čiary v kruhu a musí byť lopta prihraná mimo kruh, potom môže útočiace družstvo skórovať. Prvý výstrel, úderom alebo šrúberom, nesmie skončiť vyššie ako doska v bráne. Ak sa rozhodne hráč vystreliť pushom, táto strela môže ísť vyššie ako nad dosku v bráne.
          </p>
        </div>

        {/* Nájazdy */}
        <h2 className="font-bold text-[#051937] mt-12 mb-4" style={{ fontSize: "24px" }}>
          Nájazdy
        </h2>
        <div className="space-y-4 mb-8">
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">➜</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              Nájazdy sú súboje 1 na 1 medzi hráčom a brankárom. Sú nariadené iba vtedy, ak je potrebné určiť víťaza a zápas skončil remízou. K rozstrelu nikdy nedochádza počas riadneho hracieho času.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">➜</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              Zo štvrtinovej čiary sa útočník rozbehne smerom k bránke. Snaží sa skórovať do 8 sekúnd. Počas týchto 8 sekúnd môže urobiť niekoľko pokusov o gól, pokiaľ lopta zostáva v hre alebo na ihrisku.
            </p>
          </div>
        </div>

        {/* Prečo je populárny */}
        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Prečo je pozemný hokej taký populárny?
        </h2>
        <p className="text-[#334155] mb-6" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Pozemný hokej je populárny na celom svete, najmä v Európe, Indii, Pakistane, Austrálii a Južnej Afrike. Je to šport, ktorý kombinuje eleganciu techniky s rýchlosťou a stratégiou. Okrem fyzickej náročnosti prináša aj veľkú dávku intelektuálneho myslenia, pretože hráči musia byť neustále o krok pred súperom. Šport je atraktívny aj tým, že môže byť hrou pre mužov aj ženy, a to na všetkých úrovniach, od amatérov až po profesionálov. Pozemného hokeju sa hovorí aj šport elegánov.
        </p>
        <p className="text-[#334155] mb-8" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Pre tých, ktorí nikdy nevideli pozemný hokej, môže byť prvý pohľad fascinujúci pre niektorích zase zvláštny. Dynamika pohybov, presné prihrávky, rýchlosť hry a elegancia hokejky ovládanej rukami hráčov vytvárajú jedinečný zážitok. Aj keď sa môže na prvý pohľad zdať, že hra je komplikovaná, jej princípy sú pomerne jednoduché: dostať loptu do súperovej brány a brániť svoju vlastnú bránu.
        </p>

        {/* Fotogaléria — vonkajší hokej */}
        <div className="grid grid-cols-2 gap-3 my-10">
          <div className="relative overflow-hidden" style={{ aspectRatio: "16/10", borderRadius: "6px" }}>
            <Image src="/images/vonku-1.jpg" alt="Vonkajší pozemný hokej" fill className="object-cover" sizes="(max-width: 900px) 50vw, 500px" />
          </div>
          <div className="relative overflow-hidden" style={{ aspectRatio: "16/10", borderRadius: "6px" }}>
            <Image src="/images/vonku-2.jpg" alt="Vonkajší pozemný hokej" fill className="object-cover" sizes="(max-width: 900px) 50vw, 500px" />
          </div>
        </div>

        {/* Halový hokej */}
        <h2 className="font-bold text-[#051937] mt-16 mb-6" style={{ fontSize: "24px" }}>
          Halový hokej
        </h2>
        <p className="text-[#334155] mb-6" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Halový hokej je samostatná disciplína pozemného hokeja, ktorá sa hrá v uzavretej hale na menšom ihrisku. Hrá sa 6 proti 6 (vrátane brankára) na ihrisku s rozmermi 40 x 20 metrov, ohraničenom nízkymi mantinelmi. Oproti vonkajšiemu pozemnému hokeju je hra rýchlejšia a technickejšia, s väčším dôrazom na presné prihrávky a kontrolu lopty v obmedzenom priestore.
        </p>
        <p className="text-[#334155] mb-6" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Halová sezóna prebieha počas zimných mesiacov, kedy nie je možné hrať na vonkajších ihriskách. V halovom hokeji nie je povolené zdvíhať loptu nad úroveň mantinelov (okrem streľby v kruhu), čo vyžaduje od hráčov výbornú techniku a kontrolu hokejky. Halový hokej má vlastné medzinárodné súťaže vrátane Majstrovstiev Európy a Svetového pohára.
        </p>
        <p className="text-[#334155] mb-8" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Na Slovensku sa halový hokej teší veľkej popularite. Slovenské reprezentácie sa pravidelne zúčastňujú európskych šampionátov v rámci divízneho systému EuroHockey. Halová liga prebieha od októbra do marca a zahŕňa mužskú aj ženskú súťaž.
        </p>

        <div className="grid grid-cols-3 gap-3 my-10">
          <div className="relative overflow-hidden" style={{ aspectRatio: "16/10", borderRadius: "6px" }}>
            <Image src="/images/hala-1.jpg" alt="Halový hokej" fill className="object-cover" sizes="(max-width: 900px) 33vw, 350px" />
          </div>
          <div className="relative overflow-hidden" style={{ aspectRatio: "16/10", borderRadius: "6px" }}>
            <Image src="/images/hala-2.jpg" alt="Halový hokej" fill className="object-cover" sizes="(max-width: 900px) 33vw, 350px" />
          </div>
          <div className="relative overflow-hidden" style={{ aspectRatio: "16/10", borderRadius: "6px" }}>
            <Image src="/images/hala-3.jpg" alt="Halový hokej" fill className="object-cover" sizes="(max-width: 900px) 33vw, 350px" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 my-10">
          <div className="relative overflow-hidden" style={{ aspectRatio: "16/10", borderRadius: "6px" }}>
            <Image src="/images/hala-repre-1.jpg" alt="Halový hokej reprezentácia" fill className="object-cover" sizes="(max-width: 900px) 33vw, 350px" />
          </div>
          <div className="relative overflow-hidden" style={{ aspectRatio: "16/10", borderRadius: "6px" }}>
            <Image src="/images/hala-repre-2.jpg" alt="Halový hokej reprezentácia" fill className="object-cover" sizes="(max-width: 900px) 33vw, 350px" />
          </div>
          <div className="relative overflow-hidden" style={{ aspectRatio: "16/10", borderRadius: "6px" }}>
            <Image src="/images/hala-repre-3.jpg" alt="Halový hokej reprezentácia" fill className="object-cover" sizes="(max-width: 900px) 33vw, 350px" />
          </div>
        </div>
      </div>
    </article>
  );
}
