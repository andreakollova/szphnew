import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Registrácia hráčov cez kluby | SZPH",
  description:
    "Informácie pre kluby o procese registrácie hráčov pozemného hokeja v SZPH.",
};

export default function PreKlubyRegistraciaPage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span
            className="font-bold uppercase text-white/40 mb-4 block"
            style={{ fontSize: "10px", letterSpacing: "0.14em" }}
          >
            Pre kluby
          </span>
          <h1
            className="font-garet font-bold italic text-white leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Registrácia hráčov cez klub
          </h1>
          <p
            className="text-white/50 mt-3 max-w-xl"
            style={{ fontSize: "15px" }}
          >
            Postup a povinnosti klubu pri registrácii hráčov v SZPH.
          </p>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <p
          className="text-[#334155] leading-relaxed mb-8"
          style={{ fontSize: "15px" }}
        >
          Registrácia hráčov prebieha výlučne prostredníctvom materského klubu.
          Klub je zodpovedný za správnosť a úplnosť registračných údajov
          a za dodržanie všetkých administratívnych postupov stanovených SZPH.
        </p>

        <div
          className="rounded-2xl border border-[#e2e8f0] bg-white p-8 mb-8"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
        >
          <h2
            className="font-bold text-[#051937] mb-4"
            style={{ fontSize: "24px" }}
          >
            Povinnosti klubu pri registrácii
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-bold text-white"
                style={{ background: "#051937", fontSize: "13px" }}
              >
                1
              </span>
              <div>
                <p
                  className="font-bold text-[#051937]"
                  style={{ fontSize: "15px" }}
                >
                  Overenie údajov hráča
                </p>
                <p className="text-[#334155]" style={{ fontSize: "15px" }}>
                  Skontrolujte správnosť osobných údajov, dátumu narodenia
                  a kontaktných informácií hráča. Pri maloletých overte totožnosť
                  zákonného zástupcu.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-bold text-white"
                style={{ background: "#051937", fontSize: "13px" }}
              >
                2
              </span>
              <div>
                <p
                  className="font-bold text-[#051937]"
                  style={{ fontSize: "15px" }}
                >
                  Zhromaždenie dokumentov
                </p>
                <p className="text-[#334155]" style={{ fontSize: "15px" }}>
                  Vyžiadajte od hráča vyplnený registračný formulár, lekárske
                  potvrdenie o zdravotnej spôsobilosti, fotografiu a prípadný
                  súhlas zákonného zástupcu.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-bold text-white"
                style={{ background: "#051937", fontSize: "13px" }}
              >
                3
              </span>
              <div>
                <p
                  className="font-bold text-[#051937]"
                  style={{ fontSize: "15px" }}
                >
                  Podanie žiadosti na SZPH
                </p>
                <p className="text-[#334155]" style={{ fontSize: "15px" }}>
                  Odošlite kompletnú registračnú dokumentáciu na sekretariát
                  SZPH. Žiadosť je možné podať elektronicky alebo poštou.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-bold text-white"
                style={{ background: "#051937", fontSize: "13px" }}
              >
                4
              </span>
              <div>
                <p
                  className="font-bold text-[#051937]"
                  style={{ fontSize: "15px" }}
                >
                  Uhradenie registračného poplatku
                </p>
                <p className="text-[#334155]" style={{ fontSize: "15px" }}>
                  Uhraďte registračný poplatok podľa aktuálneho sadzobníka SZPH.
                  Výška poplatku závisí od vekovej kategórie hráča.
                </p>
              </div>
            </div>
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
            Dôležité termíny
          </h2>
          <div className="space-y-3">
            {[
              "Registrácia nových hráčov je možná počas celého roka",
              "Pre účasť v súťažiach musí byť registrácia dokončená pred začiatkom príslušnej súťaže",
              "Aktualizáciu údajov registrovaných hráčov je potrebné vykonať pred začiatkom každej sezóny",
              "Prestupy hráčov medzi klubmi sa riadia prestupovým poriadkom SZPH",
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
          className="rounded-2xl border border-[#012d74]/20 p-8"
          style={{ background: "#f0f4ff" }}
        >
          <h2
            className="font-bold text-[#051937] mb-3"
            style={{ fontSize: "24px" }}
          >
            Kontakt a formuláre
          </h2>
          <p
            className="text-[#334155] leading-relaxed"
            style={{ fontSize: "15px" }}
          >
            Registračné formuláre a ďalšie dokumenty sú k dispozícii na
            sekretariáte SZPH. Pre otázky ohľadom registrácie hráčov kontaktujte{" "}
            <a
              href="mailto:szph@szph.sk"
              className="font-bold text-[#012d74] hover:underline"
            >
              szph@szph.sk
            </a>
            . Pozrite tiež{" "}
            <Link
              href="/pre-kluby/podmienky"
              className="inline-flex items-center gap-1.5 font-bold text-[#012d74] hover:underline"
            >
              podmienky registrácie klubu
            </Link>
            .
          </p>
        </div>
      </div>
    </article>
  );
}
