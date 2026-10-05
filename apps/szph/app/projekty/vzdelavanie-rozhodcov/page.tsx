"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const TOPICS = [
  { title: "Pravidlá a ich výklad", desc: "Pochopenie pravidiel a ich uplatnenie v konkrétnych situáciách." },
  { title: "Posudzovanie herných situácií", desc: "Rozpoznanie priestupkov, uplatňovanie výhody a rozhodovanie pri štandardných situáciách." },
  { title: "Pohyb a postavenie na ihrisku", desc: "Výber vhodnej pozície na sledovanie hry a spolupráca s druhým rozhodcom." },
  { title: "Signalizácia a komunikácia", desc: "Zrozumiteľné gestá, používanie píšťalky a vecná komunikácia s hráčmi." },
  { title: "Vedenie zápasu", desc: "Príprava pred stretnutím, zvládanie vypätých situácií a udržanie konzistentného rozhodovania." },
];

const FORMS = [
  { title: "Odborné školenia", desc: "Vysvetlenie pravidiel a spoločná diskusia o ich použití v praxi." },
  { title: "Videorozbory", desc: "Posudzovanie situácií zo zápasov a vysvetlenie jednotlivých rozhodnutí." },
  { title: "Praktická príprava", desc: "Nácvik pohybu, signalizácie a spolupráce priamo na ihrisku." },
  { title: "Spätná väzba", desc: "Vyhodnotenie výkonu a odporúčania na ďalšie zlepšovanie." },
];

const FAQ = [
  { q: "Musím mať skúsenosti s rozhodovaním?", a: "Nie. Záujem môžete prejaviť aj ako úplný začiatočník." },
  { q: "Môžem sa zapojiť, ak ešte aktívne hrám?", a: "Uveďte to vo formulári. Možnosti zapojenia a prípadné obmedzenia preberieme individuálne." },
  { q: "Kedy a kde prebiehajú školenia?", a: "Informácie o dostupných termínoch a mieste konania dostanete pri dohode o účasti." },
  { q: "Môžem po školení hneď rozhodovať zápasy?", a: "Absolvovanie školenia nemusí automaticky znamenať oprávnenie rozhodovať súťažné zápasy. Podmienky kvalifikácie vám vysvetlíme pred začiatkom prípravy." },
];

export default function VzdelavanieRozhodcovPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", city: "", club: "", experience: "", learn: "" });
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/form", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "rozhodca", ...formData }) });
    } catch {}
    setSubmitted(true);
  };

  return (
    <article className="pb-20" style={{ background: "#f8f9fa" }}>
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #051937 0%, #012d74 100%)", minHeight: "340px" }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="relative px-6 lg:px-10 xl:px-16 max-w-[1920px] mx-auto py-16 flex items-center gap-10">
          <div className="flex-1">
          <Link href="/projekty" className="inline-flex items-center gap-2 font-bold text-white hover:text-white transition-colors mb-6" style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            <svg className="h-3 w-3 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            Projekty
          </Link>
          <Link href="/projekty" className="inline-flex items-center gap-2 font-bold text-white hover:text-white transition-colors mb-6" style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}><svg className="h-3 w-3 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>Späť</Link>
          <h1 className="font-garet font-bold italic text-white leading-tight mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
            Vzdelávanie a rozvoj rozhodcov
          </h1>
          <p className="text-white max-w-xl leading-relaxed" style={{ fontSize: "15px" }}>
            Začnite s rozhodovaním alebo si rozšírte svoje skúsenosti. Vzdelávanie zamerané na pravidlá pozemného hokeja, posudzovanie herných situácií a vedenie zápasu.
          </p>
          <Link href="#formular" className="mt-6 inline-flex items-center gap-2 font-garet font-bold text-white transition-all hover:brightness-110" style={{ background: "#d80027", borderRadius: "20px", padding: "12px 24px", fontSize: "13px" }}>
            Mám záujem o vzdelávanie
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
          </div>
          <div className="hidden lg:block shrink-0">
            <Image src="/images/rozhodcovia-logo.webp" alt="Vzdelávanie rozhodcov" width={200} height={200} className="object-contain" />
          </div>
        </div>
      </div>

      <div className="px-6 lg:px-10 xl:px-16 max-w-[1100px] mx-auto pt-12">
        <section className="mb-12">
          <h2 className="font-garet font-bold text-[#051937] mb-4" style={{ fontSize: "22px" }}>O programe</h2>
          <p className="text-[#334155] leading-relaxed" style={{ fontSize: "15px" }}>
            Cieľom programu je pripraviť nových rozhodcov a podporovať ďalší rozvoj tých, ktorí už zápasy rozhodujú. Prepája štúdium pravidiel s praktickými situáciami na ihrisku. Pozornosť venujeme správnosti rozhodnutí, spolupráci rozhodcov aj komunikácii s hráčmi a trénermi.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-garet font-bold text-[#051937] mb-6" style={{ fontSize: "22px" }}>Pre koho je program</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title: "Pre začínajúcich", desc: "Základy pravidiel, signalizácie a pohybu na ihrisku." },
              { title: "Pre aktívnych rozhodcov", desc: "Rozbor herných situácií, výmena skúseností a zdokonaľovanie." },
              { title: "Pre hráčov a trénerov", desc: "Spoznajte hokej z pohľadu rozhodcu." },
            ].map((item) => (
              <div key={item.title} className="bg-white p-5" style={{ borderRadius: "3px", border: "1px solid rgba(1,45,116,0.06)" }}>
                <h3 className="font-bold text-[#051937] mb-1" style={{ fontSize: "15px" }}>{item.title}</h3>
                <p className="text-[#64748b] leading-relaxed" style={{ fontSize: "13px" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-garet font-bold text-[#051937] mb-6" style={{ fontSize: "22px" }}>Čomu sa venujeme</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TOPICS.map((t) => (
              <div key={t.title} className="bg-white p-5" style={{ borderRadius: "3px", border: "1px solid rgba(1,45,116,0.06)" }}>
                <h3 className="font-bold text-[#051937] mb-1" style={{ fontSize: "15px" }}>{t.title}</h3>
                <p className="text-[#64748b] leading-relaxed" style={{ fontSize: "13px" }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-garet font-bold text-[#051937] mb-6" style={{ fontSize: "22px" }}>Formy vzdelávania</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FORMS.map((f) => (
              <div key={f.title} className="bg-white p-5" style={{ borderRadius: "3px", border: "1px solid rgba(1,45,116,0.06)" }}>
                <h3 className="font-bold text-[#051937] mb-1" style={{ fontSize: "15px" }}>{f.title}</h3>
                <p className="text-[#64748b] leading-relaxed" style={{ fontSize: "13px" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-garet font-bold text-[#051937] mb-6" style={{ fontSize: "22px" }}>Ako sa zapojiť</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { step: "1", title: "Prejavte záujem", desc: "Vyplňte formulár a stručne nám predstavte svoje skúsenosti." },
              { step: "2", title: "Preberieme možnosti", desc: "Poskytneme vám informácie o vzdelávaní a podmienkach účasti." },
              { step: "3", title: "Začnite sa pripravovať", desc: "Zapojíte sa do vhodnej formy vzdelávania podľa vašej úrovne." },
            ].map((item) => (
              <div key={item.step} className="text-center p-5 bg-white" style={{ borderRadius: "3px", border: "1px solid rgba(1,45,116,0.06)" }}>
                <div className="mx-auto flex items-center justify-center font-garet font-bold text-[#0078fd] mb-3" style={{ width: 40, height: 40, background: "rgba(0,120,253,0.08)", borderRadius: "50%", fontSize: "16px" }}>
                  {item.step}
                </div>
                <h3 className="font-bold text-[#051937] mb-1" style={{ fontSize: "14px" }}>{item.title}</h3>
                <p className="text-[#64748b] leading-relaxed" style={{ fontSize: "12px" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

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

        <section id="formular" className="scroll-mt-32">
          <div className="p-8" style={{ background: "#fff", borderRadius: "3px", border: "1px solid rgba(1,45,116,0.06)" }}>
            <h2 className="font-garet font-bold text-[#051937] mb-2" style={{ fontSize: "22px" }}>Máte záujem o rozhodovanie?</h2>
            <p className="text-[#64748b] mb-6" style={{ fontSize: "14px" }}>Napíšte nám, či začínate alebo chcete rozvíjať svoje skúsenosti.</p>
            {submitted ? (
              <div className="text-center py-10">
                <div className="mx-auto flex items-center justify-center mb-4" style={{ width: 48, height: 48, background: "rgba(22,163,74,0.08)", borderRadius: "50%" }}>
                  <svg className="h-6 w-6 text-[#16a34a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <p className="font-garet font-bold text-[#051937]" style={{ fontSize: "18px" }}>Ďakujeme za váš záujem</p>
                <p className="text-[#64748b] mt-2" style={{ fontSize: "14px" }}>Ozveme sa vám s informáciami o možnostiach vzdelávania rozhodcov.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#051937] mb-1" style={{ fontSize: "12px" }}>Meno a priezvisko *</label>
                    <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2.5 bg-[#f8f9fa] text-[#051937] outline-none focus:ring-2 focus:ring-[#012d74]/20" style={{ borderRadius: "8px", border: "1px solid rgba(1,45,116,0.1)", fontSize: "13px" }} />
                  </div>
                  <div>
                    <label className="block font-bold text-[#051937] mb-1" style={{ fontSize: "12px" }}>E-mail *</label>
                    <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2.5 bg-[#f8f9fa] text-[#051937] outline-none focus:ring-2 focus:ring-[#012d74]/20" style={{ borderRadius: "8px", border: "1px solid rgba(1,45,116,0.1)", fontSize: "13px" }} />
                  </div>
                  <div>
                    <label className="block font-bold text-[#051937] mb-1" style={{ fontSize: "12px" }}>Telefón</label>
                    <input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-2.5 bg-[#f8f9fa] text-[#051937] outline-none focus:ring-2 focus:ring-[#012d74]/20" style={{ borderRadius: "8px", border: "1px solid rgba(1,45,116,0.1)", fontSize: "13px" }} />
                  </div>
                  <div>
                    <label className="block font-bold text-[#051937] mb-1" style={{ fontSize: "12px" }}>Mesto alebo obec *</label>
                    <input required value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full px-4 py-2.5 bg-[#f8f9fa] text-[#051937] outline-none focus:ring-2 focus:ring-[#012d74]/20" style={{ borderRadius: "8px", border: "1px solid rgba(1,45,116,0.1)", fontSize: "13px" }} />
                  </div>
                  <div>
                    <label className="block font-bold text-[#051937] mb-1" style={{ fontSize: "12px" }}>Klub</label>
                    <input value={formData.club} onChange={e => setFormData({...formData, club: e.target.value})} className="w-full px-4 py-2.5 bg-[#f8f9fa] text-[#051937] outline-none focus:ring-2 focus:ring-[#012d74]/20" style={{ borderRadius: "8px", border: "1px solid rgba(1,45,116,0.1)", fontSize: "13px" }} />
                  </div>
                  <div>
                    <label className="block font-bold text-[#051937] mb-1" style={{ fontSize: "12px" }}>Skúsenosti *</label>
                    <select required value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})} className="w-full px-4 py-2.5 bg-[#f8f9fa] text-[#051937] outline-none focus:ring-2 focus:ring-[#012d74]/20" style={{ borderRadius: "8px", border: "1px solid rgba(1,45,116,0.1)", fontSize: "13px" }}>
                      <option value="">Vyberte...</option>
                      <option value="ziadne">Bez skúseností</option>
                      <option value="hrac-trener">Hráč alebo tréner</option>
                      <option value="rozhodca">Aktívny rozhodca</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block font-bold text-[#051937] mb-1" style={{ fontSize: "12px" }}>Čo by ste sa chceli naučiť</label>
                  <textarea value={formData.learn} onChange={e => setFormData({...formData, learn: e.target.value})} rows={3} className="w-full px-4 py-2.5 bg-[#f8f9fa] text-[#051937] outline-none focus:ring-2 focus:ring-[#012d74]/20 resize-none" style={{ borderRadius: "8px", border: "1px solid rgba(1,45,116,0.1)", fontSize: "13px" }} />
                </div>
                <button type="submit" className="font-garet font-bold text-white transition-all hover:brightness-110" style={{ background: "#012d74", borderRadius: "20px", padding: "12px 28px", fontSize: "13px" }}>
                  Odoslať záujem
                </button>
              </form>
            )}
          </div>
        </section>
      </div>
    </article>
  );
}
