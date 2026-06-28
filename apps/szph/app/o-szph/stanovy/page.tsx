import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stanovy a predpisy",
  description: "Stanovy, poriadky a smernice Slovenského zväzu pozemného hokeja.",
};

const documents = [
  { name: "Stanovy", href: "/files/stanovy.pdf", available: true },
  { name: "Volebný a rokovací poriadok", href: "#", available: false },
  { name: "Registračný poriadok", href: "#", available: false },
  { name: "Prestupový poriadok", href: "#", available: false },
  { name: "Súťažný poriadok", href: "/files/sutazny-poriadok-novela-2025_1.pdf", available: true },
  { name: "Disciplinárny poriadok", href: "#", available: false },
  { name: "Zásady hospodárenia SZPH", href: "/files/Zasady-hospodarenia-SZPH-2021-1.doc", available: true },
  { name: "Smernica cestovné náhrady", href: "/files/Smernica-cestovne-nahrady-od-01.04.2023.doc", available: true },
  {
    name: "Smernica – vyúčtovanie finančných prostriedkov uznanému športu",
    href: "/files/smernica-vyuctovanie-financnych-prostriedkov-uznanemu-sportu.doc",
    available: true,
  },
];

export default function StanovyPage() {
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
            Stanovy a predpisy
          </h1>
        </div>
      </div>

      {/* Document list */}
      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <p className="text-[#334155] mb-8" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Právne dokumenty, poriadky a smernice SZPH dostupné na stiahnutie.
        </p>

        <div className="flex flex-col gap-3">
          {documents.map((doc) =>
            doc.available ? (
              <a
                key={doc.name}
                href={doc.href}
                download
                className="flex items-center justify-between gap-4 rounded-2xl px-6 py-5 transition-shadow hover:shadow-md group"
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(1,45,116,0.08)",
                  textDecoration: "none",
                }}
              >
                <span
                  className="font-semibold group-hover:underline"
                  style={{ color: "#1d4ed8", fontSize: "15px" }}
                >
                  {doc.name}
                </span>
                <span
                  className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white"
                  style={{ background: "#1d4ed8", fontSize: "14px" }}
                >
                  ↓
                </span>
              </a>
            ) : (
              <div
                key={doc.name}
                className="flex items-center justify-between gap-4 rounded-2xl px-6 py-5"
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(1,45,116,0.08)",
                }}
              >
                <span style={{ color: "#94a3b8", fontSize: "15px" }}>{doc.name}</span>
                <span
                  className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold"
                  style={{ background: "#e2e8f0", color: "#94a3b8", fontSize: "14px" }}
                >
                  ↓
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </article>
  );
}
