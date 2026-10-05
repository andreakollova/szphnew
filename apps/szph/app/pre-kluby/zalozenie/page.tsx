"use client";
import Link from "next/link";
import { useState } from "react";

const FAQ = [
  { q: "Musím mať skúsenosti s vedením klubu?", a: "Nemusíš. Dôležité je vytvoriť tím ľudí, rozdeliť si úlohy a pripraviť reálny plán." },
  { q: "Môžem začať iba s detskou skupinou?", a: "Áno, zámer môžeš postaviť na práci s deťmi a mládežou." },
  { q: "Čo ak nemáme vlastné ihrisko?", a: "Prever dostupné priestory v školách a športových areáloch." },
  { q: "Koľko stojí založenie a fungovanie klubu?", a: "Závisí od priestorov, počtu hráčov a rozsahu činnosti. Priprav si rozpočet." },
  { q: "Musíme hneď hrať súťaž?", a: "Prvé kroky môžu smerovať k vytvoreniu skupiny a pravidelným tréningom." },
];

export default function ZalozeniePage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", city: "", target: "", hasGroup: "", hasSpace: "", description: "" });
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/form", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "klub", ...formData }) });
    } catch {}
    setSubmitted(true);
  };

  return (
    <article className="pb-20" style={{ background: "#f8f9fa" }}>
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #051937 0%, #012d74 100%)", minHeight: "320px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/zalozit-klub-hero.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" style={{ objectPosition: "center 30%" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(5,25,55,0.95) 0%, rgba(1,45,116,0.7) 50%, rgba(1,45,116,0.4) 100%)" }} />
        <div className="relative px-6 lg:px-10 xl:px-16 max-w-[1920px] mx-auto py-16">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-white hover:text-white transition-colors mb-6" style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}><svg className="h-3 w-3 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>Späť</Link>
          <h1 className="font-garet font-bold italic text-white leading-tight mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>Chcem si založiť klub</h1>
          <p className="text-white max-w-xl leading-relaxed" style={{ fontSize: "15px" }}>Chceš priniesť pozemný hokej do svojho mesta? Spoj ľudí a zisti, čo potrebuješ.</p>
          <Link href="#formular" className="mt-6 inline-flex items-center gap-2 font-garet font-bold text-white transition-all hover:brightness-110" style={{ background: "#d80027", borderRadius: "20px", padding: "12px 24px", fontSize: "13px" }}>Mám záujem založiť klub<svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></Link>
        </div>
      </div>
      <div className="px-6 lg:px-10 xl:px-16 max-w-[1100px] mx-auto pt-12">
        <section className="mb-12"><h2 className="font-garet font-bold text-[#051937] mb-4" style={{fontSize:"22px"}}>Začni s ľuďmi a miestom na hranie</h2><p className="text-[#334155] leading-relaxed" style={{fontSize:"15px"}}>Základom je skupina záujemcov a niekto, kto sa ujme organizácie. Nemáš ešte tím? Ozvi sa nám aj s prvým nápadom.</p></section>
        <section className="mb-12"><h2 className="font-garet font-bold text-[#051937] mb-6" style={{fontSize:"22px"}}>Čo potrebuješ na začiatok</h2><div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{[{title:"Ľudí, ktorí sa zapoja",desc:"Okrem hráčov budeš potrebovať pomoc s organizáciou."},{title:"Priestor na tréningy",desc:"Prever možnosti prenájmu telocvične alebo športoviska."},{title:"Základné vybavenie",desc:"Hokejky, loptičky a tréningové pomôcky."},{title:"Plán fungovania",desc:"Pre koho, ako často a z čoho pokryjete náklady."}].map(item=>(<div key={item.title} className="bg-white p-5" style={{borderRadius:"3px",border:"1px solid rgba(1,45,116,0.06)"}}><h3 className="font-bold text-[#051937] mb-1" style={{fontSize:"15px"}}>{item.title}</h3><p className="text-[#64748b] leading-relaxed" style={{fontSize:"13px"}}>{item.desc}</p></div>))}</div></section>
        <section className="mb-12"><h2 className="font-garet font-bold text-[#051937] mb-6" style={{fontSize:"22px"}}>Ako postupovať</h2><div className="space-y-3">{[{step:"1",title:"Predstav nám svoj zámer",desc:"Napíš, kde chceš pôsobiť a aké máš skúsenosti."},{step:"2",title:"Prever miestne možnosti",desc:"Oslov školy, samosprávu alebo správcov športovísk."},{step:"3",title:"Zostav tím a rozpočet",desc:"Rozdeľte si úlohy a spíšte predpokladané náklady."},{step:"4",title:"Vyrieš formálne založenie",desc:"Over si požiadavky na založenie a správu športového klubu."},{step:"5",title:"Priprav prvý nábor",desc:"Pozvi záujemcov na úvodný tréning."}].map(item=>(<div key={item.step} className="flex gap-4 bg-white p-5" style={{borderRadius:"3px",border:"1px solid rgba(1,45,116,0.06)"}}><div className="shrink-0 flex items-center justify-center font-garet font-bold text-white" style={{width:32,height:32,background:"#012d74",borderRadius:"50%",fontSize:"14px"}}>{item.step}</div><div><h3 className="font-bold text-[#051937] mb-1" style={{fontSize:"15px"}}>{item.title}</h3><p className="text-[#64748b] leading-relaxed" style={{fontSize:"13px"}}>{item.desc}</p></div></div>))}</div></section>
        <section className="mb-12">
          <div className="rounded-lg p-6" style={{ background: "#051937" }}>
            <h2 className="font-garet font-bold text-white mb-3" style={{ fontSize: "20px" }}>Podpora zo strany SZPH</h2>
            <p className="text-white mb-4" style={{ fontSize: "14px", lineHeight: 1.8 }}>
              Slovenský zväz pozemného hokeja poskytuje novým klubom podporu v technickom zabezpečení. K dispozícii je grantový program, vďaka ktorému môže klub získať finančnú podporu na vybavenie, prenájom priestorov a organizáciu tréningov.
            </p>
            <p className="text-white/80 mb-4" style={{ fontSize: "14px", lineHeight: 1.8 }}>
              Pre získanie grantu je potrebné splniť podmienky programu — registrácia klubu, minimálny počet aktívnych členov a pravidelná tréningová činnosť. SZPH vám pomôže s celým procesom od začiatku.
            </p>
            <p className="text-white/60" style={{ fontSize: "13px" }}>
              Pre viac informácií kontaktujte SZPH na <a href="mailto:szph@szph.sk" className="text-white underline">szph@szph.sk</a> alebo <a href="tel:+421918555519" className="text-white underline">+421 918 555 519</a>.
            </p>
          </div>
        </section>

        <section className="mb-12"><h2 className="font-garet font-bold text-[#051937] mb-6" style={{fontSize:"22px"}}>Časté otázky</h2><div className="space-y-2">{FAQ.map((item,i)=>(<div key={i} className="bg-white p-5" style={{borderRadius:"3px",border:"1px solid rgba(1,45,116,0.06)"}}><h3 className="font-bold text-[#051937] mb-1" style={{fontSize:"14px"}}>{item.q}</h3><p className="text-[#64748b] leading-relaxed" style={{fontSize:"13px"}}>{item.a}</p></div>))}</div></section>
        <section id="formular" className="scroll-mt-32"><div className="p-8" style={{background:"#fff",borderRadius:"3px",border:"1px solid rgba(1,45,116,0.06)"}}><h2 className="font-garet font-bold text-[#051937] mb-2" style={{fontSize:"22px"}}>Povedz nám o svojom pláne</h2><p className="text-[#64748b] mb-6" style={{fontSize:"14px"}}>Stačí stručne predstaviť svoj zámer.</p>
          {submitted?(<div className="text-center py-10"><div className="mx-auto flex items-center justify-center mb-4" style={{width:48,height:48,background:"rgba(22,163,74,0.08)",borderRadius:"50%"}}><svg className="h-6 w-6 text-[#16a34a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg></div><p className="font-garet font-bold text-[#051937]" style={{fontSize:"18px"}}>Ďakujeme za tvoj záujem</p><p className="text-[#64748b] mt-2" style={{fontSize:"14px"}}>Ozveme sa ti a preberieme možnosti založenia klubu.</p></div>):(
          <form onSubmit={handleSubmit} className="space-y-4"><div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{[{label:"Meno a priezvisko *",key:"name",required:true},{label:"E-mail *",key:"email",required:true,type:"email"},{label:"Telefón",key:"phone"},{label:"Mesto alebo obec *",key:"city",required:true}].map(f=>(<div key={f.key}><label className="block font-bold text-[#051937] mb-1" style={{fontSize:"12px"}}>{f.label}</label><input required={f.required} type={f.type||"text"} value={(formData as any)[f.key]} onChange={e=>setFormData({...formData,[f.key]:e.target.value})} className="w-full px-4 py-2.5 bg-[#f8f9fa] text-[#051937] outline-none focus:ring-2 focus:ring-[#012d74]/20" style={{borderRadius:"8px",border:"1px solid rgba(1,45,116,0.1)",fontSize:"13px"}} /></div>))}<div><label className="block font-bold text-[#051937] mb-1" style={{fontSize:"12px"}}>Pre koho</label><select value={formData.target} onChange={e=>setFormData({...formData,target:e.target.value})} className="w-full px-4 py-2.5 bg-[#f8f9fa] text-[#051937] outline-none" style={{borderRadius:"8px",border:"1px solid rgba(1,45,116,0.1)",fontSize:"13px"}}><option value="">Vyberte...</option><option value="deti">Deti a mládež</option><option value="dospeli">Dospelých</option><option value="obe">Obe skupiny</option></select></div><div><label className="block font-bold text-[#051937] mb-1" style={{fontSize:"12px"}}>Máš skupinu záujemcov?</label><select value={formData.hasGroup} onChange={e=>setFormData({...formData,hasGroup:e.target.value})} className="w-full px-4 py-2.5 bg-[#f8f9fa] text-[#051937] outline-none" style={{borderRadius:"8px",border:"1px solid rgba(1,45,116,0.1)",fontSize:"13px"}}><option value="">Vyberte...</option><option value="ano">Áno</option><option value="nie">Zatiaľ nie</option></select></div></div><div><label className="block font-bold text-[#051937] mb-1" style={{fontSize:"12px"}}>Stručný popis zámeru *</label><textarea required value={formData.description} onChange={e=>setFormData({...formData,description:e.target.value})} rows={3} className="w-full px-4 py-2.5 bg-[#f8f9fa] text-[#051937] outline-none resize-none" style={{borderRadius:"8px",border:"1px solid rgba(1,45,116,0.1)",fontSize:"13px"}} /></div><button type="submit" className="font-garet font-bold text-white transition-all hover:brightness-110" style={{background:"#012d74",borderRadius:"20px",padding:"12px 28px",fontSize:"13px"}}>Mám záujem založiť klub</button></form>)}
        </div></section>
      </div>
    </article>
  );
}
