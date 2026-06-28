import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Predsedníctvo",
  description: "Predsedníctvo Slovenského zväzu pozemného hokeja je najvyšším výkonným orgánom SZPH pre riadenie pozemného hokeja.",
};

const predseda = {
  name: "Ing. Ľudmila Pastorová",
  role: "Predseda",
};

const clenovia = [
  "Matej Boho",
  "Milan Dugovič",
  "Ing. Zuzana Hoštáková",
  "Zuzana Krajčírová",
  "Ing. Michal Pivko",
  "Ľuboš Kamendy",
  "Martin Čavoš",
];

export default function PredsednictvoPage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      {/* Hero */}
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span
            className="font-bold uppercase text-white/40 mb-4 block"
            style={{ fontSize: "10px", letterSpacing: "0.14em" }}
          >
            O SZPH
          </span>
          <h1
            className="font-bold text-white leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Predsedníctvo
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <p className="text-[#334155] mb-12" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Predsedníctvo Slovenského zväzu pozemného hokeja je podľa stanov najvyšším výkonným orgánom SZPH pre riadenie pozemného hokeja, ktorého členov volia delegáti konferencie. Predsedníctvo má 5–11 členov a je zložené z predsedu a členov predsedníctva.
        </p>

        {/* Predseda */}
        <h2 className="font-bold text-[#051937] mb-6" style={{ fontSize: "20px" }}>
          Predseda
        </h2>
        <div className="mb-10">
          <div
            className="rounded-2xl p-6 flex items-center gap-4"
            style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}
          >
            <div
              className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-white"
              style={{ background: "#051937", fontSize: "18px" }}
            >
              {predseda.name.charAt(predseda.name.indexOf(" ") + 1)}
            </div>
            <div>
              <p className="font-bold text-[#051937]" style={{ fontSize: "16px" }}>
                {predseda.name}
              </p>
              <p className="text-[#C8102E] font-semibold uppercase" style={{ fontSize: "11px", letterSpacing: "0.1em" }}>
                {predseda.role}
              </p>
            </div>
          </div>
        </div>

        {/* Členovia */}
        <h2 className="font-bold text-[#051937] mb-6" style={{ fontSize: "20px" }}>
          Členovia predsedníctva
        </h2>
        <div className="grid gap-4 mb-12" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
          {clenovia.map((meno) => {
            const initials = meno
              .split(" ")
              .filter((w) => !w.endsWith("."))
              .slice(0, 2)
              .map((w) => w[0])
              .join("");
            return (
              <div
                key={meno}
                className="rounded-2xl p-5 flex items-center gap-4"
                style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}
              >
                <div
                  className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white"
                  style={{ background: "#012D74", fontSize: "14px" }}
                >
                  {initials}
                </div>
                <p className="font-semibold text-[#051937]" style={{ fontSize: "15px" }}>
                  {meno}
                </p>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <div
          className="rounded-2xl p-6"
          style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}
        >
          <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
            Pozvánky a zápisy zo zasadnutia najvyšších orgánov Slovenského zväzu pozemného hokeja nájdete na{" "}
            <a
              href="https://sport.iedu.sk/Company/Company/10896"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#C8102E] underline underline-offset-2"
            >
              priloženom linku
            </a>
            .
          </p>
        </div>
      </div>
    </article>
  );
}
