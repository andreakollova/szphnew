import type { Metadata } from "next";
import Link from "next/link";
import ContactFormSection from "@/app/components/ContactFormSection";

export const metadata: Metadata = {
  title: "Podmienky registrácie klubu | SZPH",
  description:
    "Podmienky a požiadavky pre registráciu klubu pozemného hokeja v Slovenskom zväze pozemného hokeja.",
};

export default function PodmienkyPage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span
            className="font-bold uppercase text-white mb-4 block"
            style={{ fontSize: "10px", letterSpacing: "0.14em" }}
          >
            Pre kluby
          </span>
          <h1
            className="font-garet font-bold italic text-white leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Podmienky registrácie klubu
          </h1>
          <p
            className="text-white mt-3 max-w-xl"
            style={{ fontSize: "15px" }}
          >
            Požiadavky, ktoré musí splniť klub pre členstvo v SZPH.
          </p>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <p
          className="text-[#334155] leading-relaxed mb-8"
          style={{ fontSize: "15px" }}
        >
          Slovenský zväz pozemného hokeja víta záujem o vznik nových klubov
          a rozširovanie členskej základne. Pre registráciu klubu v SZPH je
          potrebné splniť nasledujúce podmienky.
        </p>

        <div
          className="rounded-lg border border-[#e2e8f0] bg-white p-8 mb-8"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
        >
          <h2
            className="font-bold text-[#051937] mb-4"
            style={{ fontSize: "24px" }}
          >
            Právne podmienky
          </h2>
          <div className="space-y-3">
            {[
              "Klub musí byť právnickou osobou registrovanou podľa zákona o športe alebo zákona o združovaní občanov",
              "V stanovách klubu musí byť uvedený pozemný hokej ako hlavná alebo jedna z hlavných športových činností",
              "Klub musí mať štatutárny orgán (predseda, výkonný výbor)",
              "Platné IČO a registrácia v príslušnom registri",
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
          className="rounded-lg border border-[#e2e8f0] bg-white p-8 mb-8"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
        >
          <h2
            className="font-bold text-[#051937] mb-4"
            style={{ fontSize: "24px" }}
          >
            Športové podmienky
          </h2>
          <div className="space-y-3">
            {[
              "Minimálny počet registrovaných hráčov podľa kategórie súťaže",
              "Kvalifikovaný tréner s platnou licenciou SZPH alebo FIH",
              "Zabezpečenie tréningových priestorov (ihrisko alebo hala)",
              "Základné vybavenie pre hráčov a tréningový proces",
              "Záväzok účasti v súťažiach organizovaných SZPH",
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
          className="rounded-lg border border-[#e2e8f0] bg-white p-8 mb-8"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
        >
          <h2
            className="font-bold text-[#051937] mb-4"
            style={{ fontSize: "24px" }}
          >
            Finančné podmienky
          </h2>
          <div className="space-y-3">
            {[
              "Uhradenie registračného poplatku podľa aktuálneho sadzobníka SZPH",
              "Ročné členské príspevky za klub a jednotlivých hráčov",
              "Poplatky za účasť v súťažiach (štartovné)",
              "Schopnosť zabezpečiť financovanie domácich zápasov",
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
          className="rounded-lg border border-[#012d74]/20 p-8"
          style={{ background: "#f0f4ff" }}
        >
          <h2
            className="font-bold text-[#051937] mb-3"
            style={{ fontSize: "24px" }}
          >
            Chcete založiť klub?
          </h2>
          <p
            className="text-[#334155] leading-relaxed mb-4"
            style={{ fontSize: "15px" }}
          >
            Ak máte záujem o založenie nového klubu pozemného hokeja, kontaktujte
            sekretariát SZPH. Radi vám poskytneme podrobné informácie
            a pomôžeme s celým procesom registrácie.
          </p>
          <Link
            href="/pre-kluby/registracia"
            className="inline-flex items-center gap-1.5 font-bold text-[#012d74]"
            style={{ fontSize: "14px" }}
          >
            Postup registrácie klubu
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

        <ContactFormSection
          title="Otázky k podmienkam"
          subtitle="Máte otázky? Radi vám odpovieme."
          formType="podmienky-kluby"
        />
      </div>
    </article>
  );
}
