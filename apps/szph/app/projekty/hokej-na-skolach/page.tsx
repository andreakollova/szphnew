"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function HokejNaSkolachPage() {
  const [formData, setFormData] = useState({
    school: "", city: "", contact: "", email: "", phone: "",
    students: "", facilities: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <article className="pb-20" style={{ background: "#f8f9fa" }}>
      {/* Hero */}
      <div
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #051937 0%, #012d74 100%)", minHeight: "340px" }}
      >
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="relative px-6 lg:px-10 xl:px-16 max-w-[1920px] mx-auto py-16 flex items-center gap-10">
          <div className="flex-1">
            <Link href="/projekty" className="inline-flex items-center gap-2 font-bold text-white hover:text-white transition-colors mb-6" style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              <svg className="h-3 w-3 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              Projekty
            </Link>
            <h1 className="font-garet font-bold italic text-white leading-tight mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
              Pozemný hokej na školách
            </h1>
            <p className="text-white max-w-xl leading-relaxed" style={{ fontSize: "15px" }}>
              Prinesme deťom nový šport a radosť z pohybu. Projekt Pozemný hokej na školách predstavuje žiakom hokejku, loptičku a základy tímovej hry.
            </p>
            <Link
              href="#formular"
              className="mt-6 inline-flex items-center gap-2 font-garet font-bold text-white transition-all hover:brightness-110"
              style={{ background: "#d80027", borderRadius: "20px", padding: "12px 24px", fontSize: "13px" }}
            >
              Mám záujem zapojiť školu
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          <div className="hidden lg:block shrink-0">
            <Image src="/images/hokej-na-skolach-logo.webp" alt="Pozemný hokej na školách" width={200} height={200} className="object-contain " />
          </div>
        </div>
      </div>

      <div className="px-6 lg:px-10 xl:px-16 max-w-[1100px] mx-auto pt-12">
        {/* O projekte */}
        <section className="mb-12">
          <h2 className="font-garet font-bold text-[#051937] mb-4" style={{ fontSize: "22px" }}>O projekte</h2>
          <p className="text-[#334155] leading-relaxed mb-4" style={{ fontSize: "15px" }}>
            Cieľom projektu je priblížiť pozemný hokej deťom priamo v škole. Prostredníctvom jednoduchých cvičení a hier si vyskúšajú vedenie loptičky, prihrávky aj streľbu na bránku.
          </p>
          <p className="text-[#334155] leading-relaxed" style={{ fontSize: "15px" }}>
            Aktivity sú určené aj úplným začiatočníkom. Dôraz kladieme na pohyb, spoluprácu a zapojenie každého žiaka.
          </p>
        </section>

        {/* Čo hokej deťom prinesie */}
        <section className="mb-12">
          <h2 className="font-garet font-bold text-[#051937] mb-6" style={{ fontSize: "22px" }}>Čo hokej deťom prinesie</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "Pohyb a koordináciu", desc: "Práca s hokejkou a loptičkou rozvíja obratnosť, presnosť a postreh.", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
              { title: "Tímovú spoluprácu", desc: "Deti sa učia prihrávať, komunikovať a spoločne riešiť herné situácie.", icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" },
              { title: "Nové zručnosti", desc: "Spoznajú základy pozemného hokeja a vyskúšajú si šport, s ktorým sa možno ešte nestretli.", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
              { title: "Radosť z hry", desc: "Krátke cvičenia a spoločné zápasy dávajú priestor učiť sa hravou formou.", icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
            ].map((item) => (
              <div key={item.title} className="bg-white p-5" style={{ borderRadius: "3px", border: "1px solid rgba(1,45,116,0.06)" }}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="shrink-0 flex items-center justify-center" style={{ width: 32, height: 32, background: "rgba(0,120,253,0.08)", borderRadius: "8px" }}>
                    <svg className="h-4 w-4 text-[#0078fd]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                  </div>
                  <h3 className="font-bold text-[#051937]" style={{ fontSize: "15px" }}>{item.title}</h3>
                </div>
                <p className="text-[#64748b] leading-relaxed" style={{ fontSize: "13px" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pre koho */}
        <section className="mb-12">
          <h2 className="font-garet font-bold text-[#051937] mb-4" style={{ fontSize: "22px" }}>Pre koho je projekt</h2>
          <p className="text-[#334155] leading-relaxed mb-4" style={{ fontSize: "15px" }}>
            Projekt je určený školám, ktoré chcú rozšíriť športové aktivity pre svojich žiakov. Náplň hodiny sa prispôsobí veku detí, ich skúsenostiam a možnostiam školy.
          </p>
          <p className="text-[#334155] leading-relaxed" style={{ fontSize: "15px" }}>
            Pozemný hokej môže byť súčasťou telesnej výchovy, športového dňa alebo školského krúžku.
          </p>
        </section>

        {/* Ukážková hodina */}
        <section className="mb-12">
          <h2 className="font-garet font-bold text-[#051937] mb-6" style={{ fontSize: "22px" }}>Ako môže vyzerať ukážková hodina</h2>
          <div className="space-y-3">
            {[
              { step: "1", title: "Zoznámenie s hokejom", desc: "Predstavenie výstroja, správneho držania hokejky a pravidiel bezpečnej hry." },
              { step: "2", title: "Prvé cvičenia", desc: "Vedenie loptičky, prihrávky vo dvojiciach a streľba na cieľ." },
              { step: "3", title: "Spoločná hra", desc: "Jednoduché herné úlohy a krátke zápasy v menších tímoch." },
              { step: "4", title: "Čo ďalej", desc: "Priestor na otázky a informácie o možnostiach pokračovať v pozemnom hokeji." },
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

        {/* Ako zapojiť školu */}
        <section className="mb-12">
          <h2 className="font-garet font-bold text-[#051937] mb-6" style={{ fontSize: "22px" }}>Ako zapojiť školu</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { step: "1", title: "Ozvite sa nám", desc: "Vyplňte formulár a uveďte základné informácie o škole." },
              { step: "2", title: "Preberieme možnosti", desc: "Spoločne prejdeme počet a vek žiakov, priestory, vybavenie a vhodnú formu aktivity." },
              { step: "3", title: "Dohodneme podrobnosti", desc: "Po potvrdení možností dohodneme termín, priebeh a organizačné podmienky." },
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

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="font-garet font-bold text-[#051937] mb-6" style={{ fontSize: "22px" }}>Časté otázky</h2>
          <div className="space-y-2">
            {[
              { q: "Potrebujú žiaci skúsenosti s hokejom?", a: "Nie. Úvodné aktivity sú pripravené pre deti, ktoré držia hokejku prvýkrát." },
              { q: "Aké priestory sú potrebné?", a: "Vhodná môže byť telocvičňa alebo školské ihrisko. Konkrétny priestor posúdime pri dohode so školou." },
              { q: "Musí mať škola vlastné vybavenie?", a: "Do formulára uveďte, či máte hokejky a loptičky. Možnosti zabezpečenia vybavenia preveríme pri plánovaní." },
              { q: "Koľko žiakov sa môže zapojiť?", a: "Počet žiakov a rozdelenie do skupín závisia od priestoru, veku detí a formy aktivity." },
              { q: "Je zapojenie spoplatnené?", a: "Prípadné náklady a podmienky si so školou vyjasníme pred potvrdením aktivity." },
            ].map((item, i) => (
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
            <h2 className="font-garet font-bold text-[#051937] mb-2" style={{ fontSize: "22px" }}>Zapojte svoju školu</h2>
            <p className="text-[#64748b] mb-6" style={{ fontSize: "14px" }}>
              Chcete žiakom predstaviť pozemný hokej? Napíšte nám a spoločne preberieme možnosti.
            </p>

            {submitted ? (
              <div className="text-center py-10">
                <div className="mx-auto flex items-center justify-center mb-4" style={{ width: 48, height: 48, background: "rgba(22,163,74,0.08)", borderRadius: "50%" }}>
                  <svg className="h-6 w-6 text-[#16a34a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-garet font-bold text-[#051937]" style={{ fontSize: "18px" }}>Ďakujeme za váš záujem</p>
                <p className="text-[#64748b] mt-2" style={{ fontSize: "14px" }}>Ozveme sa vám a preberieme možnosti zapojenia vašej školy.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#051937] mb-1" style={{ fontSize: "12px" }}>Názov školy *</label>
                    <input required value={formData.school} onChange={e => setFormData({...formData, school: e.target.value})}
                      className="w-full px-4 py-2.5 bg-[#f8f9fa] text-[#051937] outline-none focus:ring-2 focus:ring-[#012d74]/20" style={{ borderRadius: "8px", border: "1px solid rgba(1,45,116,0.1)", fontSize: "13px" }} />
                  </div>
                  <div>
                    <label className="block font-bold text-[#051937] mb-1" style={{ fontSize: "12px" }}>Mesto alebo obec *</label>
                    <input required value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})}
                      className="w-full px-4 py-2.5 bg-[#f8f9fa] text-[#051937] outline-none focus:ring-2 focus:ring-[#012d74]/20" style={{ borderRadius: "8px", border: "1px solid rgba(1,45,116,0.1)", fontSize: "13px" }} />
                  </div>
                  <div>
                    <label className="block font-bold text-[#051937] mb-1" style={{ fontSize: "12px" }}>Meno kontaktnej osoby *</label>
                    <input required value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})}
                      className="w-full px-4 py-2.5 bg-[#f8f9fa] text-[#051937] outline-none focus:ring-2 focus:ring-[#012d74]/20" style={{ borderRadius: "8px", border: "1px solid rgba(1,45,116,0.1)", fontSize: "13px" }} />
                  </div>
                  <div>
                    <label className="block font-bold text-[#051937] mb-1" style={{ fontSize: "12px" }}>E-mail *</label>
                    <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-2.5 bg-[#f8f9fa] text-[#051937] outline-none focus:ring-2 focus:ring-[#012d74]/20" style={{ borderRadius: "8px", border: "1px solid rgba(1,45,116,0.1)", fontSize: "13px" }} />
                  </div>
                  <div>
                    <label className="block font-bold text-[#051937] mb-1" style={{ fontSize: "12px" }}>Telefón</label>
                    <input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-2.5 bg-[#f8f9fa] text-[#051937] outline-none focus:ring-2 focus:ring-[#012d74]/20" style={{ borderRadius: "8px", border: "1px solid rgba(1,45,116,0.1)", fontSize: "13px" }} />
                  </div>
                  <div>
                    <label className="block font-bold text-[#051937] mb-1" style={{ fontSize: "12px" }}>Vek a počet žiakov *</label>
                    <input required value={formData.students} onChange={e => setFormData({...formData, students: e.target.value})}
                      className="w-full px-4 py-2.5 bg-[#f8f9fa] text-[#051937] outline-none focus:ring-2 focus:ring-[#012d74]/20" style={{ borderRadius: "8px", border: "1px solid rgba(1,45,116,0.1)", fontSize: "13px" }} />
                  </div>
                </div>
                <div>
                  <label className="block font-bold text-[#051937] mb-1" style={{ fontSize: "12px" }}>Dostupné priestory a vybavenie</label>
                  <input value={formData.facilities} onChange={e => setFormData({...formData, facilities: e.target.value})}
                    className="w-full px-4 py-2.5 bg-[#f8f9fa] text-[#051937] outline-none focus:ring-2 focus:ring-[#012d74]/20" style={{ borderRadius: "8px", border: "1px solid rgba(1,45,116,0.1)", fontSize: "13px" }} />
                </div>
                <div>
                  <label className="block font-bold text-[#051937] mb-1" style={{ fontSize: "12px" }}>Správa alebo preferovaný termín</label>
                  <textarea value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} rows={3}
                    className="w-full px-4 py-2.5 bg-[#f8f9fa] text-[#051937] outline-none focus:ring-2 focus:ring-[#012d74]/20 resize-none" style={{ borderRadius: "8px", border: "1px solid rgba(1,45,116,0.1)", fontSize: "13px" }} />
                </div>
                <button
                  type="submit"
                  className="font-garet font-bold text-white transition-all hover:brightness-110"
                  style={{ background: "#012d74", borderRadius: "20px", padding: "12px 28px", fontSize: "13px" }}
                >
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
