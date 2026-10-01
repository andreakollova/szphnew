import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FIH Rebricek - Reprezentacia",
  description: "Svetovy rebricek Medzinarodnej hokejovej federacie (FIH) v pozemnom hokeji.",
};

export default function RebricekPage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      {/* Hero */}
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span className="font-bold uppercase text-white/40 mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>
            Reprezentacia
          </span>
          <h1 className="font-garet font-bold italic text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            FIH svetovy rebricek
          </h1>
          <p className="text-white/50 mt-3 max-w-xl" style={{ fontSize: "15px" }}>
            Svetovy rebricek krajin v pozemnom hokeji podla Medzinarodnej hokejovej federacie (FIH).
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <h2 className="font-bold text-[#051937] mb-6" style={{ fontSize: "24px" }}>
          O rebricku FIH
        </h2>
        <p className="text-[#334155] mb-8" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Medzinarodna hokejova federacia (FIH - Federation Internationale de Hockey) vedie oficialny svetovy rebricek krajin v pozemnom hokeji. Rebricek sa aktualizuje na zaklade vysledkov medzinarodnych zapasov a turnajov. Pozicia v rebricku ovplyvnuje zaradenie krajiny do divizi na europskych a svetovych sampionatoch.
        </p>

        <div className="rounded-2xl p-6 mb-8" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
          <h3 className="font-bold text-[#051937] mb-2" style={{ fontSize: "15px" }}>Ako funguje hodnotenie</h3>
          <p className="text-[#334155]" style={{ fontSize: "14px", lineHeight: 1.8 }}>
            FIH rebricek je zalozeny na bodovom systeme, kde krajiny ziskavaju body za vysledky v oficialnych medzinarodnych zapasoch. Vaha zapasu zalezi na vyzname turnaja - svetove sampionaty a olympijske hry maju vyssiu vahu ako priatelske stretnutia. Body sa postupne znizuju s casom, takze nedavne vysledky maju vacsi vplyv na poziciou v rebricku.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10140;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Muzsky rebricek:</strong> Medzi svetovou spickou dominuju krajiny ako Holandsko, Belgicko, Nemecko, India a Australia.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10140;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Ziensky rebricek:</strong> V zienskom rebricku vedu Holandsko, Argentina, Australia, Belgicko a Velka Britania.
            </p>
          </div>
        </div>

        <a
          href="https://www.fih.hockey/rankings"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 text-white font-bold transition-opacity hover:opacity-90"
          style={{ background: "#012d74", borderRadius: "6px", fontSize: "14px" }}
        >
          Zobrazit aktualny FIH rebricek &#8599;
        </a>

        <div className="mt-12">
          <Link href="/reprezentacia" className="text-[#012d74] hover:underline" style={{ fontSize: "14px" }}>
            &#8592; Spat na prehlad reprezentacii
          </Link>
        </div>
      </div>
    </article>
  );
}
