"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const MATERIALS = [
  { title: "Videonávody", desc: "Ukážky techniky a cvičení s vysvetlením jednotlivých krokov.", icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" },
  { title: "Tréningové cvičenia", desc: "Praktické zadania s popisom organizácie, potrebných pomôcok a cieľa cvičenia.", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" },
  { title: "Metodické príručky", desc: "Materiály na prípravu tréningov a dlhodobejší rozvoj hráčov.", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
  { title: "Materiály pre školy", desc: "Jednoduché hry a námety na hodiny telesnej výchovy.", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
];

const TOPICS = [
  { title: "Základy pozemného hokeja", desc: "Držanie hokejky, postoj, vedenie loptičky a orientácia na ihrisku." },
  { title: "Prihrávky a streľba", desc: "Technika spracovania loptičky, presné prihrávky a zakončenie." },
  { title: "Herné situácie a taktika", desc: "Pohyb bez loptičky, spolupráca v tíme, útočné a obranné činnosti." },
  { title: "Príprava tréningu", desc: "Výber cvičení, rozdelenie tréningovej jednotky a prispôsobenie záťaže." },
  { title: "Práca s deťmi a mládežou", desc: "Učenie prostredníctvom hier, rozvoj základných zručností." },
  { title: "Pravidlá a bezpečnosť", desc: "Základné pravidlá hry, ochranné vybavenie a zásady bezpečného tréningu." },
];

export default function HokejovaAkademiaPage() {
  const [formData, setFormData] = useState({ topic: "", explanation: "", role: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <article className="pb-20" style={{ background: "#f8f9fa" }}>
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #051937 0%, #012d74 100%)", minHeight: "340px" }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="relative px-6 lg:px-10 xl:px-16 max-w-[1600px] mx-auto py-16 flex items-center gap-10">
          <div className="flex-1">
            <Link href="/projekty" className="inline-flex items-center gap-2 font-bold text-white hover:text-white transition-colors mb-6" style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              <svg className="h-3 w-3 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              Projekty
            </Link>
            <h1 className="font-garet font-bold italic text-white leading-tight mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
              Hokejová akadémia
            </h1>
            <p className="text-white max-w-xl leading-relaxed" style={{ fontSize: "15px" }}>
              Tréningové postupy, videá a materiály pre hráčov, trénerov a učiteľov. Pozemný hokej od základných zručností až po vedenie tímu.
            </p>
            <Link href="#materialy" className="mt-6 inline-flex items-center gap-2 font-garet font-bold text-white transition-all hover:brightness-110" style={{ background: "#d80027", borderRadius: "20px", padding: "12px 24px", fontSize: "13px" }}>
              Preskúmať materiály
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
          <div className="hidden lg:block shrink-0">
            <Image src="/images/hokejova-akademia-logo.webp" alt="Hokejová akadémia" width={200} height={200} className="object-contain" />
          </div>
        </div>
      </div>

      <div className="px-6 lg:px-10 xl:px-16 max-w-[900px] mx-auto pt-12">
        <section className="mb-12">
          <h2 className="font-garet font-bold text-[#051937] mb-4" style={{ fontSize: "22px" }}>O akadémii</h2>
          <p className="text-[#334155] leading-relaxed" style={{ fontSize: "15px" }}>
            Hokejová akadémia je priestor na vzdelávanie v pozemnom hokeji. Jej cieľom je sprístupniť praktické informácie, ktoré využijete pri vlastnom tréningu, práci s mládežou aj príprave vyučovacej hodiny. Obsah je rozdelený podľa tém a náročnosti.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-garet font-bold text-[#051937] mb-6" style={{ fontSize: "22px" }}>Pre koho je akadémia</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "Pre trénerov", desc: "Cvičenia, metodické postupy a námety na zostavenie tréningu či vedenie tímu." },
              { title: "Pre hráčov", desc: "Vysvetlenie techniky, herných situácií a tipy na individuálne zlepšovanie." },
              { title: "Pre učiteľov", desc: "Podklady na zaradenie pozemného hokeja do telesnej výchovy." },
              { title: "Pre začínajúcich", desc: "Základné pravidlá, predstavenie vybavenia a prvé kroky s hokejkou." },
            ].map((item) => (
              <div key={item.title} className="bg-white p-5" style={{ borderRadius: "3px", border: "1px solid rgba(1,45,116,0.06)" }}>
                <h3 className="font-bold text-[#051937] mb-1" style={{ fontSize: "15px" }}>{item.title}</h3>
                <p className="text-[#64748b] leading-relaxed" style={{ fontSize: "13px" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-garet font-bold text-[#051937] mb-6" style={{ fontSize: "22px" }}>Čo sa môžete naučiť</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TOPICS.map((t) => (
              <div key={t.title} className="bg-white p-5" style={{ borderRadius: "3px", border: "1px solid rgba(1,45,116,0.06)" }}>
                <h3 className="font-bold text-[#051937] mb-1" style={{ fontSize: "15px" }}>{t.title}</h3>
                <p className="text-[#64748b] leading-relaxed" style={{ fontSize: "13px" }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12" id="materialy">
          <h2 className="font-garet font-bold text-[#051937] mb-6" style={{ fontSize: "22px" }}>Vzdelávacie materiály</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MATERIALS.map((m) => (
              <div key={m.title} className="bg-white p-5" style={{ borderRadius: "3px", border: "1px solid rgba(1,45,116,0.06)" }}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="shrink-0 flex items-center justify-center" style={{ width: 32, height: 32, background: "rgba(0,120,253,0.08)", borderRadius: "8px" }}>
                    <svg className="h-4 w-4 text-[#0078fd]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d={m.icon} /></svg>
                  </div>
                  <h3 className="font-bold text-[#051937]" style={{ fontSize: "15px" }}>{m.title}</h3>
                </div>
                <p className="text-[#64748b] leading-relaxed" style={{ fontSize: "13px" }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-garet font-bold text-[#051937] mb-6" style={{ fontSize: "22px" }}>Cvičenia</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { title: "Útočné cvičenia", desc: "Príprava útoku, zakončenie, spolupráca", image: "https://tqybiozrmzegtgdgyrax.supabase.co/storage/v1/object/public/exercises/3-proti-2.png" },
              { title: "Obranné cvičenia", desc: "Press, bránenie, protiútok", image: "https://tqybiozrmzegtgdgyrax.supabase.co/storage/v1/object/public/exercises/press.png" },
              { title: "Pre mládež", desc: "Cvičenia pre kategórie U12 - U18", image: "https://tqybiozrmzegtgdgyrax.supabase.co/storage/v1/object/public/exercises/boj-o-loptu.png" },
            ].map((c) => (
              <Link key={c.title} href="/vzdelavanie/cvicenia" className="group block bg-white overflow-hidden" style={{ borderRadius: "6px", border: "1px solid rgba(1,45,116,0.06)" }}>
                <div className="relative h-32 overflow-hidden" style={{ background: "#2d8a3e" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.image} alt={c.title} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-[#051937]" style={{ fontSize: "13px" }}>{c.title}</h3>
                  <p className="text-[#94a3b8] mt-0.5" style={{ fontSize: "11px" }}>{c.desc}</p>
                </div>
              </Link>
            ))}
          </div>
          <Link href="/vzdelavanie/cvicenia" className="inline-flex items-center gap-2 mt-4 font-bold text-[#012d74] hover:text-[#051937] transition-colors" style={{ fontSize: "13px" }}>
            Zobraziť všetky cvičenia
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </section>

        <section id="navrh">
          <div className="p-8" style={{ background: "#fff", borderRadius: "3px", border: "1px solid rgba(1,45,116,0.06)" }}>
            <h2 className="font-garet font-bold text-[#051937] mb-2" style={{ fontSize: "22px" }}>Chýba vám téma?</h2>
            <p className="text-[#64748b] mb-6" style={{ fontSize: "14px" }}>Napíšte nám, aký materiál by vám pomohol.</p>
            {submitted ? (
              <div className="text-center py-10">
                <div className="mx-auto flex items-center justify-center mb-4" style={{ width: 48, height: 48, background: "rgba(22,163,74,0.08)", borderRadius: "50%" }}>
                  <svg className="h-6 w-6 text-[#16a34a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <p className="font-garet font-bold text-[#051937]" style={{ fontSize: "18px" }}>Ďakujeme za váš návrh</p>
                <p className="text-[#64748b] mt-2" style={{ fontSize: "14px" }}>Pomôže nám pri príprave ďalších vzdelávacích materiálov.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#051937] mb-1" style={{ fontSize: "12px" }}>Téma alebo názov materiálu *</label>
                    <input required value={formData.topic} onChange={e => setFormData({...formData, topic: e.target.value})} className="w-full px-4 py-2.5 bg-[#f8f9fa] text-[#051937] outline-none focus:ring-2 focus:ring-[#012d74]/20" style={{ borderRadius: "8px", border: "1px solid rgba(1,45,116,0.1)", fontSize: "13px" }} />
                  </div>
                  <div>
                    <label className="block font-bold text-[#051937] mb-1" style={{ fontSize: "12px" }}>Vaša rola</label>
                    <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full px-4 py-2.5 bg-[#f8f9fa] text-[#051937] outline-none focus:ring-2 focus:ring-[#012d74]/20" style={{ borderRadius: "8px", border: "1px solid rgba(1,45,116,0.1)", fontSize: "13px" }}>
                      <option value="">Vyberte...</option>
                      <option value="hrac">Hráč</option>
                      <option value="trener">Tréner</option>
                      <option value="ucitel">Učiteľ</option>
                      <option value="ine">Iné</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block font-bold text-[#051937] mb-1" style={{ fontSize: "12px" }}>Čo by ste potrebovali vysvetliť</label>
                  <textarea value={formData.explanation} onChange={e => setFormData({...formData, explanation: e.target.value})} rows={3} className="w-full px-4 py-2.5 bg-[#f8f9fa] text-[#051937] outline-none focus:ring-2 focus:ring-[#012d74]/20 resize-none" style={{ borderRadius: "8px", border: "1px solid rgba(1,45,116,0.1)", fontSize: "13px" }} />
                </div>
                <div>
                  <label className="block font-bold text-[#051937] mb-1" style={{ fontSize: "12px" }}>E-mail</label>
                  <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2.5 bg-[#f8f9fa] text-[#051937] outline-none focus:ring-2 focus:ring-[#012d74]/20" style={{ borderRadius: "8px", border: "1px solid rgba(1,45,116,0.1)", fontSize: "13px" }} />
                </div>
                <button type="submit" className="font-garet font-bold text-white transition-all hover:brightness-110" style={{ background: "#012d74", borderRadius: "20px", padding: "12px 28px", fontSize: "13px" }}>
                  Odoslať návrh
                </button>
              </form>
            )}
          </div>
        </section>
      </div>
    </article>
  );
}
