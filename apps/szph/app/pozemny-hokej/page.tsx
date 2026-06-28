import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Čo je pozemný hokej?",
  description: "Pozemný hokej je dynamický, kolektívny, olympijský šport. Všetko čo potrebujete vedieť o pravidlách, hráčoch a histórii.",
};

export default function PozemnyHokejPage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      {/* Hero */}
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span className="font-bold uppercase text-white/40 mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>
            O športe
          </span>
          <h1 className="font-bold text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Čo je pozemný hokej?
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <p className="text-[#334155] mb-8" style={{ fontSize: "16px", lineHeight: 1.8 }}>
          Pozemný hokej je dynamický, kolektívny, olympijský šport, ktorý sa hrá na obdĺžnikovom ihrisku s dvoma tímami, pričom každý tím sa snaží dostať malú loptu do súperovej bránky pomocou špeciálnych zakrivených hokejok. Pre ľudí, ktorí tento šport nikdy nevideli, môže pozemný hokej pripomínať mix medzi futbalom a ľadovým hokejom, avšak s niekoľkými kľúčovými rozdielmi.
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
            <span className="text-[#C8102E] font-bold shrink-0">➜</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Ihrisko:</strong> Hra sa odohráva na umelej tráve. Rozmery ihriska sú 91,4 metra na dĺžku a 55 metrov na šírku. Na každom konci ihriska je bránka, ktorá je o rovnaká ako bránka na hádzanú.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#C8102E] font-bold shrink-0">➜</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Lopta:</strong> Lopta používaná v pozemnom hokeji je tvrdá, malá a vyrobená z plastu. Jej veľkosť je podobná tenisovej loptičke, ale je oveľa ťažšia a pevnejšia. Pevnosť by sme mohli prirovnať ku golfovej loptičke.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#C8102E] font-bold shrink-0">➜</span>
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
            <span className="text-[#C8102E] font-bold shrink-0">➜</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Pohyb s loptou:</strong> Hráči môžu loptu posúvať po ihrisku buď krátkymi prihrávkami medzi spoluhráčmi, alebo tzv. driblingom, čo znamená, že hráč vedie loptu po ihrisku pomocou hokejky.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#C8102E] font-bold shrink-0">➜</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Prihrávky a streľba:</strong> Prihrávky sú rýchle a presné a môžu byť buď krátke alebo dlhé. Lopta sa pri streľbe do bránky zasahuje pomocou plochej strany hokejky.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#C8102E] font-bold shrink-0">➜</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Rýchlosť a technika:</strong> Hra sa odohráva rýchlym tempom, pričom hráči musia mať dobrú kondíciu, obratnosť a koordináciu. Technická zručnosť pri ovládaní lopty je nevyhnutná, pretože hráčom nie je dovolené používať zadnú stranu hokejky ani iné časti tela na kontrolu lopty.
            </p>
          </div>
        </div>

        {/* Pravidlá a stratégie */}
        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Pravidlá a stratégie
        </h2>
        <p className="text-[#334155] mb-6" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Pozemný hokej má súbor pravidiel, ktoré regulujú, ako môžu hráči hrať. Základným princípom je, že lopta sa nesmie dotknúť hráčovej ruky, nohy alebo tela (okrem brankára). Ak sa tak stane, ide o faul a rozhodca nariadi trest.
        </p>

        <div className="space-y-6 mb-8">
          <div className="rounded-2xl p-6" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
            <h4 className="font-bold text-[#051937] mb-2" style={{ fontSize: "15px" }}>1. Voľné údery</h4>
            <p className="text-[#334155]" style={{ fontSize: "14px", lineHeight: 1.8 }}>
              Ak sa poruší pravidlo (napr. faul, priestupok alebo iný typ nedovolenej hry), súper získa voľný úder z miesta priestupku. Špecifikom rozohrávky je že hráč si môže ale rozohrať voľný úder sám a tým pádom nemusí loptičku prihrať svoju spoluhráčovi. Toto rozhodnutie je na danom hráčovi či loptičku prihrá alebo ju rozohrá sám z miesta priestupku alebo faulu.
            </p>
          </div>

          <div className="rounded-2xl p-6" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
            <h4 className="font-bold text-[#051937] mb-2" style={{ fontSize: "15px" }}>2. Trestné rohy</h4>
            <p className="text-[#334155]" style={{ fontSize: "14px", lineHeight: 1.8 }}>
              Pri vážnych porušeniach v útočnom kruhu sa udeľuje trestný roh. Útočiaci tím má v tejto situácii výhodu, keďže sa hráči rozostavia okolo kruhu a pripravujú sa na streľbu priamo na bránu.
            </p>
          </div>

          <div className="rounded-2xl p-6" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
            <h4 className="font-bold text-[#051937] mb-2" style={{ fontSize: "15px" }}>3. Karty a tresty</h4>
            <p className="text-[#334155]" style={{ fontSize: "14px", lineHeight: 1.8 }}>
              Rovnako ako v mnohých iných športoch, aj v pozemnom hokeji môže rozhodca udeliť hráčovi zelenú, žltú alebo červenú kartu za nebezpečnú alebo nešportovú hru. Zelená karta znamená opustenie ihriska na 2 min. Žltá karta znamená, že hráč musí opustiť ihrisko na určitý čas 5–15 min v závislosti od faulu, zatiaľ čo červená karta vedie k vylúčeniu hráča zo zvyšnej časti hry.
            </p>
          </div>
        </div>

        {/* Dôležité aspekty */}
        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Dôležité aspekty pozemného hokeja
        </h2>
        <div className="space-y-4 mb-8">
          <div className="flex gap-3 items-start">
            <span className="text-[#051937]/30 font-bold shrink-0">–</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Tímová práca:</strong> Tímová spolupráca je v pozemnom hokeji kľúčová. Hráči musia rýchlo komunikovať a presne si prihrávať loptu, aby dosiahli úspech.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#051937]/30 font-bold shrink-0">–</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Fyzická náročnosť:</strong> Hráči musia byť vo výbornej fyzickej kondícii, pretože pozemný hokej je veľmi rýchla a intenzívna hra. Tím musí neustále meniť smer a rýchlo reagovať na vývoj hry.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#051937]/30 font-bold shrink-0">–</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Technická zručnosť:</strong> Ovládanie lopty pomocou hokejky, rýchle prihrávky a precízna streľba sú nevyhnutné pre úspech. Hráči musia neustále zlepšovať svoju techniku, aby dokázali efektívne prekonávať obranu súpera.
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
        <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Pre tých, ktorí nikdy nevideli pozemný hokej, môže byť prvý pohľad fascinujúci pre niektorích zase zvláštny. Dynamika pohybov, presné prihrávky, rýchlosť hry a elegancia hokejky ovládanej rukami hráčov vytvárajú jedinečný zážitok. Aj keď sa môže na prvý pohľad zdať, že hra je komplikovaná, jej princípy sú pomerne jednoduché: dostať loptu do súperovej brány a brániť svoju vlastnú bránu.
        </p>
      </div>
    </article>
  );
}
