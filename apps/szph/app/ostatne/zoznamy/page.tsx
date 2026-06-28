import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zoznamy",
  description: "Zoznamy — odbornosti, právnické osoby, športové činnosti, talentovaná mládež, aktívni športovci.",
};

const ITEMS = [
  { name: "Odbornosti", href: "#" },
  { name: "Právnické osoby", href: "#" },
  { name: "Príslušnosť k PO", href: "#" },
  { name: "Športové činnosti PO", href: "#" },
  { name: "Talentovaná mládež", href: "#" },
  { name: "Aktívni športovci", href: "#" },
];

export default function ZoznamyPage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span className="font-bold uppercase text-white/40 mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>Ostatné</span>
          <h1 className="font-bold text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Zoznamy</h1>
        </div>
      </div>
      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ITEMS.map((item) => (
            <a key={item.name} href={item.href} className="flex items-center gap-4 rounded-2xl p-5 transition-all hover:shadow-md" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
              <div className="shrink-0 flex items-center justify-center rounded-xl" style={{ width: "40px", height: "40px", background: "rgba(1,45,116,0.06)" }}>
                <svg className="h-5 w-5 text-[#051937]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
              <span className="font-semibold text-[#051937]" style={{ fontSize: "15px" }}>{item.name}</span>
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
