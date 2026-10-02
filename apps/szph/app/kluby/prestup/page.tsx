import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Prestup hráčov | SZPH",
  description:
    "Pravidlá a postup pre prestup hráčov pozemného hokeja medzi klubmi v rámci SZPH.",
};

export default function PrestupPage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span
            className="font-bold uppercase text-white mb-4 block"
            style={{ fontSize: "10px", letterSpacing: "0.14em" }}
          >
            Kluby
          </span>
          <h1
            className="font-garet font-bold italic text-white leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Prestup hráčov
          </h1>
          <p
            className="text-white mt-3 max-w-xl"
            style={{ fontSize: "15px" }}
          >
            Pravidlá a podmienky prestupu medzi klubmi pozemného hokeja.
          </p>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <h2
          className="font-bold text-[#051937] mb-3"
          style={{ fontSize: "24px" }}
        >
          Prestupový poriadok
        </h2>
        <p
          className="text-[#334155] leading-relaxed mb-8"
          style={{ fontSize: "15px" }}
        >
          Prestup hráča medzi klubmi pozemného hokeja sa riadi Súťažným
          poriadkom SZPH a príslušnými predpismi zväzu. Každý prestup musí byť
          schválený oboma klubmi a potvrdený sekretariátom SZPH.
        </p>

        <div
          className="rounded-lg border border-[#e2e8f0] bg-white p-8 mb-8"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
        >
          <h2
            className="font-bold text-[#051937] mb-4"
            style={{ fontSize: "24px" }}
          >
            Prestupové obdobia
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-[#012d74] shrink-0" />
              <div>
                <p
                  className="font-bold text-[#051937]"
                  style={{ fontSize: "15px" }}
                >
                  Letné prestupové obdobie
                </p>
                <p className="text-[#334155]" style={{ fontSize: "15px" }}>
                  Hlavné prestupové okno pred začiatkom novej súťažnej sezóny.
                  Presné termíny stanovuje SZPH pred každou sezónou.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-[#012d74] shrink-0" />
              <div>
                <p
                  className="font-bold text-[#051937]"
                  style={{ fontSize: "15px" }}
                >
                  Zimné prestupové obdobie
                </p>
                <p className="text-[#334155]" style={{ fontSize: "15px" }}>
                  Doplnkové prestupové okno v priebehu sezóny. Slúži na riešenie
                  výnimočných situácií a doplnenie káder klubov.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="rounded-lg border border-[#e2e8f0] bg-white p-8 mb-8"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
        >
          <h2
            className="font-bold text-[#051937] mb-4"
            style={{ fontSize: "24px" }}
          >
            Postup pri prestupe
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-bold text-white"
                style={{ background: "#051937", fontSize: "13px" }}
              >
                1
              </span>
              <p
                className="text-[#334155] leading-relaxed"
                style={{ fontSize: "15px" }}
              >
                Hráč podá písomnú žiadosť o prestup v materskom klube.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-bold text-white"
                style={{ background: "#051937", fontSize: "13px" }}
              >
                2
              </span>
              <p
                className="text-[#334155] leading-relaxed"
                style={{ fontSize: "15px" }}
              >
                Materský klub sa vyjadrí k žiadosti (súhlas alebo nesúhlas).
              </p>
            </div>
            <div className="flex items-start gap-4">
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-bold text-white"
                style={{ background: "#051937", fontSize: "13px" }}
              >
                3
              </span>
              <p
                className="text-[#334155] leading-relaxed"
                style={{ fontSize: "15px" }}
              >
                Nový klub podá žiadosť o registráciu prestupu na SZPH.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-bold text-white"
                style={{ background: "#051937", fontSize: "13px" }}
              >
                4
              </span>
              <p
                className="text-[#334155] leading-relaxed"
                style={{ fontSize: "15px" }}
              >
                SZPH schváli prestup a aktualizuje registráciu hráča.
              </p>
            </div>
          </div>
        </div>

        <div
          className="rounded-lg border border-[#012d74]/20 p-8"
          style={{ background: "#f0f4ff" }}
        >
          <h2
            className="font-bold text-[#051937] mb-3"
            style={{ fontSize: "24px" }}
          >
            Podrobné pravidlá
          </h2>
          <p
            className="text-[#334155] leading-relaxed"
            style={{ fontSize: "15px" }}
          >
            Kompletné pravidlá prestupov hráčov sú uvedené v{" "}
            <Link
              href="/dokumenty/sutazny-poriadok"
              className="inline-flex items-center gap-1.5 font-bold text-[#012d74] hover:underline"
            >
              Súťažnom poriadku SZPH
            </Link>
            . Pre individuálne otázky kontaktujte sekretariát na{" "}
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
