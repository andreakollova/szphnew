"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const CONTENT_TYPES = [
  { title: "Priame prenosy", desc: "Vybrané zápasy a turnaje naživo.", icon: "M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728M9.172 15.828a5 5 0 010-7.656m5.656 0a5 5 0 010 7.656M12 12h.01" },
  { title: "Záznamy zápasov", desc: "Celé stretnutia, ku ktorým sa môžete kedykoľvek vrátiť.", icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" },
  { title: "Zostrihy a góly", desc: "Najdôležitejšie momenty zo zápasov v krátkom prehľade.", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  { title: "Rozhovory", desc: "Hodnotenia zápasov a pohľady hráčov, trénerov či ďalších hostí.", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" },
  { title: "Reportáže z klubov", desc: "Tréningy, podujatia a každodenná práca v slovenských kluboch.", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
  { title: "Mládežnícky hokej", desc: "Videá z mládežníckych súťaží, turnajov a prvých hokejových skúseností.", icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
];

export default function HockeyTvPage() {
  const [formData, setFormData] = useState({ name: "", email: "", org: "", title: "", description: "", videoUrl: "" });
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <article className="pb-20" style={{ background: "#f8f9fa" }}>
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #020e1f 0%, #051937 50%, #071e42 100%)", minHeight: "340px" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.04) 0%, transparent 60%)" }} />
        <div className="relative px-6 lg:px-10 xl:px-16 max-w-[1600px] mx-auto py-16 flex items-center gap-10">
          <div className="flex-1">
            <Link href="/projekty" className="inline-flex items-center gap-2 font-bold text-white hover:text-white transition-colors mb-6" style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              <svg className="h-3 w-3 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              Projekty
            </Link>
            <h1 className="font-garet font-bold italic text-white leading-tight mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
              Hockey TV
            </h1>
            <p className="text-white max-w-xl leading-relaxed" style={{ fontSize: "15px" }}>
              Zápasy, zostrihy a rozhovory na jednom mieste. Sledujte slovenský pozemný hokej a dianie v kluboch aj reprezentácii.
            </p>
            <a href="/video" className="mt-6 inline-flex items-center gap-2 font-garet font-bold text-white transition-all hover:brightness-110" style={{ background: "#d80027", borderRadius: "20px", padding: "12px 24px", fontSize: "13px" }}>
              Pozrieť videá
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </div>
          <div className="hidden lg:block shrink-0">
            <Image src="/images/hockey-tv-logo.webp" alt="Hockey TV" width={200} height={200} className="object-contain " />
          </div>
        </div>
      </div>

      <div className="px-6 lg:px-10 xl:px-16 max-w-[900px] mx-auto pt-12">
        <section className="mb-12">
          <h2 className="font-garet font-bold text-[#051937] mb-4" style={{ fontSize: "22px" }}>O Hockey TV</h2>
          <p className="text-[#334155] leading-relaxed" style={{ fontSize: "15px" }}>
            Hockey TV prináša pozemný hokej na vaše obrazovky. Priestor dostávajú zápasy domácich súťaží, reprezentačné podujatia, mládež aj ľudia, ktorí sa podieľajú na fungovaní klubov. Prostredníctvom videí približujeme hru fanúšikom, rodičom aj novým záujemcom.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-garet font-bold text-[#051937] mb-6" style={{ fontSize: "22px" }}>Čo môžete sledovať</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CONTENT_TYPES.map((item) => (
              <div key={item.title} className="bg-white p-5" style={{ borderRadius: "3px", border: "1px solid rgba(1,45,116,0.06)" }}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="shrink-0 flex items-center justify-center" style={{ width: 32, height: 32, background: "rgba(0,120,253,0.08)", borderRadius: "8px" }}>
                    <svg className="h-4 w-4 text-[#0078fd]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
                  </div>
                  <h3 className="font-bold text-[#051937]" style={{ fontSize: "15px" }}>{item.title}</h3>
                </div>
                <p className="text-[#64748b] leading-relaxed" style={{ fontSize: "13px" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-garet font-bold text-[#051937] mb-6" style={{ fontSize: "22px" }}>Najnovšie videá</h2>
          <p className="text-[#334155] mb-4" style={{ fontSize: "15px" }}>Pozrite si najnovšie zápasy, zostrihy a reportáže.</p>
          <Link href="/video" className="inline-flex items-center gap-1.5 font-garet font-bold text-[#051937] hover:text-[#012d74] transition-colors" style={{ fontSize: "13px" }}>
            Všetky videá
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </section>

        <section className="mb-12">
          <h2 className="font-garet font-bold text-[#051937] mb-4" style={{ fontSize: "22px" }}>Najbližšie prenosy</h2>
          <div className="bg-white p-6 text-center" style={{ borderRadius: "3px", border: "1px solid rgba(1,45,116,0.06)" }}>
            <p className="text-[#64748b]" style={{ fontSize: "14px" }}>
              Momentálne nie je naplánovaný žiadny prenos. Zatiaľ si môžete pozrieť záznamy a zostrihy.
            </p>
            <Link href="/video" className="mt-4 inline-flex items-center gap-2 font-garet font-bold text-[#012d74] hover:text-[#051937] transition-colors" style={{ fontSize: "13px" }}>
              Prejsť do archívu
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </section>

        <section id="tip">
          <div className="p-8" style={{ background: "#fff", borderRadius: "3px", border: "1px solid rgba(1,45,116,0.06)" }}>
            <h2 className="font-garet font-bold text-[#051937] mb-2" style={{ fontSize: "22px" }}>Pošlite nám video alebo tip</h2>
            <p className="text-[#64748b] mb-6" style={{ fontSize: "14px" }}>Máte natočený zápas alebo zaujímavú akciu? Dajte nám vedieť.</p>
            {submitted ? (
              <div className="text-center py-10">
                <div className="mx-auto flex items-center justify-center mb-4" style={{ width: 48, height: 48, background: "rgba(22,163,74,0.08)", borderRadius: "50%" }}>
                  <svg className="h-6 w-6 text-[#16a34a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <p className="font-garet font-bold text-[#051937]" style={{ fontSize: "18px" }}>Ďakujeme za váš tip</p>
                <p className="text-[#64748b] mt-2" style={{ fontSize: "14px" }}>Pozrieme sa naň a v prípade potreby vás budeme kontaktovať.</p>
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
                    <label className="block font-bold text-[#051937] mb-1" style={{ fontSize: "12px" }}>Klub alebo organizácia</label>
                    <input value={formData.org} onChange={e => setFormData({...formData, org: e.target.value})} className="w-full px-4 py-2.5 bg-[#f8f9fa] text-[#051937] outline-none focus:ring-2 focus:ring-[#012d74]/20" style={{ borderRadius: "8px", border: "1px solid rgba(1,45,116,0.1)", fontSize: "13px" }} />
                  </div>
                  <div>
                    <label className="block font-bold text-[#051937] mb-1" style={{ fontSize: "12px" }}>Názov zápasu alebo témy *</label>
                    <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2.5 bg-[#f8f9fa] text-[#051937] outline-none focus:ring-2 focus:ring-[#012d74]/20" style={{ borderRadius: "8px", border: "1px solid rgba(1,45,116,0.1)", fontSize: "13px" }} />
                  </div>
                </div>
                <div>
                  <label className="block font-bold text-[#051937] mb-1" style={{ fontSize: "12px" }}>Stručný popis</label>
                  <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={3} className="w-full px-4 py-2.5 bg-[#f8f9fa] text-[#051937] outline-none focus:ring-2 focus:ring-[#012d74]/20 resize-none" style={{ borderRadius: "8px", border: "1px solid rgba(1,45,116,0.1)", fontSize: "13px" }} />
                </div>
                <div>
                  <label className="block font-bold text-[#051937] mb-1" style={{ fontSize: "12px" }}>Odkaz na video</label>
                  <input value={formData.videoUrl} onChange={e => setFormData({...formData, videoUrl: e.target.value})} className="w-full px-4 py-2.5 bg-[#f8f9fa] text-[#051937] outline-none focus:ring-2 focus:ring-[#012d74]/20" style={{ borderRadius: "8px", border: "1px solid rgba(1,45,116,0.1)", fontSize: "13px" }} placeholder="https://..." />
                </div>
                <button type="submit" className="font-garet font-bold text-white transition-all hover:brightness-110" style={{ background: "#012d74", borderRadius: "20px", padding: "12px 28px", fontSize: "13px" }}>
                  Odoslať tip
                </button>
              </form>
            )}
          </div>
        </section>
      </div>
    </article>
  );
}
