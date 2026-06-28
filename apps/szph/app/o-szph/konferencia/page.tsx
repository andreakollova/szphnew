import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Konferencia",
  description: "Konferencia je najvyšším zastupiteľským a legislatívnym orgánom SZPH.",
};

interface KonferenciaDoc {
  label: string;
  href: string;
}

interface Konferencia {
  title: string;
  note?: string;
  docs: KonferenciaDoc[];
}

const konferencie: Konferencia[] = [
  {
    title: "20. Konferencia SZPH zo dňa 27. 06. 2026",
    docs: [
      { label: "Pozvánka", href: "#" },
    ],
  },
  {
    title: "19. Konferencia SZPH zo dňa 14. 06. 2025",
    docs: [
      { label: "Pozvánka", href: "#" },
      { label: "Program", href: "#" },
      { label: "Výročná správa za rok 2024", href: "#" },
      { label: "Správa auditora za rok 2024", href: "#" },
      { label: "Rozpočet 2025", href: "#" },
      { label: "Uznesenie", href: "#" },
      { label: "Zápisnica", href: "#" },
    ],
  },
  {
    title: "18. Konferencia SZPH zo dňa 23. 06. 2024",
    docs: [
      { label: "Pozvánka", href: "#" },
      { label: "Program", href: "#" },
      { label: "Výročná správa za rok 2023", href: "#" },
      { label: "Správa auditora za rok 2023", href: "#" },
      { label: "Rozpočet organizácie", href: "#" },
      { label: "Uznesenie", href: "#" },
      { label: "Zápisnica", href: "#" },
    ],
  },
  {
    title: "17. Konferencia SZPH zo dňa 11. 06. 2023",
    note: "Na konferencii prebehla voľba kontrolóra. Kandidát: JUDr. Jaromír Šmátrala.",
    docs: [
      { label: "Pozvánka na konferenciu", href: "#" },
      { label: "Program", href: "#" },
      { label: "Zápisnica", href: "#" },
      { label: "Uznesenie", href: "#" },
    ],
  },
  {
    title: "16. Konferencia SZPH zo dňa 04. 06. 2022",
    docs: [
      { label: "Program a pozvánka", href: "#" },
      { label: "Uznesenie", href: "#" },
      { label: "Zápisnica", href: "#" },
      { label: "Prezenčná listina", href: "#" },
      { label: "Výročná správa za rok 2021", href: "#" },
    ],
  },
  {
    title: "15. Konferencia SZPH zo dňa 14. 05. 2021 (per rollam)",
    docs: [
      { label: "Program a pozvánka", href: "#" },
      { label: "Uznesenie", href: "#" },
      { label: "Zápisnica", href: "#" },
      { label: "Výročná správa za rok 2020", href: "#" },
    ],
  },
  {
    title: "14. Konferencia SZPH zo dňa 21. 05. 2020 (per rollam)",
    docs: [
      { label: "Pozvánka", href: "#" },
      { label: "Program", href: "#" },
      { label: "Uznesenie", href: "#" },
      { label: "Zápisnica", href: "#" },
      { label: "Výročná správa za rok 2019", href: "#" },
    ],
  },
  {
    title: "13. Konferencia SZPH zo dňa 01. 06. 2019",
    docs: [
      { label: "Pozvánka", href: "#" },
      { label: "Program", href: "#" },
      { label: "Zápisnica", href: "#" },
      { label: "Uznesenie", href: "#" },
      { label: "Prezenčná listina", href: "#" },
      { label: "Výročná správa za rok 2018", href: "#" },
    ],
  },
  {
    title: "12. Konferencia SZPH zo dňa 10–12. 01. 2019 (per rollam)",
    docs: [
      { label: "Zápisnica z 12. konferencie", href: "#" },
      { label: "Uznesenie", href: "#" },
    ],
  },
  {
    title: "11. Konferencia SZPH zo dňa 16. 06. 2018",
    docs: [
      { label: "Zápisnica", href: "#" },
      { label: "Výročná správa 2017", href: "#" },
      { label: "Uznesenie", href: "#" },
    ],
  },
  {
    title: "10. Konferencia SZPH zo dňa 24–28. 11. 2017 (per rollam)",
    docs: [
      { label: "Výročná správa 2016", href: "#" },
      { label: "Zápisnica", href: "#" },
      { label: "Uznesenie", href: "#" },
    ],
  },
];

export default function KonferenciaPage() {
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
            Konferencia
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <p className="text-[#334155] mb-12" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Konferencia je najvyšším zastupiteľským a legislatívnym orgánom SZPH. Koná sa minimálne 1-krát ročne. Na konferencií sa zúčastnujú delegáti podľa kľúča v stanovách SZPH. Konferencia má v rámci SZPH právomoc normotvornú, kreačnú, kontrolnú a rozhodovaciu.
        </p>

        <div className="space-y-5">
          {konferencie.map((k) => (
            <div
              key={k.title}
              className="rounded-2xl p-6"
              style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}
            >
              <h2 className="font-bold text-[#051937] mb-3" style={{ fontSize: "16px" }}>
                {k.title}
              </h2>
              {k.note && (
                <p className="text-[#334155] mb-4" style={{ fontSize: "13px", lineHeight: 1.7 }}>
                  {k.note}
                </p>
              )}
              <div className="flex flex-wrap gap-2">
                {k.docs.map((doc) => (
                  <a
                    key={doc.label}
                    href={doc.href}
                    className="inline-flex items-center gap-1.5 rounded-full font-medium transition-colors"
                    style={{
                      fontSize: "12px",
                      padding: "4px 12px",
                      background: "#f1f5f9",
                      color: "#012D74",
                      border: "1px solid rgba(1,45,116,0.12)",
                      textDecoration: "none",
                    }}
                  >
                    <span style={{ fontSize: "11px" }}>↓</span>
                    {doc.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
