import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kurzy | SzPH",
  description:
    "Prehlad kurzov a skoleni v polnom hokeji na Slovensku - trenerske, rozhodcovske a specializovane kurzy.",
};

export default function KurzyPage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span
            className="font-bold uppercase text-white mb-4 block"
            style={{ fontSize: "10px", letterSpacing: "0.14em" }}
          >
            Vzdelavanie
          </span>
          <h1
            className="font-garet font-bold italic text-white leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Kurzy
          </h1>
          <p
            className="text-white mt-3 max-w-xl"
            style={{ fontSize: "15px" }}
          >
            Aktualne kurzy a skolenia organizovane Slovenskym zvazom polneho
            hokeja.
          </p>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <section className="mb-12">
          <h2
            className="font-garet font-bold text-[#051937] mb-4"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
          >
            Ponuka kurzov
          </h2>
          <p className="text-[#333] leading-relaxed mb-4" style={{ fontSize: "15px" }}>
            SzPH pravidelne organizuje vzdelavacie kurzy pre vsetky zainteresovane
            skupiny v polnom hokeji. Kurzy su urcene pre trenerov, rozhodcov,
            funkcionarov aj dalsich zaujemcov o rozvoj tohto sportu na Slovensku.
          </p>
          <p className="text-[#333] leading-relaxed mb-6" style={{ fontSize: "15px" }}>
            Aktualne terminy kurzov su zverejnovane na webovej stranke SzPH a na
            nasich profiloch na socialnych sietach. Sledujte nas, aby vam
            neunikli ziadne novinky a prihlaste sa vcas - kapacita kurzov je
            obmedzena.
          </p>
        </section>

        <section className="mb-12">
          <h2
            className="font-garet font-bold text-[#051937] mb-4"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
          >
            Typy kurzov
          </h2>
          <div className="space-y-4">
            <Link
              href="/vzdelavanie/trenerske-kurzy"
              className="block p-5 bg-white rounded-xl border border-gray-200 hover:border-[#051937]/30 transition-colors"
            >
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                Trenerske kurzy
              </h3>
              <p className="text-sm text-[#666]">
                Kurzy pre zaujemcov o trenerovanie polneho hokeja na roznych
                urovniach - od zakladnych po pokrocile FIH licencie.
              </p>
            </Link>
            <Link
              href="/vzdelavanie/kurz-rozhodcov"
              className="block p-5 bg-white rounded-xl border border-gray-200 hover:border-[#051937]/30 transition-colors"
            >
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                Rozhodcovske kurzy
              </h3>
              <p className="text-sm text-[#666]">
                Zakladne a pokrocile kurzy pre rozhodcov. Teoreticka a prakticka
                priprava na rozhodovanie zapasov polneho hokeja.
              </p>
            </Link>
            <Link
              href="/vzdelavanie/seminare"
              className="block p-5 bg-white rounded-xl border border-gray-200 hover:border-[#051937]/30 transition-colors"
            >
              <h3 className="font-garet font-bold text-[#051937] mb-1.5">
                Seminare a workshopy
              </h3>
              <p className="text-sm text-[#666]">
                Kratkodoba forma vzdelavania zamerana na specificke temy, novinky
                v pravidlach a metodicke trendy.
              </p>
            </Link>
          </div>
        </section>

        <section className="p-6 bg-white rounded-xl border border-gray-200">
          <h3 className="font-garet font-bold text-[#051937] mb-2">
            Prihlasenie na kurzy
          </h3>
          <p className="text-sm text-[#666] mb-4">
            Informacie o prihlasovani, terminoch a podmienkach ucastii na
            kurzoch ziskate na nasej kontaktnej stranke alebo sledovanim nasich
            socialnych sieti.
          </p>
          <Link
            href="/kontakt"
            className="inline-block px-5 py-2.5 bg-[#051937] text-white text-sm font-semibold rounded-lg hover:bg-[#0a2a5c] transition-colors"
          >
            Kontaktovat nas
          </Link>
        </section>
      </div>
    </article>
  );
}
