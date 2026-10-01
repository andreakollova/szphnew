import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FIH licencie | SzPH",
  description:
    "Medzinarodne licencie FIH pre trenerov a rozhodcov polneho hokeja na Slovensku.",
};

export default function FihLicenciePage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span
            className="font-bold uppercase text-white/40 mb-4 block"
            style={{ fontSize: "10px", letterSpacing: "0.14em" }}
          >
            Vzdelavanie
          </span>
          <h1
            className="font-garet font-bold italic text-white leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            FIH licencie
          </h1>
          <p
            className="text-white/50 mt-3 max-w-xl"
            style={{ fontSize: "15px" }}
          >
            Medzinarodne licencie a certifikacie vydavane Medzinarodnou
            hokejovou federaciou.
          </p>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <section className="mb-12">
          <h2
            className="font-garet font-bold text-[#051937] mb-4"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
          >
            Co su FIH licencie?
          </h2>
          <p className="text-[#333] leading-relaxed mb-4" style={{ fontSize: "15px" }}>
            Medzinarodna hokejova federacia (FIH - Federation Internationale de
            Hockey) definuje globalny standard vzdelavania a licencovania pre
            trenerov aj rozhodcov polneho hokeja. FIH licencie su uznvane po
            celom svete a opravnuju ich drzitelov posobit na medzinarodnych
            sutaziach.
          </p>
          <p className="text-[#333] leading-relaxed mb-6" style={{ fontSize: "15px" }}>
            SzPH ako clen FIH zabezpecuje pristup k medzinarodnym licencnym
            programom pre slovenskych trenerov a rozhodcov.
          </p>
        </section>

        <section className="mb-12">
          <h2
            className="font-garet font-bold text-[#051937] mb-4"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
          >
            FIH trenerske licencie
          </h2>
          <div className="space-y-4 mb-6">
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                FIH Level 1 - Community Coach
              </h3>
              <p className="text-sm text-[#666]">
                Medzinarodne uznvana zakladna trenerska kvalifikacia.
                Ekvivalent slovenskej licencie C. Kurz je mozne absolvovat na
                Slovensku v organizacii SzPH.
              </p>
            </div>
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                FIH Level 2 - Development Coach
              </h3>
              <p className="text-sm text-[#666]">
                Stredna uroven medzinarodnej kvalifikacie. Ekvivalent slovenskej
                licencie B. Organizovany na regionalnej urovni v spolupraci s
                EHF.
              </p>
            </div>
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                FIH Level 3 a 4 - Performance / High Performance
              </h3>
              <p className="text-sm text-[#666]">
                Najvyssie medzinarodne kvalifikacie organizovane priamo FIH.
                Urcene pre trenerov narodnych timov a elitnych programov.
                Kandidati su nominovani cez narodne zvazy.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2
            className="font-garet font-bold text-[#051937] mb-4"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
          >
            FIH rozhodcovske licencie
          </h2>
          <div className="space-y-4 mb-6">
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                FIH Indoor/Outdoor Umpire
              </h3>
              <p className="text-sm text-[#666]">
                Medzinarodna rozhodcovska licencia opravnujuca k rozhodovaniu na
                medzinarodnych zapasoch a turnajoch. Kandidati musia splnit
                fyzicke testy, teoreticke skusky a mat odporucenie narodneho
                zvazu.
              </p>
            </div>
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                FIH Technical Official
              </h3>
              <p className="text-sm text-[#666]">
                Licencia pre technickych delegatov a dalsich oficialov na
                medzinarodnych sutaziach. Zahrnuje pozicie ako Technical
                Delegate, Judge a Recorder.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2
            className="font-garet font-bold text-[#051937] mb-4"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
          >
            Ako ziskat FIH licenciu
          </h2>
          <p className="text-[#333] leading-relaxed mb-6" style={{ fontSize: "15px" }}>
            Cesta k medzinarodnej licencii vedie cez narodny vzdelavaci system.
            Najprv je potrebne absolvovat prislusne kurzy na narodnej urovni a
            nasledne sa uchazdhat o medzinarodnu certifikaciu prostrednictvom
            SzPH. Kontaktujte nas pre viac informacii o aktualnych moznostiach.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/vzdelavanie/licencie"
              className="inline-block px-5 py-2.5 bg-[#051937] text-white text-sm font-semibold rounded-lg hover:bg-[#0a2a5c] transition-colors"
            >
              Narodne licencie
            </Link>
            <Link
              href="/vzdelavanie/certifikacia"
              className="inline-block px-5 py-2.5 border border-[#051937] text-[#051937] text-sm font-semibold rounded-lg hover:bg-[#051937] hover:text-white transition-colors"
            >
              Podmienky certifikacie
            </Link>
            <Link
              href="/kontakt"
              className="inline-block px-5 py-2.5 border border-[#051937] text-[#051937] text-sm font-semibold rounded-lg hover:bg-[#051937] hover:text-white transition-colors"
            >
              Kontaktovat nas
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}
