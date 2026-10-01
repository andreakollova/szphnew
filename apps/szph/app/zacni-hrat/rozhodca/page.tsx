"use client";
import Link from "next/link";
import { useState } from "react";

const FAQ = [
  { q: "Potrebujem skúsenosti s rozhodovaním?", a: "Nie. Ozvať sa môžeš aj ako úplný začiatočník." },
  { q: "Musím byť hráč alebo hráčka?", a: "Hráčske skúsenosti pomáhajú. Ak ich nemáš, preberieme s tebou prípravu." },
  { q: "Od akého veku môžem začať?", a: "Uveď svoj vek vo formulári. Informujeme ťa o podmienkach." },
  { q: "Môžem rozhodovať a zároveň aktívne hrať?", a: "Možnosti súbehu závisia od pravidiel súťaže a termínov." },
  { q: "Môžem po školení hneď pískať zápasy?", a: "Požiadavky na kvalifikáciu ti vysvetlíme počas prípravy." },
  { q: "Je rozhodovanie platené?", a: "O odmene sa informuj pred prijatím konkrétneho nasadenia." },
];

export default function RozhodcaPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", age: "", city: "", club: "", experience: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <article className="pb-20" style={{ background: "#f8f9fa" }}>
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #051937 0%, #012d74 100%)", minHeight: "320px" }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="relative px-6 lg:px-10 xl:px-16 max-w-[1600px] mx-auto py-16">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-white hover:text-white transition-colors mb-6" style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}><svg className="h-3 w-3 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>Späť</Link>
          <h1 className="font-garet font-bold italic text-white leading-tight mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>Chcem sa stať rozhodcom</h1>
          <p className="text-white max-w-xl leading-relaxed" style={{ fontSize: "15px" }}>Spoznaj pozemný hokej z novej pozície. Nauč sa posudzovať herné situácie a viesť zápas.</p>
          <Link href="#formular" className="mt-6 inline-flex items-center gap-2 font-garet font-bold text-white transition-all hover:brightness-110" style={{ background: "#d80027", borderRadius: "20px", padding: "12px 24px", fontSize: "13px" }}>Mám záujem o rozhodovanie<svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></Link>
        </div>
      </div>
      <div className="px-6 lg:px-10 xl:px-16 max-w-[900px] mx-auto pt-12">
        <section className="mb-12">
          <h2 className="font-garet font-bold text-[#051937] mb-4" style={{ fontSize: "22px" }}>Začni s rozhodovaním</h2>
          <p className="text-[#334155] leading-relaxed" style={{ fontSize: "15px" }}>Hráš alebo si hrával/a pozemný hokej? Zaujímajú ťa pravidlá a chceš zostať súčasťou hry? Rozhodovanie môže byť tvojím ďalším krokom.</p>
        </section>
        <section className="mb-12">
          <h2 className="font-garet font-bold text-[#051937] mb-6" style={{ fontSize: "22px" }}>Čo obnáša úloha rozhodcu</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[{title:"Posudzovanie situácií",desc:"Sleduješ priebeh hry a uplatňuješ pravidlá."},{title:"Spolupráca na ihrisku",desc:"S druhým rozhodcom sa navzájom dopĺňate."},{title:"Komunikácia",desc:"Rozhodnutia oznamuješ jasne a pokojne."},{title:"Dohľad nad hrou",desc:"Reaguješ na nebezpečnú hru a udržuješ rešpekt."}].map(item=>(<div key={item.title} className="bg-white p-5" style={{borderRadius:"3px",border:"1px solid rgba(1,45,116,0.06)"}}><h3 className="font-bold text-[#051937] mb-1" style={{fontSize:"15px"}}>{item.title}</h3><p className="text-[#64748b] leading-relaxed" style={{fontSize:"13px"}}>{item.desc}</p></div>))}
          </div>
        </section>
        <section className="mb-12">
          <h2 className="font-garet font-bold text-[#051937] mb-6" style={{ fontSize: "22px" }}>Ako začať</h2>
          <div className="space-y-3">
            {[{step:"1",title:"Ozvi sa nám",desc:"Napíš nám, koľko máš rokov a aké máš skúsenosti."},{step:"2",title:"Zisti podmienky",desc:"Vysvetlíme ti požiadavky na prípravu a kvalifikáciu."},{step:"3",title:"Priprav sa",desc:"Študuj pravidlá, pochop signalizáciu a rozoberaj herné situácie."},{step:"4",title:"Získavaj prax",desc:"Po splnení podmienok začni získavať skúsenosti pri zápasoch."}].map(item=>(<div key={item.step} className="flex gap-4 bg-white p-5" style={{borderRadius:"3px",border:"1px solid rgba(1,45,116,0.06)"}}><div className="shrink-0 flex items-center justify-center font-garet font-bold text-white" style={{width:32,height:32,background:"#012d74",borderRadius:"50%",fontSize:"14px"}}>{item.step}</div><div><h3 className="font-bold text-[#051937] mb-1" style={{fontSize:"15px"}}>{item.title}</h3><p className="text-[#64748b] leading-relaxed" style={{fontSize:"13px"}}>{item.desc}</p></div></div>))}
          </div>
        </section>
        <section className="mb-12"><div className="p-6" style={{background:"rgba(0,120,253,0.04)",borderRadius:"3px",border:"1px solid rgba(0,120,253,0.08)"}}><h2 className="font-garet font-bold text-[#051937] mb-3" style={{fontSize:"20px"}}>Vzdelávanie rozhodcov</h2><p className="text-[#334155] leading-relaxed mb-4" style={{fontSize:"14px"}}>Pravidlá, pohyb na ihrisku, signalizácia a vedenie zápasu.</p><Link href="/projekty/vzdelavanie-rozhodcov" className="inline-flex items-center gap-1.5 font-garet font-bold text-[#012d74] hover:text-[#051937] transition-colors" style={{fontSize:"13px"}}>Pozrieť vzdelávanie rozhodcov<svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></Link></div></section>
        <section className="mb-12"><h2 className="font-garet font-bold text-[#051937] mb-6" style={{fontSize:"22px"}}>Časté otázky</h2><div className="space-y-2">{FAQ.map((item,i)=>(<div key={i} className="bg-white p-5" style={{borderRadius:"3px",border:"1px solid rgba(1,45,116,0.06)"}}><h3 className="font-bold text-[#051937] mb-1" style={{fontSize:"14px"}}>{item.q}</h3><p className="text-[#64748b] leading-relaxed" style={{fontSize:"13px"}}>{item.a}</p></div>))}</div></section>
        <section id="formular" className="scroll-mt-32"><div className="p-8" style={{background:"#fff",borderRadius:"3px",border:"1px solid rgba(1,45,116,0.06)"}}><h2 className="font-garet font-bold text-[#051937] mb-2" style={{fontSize:"22px"}}>Máš záujem stať sa rozhodcom?</h2><p className="text-[#64748b] mb-6" style={{fontSize:"14px"}}>Napíš nám niečo o sebe.</p>
          {submitted?(<div className="text-center py-10"><div className="mx-auto flex items-center justify-center mb-4" style={{width:48,height:48,background:"rgba(22,163,74,0.08)",borderRadius:"50%"}}><svg className="h-6 w-6 text-[#16a34a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg></div><p className="font-garet font-bold text-[#051937]" style={{fontSize:"18px"}}>Ďakujeme za tvoj záujem</p><p className="text-[#64748b] mt-2" style={{fontSize:"14px"}}>Ozveme sa ti s informáciami o možnostiach prípravy.</p></div>):(
          <form onSubmit={handleSubmit} className="space-y-4"><div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{[{label:"Meno a priezvisko *",key:"name",required:true},{label:"E-mail *",key:"email",required:true,type:"email"},{label:"Telefón",key:"phone"},{label:"Vek *",key:"age",required:true},{label:"Mesto alebo obec *",key:"city",required:true},{label:"Klub",key:"club"}].map(f=>(<div key={f.key}><label className="block font-bold text-[#051937] mb-1" style={{fontSize:"12px"}}>{f.label}</label><input required={f.required} type={f.type||"text"} value={(formData as any)[f.key]} onChange={e=>setFormData({...formData,[f.key]:e.target.value})} className="w-full px-4 py-2.5 bg-[#f8f9fa] text-[#051937] outline-none focus:ring-2 focus:ring-[#012d74]/20" style={{borderRadius:"8px",border:"1px solid rgba(1,45,116,0.1)",fontSize:"13px"}} /></div>))}</div><div><label className="block font-bold text-[#051937] mb-1" style={{fontSize:"12px"}}>Skúsenosti s pozemným hokejom</label><textarea value={formData.experience} onChange={e=>setFormData({...formData,experience:e.target.value})} rows={2} className="w-full px-4 py-2.5 bg-[#f8f9fa] text-[#051937] outline-none resize-none" style={{borderRadius:"8px",border:"1px solid rgba(1,45,116,0.1)",fontSize:"13px"}} /></div><div><label className="block font-bold text-[#051937] mb-1" style={{fontSize:"12px"}}>Doplňujúca správa</label><textarea value={formData.message} onChange={e=>setFormData({...formData,message:e.target.value})} rows={2} className="w-full px-4 py-2.5 bg-[#f8f9fa] text-[#051937] outline-none resize-none" style={{borderRadius:"8px",border:"1px solid rgba(1,45,116,0.1)",fontSize:"13px"}} /></div><button type="submit" className="font-garet font-bold text-white transition-all hover:brightness-110" style={{background:"#012d74",borderRadius:"20px",padding:"12px 28px",fontSize:"13px"}}>Mám záujem o rozhodovanie</button></form>)}
        </div></section>
      </div>
    </article>
  );
}
