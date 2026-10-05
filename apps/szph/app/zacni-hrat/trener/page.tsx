"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const FAQ = [
  { q: "Musím byť bývalý hráč alebo hráčka?", a: "Hráčske skúsenosti sú výhodou. Ak ich nemáš, napíš nám, čomu sa venuješ a prečo chceš trénovať." },
  { q: "Môžem začať bez trénerskej kvalifikácie?", a: "Záujem môžeš prejaviť aj bez kvalifikácie. Možnosť pomáhať pri tréningoch si treba vyjasniť s klubom a zväzom." },
  { q: "Môžem trénovať a zároveň aktívne hrať?", a: "Možnosti závisia od rozvrhu tréningov, zápasov a dohody s klubom." },
  { q: "Môžem sa venovať iba deťom alebo začiatočníkom?", a: "Vo formulári uveď, s akou skupinou chceš pracovať. Pomôže nám to pri hľadaní vhodnej možnosti." },
  { q: "Kedy sa koná najbližšie školenie?", a: "Napíš nám a informujeme ťa o aktuálne dostupných alebo pripravovaných možnostiach vzdelávania." },
];

export default function ChcemSaStatTreneromPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", city: "", club: "", experience: "", target: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/form", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "trener", ...formData }) });
    } catch {}
    setSubmitted(true);
  };

  return (
    <article className="pb-20" style={{ background: "#f8f9fa" }}>
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #051937 0%, #012d74 100%)", minHeight: "320px" }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="relative px-6 lg:px-10 xl:px-16 max-w-[1920px] mx-auto py-16 flex items-center gap-10">
          <div className="flex-1">
            <Link href="/" className="inline-flex items-center gap-2 font-bold text-white hover:text-white transition-colors mb-6" style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              <svg className="h-3 w-3 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              Späť
            </Link>
            <h1 className="font-garet font-bold italic text-white leading-tight mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>Chcem sa stať trénerom</h1>
            <p className="text-white max-w-xl leading-relaxed" style={{ fontSize: "15px" }}>Pomáhaj hráčom napredovať a odovzdaj im svoj vzťah k športu.</p>
            <Link href="#formular" className="mt-6 inline-flex items-center gap-2 font-garet font-bold text-white transition-all hover:brightness-110" style={{ background: "#d80027", borderRadius: "20px", padding: "12px 24px", fontSize: "13px" }}>
              Mám záujem o trénovanie
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
          <div className="hidden lg:block shrink-0 relative overflow-hidden" style={{ width: 320, height: 220, borderRadius: "10px" }}>
            <Image src="/images/trener-header.webp" alt="Tréner pozemného hokeja" fill className="object-cover" sizes="320px" />
          </div>
        </div>
      </div>
      <div className="px-6 lg:px-10 xl:px-16 max-w-[1100px] mx-auto pt-12">
        <section className="mb-12">
          <h2 className="font-garet font-bold text-[#051937] mb-4" style={{ fontSize: "22px" }}>Začni s trénovaním</h2>
          <p className="text-[#334155] leading-relaxed" style={{ fontSize: "15px" }}>Hráš alebo si hrával/a pozemný hokej a chceš svoje skúsenosti odovzdať ďalej? Napíš nám, aké máš skúsenosti a koho chceš trénovať.</p>
        </section>
        <section className="mb-12">
          <h2 className="font-garet font-bold text-[#051937] mb-6" style={{ fontSize: "22px" }}>Čo obnáša práca trénera</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "Príprava tréningov", desc: "Vyberáš cvičenia podľa veku a skúseností hráčov." },
              { title: "Vedenie tímu", desc: "Pomáhaš hráčom zvládať tréningy aj zápasy." },
              { title: "Podpora hráčov", desc: "Všímaš si ich pokrok a pomáhaš im rozvíjať schopnosti." },
              { title: "Spolupráca s klubom", desc: "Dohaduješ organizáciu tréningov a komunikuješ s rodičmi." },
            ].map(item => (
              <div key={item.title} className="bg-white p-5" style={{ borderRadius: "3px", border: "1px solid rgba(1,45,116,0.06)" }}>
                <h3 className="font-bold text-[#051937] mb-1" style={{ fontSize: "15px" }}>{item.title}</h3>
                <p className="text-[#64748b] leading-relaxed" style={{ fontSize: "13px" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="mb-12">
          <h2 className="font-garet font-bold text-[#051937] mb-6" style={{ fontSize: "22px" }}>Ako začať</h2>
          <div className="space-y-3">
            {[
              { step: "1", title: "Ozvi sa nám", desc: "Predstav sa a napíš, aké máš skúsenosti." },
              { step: "2", title: "Preberieme možnosti", desc: "Preveríme možnosti zapojenia v kluboch podľa tvojho záujmu." },
              { step: "3", title: "Zisti, akú prípravu potrebuješ", desc: "Vysvetlíme ti požiadavky na vzdelanie a kvalifikáciu." },
              { step: "4", title: "Získavaj skúsenosti", desc: "Začni pomáhať pri tréningoch pod vedením skúseného trénera." },
            ].map(item => (
              <div key={item.step} className="flex gap-4 bg-white p-5" style={{ borderRadius: "3px", border: "1px solid rgba(1,45,116,0.06)" }}>
                <div className="shrink-0 flex items-center justify-center font-garet font-bold text-white" style={{ width: 32, height: 32, background: "#012d74", borderRadius: "50%", fontSize: "14px" }}>{item.step}</div>
                <div><h3 className="font-bold text-[#051937] mb-1" style={{ fontSize: "15px" }}>{item.title}</h3><p className="text-[#64748b] leading-relaxed" style={{ fontSize: "13px" }}>{item.desc}</p></div>
              </div>
            ))}
          </div>
        </section>
        <section className="mb-12">
          <div className="p-6" style={{ background: "rgba(0,120,253,0.04)", borderRadius: "3px", border: "1px solid rgba(0,120,253,0.08)" }}>
            <h2 className="font-garet font-bold text-[#051937] mb-3" style={{ fontSize: "20px" }}>Vzdelávanie trénerov</h2>
            <p className="text-[#334155] leading-relaxed mb-4" style={{ fontSize: "14px" }}>Trénovanie si vyžaduje znalosť hry aj schopnosť vysvetľovať, plánovať a pracovať s ľuďmi.</p>
            <Link href="/projekty/hokejova-akademia" className="inline-flex items-center gap-1.5 font-garet font-bold text-[#012d74] hover:text-[#051937] transition-colors" style={{ fontSize: "13px" }}>
              Pozrieť Hokejovú akadémiu <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </section>
        <section className="mb-12">
          <div className="p-6" style={{ background: "linear-gradient(135deg, #051937 0%, #012d74 100%)", borderRadius: "8px" }}>
            <h2 className="font-garet font-bold italic text-white mb-3" style={{ fontSize: "20px" }}>Klub nie je v tvojom meste?</h2>
            <p className="text-white/80 leading-relaxed mb-4" style={{ fontSize: "14px" }}>
              Založ si vlastný klub pozemného hokeja. Slovenský zväz pozemného hokeja ti poskytne plnú podporu - pomôžeme s registráciou, organizáciou tréningov, vybavením aj zaradením do súťaží. Stačí skupina nadšencov a chuť začať.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/pre-kluby/zalozenie" className="inline-flex items-center gap-2 font-bold text-white transition-all hover:brightness-110" style={{ background: "#d80027", borderRadius: "20px", padding: "10px 20px", fontSize: "12px" }}>
                Chcem založiť klub
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link href="/kluby" className="inline-flex items-center gap-2 font-bold text-white/70 hover:text-white transition-colors" style={{ fontSize: "12px" }}>
                Pozrieť existujúce kluby
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-garet font-bold text-[#051937] mb-6" style={{ fontSize: "22px" }}>Časté otázky</h2>
          <div className="space-y-2">
            {FAQ.map((item, i) => (<div key={i} className="bg-white p-5" style={{ borderRadius: "3px", border: "1px solid rgba(1,45,116,0.06)" }}><h3 className="font-bold text-[#051937] mb-1" style={{ fontSize: "14px" }}>{item.q}</h3><p className="text-[#64748b] leading-relaxed" style={{ fontSize: "13px" }}>{item.a}</p></div>))}
          </div>
        </section>
        <section id="formular" className="scroll-mt-32">
          <div className="p-8" style={{ background: "#fff", borderRadius: "3px", border: "1px solid rgba(1,45,116,0.06)" }}>
            <h2 className="font-garet font-bold text-[#051937] mb-2" style={{ fontSize: "22px" }}>Máš záujem stať sa trénerom?</h2>
            <p className="text-[#64748b] mb-6" style={{ fontSize: "14px" }}>Povedz nám niečo o sebe.</p>
            {submitted ? (
              <div className="text-center py-10"><div className="mx-auto flex items-center justify-center mb-4" style={{ width: 48, height: 48, background: "rgba(22,163,74,0.08)", borderRadius: "50%" }}><svg className="h-6 w-6 text-[#16a34a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg></div><p className="font-garet font-bold text-[#051937]" style={{ fontSize: "18px" }}>Ďakujeme za tvoj záujem</p><p className="text-[#64748b] mt-2" style={{ fontSize: "14px" }}>Ozveme sa ti a preberieme možnosti zapojenia.</p></div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Meno a priezvisko *", key: "name", required: true },
                    { label: "E-mail *", key: "email", required: true, type: "email" },
                    { label: "Telefón", key: "phone" },
                    { label: "Mesto alebo obec *", key: "city", required: true },
                    { label: "Klub", key: "club" },
                  ].map(f => (
                    <div key={f.key}><label className="block font-bold text-[#051937] mb-1" style={{ fontSize: "12px" }}>{f.label}</label><input required={f.required} type={f.type || "text"} value={(formData as any)[f.key]} onChange={e => setFormData({...formData, [f.key]: e.target.value})} className="w-full px-4 py-2.5 bg-[#f8f9fa] text-[#051937] outline-none focus:ring-2 focus:ring-[#012d74]/20" style={{ borderRadius: "8px", border: "1px solid rgba(1,45,116,0.1)", fontSize: "13px" }} /></div>
                  ))}
                  <div><label className="block font-bold text-[#051937] mb-1" style={{ fontSize: "12px" }}>Koho chceš trénovať</label><select value={formData.target} onChange={e => setFormData({...formData, target: e.target.value})} className="w-full px-4 py-2.5 bg-[#f8f9fa] text-[#051937] outline-none" style={{ borderRadius: "8px", border: "1px solid rgba(1,45,116,0.1)", fontSize: "13px" }}><option value="">Vyberte...</option><option value="deti">Deti a mládež</option><option value="dospeli">Dospelých</option><option value="neviem">Zatiaľ neviem</option></select></div>
                </div>
                <div><label className="block font-bold text-[#051937] mb-1" style={{ fontSize: "12px" }}>Skúsenosti s hokejom alebo trénovaním *</label><textarea required value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})} rows={2} className="w-full px-4 py-2.5 bg-[#f8f9fa] text-[#051937] outline-none resize-none" style={{ borderRadius: "8px", border: "1px solid rgba(1,45,116,0.1)", fontSize: "13px" }} /></div>
                <div><label className="block font-bold text-[#051937] mb-1" style={{ fontSize: "12px" }}>Doplňujúca správa</label><textarea value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} rows={2} className="w-full px-4 py-2.5 bg-[#f8f9fa] text-[#051937] outline-none resize-none" style={{ borderRadius: "8px", border: "1px solid rgba(1,45,116,0.1)", fontSize: "13px" }} /></div>
                <button type="submit" className="font-garet font-bold text-white transition-all hover:brightness-110" style={{ background: "#012d74", borderRadius: "20px", padding: "12px 28px", fontSize: "13px" }}>Mám záujem o trénovanie</button>
              </form>
            )}
          </div>
        </section>
      </div>
    </article>
  );
}
