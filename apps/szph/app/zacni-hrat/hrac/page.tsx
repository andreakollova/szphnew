"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const CLUBS = [
  { name: "KPH Rača", city: "Bratislava — Rača", href: "/kluby" },
  { name: "ŠK Šenkvice", city: "Šenkvice", href: "/kluby" },
  { name: "HAS Šenkvice", city: "Šenkvice", href: "/kluby" },
  { name: "KPH HOKO Zlaté Moravce", city: "Zlaté Moravce", href: "/kluby" },
  { name: "HKM Nová Dubnica", city: "Nová Dubnica", href: "/kluby" },
];

const FAQ = [
  { q: "Môžem prísť bez skúseností?", a: "Áno, záujem o tréning môžeš prejaviť aj bez predchádzajúcich skúseností. V klube si over, ktorá skupina je vhodná pre začiatočníkov." },
  { q: "Potrebujem vlastnú hokejku?", a: "Pred nákupom sa poraď s klubom. Zistíš, aké vybavenie potrebuješ a či je možné si ho na prvé tréningy požičať." },
  { q: "V akom veku môžem začať?", a: "Závisí to od vekových skupín v konkrétnom klube. Informuj sa priamo v klube, či ponúka tréningy pre tvoj vek." },
  { q: "Môžem začať aj v dospelosti?", a: "Ozvi sa vybranému klubu a opýtaj sa na možnosti pre dospelých začiatočníkov." },
  { q: "Koľko stoja tréningy?", a: "Výšku členských príspevkov aj prípadné ďalšie náklady ti vysvetlia v klube." },
];

export default function ChcemSaStatHracomPage() {
  const [formData, setFormData] = useState({ name: "", email: "", city: "", age: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/form", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "hrac", ...formData }) });
    } catch {}
    setSubmitted(true);
  };

  return (
    <article className="pb-20" style={{ background: "#f8f9fa" }}>
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #051937 0%, #012d74 100%)", minHeight: "320px" }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="relative px-6 lg:px-10 xl:px-16 max-w-[1600px] mx-auto py-16">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-white hover:text-white transition-colors mb-6" style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            <svg className="h-3 w-3 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            Späť
          </Link>
          <h1 className="font-garet font-bold italic text-white leading-tight mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
            Chcem sa stať hráčom
          </h1>
          <p className="text-white max-w-xl leading-relaxed" style={{ fontSize: "15px" }}>
            Vyskúšaj pozemný hokej a nájdi svoj tím. Vyber si klub vo svojom okolí, ozvi sa a dohodni si prvý tréning.
          </p>
          <Link href="#kluby" className="mt-6 inline-flex items-center gap-2 font-garet font-bold text-white transition-all hover:brightness-110" style={{ background: "#d80027", borderRadius: "20px", padding: "12px 24px", fontSize: "13px" }}>
            Nájdi svoj klub
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>

          {/* Season cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
            <div className="relative overflow-hidden" style={{ borderRadius: "8px", height: "200px" }}>
              <Image src="/images/hrac-pozemny.webp" alt="Pozemný hokej" fill className="object-cover" sizes="(max-width: 900px) 100vw, 400px" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,25,55,0.85) 0%, rgba(5,25,55,0.2) 60%)" }} />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-garet font-bold text-white" style={{ fontSize: "16px" }}>Pozemný hokej</h3>
                <p className="text-white/70 mt-1" style={{ fontSize: "12px" }}>Jar a jeseň (marec - jún, september - november)</p>
              </div>
            </div>
            <div className="relative overflow-hidden" style={{ borderRadius: "8px", height: "200px" }}>
              <Image src="/images/hrac-halovy.webp" alt="Halový hokej" fill className="object-cover" sizes="(max-width: 900px) 100vw, 400px" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,25,55,0.85) 0%, rgba(5,25,55,0.2) 60%)" }} />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-garet font-bold text-white" style={{ fontSize: "16px" }}>Halový hokej</h3>
                <p className="text-white/70 mt-1" style={{ fontSize: "12px" }}>Zimné mesiace (október - marec)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 lg:px-10 xl:px-16 max-w-[900px] mx-auto pt-12">
        {/* Začať bez skúseností */}
        <section className="mb-12">
          <h2 className="font-garet font-bold text-[#051937] mb-4" style={{ fontSize: "22px" }}>Začať môžeš aj bez skúseností</h2>
          <p className="text-[#334155] leading-relaxed mb-4" style={{ fontSize: "15px" }}>
            Nikdy si nedržal/a hokejku v ruke? Nevadí, základy sa naučíš postupne. Na tréningu si vyskúšaš vedenie loptičky, prihrávky aj streľbu na bránku. Tréner ti vysvetlí, ako na to, a pomôže ti zapojiť sa do hry.
          </p>
          <p className="text-[#334155] leading-relaxed" style={{ fontSize: "15px" }}>
            Nemusíš hneď kupovať výstroj. Najskôr sa v klube informuj, čo potrebuješ na prvý tréning a aké vybavenie si môžeš požičať.
          </p>
          <Link href="/pozemny-hokej/vybavenie" className="inline-flex items-center gap-2 mt-4 font-bold text-[#012d74] hover:text-[#051937] transition-colors" style={{ fontSize: "13px" }}>
            Pozrieť prehľad vybavenia
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </section>

        {/* Začni v akomkoľvek veku */}
        <section className="mb-12">
          <h2 className="font-garet font-bold text-[#051937] mb-6" style={{ fontSize: "22px" }}>Začni v akomkoľvek veku</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="overflow-hidden" style={{ borderRadius: "6px", border: "1px solid rgba(1,45,116,0.06)" }}>
              <div className="relative" style={{ height: "200px" }}>
                <Image src="/images/hrac-deti.webp" alt="Deti hraju pozemny hokej" fill className="object-cover" sizes="(max-width: 900px) 100vw, 420px" />
              </div>
              <div className="bg-white p-4">
                <h3 className="font-bold text-[#051937]" style={{ fontSize: "15px" }}>Deti a mládež</h3>
                <p className="text-[#64748b] mt-1 leading-relaxed" style={{ fontSize: "13px" }}>Kategórie U12, U14, U18. Tréningy prispôsobené veku, dôraz na hru a radosť z pohybu.</p>
              </div>
            </div>
            <div className="overflow-hidden" style={{ borderRadius: "6px", border: "1px solid rgba(1,45,116,0.06)" }}>
              <div className="relative" style={{ height: "200px" }}>
                <Image src="/images/hrac-dospely.webp" alt="Dospely hrac" fill className="object-cover" sizes="(max-width: 900px) 100vw, 420px" />
              </div>
              <div className="bg-white p-4">
                <h3 className="font-bold text-[#051937]" style={{ fontSize: "15px" }}>Dospelí</h3>
                <p className="text-[#64748b] mt-1 leading-relaxed" style={{ fontSize: "13px" }}>Mužská aj ženská liga. Začať môžeš aj bez predchádzajúcich skúseností.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Ako začať */}
        <section className="mb-12">
          <h2 className="font-garet font-bold text-[#051937] mb-6" style={{ fontSize: "22px" }}>Ako začať</h2>
          <div className="space-y-3">
            {[
              { step: "1", title: "Nájdi si klub", desc: "Vyber si klub, do ktorého to máš blízko a môžeš pravidelne chodiť na tréningy." },
              { step: "2", title: "Ozvi sa", desc: "Napíš alebo zavolaj do klubu. Povedz, koľko máš rokov a že chceš vyskúšať pozemný hokej." },
              { step: "3", title: "Príď na prvý tréning", desc: "Zober si športové oblečenie, vodu a obuv podľa pokynov klubu. Ostatné sa dozvieš na mieste." },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 bg-white p-5" style={{ borderRadius: "3px", border: "1px solid rgba(1,45,116,0.06)" }}>
                <div className="shrink-0 flex items-center justify-center font-garet font-bold text-white" style={{ width: 32, height: 32, background: "#012d74", borderRadius: "50%", fontSize: "14px" }}>
                  {item.step}
                </div>
                <div>
                  <h3 className="font-bold text-[#051937] mb-1" style={{ fontSize: "15px" }}>{item.title}</h3>
                  <p className="text-[#64748b] leading-relaxed" style={{ fontSize: "13px" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Kluby */}
        <section className="mb-12" id="kluby">
          <h2 className="font-garet font-bold text-[#051937] mb-3" style={{ fontSize: "22px" }}>Vyber si svoj klub</h2>
          <p className="text-[#64748b] mb-6" style={{ fontSize: "14px" }}>
            Podmienky prijímania hráčov, vekové skupiny a časy tréningov ti vysvetlia priamo v jednotlivých kluboch.
          </p>
          <div className="space-y-2">
            {CLUBS.map((club) => (
              <Link key={club.name} href={club.href} className="group flex items-center justify-between bg-white p-5 transition-colors hover:bg-[#f8fafd]" style={{ borderRadius: "3px", border: "1px solid rgba(1,45,116,0.06)" }}>
                <div>
                  <h3 className="font-bold text-[#051937] group-hover:text-[#012d74] transition-colors" style={{ fontSize: "15px" }}>{club.name}</h3>
                  <p className="text-[#64748b] mt-0.5" style={{ fontSize: "12px" }}>{club.city}</p>
                </div>
                <div className="flex items-center gap-1.5 font-bold text-[#012d74] shrink-0" style={{ fontSize: "11px" }}>
                  Pozrieť klub
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Pre rodičov */}
        <section className="mb-12">
          <div className="p-6" style={{ background: "rgba(0,120,253,0.04)", borderRadius: "3px", border: "1px solid rgba(0,120,253,0.08)" }}>
            <h2 className="font-garet font-bold text-[#051937] mb-3" style={{ fontSize: "20px" }}>Hľadáte šport pre svoje dieťa?</h2>
            <p className="text-[#334155] leading-relaxed" style={{ fontSize: "14px" }}>
              Pozemný hokej spája pohyb, prácu s loptičkou a tímovú hru. Deti sa učia nové zručnosti, spolupracujú so spoluhráčmi a vytvárajú si vzťah k športu.
            </p>
            <p className="text-[#334155] leading-relaxed mt-3" style={{ fontSize: "14px" }}>
              Kontaktujte vybraný klub a uveďte vek dieťaťa. V klube vám poradia s výberom skupiny a vysvetlia, ako prebiehajú prvé tréningy.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="font-garet font-bold text-[#051937] mb-6" style={{ fontSize: "22px" }}>Časté otázky</h2>
          <div className="space-y-2">
            {FAQ.map((item, i) => (
              <div key={i} className="bg-white p-5" style={{ borderRadius: "3px", border: "1px solid rgba(1,45,116,0.06)" }}>
                <h3 className="font-bold text-[#051937] mb-1" style={{ fontSize: "14px" }}>{item.q}</h3>
                <p className="text-[#64748b] leading-relaxed" style={{ fontSize: "13px" }}>{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Formulár */}
        <section id="formular" className="scroll-mt-32">
          <div className="p-8" style={{ background: "#fff", borderRadius: "3px", border: "1px solid rgba(1,45,116,0.06)" }}>
            <h2 className="font-garet font-bold text-[#051937] mb-2" style={{ fontSize: "22px" }}>Pomôžeme ti nájsť klub</h2>
            <p className="text-[#64748b] mb-6" style={{ fontSize: "14px" }}>Nevieš, na koho sa obrátiť? Napíš nám, odkiaľ si a pre koho hľadáš tréning.</p>
            {submitted ? (
              <div className="text-center py-10">
                <div className="mx-auto flex items-center justify-center mb-4" style={{ width: 48, height: 48, background: "rgba(22,163,74,0.08)", borderRadius: "50%" }}>
                  <svg className="h-6 w-6 text-[#16a34a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <p className="font-garet font-bold text-[#051937]" style={{ fontSize: "18px" }}>Ďakujeme za správu</p>
                <p className="text-[#64748b] mt-2" style={{ fontSize: "14px" }}>Ozveme sa ti s informáciami o možnostiach tréningu.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#051937] mb-1" style={{ fontSize: "12px" }}>Meno *</label>
                    <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2.5 bg-[#f8f9fa] text-[#051937] outline-none focus:ring-2 focus:ring-[#012d74]/20" style={{ borderRadius: "8px", border: "1px solid rgba(1,45,116,0.1)", fontSize: "13px" }} />
                  </div>
                  <div>
                    <label className="block font-bold text-[#051937] mb-1" style={{ fontSize: "12px" }}>E-mail *</label>
                    <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2.5 bg-[#f8f9fa] text-[#051937] outline-none focus:ring-2 focus:ring-[#012d74]/20" style={{ borderRadius: "8px", border: "1px solid rgba(1,45,116,0.1)", fontSize: "13px" }} />
                  </div>
                  <div>
                    <label className="block font-bold text-[#051937] mb-1" style={{ fontSize: "12px" }}>Mesto alebo obec *</label>
                    <input required value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full px-4 py-2.5 bg-[#f8f9fa] text-[#051937] outline-none focus:ring-2 focus:ring-[#012d74]/20" style={{ borderRadius: "8px", border: "1px solid rgba(1,45,116,0.1)", fontSize: "13px" }} />
                  </div>
                  <div>
                    <label className="block font-bold text-[#051937] mb-1" style={{ fontSize: "12px" }}>Vek záujemcu *</label>
                    <input required value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} className="w-full px-4 py-2.5 bg-[#f8f9fa] text-[#051937] outline-none focus:ring-2 focus:ring-[#012d74]/20" style={{ borderRadius: "8px", border: "1px solid rgba(1,45,116,0.1)", fontSize: "13px" }} />
                  </div>
                </div>
                <div>
                  <label className="block font-bold text-[#051937] mb-1" style={{ fontSize: "12px" }}>Správa</label>
                  <textarea value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} rows={3} className="w-full px-4 py-2.5 bg-[#f8f9fa] text-[#051937] outline-none focus:ring-2 focus:ring-[#012d74]/20 resize-none" style={{ borderRadius: "8px", border: "1px solid rgba(1,45,116,0.1)", fontSize: "13px" }} />
                </div>
                <button type="submit" className="font-garet font-bold text-white transition-all hover:brightness-110" style={{ background: "#012d74", borderRadius: "20px", padding: "12px 28px", fontSize: "13px" }}>
                  Mám záujem o tréning
                </button>
              </form>
            )}
          </div>
        </section>

        {/* Cross-links */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link href="/zacni-hrat/trener" className="group p-5 bg-white hover:bg-[#f0f4fa] transition-colors" style={{ borderRadius: "6px", border: "1px solid rgba(1,45,116,0.06)" }}>
            <h3 className="font-bold text-[#051937] group-hover:text-[#012d74] transition-colors" style={{ fontSize: "14px" }}>Chcem byť tréner</h3>
            <p className="text-[#64748b] mt-1" style={{ fontSize: "11px" }}>Odovzdaj svoje skúsenosti ďalej</p>
          </Link>
          <Link href="/zacni-hrat/rozhodca" className="group p-5 bg-white hover:bg-[#f0f4fa] transition-colors" style={{ borderRadius: "6px", border: "1px solid rgba(1,45,116,0.06)" }}>
            <h3 className="font-bold text-[#051937] group-hover:text-[#012d74] transition-colors" style={{ fontSize: "14px" }}>Chcem byť rozhodca</h3>
            <p className="text-[#64748b] mt-1" style={{ fontSize: "11px" }}>Rozhoduj zápasy na Slovensku</p>
          </Link>
          <Link href="/pre-kluby/zalozenie" className="group p-5 bg-white hover:bg-[#f0f4fa] transition-colors" style={{ borderRadius: "6px", border: "1px solid rgba(1,45,116,0.06)" }}>
            <h3 className="font-bold text-[#051937] group-hover:text-[#012d74] transition-colors" style={{ fontSize: "14px" }}>Založiť klub</h3>
            <p className="text-[#64748b] mt-1" style={{ fontSize: "11px" }}>Nový klub vo vašom meste</p>
          </Link>
        </div>
      </div>
    </article>
  );
}
