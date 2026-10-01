"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const EPISODES = [
  { title: "Budeme stavať nový štadión", guest: "Marián Kováč", ep: "EP 03", href: "https://www.youtube.com/watch?v=WoHqCQIVHm4" },
  { title: "Ako sa stať profesionálnym hráčom", guest: "Jana Novotná", ep: "EP 02", href: "https://www.youtube.com/watch?v=WoHqCQIVHm4" },
  { title: "Pozemný hokej na Slovensku — minulosť a budúcnosť", guest: "Peter Sloboda", ep: "EP 01", href: "https://www.youtube.com/watch?v=WoHqCQIVHm4" },
];

const TOPICS = [
  { title: "Hráči a reprezentácia", desc: "Od prvého tréningu po medzinárodné zápasy. Príprava, tímový život a skúsenosti z reprezentácie." },
  { title: "Tréneri a mládež", desc: "Ako viesť tím, rozvíjať mladých hráčov a podporovať ich chuť športovať." },
  { title: "Rozhodcovia a pravidlá", desc: "Rozhodnutia na ihrisku, zodpovednosť a situácie, ktoré z tribúny vidíme inak." },
  { title: "Kluby a ich fungovanie", desc: "Ľudia, ktorí organizujú tréningy, pripravujú turnaje a zabezpečujú chod klubov." },
  { title: "Život mimo ihriska", desc: "Ako sa dá hokej skĺbiť so školou, prácou a rodinou." },
];

export default function PodcastPage() {
  const [formData, setFormData] = useState({ name: "", suggestion: "", interest: "", email: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <article className="pb-20" style={{ background: "#f8f9fa" }}>
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #020e1f 0%, #051937 50%, #071e42 100%)", minHeight: "340px" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.04) 0%, transparent 60%)" }} />
        <div className="relative px-6 lg:px-10 xl:px-16 max-w-[1600px] mx-auto py-16 flex items-center gap-10">
          <div className="flex-1">
            <Link href="/" className="inline-flex items-center gap-2 font-bold text-white hover:text-white transition-colors mb-6" style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              <svg className="h-3 w-3 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              Späť
            </Link>
            <h1 className="font-garet font-bold italic text-white leading-tight mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
              Pozemný hokej — viac ako šport
            </h1>
            <p className="text-white max-w-xl leading-relaxed" style={{ fontSize: "15px" }}>
              Podcast o ľuďoch, ktorí tvoria slovenský pozemný hokej. Rozhovory s hráčmi, trénermi, rozhodcami a ďalšími hosťami.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a href="https://www.youtube.com/@szph" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-garet font-bold text-white transition-all hover:brightness-110" style={{ background: "#d80027", borderRadius: "20px", padding: "12px 24px", fontSize: "13px" }}>
                Pozrieť epizódy
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
              <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 rounded-full transition-all hover:bg-white/10" style={{ border: "1px solid rgba(255,255,255,0.15)" }}>
                <svg className="h-4 w-4" viewBox="0 0 24 24"><path fill="#1DB954" d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
                <span className="font-bold text-white" style={{ fontSize: "12px" }}>Spotify</span>
              </a>
            </div>
          </div>
          <div className="hidden lg:block shrink-0" style={{ width: "180px", height: "60px", position: "relative" }}>
            <Image src="/images/podcastlogo2.png" alt="SZPH Podcast" fill className="object-contain" sizes="180px" />
          </div>
        </div>
      </div>

      <div className="px-6 lg:px-10 xl:px-16 max-w-[900px] mx-auto pt-12">
        <section className="mb-12">
          <h2 className="font-garet font-bold text-[#051937] mb-4" style={{ fontSize: "22px" }}>O podcaste</h2>
          <p className="text-[#334155] leading-relaxed" style={{ fontSize: "15px" }}>
            Čo obnáša reprezentovať Slovensko? Ako vyzerá práca trénera? A čo všetko musí zvládnuť rozhodca počas zápasu? V podcaste sa venujeme hre aj tomu, čo za ňou stojí.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-garet font-bold text-[#051937] mb-6" style={{ fontSize: "22px" }}>Najnovšie epizódy</h2>
          <div className="space-y-2">
            {EPISODES.map((ep, i) => (
              <a key={i} href={ep.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 bg-white p-5 transition-colors hover:bg-[#f8fafd]" style={{ borderRadius: "3px", border: "1px solid rgba(1,45,116,0.06)" }}>
                <div className="shrink-0 flex items-center justify-center rounded-full transition-all group-hover:border-[#012d74]/30" style={{ width: 40, height: 40, background: "rgba(1,45,116,0.04)", border: "1px solid rgba(1,45,116,0.08)" }}>
                  <svg className="h-4 w-4 text-[#012d74] ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[#051937] group-hover:text-[#012d74] transition-colors" style={{ fontSize: "14px" }}>{ep.title}</p>
                  <p className="text-[#94a3b8] font-bold uppercase mt-0.5" style={{ fontSize: "10px", letterSpacing: "0.1em" }}>{ep.ep} · {ep.guest}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-garet font-bold text-[#051937] mb-6" style={{ fontSize: "22px" }}>O čom sa rozprávame</h2>
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
          <h2 className="font-garet font-bold text-[#051937] mb-4" style={{ fontSize: "22px" }}>Pre koho je podcast</h2>
          <p className="text-[#334155] leading-relaxed" style={{ fontSize: "15px" }}>
            Pre hráčov, rodičov, trénerov aj fanúšikov. A tiež pre každého, kto chce pozemný hokej ešte len spoznať. Na počúvanie nepotrebujete poznať pravidlá ani mená všetkých reprezentantov.
          </p>
        </section>

        <section id="tip">
          <div className="p-8" style={{ background: "#fff", borderRadius: "3px", border: "1px solid rgba(1,45,116,0.06)" }}>
            <h2 className="font-garet font-bold text-[#051937] mb-2" style={{ fontSize: "22px" }}>Navrhnite hosťa alebo tému</h2>
            <p className="text-[#64748b] mb-6" style={{ fontSize: "14px" }}>Koho by ste chceli počuť v podcaste?</p>
            {submitted ? (
              <div className="text-center py-10">
                <div className="mx-auto flex items-center justify-center mb-4" style={{ width: 48, height: 48, background: "rgba(22,163,74,0.08)", borderRadius: "50%" }}>
                  <svg className="h-6 w-6 text-[#16a34a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <p className="font-garet font-bold text-[#051937]" style={{ fontSize: "18px" }}>Ďakujeme za váš tip</p>
                <p className="text-[#64748b] mt-2" style={{ fontSize: "14px" }}>Zohľadníme ho pri príprave ďalších rozhovorov.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#051937] mb-1" style={{ fontSize: "12px" }}>Meno</label>
                    <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2.5 bg-[#f8f9fa] text-[#051937] outline-none focus:ring-2 focus:ring-[#012d74]/20" style={{ borderRadius: "8px", border: "1px solid rgba(1,45,116,0.1)", fontSize: "13px" }} />
                  </div>
                  <div>
                    <label className="block font-bold text-[#051937] mb-1" style={{ fontSize: "12px" }}>E-mail</label>
                    <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2.5 bg-[#f8f9fa] text-[#051937] outline-none focus:ring-2 focus:ring-[#012d74]/20" style={{ borderRadius: "8px", border: "1px solid rgba(1,45,116,0.1)", fontSize: "13px" }} />
                  </div>
                </div>
                <div>
                  <label className="block font-bold text-[#051937] mb-1" style={{ fontSize: "12px" }}>Návrh hosťa alebo témy *</label>
                  <input required value={formData.suggestion} onChange={e => setFormData({...formData, suggestion: e.target.value})} className="w-full px-4 py-2.5 bg-[#f8f9fa] text-[#051937] outline-none focus:ring-2 focus:ring-[#012d74]/20" style={{ borderRadius: "8px", border: "1px solid rgba(1,45,116,0.1)", fontSize: "13px" }} />
                </div>
                <div>
                  <label className="block font-bold text-[#051937] mb-1" style={{ fontSize: "12px" }}>Čo by vás zaujímalo</label>
                  <textarea value={formData.interest} onChange={e => setFormData({...formData, interest: e.target.value})} rows={3} className="w-full px-4 py-2.5 bg-[#f8f9fa] text-[#051937] outline-none focus:ring-2 focus:ring-[#012d74]/20 resize-none" style={{ borderRadius: "8px", border: "1px solid rgba(1,45,116,0.1)", fontSize: "13px" }} />
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
