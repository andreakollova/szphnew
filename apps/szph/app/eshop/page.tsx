import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-shop | SZPH",
  description:
    "Oficiálny e-shop Slovenského zväzu pozemného hokeja. Dresy, merch a vybavenie pre pozemný hokej.",
};

export default function EshopPage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span
            className="font-bold uppercase text-white/40 mb-4 block"
            style={{ fontSize: "10px", letterSpacing: "0.14em" }}
          >
            Nakupovanie
          </span>
          <h1
            className="font-garet font-bold italic text-white leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Oficiálny e-shop SZPH
          </h1>
          <p
            className="text-white/50 mt-3 max-w-xl"
            style={{ fontSize: "15px" }}
          >
            Dresy, merchandise a vybavenie pre pozemný hokej na jednom mieste.
          </p>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <div
          className="rounded-2xl border border-[#e2e8f0] bg-white p-10 text-center"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
        >
          <div
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
            style={{ background: "#051937" }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </div>

          <h2
            className="font-garet font-bold text-[#051937] mb-3"
            style={{ fontSize: "24px" }}
          >
            E-shop sa pripravuje
          </h2>

          <p
            className="text-[#334155] leading-relaxed max-w-lg mx-auto mb-6"
            style={{ fontSize: "15px" }}
          >
            Pracujeme na spustení oficiálneho e-shopu Slovenského zväzu
            pozemného hokeja. Čoskoro tu nájdete oficiálne dresy, tréningové
            oblečenie, merchandise a vybavenie pre pozemný hokej.
          </p>

          <div className="space-y-3 max-w-sm mx-auto text-left">
            <div className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-[#012d74] shrink-0" />
              <p className="text-[#334155]" style={{ fontSize: "15px" }}>
                Oficiálne dresy a reprezentačné oblečenie
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-[#012d74] shrink-0" />
              <p className="text-[#334155]" style={{ fontSize: "15px" }}>
                Tréningový merch a doplnky s logom SZPH
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-[#012d74] shrink-0" />
              <p className="text-[#334155]" style={{ fontSize: "15px" }}>
                Hokejky, loptičky a ochranné vybavenie
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-[#012d74] shrink-0" />
              <p className="text-[#334155]" style={{ fontSize: "15px" }}>
                Brankárska výstroj a tréningové pomôcky
              </p>
            </div>
          </div>

          <p
            className="text-[#94a3b8] mt-8"
            style={{ fontSize: "13px" }}
          >
            Pre aktuálne informácie o spustení e-shopu sledujte naše sociálne
            siete alebo nás kontaktujte na{" "}
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
