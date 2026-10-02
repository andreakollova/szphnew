import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FIH Rebríček - Reprezentácia",
  description: "Svetový rebríček Medzinárodnej hokejovej federácie (FIH) v pozemnom hokeji.",
};

export default function RebricekPage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      {/* Hero */}
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span className="font-bold uppercase text-white mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>
            Reprezentácia
          </span>
          <h1 className="font-garet font-bold italic text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            FIH svetový rebríček
          </h1>
          <p className="text-white mt-3 max-w-xl" style={{ fontSize: "15px" }}>
            Svetový rebríček krajín v pozemnom hokeji podľa Medzinárodnej hokejovej federácie (FIH).
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <h2 className="font-bold text-[#051937] mb-6" style={{ fontSize: "24px" }}>
          O rebríčku FIH
        </h2>
        <p className="text-[#334155] mb-8" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Medzinárodná hokejová federácia (FIH - Federation Internationale de Hockey) vedie oficiálny svetový rebríček krajín v pozemnom hokeji. Rebríček sa aktualizuje na základe výsledkov medzinárodných zápasov a turnajov. Pozícia v rebríčku ovplyvňuje zaradenie krajiny do divízií na európskych a svetových šampionátoch.
        </p>

        <div className="rounded-lg p-6 mb-8" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
          <h3 className="font-bold text-[#051937] mb-2" style={{ fontSize: "15px" }}>Ako funguje hodnotenie</h3>
          <p className="text-[#334155]" style={{ fontSize: "14px", lineHeight: 1.8 }}>
            FIH rebríček je založený na bodovom systéme, kde krajiny získavajú body za výsledky v oficiálnych medzinárodných zápasoch. Váha zápasu záleží na význame turnaja - svetové šampionáty a olympijské hry majú vyššiu váhu ako priateľské stretnutia. Body sa postupne znižujú s časom, takže nedávne výsledky majú väčší vplyv na pozíciu v rebríčku.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10140;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Mužský rebríček:</strong> Medzi svetovou špičkou dominujú krajiny ako Holandsko, Belgicko, Nemecko, India a Austrália.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-[#012d74] font-bold shrink-0">&#10140;</span>
            <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              <strong>Ženský rebríček:</strong> V ženskom rebríčku vedú Holandsko, Argentína, Austrália, Belgicko a Veľká Británia.
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
          Zobraziť aktuálny FIH rebríček &#8599;
        </a>

        <div className="mt-12">
          <Link href="/reprezentacia" className="text-[#012d74] hover:underline" style={{ fontSize: "14px" }}>
            &#8592; Späť na prehľad reprezentácií
          </Link>
        </div>
      </div>
    </article>
  );
}
