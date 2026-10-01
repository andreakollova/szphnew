import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Súťažný poriadok | SZPH",
  description:
    "Súťažný poriadok Slovenského zväzu pozemného hokeja - pravidlá a organizácia súťaží.",
};

export default function SutaznyPoriadokPage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span
            className="font-bold uppercase text-white mb-4 block"
            style={{ fontSize: "10px", letterSpacing: "0.14em" }}
          >
            Dokumenty
          </span>
          <h1
            className="font-garet font-bold italic text-white leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Súťažný poriadok SZPH
          </h1>
          <p
            className="text-white mt-3 max-w-xl"
            style={{ fontSize: "15px" }}
          >
            Pravidlá organizácie a riadenia súťaží pozemného hokeja na
            Slovensku.
          </p>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <p
          className="text-[#334155] leading-relaxed mb-8"
          style={{ fontSize: "15px" }}
        >
          Súťažný poriadok Slovenského zväzu pozemného hokeja je základný
          dokument upravujúci organizáciu, priebeh a vyhodnotenie všetkých
          oficiálnych súťaží riadených SZPH. Dokument je záväzný pre všetky
          kluby, hráčov, trénerov a rozhodcov registrovaných v SZPH.
        </p>

        <div
          className="rounded-2xl border border-[#e2e8f0] bg-white p-8 mb-8"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
        >
          <h2
            className="font-bold text-[#051937] mb-4"
            style={{ fontSize: "24px" }}
          >
            Obsah súťažného poriadku
          </h2>
          <div className="space-y-3">
            {[
              "Všeobecné ustanovenia a definície",
              "Podmienky účasti klubov a hráčov v súťažiach",
              "Registrácia a prestupy hráčov",
              "Organizácia a riadenie súťaží (liga, pohár, play-off)",
              "Pravidlá hry a ich uplatňovanie",
              "Bodovanie a zostavovanie tabuliek",
              "Disciplinárny poriadok a sankcie",
              "Odvolacie konanie",
              "Povinnosti usporiadateľa domáceho stretnutia",
              "Zdravotné zabezpečenie zápasov",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-[#012d74] shrink-0" />
                <p className="text-[#334155]" style={{ fontSize: "15px" }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          className="rounded-2xl border border-[#e2e8f0] bg-white p-8 mb-8"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
        >
          <h2
            className="font-bold text-[#051937] mb-4"
            style={{ fontSize: "24px" }}
          >
            Stiahnuť dokument
          </h2>
          <p
            className="text-[#334155] leading-relaxed mb-6"
            style={{ fontSize: "15px" }}
          >
            Aktuálne platné znenie Súťažného poriadku SZPH je k dispozícii na
            stiahnutie vo formáte PDF.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-lg px-6 py-3 font-bold text-white transition-opacity hover:opacity-90"
            style={{ background: "#051937", fontSize: "14px" }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Stiahnuť Súťažný poriadok (PDF)
          </a>
          <p className="text-[#94a3b8] mt-3" style={{ fontSize: "13px" }}>
            Dokument bude čoskoro k dispozícii na stiahnutie.
          </p>
        </div>

        <div
          className="rounded-2xl border border-[#012d74]/20 p-8"
          style={{ background: "#f0f4ff" }}
        >
          <h2
            className="font-bold text-[#051937] mb-3"
            style={{ fontSize: "24px" }}
          >
            Súvisiace dokumenty
          </h2>
          <p
            className="text-[#334155] leading-relaxed mb-4"
            style={{ fontSize: "15px" }}
          >
            Pre komplexný prehľad pravidiel a predpisov pozrite aj ďalšie
            dokumenty zväzu:
          </p>
          <div className="space-y-2">
            <Link
              href="/dokumenty"
              className="inline-flex items-center gap-1.5 font-bold text-[#012d74]"
              style={{ fontSize: "14px" }}
            >
              Všetky dokumenty SZPH
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
