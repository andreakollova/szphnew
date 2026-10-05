import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ochrana osobných údajov | SZPH",
  description:
    "Zásady ochrany osobných údajov Slovenského zväzu pozemného hokeja v súlade s GDPR.",
};

export default function OchranaOsobnychUdajovPage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[1100px] mx-auto">
          <span
            className="font-bold uppercase text-white mb-4 block"
            style={{ fontSize: "10px", letterSpacing: "0.14em" }}
          >
            Právne informácie
          </span>
          <h1
            className="font-garet font-bold italic text-white leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Ochrana osobných údajov
          </h1>
          <p
            className="text-white mt-3 max-w-xl"
            style={{ fontSize: "15px" }}
          >
            Zásady spracúvania osobných údajov v súlade s nariadením GDPR.
          </p>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 pt-12 space-y-8">
        <section>
          <h2
            className="font-bold text-[#051937] mb-3"
            style={{ fontSize: "24px" }}
          >
            1. Prevádzkovateľ
          </h2>
          <p
            className="text-[#334155] leading-relaxed"
            style={{ fontSize: "15px" }}
          >
            Prevádzkovateľom osobných údajov je Slovenský zväz pozemného hokeja
            (SZPH), so sídlom Jurkovičova 5, 831 06 Bratislava, IČO: 31751075,
            e-mail:{" "}
            <a
              href="mailto:szph@szph.sk"
              className="font-bold text-[#012d74] hover:underline"
            >
              szph@szph.sk
            </a>
            .
          </p>
        </section>

        <section>
          <h2
            className="font-bold text-[#051937] mb-3"
            style={{ fontSize: "24px" }}
          >
            2. Účel spracúvania osobných údajov
          </h2>
          <p
            className="text-[#334155] leading-relaxed mb-3"
            style={{ fontSize: "15px" }}
          >
            SZPH spracúva osobné údaje na nasledujúce účely:
          </p>
          <div className="space-y-2">
            {[
              "Registrácia členov, hráčov, trénerov a rozhodcov",
              "Organizácia a riadenie súťaží pozemného hokeja",
              "Vedenie evidencie členov a štatistík",
              "Komunikácia s členmi a partnermi zväzu",
              "Plnenie zákonných povinností (účtovníctvo, dane, zákon o športe)",
              "Propagácia pozemného hokeja (fotografie, videá zo zápasov a podujatí)",
              "Zabezpečenie bezpečnosti na športových podujatiach",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-[#012d74] shrink-0" />
                <p className="text-[#334155]" style={{ fontSize: "15px" }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2
            className="font-bold text-[#051937] mb-3"
            style={{ fontSize: "24px" }}
          >
            3. Právny základ spracúvania
          </h2>
          <p
            className="text-[#334155] leading-relaxed mb-3"
            style={{ fontSize: "15px" }}
          >
            Osobné údaje spracúvame na základe:
          </p>
          <div className="space-y-2">
            {[
              "Plnenia zmluvy (členský vzťah, registrácia hráča)",
              "Plnenia zákonnej povinnosti (zákon o športe, účtovné predpisy)",
              "Oprávneného záujmu prevádzkovateľa (propagácia športu, štatistiky)",
              "Súhlasu dotknutej osoby (marketingová komunikácia, fotografie)",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-[#012d74] shrink-0" />
                <p className="text-[#334155]" style={{ fontSize: "15px" }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2
            className="font-bold text-[#051937] mb-3"
            style={{ fontSize: "24px" }}
          >
            4. Rozsah spracúvaných údajov
          </h2>
          <p
            className="text-[#334155] leading-relaxed mb-3"
            style={{ fontSize: "15px" }}
          >
            Spracúvame najmä nasledujúce kategórie osobných údajov:
          </p>
          <div className="space-y-2">
            {[
              "Identifikačné údaje (meno, priezvisko, dátum narodenia, fotografia)",
              "Kontaktné údaje (adresa, e-mail, telefónne číslo)",
              "Údaje o členstve a registrácii (klubová príslušnosť, registračné číslo)",
              "Športové údaje (výsledky, štatistiky, disciplinárne konania)",
              "Údaje o zdravotnej spôsobilosti (lekárske potvrdenia)",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-[#012d74] shrink-0" />
                <p className="text-[#334155]" style={{ fontSize: "15px" }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2
            className="font-bold text-[#051937] mb-3"
            style={{ fontSize: "24px" }}
          >
            5. Príjemcovia osobných údajov
          </h2>
          <p
            className="text-[#334155] leading-relaxed mb-3"
            style={{ fontSize: "15px" }}
          >
            Osobné údaje môžu byť poskytnuté nasledujúcim príjemcom:
          </p>
          <div className="space-y-2">
            {[
              "Medzinárodná hokejová federácia (FIH) a Európska hokejová federácia (EHF)",
              "Slovenský olympijský a športový výbor (SOŠV)",
              "Ministerstvo školstva, vedy, výskumu a športu SR",
              "Kluby pozemného hokeja registrované v SZPH",
              "Poskytovatelia IT služieb a webhostingu",
              "Orgány verejnej moci v rozsahu zákonných povinností",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-[#012d74] shrink-0" />
                <p className="text-[#334155]" style={{ fontSize: "15px" }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2
            className="font-bold text-[#051937] mb-3"
            style={{ fontSize: "24px" }}
          >
            6. Doba uchovávania
          </h2>
          <p
            className="text-[#334155] leading-relaxed"
            style={{ fontSize: "15px" }}
          >
            Osobné údaje uchovávame po dobu trvania členského vzťahu a následne
            po dobu nevyhnutnú na splnenie zákonných povinností (spravidla 10
            rokov pre účtovné doklady). Športové štatistiky a výsledky môžu byť
            uchovávané dlhšie na účely vedenia historických záznamov slovenského
            pozemného hokeja.
          </p>
        </section>

        <section>
          <h2
            className="font-bold text-[#051937] mb-3"
            style={{ fontSize: "24px" }}
          >
            7. Práva dotknutej osoby
          </h2>
          <p
            className="text-[#334155] leading-relaxed mb-3"
            style={{ fontSize: "15px" }}
          >
            V súvislosti so spracúvaním osobných údajov máte nasledujúce práva:
          </p>
          <div className="space-y-2">
            {[
              "Právo na prístup k osobným údajom",
              "Právo na opravu nesprávnych alebo neúplných údajov",
              "Právo na vymazanie údajov (právo byť zabudnutý)",
              "Právo na obmedzenie spracúvania",
              "Právo na prenosnosť údajov",
              "Právo namietať proti spracúvaniu",
              "Právo odvolať súhlas so spracúvaním",
              "Právo podať sťažnosť na Úrad na ochranu osobných údajov SR",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-[#012d74] shrink-0" />
                <p className="text-[#334155]" style={{ fontSize: "15px" }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2
            className="font-bold text-[#051937] mb-3"
            style={{ fontSize: "24px" }}
          >
            8. Bezpečnosť údajov
          </h2>
          <p
            className="text-[#334155] leading-relaxed"
            style={{ fontSize: "15px" }}
          >
            SZPH prijal primerané technické a organizačné opatrenia na ochranu
            osobných údajov pred neoprávneným prístupom, stratou, zničením
            alebo poškodením. Prístup k osobným údajom majú len oprávnené osoby,
            ktoré sú viazané povinnosťou mlčanlivosti.
          </p>
        </section>

        <section>
          <h2
            className="font-bold text-[#051937] mb-3"
            style={{ fontSize: "24px" }}
          >
            9. Kontakt
          </h2>
          <p
            className="text-[#334155] leading-relaxed"
            style={{ fontSize: "15px" }}
          >
            V prípade otázok týkajúcich sa ochrany osobných údajov nás
            kontaktujte na adrese:
          </p>
          <div
            className="mt-4 rounded-lg border border-[#e2e8f0] bg-white p-6"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
          >
            <p
              className="font-bold text-[#051937] mb-1"
              style={{ fontSize: "15px" }}
            >
              Slovenský zväz pozemného hokeja
            </p>
            <p className="text-[#334155]" style={{ fontSize: "15px" }}>
              Jurkovičova 5, 831 06 Bratislava
            </p>
            <p className="text-[#334155]" style={{ fontSize: "15px" }}>
              IČO: 31751075
            </p>
            <p className="text-[#334155] mt-2" style={{ fontSize: "15px" }}>
              E-mail:{" "}
              <a
                href="mailto:szph@szph.sk"
                className="font-bold text-[#012d74] hover:underline"
              >
                szph@szph.sk
              </a>
            </p>
          </div>
        </section>

        <p className="text-[#94a3b8]" style={{ fontSize: "13px" }}>
          Tieto zásady ochrany osobných údajov sú platné a účinné od 1. januára
          2024. SZPH si vyhradzuje právo tieto zásady kedykoľvek aktualizovať.
        </p>
      </div>
    </article>
  );
}
