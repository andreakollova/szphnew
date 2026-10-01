"use client";

import { useState } from "react";
import type { Metadata } from "next";

const INFO = [
  { label: "Názov", value: "Slovenský zväz pozemného hokeja (SZPH)" },
  { label: "Sídlo", value: "Jurkovičova 5, 831 06 Bratislava – mestská časť Rača" },
  { label: "IČO", value: "31751075" },
  { label: "Oficiálny web", value: "szph.sk", href: "https://szph.sk" },
  { label: "E-mail", value: "szph@szph.sk", href: "mailto:szph@szph.sk" },
  { label: "Telefón", value: "+421 918 555 519", href: "tel:+421918555519" },
];

export default function KontaktPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <article className="pb-20" style={{ background: "#f8f9fa" }}>
      {/* Hero */}
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[1100px] mx-auto">
          <span className="font-bold uppercase text-white/40 mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>
            Kontakt
          </span>
          <h1 className="font-garet font-bold italic text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Kontaktujte nás
          </h1>
          <p className="text-white/50 mt-3 max-w-xl" style={{ fontSize: "15px" }}>
            Máte otázky ohľadom pozemného hokeja na Slovensku? Neváhajte nás kontaktovať.
          </p>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8">

          {/* Ľavá strana — info + mapa */}
          <div>
            {/* Kontaktné údaje */}
            <div className="bg-white p-6 mb-4" style={{ borderRadius: "3px", border: "1px solid rgba(1,45,116,0.06)" }}>
              <h2 className="font-garet font-bold text-[#051937] mb-5" style={{ fontSize: "20px" }}>
                Kontaktné údaje
              </h2>
              <div className="space-y-4">
                {INFO.map((item) => (
                  <div key={item.label} className="flex gap-3">
                    <span className="font-bold text-[#94a3b8] shrink-0" style={{ fontSize: "11px", width: "90px", paddingTop: "2px" }}>
                      {item.label}
                    </span>
                    {item.href ? (
                      <a href={item.href} className="font-semibold text-[#012d74] hover:text-[#051937] transition-colors" style={{ fontSize: "13px" }}>
                        {item.value}
                      </a>
                    ) : (
                      <span className="font-semibold text-[#051937]" style={{ fontSize: "13px" }}>
                        {item.value}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Mapa */}
            <div className="overflow-hidden" style={{ borderRadius: "3px", border: "1px solid rgba(1,45,116,0.06)", height: "280px" }}>
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=17.1450%2C48.2030%2C17.1620%2C48.2110&layer=mapnik&marker=48.2070%2C17.1530"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href="https://www.openstreetmap.org/?mlat=48.2070&mlon=17.1530#map=16/48.2070/17.1530"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-2 font-bold text-[#012d74] hover:text-[#051937] transition-colors"
              style={{ fontSize: "11px" }}
            >
              Otvoriť väčšiu mapu
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </div>

          {/* Pravá strana — formulár */}
          <div className="bg-white p-8" style={{ borderRadius: "3px", border: "1px solid rgba(1,45,116,0.06)" }}>
            <h2 className="font-garet font-bold text-[#051937] mb-2" style={{ fontSize: "20px" }}>
              Napíšte nám
            </h2>
            <p className="text-[#64748b] mb-6" style={{ fontSize: "13px" }}>
              Vyplňte formulár a ozveme sa vám.
            </p>

            {submitted ? (
              <div className="text-center py-14">
                <div className="mx-auto flex items-center justify-center mb-4" style={{ width: 48, height: 48, background: "rgba(22,163,74,0.08)", borderRadius: "50%" }}>
                  <svg className="h-6 w-6 text-[#16a34a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <p className="font-garet font-bold text-[#051937]" style={{ fontSize: "18px" }}>Ďakujeme za vašu správu</p>
                <p className="text-[#64748b] mt-2" style={{ fontSize: "14px" }}>Ozveme sa vám čo najskôr.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Meno a priezvisko *", key: "name", required: true },
                    { label: "E-mail *", key: "email", required: true, type: "email" },
                    { label: "Telefón", key: "phone" },
                    { label: "Predmet *", key: "subject", required: true },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block font-bold text-[#051937] mb-1" style={{ fontSize: "12px" }}>{f.label}</label>
                      <input
                        required={f.required}
                        type={f.type || "text"}
                        value={(formData as any)[f.key]}
                        onChange={e => setFormData({ ...formData, [f.key]: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#f8f9fa] text-[#051937] outline-none focus:ring-2 focus:ring-[#012d74]/20"
                        style={{ borderRadius: "8px", border: "1px solid rgba(1,45,116,0.1)", fontSize: "13px" }}
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block font-bold text-[#051937] mb-1" style={{ fontSize: "12px" }}>Správa *</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-2.5 bg-[#f8f9fa] text-[#051937] outline-none resize-none focus:ring-2 focus:ring-[#012d74]/20"
                    style={{ borderRadius: "8px", border: "1px solid rgba(1,45,116,0.1)", fontSize: "13px" }}
                  />
                </div>
                <button type="submit" className="font-garet font-bold text-white transition-all hover:brightness-110" style={{ background: "#012d74", borderRadius: "20px", padding: "12px 28px", fontSize: "13px" }}>
                  Odoslať správu
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
