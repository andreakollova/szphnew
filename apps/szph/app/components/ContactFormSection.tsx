"use client";

import { useState } from "react";

interface ContactFormSectionProps {
  title: string;
  subtitle: string;
  formType: string;
}

export default function ContactFormSection({ title, subtitle, formType }: ContactFormSectionProps) {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: formType, ...formData }),
      });
    } catch {}
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="kontaktny-formular" className="mt-12 scroll-mt-32">
      <div className="p-8" style={{ background: "#fff", borderRadius: "3px", border: "1px solid rgba(1,45,116,0.06)" }}>
        <h2 className="font-garet font-bold text-[#051937] mb-2" style={{ fontSize: "22px" }}>
          {title}
        </h2>
        <p className="text-[#64748b] mb-6" style={{ fontSize: "14px" }}>
          {subtitle}
        </p>

        {submitted ? (
          <div className="text-center py-10">
            <div
              className="mx-auto flex items-center justify-center mb-4"
              style={{ width: 48, height: 48, background: "rgba(22,163,74,0.08)", borderRadius: "50%" }}
            >
              <svg className="h-6 w-6 text-[#16a34a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="font-garet font-bold text-[#051937]" style={{ fontSize: "18px" }}>
              Ďakujeme! Vaša správa bola odoslaná.
            </p>
            <p className="text-[#64748b] mt-2" style={{ fontSize: "14px" }}>
              Ozveme sa vám čo najskôr.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#051937] mb-1" style={{ fontSize: "12px" }}>
                  Meno *
                </label>
                <input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#f8f9fa] text-[#051937] outline-none focus:ring-2 focus:ring-[#012d74]/20"
                  style={{ borderRadius: "8px", border: "1px solid rgba(1,45,116,0.1)", fontSize: "13px" }}
                />
              </div>
              <div>
                <label className="block font-bold text-[#051937] mb-1" style={{ fontSize: "12px" }}>
                  E-mail *
                </label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#f8f9fa] text-[#051937] outline-none focus:ring-2 focus:ring-[#012d74]/20"
                  style={{ borderRadius: "8px", border: "1px solid rgba(1,45,116,0.1)", fontSize: "13px" }}
                />
              </div>
            </div>
            <div>
              <label className="block font-bold text-[#051937] mb-1" style={{ fontSize: "12px" }}>
                Telefón
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#f8f9fa] text-[#051937] outline-none focus:ring-2 focus:ring-[#012d74]/20"
                style={{ borderRadius: "8px", border: "1px solid rgba(1,45,116,0.1)", fontSize: "13px" }}
              />
            </div>
            <div>
              <label className="block font-bold text-[#051937] mb-1" style={{ fontSize: "12px" }}>
                Správa *
              </label>
              <textarea
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full px-4 py-2.5 bg-[#f8f9fa] text-[#051937] outline-none focus:ring-2 focus:ring-[#012d74]/20 resize-none"
                style={{ borderRadius: "8px", border: "1px solid rgba(1,45,116,0.1)", fontSize: "13px" }}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="font-garet font-bold text-white transition-all hover:brightness-110 disabled:opacity-60"
              style={{ background: "#012d74", borderRadius: "20px", padding: "12px 28px", fontSize: "13px" }}
            >
              {loading ? "Odosielam..." : "Odoslať správu"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
