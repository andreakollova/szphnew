import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zásady používania cookies",
};

export default function CookiePolicyPage() {
  return (
    <article className="pb-20" style={{ background: "#f8f9fa" }}>
      <div className="px-6 lg:px-10 xl:px-16 max-w-[1100px] mx-auto pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-bold text-[#012d74] hover:text-[#051937] transition-colors mb-6"
          style={{ fontSize: "12px" }}
        >
          <svg className="h-3.5 w-3.5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          Späť na hlavnú stránku
        </Link>

        <h1 className="font-garet font-bold italic text-[#051937] mb-2" style={{ fontSize: "32px" }}>
          Zásady používania cookies
        </h1>
        <p className="text-[#64748b] mb-10" style={{ fontSize: "13px" }}>
          Posledná aktualizácia: 1. október 2026
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="font-garet font-bold text-[#051937] mb-3" style={{ fontSize: "20px" }}>
              Čo sú cookies?
            </h2>
            <p className="text-[#334155] leading-relaxed" style={{ fontSize: "15px" }}>
              Cookies sú malé textové súbory, ktoré sa ukladajú vo vašom prehliadači pri návšteve webových stránok.
              Pomáhajú nám zapamätať si vaše preferencie, analyzovať návštevnosť a zlepšovať vaše skúsenosti
              na našom webe. Niektoré cookies sú nevyhnutné pre správne fungovanie stránky, iné nám pomáhajú
              lepšie porozumieť tomu, ako naše stránky používate.
            </p>
          </section>

          <section>
            <h2 className="font-garet font-bold text-[#051937] mb-3" style={{ fontSize: "20px" }}>
              Aké cookies používame?
            </h2>

            <div className="space-y-5">
              <div className="bg-white p-5" style={{ borderRadius: "8px", border: "1px solid rgba(1,45,116,0.06)" }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block px-2 py-0.5 font-bold uppercase text-[#16a34a] rounded" style={{ fontSize: "9px", letterSpacing: "0.1em", background: "rgba(22,163,74,0.08)" }}>
                    Vždy aktívne
                  </span>
                </div>
                <h3 className="font-bold text-[#051937] mb-1" style={{ fontSize: "16px" }}>Nevyhnutné cookies</h3>
                <p className="text-[#64748b] leading-relaxed" style={{ fontSize: "13px" }}>
                  Tieto cookies sú potrebné pre základné fungovanie webovej stránky. Zabezpečujú základné funkcie
                  ako navigácia medzi stránkami, prístup k zabezpečeným oblastiam a zapamätanie vašich preferencií
                  ohľadom cookies. Bez týchto cookies by stránka nefungovala správne. Nemožno ich vypnúť.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["szph-cookies-consent", "szph-cookies-accepted"].map(c => (
                    <span key={c} className="px-2 py-0.5 font-bold text-[#051937] rounded" style={{ fontSize: "10px", background: "rgba(1,45,116,0.04)" }}>{c}</span>
                  ))}
                </div>
                <p className="text-[#94a3b8] mt-2" style={{ fontSize: "11px" }}>Platnosť: 365 dní</p>
              </div>

              <div className="bg-white p-5" style={{ borderRadius: "8px", border: "1px solid rgba(1,45,116,0.06)" }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block px-2 py-0.5 font-bold uppercase text-[#0078fd] rounded" style={{ fontSize: "9px", letterSpacing: "0.1em", background: "rgba(0,120,253,0.08)" }}>
                    Voliteľné
                  </span>
                </div>
                <h3 className="font-bold text-[#051937] mb-1" style={{ fontSize: "16px" }}>Analytické cookies</h3>
                <p className="text-[#64748b] leading-relaxed" style={{ fontSize: "13px" }}>
                  Pomáhajú nám porozumieť tomu, ako návštevníci používajú naše stránky. Zbierajú anonymné
                  informácie o počte návštev, zdrojoch návštevnosti a správaní používateľov. Tieto údaje nám
                  pomáhajú zlepšovať obsah a štruktúru webu. Používame Google Analytics.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["_ga", "_ga_*", "_gid"].map(c => (
                    <span key={c} className="px-2 py-0.5 font-bold text-[#051937] rounded" style={{ fontSize: "10px", background: "rgba(1,45,116,0.04)" }}>{c}</span>
                  ))}
                </div>
                <p className="text-[#94a3b8] mt-2" style={{ fontSize: "11px" }}>Platnosť: 1 - 24 mesiacov · Poskytovateľ: Google LLC</p>
              </div>

              <div className="bg-white p-5" style={{ borderRadius: "8px", border: "1px solid rgba(1,45,116,0.06)" }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block px-2 py-0.5 font-bold uppercase text-[#0078fd] rounded" style={{ fontSize: "9px", letterSpacing: "0.1em", background: "rgba(0,120,253,0.08)" }}>
                    Voliteľné
                  </span>
                </div>
                <h3 className="font-bold text-[#051937] mb-1" style={{ fontSize: "16px" }}>Marketingové cookies</h3>
                <p className="text-[#64748b] leading-relaxed" style={{ fontSize: "13px" }}>
                  Používajú sa na sledovanie návštevníkov naprieč webovými stránkami s cieľom zobrazovať relevantné
                  reklamy. Tieto cookies nastavujú reklamní partneri prostredníctvom našej stránky. Môžu byť
                  použité na vytvorenie profilu vašich záujmov a zobrazenie relevantných reklám na iných stránkach.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["_fbp", "fr"].map(c => (
                    <span key={c} className="px-2 py-0.5 font-bold text-[#051937] rounded" style={{ fontSize: "10px", background: "rgba(1,45,116,0.04)" }}>{c}</span>
                  ))}
                </div>
                <p className="text-[#94a3b8] mt-2" style={{ fontSize: "11px" }}>Platnosť: 3 mesiace · Poskytovateľ: Meta Platforms, Inc.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-garet font-bold text-[#051937] mb-3" style={{ fontSize: "20px" }}>
              Ako spravovať cookies?
            </h2>
            <p className="text-[#334155] leading-relaxed" style={{ fontSize: "15px" }}>
              Svoj súhlas s cookies môžete kedykoľvek zmeniť kliknutím na tlačidlo nižšie. Taktiež môžete
              cookies spravovať priamo v nastaveniach vášho prehliadača — v sekcii Súkromie/Cookies.
              Majte na pamäti, že blokovanie niektorých cookies môže ovplyvniť funkčnosť stránky.
            </p>
            <Link
              href="/"
              className="mt-4 inline-flex items-center gap-2 font-garet font-bold text-white transition-all hover:brightness-110"
              style={{
                background: "#012d74",
                borderRadius: "20px",
                padding: "10px 20px",
                fontSize: "12px",
              }}
            >
              Zmeniť nastavenia cookies
            </Link>
          </section>

          <section>
            <h2 className="font-garet font-bold text-[#051937] mb-3" style={{ fontSize: "20px" }}>
              Vaše práva
            </h2>
            <p className="text-[#334155] leading-relaxed" style={{ fontSize: "15px" }}>
              Podľa Nariadenia Európskeho parlamentu a Rady (EÚ) 2016/679 (GDPR) a zákona č. 18/2018 Z.z.
              o ochrane osobných údajov máte právo:
            </p>
            <ul className="mt-3 space-y-2 pl-5" style={{ listStyleType: "disc" }}>
              {[
                "Na prístup k vašim osobným údajom",
                "Na opravu nepresných údajov",
                "Na vymazanie údajov (právo byť zabudnutý)",
                "Na obmedzenie spracúvania",
                "Na prenosnosť údajov",
                "Namietať proti spracúvaniu",
                "Podať sťažnosť na Úrad na ochranu osobných údajov SR",
              ].map((right, i) => (
                <li key={i} className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.7 }}>{right}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-garet font-bold text-[#051937] mb-3" style={{ fontSize: "20px" }}>
              Kontakt
            </h2>
            <p className="text-[#334155] leading-relaxed" style={{ fontSize: "15px" }}>
              Ak máte otázky ohľadom používania cookies alebo ochrany osobných údajov, kontaktujte nás:
            </p>
            <div className="mt-3 bg-white p-5" style={{ borderRadius: "8px", border: "1px solid rgba(1,45,116,0.06)" }}>
              <p className="font-bold text-[#051937]" style={{ fontSize: "14px" }}>Slovenský zväz pozemného hokeja</p>
              <p className="text-[#64748b] mt-1" style={{ fontSize: "13px" }}>Junácka 6, 832 80 Bratislava</p>
              <p className="text-[#64748b]" style={{ fontSize: "13px" }}>E-mail: info@szph.sk</p>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
