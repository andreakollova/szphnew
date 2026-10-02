import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Evidencia",
  description: "Evidencia SZPH — kluby, súťaže, zápasy, dokumenty.",
};

const SECTIONS = [
  { title: "Kluby", desc: "Registrované kluby pozemného hokeja", href: "/kluby", icon: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" },
  { title: "Súťaže", desc: "Extraliga, mládež, halový hokej", href: "/sutaze", icon: "M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172" },
  { title: "Zápasy a výsledky", desc: "Rozpis, skóre a tabuľky", href: "/zapasy", icon: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" },
  { title: "Dokumenty", desc: "Stanovy, poriadky, tlačivá", href: "/dokumenty", icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" },
  { title: "Reprezentácia", desc: "Národné tímy SR", href: "/reprezentacia", icon: "M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" },
  { title: "Kontakt", desc: "Kontaktné údaje SZPH", href: "/kontakt", icon: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" },
];

export default function EvidenciaPage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      <div className="py-12 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <h1 className="font-garet font-bold italic text-white leading-tight" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>
            Evidencia
          </h1>
          <p className="text-white/60 mt-2" style={{ fontSize: "14px" }}>
            Kompletný prehľad údajov SZPH
          </p>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 pt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SECTIONS.map((s) => (
            <Link key={s.href} href={s.href} className="group flex items-start gap-4 bg-white p-5 transition-colors hover:bg-[#f8fafd]" style={{ borderRadius: "8px", border: "1px solid rgba(1,45,116,0.06)" }}>
              <div className="shrink-0 flex items-center justify-center rounded-lg" style={{ width: 40, height: 40, background: "rgba(1,45,116,0.06)" }}>
                <svg className="h-5 w-5 text-[#012d74]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={s.icon} /></svg>
              </div>
              <div>
                <h3 className="font-bold text-[#051937] group-hover:text-[#012d74] transition-colors" style={{ fontSize: "15px" }}>{s.title}</h3>
                <p className="text-[#94a3b8] mt-0.5" style={{ fontSize: "12px" }}>{s.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
