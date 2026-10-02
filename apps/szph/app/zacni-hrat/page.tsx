import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Chcem začať s pozemným hokejom",
  description: "Ako začať s pozemným hokejom — pravidlá, výstroj, techniky, tréningy a tipy pre začiatočníkov.",
};

export default function ZacniHratPage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span className="font-bold uppercase text-white mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>
            Začni hrať
          </span>
          <h1 className="font-bold text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Chcem začať hrať pozemný hokej
          </h1>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <h2 className="font-bold text-[#051937] mt-0 mb-4" style={{ fontSize: "24px" }}>
          Ako začať s pozemným hokejom
        </h2>
        <p className="text-[#334155] mb-4" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Ak ťa zaujal pozemný hokej a chceš sa naučiť základy tohto dynamického olympijského športu, si na správnom mieste. Pozemný hokej je fyzicky náročný a technicky zameraný šport, ale so správnym prístupom sa ho môže naučiť každý, kto má chuť na športovú výzvu a rád pracuje v tíme.
        </p>
        <p className="text-[#334155] mb-10" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Začať s pozemným hokejom môžeš v akejkoľvek vekovej kategórii — od detí cez juniorov až po dospelých, mužov aj ženy. Tento šport podporuje tímovú prácu, rozvíja kondíciu a techniku a poskytuje skvelé spoločenské zážitky. S pravidelnými tréningmi, základným výstrojom a odhodlaním sa budeš rýchlo zlepšovať.
        </p>

        {/* Kluby */}
        <div className="mb-12">
          <h2 className="font-bold text-[#051937] mb-4" style={{ fontSize: "20px" }}>Kde začať? Pridaj sa ku klubu</h2>
          <p className="text-[#334155] mb-5" style={{ fontSize: "15px", lineHeight: 1.8 }}>
            Na Slovensku pôsobí niekoľko klubov, ktoré prijímajú nových hráčov a hráčky. Kontaktuj ktorýkoľvek z nich.
          </p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { name: "KPH Rača", logo: "/images/timy/Raca-logo-70x58-1-32x27.webp", city: "Bratislava" },
              { name: "HA Šenkvice", logo: "/images/timy/HAS.webp", city: "Šenkvice" },
              { name: "ŠK 1952 Šenkvice", logo: "/images/timy/SEN.webp", city: "Šenkvice" },
              { name: "HOKO Zlaté Moravce", logo: "/images/timy/logo-KPH-HOKO-1-Photoroom-32x18.webp", city: "Zlaté Moravce" },
              { name: "HKM Nová Dubnica", logo: "/images/timy/nova-dubnica-32x32.webp", city: "Nová Dubnica" },
            ].map((club) => (
              <Link key={club.name} href="/kluby" className="flex flex-col items-center gap-2 bg-white p-4 hover:bg-[#f8fafd] transition-colors text-center" style={{ borderRadius: "8px", border: "1px solid rgba(1,45,116,0.06)" }}>
                <div className="shrink-0 flex items-center justify-center" style={{ width: 48, height: 48 }}>
                  <Image src={club.logo} alt={club.name} width={48} height={48} className="object-contain" sizes="48px" />
                </div>
                <div>
                  <p className="font-bold text-[#051937]" style={{ fontSize: "12px" }}>{club.name}</p>
                  <p className="text-[#94a3b8]" style={{ fontSize: "10px" }}>{club.city}</p>
                </div>
              </Link>
            ))}
            <Link href="/pre-kluby/zalozenie" className="flex flex-col items-center justify-center gap-2 bg-white p-4 hover:bg-[#f8fafd] transition-colors text-center" style={{ borderRadius: "8px", border: "1px dashed rgba(1,45,116,0.15)" }}>
              <div className="flex items-center justify-center rounded-full" style={{ width: 48, height: 48, background: "rgba(1,45,116,0.06)" }}>
                <svg className="h-5 w-5 text-[#012d74]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
              </div>
              <div>
                <p className="font-bold text-[#012d74]" style={{ fontSize: "12px" }}>Nie je klub v tvojom meste?</p>
                <p className="text-[#94a3b8]" style={{ fontSize: "10px" }}>Založ ho</p>
              </div>
            </Link>
          </div>
        </div>

        {[
          {
            num: "1",
            title: "Zoznám sa so športom a pravidlami",
            text: "Prvým krokom je pochopiť, ako sa hra hrá, aké sú jej základné pravidlá a aká je dynamika na ihrisku. Pozemný hokej má síce jednoduchý cieľ (streliť viac gólov ako súper), ale existuje niekoľko pravidiel, ktoré sú špecifické a môžu sa líšiť od iných športov, napríklad:",
            bullets: [
              "Používa sa iba plochá strana hokejky.",
              "Gól môže byť strelený iba z vnútra útočného kruhu.",
              "Dotyk lopty nohou alebo inou časťou tela (okrem brankára) je zakázaný.",
            ],
            footer: "Pozri si online videá, zápasy alebo pravidlá z oficiálnych zdrojov, aby si získal/a základný prehľad o tom, ako sa hrá.",
          },
          {
            num: "2",
            title: "Nájdi si miestny klub alebo tréningovú skupinu",
            text: "Najlepší spôsob, ako začať, je pripojiť sa k miestnemu hokejovému klubu alebo tréningovej skupine pre začiatočníkov, prípadne ak sa jedná o dieťa vyhľadať si krúžok na miestnej základnej škole. Väčšina klubov má programy pre nováčikov a ponúka tréningy pre rôzne vekové a výkonnostné skupiny. Hľadaj tieto možnosti vo tvojom meste alebo regióne a prihlás sa do klubu alebo na úvodný tréning. Mnohé kluby tiež umožňujú požičiavanie vybavenia, čo ti umožní začať bez toho, aby si musel/a okamžite kupovať všetok potrebný výstroj.",
          },
          {
            num: "3",
            title: "Základná výstroj pre začiatočníkov",
            text: "Aj keď mnohé kluby požičiavajú hokejky a základnú výstroj, je dobré vedieť, čo budeš potrebovať, ak sa rozhodneš investovať do vlastného vybavenia:",
            items: [
              { name: "Hokejka", desc: "Hokejky sú kľúčovým nástrojom hráča. Pre začiatočníkov je dôležité vybrať si správnu dĺžku a váhu hokejky. Hokejka by ti mala siahať približne po pupok. Začni s hokejkou, ktorá je pohodlná a ľahká na ovládanie." },
              { name: "Chrániče holení", desc: "Keďže lopta je tvrdá a pohybuje sa vysokou rýchlosťou, chrániče holení sú nevyhnutné na ochranu pred zraneniami." },
              { name: "Chránič zubov", desc: "Aj keď sa fauly v pozemnom hokeji prísne trestajú, riziko zraneniu tu je. Chránič zubov ochráni tvoj chrup. Chránič chrupu je bežne dostupný v športových obchodoch." },
              { name: "Vhodná obuv", desc: 'Na pozemný hokej sa používa športová obuv so stupeľmi. Na umelej tráve sú potrebné topánky, ktoré zabránia pošmyknutiu a zabezpečia rýchle zmeny smeru — tzv. "tarfy".' },
            ],
          },
          {
            num: "4",
            title: "Zameraj sa na základy techniky",
            text: "Keď začínaš s pozemným hokejom, zameraj sa na osvojenie si základných techník:",
            items: [
              { name: "Dribling", desc: "Dribling je spôsob, ako kontrolovať loptu pri pohybe po ihrisku. Nauč sa jemne viesť loptu pomocou plochej strany hokejky, pričom udržuj stabilnú kontrolu nad loptou." },
              { name: "Prihrávanie", desc: "Prihrávka je kľúčová pre úspešnú tímovú hru. Nauč sa rôzne typy prihrávok, ako sú krátke, rýchle prihrávky a dlhé údery, ktoré pomáhajú preniesť hru na inú stranu ihriska." },
              { name: "Streľba", desc: "Nauč sa, ako efektívne strieľať na bránku z rôznych pozícií. Cvičenie streľby z útočného kruhu ti pomôže zlepšiť presnosť a rýchlosť." },
              { name: "Obrana", desc: "Dobrý obranca musí vedieť, ako efektívne brániť protihráča bez toho, aby spáchal faul. Trénuj správne umiestnenie tela a hokejky na blokovanie prihrávok a streľby." },
            ],
          },
          {
            num: "5",
            title: "Trénuj kondičnú prípravu a koordináciu",
            text: "Pozemný hokej je fyzicky náročný šport, ktorý si vyžaduje vytrvalosť, rýchlosť a dobrú koordináciu. Aby si bol/a na ihrisku úspešný/á, je dôležité venovať sa aj kondičnému tréningu:",
            items: [
              { name: "Vytrvalosť", desc: "Behanie, intervalový tréning a kardiovaskulárne cvičenia ti pomôžu zlepšiť vytrvalosť, aby si vydržal/a celé zápasy." },
              { name: "Sila a stabilita", desc: "Silový tréning zlepší tvoju schopnosť tlačiť sa proti súperom a udržať stabilitu pri obranných a útočných manévroch." },
              { name: "Rýchlosť a reakcie", desc: "Rýchle štarty, zmeny smeru a schopnosť reagovať na hru sú nevyhnutné. Cvič rýchlostné cvičenia a zlepšuj svoju reakčnú dobu." },
            ],
          },
          {
            num: "6",
            title: "Tréningy a zápasy — najlepšia škola",
            text: "Po niekoľkých tréningoch prichádza ten najlepší moment — prvé zápasy! Tvoj klub ťa zaradí do skupiny, kde si vyskúšaš všetko, čo si sa naučil/a. Zápasy sú skvelý spôsob, ako sa rýchlo zlepšiť, spoznať nových ľudí a zažiť nezabudnuteľné emócie na ihrisku.",
          },
          {
            num: "7",
            title: "Každý deň si lepší/a",
            text: "Pozemný hokej ťa bude baviť od prvého tréningu. Každým tréningom budeš vidieť posun — lepšia technika, rýchlejšie reakcie, silnejšie telo. A tá radosť, keď strelíš prvý gól? Na to sa nezabúda!",
          },
        ].map((section) => (
          <div key={section.num} className="mb-10">
            <div className="flex items-start gap-4 mb-4">
              <div className="shrink-0 flex items-center justify-center rounded-full font-black text-white" style={{ width: "36px", height: "36px", background: "#012d74", fontSize: "14px" }}>
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

        {/* Kontaktný formulár */}
        <div className="mt-14 rounded-xl p-6 sm:p-8" style={{ background: "#051937" }}>
          <h2 className="font-garet font-bold italic text-white mb-2" style={{ fontSize: "22px" }}>
            Chceš začať hrať?
          </h2>
          <p className="text-white/60 mb-6" style={{ fontSize: "13px" }}>
            Vyplň formulár a my ťa spojíme s najbližším klubom.
          </p>
          <form className="grid gap-4 sm:grid-cols-2" action="/api/kontakt" method="POST">
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-white/50 mb-1.5">Meno *</label>
              <input type="text" required placeholder="Tvoje meno" className="w-full rounded-lg bg-white/10 border border-white/15 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-white/40 transition-colors" />
            </div>
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-white/50 mb-1.5">E-mail *</label>
              <input type="email" required placeholder="tvoj@email.sk" className="w-full rounded-lg bg-white/10 border border-white/15 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-white/40 transition-colors" />
            </div>
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-white/50 mb-1.5">Telefón</label>
              <input type="tel" placeholder="+421..." className="w-full rounded-lg bg-white/10 border border-white/15 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-white/40 transition-colors" />
            </div>
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-white/50 mb-1.5">Mesto</label>
              <input type="text" placeholder="Tvoje mesto" className="w-full rounded-lg bg-white/10 border border-white/15 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-white/40 transition-colors" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-white/50 mb-1.5">Správa</label>
              <textarea placeholder="Chcem začať hrať pozemný hokej..." rows={3} className="w-full rounded-lg bg-white/10 border border-white/15 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-white/40 transition-colors resize-none" />
            </div>
            <div className="sm:col-span-2">
              <button type="submit" className="rounded-lg bg-[#d80027] px-6 py-3 text-sm font-bold text-white hover:brightness-110 transition-all">
                Odoslať prihlášku
              </button>
            </div>
          </form>
        </div>
      </div>
    </article>
  );
}
