"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function OrderFormContent() {
  const searchParams = useSearchParams();
  const produkt = searchParams.get("produkt") || "";
  const velkost = searchParams.get("velkost") || "";

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", address: "", city: "", zip: "",
    produkt, velkost, note: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  const inputCls = "w-full px-4 py-2.5 bg-[#f8f9fa] text-[#051937] outline-none focus:ring-2 focus:ring-[#012d74]/20";
  const inputStyle = { borderRadius: "8px", border: "1px solid rgba(1,45,116,0.1)", fontSize: "13px" };

  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      <div className="py-14 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[700px] mx-auto">
          <Link href="/eshop" className="inline-flex items-center gap-2 font-bold text-white hover:text-white transition-colors mb-4" style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            <svg className="h-3 w-3 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            Späť do eshopu
          </Link>
          <h1 className="font-garet font-bold italic text-white leading-tight" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)" }}>
            Objednávka
          </h1>
          <p className="text-white mt-2" style={{ fontSize: "14px" }}>
            Vyplňte údaje a my sa vám ozveme s potvrdením. Platba pri prevzatí.
          </p>
        </div>
      </div>

      <div className="max-w-[700px] mx-auto px-6 pt-10">
        {submitted ? (
          <div className="bg-white p-10 text-center" style={{ borderRadius: "3px", border: "1px solid rgba(1,45,116,0.06)" }}>
            <div className="mx-auto flex items-center justify-center mb-4" style={{ width: 48, height: 48, background: "rgba(22,163,74,0.08)", borderRadius: "50%" }}>
              <svg className="h-6 w-6 text-[#16a34a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </div>
            <p className="font-garet font-bold text-[#051937]" style={{ fontSize: "20px" }}>Objednávka odoslaná</p>
            <p className="text-[#64748b] mt-2" style={{ fontSize: "14px" }}>Ozveme sa vám s potvrdením a dohodou na doručení.</p>
            <Link href="/eshop" className="inline-flex items-center gap-2 mt-6 font-bold text-[#012d74] hover:text-[#051937] transition-colors" style={{ fontSize: "13px" }}>
              <svg className="h-3.5 w-3.5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              Pokračovať v nákupe
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Produkt info */}
            {formData.produkt && (
              <div className="bg-white p-5 flex items-center gap-4" style={{ borderRadius: "3px", border: "1px solid rgba(1,45,116,0.06)" }}>
                <svg className="h-5 w-5 text-[#012d74] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
                <div>
                  <p className="font-bold text-[#051937]" style={{ fontSize: "14px" }}>{formData.produkt}</p>
                  {formData.velkost && <p className="text-[#64748b]" style={{ fontSize: "12px" }}>Veľkosť: {formData.velkost}</p>}
                </div>
              </div>
            )}

            {/* Kontaktné údaje */}
            <div className="bg-white p-6" style={{ borderRadius: "3px", border: "1px solid rgba(1,45,116,0.06)" }}>
              <h2 className="font-bold text-[#051937] mb-4" style={{ fontSize: "16px" }}>Kontaktné údaje</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#051937] mb-1" style={{ fontSize: "12px" }}>Meno a priezvisko *</label>
                    <input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className={inputCls} style={inputStyle} />
                  </div>
                  <div>
                    <label className="block font-bold text-[#051937] mb-1" style={{ fontSize: "12px" }}>E-mail *</label>
                    <input required type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className={inputCls} style={inputStyle} />
                  </div>
                  <div>
                    <label className="block font-bold text-[#051937] mb-1" style={{ fontSize: "12px" }}>Telefón *</label>
                    <input required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className={inputCls} style={inputStyle} placeholder="+421..." />
                  </div>
                </div>
              </div>
            </div>

            {/* Adresa doručenia */}
            <div className="bg-white p-6" style={{ borderRadius: "3px", border: "1px solid rgba(1,45,116,0.06)" }}>
              <h2 className="font-bold text-[#051937] mb-4" style={{ fontSize: "16px" }}>Adresa doručenia</h2>
              <div className="space-y-4">
                <div>
                  <label className="block font-bold text-[#051937] mb-1" style={{ fontSize: "12px" }}>Ulica a číslo *</label>
                  <input required value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} className={inputCls} style={inputStyle} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#051937] mb-1" style={{ fontSize: "12px" }}>Mesto *</label>
                    <input required value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} className={inputCls} style={inputStyle} />
                  </div>
                  <div>
                    <label className="block font-bold text-[#051937] mb-1" style={{ fontSize: "12px" }}>PSČ *</label>
                    <input required value={formData.zip} onChange={e => setFormData({ ...formData, zip: e.target.value })} className={inputCls} style={inputStyle} placeholder="XXX XX" />
                  </div>
                </div>
              </div>
            </div>

            {/* Poznámka */}
            <div className="bg-white p-6" style={{ borderRadius: "3px", border: "1px solid rgba(1,45,116,0.06)" }}>
              <label className="block font-bold text-[#051937] mb-1" style={{ fontSize: "12px" }}>Poznámka k objednávke</label>
              <textarea value={formData.note} onChange={e => setFormData({ ...formData, note: e.target.value })} rows={3} className={`${inputCls} resize-none`} style={inputStyle} placeholder="Nepovinné" />
            </div>

            {/* Platba info */}
            <div className="flex items-start gap-3 px-1">
              <svg className="h-4 w-4 text-[#94a3b8] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <p className="text-[#94a3b8]" style={{ fontSize: "12px" }}>Platba prebieha pri prevzatí objednávky. Po odoslaní vás budeme kontaktovať s potvrdením a dohodou na doručení.</p>
            </div>

            <button type="submit" className="w-full font-garet font-bold text-white transition-all hover:brightness-110" style={{ background: "#012d74", borderRadius: "20px", padding: "14px", fontSize: "14px" }}>
              Odoslať záväznú objednávku
            </button>
          </form>
        )}
      </div>
    </article>
  );
}

export default function ObjednavkaPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-[#94a3b8]">Načítavam...</div>}>
      <OrderFormContent />
    </Suspense>
  );
}
