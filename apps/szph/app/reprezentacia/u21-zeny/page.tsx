import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "U21 Ženy - Reprezentácia",
  description: "Mládežnícka ženská reprezentácia Slovenska do 21 rokov v pozemnom hokeji.",
};

export default function U21ZenyPage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      {/* Hero */}
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span className="font-bold uppercase text-white mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>
            Reprezentácia
          </span>
          <h1 className="font-garet font-bold italic text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            U21 Ženy
          </h1>
          <p className="text-white mt-3 max-w-xl" style={{ fontSize: "15px" }}>
            Mládežnícka ženská reprezentácia Slovenska do 21 rokov v pozemnom hokeji.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <h2 className="font-bold text-[#051937] mb-6" style={{ fontSize: "24px" }}>
          O tíme
        </h2>
        <p className="text-[#334155] mb-8" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Ženská mládežnícka reprezentácia do 21 rokov je dôležitou súčasťou rozvoja ženského pozemného hokeja na Slovensku. Tím združuje mladé hráčky s najväčším potenciálom, ktoré sa pripravujú na pôsobenie v seniorskej reprezentácii. Účasť na medzinárodných turnajoch im dáva príležitosť porovnať sa s rovesníčkami z iných európskych krajín.
        </p>

        <h2 className="font-bold text-[#051937] mt-12 mb-6" style={{ fontSize: "24px" }}>
          Sutaze a turnaje
        </h2>
        <div className="space-y-4 mb-8">
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10140;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>EuroHockey Junior Championship Women:</strong> Hlavna europska sutaz juniorskych zienskych timov. Slovensko sa zucastnuje v prislusnej divizi podla aktualneho zaradenia.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10140;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Pripravne akcie:</strong> Susterenia, treningove kempy a priatelske zapasy pomahaju mladym hrackam rozvijat sa a budovat timovú spolupracu.
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-2xl p-6" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
          <h3 className="font-bold text-[#051937] mb-2" style={{ fontSize: "15px" }}>Budovanie buducnosti</h3>
          <p className="text-[#334155]" style={{ fontSize: "14px", lineHeight: 1.8 }}>
            Investicia do mladych hracok je investicia do buducnosti slovenskeho pozemneho hokeja. Mladeznicka reprezentacia pomaha vytvarat zakladnu pre rast zienskeho hokeja na Slovensku a motivuje dalsie dievcata, aby sa tomuto sportu venovali.
          </p>
        </div>

        <div className="mt-6">
          <Link href="/reprezentacia" className="text-[#012d74] hover:underline" style={{ fontSize: "14px" }}>
            &#8592; Spat na prehlad reprezentacii
          </Link>
        </div>
      </div>
    </article>
  );
}
