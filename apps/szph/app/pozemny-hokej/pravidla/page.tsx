import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pravidlá pozemného hokeja",
  description: "Základné pravidlá pre hokejové zápasy, karty, striedania, rozhodcovia, malý roh a nájazdy.",
};

export default function PravidlaPage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      {/* Hero */}
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span className="font-bold uppercase text-white/40 mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>
            Pravidlá
          </span>
          <h1 className="font-bold text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Pravidlá pozemného hokeja
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-6 pt-12">

        {/* Základné pravidlá */}
        <h2 className="font-bold text-[#051937] mt-0 mb-6" style={{ fontSize: "24px" }}>
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
              <span className="text-[#C8102E] font-bold shrink-0">➜</span>
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
          <div className="rounded-2xl p-6 flex gap-4 items-start" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
            <div className="shrink-0 rounded-lg flex items-center justify-center" style={{ width: "36px", height: "48px", background: "#22c55e" }} />
            <p className="text-[#334155]" style={{ fontSize: "14px", lineHeight: 1.8 }}>
              Hráč, ktorý dostane <strong>zelenú kartu</strong>, musí na 2 minúty opustiť ihrisko. Jeho tím hrá tie 2 minúty s jedným mužom menej. 2 zelené karty tomu istému hráčovi sú žlté, pokiaľ hráč nedostane kartu v pozícii kapitána.
            </p>
          </div>
          <div className="rounded-2xl p-6 flex gap-4 items-start" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
            <div className="shrink-0 rounded-lg flex items-center justify-center" style={{ width: "36px", height: "48px", background: "#eab308" }} />
            <p className="text-[#334155]" style={{ fontSize: "14px", lineHeight: 1.8 }}>
              V prípade <strong>žltej karty</strong> musí hráč tiež opustiť ihrisko. Aspoň na 5 minút, pri závažnejších priestupkoch 10 minút. 2 žlté karty tomu istému hráčovi znamená červená karta, pokiaľ hráč nedostane kartu v pozícii kapitána.
            </p>
          </div>
          <div className="rounded-2xl p-6 flex gap-4 items-start" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
            <div className="shrink-0 rounded-lg flex items-center justify-center" style={{ width: "36px", height: "48px", background: "#ef4444" }} />
            <p className="text-[#334155]" style={{ fontSize: "14px", lineHeight: 1.8 }}>
              <strong>Červená karta</strong> je pre hráča, ktorý sa dopustí vážneho faulu. Po faule musí ihrisko natrvalo opustiť. To sa v hokeji takmer nestáva.
            </p>
          </div>
        </div>

        {/* Počet striedaní */}
        <h2 className="font-bold text-[#051937] mt-12 mb-4" style={{ fontSize: "24px" }}>
          Počet striedaní
        </h2>
        <p className="text-[#334155] mb-8" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          V hokeji môžete počas zápasu neobmedzene striedať. Hráč, ktorý prichádza do poľa, nesmie vstúpiť na ihrisko, kým druhý hráč nie je mimo poľa. Striedania sa dejú pri stredovej čiare.
        </p>

        {/* Rozhodcovia */}
        <h2 className="font-bold text-[#051937] mt-12 mb-4" style={{ fontSize: "24px" }}>
          Rozhodcovia
        </h2>
        <p className="text-[#334155] mb-8" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Zápas rozhodujú 2 rozhodcovia, obaja na jednej strane ihriska. Každý rozhodca rozhoduje na svojej polovici.
        </p>

        {/* Ako môžete hrať s loptou */}
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
              <span className="text-[#C8102E] font-bold shrink-0">➜</span>
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
              <span className="text-[#C8102E] font-bold shrink-0">➜</span>
              <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>{text}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl p-6 mb-12" style={{ background: "#051937" }}>
          <h3 className="font-bold text-white mb-3" style={{ fontSize: "16px" }}>Takto funguje malý roh</h3>
          <p className="text-white/70" style={{ fontSize: "14px", lineHeight: 1.8 }}>
            Útočiace družstvo hrá loptu od zadnej čiary v kruhu a musí byť lopta prihraná mimo kruh, potom môže útočiace družstvo skórovať. Prvý výstrel, úderom alebo šrúberom, nesmie skončiť vyššie ako doska v bráne. Ak sa rozhodne hráč vystreliť pushom, táto strela môže ísť vyššie ako nad dosku v bráne.
          </p>
        </div>

        {/* Nájazdy */}
        <h2 className="font-bold text-[#051937] mt-12 mb-4" style={{ fontSize: "24px" }}>
          Nájazdy
        </h2>
        <div className="space-y-4 mb-8">
          <div className="flex gap-3 items-start">
            <span className="text-[#C8102E] font-bold shrink-0">➜</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              Nájazdy sú súboje 1 na 1 medzi hráčom a brankárom. Sú nariadené iba vtedy, ak je potrebné určiť víťaza a zápas skončil remízou. K rozstrelu nikdy nedochádza počas riadneho hracieho času.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#C8102E] font-bold shrink-0">➜</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              Zo štvrtinovej čiary sa útočník rozbehne smerom k bránke. Snaží sa skórovať do 8 sekúnd. Počas týchto 8 sekúnd môže urobiť niekoľko pokusov o gól, pokiaľ lopta zostáva v hre alebo na ihrisku.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
